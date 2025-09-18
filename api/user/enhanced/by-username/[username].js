module.exports = async function handler(req, res) {
  const { username } = req.query;

  async function safeApiRequest(url, method = 'GET', data = null) {
    try {
      const options = { method, headers: { 'Content-Type': 'application/json' } };
      if (method === 'POST' && data) options.body = JSON.stringify(data);
      const r = await fetch(url, options);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return await r.json();
    } catch (e) {
      console.error('API error:', e.message);
      return null;
    }
  }

  try {
    if (!username) return res.status(400).json({ error: 'Username is required' });
    const idData = await safeApiRequest('https://users.roblox.com/v1/usernames/users', 'POST', { usernames: [username] });
    if (!idData?.data?.length) return res.status(404).json({ error: 'User not found' });

    const userId = idData.data[0].id;
    const base = `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}`;
    const userResp = await fetch(`${base}/api/user/enhanced/${userId}`);
    const userData = await userResp.json();

    if (!userResp.ok) return res.status(userResp.status).json(userData);
    res.status(200).json(userData);
  } catch (e) {
    console.error('Enhanced by username error:', e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

