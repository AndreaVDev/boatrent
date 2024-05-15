import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HolidayList from "./components/HolidayList";
import CalendarFilter from "./components/CalendarFilter";

function App () {
  //const [startDate, setStartDate] = useState(new Date("2014-02-08"));
  //const [endDate, setEndDate] = useState(new Date("2014-02-10"));
		return (
			<div className="App">
        {/* { <CalendarFilter startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}/> } */}
        <CalendarFilter/>

				{/* <HolidayList startDate={startDate} endDate={endDate} /> */}

			</div>
		);
}

export default App;

/*
function App() {
  return (
    <Router>
      <div>
        <h1>List:</h1>
        <div className="cards">
          <Routes>
            <Route
              path="/"
              element={<HolidayList />} 
            />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App;
*/