import React from "react";
import ExploreOrchha from "./ExploreOrchha";
import ImagesOfOrchha from "./ImagesOfOrchha";
import FoodsOfOrchha from "./FoodsOfOrchha";
import HotelsOfOrchha from "./HotelsOfOrchha";
import ShopsOfOrchha from "./ShopsOfOrchha";
import VideoOfOrchha from "./VideoOfOrchha";
import EventsOfOrchha from "./EventsOfOrchha.jsx";
import DestinationsOfOrchha from "./DestinationsOfOrchha.jsx";
import Creators from "./CreatorOfOrchha.jsx";


function ExploringOrchha(){
    return(
        <div className="bg-gradient-to-br from-amber-300/10 to-rose-700/10">
            <>
        <ExploreOrchha/>
        <ImagesOfOrchha/>
        <DestinationsOfOrchha/>
        <FoodsOfOrchha/>
        <HotelsOfOrchha/>
        <ShopsOfOrchha/>
        <EventsOfOrchha/>
        <Creators/>
        <VideoOfOrchha/>
        </>
        </div>
    )
}
export default ExploringOrchha;