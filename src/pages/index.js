// Import React
// MOST IMPORTANT STEP
// Reference layout from components to keep styling consistent
import {Layout} from '../components'
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import "./pages.css";
//import { fixed } from 'gatsby-plugin-sharp';

// Index Page component
// I created this following only an example but this should be broken up by header,
// content, navbar
// * Need to implement by Sprint 2 *

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
    start: new Date('2022-10-21 12:00'),
    end: new Date('2022-10-21 13:00')
  },
  {
    title: "School Holiday",
    allDay: true,
    start: new Date('2022-10-31 00:00'),
    end: new Date('2022-10-31 23:59')
  },
  {
    title: "Conference",
    start: new Date('2022-10-24 14:00'),
    end: new Date('2022-10-26 16:00')
  },
];


const IndexPage = () => {
  const [newEvent, setNewEvent] = useState({title: "", start: new Date(), end: new Date()})
  const [allEvents, setAllEvents] = useState(events)
/*
  * The following function allows event scheduling and alerts user when scheduling new events would overlap with pre-existing events
*/


function dateRangeOverlaps(a_start, a_end, b_start, b_end) {
  if ((a_start < b_start && b_start < a_end) || (a_start < b_end   && b_end   < a_end) || (b_start <  a_start && a_end   <  b_end)) return true; // a in b
  return false;
}
function dateCollision(){
  for (let i=0; i<allEvents.length; i++){
    const allEventStart = new Date(allEvents[i].start);
    const newEventStart = new Date(newEvent.start);
    const allEventEnd = new Date(allEvents[i].end);
    const newEventEnd = new Date(newEvent.end);
    if(dateRangeOverlaps(newEventStart, newEventEnd, allEventStart, allEventEnd)){ 
      return true; 
    }
  }
  return false;
}

  function handleAddEvent() {

      const newEventStart = new Date(newEvent.start);
      const newEventEnd = new Date(newEvent.end);
      const diffTime = Math.abs(newEventEnd - newEventStart);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+2);
      const dateTime = new Date(date);
      const myString = "INVALID!\n\n" +
                       "Scheduling rules are as follows:\n" +
                       "- No multiday appointments.\n" +
                       "- Must Schedule 2 days in advance\n" +
                       "- No double booking\n" +
                       "- Schedule meetings in 15 minute increments only"

       if ((newEventStart <= dateTime) || 
           (1 < diffDays) ||
           dateCollision() ||
           (newEvent.start.getMinutes() % 15 !== 0) ||
           (newEvent.end.getMinutes() % 15 !== 0)) 
       {   
          alert(myString);
       }
       else{
        setAllEvents([...allEvents, newEvent]);
       }
    
  }
  return (
    // Layout tag is referencing layout.js component
    // This is done to keep styling of all components within the tag
    // consistent with what is set in layout.js
      <Layout pageTitle="NMSU Tutor Schedular">
       <div className='scheduling-form'>
          <div><h3>Student Name:</h3><br/>
          <input type="text" placeholder="first and last name" 
            value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />&ensp;&ensp;
          </div>
          <div>
          <h3>Start:</h3>
          <DatePicker 
          placeholderText='start date/time'  
            selected={newEvent.start} 
            onChange={(start) => setNewEvent({ ...newEvent, start })}
            showTimeSelect
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa" />
          </div>
          <div>
          <h3>End:</h3>
          <DatePicker 
          placeholderText='end date/time'  
            selected={newEvent.end} 
            onChange={(end) => setNewEvent({ ...newEvent, end })}
            showTimeSelect
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="MMMM d, yyyy h:mm aa"
            />
          </div>
      </div>   
      <button className='button' onClick={handleAddEvent}>Schedule</button>
      <div style={{ height: "90%", width: "90%", marginLeft: "5%", fontSize: "15px", position: 'absolute', zIndex: '-1', alignContent:'center'}}>
        <Calendar localizer={localizer} events={allEvents}
          startAccessor="start"
          endAccessor="end"
          style={{'padding': '50px'}}/>
      </div>  
      </Layout>
  )
}

// For use in metadata and web address header
// Will work on later, not urgent
export const Head = () => <title>Home Page</title>

// Export your component
// THIS IS IMPORTANT DO NOT FORGET
export default IndexPage
