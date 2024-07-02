import React from "react";
import { DateTime } from "luxon";

const LocalDate = ({ time }) => {
  const localDate = DateTime.now().setZone(time).toFormat("yyyy-MM-dd");
  return <div>{localDate}</div>;
};

export default LocalDate;
