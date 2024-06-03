import React, { useState, useEffect } from "react";
import axios from "axios";
import UserImg from "../assets/user.png";
import config from "../Config";
import Header from "./Header";
import SideBar from "./SideBar";
import back from "../assets/back.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faUserShield, faFlag, faPhone, faHome } from "@fortawesome/free-solid-svg-icons";

const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:${config.portBackend}/api/admin/profile`
        );
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
              className="w-full h-[150px] object-cover"
              style={{ opacity: "0.3" }}
            />
            <div className="max-w-lg -mt-36 mx-auto bg-white p-8 rounded-lg shadow-lg">
              <img
                src={UserImg}
                alt="User Profile"
                className="h-20 w-20 rounded-full mx-auto border-4 border-white shadow-lg"
              />
              {loading ? (
                <p className="text-center mt-4 text-gray-700">Loading...</p>
              ) : profileData ? (
                <>
                  <table className="w-full mt-6 text-left">
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 font-medium text-gray-700 flex items-center">
                          <FontAwesomeIcon icon={faUser} className="mr-2 text-gray-500" />
                          Username:
                        </td>
                        <td className="text-gray-900">{profileData.username}</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 font-medium text-gray-700 flex items-center">
                          <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-gray-500" />
                          Email:
                        </td>
                        <td className="text-gray-900">{profileData.email}</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 font-medium text-gray-700 flex items-center">
                          <FontAwesomeIcon icon={faUserShield} className="mr-2 text-gray-500" />
                          Role:
                        </td>
                        <td className="text-gray-900">{profileData.role}</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 font-medium text-gray-700 flex items-center">
                          <FontAwesomeIcon icon={faFlag} className="mr-2 text-gray-500" />
                          Country:
                        </td>
                        <td className="text-gray-900">FR</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-2 font-medium text-gray-700 flex items-center">
                          <FontAwesomeIcon icon={faPhone} className="mr-2 text-gray-500" />
                          Phone:
                        </td>
                        <td className="text-gray-900">+23476346623247</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium text-gray-700 flex items-center">
                          <FontAwesomeIcon icon={faHome} className="mr-2 text-gray-500" />
                          Address:
                        </td>
                        <td className="text-gray-900">Street N.6</td>
                      </tr>
                    </tbody>
                  </table>
                  <button
                    onClick={handleEditProfile}
                    className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
                  >
                    Edit Profile
                  </button>
                </>
              ) : (
                <p className="text-center mt-4 text-gray-700">No profile data found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
