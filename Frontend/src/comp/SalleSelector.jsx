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
    <div>
      <label htmlFor="salle">Choisir une salle :</label>
      <select
        id="salle"
        value={selectedSalle}
        onChange={handleSelectChange}
      >
        <option value="">Sélectionner une salle</option>
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
