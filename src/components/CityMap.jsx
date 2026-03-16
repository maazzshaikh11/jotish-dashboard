import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const cityCoordinates = {
  "Mumbai": [19.076, 72.8777],
  "Delhi": [28.6139, 77.209],
  "Bangalore": [12.9716, 77.5946],
  "San Francisco": [37.7749, -122.4194],
  "New York": [40.7128, -74.0060],
  "London": [51.5074, -0.1278],
  "Tokyo": [35.6762, 139.6503],
  "Edinburgh": [55.9533, -3.1883],
  "Singapore": [1.3521, 103.8198],
};

function CityMap({ employees }) {
  // Unique cities from employees
  const cities = Array.from(new Set(employees.map(e => e.city)));

  return (
    <div className="map-wrapper" style={{ borderRadius: "24px", overflow: "hidden", border: "1px solid var(--glass-border)", height: "400px" }}>
      <MapContainer center={[20, 0]} zoom={2} style={{ height: "100%", width: "100%" }}>
        <TileLayer 
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {cities.map((city, i) => {
          const coords = cityCoordinates[city];
          if (!coords) return null;

          const count = employees.filter(e => e.city === city).length;

          return (
            <Marker key={i} position={coords}>
              <Popup>
                <div style={{ color: "black" }}>
                  <strong>{city}</strong><br />
                  {count} Employees
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default CityMap;