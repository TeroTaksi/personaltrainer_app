import React from "react";
import { format } from "date-fns"; // https://date-fns.org/
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { Button } from "@mui/material";
import FetchTraingsData from "./FetchTrainingsData";

function FetchTrainings() {
  const { trainings, isLoading, fetchTrainings } = FetchTraingsData(); // FetchTraingsData.js

  const deleteTraining = (id) => {
    let deleteUrl = `https://customerrest.herokuapp.com/api/trainings/${id}`;
    if (window.confirm("Delete training session?")) {
      fetch(deleteUrl, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            fetchTrainings();
            fetchTrainings(true);
          } else {
            alert("Could not delete the training session");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const columns = [
    {
      field: "date",
      headerName: "Date",
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        return format(new Date(params.value), "dd.MM.yyyy hh:mm.aaa");
      },
    },
    {
      field: "duration",
      headerName: "Duration",
      sortable: true,
      filter: true,
    },
    {
      field: "activity",
      headerName: "Activity",
      sortable: true,
      filter: true,
    },
    {
      field: "customer",
      headerName: "Customer",
      sortable: true,
      filter: true,
      cellRendererFramework: (params) => {
        if (params.value == null) {
          return "No name available";
        } else if (params == null) {
          return "null";
        } else if (
          params.value.firstname != null &&
          params.value.lastname != null
        ) {
          return `${params.value.firstname} ${params.value.lastname}`;
        }
      },
    },
    {
      headerName: " ",
      sortable: false,
      filter: false,
      width: 120,
      cellRendererFramework: (params) => (
        <Button
          size="small"
          color="error"
          onClick={() => deleteTraining(params.data.id)}
        >
          DELETE
        </Button>
      ),
    },
  ];

  return (
    <div
      className="ag-theme-material"
      style={{ height: 600, width: "65%", margin: "auto", marginTop: 20 }}
    >
      {isLoading && <p>Loading...</p>}
      <AgGridReact
        rowData={trainings}
        columnDefs={columns}
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
}

export default FetchTrainings;
