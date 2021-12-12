import { Button } from "@mui/material";
import React from "react";
import { CSVLink } from "react-csv"; // https://www.npmjs.com/package/react-csv

function Csv(props) {
  const headers = [
    { label: "First Name", key: "firstname" },
    { label: "Last Name", key: "lastname" },
    { label: "Phone", key: "phone" },
    { label: "Email", key: "email" },
    { label: "City", key: "city" },
    { label: "Street address", key: "streetaddress" },
    { label: "Postcode", key: "postcode" },
  ];

  return (
    <div>
      <CSVLink
        data={props.customers}
        headers={headers}
        filename="customers.csv"
        style={{ display: "inline", textDecoration: "none" }}
      >
        <Button variant="outlined" color="secondary">
          Download Customers
        </Button>
      </CSVLink>
    </div>
  );
}

export default Csv;
