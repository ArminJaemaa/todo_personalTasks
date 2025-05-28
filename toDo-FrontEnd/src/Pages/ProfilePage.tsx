import { useEffect, useState } from 'react';
import { fetchUserProfile } from '../services/UserService';

interface UserProfile {
  id: string;
  name: string;
}

function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetchUserProfile();
        setProfile(res.data);
      } catch (err) {
        console.error('Failed to fetch profile', err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!profile) return <p>Could not load profile</p>;

  return (
    <div>
      <h2>User Profile</h2>
      <p><strong>ID:</strong> {profile.id}</p>
      <p><strong>Name:</strong> {profile.name}</p>
    </div>
  );
}

export default Profile;
