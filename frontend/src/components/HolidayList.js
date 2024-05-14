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
				List of holidays
				{
					holidays.length ?
					holidays.map(holiday => <div key={holiday.id}>{holiday.boatname}</div>) :
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