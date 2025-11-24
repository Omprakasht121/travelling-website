import React from "react";
import JhansiExplore from "./JhansiExplore";
import ImagesOfJhansi from "./ImagesOfJhansi";
import DestinationsOfJhansi from "./JhansiDestinations";
import FoodsOfJhansi from "./FoodsOfJhansi";
import HotelsOfJhansi from "./HotelsOfJhansi";
import ShopsOfJhansi from "./ShopsOfJhansi";
import VideoOfJhansi from "./VideoOfJhansi";
import EventsOfJhansi from "./EventsOfJhansi";



function ExploringJhansi(){
    return(
        <div className="bg-gradient-to-br from-amber-300/10 to-rose-700/10">
            <>
        <JhansiExplore/>
        <ImagesOfJhansi/>
        <DestinationsOfJhansi/>
        <FoodsOfJhansi/>
        <HotelsOfJhansi/>
        <ShopsOfJhansi/>
        <EventsOfJhansi/>

        <VideoOfJhansi/>
        </>
        </div>
    )
}
export default ExploringJhansi;