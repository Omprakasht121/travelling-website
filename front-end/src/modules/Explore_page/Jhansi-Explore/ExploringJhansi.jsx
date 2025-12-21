
import CreatorPage from "../services/Creators/CreatorPage";
import DestinationPage from "../services/Destinations/DestinationPage";
import EventsPage from "../services/Events/EventPage";
import FoodPage from "../services/Food/FoodPage";
import HotelPage from "../services/Hotel/HotelPage";
import ImagesPage from "../services/Images/ImagesPage";
import ShopPage from "../services/Shop/ShopPage";
import VideoPage from "../services/Videos/VideoOfMau";
import HeroPage from "../services/Hero/HeroPage";




function ExploringJhansi(){
    return(
        <div className="bg-gradient-to-br from-amber-300/10 to-rose-700/10"> 
        <>
        <HeroPage
            region="jhansi" 
            title="Jhansi (झाँसी)"
            desc="A true traveler collects memories, not destinations. The story isn’t in how many places you’ve been — it’s in how deeply you felt each one. It’s the strangers who became friends, the sunsets you still remember,and the moments that were so perfect you forgot to take a picture."/>;
        <ImagesPage region="jhansi" />;
        <DestinationPage region="jhansi" />;
        <FoodPage
         region="jhansi"
        title="Famous FOOD & Restaurants"
        subtitle="Discover cafés, dhabas, and restaurants that serve more than food — they serve stories."
        />
        <HotelPage
        region="jhansi"
        title="Hotels & Banquet"
        subtitle="Rest, relax, and rejoice — where every stay feels like home and every event feels royal."
        />
        <ShopPage
            region="jhansi"
            title="Jhansi Bazaar Tales"
            subtitle="Mauranipur’s heart beats in its bustling shops — a blend of heritage, hustle, and handmade beauty."
            />
        <EventsPage region="jhansi"/>
        <CreatorPage region="jhansi" />;
        <VideoPage region="jhansi" />;
        </>
        </div>
    )
}
export default ExploringJhansi;