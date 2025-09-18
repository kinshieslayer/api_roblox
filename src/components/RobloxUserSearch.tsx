import React, { useState } from 'react';

interface User {
  id: number;
  name: string;
  displayName: string;
  pfpUrl: string;
}

const RobloxUserSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchUser = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);
    setUser(null);

    try {
      const response = await fetch('/api/roblox/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: searchTerm })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get user data');
      }

      const data = await response.json();
      setUser({
        id: data.user.id,
        name: data.user.name,
        displayName: data.user.displayName,
        pfpUrl: data.imageUrl
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Roblox username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />
        <button
          onClick={searchUser}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}

      {user && (
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <img
              src={user.pfpUrl}
              alt="Profile Picture"
              className="w-16 h-16 rounded-lg mr-4"
            />
            <div>
              <p className="font-bold">{user.displayName}</p>
              <p className="text-gray-600">Username: {user.name}</p>
              <p className="text-gray-600">ID: {user.id}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RobloxUserSearch;
