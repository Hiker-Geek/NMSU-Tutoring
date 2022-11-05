import { Calendar, dateFnsLocalizer} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/*All functions below are copied over to ./pages/index.js until exporting them from this file without issue can be figured out.
  Exporting was attempted but the calendar turned up blank completely blank.  */

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

//Developer's note: for the correct date and time dates must be string literals
const events = [
  {
    title: "Tutoring Appointment",
    start: new Date('2022-10-3 12:00'),
    end: new Date('2022-10-3 13:00')
  },
  {
    title: "School Holiday",
    allDay: true,
    start: new Date('2022-10-31 00:00'),
    end: new Date('2022-10-31 23:59')
  },
  {
    title: "Conference",
    start: new Date('2022-10-3 09:00'),
    end: new Date('2022-10-3 10:00')
  },
];

function MyCalendar() {
  const [newEvent, setNewEvent] = useState({title: "", start: "", end: ""})
  const [allEvents, setAllEvents] = useState(events)

  function handleAddEvent() {
    for (let i=0; i<allEvents.length; i++){
      const d1 = new Date (allEvents[i].start);
      const d2 = new Date(newEvent.start);
      const d3 = new Date(allEvents[i].end);
      const d4 = new Date(newEvent.end);

       if (
        ( (d1  <= d2) && (d2 <= d3) ) || ( (d1  <= d4) &&
          (d4 <= d3) )
        )
      {   
          alert("CLASH"); 
          break;
       }
  }
    setAllEvents([...allEvents, newEvent])
  }

  return (
    <div className="App">
      <h2>Schedule Appointment</h2>
      <div id='inline-block'>
      
      {/*
        * this code as event creation code has potential as the basis for students scheduling with tutors
        * tutors would never see an option to schedule, only reschedule.
      */}

        <input type="text" placeholder="event name" id="inline-block" 
          value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}/>
        <DatePicker placeholderText='start date' id="inline-block"
          selected={newEvent.start} onChange={(start) => setNewEvent({...newEvent, start})} />
        <DatePicker placeholderText='end date'
          selected={newEvent.end} onChange={(end) => setNewEvent({...newEvent, end})} />
        <button id="inline-block" onClick={handleAddEvent}>Schedule Event</button>
      </div>

      <Calendar localizer={localizer} 
       events={allEvents} 
       startAccessor="start" 
       endAccessor="end"
       popup={(events, /*date (query info)*/) => this.setState({ showModal: true, events })}
       style={{height: 600, margin: "50px"}}
      />
    </div>
  );
}

export default MyCalendar;
