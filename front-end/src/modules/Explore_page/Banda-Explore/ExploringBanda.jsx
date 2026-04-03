
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

function ExploringBanda(){
    const { t } = useTranslation();

    return(
        <div className="bg-gradient-to-br from-amber-300/10 to-rose-700/10"> 
        <>
        <HeroPage
            region="banda" 
            title={t("explore.banda.title")}
            desc={t("explore.banda.description")}/>;
        <Breadcrumb items={[{ label: t("explore.banda.title") }]} />
        <ErrorBoundary><ImagesPage region="banda" /></ErrorBoundary>;
        <ErrorBoundary><DestinationPage region="banda" /></ErrorBoundary>;
        <ErrorBoundary><FoodPage
         region="banda"
        title={t("services.food.title")}
        subtitle={t("services.food.subtitle")}
        /></ErrorBoundary>
        <ErrorBoundary><HotelPage
        region="banda"
        title={t("services.hotels.title")}
        subtitle={t("services.hotels.subtitle")}
        /></ErrorBoundary>
        <ErrorBoundary><ShopPage
            region="banda"
            title={`${t("explore.banda.title")} ${t("services.shop.titleSuffix")}`}
            subtitle={t("services.shop.subtitle")}
            /></ErrorBoundary>
        <ErrorBoundary><EventsPage region="banda"/></ErrorBoundary>
        <ErrorBoundary><CreatorPage region="banda" /></ErrorBoundary>;
        <ErrorBoundary><VideoPage region="banda" /></ErrorBoundary>;
        <ScrollToTop />
        </>
        </div>
    )
}
export default ExploringBanda;