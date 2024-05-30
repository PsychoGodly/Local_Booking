import React, { useState, useEffect } from "react";
import axios from "axios";
import UserImg from '../assets/user.png'; // Import your user image

const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("/api/admin/profile"); // Replace this with your API endpoint
        setProfileData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-8 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      {loading ? (
        <p>Loading...</p>
      ) : profileData ? (
        <div className="flex items-center">
          <div className="mr-4">
            <img src={UserImg} alt="User Profile" className="h-20 w-20 rounded-full" />
          </div>
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Username:</label>
              <p className="mt-1 text-sm text-gray-900">{profileData.username}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email:</label>
              <p className="mt-1 text-sm text-gray-900">{profileData.email}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Role:</label>
              <p className="mt-1 text-sm text-gray-900">{profileData.role}</p>
            </div>
            <div className="mb-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Change Photo
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>No profile data found</p>
      )}
    </div>
  );
};

export default UserProfile;
