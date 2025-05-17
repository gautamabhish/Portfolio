// @ts-nocheck
import React from "react";

// Generic reusable component for stats section
const HeroStatsMiddleSection = ({ data, platform, color }) => {
  const totalContributions = data.overallScore;
  const currentRank = data.ranking.rank;
  const totalPlayers = data.ranking.totalPlayers;

  return (
    <div
      style={{
        backgroundColor: color || "#1e293b",
        borderRadius: "10px",
        padding: "20px",
        color: "white",
        maxWidth: "600px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        margin: "1rem auto",
      }}
    >
      <h2 style={{ marginBottom: "1rem", textAlign: "center" }}>
        {platform} Stats
      </h2>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* Total Contributions */}
        <div style={{ textAlign: "center", flex: 1 }}>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "28px",
              color: "#2dd4bf",
            }}
          >
            {totalContributions}
          </div>
          <div style={{ fontSize: "14px", color: "#94a3b8" }}>
            Total Contributions
          </div>
          <div
            style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}
          >
            Present
          </div>
        </div>

        {/* Vertical Divider */}
        <div
          style={{
            width: "1px",
            backgroundColor: "#334155",
            margin: "0 20px",
          }}
        />

        {/* Current Rank */}
        <div style={{ textAlign: "center", flex: 1 }}>
          <div
            style={{
              border: "2px solid #2dd4bf",
              borderRadius: "50%",
              width: "70px",
              height: "70px",
              margin: "0 auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
              fontSize: "24px",
              color: "#2dd4bf",
            }}
          >
            {currentRank}
          </div>
          <div style={{ fontSize: "14px", color: "#94a3b8", marginTop: "6px" }}>
            Current Score
          </div>
          <div style={{ fontSize: "12px", color: "#64748b" ,fontFamily:"Roboto"}}>
            provided by &copy;codeON
          </div>
        </div>

        {/* Vertical Divider */}
        <div
          style={{
            width: "1px",
            backgroundColor: "#334155",
            margin: "0 20px",
          }}
        />

        {/* Player Score */}
        <div style={{ textAlign: "center", flex: 1 }}>
          <a href={data.link} target="_blank" rel="noopener noreferrer">
            <img src={data.qrCode} alt="qr" />
          </a>
          <div style={{ fontSize: "14px", color: "#94a3b8" }}>Visit Profile</div>
          <div style={{ fontSize: "12px", color: "#64748b" }}>&nbsp;</div>
        </div>
      </div>
    </div>
  );
};

// GitHubStats component - accepts data as prop
export const GitHubStats = ({ data }) => {
  return (
    <HeroStatsMiddleSection
      data={{...data,link:"https://github.com/gautamabhish"}}
      platform="GitHub"
      color="rgb(96, 0, 119,0.6)" // optional color override
    />
  );
};

// LeetCodeStats component - accepts data as prop
export const LeetCodeStats = ({ data }) => {
  return (
    <HeroStatsMiddleSection
      data={{...data,link:"https://leetcode.com/uUTmPQg4t3/"}}
      platform="LeetCode"
      color="rgb(96, 0, 119,0.6)" // optional color override
    />
  );
};
