import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import kvIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache';
import doQueue from '@opennextjs/cloudflare/overrides/queue/do-queue';

// KV and deduplicated regeneration preserve the site's timed ISR. KV propagates
// eventually; this public portfolio does not require immediate content updates.
// A tag database is unnecessary until on-demand tag/path revalidation is added.
export default defineCloudflareConfig({
  incrementalCache: kvIncrementalCache,
  queue: doQueue,
});
