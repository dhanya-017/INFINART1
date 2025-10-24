import React, { useState, useRef, useEffect } from "react";
import "./Orders.css";
import OrderTable from "../OrderTable/OrderTable";
import {
  FaBox,
  FaCheckCircle,
  FaClock,
  FaShippingFast,
  FaChevronDown,
} from "react-icons/fa";

const Orders = () => {
  const [timeFilter, setTimeFilter] = useState("today");
  const [activeTab, setActiveTab] = useState("orders");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [openDropdown, setOpenDropdown] = useState(null);

  const timeOptions = [
    { label: "Today", value: "today" },
    { label: "This Week", value: "weekly" },
    { label: "This Month", value: "monthly" },
    { label: "This Year", value: "yearly" },
  ];

  const categoryOptions = ["All Categories", "Art", "Paint", "Decor"];

  const dropdownRefs = {
    time: useRef(),
    category: useRef(),
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRefs.time.current &&
        !dropdownRefs.time.current.contains(event.target) &&
        dropdownRefs.category.current &&
        !dropdownRefs.category.current.contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Stats Data
  const statsData = {
    orders: {
      today: [
        { title: "Total Orders", value: 10123, icon: <FaBox /> },
        { title: "Completed Orders", value: 1990, icon: <FaCheckCircle /> },
        { title: "Pending Orders", value: 250, icon: <FaClock /> },
        { title: "Shipped Orders", value: 3400, icon: <FaShippingFast /> },
      ],
      weekly: [
        { title: "Total Orders", value: 6523, icon: <FaBox /> },
        { title: "Completed Orders", value: 1560, icon: <FaCheckCircle /> },
        { title: "Pending Orders", value: 200, icon: <FaClock /> },
        { title: "Shipped Orders", value: 3000, icon: <FaShippingFast /> },
      ],
      monthly: [
        { title: "Total Orders", value: 30123, icon: <FaBox /> },
        { title: "Completed Orders", value: 12190, icon: <FaCheckCircle /> },
        { title: "Pending Orders", value: 450, icon: <FaClock /> },
        { title: "Shipped Orders", value: 7800, icon: <FaShippingFast /> },
      ],
      yearly: [
        { title: "Total Orders", value: 120123, icon: <FaBox /> },
        { title: "Completed Orders", value: 90000, icon: <FaCheckCircle /> },
        { title: "Pending Orders", value: 2500, icon: <FaClock /> },
        { title: "Shipped Orders", value: 85000, icon: <FaShippingFast /> },
      ],
    },
    refunds: {
      today: [
        { title: "Total Refunds", value: 123, icon: <FaBox /> },
        { title: "Processed", value: 90, icon: <FaCheckCircle /> },
        { title: "Pending", value: 33, icon: <FaClock /> },
        { title: "Amount Refunded ($)", value: 4500, icon: <FaShippingFast /> },
      ],
      weekly: [
        { title: "Total Refunds", value: 512, icon: <FaBox /> },
        { title: "Processed", value: 420, icon: <FaCheckCircle /> },
        { title: "Pending", value: 92, icon: <FaClock /> },
        { title: "Amount Refunded ($)", value: 17800, icon: <FaShippingFast /> },
      ],
      monthly: [
        { title: "Total Refunds", value: 1023, icon: <FaBox /> },
        { title: "Processed", value: 850, icon: <FaCheckCircle /> },
        { title: "Pending", value: 173, icon: <FaClock /> },
        { title: "Amount Refunded ($)", value: 45000, icon: <FaShippingFast /> },
      ],
      yearly: [
        { title: "Total Refunds", value: 5023, icon: <FaBox /> },
        { title: "Processed", value: 4200, icon: <FaCheckCircle /> },
        { title: "Pending", value: 823, icon: <FaClock /> },
        { title: "Amount Refunded ($)", value: 178000, icon: <FaShippingFast /> },
      ],
    },
  };

  const refundsData = [
    { item: "Refund Item", id: "#54321", customer: "Jane Doe", refund: "$49", status: "Pending" },
    { item: "Refund Item 2", id: "#54322", customer: "Bob Smith", refund: "$79", status: "Processed" },
  ];

  const currentStats = statsData[activeTab][timeFilter];

  return (
    <div className="orders-page">
      <div className="container">
        {/* Header + Time Dropdown */}
        <div className="orders-header-section">
          <h1 className="orders-header">
            {activeTab === "orders" ? "Orders Overview" : "Refunds Overview"}
          </h1>

          <div className="dropdown-container" ref={dropdownRefs.time}>
            <div
              className="time-filter"
              onClick={() =>
                setOpenDropdown(openDropdown === "time" ? null : "time")
              }
            >
              {timeOptions.find((t) => t.value === timeFilter).label}
              <FaChevronDown style={{ marginLeft: "8px" }} />
            </div>
            {openDropdown === "time" && (
              <ul className="dropdown-list">
                {timeOptions.map((option) => (
                  <li
                    key={option.value}
                    className={option.value === timeFilter ? "active-category" : ""}
                    onClick={() => {
                      setTimeFilter(option.value);
                      setOpenDropdown(null);
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
        <div className="order-stats-cards">
          {currentStats.map((stat, i) => (
            <div className="order-stat-card" key={i}>
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-info">
                <h2>{stat.value.toLocaleString()}</h2>
                <p>{stat.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs + Search */}
        <div className="orders-filter-section">
          <div className="orders-tabs">
            <button
              className={`tab ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              Orders
            </button>
            <button
              className={`tab ${activeTab === "refunds" ? "active" : ""}`}
              onClick={() => setActiveTab("refunds")}
            >
              Returns & Refunds
            </button>
          </div>

          {activeTab === "refunds" && (
            <div className="orders-search-category">
              <input
                type="text"
                placeholder="Search Products or RefundID"
                className="search-input"
              />

              <div className="dropdown-container" ref={dropdownRefs.category}>
                <div
                  className="time-filter"
                  onClick={() =>
                    setOpenDropdown(openDropdown === "category" ? null : "category")
                  }
                >
                  {selectedCategory}
                  <FaChevronDown style={{ marginLeft: "8px" }} />
                </div>
                {openDropdown === "category" && (
                  <ul className="dropdown-list">
                    {categoryOptions.map((option) => (
                      <li
                        key={option}
                        className={selectedCategory === option ? "active-category" : ""}
                        onClick={() => {
                          setSelectedCategory(option);
                          setOpenDropdown(null);
                        }}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Conditional Table */}
        <div className="table-wrap">
          {activeTab === "orders" ? (
            <OrderTable timeFilter={timeFilter} />
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Refund ID</th>
                  <th>Customer</th>
                  <th>Refund Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {refundsData.map((row, i) => (
                  <tr key={i}>
                    <td>{row.item}</td>
                    <td>{row.id}</td>
                    <td>{row.customer}</td>
                    <td>{row.refund}</td>
                    <td
                      style={{
                        color: row.status === "Processed" ? "#10b981" : "#ef4444",
                        fontWeight: "600",
                      }}
                    >
                      {row.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;