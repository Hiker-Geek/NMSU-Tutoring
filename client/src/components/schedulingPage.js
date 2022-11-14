
const Scheduling = () => {
    
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
          <button className='button' onClick={handleAddEvent}>Schedule</button>
        </div>   
    )
}
export default Scheduling;