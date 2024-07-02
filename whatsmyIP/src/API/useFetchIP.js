import React, { useState, useEffect } from "react";

const useFetchIP = () => {
  const [ipData, setIpData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl =
        import.meta.env.VITE_REACT_APP_API_URL ||
        "https://geo.ipify.org/api/v2/country,city?apiKey=";
      const apiKey =
        import.meta.env.VITE_REACT_APP_API_KEY || "default_api_key";

      try {
        const response = await fetch(`${apiUrl}${apiKey}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setIpData(data);
      } catch (error) {
        setError("Error fetching IP address: " + error.message);
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return { ipData, error };
};

export default useFetchIP;
