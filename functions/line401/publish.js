/**
 * functions/line401/publish.js -- Cloudflare Pages Function
 * ------------------------------------------------------------
 * Receives the distilled physical state POSTed by fetch_line401.py
 * (publish_physical_state()) and stores it in a KV namespace. Cloudflare
 * Pages auto-routes this file to POST https://<your-domain>/line401/publish
 * purely by its path -- see README.md "Going physical" for the full setup.
 *
 * Requires two bindings on the Pages project (Settings > Bindings, in the
 * Cloudflare dashboard):
 *   - KV namespace, variable name LINE401_KV
 *   - Secret, variable name LINE401_TOKEN (must match LINE401_PUBLISH_TOKEN
 *     on the machine running fetch_line401.py)
 *
 * The KV write uses a 90s TTL matching the normal ~15-30s publish interval
 * with margin -- if fetch_line401.py stops publishing (machine off,
 * network down, etc.), the key simply expires on its own. No separate
 * cron watchdog needed -- state.js (the read side) treats a missing key as
 * "blank/unlit", the same "no fake/stale data" principle the rest of this
 * project already follows.
 */

export async function onRequestPost(context) {
  const { request, env } = context;

  const auth = request.headers.get('Authorization') || '';
  const expected = `Bearer ${env.LINE401_TOKEN}`;
  // Not constant-time, but the token only guards a decorative light
  // fixture's write endpoint -- not worth the added complexity here.
  if (auth !== expected) {
    return new Response('unauthorized', { status: 401 });
  }

  const body = await request.text();
  let parsed;
  try {
    parsed = JSON.parse(body);
  } catch (err) {
    return new Response('invalid json', { status: 400 });
  }
  if (!Array.isArray(parsed.stations) || !Array.isArray(parsed.segments)) {
    return new Response('missing stations/segments arrays', { status: 400 });
  }

  await env.LINE401_KV.put('state', body, { expirationTtl: 90 });

  return new Response(null, { status: 204 });
}

// Any other method on this route is a mistake worth a clear error, not a
// silent 404 or a 500 from a missing handler.
export async function onRequest() {
  return new Response('POST only', { status: 405 });
}
