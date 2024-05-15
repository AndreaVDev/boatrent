import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// export default function CalendarFilter(startDate, setStartDate, endDate, setEndDate) {
  export default function Cal() {
  const [startDate, setStartDate] = useState(new Date("2024-02-08"));
  const [endDate, setEndDate] = useState(new Date("2024-02-10"));
 return (
   <div>
     <DatePicker
        dateFormat={"YYYY-MM-dd"}
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
      />
      <DatePicker
        dateFormat={"YYYY-MM-dd"}
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />

   </div>
 );
}

