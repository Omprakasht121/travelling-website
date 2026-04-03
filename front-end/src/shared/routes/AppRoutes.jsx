import { Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// --- COMPONENTS ---
import PageTransition from "../component/PageTransition";
import PageLoader from "../component/PageLoader";
import NotFound from "../component/NotFound";

// --- LAZY LOADED PAGES (Code Splitting) ---
const Landing = lazy(() => import("../../modules/landing_page/pages/Landing"));
const ExploringMau = lazy(() => import("../../modules/Explore_page/Mauranipur-Explore/ExploringMau"));
const ExploringOrchha = lazy(() => import("../../modules/Explore_page/Orchha-Explore/ExploringOrchha"));
const ExploringBanda = lazy(() => import("../../modules/Explore_page/Banda-Explore/ExploringBanda"));
const ExploringJhansi = lazy(() => import("../../modules/Explore_page/Jhansi-Explore/ExploringJhansi"));
const AdminLayout = lazy(() => import("../../modules/Admin_Panel/pages/AdminLayout"));
const RegisterModal = lazy(() => import("../../user/pages/RegisterModal"));
const WishlistPage = lazy(() => import("../../modules/dashboard/WishlistPage"));
const RegionRouter = lazy(() => import("./RegionRouter"));
const Creators = lazy(() => import("../../modules/Creators_page/Creators"));
const Events = lazy(() => import("../../modules/events/Events"));
const LoginModal = lazy(() => import("../../user/pages/LoginModal"));
const CreatorProfileModal = lazy(() => import("../../modules/Explore_page/services/Creators/CreatorProfileModal"));
const AIPlannerPage = lazy(() => import("../../modules/ai_planner/AIPlannerPage"));

export const AppRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
                {/* 
                  Suspense handles the loading state of Lazy Components.
                  The PageLoader will be shown during the "Download" phase of each route.
                */}
                <Suspense fallback={<PageLoader />}>
                    <Routes location={location}>
                        <Route path="/" element={<Landing />} />
                        <Route path="/mauranipur" element={<ExploringMau />} />
                        <Route path="/jhansi" element={<ExploringJhansi />} />
                        <Route path="/orchha" element={<ExploringOrchha />} />
                        <Route path="/banda" element={<ExploringBanda />} />
                        <Route path="/admin" element={<AdminLayout />} />
                        <Route path="/register" element={<RegisterModal />} />
                        <Route path="/creators" element={<Creators />} />
                        <Route path="/events" element={<Events />} />
                        <Route path="/login" element={<LoginModal />} />
                        <Route path="/maucreators" element={<CreatorProfileModal />} />
                        <Route path="/wishlist" element={<WishlistPage />} />
                        <Route path="/ai-planner" element={<AIPlannerPage />} />
                        <Route path="/:region/:category" element={<RegionRouter />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </PageTransition>
        </AnimatePresence>
    );
}