import React, { useEffect, useState } from "react";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import AddContent from "./AddContent";
import Event from "./Event";
import Creator from "./Creator";
import PlanJourney from "./PlanJouney";
import AdminLogin from "../admin-entry/AdminLogin";

const AdminLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activePage, setActivePage] = useState("Landing");

  // Check token from localStorage
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) setIsAuthenticated(true);
  }, []);

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  const renderPage = () => {
    switch (activePage) {
      case "Landing": return <Landing />;
      case "Explore": return <AddContent />;
      case "Dashboard": return <Dashboard />;
      case "Event": return <Event />;
      case "Creator": return <Creator />;
      case "PlanJourney": return <PlanJourney />;
      default: return <Landing />;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <div className="sticky top-0 bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700">Admin Panel</h1>

        <select
          value={activePage}
          onChange={(e) => setActivePage(e.target.value)}
          className="border rounded-md px-3 py-2"
        >
          <option value="Landing">Landing</option>
          <option value="Explore">Explore</option>
          <option value="Dashboard">Dashboard</option>
          <option value="Event">Event</option>
          <option value="Creator">Creator</option>
          <option value="PlanJourney">Plan Journey</option>
        </select>

        <button
          onClick={() => {
            localStorage.removeItem("adminToken");
            setIsAuthenticated(false);
          }}
          className="ml-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="p-6">{renderPage()}</div>
    </main>
  );
};

export default AdminLayout;
