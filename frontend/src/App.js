import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HolidayList from "./components/HolidayList";

class App extends Component {
	render() {
		return (
			<div className="App">
				<HolidayList/>
			</div>
		);
	}
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