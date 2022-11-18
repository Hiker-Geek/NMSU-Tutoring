import "./pages.css";
import "./searching.css";
import { DropdownBtn, Cards } from "../components/searchComponents";
import 'bootstrap/dist/css/bootstrap.css'
import '../components/dropdown.css'
import { useReducer } from 'react';
import TextField from "@mui/material/TextField";
import { Layout } from "../components";
import * as React from 'react';
import Grid from '@mui/material/Grid'; // Grid version 1
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import icon1 from './images/icon1.jpg';
import icon2 from './images/icon2.jpg';
import icon3 from './images/icon3.jpg';
import icon4 from './images/icon4.jpg';








//Array of items for the item type button

//Array of items that populates found items
const tutors = [
  {
    'name': 'Alyssa Macy',
    'major': 'Mathematics',
    'studentYear': 'Graduate',
    'subjects': 'Statistics, Calculus',
    'bio': 'My undergrad was also in math. I am studying to become a professor',
    'schedule': 'Mondays, Wednesdays, and Fridays from 9am to 3pm',
    'locations': 'Corbett, Zuhl Library',
    'img': icon2,
    
  },
  {
    'name': 'Maria Rodriguez',
    'major': 'Civil Engineering with a minor in Applied Stats',
    'studentYear': 'Junior Undergrad',
    'subjects': 'Calculus, Engineering, Statistics',
    'bio': 'I want to design and build cities one day',
    'schedule': ' Fridays from 9am to 3pm',
    'locations': ' Zuhl Library, Freugar Food Court',
    'img': icon3,

  },
  {
    'name': 'Andrew Garcia',
    'major': 'Computer Science',
    'studentYear': 'Senior Undergrad',
    'subjects': 'Computer Science',
    'bio': 'I can tutor all 100 level and 200 level computer science classes',
    'schedule': 'Tuesdays and Fridays from 12pm to 5pm',
    'locations': 'Science Hall Computer Labs',
    'img': icon1,

  },
  {
    'name': 'Caleb Rotelli',
    'major': 'Biology and English',
    'studentYear': 'Graduate',
    'subjects': 'Biology, English',
    'bio': 'Recieved undergrad in English from University of Arizona and am pursuing Masters degree in Biology at NMSU',
    'schedule': 'Monday through Friday from 9am to 5pm',
    'locations': 'Corbett, Zuhl Library, Breland Hall',
    'img': icon4,

  },

  {
    'name': 'Jordan Smith',
    'major': 'Mechanical Engineering',
    'studentYear': 'Junior Undergrad',
    'subjects': 'Engineering, Calculus, Physics',
    'bio': 'Engineering is cool',
    'schedule': 'Tuesdays and Thursdays 10am to 7pm',
    'locations': 'Corbett, Zuhl Library, Engineering Complex',
    'img': icon2,
    
  },
  {
    'name': 'MJ Ramirez',
    'major': 'Nursing',
    'studentYear': 'Senior Undergrad',
    'subjects': 'Nursing, Biology',
    'bio': 'I love medicine and microbiology and I want to be a nurse someday',
    'schedule': ' Mondays and Fridays from 9am to 3pm',
    'locations': ' Zuhl Library, Hardman Jacobs',
    'img': icon3,

  },
  {
    'name': 'Kenneth Gonzales',
    'major': 'Computer Science',
    'studentYear': 'Graduate',
    'subjects': 'Computer Science',
    'bio': 'I specialize in machine learning, AI, and data science',
    'schedule': 'Tuesdays, Wednesdays and Thursdays from 12pm to 5pm',
    'locations': 'Science Hall Computer Labs, Zuhl Library, Hardman Jacobs 1st floor',
    'img': icon1,

  },
  {
    'name': 'Tyler Nguyen',
    'major': 'Psychology and English double major',
    'studentYear': 'Junior Undergrad',
    'subjects': 'English, Psychology',
    'bio': 'Not sure what I want to do yet but it is between becoming a lawyer and a therapist',
    'schedule': 'Monday through Friday from 9am to 5pm',
    'locations': 'Corbett, Zuhl Library, Breland Hall',
    'img': icon4,

  },

]

//Array of items for the subjects button
const subjectBtnItems = ['All', 'Calculus', 'Engineering', 'Computer Science', 'English', 'Biology', 'Statistics', 'Nursing', 'Physics', 'Psychology'];

const Search = () => {
  //Creates the state for each of the mock lists
  const [tutorList, updateTutorList] = useReducer(reducer, tutors)
  
  function reducer(state, action) {
    //Resets the state if all items are selected
    if (action.item === 'All') {
      return action.initItems
    }
    switch (action.type) {
      //Case for subjects filter button
      case 'subjects':
        return action.initItems.filter(item => {
          return item.subjects.includes(action.item)
        })
      //Case for search bar update
      case 'search':
        return action.initItems.filter(item => {
          return item.name.toLowerCase().includes(action.item) || item.bio.toLowerCase().includes(action.item) || item.subjects.toLowerCase().includes(action.item) || item.major.toLowerCase().includes(action.item) || item.studentYear.toLowerCase().includes(action.item)
        })
      default:
    }
  }
  

  //Caller for the subject button
  function subjectBtn(item) {
    updateTutorList({ type: 'subjects', item: item, initItems: tutors})
  } 

  function txtUpdate(txt) {
    updateTutorList({ type: 'search', item: txt.target.value.toLowerCase(), initItems: tutors})
  }

  const styles = {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      width: 300,
      margin: 100,
    },
    //style for font size
    resize:{
      fontSize:50
    },
  }

  return (
    <Layout pageTitle="Search Tutors">
      <br></br>
  <div className='scheduling-form'>
    <div className='divider'><DropdownBtn eventHandle={subjectBtn} title="Subjects ▼" items={subjectBtnItems} /><br/></div>
    <div className='divider'>
      <TextField label="   Search   " id="textfield" variant="outlined"
      InputLabelProps={{style: {fontSize: 16, marginLeft: -7, marginTop:-5, "text-decoration": "underline dotted #c7c7c7"}, shrink: true}}
       sx={{
        width: "300px",
        "& .MuiInputBase-root": {
            height: "30px"
        },
        marginLeft:"10px",
    }}
        onChange={txtUpdate} />
    </div>
  </div>

  <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

      {tutorList.map(item => (
        <div className="cardDivider"><Cards name={item.name} img={item.img} buttonText="Schedule" locations={item.locations} major={item.major} studentYear={item.studentYear} bio={item.bio} subjects={item.subjects}  schedule={item.schedule}/></div>
      ))}
    
  </Grid>
  
    </Layout>
  );
}

export default Search;
