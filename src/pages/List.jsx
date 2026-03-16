import { useEffect, useState } from "react";
import { fetchEmployees } from "../utils/api";
import VirtualTable from "../components/VirtualTable";
import { useAuth } from "../context/AuthContext";

function List() {
  const [employees, setEmployees] = useState([]);
  const { logout } = useAuth();

  useEffect(() => {
    const loadEmployees = async () => {
      const data = await fetchEmployees();
      setEmployees(data);
    };

    loadEmployees();
  }, []);

  return (
    <div className="list-page-container">
      <header className="list-header-section">
        <div>
          <h1 className="list-title">Employee Insights</h1>
          <p className="list-subtitle">Manage and verify employee identities</p>
        </div>
        <button className="btn-primary" style={{ width: "auto", padding: "10px 24px" }} onClick={logout}>
          Logout
        </button>
      </header>

      <VirtualTable data={employees} />
    </div>
  );
}

export default List;