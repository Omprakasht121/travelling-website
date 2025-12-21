
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
            region="banda" 
            title="Banda (बाँदा)"
            desc="A true traveler collects memories, not destinations. The story isn’t in how many places you’ve been — it’s in how deeply you felt each one. It’s the strangers who became friends, the sunsets you still remember,and the moments that were so perfect you forgot to take a picture."/>;
        <ImagesPage region="banda" />;
        <DestinationPage region="banda" />;
        <FoodPage
         region="banda"
        title="Famous FOOD & Restaurants"
        subtitle="Discover cafés, dhabas, and restaurants that serve more than food — they serve stories."
        />
        <HotelPage
        region="banda"
        title="Hotels & Banquet"
        subtitle="Rest, relax, and rejoice — where every stay feels like home and every event feels royal."
        />
        <ShopPage
            region="banda"
            title="Banda Bazaar Tales"
            subtitle="Mauranipur’s heart beats in its bustling shops — a blend of heritage, hustle, and handmade beauty."
            />
        <EventsPage region="banda"/>
        <CreatorPage region="banda" />;
        <VideoPage region="banda" />;
        </>
        </div>
    )
}
export default ExploringJhansi;