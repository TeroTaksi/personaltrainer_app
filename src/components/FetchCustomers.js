import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { Button } from "@mui/material";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";
import Csv from "./Csv";

function FetchCustomers() {
  const fetchCustomersLink = "https://customerrest.herokuapp.com/api/customers";
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => fetchCustomers(), []);

  const fetchCustomers = () => {
    fetch(fetchCustomersLink)
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data.content);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  };

  const deleteCustomer = (url) => {
    console.log("console.log(url) --> " + url);
    if (window.confirm("Delete existing customer?")) {
      fetch(url, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            fetchCustomers();
            fetchCustomers(true);
          } else {
            alert("Could not delete the customer");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const columns = [
    {
      headerName: "Add training",
      field: "links.0.href",
      cellRendererFramework: (params) => <AddTraining customer={params} />,
    },
    {
      field: "firstname",
      headerName: "First name",
      sortable: true,
      filter: true,
    },
    {
      field: "lastname",
      headerName: "Last name",
      sortable: true,
      filter: true,
    },
    {
      field: "phone",
      headerName: "Phone",
      sortable: true,
      filter: true,
    },
    {
      field: "email",
      headerName: "Email",
      sortable: true,
      filter: true,
    },
    {
      field: "city",
      headerName: "City",
      sortable: true,
      filter: true,
    },
    {
      field: "streetaddress",
      headerName: "Street address",
      sortable: true,
      filter: true,
    },
    {
      field: "postcode",
      headerName: "Postcode",
      sortable: true,
      filter: true,
    },
    {
      headerName: " ",
      sortable: false,
      filter: false,
      width: 120,
      field: "links.0.href",
      cellRendererFramework: (params) => (
        <Button
          size="small"
          color="error"
          onClick={() => deleteCustomer(params.value)}
        >
          DELETE
        </Button>
      ),
    },
    {
      headerName: " ",
      sortable: false,
      filter: false,
      width: 120,
      field: "links.0.href",
      cellRendererFramework: (params) => (
        <EditCustomer customer={params} fetchCustomers={fetchCustomers} />
      ),
    },
  ];

  return (
    <div
      className="ag-theme-material"
      style={{ height: 600, width: "75%", margin: "auto", marginTop: 20 }}
    >
      {isLoading && <p>Loading...</p>}
      <AddCustomer fetchCustomersLink={fetchCustomersLink} />
      <AgGridReact
        rowData={customers}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={10}
      />
      <Csv customers={customers} />
    </div>
  );
}
export default FetchCustomers;

/*



*/
