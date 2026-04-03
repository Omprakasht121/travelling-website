
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

function ExploringJhansi(){
    const { t } = useTranslation();

    return(
        <div className="bg-gradient-to-br from-sky-300/30 to-orange-900/40"> 
        <>
        <HeroPage
            region="jhansi" 
            title={t("explore.jhansi.title")}
            desc={t("explore.jhansi.description")}/>;
        <Breadcrumb items={[{ label: t("explore.jhansi.title") }]} />
        <ErrorBoundary><ImagesPage region="jhansi" /></ErrorBoundary>;
        <ErrorBoundary><DestinationPage region="jhansi" /></ErrorBoundary>;
        <ErrorBoundary><FoodPage
         region="jhansi"
        title={t("services.food.title")}
        subtitle={t("services.food.subtitle")}
        /></ErrorBoundary>
        <ErrorBoundary><HotelPage
        region="jhansi"
        title={t("services.hotels.title")}
        subtitle={t("services.hotels.subtitle")}
        /></ErrorBoundary>
        {/* <ShopPage
            region="jhansi"
            title={`Jhansi ${t("services.shop.titleSuffix")}`}
            subtitle={t("services.shop.subtitle")}
            /> */}
        <ErrorBoundary><EventsPage region="jhansi"/></ErrorBoundary>
        <ErrorBoundary><CreatorPage region="jhansi" /></ErrorBoundary>;
        <ErrorBoundary><VideoPage region="jhansi" /></ErrorBoundary>;
        <ScrollToTop />
        </>
        </div>
    )
}
export default ExploringJhansi;