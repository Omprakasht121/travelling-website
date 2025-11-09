import React from "react";

import ImagesOfMau from "./ImagesOfMau";
import DestinationsOfMau from "./Destinations";
import ShopsOfMau from "./ShopsOfMau";
import FoodsOfMau from "./FoodsOfMau";
import HotelsOfMau from "./HotelsOfMau";
import VideoOfMau from "./VideoOfMau";
import EnquiryOfMau from "./EnquiryOfMau";
import FestivalsOfMau from "./FestivalsOfMau";
import MauExplore from "./Mau-explore";



function ExploringMau(){
    return(
        <div className="bg-gradient-to-br from-amber-300/10 to-rose-700/10"> 
        <>
        <MauExplore/>
        <ImagesOfMau/>
        <DestinationsOfMau/>
        <FoodsOfMau/>
        <HotelsOfMau/>
        <ShopsOfMau/>
        <FestivalsOfMau/>
        <VideoOfMau/>
        <EnquiryOfMau/>
        </>
        </div>
    )
}
export default ExploringMau;