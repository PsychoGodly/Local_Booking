import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../Config";
import Header from "./Header";
import SideBar from "./SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserXmark, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import UserForm from "./UserForm";

function UsersTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data from backend API
    axios
      .get(`http://localhost:${config.portBackend}/api/users`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:${config.portBackend}/api/user/${id}`)
      .then(() => {
        // Update state to remove the deleted user from the list
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <div>
      <Header />
      <div className="flex mt-8">
        <div className=" -mt-8 mr-6">
          <SideBar />
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="w-full">
            <h2 className="text-xl font-bold mb-4">Users List</h2>
            <div className="">
              <table className="border border-gray-400">
                <thead>
                  <tr>
                    <th className="px-4 py-2 bg-gray-200 border border-gray-400">
                      ID
                    </th>
                    <th className="px-4 py-2 bg-gray-200 border border-gray-400">
                      Username
                    </th>
                    <th className="px-4 py-2 bg-gray-200 border border-gray-400">
                      Email
                    </th>
                    <th className="px-4 py-2 bg-gray-200 border border-gray-400">
                      Role
                    </th>
                    <th className="px-4 py-2 bg-gray-200 border border-gray-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-4 py-2 border border-gray-400">
                        {user.id}
                      </td>
                      <td className="px-4 py-2 border border-gray-400">
                        {user.username}
                      </td>
                      <td className="px-4 py-2 border border-gray-400">
                        {user.email}
                      </td>
                      <td className="px-4 py-2 border border-gray-400">
                        {user.role}
                      </td>
                      <td className="px-4 py-2 border border-gray-400 flex space-x-2">
                        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700">
                          <FontAwesomeIcon icon={faUserEdit} />
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                          onClick={() => deleteUser(user.id)}
                        >
                          <FontAwesomeIcon icon={faUserXmark} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <UserForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersTable;
