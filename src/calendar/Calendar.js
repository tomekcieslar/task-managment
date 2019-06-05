import React from 'react';
import './Calendar.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import axios from "axios";

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);
const localizer = BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const ColoredDateCellWrapper = ({children}) =>
    React.cloneElement(React.Children.only(children), {
        style: {
            backgroundColor: 'lightblue',
        },
    });

function Event({event}) {
    return (
        <span>
            <strong style={(event.status) ? {color: 'greenyellow'} : {color: 'yellow'}}>{event.title}</strong>
            <span style={{fontSize: 10 + 'px'}}> {event.desc && ':  ' + event.desc} </span>
    </span>
    )
}

function EventAgenda({event}) {
    return (
        <span>
      <em style={{color: 'pink'}}>{event.title}</em>
      <p>{event.desc}</p>
    </span>
    )
}

class Calendar extends React.Component {
    state = {tasks: null};

    componentDidMount = async () => {
        const token = localStorage.getItem('accessToken');
        const user_id = localStorage.getItem('user_id');

        const response = await axios({
            method: 'get',
            url: `http://localhost:8080/api/users/${user_id}/tasks`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });

        let eventsTasks = response.data.map((value, index) => {
            return {
                id: index,
                title: value.title,
                desc: value.description,
                allDay: true,
                start: new Date(value.task_date),
                end: new Date(value.task_date),
                status: value.status
            }
        });
        this.setState({tasks: eventsTasks});

        console.log(eventsTasks);
    };

    render() {
        return (
            <div style={{height: 600 + 'px'}}>
                {this.state.tasks && (<BigCalendar
                    events={this.state.tasks}
                    localizer={localizer}
                    startAccessor="start"
                    endAccessor="end"
                    tooltipAccessor={(events) => events.desc}
                    components={{
                        event: Event,
                        agenda: {
                            event: EventAgenda
                        },
                        timeSlotWrapper: ColoredDateCellWrapper
                    }}
                />)
                }
            </div>
        )
    }
}

export default Calendar;
