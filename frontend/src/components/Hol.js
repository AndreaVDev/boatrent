import axios from "axios";
import React, { useState, useEffect } from "react";
import { baseURL, headers } from "./../services/holiday.service";
import { useNavigate } from "react-router-dom";


/*
class HolidayList extends Component {
	constructor(props) {
		super(props) 
		this.state = {
			holidays: []
		}
	}
	
	

	componentDidMount() {
		const params = {
			startdate: '2024-05-01',
			enddate: '2024-05-16'
		}
	
		axios.get(`${baseURL}/holiday/`, {
        
          headers, params
        
      })
		.then(response => {
			console.log(response)
			this.setState({ holidays: response.data})
		})
		.catch(error => {
			console.log(error)
		})
	}
	
	render() {
		const { holidays } = this.state
		console.log("Holidays type", typeof(holidays))
		console.log("Holidays content", holidays)
		return (
			<div>
			{holidays &&
			  holidays.map((holiday,index) => (
				<div key={index}>
				  <h2>{holiday.boat_name}</h2>
				</div>
			  ))}
		  </div>
		);
	}
}

export default HolidayList;
*/

// useState() = hook che permette al componente di rect di avere uno stato. Ritorna una variabile chiamata holidays di tipo array. 
// Il valore iniziare di holidays e' quello specificato nella useState, con setHolidays cambio il valore di holidays
//export default function HolidayList (startdate,enddate) {
export default function Hol () {
  const [holidays, setHolidays] = useState([]);
//   console.log(startDate)
//   const [counter, setCounter] = useState(0);

//    const params2= {
//  	startdate,
//  	enddate
//  }
const params = {
	startdate: '2024-05-01',
	enddate: '2024-05-14'
}

  const retrieveAllHolidays = async () => {
    const response = await axios 
      .get(`${baseURL}/holiday/`, {
		 params
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
		{holidays &&
	  		holidays.map((holiday,index) => (
			<div key={index}>
		  		<h2>Boat: {holiday.boat_name}</h2>
				<p>Period: {params.startdate} - {params.enddate}</p>
				  <h2>Total price: {holiday.price_total}€</h2>
			</div>
	  		))}
			{/* <button onClick={() => {setCounter(counter + 1)}}>{"Click me"}</button> */}
  	</div>
);
 
};
