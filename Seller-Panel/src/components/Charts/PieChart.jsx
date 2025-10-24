import React from "react";
import { ResponsivePie } from "@nivo/pie";

const SalesCategoryPie = ({ categoryData }) => (
  <div
    style={{
      backgroundColor: "#e6fdf8",
      border: "1.5px solid #20BFA5",
      borderRadius: "14px",
      boxShadow: "0 4px 10px rgba(32, 191, 165, 0.25)",
      padding: "20px",
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <div style={{ width: "100%", height: "300px" }}>
      <ResponsivePie
        data={categoryData}
        margin={{ top: 20, right: 40, bottom: 20, left: 40 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={(d) => d.data.color}
        borderWidth={1}
        borderColor={(d) => `${d.data.color}88`}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={(d) => d.data.color}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor="#fff"
        tooltip={({ datum }) => (
          <div
            style={{
              padding: "6px 10px",
              background: "#fff",
              border: "1px solid #ddd",
              borderRadius: "6px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
            }}
          >
            <strong>{datum.id}</strong>: {datum.value} sales
          </div>
        )}
      />
    </div>
  </div>
);

export default SalesCategoryPie;