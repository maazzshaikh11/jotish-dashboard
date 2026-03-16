import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SalaryChart from "../components/SalaryChart";
import CityMap from "../components/CityMap";
import { fetchEmployees } from "../utils/api";

function Analytics() {
  const [employees, setEmployees] = useState([]);
  const [mergedImages, setMergedImages] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchEmployees();
      setEmployees(data);
      
      // Load all merged images from localStorage
      const images = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("merged_image_")) {
          images.push({
            id: key.replace("merged_image_", ""),
            url: localStorage.getItem(key)
          });
        }
      }
      setMergedImages(images);
    };

    loadData();
  }, []);

  return (
    <div className="container" style={{ maxWidth: "1200px", margin: "40px auto", padding: "0 24px" }}>
      <header className="list-header-section" style={{ margin: "0 0 40px 0", maxWidth: "100%" }}>
        <div>
          <h1 className="list-title">Analytics Dashboard</h1>
          <p className="list-subtitle">Salary distribution and verified identities</p>
        </div>
        <Link to="/list" className="btn-primary" style={{ width: "auto", padding: "10px 24px", textDecoration: "none" }}>
          Back to List
        </Link>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
        {/* Left Column: Visualizations */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          <div className="glass-card" style={{ maxWidth: "100%", padding: "24px" }}>
            <h2 style={{ fontSize: "1.25rem", marginBottom: "20px", color: "white" }}>Salary Distribution (Top 5 Cities)</h2>
            <SalaryChart employees={employees} />
          </div>

          <div className="glass-card" style={{ maxWidth: "100%", padding: "24px" }}>
            <h2 style={{ fontSize: "1.25rem", marginBottom: "20px", color: "white" }}>Geospatial Distribution</h2>
            <CityMap employees={employees} />
          </div>
        </div>

        {/* Right Column: Identities */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          <div className="glass-card" style={{ maxWidth: "100%", padding: "24px", minHeight: "400px" }}>
            <h2 style={{ fontSize: "1.25rem", marginBottom: "20px", color: "white" }}>Recently Verified Identities</h2>
            
            {mergedImages.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--text-muted)" }}>
                <p>No identities verified yet.</p>
                <Link to="/list" style={{ color: "var(--primary)", marginTop: "12px", display: "inline-block" }}>Go to Employee List</Link>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {mergedImages.map((img, i) => (
                  <div key={i} className="animate-fade-in" style={{ background: "rgba(255,255,255,0.03)", padding: "12px", borderRadius: "16px", border: "1px solid var(--glass-border)" }}>
                    <img 
                      src={img.url} 
                      alt={`Identity ${img.id}`} 
                      style={{ width: "100%", borderRadius: "12px", marginBottom: "8px" }} 
                    />
                    <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center" }}>Verified ID: #{img.id}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;