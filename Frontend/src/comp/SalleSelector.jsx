import React, { useState, useEffect } from "react";
import axios from "axios";

const SalleSelector = ({ onSelect }) => {
  const [salles, setSalles] = useState([]);
  const [selectedSalle, setSelectedSalle] = useState("");

  useEffect(() => {
    const fetchSalles = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/salles");
        setSalles(response.data);
      } catch (error) {
        console.error("Error fetching salles:", error);
      }
    };

    fetchSalles();
  }, []);

  const handleSelectChange = (e) => {
    const salleId = e.target.value;
    setSelectedSalle(salleId);
    onSelect(salleId); // Appel de la fonction onSelect avec l'identifiant de la salle sélectionnée
  };

  return (
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