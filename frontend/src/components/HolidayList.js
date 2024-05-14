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
		const params = {
			startdate: '2024-05-01',
			enddate: '2024-05-16'
		}
		/*axios.get('https://jsonplaceholder.typicode.com/posts')*/
		axios.get(`${baseURL}/holiday/`, {
        
          headers, params
        
      })
		.then(response => {
			console.log(response)
			this.setState({ holidays: response.data})
			console.log(response.data)
		})
		.catch(error => {
			console.log(error)
		})
	}
	
	render() {
		const { holidays } = this.state
		return (
			<div>
			{holidays &&
			  holidays["data"].map((holiday) => (
				<div key={holiday.id}>
				  <h2>{holiday.boat_name}</h2>
				</div>
			  ))}
		  </div>
		);
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