
import CreatorPage from "../services/Creators/CreatorPage";
import DestinationPage from "../services/Destinations/DestinationPage";
import EventsPage from "../services/Events/EventPage";
import FoodPage from "../services/Food/FoodPage";
import HotelPage from "../services/Hotel/HotelPage";
import ImagesPage from "../services/Images/ImagesPage";
import ShopPage from "../services/Shop/ShopPage";
import VideoPage from "../services/Videos/VideoOfMau";
import HeroPage from "../services/Hero/HeroPage";




function ExploringMau(){
    return(
        <div className="bg-gradient-to-br from-sky-300/30 to-orange-900/40"> 
        <>
        <HeroPage
            region="mauranipur" 
            title="Mauranipur"
            desc="A true traveler collects memories, not destinations. The story isn’t in how many places you’ve been — it’s in how deeply you felt each one. It’s the strangers who became friends, the sunsets you still remember,and the moments that were so perfect you forgot to take a picture."/>;
        <ImagesPage region="mauranipur" />;
        <DestinationPage region="mauranipur" />;
        <FoodPage
         region="mauranipur"
        title="Famous FOOD & Restaurants"
        subtitle="Discover cafés, dhabas, and restaurants that serve more than food — they serve stories."
        />
        <HotelPage
        region="mauranipur"
        title="Hotels & Banquet"
        subtitle="Rest, relax, and rejoice — where every stay feels like home and every event feels royal."
        />
        {/* <ShopPage
            region="mauranipur"
            title="Mauranipur Bazaar Tales"
            subtitle="Mauranipur’s heart beats in its bustling shops — a blend of heritage, hustle, and handmade beauty."
            /> */}
        <EventsPage region="mauranipur"/>
        <CreatorPage region="mauranipur" />;
        <VideoPage region="mauranipur" />;
        </>
        </div>
    )
}
export default ExploringMau;