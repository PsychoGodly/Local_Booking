import React, { useState, useEffect } from "react";
import axios from "axios";

// Component for selecting a room
const SalleSelector = ({ onSelect }) => {
  // State for storing the list of rooms and the currently selected room
  const [salles, setSalles] = useState([]);
  const [selectedSalle, setSelectedSalle] = useState("");

  // Fetch the list of rooms when the component mounts
  useEffect(() => {
    const fetchSalles = async () => {
      try {
        // Fetch rooms data from the API
        const response = await axios.get("http://localhost:8080/api/salles");
        // Set the fetched rooms data to state
        setSalles(response.data);
      } catch (error) {
        console.error("Error fetching salles:", error);
      }
    };

    fetchSalles();
  }, []); // Empty dependency array means this effect runs only once after the initial render

  // Handle change when a room is selected from the dropdown
  const handleSelectChange = (e) => {
    // Get the selected room's ID
    const salleId = e.target.value;
    // Update the selected room in state
    setSelectedSalle(salleId);
    // Call the onSelect function with the selected room's ID
    onSelect(salleId);
  };

  return (
    // Dropdown for selecting a room
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
  <label htmlFor="salle" className="block text-sm font-medium mb-2">Choisir une salle :</label>
  <select
    id="salle"
    value={selectedSalle}
    onChange={handleSelectChange}
    className="w-full px-3 py-2 border border-gray-300 rounded-md"
  >
    <option value="" disabled>Sélectionner une salle</option>
    {salles.map((salle) => (
      <option key={salle.id} value={salle.id}>
        {salle.salleName}
      </option>
    ))}
  </select>
</div>

  );
};

export default SalleSelector;