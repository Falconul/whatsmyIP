import React from "react";
import { DateTime } from "luxon";

const LocalTime = ({ time }) => {
  const localTime = DateTime.now().setZone(time).toFormat("HH:mm:ss");
  return <div>{localTime}</div>;
};

export default LocalTime;
