import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";

const SplitBasic = ({ cities, onCitySelect }) => {
  const [selectedCity, setSelectedCity] = useState("");

  const handleSelect = (cityName, timezone) => {
    setSelectedCity(cityName);
    onCitySelect(timezone);
  };

  return (
    <Dropdown as={ButtonGroup}>
      <Button variant="success">{selectedCity || "Select City"}</Button>

      <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

      <Dropdown.Menu>
        {cities.map((city, index) => (
          <Dropdown.Item
            key={index}
            href="#"
            onClick={() => handleSelect(city.name, city.timezone)}
          >
            {city.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SplitBasic;
