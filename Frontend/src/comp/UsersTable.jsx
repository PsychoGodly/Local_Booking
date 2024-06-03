import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import config from "../Config";
import Header from "./Header";
import SideBar from "./SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserXmark, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import UserForm from "./UserForm";
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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

  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'username', headerName: 'Username', width: 200 },
      { field: 'email', headerName: 'Email', width: 250 },
      { field: 'role', headerName: 'Role', width: 150 },
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
              onClick={() => deleteUser(params.row.id)}
            >
              <DeleteIcon />
            </IconButton>
          </>
        ),
      },
    ],
    [deleteUser]
  );

  return (
    <div>
      <Header />
      <div className="flex mt-8">
        <div className=" -mt-8 mr-6">
          <SideBar />
        </div>
        <div className="flex w-full">
          <div className="w-full">
            <h2 className="text-xl font-bold mb-4">Users List</h2>
            <Box sx={{ height: 600, width: '100%' }}>
              <DataGrid
                rows={users}
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
            <UserForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersTable;
