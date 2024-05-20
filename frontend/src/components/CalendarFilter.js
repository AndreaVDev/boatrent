import axios from "axios";
import React, { useState, useEffect } from "react";
import { baseURL, headers } from "./../services/holiday.service";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const params = {
  startdate: "2024-05-01",
  enddate: "2024-05-14",
};
// export default function CalendarFilter(startDate, setStartDate, endDate, setEndDate) {
export default function CalendarFilter() {
  const [startDate, setStartDate] = useState(new Date("2024-05-01"));
  const [endDate, setEndDate] = useState(new Date("2024-05-30"));
  //const [state, setstate] = useState({data:{}})
  const [holidays, setHolidays] = useState([]);

  const retrieveAllHolidays = async () => {
    try {
      const response = await axios.get(`${baseURL}/holiday/`, {
        params: {
          startdate: moment(startDate).format("YYYY-MM-DD"),
          enddate: moment(endDate).format("YYYY-MM-DD"),
        },
      });
      setHolidays(JSON.parse(response.data));
      console.log(response.data)
    } catch (error) {
      if (error.response) {
        // The server responded with a status code outside the 2xx range
        console.log("Error response: ", error.response);
        document.write(error.response);
      } else if (error.request) {
        // The request was made but no response was received
        console.log("Error request: ", error.request);
        document.write(error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        document.write(error.message);
        console.log("Error message: ", error.message);
      }
    }
  };

  // useEffect() = hook ogni volta che una delle variabili nell'array come secondo parametro della useEffect [] viene modificata chiama la funziona passata nella useEffect
  // come primo parametro, leggere sempre al contrario
  useEffect(() => {
    retrieveAllHolidays();
  }, [retrieveAllHolidays]);
  //   , [counter]);

  return (
    <div className="container">
      <h2>Select the desired period:</h2>
      <div className="row">
        <div className="col">
          <h5>Start date</h5>
          <DatePicker
            dateFormat={"YYYY-MM-dd"}
            selected={startDate}
            onChange={(date) =>
              setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
        </div>
        <div className="col">
          <h5>End date</h5>
          <DatePicker
            dateFormat={"YYYY-MM-dd"}
            selected={endDate}
            onChange={(date) =>
              setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button onClick={retrieveAllHolidays} type="button">
            Send request
          </button>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          {holidays && holidays.length ? (
            holidays.map((holiday, index) => (
              <div key={index} className="col-sm-3 mt-3 d-flex align-self-stretch">
                <div className="card flex-fill">
                  <img className="card-img-top img-fluid flex-fill" src={holiday.boat_image ? `data:image/jpeg;base64,${holiday.boat_image}` : require('../images/dummy.png')} width={260} height={170} alt="Boat" />
                  <div className="card-body flex-fill" >
                    <h5 className="card-title font-weight-bold">{holiday.boat_name}</h5>
                    <p className="card-text">Total price: {holiday.price_total}</p>

                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>
              <p>No holiday available</p>
            </div>
          )}
        </div></div>
    </div>
  );
}
