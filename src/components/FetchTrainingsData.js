import { useEffect, useState } from "react";

function FetchTraingsData() {
  const [trainings, setTrainings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => fetchTrainings(), []);

  const fetchTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then((response) => response.json())
      .then((data) => {
        setTrainings(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return { trainings, isLoading, fetchTrainings };
}

export default FetchTraingsData;
