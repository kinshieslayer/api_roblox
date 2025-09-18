module.exports = async function handler(req, res) {
  const { userId } = req.query;

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

  function calculateAccountAge(createdDate) {
    try {
      const created = new Date(createdDate);
      const now = new Date();
      const diffTime = Math.abs(now - created);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const years = Math.floor(diffDays / 365);
      const months = Math.floor((diffDays % 365) / 30);
      const days = diffDays % 30;
      if (years > 0) return `${years} year${years !== 1 ? 's' : ''} ago`;
      if (months > 0) return `${months} month${months !== 1 ? 's' : ''} ago`;
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    } catch {
      return 'Unknown';
    }
  }

  try {
    const id = parseInt(userId);
    if (!id) return res.status(400).json({ error: 'Invalid userId' });

    const result = {};
    const userData = await safeApiRequest(`https://users.roblox.com/v1/users/${id}`);
    if (!userData || userData.errors) return res.status(404).json({ error: 'User not found' });
    Object.assign(result, userData);

    const headshotData = await safeApiRequest(`https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${id}&size=150x150&format=Png`);
    if (headshotData?.data?.length) result.avatarUrl = headshotData.data[0].imageUrl;

    const fullbodyData = await safeApiRequest(`https://thumbnails.roblox.com/v1/users/avatar?userIds=${id}&size=420x420&format=Png`);
    if (fullbodyData?.data?.length) result.fullBodyAvatar = fullbodyData.data[0].imageUrl;

    const friendsData = await safeApiRequest(`https://friends.roblox.com/v1/users/${id}/friends/count`);
    result.friendsCount = friendsData ? friendsData.count || 0 : 0;

    const followersData = await safeApiRequest(`https://friends.roblox.com/v1/users/${id}/followers/count`);
    result.followersCount = followersData ? followersData.count || 0 : 0;

    const followingData = await safeApiRequest(`https://friends.roblox.com/v1/users/${id}/followings/count`);
    result.followingCount = followingData ? followingData.count || 0 : 0;

    const presenceData = await safeApiRequest('https://presence.roblox.com/v1/presence/users', 'POST', { userIds: [id] });
    if (presenceData?.userPresences?.length) {
      const p = presenceData.userPresences[0];
      result.onlineStatus = p.userPresenceType || 0;
      result.lastLocation = p.lastLocation || 'Unknown';
      result.placeId = p.placeId;
      result.gameId = p.gameId;
      result.lastOnline = p.lastOnline;
    }

    const badgesData = await safeApiRequest(`https://badges.roblox.com/v1/users/${id}/badges?limit=100`);
    if (badgesData?.data) {
      result.badges = badgesData.data;
      result.badgeCount = badgesData.data.length;
    } else {
      result.badges = [];
      result.badgeCount = 0;
    }

    const groupData = await safeApiRequest(`https://groups.roblox.com/v1/users/${id}/groups/primary/role`);
    if (groupData?.group) {
      result.primaryGroup = {
        name: groupData.group.name,
        id: groupData.group.id,
        role: groupData.role.name
      };
    }

    if (result.created) result.accountAge = calculateAccountAge(result.created);
    const statusMap = { 0: 'Offline', 1: 'Online', 2: 'In Game', 3: 'In Studio' };
    result.onlineStatusText = statusMap[result.onlineStatus] || 'Unknown';

    res.status(200).json(result);
  } catch (e) {
    console.error('Enhanced by ID error:', e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

