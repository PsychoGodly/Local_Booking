import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../Config";

const UserProfile = () => {
  // State to store profile data
  const [profileData, setProfileData] = useState(null);
  // State to track loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch profile data
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`http://localhost:${config.portBackend}/api/admin/profile`); // Replace this with your API endpoint
        setProfileData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setLoading(false);
      }
    };

    // Call the fetchProfileData function when the component mounts
    fetchProfileData();
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      {loading ? (
        <p>Loading...</p>
      ) : profileData ? (
        <div>
          <p>ID: {profileData.id}</p>
          <p>Username: {profileData.username}</p>
          <p>Email: {profileData.email}</p>
          <p>Role: {profileData.role}</p>
          {/* Add additional profile fields as needed */}
        </div>
      ) : (
        <p>No profile data found</p>
      )}
    </div>
  );
};

export default UserProfile;
