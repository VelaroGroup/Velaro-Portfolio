#!/usr/bin/env node

// Read-only integration checks. Start the site, then run:
// node scripts/verify-site.mjs [http://127.0.0.1:3000]
const args = process.argv.slice(2);
const productionCheck = args.includes('--production');
const base = new URL(args.find(arg => !arg.startsWith('--')) || 'http://127.0.0.1:3000');
if (!['http:', 'https:'].includes(base.protocol)) throw new Error('Use an HTTP or HTTPS base URL.');
const canonicalBase = new URL(process.env.VELARO_EXPECTED_SITE_URL || 'https://www.velaro.group');
const expectIndexable = process.env.VELARO_EXPECT_INDEXABLE !== '0';
const expectedRelease = process.env.VELARO_EXPECTED_RELEASE;

const requiredRoutes = [
  '/', '/about', '/contact', '/work', '/privacy', '/terms',
  ...['custom-software', 'automation', 'web', 'ecommerce'].map(slug => `/services/${slug}`),
  ...['automation', 'custom-software', 'web-development', 'ecommerce'].map(slug => `/work/category/${slug}`),
  ...['automation', 'web', 'ecommerce', 'software', 'platform', 'commerce'].map(slug => `/work/preview-${slug}-project`),
];
const legacyRedirects = [
  ['/website-development-lebanon', '/services/web'],
  ['/website-development-middle-east', '/services/web'],
  ['/shopify-store-lebanon', '/services/ecommerce'],
  ['/packages', '/contact'],
  ['/about-us', '/about'],
];
const failures = [];
let assertions = 0;

function check(condition, description) {
  assertions++;
  if (!condition) failures.push(description);
}

function decode(text) {
  return text.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt|nbsp);/gi, (entity, code) => {
    if (code.startsWith('#x')) return String.fromCodePoint(parseInt(code.slice(2), 16));
    if (code.startsWith('#')) return String.fromCodePoint(parseInt(code.slice(1), 10));
    return { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', nbsp: ' ' }[code.toLowerCase()] || entity;
  });
}

function attribute(attributes, name) {
  const match = attributes.match(new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, 'is'));
  return match ? decode(match[2]) : null;
}

function visibleMarkup(html) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style\s*>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');
}

function textContent(markup) {
  return decode(markup.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
}

const responseCache = new Map();
async function getPage(path) {
  const url = new URL(path, base);
  url.hash = '';
  if (!responseCache.has(url.href)) {
    responseCache.set(url.href, (async () => {
      try {
        const response = await fetch(url, {
          headers: { Accept: 'text/html', 'User-Agent': 'VelaroIntegrationCheck/1.0' },
          // A candidate must serve its own pages, not silently redirect to a live release.
          redirect: 'manual',
          signal: AbortSignal.timeout(30000),
        });
        const html = await response.text();
        return { url, status: response.status, headers: response.headers, html, markup: visibleMarkup(html) };
      } catch (error) {
        return { url, status: 0, markup: '', error: error.message };
      }
    })());
  }
  return responseCache.get(url.href);
}

// Limit concurrent SSR requests so this also works against a development server.
async function inBatches(items, action) {
  const results = [];
  for (let index = 0; index < items.length; index += 4) {
    results.push(...await Promise.all(items.slice(index, index + 4).map(action)));
  }
  return results;
}

console.log(`Checking Velaro at ${base.origin}`);
// Crawl newly published content too; adding a CMS record must not bypass release checks.
const sitemap = await getPage('/sitemap.xml');
check(sitemap.status === 200, 'sitemap.xml: expected 200');
check(/(?:application|text)\/xml/i.test(sitemap.headers?.get('content-type') || ''), 'sitemap.xml: XML content type is missing');
const locations = [...(sitemap.html || '').matchAll(/<loc>(.*?)<\/loc>/gi)].map(match => {
  try { return new URL(decode(match[1])).href; } catch { return decode(match[1]); }
});
check(new Set(locations).size === locations.length, 'sitemap.xml: duplicate URLs');
const routes = [...requiredRoutes];
for (const location of locations) {
  try {
    const url = new URL(location);
    const canonical = url.origin === canonicalBase.origin && !url.search && !url.hash && !url.username && !url.password;
    check(canonical, `sitemap.xml: non-canonical entry ${location}`);
    if (canonical && !routes.includes(url.pathname)) routes.push(url.pathname);
  } catch { check(false, 'sitemap.xml: malformed URL'); }
}
const pages = await inBatches(routes, getPage);
const titles = new Map();
const descriptions = new Map();
const links = new Map();
const linkedFromOtherPages = new Set();
const photoUrls = new Map();
const expectedPhotos = ['/images/concept-architecture.png', '/images/concept-ceramics.png', '/velaro-mark.png'];

for (const [index, page] of pages.entries()) {
  const path = routes[index];
  check(page.status === 200, `${path}: expected 200, received ${page.status}${page.error ? ` (${page.error})` : ''}`);
  if (page.status !== 200) continue;

  const title = textContent(page.markup.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '');
  check([...page.markup.matchAll(/<title\b/gi)].length === 1, `${path}: expected exactly one page title`);
  check(title.length > 10 && !/create next app|untitled|placeholder/i.test(title), `${path}: missing or placeholder page title`);
  check(!titles.has(title), `${path}: title duplicates ${titles.get(title)} (${title})`);
  titles.set(title, path);
  check([...page.markup.matchAll(/<main\b/gi)].length === 1, `${path}: expected exactly one main landmark`);
  check([...page.markup.matchAll(/<h1\b/gi)].length === 1, `${path}: expected exactly one h1`);
  check(/<html\b[^>]*\blang="en(?:-[^"]+)?"/i.test(page.markup), `${path}: missing English document language`);

  const metas = [...page.markup.matchAll(/<meta\b([^>]*)>/gi)];
  if (expectedRelease) {
    const release = metas.find(match => attribute(match[1], 'name') === 'velaro-release');
    check(attribute(release?.[1] || '', 'content') === expectedRelease, `${path}: the expected release has not reached this page`);
  }
  const description = metas.find(match => attribute(match[1], 'name') === 'description');
  const descriptionText = attribute(description?.[1] || '', 'content') || '';
  check(descriptionText.length >= 40, `${path}: missing meaningful meta description`);
  check(!descriptions.has(descriptionText), `${path}: meta description duplicates ${descriptions.get(descriptionText)}`);
  descriptions.set(descriptionText, path);
  const viewport = metas.find(match => attribute(match[1], 'name') === 'viewport');
  check(/width=device-width/.test(attribute(viewport?.[1] || '', 'content') || ''), `${path}: responsive viewport is missing`);
  const canonical = [...page.markup.matchAll(/<link\b([^>]*)>/gi)].filter(match => attribute(match[1], 'rel') === 'canonical');
  const canonicalHref = canonical.length === 1 ? attribute(canonical[0][1], 'href') : null;
  let normalizedCanonical;
  try { normalizedCanonical = canonicalHref ? new URL(canonicalHref).href : null; } catch { normalizedCanonical = null; }
  check(normalizedCanonical === new URL(path, canonicalBase).href, `${path}: canonical URL does not match the public route`);
  const metaValue = (property) => attribute(metas.find(match => attribute(match[1], 'property') === property || attribute(match[1], 'name') === property)?.[1] || '', 'content') || '';
  let normalizedOgUrl;
  try { normalizedOgUrl = new URL(metaValue('og:url')).href; } catch { normalizedOgUrl = null; }
  check(normalizedOgUrl === new URL(path, canonicalBase).href, `${path}: social sharing URL does not match this page`);
  check(metaValue('og:title').length > 10, `${path}: social sharing title is missing`);
  if (path !== '/') check(metaValue('og:title') === title, `${path}: social title differs from the page title`);
  check(metaValue('og:image').includes('/opengraph-image'), `${path}: generated sharing image is missing`);
  check(metaValue('twitter:card') === 'summary_large_image', `${path}: large social sharing card is missing`);

  check(page.headers.get('x-content-type-options') === 'nosniff', `${path}: nosniff response header is missing`);
  if (productionCheck) check(page.headers.get('x-frame-options') === 'SAMEORIGIN', `${path}: production frame protection header is missing`);
  check(page.headers.get('referrer-policy') === 'strict-origin-when-cross-origin', `${path}: referrer policy is missing`);
  check(!page.headers.has('x-powered-by'), `${path}: framework disclosure header is present`);
  const csp = page.headers.get('content-security-policy') || '';
  check(csp.includes("base-uri 'self'") && csp.includes("object-src 'none'"), `${path}: baseline content security policy is missing`);
  if (productionCheck) check(csp.includes("frame-ancestors 'self'"), `${path}: production CSP frame protection is missing`);
  check((page.headers.get('permissions-policy') || '').includes('microphone=()'), `${path}: browser feature policy is missing`);
  const indexingDirectives = [page.headers.get('x-robots-tag') || '', ...metas
    .filter(match => ['robots', 'googlebot', 'bingbot'].includes((attribute(match[1], 'name') || '').toLowerCase()))
    .map(match => attribute(match[1], 'content') || '')].join(' ');
  check(expectIndexable ? !/noindex|nofollow|\bnone\b/i.test(indexingDirectives) : /noindex/i.test(indexingDirectives),
    `${path}: expected ${expectIndexable ? 'indexable, followable public page' : 'noindex preview/Worker alias'}`);

  const jsonLd = [...page.html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
    .filter(match => attribute(match[1], 'type') === 'application/ld+json');
  check(jsonLd.length > 0, `${path}: structured data is missing`);
  const schemas = [];
  for (const [, , json] of jsonLd) {
    try {
      const data = JSON.parse(json);
      check(data['@context'] === 'https://schema.org' && Boolean(data['@type']), `${path}: structured data has no schema context/type`);
      schemas.push(data);
    } catch { check(false, `${path}: structured data is not valid JSON`); }
  }
  const organization = schemas.find(data => data['@type'] === 'Organization');
  const organizationId = new URL('/#organization', canonicalBase).href;
  check(organization?.['@id'] === organizationId && organization?.name === 'Velaro', `${path}: consistent Organization identity is missing`);
  check(organization?.logo === new URL('/velaro-mark.png', canonicalBase).href, `${path}: Organization logo must use the original public mark`);
  if (path === '/') {
    const website = schemas.find(data => data['@type'] === 'WebSite');
    check(website?.name === 'Velaro' && website?.['@id'] === new URL('/#website', canonicalBase).href,
      'homepage: WebSite identity is missing');
    check(website?.publisher?.['@id'] === organizationId && new URL(website.url, canonicalBase).origin === canonicalBase.origin,
      'homepage: WebSite publisher or URL is incorrect');
  }
  if (path.startsWith('/services/')) {
    const service = schemas.find(data => data['@type'] === 'Service');
    check(service?.['@id'] === new URL(`${path}#service`, canonicalBase).href && service?.provider?.['@id'] === organizationId,
      `${path}: Service identity/provider is missing`);
  }

  const headings = [...page.markup.matchAll(/<h[1-6]\b[^>]*>([\s\S]*?)<\/h[1-6]>/gi)].map(match => textContent(match[1]));
  check(headings.every(heading => !/\bpreview\b|\bplaceholder\b/i.test(heading)), `${path}: placeholder wording appears in a heading`);

  for (const landmark of ['header', 'footer']) {
    const section = page.markup.match(new RegExp(`<${landmark}\\b[^>]*>([\\s\\S]*?)<\\/${landmark}>`, 'i'))?.[1] || '';
    const wordmarks = [...section.matchAll(/<span\b[^>]*>([^<]*)<\/span>/gi)]
      .map(match => textContent(match[1])).filter(text => /^VELARO(?:\b|\.)/.test(text));
    check(wordmarks.length === 1 && wordmarks[0] === 'VELARO' && !/VELARO\s*\./.test(textContent(section)), `${path}: ${landmark} must contain the exact VELARO wordmark without a dot`);
  }

  // Read real anchors only; Next's serialized scripts have already been removed.
  for (const anchor of page.markup.matchAll(/<a\b([^>]*)>/gi)) {
    const href = attribute(anchor[1], 'href');
    if (!href) continue;
    let destination;
    try { destination = new URL(href, page.url); } catch { check(false, `${path}: invalid anchor href ${href}`); continue; }
    if (destination.origin === base.origin && ['http:', 'https:'].includes(destination.protocol)) {
      const target = `${destination.pathname}${destination.search}${destination.hash}`;
      if (!links.has(target)) links.set(target, path);
      if (destination.pathname !== path) linkedFromOtherPages.add(destination.pathname);
    }
  }

  for (const image of page.markup.matchAll(/<img\b([^>]*)>/gi)) {
    check(attribute(image[1], 'alt') !== null, `${path}: image has no alt attribute`);
    const src = attribute(image[1], 'src');
    if (!src) continue;
    const imageUrl = new URL(src, page.url);
    const original = imageUrl.searchParams.get('url');
    const matchedPhoto = expectedPhotos.find(photo => original === photo ||
      new RegExp(`^/_next/static/media/${photo.split('/').pop().replace('.png', '')}\\.[a-z0-9_-]+\\.png$`, 'i').test(original || ''));
    if (imageUrl.pathname === '/_next/image' && matchedPhoto && !photoUrls.has(matchedPhoto)) {
      photoUrls.set(matchedPhoto, imageUrl);
    }
  }
}

for (const path of ['/does-not-exist', '/services/does-not-exist', '/work/category/does-not-exist', '/work/does-not-exist']) {
  const response = await getPage(path);
  check(response.status === 404, `${path}: expected 404, received ${response.status}`);
  check(/<meta\b[^>]*name="robots"[^>]*content="[^"]*noindex/i.test(response.html || ''), `${path}: missing noindex on the error page`);
}

await inBatches(legacyRedirects, async ([source, destination]) => {
  const requestUrl = new URL(`${source}?source=legacy-link`, base);
  try {
    const response = await fetch(requestUrl, { redirect: 'manual', signal: AbortSignal.timeout(30000) });
    check([301, 308].includes(response.status), `${source}: expected a permanent redirect, received ${response.status}`);
    const location = response.headers.get('location');
    const expected = new URL(`${destination}?source=legacy-link`, base);
    check(Boolean(location) && new URL(location, requestUrl).href === expected.href, `${source}: redirect destination or preserved query is incorrect`);
    await response.body?.cancel();
  } catch (error) { check(false, `${source}: redirect check failed (${error.message})`); }
});

// Native HTTP retains an explicit Host header; Node fetch can discard it.
// Exercise both domain identities locally without contacting another live host.
if (['localhost', '127.0.0.1', '[::1]'].includes(base.hostname)) {
  const { get } = await import(base.protocol === 'https:' ? 'node:https' : 'node:http');
  const requestHost = (host, path) => new Promise((resolve, reject) => {
    const request = get(new URL(path, base), { headers: { host } }, response => {
      const result = { status: response.statusCode, location: response.headers.location, robots: response.headers['x-robots-tag'] };
      response.resume();
      response.on('end', () => resolve(result));
      response.on('error', reject);
    });
    request.setTimeout(30000, () => request.destroy(new Error('Host check timed out')));
    request.on('error', reject);
  });
  for (const path of ['/?source=legacy-link', '/about?source=legacy-link']) {
    try {
      const response = await requestHost('velaro.group', path);
      check([301, 308].includes(response.status), `apex host ${path}: expected a permanent redirect, received ${response.status}`);
      check(response.location === new URL(path, canonicalBase).href, `apex host ${path}: canonical redirect must preserve path and query`);
    } catch (error) { check(false, `apex host ${path}: redirect check failed (${error.message})`); }
  }
  for (const path of ['/', '/about']) {
    try {
      const response = await requestHost('www.velaro.group', path);
      check(response.status === 200, `www host ${path}: expected 200 without a redirect loop, received ${response.status}`);
      check(!response.location, `www host ${path}: unexpected redirect location`);
    } catch (error) { check(false, `www host ${path}: request failed (${error.message})`); }
  }
  try {
    const response = await requestHost('velaro-portfolio.weathered-mud-0703.workers.dev', '/');
    check(response.status === 200 && /noindex/i.test(response.robots || ''), 'Worker alias: must serve the site with a noindex response header');
  } catch (error) { check(false, `Worker alias indexing policy: ${error.message}`); }
}

// On the public release, also verify HTTPS enforcement and the real apex host.
if (base.origin === canonicalBase.origin) {
  const publicRedirects = [
    ['https://velaro.group/?source=release-check', 'https://www.velaro.group/?source=release-check'],
    ['https://velaro.group/about?source=release-check', 'https://www.velaro.group/about?source=release-check'],
    ['http://velaro.group/about?source=release-check', 'https://velaro.group/about?source=release-check'],
    ['http://www.velaro.group/about?source=release-check', 'https://www.velaro.group/about?source=release-check'],
  ];
  for (const [url, destination] of publicRedirects) {
    try {
      const response = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(30000) });
      check([301, 308].includes(response.status), `${url}: expected a permanent public-domain redirect, received ${response.status}`);
      check(response.headers.get('location') === destination, `${url}: public redirect must preserve path and query`);
      await response.body?.cancel();
    } catch (error) { check(false, `${url}: public redirect check failed (${error.message})`); }
  }
}

for (const service of ['custom-software', 'automation']) {
  const path = `/contact?service=${service}`;
  const page = await getPage(path);
  check(page.status === 200, `${path}: expected 200, received ${page.status}`);
  const queryCanonical = [...page.markup.matchAll(/<link\b([^>]*)>/gi)].find(match => attribute(match[1], 'rel') === 'canonical');
  check(attribute(queryCanonical?.[1] || '', 'href') === new URL('/contact', canonicalBase).href,
    `${path}: query variation must canonicalize to /contact`);
  const select = [...page.markup.matchAll(/<select\b([^>]*)>([\s\S]*?)<\/select>/gi)]
    .find(match => attribute(match[1], 'id') === 'contact-topic');
  const selected = [...(select?.[2] || '').matchAll(/<option\b([^>]*)>/gi)]
    .filter(match => /\bselected(?:=|\s|$)/i.test(match[1]))
    .map(match => attribute(match[1], 'value'));
  check(selected.length === 1 && selected[0] === service, `${path}: expected the matching service option to be selected`);
}

// Exercise the request-rendered route with crawler user agents as well as a browser.
// This checks response behavior; it does not prove a visit from a verified crawler IP.
for (const [name, userAgent] of [
  ['Googlebot', 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'],
  ['Bingbot', 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)'],
  ['Twitterbot', 'Twitterbot/1.0'],
]) {
  try {
    const response = await fetch(new URL('/contact?service=automation', base), {
      headers: { 'User-Agent': userAgent }, redirect: 'manual', signal: AbortSignal.timeout(30000),
    });
    const markup = visibleMarkup(await response.text());
    check(response.status === 200, `${name}: contact response returned ${response.status}`);
    check(/<title\b[^>]*>Contact Us \| Velaro<\/title>/i.test(markup), `${name}: complete page title is missing`);
    const canonical = [...markup.matchAll(/<link\b([^>]*)>/gi)].find(match => attribute(match[1], 'rel') === 'canonical');
    check(attribute(canonical?.[1] || '', 'href') === new URL('/contact', canonicalBase).href, `${name}: clean canonical URL is missing`);
    check(/<main\b/i.test(markup) && /<h1\b/i.test(markup), `${name}: server-rendered page content is missing`);
  } catch (error) { check(false, `${name}: crawler response failed (${error.message})`); }
}

for (const path of ['/', '/services/custom-software']) {
  const page = await getPage(`${path}?utm_source=seo-check`);
  const canonical = [...page.markup.matchAll(/<link\b([^>]*)>/gi)].find(match => attribute(match[1], 'rel') === 'canonical');
  const href = attribute(canonical?.[1] || '', 'href');
  let normalized;
  try { normalized = href ? new URL(href).href : null; } catch { normalized = null; }
  check(page.status === 200 && normalized === new URL(path, canonicalBase).href,
    `${path}: tracking parameters must canonicalize to the clean public URL`);
}

await inBatches([...links], async ([target, source]) => {
  const page = await getPage(target);
  check(page.status === 200, `${source}: internal anchor ${target} returned ${page.status}`);
  const hash = new URL(target, base).hash;
  if (hash && page.status === 200) {
    const id = decodeURIComponent(hash.slice(1));
    const ids = [...page.markup.matchAll(/<[a-z][\w:-]*\b([^>]*)>/gi)].map(match => attribute(match[1], 'id'));
    check(ids.includes(id), `${source}: internal anchor ${target} has no matching element`);
  }
});

for (const photo of expectedPhotos) {
  const url = photoUrls.get(photo);
  check(Boolean(url), `${photo}: no rendered Next image optimization URL found`);
  if (!url) continue;
  try {
    const response = await fetch(url, { headers: { Accept: 'image/webp,image/*' }, signal: AbortSignal.timeout(30000) });
    check(response.status === 200, `${photo}: optimized image returned ${response.status}`);
    check(/^image\//i.test(response.headers.get('content-type') || ''), `${photo}: optimized response has no image content type`);
    if (productionCheck) check(/immutable/i.test(response.headers.get('cache-control') || ''), `${photo}: fingerprinted optimized image is missing immutable caching`);
    check((await response.arrayBuffer()).byteLength > 0, `${photo}: optimized image body is empty`);
  } catch (error) {
    check(false, `${photo}: optimized image request failed (${error.message})`);
  }
}

// Browser icons must resolve to an actual square image, not an HTML fallback.
const homeMarkup = pages[0].markup;
for (const rel of ['icon', 'apple-touch-icon']) {
  const link = [...homeMarkup.matchAll(/<link\b([^>]*)>/gi)].find(match => attribute(match[1], 'rel') === rel);
  const href = attribute(link?.[1] || '', 'href');
  check(Boolean(href), rel + ': missing browser brand image');
  if (!href) continue;
  try {
    const response = await fetch(new URL(href, base), { signal: AbortSignal.timeout(30000) });
    const png = Buffer.from(await response.arrayBuffer());
    check(response.status === 200 && response.headers.get('content-type')?.startsWith('image/png'), rel + ': expected PNG image');
    check(png.length > 24 && png.readUInt32BE(16) === png.readUInt32BE(20) && png.readUInt32BE(16) >= 180, rel + ': expected square image suitable for mobile icons');
  } catch (error) { check(false, rel + ': ' + error.message); }
}

try {
  const response = await fetch(new URL('/opengraph-image', base), { signal: AbortSignal.timeout(30000) });
  const png = Buffer.from(await response.arrayBuffer());
  check(response.status === 200 && response.headers.get('content-type')?.startsWith('image/png'), 'sharing image: expected a PNG response');
  check(png.length > 24 && png.readUInt32BE(16) === 1200 && png.readUInt32BE(20) === 630, 'sharing image: expected 1200×630 dimensions');
} catch (error) { check(false, `sharing image: ${error.message}`); }

const robots = await getPage('/robots.txt');
check(robots.status === 200, 'robots.txt: expected 200');
if (expectIndexable || /^Sitemap:/im.test(robots.html || '')) {
  check(robots.html?.includes(`Sitemap: ${new URL('/sitemap.xml', canonicalBase).href}`), 'robots.txt: canonical sitemap is missing');
}
if (expectIndexable) check(!/^Disallow:\s*\/\s*$/im.test(robots.html || ''), 'robots.txt: all crawling is blocked');
for (const path of routes) check(locations.includes(new URL(path, canonicalBase).href), `sitemap.xml: missing ${path}`);
for (const path of routes.filter(path => path !== '/')) {
  check(linkedFromOtherPages.has(path), `${path}: sitemap page has no crawlable incoming internal link`);
}

// A real image with an unapproved source query must not create another optimizer entry.
const disallowedImage = new URL('/_next/image', base);
disallowedImage.search = new URLSearchParams({ url: '/images/concept-architecture.png?unapproved=1', w: '640', q: '75' }).toString();
try {
  const response = await fetch(disallowedImage, { signal: AbortSignal.timeout(30000) });
  check(response.status === 400, `image optimizer: unapproved source query returned ${response.status}, expected 400`);
  await response.body?.cancel();
} catch (error) { check(false, `image optimizer: restriction check failed (${error.message})`); }

if (failures.length) {
  console.error(`\nFAILED: ${failures.length} of ${assertions} checks`);
  failures.forEach(failure => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log(`PASS: ${assertions} checks across ${routes.length} pages, ${links.size} internal destinations, ${legacyRedirects.length} legacy redirects, 4 unknown routes, 2 contact selections and 3 optimized images (including the Velaro mark), including SEO, response security headers and sitemap coverage.`);
}
