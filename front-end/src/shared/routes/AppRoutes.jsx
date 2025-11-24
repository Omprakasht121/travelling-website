import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "../../modules/landing_page/pages/Landing";
import ExploringMau from "../../modules/Explore_page/Mauranipur-Explore/pages/ExploringMau";
import ExploringJhansi from "../../modules/Explore_page/Jhansi-Explore/pages/ExploringJhansi";
import ExploringOrchha from "../../modules/Explore_page/Orchha-Explore/pages/ExploringOrchha";
import AdminLayout from "../../modules/Admin_Panel/pages/AdminLayout";
import { Login } from "../../user/pages/Login";
import RegisterModal from "../../user/pages/RegisterModal";
import CreatorProfileModal from "../../modules/modals/CreatorProfileModal";
import WishlistPage from "../../modules/dashboard/WishlistPage";
import RegionRouter from "./RegionRouter";
import Creators from "../../modules/Creators_page/Creators";
import Events from "../../modules/events/Events";
import LoginModal from "../../user/pages/LoginModal";
import ExploringBanda from "../../modules/Explore_page/Banda-Explore/pages/ExploringBanda";

export const  AppRoutes = () => {
    return(
        <Routes>
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
            <Route path="/:region/:category" element={<RegionRouter />} />

            
            

        </Routes>
    );
}