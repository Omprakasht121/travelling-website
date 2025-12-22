import React from "react";
import { Router, Routes } from "react-router-dom";
import Hero from "./Hero";
import Oneview from "./Oneview";
import Explore from "./Explore";
import RegionMap from "./RegionMap";
import About from "./About";
import ContactUs from "./ContactUs";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

function Landing(){
    return(
      <>
     <div >
        <Hero/>
        <div className="bg-gradient-to-br from-amber-800/20 to-blue-800/20">
        <Oneview/>
        <Explore/>
        <RegionMap/>
        <About/>
        <ContactUs/>
        <Footer/>
        </div>
     </div>
     <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: { fontSize: "16px" },
        }}
      />
      </>
    )
}

export default Landing;