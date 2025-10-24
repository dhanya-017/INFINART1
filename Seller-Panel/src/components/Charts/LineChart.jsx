import React from "react";
import { ResponsiveLine } from "@nivo/line";

const monthlyData = [
  {
    id: "Revenue",
    color: "#16A34A",
    data: [
      { x: "Jan", y: 50000 }, { x: "Feb", y: 42000 }, { x: "Mar", y: 58000 },
      { x: "Apr", y: 62000 }, { x: "May", y: 70000 }, { x: "Jun", y: 65000 },
      { x: "Jul", y: 72000 }, { x: "Aug", y: 68000 }, { x: "Sep", y: 75000 },
      { x: "Oct", y: 80000 }, { x: "Nov", y: 85000 }, { x: "Dec", y: 90000 },
    ],
  },
  {
    id: "Profit",
    color: "#0EA5E9",
    data: [
      { x: "Jan", y: 12000 }, { x: "Feb", y: 9000 }, { x: "Mar", y: 15000 },
      { x: "Apr", y: 18000 }, { x: "May", y: 22000 }, { x: "Jun", y: 20000 },
      { x: "Jul", y: 23000 }, { x: "Aug", y: 21000 }, { x: "Sep", y: 25000 },
      { x: "Oct", y: 27000 }, { x: "Nov", y: 30000 }, { x: "Dec", y: 32000 },
    ],
  },
  {
    id: "Loss",
    color: "#DC2626",
    data: [
      { x: "Jan", y: 3000 }, { x: "Feb", y: 4000 }, { x: "Mar", y: 2000 },
      { x: "Apr", y: 1500 }, { x: "May", y: 1200 }, { x: "Jun", y: 1800 },
      { x: "Jul", y: 1600 }, { x: "Aug", y: 1400 }, { x: "Sep", y: 1200 },
      { x: "Oct", y: 1000 }, { x: "Nov", y: 1100 }, { x: "Dec", y: 900 },
    ],
  },
];

const LineChart = () => (
  <div
    style={{
      backgroundColor: "#fff",
      borderRadius: "16px",
      padding: "20px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
    }}
  >
    <h3
      style={{
        textAlign: "center",
        color: "#20BFA5",
        marginBottom: "20px",
        fontWeight: 600,
      }}
    >
      Monthly Revenue, Profit & Loss
    </h3>

    <div style={{ height: "400px" }}>
      <ResponsiveLine
        data={monthlyData}
        margin={{ top: 50, right: 120, bottom: 50, left: 70 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", min: "auto", max: "auto", stacked: false }}
        axisBottom={{
          tickRotation: -15,
          legend: "Month",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          legend: "Amount (₹)",
          legendOffset: -50,
          legendPosition: "middle",
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh
        curve="monotoneX"
        colors={{ datum: "color" }}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            translateX: 100,
            itemsSpacing: 6,
            itemWidth: 80,
            itemHeight: 20,
            symbolSize: 14,
            symbolShape: "circle",
          },
        ]}
        theme={{
          axis: {
            ticks: { text: { fill: "#555", fontSize: 12 } },
            legend: { text: { fill: "#444", fontWeight: 600 } },
          },
          grid: { line: { stroke: "#eaeaea", strokeWidth: 1 } },
          tooltip: {
            container: {
              background: "#fff",
              color: "#111",
              fontSize: 14,
              borderRadius: "6px",
              boxShadow: "0 3px 8px rgba(0,0,0,0.12)",
              padding: "8px 12px",
            },
          },
        }}
      />
    </div>
  </div>
);

export default LineChart;