import React from "react";
import BandaExplore from "./BandaExplore";
import ImagesOfBanda from "./ImagesOfBanda";
import DestinationsOfBanda from "./BandaDestinations";
import FoodsOfBanda from "./FoodsOfBanda";
import HotelsOfBanda from "./HotelsOfBanda";
import ShopsOfBanda from "./ShopsOfBanda";
import EventsOfBanda from "./EventsOfBanda";
import Creators from "./CreatorOfBanda";
import VideoOfBanda from "./VideoOfBanda";




function ExploringBanda(){
    return(
        <div className="bg-gradient-to-br from-amber-300/10 to-rose-700/10">
            <>
            <BandaExplore/>
            <ImagesOfBanda/>
            <DestinationsOfBanda/>
            <FoodsOfBanda/>
            <HotelsOfBanda/>
            <ShopsOfBanda/>
            <EventsOfBanda/>
            <Creators/>
            <VideoOfBanda/>
            </>
        </div>
    )
}
export default ExploringBanda;