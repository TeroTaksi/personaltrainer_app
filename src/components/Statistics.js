import React from "react";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import _ from "lodash";
import FetchTraingsData from "./FetchTrainingsData";

function Statistics() {
  const { trainings, isLoading } = FetchTraingsData(); // FetchTraingsData.js

  const stats = () => {
    const grouped = _.groupBy(trainings, "activity");
    const data = _(grouped)
      .map((training, id) => ({
        name: id,
        duration: _.sumBy(training, "duration"),
      }))
      .value();
    return data;
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      <BarChart
        width={800}
        height={600}
        data={stats()}
        style={{ margin: "auto", marginTop: "30px" }}
      >
        <Bar dataKey="duration" fill="#8884d8" />
        <XAxis dataKey="name" />
        <YAxis
          label={{
            value: "Duration (min)",
            position: "insideLeft",
            angle: -90,
            dx: -5,
          }}
        />
      </BarChart>
    </div>
  );
}

export default Statistics;

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values
// https://stackoverflow.com/questions/58236110/why-lodash-wrapper-doesnt-work-with-foreach
// https://lodash.com/docs/#values
