import React, { useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet";
import { Plus, Minus, Locate, MapPin } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { motion } from "framer-motion";

const bundelkhandCenter = [25.1213, 79.2346];
const bundelkhandZoom = 8;

const RegionMap = () => {
  const [zoom, setZoom] = useState(bundelkhandZoom);
  const mapRef = useRef();

  const destinations = [
    { name: "Jhansi", position: [25.4484, 78.5685], url: "https://www.google.com/maps?q=Jhansi" },
    { name: "Orchha", position: [25.3519, 78.6417], url: "https://www.google.com/maps?q=Orchha" },
    { name: "Mauranipur", position: [25.2462, 79.1366], url: "https://www.google.com/maps?q=Mauranipur" },
    { name: "Khajuraho", position: [24.8481, 79.9339], url: "https://www.google.com/maps?q=Khajuraho" },
    { name: "Jalaun", position: [26.1459, 79.3297], url: "https://www.google.com/maps?q=Jalaun" },
    { name: "Hamirpur", position: [31.6862, 76.5213], url: "https://www.google.com/maps?q=Hamirpur" },
    { name: "Mahoba", position: [25.2945, 79.8859], url: "https://www.google.com/maps?q=Mahoba" },
    { name: "Bandha", position: [25.4763, 80.3395], url: "https://www.google.com/maps?q=Bandha" },
    { name: "Chitrakoot", position: [25.207, 80.853], url: "https://www.google.com/maps?q=Chitrakoot" },
    { name: "Tikamgarh", position: [24.7484, 78.831], url: "https://www.google.com/maps?q=Tikamgarh" },
    { name: "Panna", position: [24.721, 80.188], url: "https://www.google.com/maps?q=Panna" },
    { name: "Sagar", position: [23.8388, 78.7378], url: "https://www.google.com/maps?q=Sagar" },
    { name: "Damoh", position: [23.8323, 79.4387], url: "https://www.google.com/maps?q=Damoh" },
    { name: "Lalitpur", position: [24.6912, 78.4138], url: "https://www.google.com/maps?q=Lalitpur" },
  ];

  const customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    iconSize: [20, 30],
    iconAnchor: [14, 45],
  });

  // ✅ Custom Zoom Control Buttons
  const ZoomControls = () => {
    const map = useMap();

    const zoomIn = () => {
      map.setZoom(map.getZoom() + 1);
      setZoom(map.getZoom() + 1);
    };

    const zoomOut = () => {
      map.setZoom(map.getZoom() - 1);
      setZoom(map.getZoom() - 1);
    };

    const locateRegion = () => {
      map.flyTo(bundelkhandCenter, bundelkhandZoom, { duration: 2 });
    };

    const openGoogleMap = () => {
      window.open(`https://maps.app.goo.gl/KTqX1NX1wHiMAtmK9`, "_blank");
    };

    return (
      <div className="absolute bottom-6 right-2 md:right-4 flex flex-col gap-3 z-[1000]">
        <button onClick={locateRegion} className="p-2 bg-blue-700 rounded-full hover:bg-blue-800  shadow-[inset_4px_4px_6px_rgba(50,0,0,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_0_8px_12px_rgba(0,0,0,0.6)]" title="Go to Bundelkhand">
          <Locate className="w-6 h-6 text-white" />
        </button>
        <button onClick={zoomIn} className="p-2 bg-green-600 rounded-full hover:bg-green-700 shadow-[inset_4px_4px_6px_rgba(50,0,0,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_0_8px_12px_rgba(0,0,0,0.6)]" title="Zoom In">
          <Plus className="w-6 h-6 text-white" />
        </button>
        <button onClick={zoomOut} className="p-2 bg-red-600 rounded-full hover:bg-red-700 shadow-[inset_4px_4px_6px_rgba(50,0,0,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_0_8px_12px_rgba(0,0,0,0.6)]" title="Zoom Out">
          <Minus className="w-6 h-6 text-white" />
        </button>
        <button onClick={openGoogleMap} className="p-2 bg-yellow-600 rounded-full hover:bg-yellow-700 shadow-[inset_4px_4px_6px_rgba(50,0,0,0.4),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_0_8px_12px_rgba(0,0,0,0.6)]" title="Open in Google Maps">
          <MapPin className="w-6 h-6 text-white" />
        </button>
      </div>
    );
  };

  return (
    <main className="min-h-auto w-full flex flex-col items-center  text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-24 w-full text-gray-900 ">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          {/* ✅ CHANGED: Fixed typo tracking-tigh -> tracking-tight */}
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Map And Region</h1>
          <p className="mt-2 text-sm text-gray-800">
            Trace your journey through the heart of India — from the hilltop
            forts of Jhansi to the sacred rivers of Chitrakoot.
          </p>
        </motion.header>

        {/* Map Section */}
        <section className="relative w-full md:px-8 md:py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            /* ✅ CHANGED: Replaced h-[75vh] with h-[70vh] (mobile) and md:h-[40rem] (desktop) */
            className="relative h-[60vh] md:h-[35rem] rounded-xl p-2 z-0 overflow-hidden border border-slate-700 max-w-4xl mx-auto rounded-3xl shadow-lg  shadow-[inset_4px_4px_6px_rgba(50,0,0,0.2),_inset_-4px_-4px_8px_rgba(255,255,255,0.05),_4px_8px_12px_rgba(0,0,0,0.6)]"
          >
            <MapContainer
              center={bundelkhandCenter}
              zoom={zoom}
              whenCreated={(map) => (mapRef.current = map)}
              className="w-full h-full rounded-xl"
              zoomControl={false}
              scrollWheelZoom={false}
              dragging={!L.Browser.mobile} // ✅ Disable drag on mobile
              tap={false} // ✅ Prevent stuck touch events
              touchZoom={true} // ✅ Allow only two-finger zoom
              doubleClickZoom={false} // ✅ Prevent accidental zoom
            >
              {/* Map Tiles */}
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap contributors"
              />

              {/* Markers */}
              {destinations.map((place) => (
                <Marker
                  key={place.name}
                  position={place.position}
                  icon={customIcon}
                  eventHandlers={{
                    click: () => window.open(place.url, "_blank"),
                  }}
                >
                  <Tooltip direction="top" offset={[0, -30]} opacity={1}>
                    {place.name}
                  </Tooltip>
                </Marker>
              ))}

              <ZoomControls />
            </MapContainer>
          </motion.div>
        </section>
      </div>
    </main>
  );
};

export default RegionMap;