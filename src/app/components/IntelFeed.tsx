"use client";
import React from "react";
import { Terminal, Activity } from "lucide-react";
import { CyberThreat } from "@/types/threat";

interface IntelFeedProps {
  threats: CyberThreat[];
  isOpen: boolean;
}

export default function IntelFeed({ threats = [], isOpen }: IntelFeedProps) {
  if (!isOpen) return null;

  return (
    <div style={{ 
      width: '340px', 
      height: '100%', 
      backgroundColor: '#070f1e', 
      borderLeft: '1px solid #1e293b', 
      padding: '20px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '10px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4ade80' }}>
          <Terminal size={16} />
          <span style={{ fontSize: '12px', fontWeight: 'bold' }}>INTEL_STREAM_ACTIVE</span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {threats.length > 0 ? (
          threats.map((t) => (
            <div key={t.id} style={{ 
              padding: '10px', 
              background: 'rgba(2, 6, 23, 0.6)', 
              borderLeft: `2px solid ${t.color}`,
              fontSize: '10px'
            }}>
              <div style={{ color: t.color, fontWeight: 'bold', marginBottom: '4px' }}>
                {t.type.toUpperCase()} // {t.id}
              </div>
              <div style={{ color: '#f8fafc' }}>
                {t.source} <span style={{ color: '#94a3b8' }}>»</span> {t.target}
              </div>
            </div>
          ))
        ) : (
          <div style={{ color: '#94a3b8', fontSize: '10px' }}>LISTENING FOR PACKETS...</div>
        )}
      </div>
    </div>
  );
}