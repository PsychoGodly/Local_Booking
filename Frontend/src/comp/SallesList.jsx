import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import config from "../Config";
import Header from "./Header";
import SideBar from "./SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddSalleForm from "./AddSalleForm";
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
        console.error("Error deleting salle:", error);
      });
  };

  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'salleName', headerName: 'Name', width: 200 },
      { field: 'capacity', headerName: 'Capacity', width: 150 },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 150,
        renderCell: (params) => (
          <>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={() => deleteSalle(params.row.id)}
            >
              <DeleteIcon />
            </IconButton>
          </>
        ),
      },
    ],
    [deleteSalle]
  );

  return (
    <div>
      <Header />
      <div className="flex">
        <div className="mr-6">
          <SideBar />
        </div>
        <div className="flex w-full">
          <div className="w-full">
            <h1 className="text-2xl font-bold mt-8 mb-4">List of Salles</h1>
            <Box sx={{ height: 600, width: '100%' }}>
              <DataGrid
                rows={salles}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                components={{
                  Toolbar: GridToolbar,
                }}
              />
            </Box>
          </div>
          <div className="ml-8 mt-4">
            <AddSalleForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SallesList;
