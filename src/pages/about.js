// As this is the most basic page in our project, it contains necessary steps for 
// React components to be created such as:
// - importing dependencies and plugins
// - defining the components content and functions
// - exporting component to be rendered and compiled

// Step 1: Import React
import * as React from 'react'
// Reference layout from components to keep styling consistent
import Layout from '../components/layout'

// Step 2: Define your component
const AboutPage = () => {
  return (
    <Layout pageTitle="About Our Team">
      <h2>Team Members: <br/>River, Mario, Jesse, Fernando </h2><p>Hi there! We're the proud creators of this site, which we built with Gatsby.</p>
    </Layout>
  )
}

export const Head = () => <title>About Us</title>

// Step 3: Export your component
export default AboutPage