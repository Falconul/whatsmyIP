import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import useFetchIP from "./API/useFetchIP";
import "leaflet/dist/leaflet.css";
import "./App.css";

export function Map({ center }) {
  const { ipData, error } = useFetchIP();

  const { ip, location, as, isp } = ipData || {};
  return (
    <MapContainer
      center={center}
      zoom={10}
      scrollWheelZoom={true}
      className="map-container"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center} >
        <Popup>i know where you live: {ip}</Popup>
      </Marker>
    </MapContainer>
  );
}
