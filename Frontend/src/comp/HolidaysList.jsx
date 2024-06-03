import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import config from "../Config";

import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const HolidaysList = () => {
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await axios.get(
          `http://localhost:${config.portBackend}/api/holidays`
        );
        setHolidays(response.data);
      } catch (error) {
        console.error("Error fetching holidays:", error);
      }
    };

    fetchHolidays();
  }, []);

  const deleteHoliday = (id) => {
    axios
      .delete(`http://localhost:${config.portBackend}/api/holidays/${id}`)
      .then(() => {
        // Update state to remove the deleted holiday from the list
        setHolidays(holidays.filter((holiday) => holiday.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting holiday:", error);
      });
  };

  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'ID', width: 70 },
      { field: 'date', headerName: 'Date', width: 200 },
      { field: 'name', headerName: 'Name', width: 200 },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 150,
        renderCell: (params) => (
          <>
            <IconButton
              color="secondary"
              onClick={() => deleteHoliday(params.row.id)}
            >
              <DeleteIcon />
            </IconButton>
          </>
        ),
      },
    ],
    [deleteHoliday]
  );

  return (
    <div>

        <div className="flex w-full">
          <div className="w-full">
            <h1 className="text-2xl font-bold mt-8 mb-4">List of Holidays</h1>
            <Box sx={{ height: 600, width: '100%' }}>
              <DataGrid
                rows={holidays}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                components={{
                  Toolbar: GridToolbar,
                }}
              />
            </Box>
          </div>
        </div>
      </div>
  );
};

export default HolidaysList;
