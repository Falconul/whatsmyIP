import React, { useState, useEffect } from "react";
import { Map } from "./Map";
import { DateTime } from "luxon";
import "./App.css";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Flag from "./Flag";
import useFetchIP from "./API/useFetchIP";
import useFetchCountries from "./API/useFetchCountries";
import LocalDate from "./LocalDate";
import LocalTime from "./LocalTime";
import SplitBasic from "./DropDown";
import AlertDismissible from "./AlertDismissible";

export default function ContextIP() {
  const countries = useFetchCountries();
  const { ipData, error } = useFetchIP();
  const [selectedCityTimezone, setSelectedCityTimezone] = useState("");
  const [draggedCard, setDraggedCard] = useState(null);
  const [cardPosition, setCardPosition] = useState({ top: 0, left: 0 });

  const cities = [
    { name: "Athens", timezone: "Europe/Athens" },
    { name: "Essen", timezone: "Europe/Berlin" },
    { name: "Berlin", timezone: "Europe/Berlin" },
    { name: "Cairo", timezone: "Africa/Cairo" },
    { name: "Kiev", timezone: "Europe/Kiev" },
    { name: "Leipzig", timezone: "Europe/Berlin" },
    { name: "Lisbon", timezone: "Europe/Lisbon" },
    { name: "Liverpool", timezone: "Europe/London" },
    { name: "London", timezone: "Europe/London" },
    { name: "Los Angeles", timezone: "America/Los_Angeles" },
    { name: "Melbourne", timezone: "Australia/Melbourne" },
    { name: "Moscow", timezone: "Europe/Moscow" },
    { name: "New York", timezone: "America/New_York" },
    { name: "Peking (Beijing)", timezone: "Asia/Shanghai" },
    { name: "Quebec", timezone: "America/Toronto" },
    { name: "Sao Paulo", timezone: "America/Sao_Paulo" },
    { name: "Shanghai", timezone: "Asia/Shanghai" },
    { name: "Tel Aviv", timezone: "Asia/Jerusalem" },
    { name: "Tokyo", timezone: "Asia/Tokyo" },
    { name: "Vienna", timezone: "Europe/Vienna" },
  ];

  const handleCitySelect = (timezone) => {
    setSelectedCityTimezone(timezone);
  };

  const calculateTimezoneDifference = () => {
    if (!selectedCityTimezone || !ipData) {
      return 0;
    }
    const userTimezone = ipData.location.timezone;
    const userTime = DateTime.now().setZone(userTimezone);
    const selectedCityTime = DateTime.now().setZone(selectedCityTimezone);
    return (selectedCityTime.offset - userTime.offset) / 60;
  };
  const handleDragStart = (event) => {
    setDraggedCard(event.target);
    event.target.style.opacity = 0.5;
  };

  const handleDragEnd = (event) => {
    setDraggedCard(null);
    event.target.style.opacity = "";
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const newTop = event.clientY;
    const newLeft = event.clientX;
    setCardPosition({ top: newTop, left: newLeft });
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!ipData) {
    return <p>Loading...</p>;
  }

  const { ip, location, as, isp } = ipData;
  const { lat, lng, city, region, country, timezone } = location;

  const countryCode = location.country;
  const { time } = location;

  return (
    <div
      className="content-container"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <Map center={[lat, lng]} />
      <Card
        style={{
          width: "18rem",
          padding: "10px",
          position: "absolute",
          top: cardPosition.top,
          left: cardPosition.left,
          lineHeight: "18px",
        }}
        className="card-container"
        draggable="true"
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <AlertDismissible />
        <Card.Title
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            fontFamily: "Righteous",
            marginTop: "30px",
          }}
        >
          What's my IP?
        </Card.Title>
        <Card.Body>
          <Card.Text style={{ fontSize: "14px" }}>
            You are located in:{" "}
            <p
              style={{
                fontSize: "20px",
                marginBottom: "-50px",
                fontWeight: "bold",
              }}
            >
              {city}, {region}, {country}
            </p>
          </Card.Text>
        </Card.Body>
        <Flag
          countryCode={countryCode}
          style={"shiny"}
          size="64"
          className="flag-container"
        />
        <Card.Body>
          <Card.Text style={{ fontSize: "16px", marginTop: "-40px" }}>
            Your IP Address is:{" "}
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>{ip}</p>
          </Card.Text>
        </Card.Body>
        <Card.Body
          className="time-container"
          style={{ fontSize: "14px", padding: "20px" }}
        >
          <Card.Text>
            Your local date is:{" "}
            <p style={{ fontWeight: "bold" }}>
              <LocalDate timezone={time} />
            </p>
          </Card.Text>
          <Card.Text>
            Your local time is:
            <p style={{ fontWeight: "bold" }}>
              <LocalTime timezone={time} />
            </p>
          </Card.Text>
          <Card.Text>
            Your timezone is:
            <p style={{ fontWeight: "bold" }}>UTC {timezone}</p>
          </Card.Text>
          <SplitBasic cities={cities} onCitySelect={handleCitySelect} />

          <Card.Text>
            Timezone difference: {calculateTimezoneDifference()} hours
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
