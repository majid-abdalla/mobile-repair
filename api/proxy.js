export default async function handler(req, res) {
  const path = req.query.path?.join('/') || '';
  const targetUrl = `http://mobile-repair-backend.somee.com/api/${path}`;

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...(req.headers.authorization && {
          Authorization: req.headers.authorization,
        }),
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Proxy error', error: err.message });
  }
}