import React from "react";
import { Router, Routes } from "react-router-dom";
import Hero from "./Hero";
import Oneview from "./Oneview";
import Explore from "./Explore";
import RegionMap from "./RegionMap";
import About from "./About";
import ContactUs from "./ContactUs";
import Footer from "./Footer";

function Landing(){
    return(
      <>
     <div >
        <Hero/>
        <div className="bg-gradient-to-br from-amber-300/10 to-rose-700/10">
        <Oneview/>
        <Explore/>
        <RegionMap/>
        <About/>
        <ContactUs/>
        <Footer/>
        </div>
     </div>
      </>
    )
}

export default Landing;