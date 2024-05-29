import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../Config";
import Header from "./Header";
import SideBar from "./SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faUserEdit, faUserXmark } from "@fortawesome/free-solid-svg-icons";

const SallesList = () => {
  const [salles, setSalles] = useState([]);

  useEffect(() => {
    const fetchSalles = async () => {
      try {
        const response = await axios.get(
          `http://localhost:${config.portBackend}/api/salles`
        );
        setSalles(response.data);
      } catch (error) {
        console.error("Error fetching salles:", error);
      }
    };

    fetchSalles();
  }, []);

  const deleteSalle = (id) => {
    axios
      .delete(`http://localhost:${config.portBackend}/api/delete_salle/${id}`)
      .then(() => {
        // Update state to remove the deleted user from the list
        setSalles(salles.filter((salle) => salle.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <div>
      <Header />
      <div className="flex">
        <div className="mr-6">
          <SideBar />
        </div>
        <div className="container w-2/5 px-4">
          <h1 className="text-2xl font-bold mt-8 mb-4">List of Salles</h1>
          <table className="w-full border border-collapse border-gray-400">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Capacity</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {salles.map((salle) => (
                <tr key={salle.id} className="border-b border-gray-400">
                  <td className="px-4 py-2">{salle.id}</td>
                  <td className="px-4 py-2">{salle.salleName}</td>
                  <td className="px-4 py-2">{salle.capacity}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    <button className="action-button bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700">
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button
                      className="action-button bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                      onClick={() => deleteSalle(salle.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SallesList;
