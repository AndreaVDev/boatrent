import axios from "axios";
import React, { useState, useEffect } from "react";
import { baseURL, headers } from "./../services/holiday.service";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './HolidayList'
import moment from 'moment';

import HolidayList from "./HolidayList";
const params = {
	startdate: '2024-05-01',
	enddate: '2024-05-14'
}
// export default function CalendarFilter(startDate, setStartDate, endDate, setEndDate) {
  export default function CalendarFilter() {
  const [startDate, setStartDate] = useState(new Date('2024-05-01'));
  const [endDate, setEndDate] = useState(new Date('2024-05-30'));
  //const [state, setstate] = useState({data:{}}) 
  const [holidays, setHolidays] = useState([]);

  const retrieveAllHolidays = async () => {
    console.log(startDate)
    const response = await axios 
      .get(`${baseURL}/holiday/`, {
		 params: {startdate: moment(startDate).format('YYYY-MM-DD'), enddate: moment(endDate).format('YYYY-MM-DD')}
      })
	  setHolidays(JSON.parse(response.data));
  };


// useEffect() = hook ogni volta che una delle variabili nell'array come secondo parametro della useEffect [] viene modificata chiama la funziona passata nella useEffect
// come primo parametro, leggere sempre al contrario
  useEffect(() => {
    retrieveAllHolidays();
  }, []);
//   , [counter]);

  
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
      <button  onClick={retrieveAllHolidays} type="button"> 
                  Send request
                  </button>    
                  <div>
		{holidays &&
	  		holidays.map((holiday,index) => (
			<div key={index}>
		  		<h2>{holiday.boat_name}</h2>
				  <h3>{holiday.price_total}</h3>
			</div>
	  		))}
			{/* <button onClick={() => {setCounter(counter + 1)}}>{"Click me"}</button> */}
  	</div>
    
   </div>
 );
}

