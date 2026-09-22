export async function onRequest(context) {
  const { request } = context;
  const cf = request.cf || {};
  const h = request.headers;
  const data = {
    ip: h.get("cf-connecting-ip") || null,
    country: cf.country || null,
    city: cf.city || null,
    region: cf.region || null,
    postalCode: cf.postalCode || null,
    latitude: cf.latitude || null,
    longitude: cf.longitude || null,
    timezone: cf.timezone || null,
    asn: cf.asn || null,
    asOrganization: cf.asOrganization || null,
    colo: cf.colo || null,
    httpProtocol: cf.httpProtocol || null,
    tlsVersion: cf.tlsVersion || null,
    userAgent: h.get("user-agent") || null,
  };
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
