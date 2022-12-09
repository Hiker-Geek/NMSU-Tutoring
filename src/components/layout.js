import * as React from 'react'

// Link is a built in gatsby component for cleaner redirect handling
import { Link } from 'gatsby'

// These are references to styles in layout.module.css
import {
  container,
  heading,
  navLinks,
  navLinkItem,
  navLinkText,
  navbar,
} from './layout.module.css'

// Creates layout component (React component)
const Layout = ({ pageTitle, children }) => {
  return (
    <div className={container}>
      <div>
      <nav className={navbar}>
        <ul className={navLinks}>
          <li className={navLinkItem}>
            <Link to="/" className={navLinkText}>
              Home
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="/search" className={navLinkText}>
              Search Tutors
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="/about" className={navLinkText}>
              About
            </Link>
          </li>
        </ul>
      </nav>
      </div>
      <main>
        <h1 className={heading}>{pageTitle}</h1>
        {children}
      </main>
    </div>
  )
}

// Export component
export default Layout