export default async function handler(req, res) {
  const { user1Id, user2Id } = req.query;

  try {
    const base = `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}`;
    const [r1, r2] = await Promise.all([
      fetch(`${base}/api/user/enhanced/${user1Id}`),
      fetch(`${base}/api/user/enhanced/${user2Id}`)
    ]);
    const [u1, u2] = await Promise.all([r1.json(), r2.json()]);

    if (u1.error || u2.error) return res.status(404).json({ error: 'One or both users not found' });

    const comparison = {
      user1: u1,
      user2: u2,
      comparison: {
        older_account: (u1.created || '') < (u2.created || '') ? u1.name : u2.name,
        more_friends: (u1.friendsCount || 0) > (u2.friendsCount || 0) ? u1.name : u2.name,
        more_followers: (u1.followersCount || 0) > (u2.followersCount || 0) ? u1.name : u2.name,
        more_badges: (u1.badgeCount || 0) > (u2.badgeCount || 0) ? u1.name : u2.name
      }
    };

    res.status(200).json(comparison);
  } catch (e) {
    console.error('Compare error:', e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


