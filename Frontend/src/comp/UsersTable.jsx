import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import config from "../Config";
import Header from "./Header";
import SideBar from "./SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserXmark, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import UserForm from "./UserForm";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import ReactPaginate from "react-paginate";
import * as XLSX from "xlsx";

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

  const data = useMemo(() => users, [users]);
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Role",
        accessor: "role",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700">
              <FontAwesomeIcon icon={faUserEdit} />
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
              onClick={() => deleteUser(row.original.id)}
            >
              <FontAwesomeIcon icon={faUserXmark} />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    setGlobalFilter,
    state: { pageIndex, pageSize },
    canPreviousPage,
    canNextPage,
    previousPage,
    nextPage,
    setPageSize,
    pageCount,
    gotoPage,
  } = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 5 } },
    useGlobalFilter,
    usePagination
  );

  const handleSearch = (event) => {
    setGlobalFilter(event.target.value || undefined);
  };

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "UsersData.xlsx");
  };

  return (
    <div>
      <Header />
      <div className="flex mt-8">
        <div className="-mt-8 mr-6">
          <SideBar />
        </div>
        <div className="flex w-full">
          <div className="w-full">
            <h2 className="text-xl font-bold mb-4">Users List</h2>
            <div className="mb-4">
              <input
                type="text"
                className="border p-2 rounded"
                placeholder="Search..."
                onChange={handleSearch}
              />
              <button
                onClick={handleExport}
                className="ml-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Export
              </button>
            </div>
            <table
              {...getTableProps()}
              className="min-w-full divide-y divide-gray-200"
            >
              <thead className="bg-gray-200">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps()}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <td
                          {...cell.getCellProps()}
                          className="px-6 py-4 whitespace-nowrap"
                        >
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="pagination mt-4">
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={({ selected }) => gotoPage(selected)}
                containerClassName={"pagination"}
                activeClassName={"active"}
                previousClassName={"page-item"}
                nextClassName={"page-item"}
                pageClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextLinkClassName={"page-link"}
                pageLinkClassName={"page-link"}
                activeLinkClassName={"page-link active"}
              />
            </div>
          </div>
          <div className="-ml-[400px] mt-4">
            <UserForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersTable;
