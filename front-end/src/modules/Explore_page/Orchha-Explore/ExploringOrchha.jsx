
import CreatorPage from "../services/Creators/CreatorPage";
import DestinationPage from "../services/Destinations/DestinationPage";
import EventsPage from "../services/Events/EventPage";
import FoodPage from "../services/Food/FoodPage";
import HotelPage from "../services/Hotel/HotelPage";
import ImagesPage from "../services/Images/ImagesPage";

import VideoPage from "../services/Videos/VideoOfMau";
import HeroPage from "../services/Hero/HeroPage";
import ErrorBoundary from "../../../shared/component/ErrorBoundary";
import ScrollToTop from "../../../shared/component/ScrollToTop";
import Breadcrumb from "../../../shared/component/Breadcrumb";




import { useTranslation } from "react-i18next";

function ExploringOrchha(){
    const { t } = useTranslation();

    return(
        <div className="bg-gradient-to-br from-sky-300/30 to-orange-900/40"> 
        <>
        <HeroPage
            region="orchha" 
            title={t("explore.orchha.title")}
            desc={t("explore.orchha.description")}/>;
        <Breadcrumb items={[{ label: t("explore.orchha.title") }]} />
        <ErrorBoundary><ImagesPage region="orchha" /></ErrorBoundary>;
        <ErrorBoundary><DestinationPage region="orchha" /></ErrorBoundary>;
        <ErrorBoundary><FoodPage
         region="orchha"
        title={t("services.food.title")}
        subtitle={t("services.food.subtitle")}
        /></ErrorBoundary>
        <ErrorBoundary><HotelPage
        region="orchha"
        title={t("services.hotels.title")}
        subtitle={t("services.hotels.subtitle")}
        /></ErrorBoundary>
        {/* <ShopPage
            region="orchha"
            title={`Orchha ${t("services.shop.titleSuffix")}`}
            subtitle={t("services.shop.subtitle")}
            /> */}
        <ErrorBoundary><EventsPage region="orchha"/></ErrorBoundary>
        <ErrorBoundary><CreatorPage region="orchha" /></ErrorBoundary>;
        <ErrorBoundary><VideoPage region="orchha" /></ErrorBoundary>;
        <ScrollToTop />
        </>
        </div>
    )
}
export default ExploringOrchha;