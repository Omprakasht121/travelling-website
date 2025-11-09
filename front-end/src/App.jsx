import React from "react";
import Hero from "./modules/landing_page/pages/Hero";
import Oneview from "./modules/landing_page/pages/Oneview";
import Explore from "./modules/landing_page/pages/Explore";
import About from "./modules/landing_page/pages/About";
import RegionMap from "./modules/landing_page/pages/RegionMap";
import ContactUs from "./modules/landing_page/pages/ContactUs";
import Footer from "./modules/landing_page/pages/Footer";
import Landing from "./modules/landing_page/pages/Landing";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppRoutes } from "./shared/routes/AppRoutes";

function App(){
    return(
      <Router>
        <AppRoutes/>
      </Router>
    )
}
export default App;