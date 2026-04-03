import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sun, Cloud, CloudRain, CloudSnow, CloudFog, CloudLightning, CloudDrizzle,
  Wind, Droplets, Thermometer
} from "lucide-react";
import { useTranslation } from "react-i18next"; // in case user switches language

const COORDS = {
  jhansi: { lat: 25.4484, lon: 78.5685, name: "Jhansi" },
  orchha: { lat: 25.3508, lon: 78.6430, name: "Orchha" },
  banda: { lat: 25.4744, lon: 80.3340, name: "Banda" },
  mauranipur: { lat: 25.2470, lon: 79.1770, name: "Mauranipur" },
  chitrakoot: { lat: 25.1834, lon: 80.8931, name: "Chitrakoot" },
};

export default function WeatherWidget({ region }) {
  const { t } = useTranslation();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  // Normalizes region name for coordinate lookup
  const locKey = region?.toLowerCase().trim() || "jhansi";
  const location = COORDS[locKey] || COORDS.jhansi;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        // Using Open-Meteo Free API (Requires no API key)
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m&timezone=auto`;
        const res = await fetch(url);
        const data = await res.json();
        setWeather(data.current);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();

    // Refresh every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [location.lat, location.lon]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 bg-black/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full w-24 h-8 animate-pulse shadow-sm">
        <div className="w-4 h-4 bg-gray-300/50 rounded-full" />
        <div className="h-2 bg-gray-300/50 rounded w-10 flex-1" />
      </div>
    );
  }

  if (!weather) return null;

  // WMO Weather interpretation codes (WW)
  const getWeatherIcon = (code, isDay) => {
    switch (true) {
      case code === 0:
        return isDay ? <Sun className="text-yellow-500 w-4 h-4 sm:w-5 sm:h-5 drop-shadow-md" /> : <Sun className="text-gray-300 w-4 h-4 sm:w-5 sm:h-5" />;
      case code >= 1 && code <= 3:
        return <Cloud className="text-slate-100 w-4 h-4 sm:w-5 sm:h-5 drop-shadow-md" />;
      case code >= 45 && code <= 48:
        return <CloudFog className="text-gray-300 w-4 h-4 sm:w-5 sm:h-5 drop-shadow-md" />;
      case code >= 51 && code <= 55:
      case code >= 56 && code <= 57:
        return <CloudDrizzle className="text-blue-300 w-4 h-4 sm:w-5 sm:h-5 drop-shadow-md" />;
      case code >= 61 && code <= 65:
      case code >= 66 && code <= 67:
      case code >= 80 && code <= 82:
        return <CloudRain className="text-blue-400 w-4 h-4 sm:w-5 sm:h-5 drop-shadow-md" />;
      case code >= 71 && code <= 77:
      case code >= 85 && code <= 86:
        return <CloudSnow className="text-white w-4 h-4 sm:w-5 sm:h-5 drop-shadow-md" />;
      case code >= 95 && code <= 99:
        return <CloudLightning className="text-purple-400 w-4 h-4 sm:w-5 sm:h-5 drop-shadow-md" />;
      default:
        return <Sun className="text-yellow-500 w-4 h-4 sm:w-5 sm:h-5 drop-shadow-md" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex items-center gap-1 md:gap-1.5 bg-black/10 hover:bg-black/20 text-white backdrop-blur-md border border-white/20 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full shadow-[inset_1px_1px_2px_rgba(255,255,255,0.1),_0_2px_4px_rgba(0,0,0,0.2)] transition-colors duration-200 cursor-default"
      title={`${location.name} Weather: ${Math.round(weather.temperature_2m)}°C, ${Math.round(weather.wind_speed_10m)} km/h`}
    >
      {getWeatherIcon(weather.weather_code, weather.is_day)}
      <span className="text-xs md:text-sm font-bold tracking-tight drop-shadow-md">
        {Math.round(weather.temperature_2m)}°C
      </span>
    </motion.div>
  );
}
