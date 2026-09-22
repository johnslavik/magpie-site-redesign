// SPDX-License-Identifier: Apache-2.0
// Apply preview indexing controls to assets, redirects, and errors alike.
export default {
  async fetch(request, env) {
    let response;
    try {
      response = await env.ASSETS.fetch(request);
    } catch {
      response = new Response("Preview temporarily unavailable", { status: 503 });
    }
    const headers = new Headers(response.headers);
    headers.set("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet");
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
