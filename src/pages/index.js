// Reference layout from components to keep styling consistent
import {Layout} from '../components'
import React, { useState } from "react";
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

// Const for local timezone and language, specific to Calendar only
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

// Developer's note: for the correct date and time dates must be string literals
// Static data created to test Calendar ability for multiple appointments
const events = [
  {
    title: "Tutoring Appointment W/ Jesse",
    start: new Date('2022-12-02 12:00'),
    end: new Date('2022-12-02 12:15')
  },
  {
    title: "Tutoring Appointment W/ Mario",
    start: new Date('2022-12-06 14:30'),
    end: new Date('2022-12-06 14:45')
  },
  {
    title: "Tutoring Appointment W/ Daniel",
    start: new Date('2022-12-06 10:30'),
    end: new Date('2022-12-06 10:45')
  },
  {
    title: "Tutoring Appointment W/ Micheal",
    start: new Date('2022-12-06 12:00'),
    end: new Date('2022-12-06 12:15')
  },
  {
    title: "Tutoring Appointment W/ River",
    start: new Date('2022-12-09 10:30'),
    end: new Date('2022-12-09 10:45')
  },
  {
    title: "School Holiday",
    allDay: true,
    start: new Date('2022-12-12 00:00'),
    end: new Date('2022-12-16 23:59')
  }
];

// Begin IndexPage Component
// All major functionality directed specifically at contents of indes page need
// to be contained within this constant
const IndexPage = () => {
  // Set event for Calendar when a new appointment is created, give default values to avoid crash on inital load
  const [newEvent, setNewEvent] = useState({title: "", start: new Date(), end: new Date()})
  // Set event details for when an appointment is clicked on, give default values to avoid crash on inital load
  const [eventDetails, setSelectedEvent] = useState({title: "", start: new Date(), end: new Date()})
  // Grab static data created above for Calendar to call and display
  const [allEvents, setAllEvents] = useState(events)
  // Below are both variables used to both display and hide both the create and update popups
  var addPopup = document.getElementById('add-popup');
  var detailsPopup = document.getElementById('details-popup');

  // Called by Calendar API onSelectSlot()
  // Sets popup to be visible
  function handleSelectSlot() {
    document.getElementById('add-popup').style.display = "block";
  }

  // If user clicks outside of popup, closes window
  window.onclick = function(event) {
    if (event.target == addPopup) {
      addPopup.style.display = "none";
    } else if (event.target == detailsPopup) {
      detailsPopup.style.display = "none";
    }
  }

  // Called by Calendar API onSelectEvent()
  // Passes event parameter for grabbing selected events details
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    document.getElementById('details-popup').style.display = "block";
  }

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

  // Function to 'handle' when an event is updated, currently only makes popup visible
  // FUTURE IMPLENTATION: Add validation mirroring that of create
  function handleUpdateEvent() {
    document.getElementById('add-popup').style.display = "none";
  }

  // Validation function for new appointment creation as well as creating new event with users entered properties
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
      }
  }
  return (
    // Layout tag is referencing layout.js component
    // This is done to keep styling of all components within the tag consistent with what is set in layout.js
    <Layout pageTitle="NMSU Tutor Schedular">
      {/* This section begins details popup used to update an event */}
      <div id='details-popup' className='scheduling-form'>
        <div className='scheduling-form-content'>
          <div>
            <h4>Appointment Info:</h4><br/>
          <input type="text" placeholder="first and last name" 
          value={eventDetails.title} onChange={(e) => setNewEvent({ ...eventDetails, title: "Tutoring Appointment W/ " +  e.target.value })} />&ensp;&ensp;
        </div>
        <div>
          <h4>Start:</h4>
          <DatePicker 
            placeholderText='start date/time'  
            selected={eventDetails.start} 
            onChange={(start) => setNewEvent({ ...eventDetails, start })}
            showTimeSelect
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa" />
        </div>
        <div>
          <h4>End:</h4>
          <DatePicker 
            placeholderText='end date/time'  
            selected={eventDetails.end} 
            onChange={(end) => setNewEvent({ ...eventDetails, end })}
            showTimeSelect
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="MMMM d, yyyy h:mm aa" />
        </div>
        <button className='button' onClick={handleUpdateEvent}>Update Appointment</button>
        </div>
      </div>
      {/* This section begins create popup used to create a new event */}
      <div id='add-popup' className='scheduling-form'>
        <div className='scheduling-form-content'>
        <div>
          <h4>Student Name:</h4><br/>
          <input type="text" placeholder="first and last name" 
          value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: "Tutoring Appointment W/ " + e.target.value })} />&ensp;&ensp;
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
      {/* Below is actual implementation of Calendar widget */}
      <div style={{ height: "90%", width: "90%", marginLeft: "5%", fontSize: "15px", position: 'absolute', zIndex: '-1', alignContent:'center'}}>
        <Calendar  
          events={allEvents}
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          selected={eventDetails}
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
