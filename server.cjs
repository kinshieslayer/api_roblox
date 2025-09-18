const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static('public')); // Assumes you have a 'public' directory for your static files

// Helper function to safely make API requests
async function safeApiRequest(url, method = 'GET', data = null) {
    try {
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (method === 'POST' && data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(`API Error for ${url}:`, error.message);
        return null;
    }
}

// Calculate how long ago the account was created
function calculateAccountAge(createdDate) {
    try {
        const created = new Date(createdDate);
        const now = new Date();
        const diffTime = Math.abs(now - created);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        const years = Math.floor(diffDays / 365);
        const months = Math.floor((diffDays % 365) / 30);
        const days = diffDays % 30;
        
        if (years > 0) {
            return `${years} year${years !== 1 ? 's' : ''} ago`;
        } else if (months > 0) {
            return `${months} month${months !== 1 ? 's' : ''} ago`;
        } else {
            return `${days} day${days !== 1 ? 's' : ''} ago`;
        }
    } catch (error) {
        return "Unknown";
    }
}

// Routes
// Enhanced user info by user ID
app.get('/api/user/enhanced/:userId', async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const result = {};
        
        // 1. BASIC USER INFO
        const userUrl = `https://users.roblox.com/v1/users/${userId}`;
        const userData = await safeApiRequest(userUrl);
        
        if (!userData || userData.errors) {
            return res.status(404).json({ error: "User not found" });
        }
        
        Object.assign(result, userData);
        
        // 2. AVATAR IMAGES
        const headshotUrl = `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=150x150&format=Png`;
        const headshotData = await safeApiRequest(headshotUrl);
        if (headshotData && headshotData.data && headshotData.data.length > 0) {
            result.avatarUrl = headshotData.data[0].imageUrl;
        }
        
        const fullbodyUrl = `https://thumbnails.roblox.com/v1/users/avatar?userIds=${userId}&size=420x420&format=Png`;
        const fullbodyData = await safeApiRequest(fullbodyUrl);
        if (fullbodyData && fullbodyData.data && fullbodyData.data.length > 0) {
            result.fullBodyAvatar = fullbodyData.data[0].imageUrl;
        }
        
        // 3. SOCIAL STATS
        const friendsUrl = `https://friends.roblox.com/v1/users/${userId}/friends/count`;
        const friendsData = await safeApiRequest(friendsUrl);
        result.friendsCount = friendsData ? friendsData.count || 0 : 0;
        
        const followersUrl = `https://friends.roblox.com/v1/users/${userId}/followers/count`;
        const followersData = await safeApiRequest(followersUrl);
        result.followersCount = followersData ? followersData.count || 0 : 0;
        
        const followingUrl = `https://friends.roblox.com/v1/users/${userId}/followings/count`;
        const followingData = await safeApiRequest(followingUrl);
        result.followingCount = followingData ? followingData.count || 0 : 0;
        
        // 4. ONLINE PRESENCE
        const presenceUrl = "https://presence.roblox.com/v1/presence/users";
        const presencePayload = { userIds: [userId] };
        const presenceData = await safeApiRequest(presenceUrl, 'POST', presencePayload);
        
        if (presenceData && presenceData.userPresences && presenceData.userPresences.length > 0) {
            const presence = presenceData.userPresences[0];
            result.onlineStatus = presence.userPresenceType || 0;
            result.lastLocation = presence.lastLocation || "Unknown";
            result.placeId = presence.placeId;
            result.gameId = presence.gameId;
            result.lastOnline = presence.lastOnline;
        }
        
        // 5. BADGES INFORMATION
        const badgesUrl = `https://badges.roblox.com/v1/users/${userId}/badges?limit=100`;
        const badgesData = await safeApiRequest(badgesUrl);
        if (badgesData && badgesData.data) {
            result.badges = badgesData.data;
            result.badgeCount = badgesData.data.length;
        } else {
            result.badges = [];
            result.badgeCount = 0;
        }
        
        // 6. PRIMARY GROUP
        const groupUrl = `https://groups.roblox.com/v1/users/${userId}/groups/primary/role`;
        const groupData = await safeApiRequest(groupUrl);
        if (groupData && groupData.group) {
            result.primaryGroup = {
                name: groupData.group.name,
                id: groupData.group.id,
                role: groupData.role.name
            };
        }
        
        // 7. CALCULATED FIELDS
        if (result.created) {
            result.accountAge = calculateAccountAge(result.created);
        }
        
        const statusMap = { 0: "Offline", 1: "Online", 2: "In Game", 3: "In Studio" };
        result.onlineStatusText = statusMap[result.onlineStatus] || "Unknown";
        
        res.json(result);
    } catch (error) {
        console.error('Error in enhanced user lookup:', error);
        res.status(500).json({ error: error.message });
    }
});

// Enhanced user info by username
app.get('/api/user/enhanced/by-username/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const idUrl = "https://users.roblox.com/v1/usernames/users";
        const idData = await safeApiRequest(idUrl, 'POST', { usernames: [username] });
        
        if (!idData || !idData.data || idData.data.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        
        const userId = idData.data[0].id;
        const userResponse = await fetch(`http://localhost:${PORT}/api/user/enhanced/${userId}`);
        const userData = await userResponse.json();
        
        res.json(userData);
    } catch (error) {
        console.error('Error in username lookup:', error);
        res.status(500).json({ error: error.message });
    }
});

// Compare two users
app.get('/api/user/compare/:user1Id/:user2Id', async (req, res) => {
    try {
        const user1Id = parseInt(req.params.user1Id);
        const user2Id = parseInt(req.params.user2Id);
        
        const [user1Response, user2Response] = await Promise.all([
            fetch(`http://localhost:${PORT}/api/user/enhanced/${user1Id}`),
            fetch(`http://localhost:${PORT}/api/user/enhanced/${user2Id}`)
        ]);
        
        const user1Data = await user1Response.json();
        const user2Data = await user2Response.json();
        
        if (user1Data.error || user2Data.error) {
            return res.status(404).json({ error: "One or both users not found" });
        }
        
        const comparison = {
            user1: user1Data,
            user2: user2Data,
            comparison: {
                older_account: (user1Data.created || "") < (user2Data.created || "") ? user1Data.name : user2Data.name,
                more_friends: (user1Data.friendsCount || 0) > (user2Data.friendsCount || 0) ? user1Data.name : user2Data.name,
                more_followers: (user1Data.followersCount || 0) > (user2Data.followersCount || 0) ? user1Data.name : user2Data.name,
                more_badges: (user1Data.badgeCount || 0) > (user2Data.badgeCount || 0) ? user1Data.name : user2Data.name
            }
        };
        
        res.json(comparison);
    } catch (error) {
        console.error('Error in user comparison:', error);
        res.status(500).json({ error: error.message });
    }
});

// Serve the main HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, '127.0.0.1', () => {
    console.log('🚀 Enhanced Roblox User Lookup Server');
    console.log('📍 Available endpoints:');
    console.log('   GET  / - Web interface');
    console.log('   GET  /api/user/enhanced/<user_id> - Enhanced user data by ID');
    console.log('   GET  /api/user/enhanced/by-username/<username> - Enhanced user data by username');
    console.log('   GET  /api/user/compare/<user1_id>/<user2_id> - Compare two users');
    console.log(`🌐 Server running at http://127.0.0.1:${PORT}`);
});