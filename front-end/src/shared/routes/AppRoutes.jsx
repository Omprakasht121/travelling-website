import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "../../modules/landing_page/pages/Landing";

import ExploringMau from "../../modules/Explore_page/Mauranipur-Explore/pages/ExploringMau";
import ExploringJhansi from "../../modules/Explore_page/Jhansi-Explore/pages/ExploringJhansi";
import ExploringOrchha from "../../modules/Explore_page/Orchha-Explore/pages/ExploringOrchha";
// import AddContent from "../../modules/Admin_Panel/pages/AddContent";
// import Dashboard from "../../modules/Admin_Panel/pages/Dashboard";
import AdminLayout from "../../modules/Admin_Panel/pages/AdminLayout";

export const  AppRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<Landing/>}/>
            <Route path="/mauranipur" element={<ExploringMau/>}/>
            <Route path="/jhansi" element={<ExploringJhansi/>}/>
            <Route path="/orchha" element={<ExploringOrchha/>}/>
            <Route path="/admin" element={<AdminLayout />} />
            {/* <Route path="/admin/dashboard" element={<Dashboard />} /> */}

        </Routes>
    );
}