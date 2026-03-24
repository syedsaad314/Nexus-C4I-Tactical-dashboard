"use client";
import React, { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker, Graticule, Annotation } from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function TacticalMap({ threats }: { threats: any[] }) {
  const [tooltip, setTooltip] = useState("");

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {/* THE DYNAMIC HOVER LABEL */}
      {tooltip && (
        <div style={{
          position: 'absolute', top: '10px', left: '10px', pointerEvents: 'none',
          backgroundColor: 'rgba(7, 15, 30, 0.9)', color: '#22d3ee',
          padding: '5px 12px', border: '1px solid #22d3ee', fontSize: '10px',
          fontWeight: 'bold', zIndex: 50, fontFamily: 'monospace'
        }}>
          TARGET_LOC // {tooltip.toUpperCase()}
        </div>
      )}

      <ComposableMap 
        projectionConfig={{ scale: 230, center: [0, 15] }} 
        style={{ width: "100%", height: "100%" }}
      >
        <Graticule stroke="#1e293b" strokeWidth={0.3} />
        
        <Geographies geography={GEO_URL}>
          {({ geographies }) => geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              onMouseEnter={() => setTooltip(geo.properties.name)}
              onMouseLeave={() => setTooltip("")}
              style={{
                default: { fill: "#070f1e", stroke: "#1e293b", strokeWidth: 0.5, outline: "none" },
                hover: { fill: "#111d35", stroke: "#22d3ee", strokeWidth: 1, outline: "none", cursor: 'crosshair' }
              }}
            />
          ))}
        </Geographies>

        {threats?.map((t, i) => (
          <Marker key={i} coordinates={t.t_coord}>
            <circle r={3} fill={t.color}>
               <animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite" />
            </circle>
            <circle r={10} fill={t.color} opacity={0.3}>
              <animate attributeName="r" from="2" to="20" dur="1.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.6" to="0" dur="1.5s" repeatCount="indefinite" />
            </circle>
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
}