// Reference layout from components to keep styling consistent
import {Layout} from '../components'
import React, { useCallback, useState } from "react";
// Used to set state for displaying selected event details
import moment, { calendarFormat } from 'moment';
// Pull in Calendar and dateFnsLocalizer from 'react-big-calendar' package
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
// Stock stylesheet for 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
// Pull in DatePicker form 'react-datepicker' package
import DatePicker from 'react-datepicker';
// Below are individual packages pulled from 'date-fns' main package install
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
// Import CSS stylesheets
import "./pages.css";

// Const for local timezone and language
const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

// Const for initializng dateFnsLocalizer
// Passes custom locales
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
    title: "Tutoring Appointment W/ Marcelus Walus",
    start: new Date('2022-12-09 12:00'),
    end: new Date('2022-12-09 13:00')
  },
  {
    title: "School Holiday",
    allDay: true,
    start: new Date('2022-12-19 00:00'),
    end: new Date('2023-01-08 23:59')
  },
  {
    title: "Conference",
    start: new Date('2022-12-18 14:00'),
    end: new Date('2022-12-18 16:00')
  },
];

// Begin IndexPage Component
// I created this following only an example but this should be broken up by header,
// content, navbar
// * Need to implement by Sprint 2 *
const IndexPage = () => {
  // Set 'state' for Calendar widget
  const [newEvent, setNewEvent] = useState({title: "", start: new Date(), end: new Date()})
  const [allEvents, setAllEvents] = useState(events)
  var popup = document.getElementById('add-popup');

  // Called by Calendar API onSelectSlot()
  // Sets popup to be visible
  function handleSelectSlot() {
    document.getElementById('add-popup').style.display = "block";
  }

  // If use clicks outside of popup, closes window
  window.onclick = function(event) {
    if (event.target == popup) {
      popup.style.display = "none";
      // NEED TO FIGURE OUT HOW TO IMPLEMENT
      // Clears data when closed 
      // popup.innerHTML = "";
    }
  }

  // Called by Calendar API onSelectEvent()
  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title + "\n" + event.start + "\n" + event.end),
    []
  )

  /*
  * The following function allows event scheduling and alerts user when scheduling new events would overlap with pre-existing events
  */
  function dateRangeOverlaps(a_start, a_end, b_start, b_end) {
    if ((a_start < b_start && b_start < a_end) || (a_start < b_end   && b_end   < a_end) || (b_start <  a_start && a_end   <  b_end)) return true; // a in b
    return false;
  }

  // Validation function to make sure no new appointments 'collide' with pre-existing appointments
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

  // Validation functions for new appointment creation
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
        // If appointment is successfully added, hide popup
        document.getElementById('add-popup').style.display = "none";
        // addtoDB(newEvent)
        // NEED TO FIGURE OUT HOW TO IMPLEMENT
        // Clears data when closed
        // document.getElementById('add-popup').innerHTML = "";
      }
    }
  return (
    // Layout tag is referencing layout.js component
    // This is done to keep styling of all components within the tag consistent with what is set in layout.js
    <Layout pageTitle="NMSU Tutor Schedular">
      <div id='add-popup' className='scheduling-form'>
        <div className='scheduling-form-content'>
        <div>
          <h4>Student Name:</h4><br/>
          <input type="text" placeholder="first and last name" 
          value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />&ensp;&ensp;
        </div>
        <div>
          <h4>Start:</h4>
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
          <h4>End:</h4>
          <DatePicker 
            placeholderText='end date/time'  
            selected={newEvent.end} 
            onChange={(end) => setNewEvent({ ...newEvent, end })}
            showTimeSelect
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="MMMM d, yyyy h:mm aa" />
        </div>
        <button className='button' onClick={handleAddEvent}>Schedule</button>
      </div>
      </div>
      {/* <div id='details-popup' className='scheduling-form'>
        <div className='scheduling-form-content'>
        <div>
          <h4>Student Name: {this.state}</h4><br/>
        </div>
        <div>
          <h4>Start Date: </h4>
        </div>
        <div>
          <h4>End Date: </h4>
        </div>
      </div>
      </div> */}
      <div style={{ height: "90%", width: "90%", marginLeft: "5%", fontSize: "15px", position: 'absolute', zIndex: '-1', alignContent:'center'}}>
        <Calendar  
          events={allEvents}
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          style={{'padding': '50px'}}
        />
      </div>
    </Layout>
  )
}

// For use in metadata and web address header
export const Head = () => <title>Home Page</title>

// Export component to be compiled and rendered
export default IndexPage
