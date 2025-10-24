import React, { useState, useRef, useEffect } from "react";
import "./Statistics.css";
import { FaMoneyBillWave, FaArrowUp, FaArrowDown, FaShoppingBag, FaChevronDown } from "react-icons/fa";
import Barchart from "../Charts/BarChart";
import LineChart from "../Charts/LineChart";
import PieChart from "../Charts/PieChart";

const Statistics = () => {
  const [timeFilter, setTimeFilter] = useState("today");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const options = [
    { label: "Today", value: "today" },
    { label: "This Month", value: "month" },
    { label: "This Year", value: "year" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const statsData = {
    today: [
      { title: "Revenue", value: "₹8,420", icon: <FaMoneyBillWave color="#22C55E" />, trend: "+5.2%" },
      { title: "Profit", value: "₹640", icon: <FaArrowUp color="#16A34A" />, trend: "+2.4%" },
      { title: "Loss", value: "₹50", icon: <FaArrowDown color="#DC2626" />, trend: "-0.5%" },
      { title: "Sales", value: "120", icon: <FaShoppingBag color="#0EA5E9" />, trend: "+6.0%" },
    ],
    month: [
      { title: "Revenue", value: "₹3,49,000", icon: <FaMoneyBillWave color="#22C55E" />, trend: "+8.4%" },
      { title: "Profit", value: "₹1,19,000", icon: <FaArrowUp color="#16A34A" />, trend: "+5.1%" },
      { title: "Loss", value: "₹8,000", icon: <FaArrowDown color="#DC2626" />, trend: "-1.2%" },
      { title: "Sales", value: "682", icon: <FaShoppingBag color="#0EA5E9" />, trend: "+9.5%" },
    ],
    year: [
      { title: "Revenue", value: "₹42,10,000", icon: <FaMoneyBillWave color="#22C55E" />, trend: "+12%" },
      { title: "Profit", value: "₹13,80,000", icon: <FaArrowUp color="#16A34A" />, trend: "+8%" },
      { title: "Loss", value: "₹67,000", icon: <FaArrowDown color="#DC2626" />, trend: "-2%" },
      { title: "Sales", value: "7,524", icon: <FaShoppingBag color="#0EA5E9" />, trend: "+15%" },
    ],
  };

  const categorySalesData = {
    today: [
      { id: "Art Kit", label: "Art Kit", value: 40, color: "#3e97c0ff" },
      { id: "Pencils", label: "Pencils", value: 30, color: "#16A34A" },
      { id: "Paint Colours", label: "Paint Colours", value: 50, color: "#54887fff" },
    ],
    month: [
      { id: "Art Kit", label: "Art Kit", value: 150, color: "#3e97c0ff" },
      { id: "Pencils", label: "Pencils", value: 300, color: "#16A34A" },
      { id: "Paint Colours", label: "Paint Colours", value: 232, color: "#54887fff" },
      { id: "Canvas", label: "Canvas", value: 100, color: "#1b4c4aff" },
    ],
    year: [
      { id: "Art Kit", label: "Art Kit", value: 1200, color: "#3e97c0ff" },
      { id: "Pencils", label: "Pencils", value: 980, color: "#16A34A" },
      { id: "Paint Colours", label: "Paint Colours", value: 650, color: "#54887fff" },
      { id: "Canvas", label: "Canvas", value: 400, color: "#1b4c4aff" },
    ],
  };

  const currentStats = statsData[timeFilter];

  const revenue = parseInt(currentStats.find(s => s.title === "Revenue").value.replace(/[₹,]/g, ''));
  const profit = parseInt(currentStats.find(s => s.title === "Profit").value.replace(/[₹,]/g, ''));
  const loss = parseInt(currentStats.find(s => s.title === "Loss").value.replace(/[₹,]/g, ''));
  const expense = revenue - profit - loss;
  const returns = 50;

  return (
    <div className="stats-container">
      <div className="stats-page">
        {/* Header */}
        <div className="stats-header-section">
          <h1 className="stats-header">Sales & Revenue Analytics</h1>

          <div className="dropdown-container" ref={dropdownRef}>
            <div className="time-filter" onClick={() => setOpen(!open)}>
              {options.find(o => o.value === timeFilter).label}
              <FaChevronDown style={{ marginLeft: "8px" }} />
            </div>
            {open && (
              <ul className="dropdown-list">
                {options.map((option) => (
                  <li
                    key={option.value}
                    className={option.value === timeFilter ? "active-category" : ""}
                    onClick={() => {
                      setTimeFilter(option.value);
                      setOpen(false);
                    }}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-cards">
          {currentStats.map((stat, i) => (
            <div className="stat-card" key={i}>
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-info">
                <h2>{stat.value}</h2>
                <p>{stat.title}</p>
              </div>
              <span className={`stat-trend ${stat.trend.startsWith("+") ? "up" : "down"}`}>
                {stat.trend}
              </span>
            </div>
          ))}
        </div>

        {/* Table + PieChart */}
        <div className="table-pie-section">
          <div className="profit-margin-section">
            <h2 className="profit-margin-header">Profit Margin</h2>
            <table className="profit-margin-table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Amount</th>
                  <th>Profit Margin (%)</th>
                  <th>Loss Margin (%)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Revenue</td><td>{currentStats.find(s => s.title === "Revenue").value}</td><td colSpan="2">—</td></tr>
                <tr><td>Profit</td><td>{currentStats.find(s => s.title === "Profit").value}</td><td>{((profit / revenue) * 100).toFixed(2)}%</td><td>—</td></tr>
                <tr><td>Loss</td><td>{currentStats.find(s => s.title === "Loss").value}</td><td>—</td><td>{((loss / revenue) * 100).toFixed(2)}%</td></tr>
                <tr><td>Expense</td><td>₹{expense}</td><td>—</td><td>{((expense / revenue) * 100).toFixed(2)}%</td></tr>
                <tr><td>Returns</td><td>₹{returns}</td><td>—</td><td>{((returns / revenue) * 100).toFixed(2)}%</td></tr>
              </tbody>
            </table>
          </div>

          <div className="pie-chart-section">
            <h2 className="pie-chart-header">Sales by Category</h2>
            <PieChart categoryData={categorySalesData[timeFilter]} />
          </div>
        </div>

        {/* Line & Bar Charts */}
          <div className="line-chart-section"><LineChart /></div>
          <div className="bar-chart-section"><Barchart /></div>
      </div>
    </div>
  );
};

export default Statistics;