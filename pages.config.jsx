/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 * 
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import CompetitionHistory from './pages/CompetitionHistory';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Mission from './pages/Mission';
import SponsorManagement from './pages/SponsorManagement';
import Sponsors from './pages/Sponsors';
import TeamMemberManagement from './pages/TeamMemberManagement';
import TeamPhotoManager from './pages/TeamPhotoManager';
import TeamRoster from './pages/TeamRoster';
import __Layout from './Layout.jsx';


export const PAGES = {
    "CompetitionHistory": CompetitionHistory,
    "Contact": Contact,
    "Home": Home,
    "Mission": Mission,
    "SponsorManagement": SponsorManagement,
    "Sponsors": Sponsors,
    "TeamMemberManagement": TeamMemberManagement,
    "TeamPhotoManager": TeamPhotoManager,
    "TeamRoster": TeamRoster,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};