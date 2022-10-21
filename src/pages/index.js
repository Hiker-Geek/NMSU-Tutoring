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
import DatePicker, { CalendarContainer } from 'react-datepicker';
import "./pages.css";
import { fixed } from 'gatsby-plugin-sharp';

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
  {
    title: "brunch",
    start: new Date('2022-10-21 10:00'),
    end: new Date('2022-10-21 11:00')
  },
];


const IndexPage = () => {
  const [newEvent, setNewEvent] = useState({title: "", start: new Date(), end: new Date()})
  const [allEvents, setAllEvents] = useState(events)
/*
  * The following function allows event scheduling and alerts user when scheduling new events would overlap with pre-existing events
*/
  function handleAddEvent() {
    for (let i=0; i<allEvents.length; i++){

      const d1 = new Date(allEvents[i].start);
      const d2 = new Date(newEvent.start);
      const d3 = new Date(allEvents[i].end);
      const d4 = new Date(newEvent.end);
      const diffTime = Math.abs(d4 - d2);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const time = today.getHours() + ":" + today.getMinutes();
      const add = date+' '+time;
      const dateTime = new Date(add);

     // const diffTime2 = Math.abs(dateTime - d2);
     // const diffDay2 = Math.ceil(diffTime2 / (1000 * 60 * 60 * 24));
/*
    console.log(d1 <= d2);
    console.log(d2 <= d3);
    console.log(d1 <= d4);
    console.log(d4 <= d3);
      */

//this collision checking doesn't work for some reason
       if ((( (d1  <= d2) && (d2 <= d3) ) || ( (d1  <= d4) && (d4 <= d3) )) || (d2 <= dateTime) || (1 < diffDays)) {   
          alert("Invalid--choose a date in the future that hasn't been taken");
          break;
       }
      /* if(d2 <= dateTime){
        alert("You can't schedule events in the past");
        break;
       } 
       if((1 < diffDays)){
        alert("You can't make multi-day appointments");
        break;
       } */
       else{
        setAllEvents([...allEvents, newEvent]);
       }

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
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
            style={{  }}
            />
          </div>
      </div>   
      <button class='button' onClick={handleAddEvent}>Schedule</button>
      <div style={{ height: "90%", width: "90%", 'margin-left': "5%", 'font-size': "18px", position: 'absolute', zIndex: '-1', alignContent:'center'}}>
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
