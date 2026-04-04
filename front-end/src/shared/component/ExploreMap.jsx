import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';

// ✅ Fix default Leaflet icon loading
// We use unpkg URLs for the default icons if they aren't loaded correctly by Vite
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

/**
 * ExploreMap Component
 * @param {Array} points - Array of { name, position, description, type, mapLink }
 * @param {Array} center - [latitude, longitude]
 * @param {number} zoom - Zoom level
 * @param {string} title - Section title
 */
const ExploreMap = ({ 
  points = [], 
  center = [25.4484, 78.5685], 
  zoom = 13, 
  title = "Map Overview" 
}) => {

  const markers = useMemo(() => points.map((point, index) => (
    <Marker key={index} position={point.position}>
      <Tooltip direction="top" offset={[0, -20]} opacity={1}>
        <span className="font-semibold text-slate-800">{point.name}</span>
      </Tooltip>
      <Popup closeButton={false} className="custom-popup">
        <div className="p-2 space-y-2">
          <h3 className="font-bold text-lg text-blue-700">{point.name}</h3>
          <p className="text-sm text-slate-600 leading-tight">{point.description}</p>
          {point.mapLink && (
            <button 
              onClick={() => window.open(point.mapLink, '_blank')}
              className="flex items-center gap-1 text-xs font-semibold text-white bg-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-700 transition"
            >
              <Navigation className="w-3 h-3" />
              View Location
            </button>
          )}
        </div>
      </Popup>
    </Marker>
  )), [points]);

  return (
    <section className="py-12 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-24">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex items-center gap-3"
        >
          <div className="p-3 bg-red-600 rounded-2xl shadow-lg">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              {title}
            </h2>
            <p className="text-sm md:text-base text-slate-700 mt-1">
              Visualize the journey across this majestic land.
            </p>
          </div>
        </motion.div>

        {/* Map Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative h-[60vh] md:h-[35rem] w-full rounded-[2.5rem] overflow-hidden border-4 border-white/50 shadow-2xl z-0"
        >
          <MapContainer 
            center={center} 
            zoom={zoom} 
            className="w-full h-full"
            zoomControl={false}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            <ZoomControl position="bottomright" />
            
            {markers}
            
          </MapContainer>

          {/* Map Overlay Blur (Optional effect on edges) */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </motion.div>
      </div>
      
      <style>{`
        .leaflet-container {
          background-color: #f8fafc;
        }
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 1rem;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
        }
        .custom-popup .leaflet-popup-content {
          margin: 0;
        }
        .leaflet-tooltip {
          border-radius: 0.5rem;
          border: none;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          font-family: inherit;
        }
      `}</style>
    </section>
  );
};

export default ExploreMap;
