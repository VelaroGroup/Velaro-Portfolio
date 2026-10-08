import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'Velaro — Digital solutions. Built around you. Websites, e-commerce, automation and custom platforms.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  // Next also imports this module to resolve page metadata on Workers. Keep
  // local asset reads inside the image handler, which is prerendered at build.
  const [interRegular, interBold, logo] = await Promise.all([
    readFile(join(process.cwd(), 'public/fonts/inter-og-400.ttf')),
    readFile(join(process.cwd(), 'public/fonts/inter-og-700.ttf')),
    readFile(join(process.cwd(), 'public/velaro-mark.png')),
  ]);
  const logoSource = `data:image/png;base64,${logo.toString('base64')}`;
  return new ImageResponse(
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', padding: '52px 76px', background: '#0a1628', color: '#f5f7fb', fontFamily: 'Inter', fontWeight: 400 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* ImageResponse embeds the unchanged original artwork directly. */}
        <img src={logoSource} width={74} height={74} alt="" />
        <div style={{ display: 'flex', fontSize: 32, fontWeight: 700, letterSpacing: 4 }}>VELARO</div>
      </div>
      <div style={{ display: 'flex', marginTop: 40, color: '#22d3ee', fontSize: 18, letterSpacing: 3 }}>WEBSITES / E-COMMERCE / AUTOMATION / CUSTOM PLATFORMS</div>
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 24, fontSize: 78, fontWeight: 700, letterSpacing: -4, lineHeight: 1.12 }}>
        <span>Digital solutions.</span>
        <span style={{ color: '#22d3ee' }}>Built around you.</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', borderTop: '1px solid #1e3a8a', paddingTop: 27, fontSize: 19 }}>
        <span>From your online presence to the way your business works.</span>
        <span style={{ color: '#22d3ee' }}>velaro.group</span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: 'Inter', data: interRegular, weight: 400, style: 'normal' },
        { name: 'Inter', data: interBold, weight: 700, style: 'normal' },
      ],
    },
  );
}
