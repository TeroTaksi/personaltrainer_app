import "./App.css";
import React, { useState } from "react";
import { AppBar, Tabs, Tab } from "@mui/material";
import FetchCustomers from "./components/FetchCustomers";
import FetchTrainings from "./components/FetchTrainings";
import MyCalendar from "./components/MyCalendar";
import Statistics from "./components/Statistics";

function App() {
  const [value, setValue] = useState("one");

  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <div className="App">
      <AppBar position="static" style={{ backgroundColor: "rgb(220,220,230)" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="one" label="CUSTOMERS" />
          <Tab value="two" label="TRAININGS" />
          <Tab value="three" label="CALENDAR" />
          <Tab value="four" label="STATISTICS" />
        </Tabs>
      </AppBar>
      {value === "one" && <FetchCustomers />}
      {value === "two" && <FetchTrainings />}
      {value === "three" && <MyCalendar />}
      {value === "four" && <Statistics />}
    </div>
  );
}

export default App;
