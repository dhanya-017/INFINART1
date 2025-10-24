import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const dailyData = [
  { day: "Mon", revenue: 1200, profit: 300, loss: 50 },
  { day: "Tue", revenue: 1800, profit: 500, loss: 80 },
  { day: "Wed", revenue: 1500, profit: 400, loss: 70 },
  { day: "Thu", revenue: 2000, profit: 600, loss: 60 },
  { day: "Fri", revenue: 2200, profit: 700, loss: 100 },
  { day: "Sat", revenue: 2500, profit: 800, loss: 150 },
  { day: "Sun", revenue: 1700, profit: 350, loss: 40 },
];

const gradients = [
  { id: "revenueGradient", colors: ["#12eff3ff", "#a6d6e4ff"] },
  { id: "profitGradient", colors: ["#0fe287ff", "#a6e4d9ff"] },
  { id: "lossGradient", colors: ["#e95a5aff", "#FEE2E2"] },
];

const customColors = {
  revenue: "url(#revenueGradient)",
  profit: "url(#profitGradient)",
  loss: "url(#lossGradient)",
};

const BarChart = () => (
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
      Daily Revenue, Profit & Loss
    </h3>

    <div style={{ height: "400px" }}>
      <ResponsiveBar
        data={dailyData}
        keys={["revenue", "profit", "loss"]}
        indexBy="day"
        margin={{ top: 50, right: 130, bottom: 50, left: 70 }}
        padding={0.35}
        innerPadding={4}
        borderRadius={6}
        enableLabel={false}
        groupMode="grouped"
        colors={({ id }) => customColors[id]}
        axisBottom={{
          tickRotation: 0,
          legend: "Day of Week",
          legendPosition: "middle",
          legendOffset: 36,
        }}
        axisLeft={{
          legend: "Amount (₹)",
          legendPosition: "middle",
          legendOffset: -50,
        }}
        gridYValues={6}
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
          legends: { text: { fill: "#333", fontSize: 13 } },
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            translateX: 120,
            itemsSpacing: 6,
            itemWidth: 100,
            itemHeight: 20,
            symbolSize: 18,
          },
        ]}
        animate
        motionConfig="gentle"
        defs={gradients.map((g) => ({
          id: g.id,
          type: "linearGradient",
          colors: g.colors.map((c, i) => ({ offset: i * 100, color: c })),
        }))}
        fill={Object.keys(customColors).map((key) => ({
          match: { id: key },
          id: `${key}Gradient`,
        }))}
      />
    </div>
  </div>
);

export default BarChart;