export default async function handler(req, res) {
  const slug = req.query.slug;
  const path = Array.isArray(slug) ? slug.join('/') : slug || '';
  const targetUrl = `http://mobile-repair-backend.somee.com/api/${path}`;

  try {
    const options = {
      method: req.method,
      headers: { 'Content-Type': 'application/json' },
    };

    if (req.headers.authorization) {
      options.headers['Authorization'] = req.headers.authorization;
    }

    if (!['GET', 'HEAD'].includes(req.method)) {
      options.body = JSON.stringify(req.body);
    }

    const backendRes = await fetch(targetUrl, options);
    const data = await backendRes.json();
    res.status(backendRes.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}