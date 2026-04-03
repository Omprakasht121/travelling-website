import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Landing from "../../modules/landing_page/pages/Landing";
import ExploringMau from "../../modules/Explore_page/Mauranipur-Explore/ExploringMau";
import ExploringOrchha from "../../modules/Explore_page/Orchha-Explore/ExploringOrchha";
import AdminLayout from "../../modules/Admin_Panel/pages/AdminLayout";
import RegisterModal from "../../user/pages/RegisterModal";
import WishlistPage from "../../modules/dashboard/WishlistPage";
import RegionRouter from "./RegionRouter";
import Creators from "../../modules/Creators_page/Creators";
import Events from "../../modules/events/Events";
import LoginModal from "../../user/pages/LoginModal";
import ExploringBanda from "../../modules/Explore_page/Banda-Explore/ExploringBanda";
import CreatorProfileModal from "../../modules/Explore_page/services/Creators/CreatorProfileModal";
import ExploringJhansi from "../../modules/Explore_page/Jhansi-Explore/ExploringJhansi";
import NotFound from "../component/NotFound";
import PageTransition from "../component/PageTransition";
import AIPlannerPage from "../../modules/ai_planner/AIPlannerPage";

export const  AppRoutes = () => {
    const location = useLocation();
    return(
        <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
        <Routes location={location}>
            <Route path="/" element={<Landing/>}/>
            <Route path="/mauranipur" element={<ExploringMau/>}/>
            <Route path="/jhansi" element={<ExploringJhansi/>}/>
            <Route path="/orchha" element={<ExploringOrchha/>}/>
            <Route path="/banda" element={<ExploringBanda/>}/>
            <Route path="/admin" element={<AdminLayout />} />
            <Route path="/register" element={<RegisterModal/>}/>
            <Route path="/creators" element={<Creators/>}/>
            <Route path="/events" element={<Events/>}/>
            <Route path="/login" element={<LoginModal/>}/>
            <Route path="/maucreators" element={<CreatorProfileModal/>}/>
            <Route path="/wishlist" element={<WishlistPage/>}/>
            <Route path="/ai-planner" element={<AIPlannerPage />} />
            <Route path="/:region/:category" element={<RegionRouter />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
        </PageTransition>
        </AnimatePresence>
    );
}