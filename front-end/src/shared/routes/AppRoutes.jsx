import { Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// --- CORE COMPONENTS ---
import PageTransition from "../component/PageTransition";
// I will create this high-end skeleton next
import GlobalSkeleton from "../component/GlobalSkeleton";
import NotFound from "../component/NotFound";

// --- LAZY DOWNLOADS (Code Splitting - Production Performance) ---
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
const MyTripDashboard = lazy(() => import("../../modules/dashboard/MyTripDashboard"));
const PublicTripView = lazy(() => import("../../modules/dashboard/PublicTripView"));

/**
 * PRODUCTION-GRADE ROUTING:
 * 1.  AnimatePresence: Handles the entry/exit of pages.
 * 2.  PageTransition: Provides the animation 'shell'.
 * 3.  Suspense: Displays the GlobalSkeleton while the Lazy JS chunk is downloading.
 * 4.  Stable Key: We use location.pathname ONCE to ensure perfect sync.
 */
export const AppRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
                <Suspense fallback={<GlobalSkeleton />}>
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
                        <Route path="/my-trip" element={<MyTripDashboard />} />
                        <Route path="/trip/:shareId" element={<PublicTripView />} />
                        <Route path="/:region/:category" element={<RegionRouter />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </PageTransition>
        </AnimatePresence>
    );
}