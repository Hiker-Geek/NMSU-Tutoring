// Import React
// MOST IMPORTANT STEP
// Reference layout from components to keep styling consistent
import Layout from '../components/layout'
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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


const IndexPage = () => {
  const [newEvent, setNewEvent] = useState({title: "", start: "", end: ""})
  const [allEvents, setAllEvents] = useState(events)
/*
  * The following function allows event scheduling and alerts user when scheduling new events would overlap with pre-existing events
*/
  function hnadleAddEvent() {
    for (let i=0; i<allEvents.length; i++){

      const d1 = new Date (allEvents[i].start);
      const d2 = new Date(newEvent.start);
      const d3 = new Date(allEvents[i].end);
      const d4 = new Date(newEvent.end);
/*
    console.log(d1 <= d2);
    console.log(d2 <= d3);
    console.log(d1 <= d4);
    console.log(d4 <= d3);
      */

       if (( (d1  <= d2) && (d2 <= d3) ) || ( (d1  <= d4) && (d4 <= d3) )) {   
          alert("New Event Overlaps Pre-existing events"); 
          break;
       }

  }
    setAllEvents([...allEvents, newEvent])
  }
  return (
    // Layout tag is referencing layout.js component
    // This is done to keep styling of all components within the tag
    // consistent with what is set in layout.js
    

      <Layout pageTitle="NMSU Tutor Schedular">
      {
      /*
       * putting the calendar code inside the layout tag squashes it into a very small box when we want a big calendar
       * Layout will have to be modified later to accomodate a bigger calendar
       * The first div after Layout closes is the form for creating events. Its included since it has potential to be
       * the basis for students scheduling with tutors.
       * */}
      
          <input type="text" placeholder="event name" id="inline-block"
            value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
          <DatePicker placeholderText='start date' id="inline-block"
            selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
          <DatePicker placeholderText='end date'
            selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
          <button onClick={hnadleAddEvent}>Schedule Event</button>
          

        <Calendar localizer={localizer} events={allEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600, margin: "50px" }} />
      
      </Layout>
  )
}

// For use in metadata and web address header
// Will work on later, not urgent
export const Head = () => <title>Home Page</title>

// Export your component
// THIS IS IMPORTANT DO NOT FORGET
export default IndexPage
