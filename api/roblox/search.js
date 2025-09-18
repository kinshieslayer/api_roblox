module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const { username } = req.body || {};
    if (!username || typeof username !== 'string') return res.status(400).json({ error: 'username is required' });

    const idData = await fetch('https://users.roblox.com/v1/usernames/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usernames: [username] })
    }).then(r => r.json());

    if (!idData?.data?.length) return res.status(404).json({ error: 'User not found' });

    const user = idData.data[0];

    const headshot = await fetch(
      `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${user.id}&size=150x150&format=Png`
    ).then(r => r.json());

    const imageUrl = headshot?.data?.[0]?.imageUrl || '';

    res.status(200).json({
      user: { id: user.id, name: user.name, displayName: user.displayName },
      imageUrl
    });
  } catch (e) {
    console.error('Search error:', e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


