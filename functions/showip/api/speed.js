export async function onRequest(context) {
  const url = new URL(context.request.url);
  let bytes = parseInt(url.searchParams.get("bytes") || "8388608", 10);
  if (!Number.isFinite(bytes) || bytes < 1024) bytes = 1024;
  if (bytes > 20000000) bytes = 20000000;
  const buf = new Uint8Array(bytes);
  for (let o = 0; o < buf.length; o += 65536) {
    crypto.getRandomValues(buf.subarray(o, Math.min(o + 65536, buf.length)));
  }
  return new Response(buf, {
    headers: {
      "content-type": "application/octet-stream",
      "cache-control": "no-store",
      "content-length": String(bytes),
    },
  });
}
