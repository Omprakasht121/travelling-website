
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
        <div className="bg-gradient-to-br from-sky-300/30 to-orange-900/40"> 
        <>
        <HeroPage
            region="jhansi" 
            title="Jhansi (झाँसी)"
            desc="Jhansi is a historic city in Uttar Pradesh, India, famous as the brave center of resistance led by Rani Lakshmibai during the 1857 Rebellion against British rule.."/>;
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