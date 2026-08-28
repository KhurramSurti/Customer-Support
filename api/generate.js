// Secure proxy to the Anthropic API.
// The API key lives ONLY here (as a Vercel environment variable) and is never
// exposed to the browser. The frontend calls /api/generate instead of Anthropic directly.

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Use POST" });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Server is missing ANTHROPIC_API_KEY" });
    return;
  }

  // Vercel usually parses JSON automatically; handle the string case just in case.
  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  body = body || {};

  // Optional access code to protect your API spend on a public link.
  const required = process.env.ACCESS_CODE;
  if (required && body.accessCode !== required) {
    res.status(401).json({ error: "Invalid or missing access code" });
    return;
  }

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: body.model || "claude-sonnet-5",
        max_tokens: body.max_tokens || 1000,
        system: body.system,
        messages: body.messages || [],
      }),
    });
    const data = await r.json();
    if (!r.ok) {
      const detail = (data && data.error && (data.error.message || data.error.type)) || JSON.stringify(data).slice(0, 300);
      res.status(r.status).json({ error: "Anthropic API: " + detail });
      return;
    }
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
};
