import React, { useState, useEffect } from "react";
import axios from "axios";
import UserImg from "../assets/user.png"; // Import your user image
import config from "../Config";
import Header from "./Header";
import SideBar from "./SideBar";
import back from "../assets/back.jpg";
const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:${config.portBackend}/api/admin/profile`
        ); // Replace this with your API endpoint
        setProfileData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleEditProfile = () => {
    // Implement logic for editing profile data
    console.log("Editing profile...");
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-1">
          <SideBar />
          <div className="flex-1">
            <img
                src={back}
                alt="background"
                className="w-full h-[150px]"
                style={{opacity : "0.3"}}
              />
            <div className="max-w-lg -mt-36 bg-white p-8 ">
              <img
                src={UserImg}
                alt="User Profile"
                className="h-20 w-20 rounded-full"
              />
              {loading ? (
                <p>Loading...</p>
              ) : profileData ? (
                <>
                  <table className="w-full mt-24 p-6 shadow-sm">
                    <tbody className="">
                      <tr className="">
                        <td className="pt-2 font-medium text-gray-700">Username:</td>
                        <td className="text-gray-900">{profileData.username}</td>
                      </tr>
                      <tr className="">
                        <td className="pt-2 font-medium text-gray-700">Email:</td>
                        <td className="text-gray-900">{profileData.email}</td>
                      </tr>
                      <tr className="">
                        <td className="pt-2 font-medium text-gray-700">Role:</td>
                        <td className="text-gray-900">{profileData.role}</td>
                      </tr>
                      <tr className="">
                        <td className="pt-2 font-medium text-gray-700">Country:</td>
                        <td className="text-gray-900">FR</td>
                      </tr>
                      <tr className="">
                        <td className="pt-2 font-medium text-gray-700">Phone:</td>
                        <td className="text-gray-900">+23476346623247</td>
                      </tr>
                      <tr className="">
                        <td className="pt-2 font-medium text-gray-700">Address:</td>
                        <td className="text-gray-900">Street N.6</td>
                      </tr>
                    </tbody>
                  </table>
                  
                </>
              ) : (
                <p>No profile data found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
