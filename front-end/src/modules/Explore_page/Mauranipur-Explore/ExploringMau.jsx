
import CreatorPage from "../services/Creators/CreatorPage";
import DestinationPage from "../services/Destinations/DestinationPage";
import EventsPage from "../services/Events/EventPage";
import FoodPage from "../services/Food/FoodPage";
import HotelPage from "../services/Hotel/HotelPage";
import ImagesPage from "../services/Images/ImagesPage";
import ShopPage from "../services/Shop/ShopPage";
import VideoPage from "../services/Videos/VideoOfMau";
import HeroPage from "../services/Hero/HeroPage";
import ErrorBoundary from "../../../shared/component/ErrorBoundary";
import ScrollToTop from "../../../shared/component/ScrollToTop";
import Breadcrumb from "../../../shared/component/Breadcrumb";




import { useTranslation } from "react-i18next";

function ExploringMau(){
    const { t } = useTranslation();

    return(
        <div className="bg-gradient-to-br from-sky-300/30 to-orange-900/40"> 
        <>
        <HeroPage
            region="mauranipur" 
            title={t("explore.mauranipur.title")}
            desc={t("explore.mauranipur.description")}/>;
        <Breadcrumb items={[{ label: t("explore.mauranipur.title") }]} />
        <ErrorBoundary><ImagesPage region="mauranipur" /></ErrorBoundary>;
        <ErrorBoundary><DestinationPage region="mauranipur" /></ErrorBoundary>;
        <ErrorBoundary><FoodPage
         region="mauranipur"
        title={t("services.food.title")}
        subtitle={t("services.food.subtitle")}
        /></ErrorBoundary>
        <ErrorBoundary><HotelPage
        region="mauranipur"
        title={t("services.hotels.title")}
        subtitle={t("services.hotels.subtitle")}
        /></ErrorBoundary>
        {/* <ShopPage
            region="mauranipur"
            title={`Mauranipur ${t("services.shop.titleSuffix")}`}
            subtitle={t("services.shop.subtitle")}
            /> */}
        <ErrorBoundary><EventsPage region="mauranipur"/></ErrorBoundary>
        <ErrorBoundary><CreatorPage region="mauranipur" /></ErrorBoundary>;
        <ErrorBoundary><VideoPage region="mauranipur" /></ErrorBoundary>;
        <ScrollToTop />
        </>
        </div>
    )
}
export default ExploringMau;