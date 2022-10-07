// Import React
// MOST IMPORTANT STEP
import * as React from 'react'
// Reference layout from components to keep styling consistent
import Layout from '../components/layout'
// Reference mobiscroll for calendar widget
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Datepicker, Page, getJson, setOptions } from '@mobiscroll/react';

// Sets theme for Calendar
setOptions({
  theme: 'windows',
  themeVariant: 'light'
});

// Index Page component
// I created this following only an example but this should be broken up by header,
// content, navbar
// * Need to implement by Sprint 2 *
const IndexPage = () => {
  return (
    // Layout tag is referencing layout.js component
    // This is done to keep styling of all components within the tag
    // consistent with what is set in layout.js
    <Layout pageTitle="NMSU Tutor Schedular">
      <p>Access the calendar below to create an appointment as well as see already scheduled appointments.</p>
      {/* Inject mobiscroll calendar widget */}
      <Datepicker
        controls={['calendar']}
        display="inline"
        touchUi={false}
      />
    </Layout>
  )
}

// For use in metadata and web address header
// Will work on later, not urgent
export const Head = () => <title>Home Page</title>

// Export your component
// THIS IS IMPORTANT DO NOT FORGET
export default IndexPage
