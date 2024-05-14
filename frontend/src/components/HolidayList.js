import axios from "axios";
import React, { Component } from "react";
import { baseURL, headers } from "./../services/holiday.service";
import { useNavigate } from "react-router-dom";

class HolidayList extends Component {
	constructor(props) {
		super(props) 
			this.state = {
				holidays: []
			}
	}
	
	componentDidMount() {
		/*axios.get('https://jsonplaceholder.typicode.com/posts')*/
		axios.get(`${baseURL}/holiday/`, {
        headers: {
          headers,
        },
      })
		.then(response => {
			console.log(response)
			this.setState({ holidays: response.data})
		})
		.catch(error => {
			console.log(error)
		})
	}
	
	render () {
		const { holidays } = this.state
		return (
			<div>
				<h1>List of holidays</h1>

				{
					holidays.length ?
					//holidays.map(holiday => <div key={holiday.id}>{holiday.boatname}</div>) :
					holidays.map((holiday,index) => (
						<div className="card my-3 w-25 mx-auto">
                  <div className="card-body">
                    <h2 className="card-title font-weight-bold">Boat name: {holiday.boatname}</h2>
                    <p className="card-subtitle mb-2">Daily price: {holiday.boatdailyprice}</p>
                    <p className="card-text">{holiday.boatimage}</p>
					{holiday.unavailability.map((c,i) => (
							<div key={i}>
							 <h2>Unavailability periods</h2>
							<p>Start date: {c.startdate}</p>
							<p>End date: {c.enddate}</p>
						  </div>
					))}
					
                  </div>
				  </div>
					)) :
					null
				}
			</div>
		)
	
	}
}

export default HolidayList;


/*
export const HolidayList = () => {
  const [holidays, setHolidays] = useState();
  const navigate = useNavigate();


  const retrieveAllHolidays = () => {
    axios
      .get(`${baseURL}/holiday/`, {
        headers: {
          headers,
        },
      })
      .then((response) => {
        setHolidays(response.data);
        console.log(holidays);
      })
      .catch((e) => {
        console.error(e);
      });
  };



  useEffect(() => {
    retrieveAllHolidays();
  }, [retrieveAllHolidays]);

 
};

*/