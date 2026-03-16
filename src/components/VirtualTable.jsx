import { useState, useRef, useEffect, useMemo } from "react";
import { calculateVisibleRows } from "../utils/virtualization";
import { useNavigate } from "react-router-dom";
import "../styles/table.css";

function VirtualTable({ data }) {
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);
  const containerHeight = 600;
  const rowHeight = 64;
  const navigate = useNavigate();

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  const { visibleData, offsetY, totalHeight } = useMemo(() => {
    return calculateVisibleRows(data, scrollTop, rowHeight, containerHeight);
  }, [data, scrollTop, rowHeight, containerHeight]);

  return (
    <div className="table-wrapper animate-fade-in">
      <div className="table-header">
        <div className="cell">ID</div>
        <div className="cell">Name</div>
        <div className="cell">Position</div>
        <div className="cell">City</div>
        <div className="cell">Salary</div>
      </div>
      <div
        className="scroll-container"
        ref={containerRef}
        onScroll={handleScroll}
        style={{ height: containerHeight }}
      >
        <div className="scroll-spacer" style={{ height: totalHeight }}>
          <div
            className="visible-rows"
            style={{ transform: `translateY(${offsetY}px)` }}
          >
            {visibleData.map((emp) => (
              <div
                key={emp.id}
                className="table-row-item"
                style={{ height: rowHeight }}
                onClick={() => navigate(`/details/${emp.id}`)}
              >
                <div className="cell">{emp.id}</div>
                <div className="cell font-bold">{emp.name}</div>
                <div className="cell text-muted">{emp.position}</div>
                <div className="cell">{emp.city}</div>
                <div className="cell text-accent">{emp.salary}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VirtualTable;