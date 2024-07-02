// Flag.jsx
import React from "react";

const Flag = ({ countryCode, style = "shiny", size = "64" }) => {
  if (!countryCode) {
    return <p>Loading flag...</p>;
  }

  const flagUrl = `https://flagsapi.com/${countryCode}/${style}/${size}.png`;

  return (
    <img
      src={flagUrl}
      alt={`Flag of ${countryCode}`}
      style={{
        width: "100%",
      }}
    />
  );
};

export default Flag;
