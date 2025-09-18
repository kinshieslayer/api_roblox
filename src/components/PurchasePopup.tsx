import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type UserData = {
    displayName: string;
    name: string;
    imageUrl: string;
    followersCount: number;
    accountAge: string;
};

type PurchasePopupProps = {
    item: {
        name: string;
        image: string;
    };
    onConfirm: (username: string) => void;
    onCancel: () => void;
};

const PurchasePopup = ({ item, onConfirm, onCancel }: PurchasePopupProps) => {
    const [username, setUsername] = useState("");
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState("");

    const searchUser = async () => {
        if (!username) return;

        setIsSearching(true);
        setError("");
        setUserData(null);

        try {
            const response = await fetch(`/api/user/enhanced/by-username/${encodeURIComponent(username)}`);
            const contentType = response.headers.get('content-type') || '';

            if (!response.ok) {
                let message = 'Something went wrong.';
                try {
                    if (contentType.includes('application/json')) {
                        const body = await response.json();
                        message = body?.error || message;
                    } else {
                        const text = await response.text();
                        message = text?.slice(0, 200) || message;
                    }
                } catch {}
                setError(message);
                return;
            }

            const data = contentType.includes('application/json') ? await response.json() : null;
            if (!data) {
                setError('Unexpected response from server.');
                return;
            }

            setUserData({
                displayName: data.displayName,
                name: data.name,
                imageUrl: data.avatarUrl,
                followersCount: data.followersCount,
                accountAge: data.accountAge,
            });

        } catch (err) {
            console.error("Fetch error:", err);
            setError("Failed to connect to the server. Check if the server is running.");
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-gray-800 text-white w-80 rounded-lg overflow-hidden shadow-xl">
                <div className="p-4 border-b border-gray-700">
                    <h3 className="text-center text-lg font-medium">Get item</h3>
                </div>

                <div className="p-4">
                    <div className="flex justify-center mb-4">
                        <img src={item.image} alt={item.name} className="w-24 h-24 object-contain" />
                    </div>

                    <p className="text-center mb-4">Would you like to get "{item.name}"?</p>

                    <div className="mb-4">
                        <Input
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mb-2 bg-white text-black"
                        />
                        <Button
                            variant="outline"
                            className="w-full mb-2 border-gray-600 text-black"
                            onClick={searchUser}
                            disabled={isSearching || !username}
                        >
                            {isSearching ? "Searching..." : "Search User"}
                        </Button>
                    </div>

                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                    {userData && (
                        <div className="text-center mb-4">
                            <div className="flex items-center justify-center mb-4">
                                <img
                                    src={userData.imageUrl}
                                    alt={userData.displayName}
                                    className="w-12 h-12 rounded-full mr-2"
                                />
                                <div>
                                    <p className="font-medium">{userData.displayName}</p>
                                    <p className="text-sm text-gray-400">@{userData.name}</p>
                                </div>
                            </div>

                            <div className="text-sm text-gray-400">
                                <p>Followers: {userData.followersCount.toLocaleString()}</p>
                                <p>Account Age: {userData.accountAge}</p>
                            </div>
                        </div>
                    )}

                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            className="flex-1 border-gray-600 text-black"
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>

                        <Button
                            className="flex-1 bg-green-500 text-white hover:bg-green-600"
                            onClick={() => onConfirm(username)}
                            disabled={!userData}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Free
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchasePopup;
