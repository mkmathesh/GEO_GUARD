import React, { useState, useEffect } from "react";
import {useLocation} from "react-router-dom";
import "./MapCheck.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// ✅ Fix marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// ✅ Component to move map when position updates
const ChangeView = ({ center }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, 10);

  }, [center, map]);

  return null;
};

export const MapCheck = () => {
  const [query, setQuery] = useState("");
  const [position, setPosition] = useState([20.5937, 78.9629]); // Default India
  const store=useLocation();
  useEffect(()=>{
  if(store.data!=null)
  {
     const data=store.state.data;
      setQuery(data.location);
  }
  else{
    setQuery("");
  }
  },[])

  const handleSearch = async () => {
    if (!query) return;

    try {
      const res = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: query,
            format: "json",
          },
        }
      );

      if (res.data.length > 0) {
        const { lat, lon } = res.data[0];
        setPosition([parseFloat(lat), parseFloat(lon)]);
      } else {
        alert("Location not found");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      alert("Network error! Check internet.");
    }
  };

  return (
    <div className="MapCheck-container">
      {/* 🔍 Search Box */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <h1>fi</h1>
      </div>

      {/* 🗺️ Map */}
      <MapContainer center={position} zoom={5} className="map">
        <ChangeView center={position} />
         

        {/* ✅ Use reliable tile server (fix your error) */}
        <TileLayer
          attribution="&copy; OpenStreetMap contributors & CartoDB"
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        

        <Marker position={position}>
          <Popup>{query || "Selected Location"}</Popup>
        </Marker>
      </MapContainer>
     
    </div>
  );
};