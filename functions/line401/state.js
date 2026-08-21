/**
 * functions/line401/state.js -- Cloudflare Pages Function
 * ------------------------------------------------------------
 * Serves the current physical state as JSON at
 * GET https://<your-domain>/line401/state -- this is the URL the ESP32
 * (or anything else) polls. Reads from the same KV namespace publish.js
 * writes to; see that file and README.md "Going physical" for setup.
 *
 * If the KV key has expired (nothing published recently -- see publish.js'
 * TTL) or was never set, returns an explicit all-unlit state with
 * stale: true instead of a 404 -- so a poller doesn't need special-case
 * error handling, it always gets a valid, well-shaped response.
 */

const NUM_STATIONS = 17;
const NUM_SEGMENTS = 16;

function blankState() {
  return JSON.stringify({
    generated_at: new Date().toISOString(),
    stations: new Array(NUM_STATIONS).fill(0),
    segments: new Array(NUM_SEGMENTS).fill(0),
    buses_active: 0,
    stale: true,
  });
}

export async function onRequestGet(context) {
  const { env } = context;
  const raw = await env.LINE401_KV.get('state');

  return new Response(raw ?? blankState(), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      // Harmless to expose publicly -- it's a handful of 0/1s, nothing
      // sensitive -- and allows a browser-hosted dashboard/chandelier page
      // to fetch() this cross-origin if it's ever hosted somewhere else.
      'Access-Control-Allow-Origin': '*',
    },
  });
}
