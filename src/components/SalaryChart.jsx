function SalaryChart({ employees }) {
  // Aggregate salary per city
  const cityData = employees.reduce((acc, emp) => {
    const salary = parseInt(emp.salary.replace(/[^0-9.-]+/g, "")) || 0;
    if (!acc[emp.city]) acc[emp.city] = { city: emp.city, total: 0, count: 0 };
    acc[emp.city].total += salary;
    acc[emp.city].count += 1;
    return acc;
  }, {});

  const data = Object.values(cityData).map(d => ({
    city: d.city,
    avgSalary: d.total / d.count
  })).sort((a, b) => b.avgSalary - a.avgSalary).slice(0, 5);

  const width = 600;
  const height = 300;
  const padding = 60;
  const maxVal = Math.max(...data.map(d => d.avgSalary), 1);
  
  const barWidth = (width - padding * 2) / data.length;

  return (
    <div className="chart-container" style={{ width: "100%", overflowX: "auto" }}>
      <svg width={width} height={height} style={{ background: "rgba(255,255,255,0.02)", borderRadius: "16px" }}>
        {/* Grid Lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
          <line
            key={i}
            x1={padding}
            y1={height - padding - (height - padding * 2) * p}
            x2={width - padding}
            y2={height - padding - (height - padding * 2) * p}
            stroke="rgba(255,255,255,0.1)"
            strokeDasharray="4"
          />
        ))}

        {data.map((d, i) => {
          const barHeight = (d.avgSalary / maxVal) * (height - padding * 2);
          const x = padding + i * barWidth + 10;
          const y = height - padding - barHeight;

          return (
            <g key={i} className="bar-group">
              <rect
                x={x}
                y={y}
                width={barWidth - 20}
                height={barHeight}
                fill="url(#barGradient)"
                rx="8"
              />
              <text
                x={x + (barWidth - 20) / 2}
                y={height - padding + 20}
                fill="var(--text-muted)"
                fontSize="10"
                textAnchor="middle"
              >
                {d.city}
              </text>
              <text
                x={x + (barWidth - 20) / 2}
                y={y - 10}
                fill="white"
                fontSize="12"
                fontWeight="600"
                textAnchor="middle"
              >
                ${Math.round(d.avgSalary / 1000)}k
              </text>
            </g>
          );
        })}

        <defs>
          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--accent)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default SalaryChart;