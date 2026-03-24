"use client";
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { ChevronRight, ChevronLeft, ChevronDown, ChevronUp, ShieldCheck, Github, Linkedin, Globe } from "lucide-react";
import IntelFeed from "./components/IntelFeed";
import { getLiveThreats } from "@/services/threat-api";

const TacticalMap = dynamic(() => import('./components/Map'), { ssr: false });

// TYPEWRITER COMPONENT
const Typewriter = ({ text }: { text: string }) => {
  const [currentText, setCurrentText] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setCurrentText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [text]);
  return <span>{currentText}</span>;
};

export default function NexusC4IDashboard() {
  const [mounted, setMounted] = useState(false);
  const [threats, setThreats] = useState<any[]>([]);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isWaveOpen, setWaveOpen] = useState(true);
  const [waves, setWaves] = useState<number[]>([]);

  useEffect(() => {
    setMounted(true);
    const update = () => setThreats(getLiveThreats());
    update();
    const tTimer = setInterval(update, 4000);
    const wTimer = setInterval(() => {
      setWaves(Array.from({ length: 100 }, () => 10 + Math.random() * 90));
    }, 2500);
    return () => { clearInterval(tTimer); clearInterval(wTimer); };
  }, []);

  if (!mounted) return null;

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', backgroundColor: '#020617', color: '#f8fafc', fontFamily: 'monospace', overflow: 'hidden' }}>
      
      {/* HEADER: FULL WIDTH FIX */}
      <header style={{ height: '70px', flexShrink: 0, borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 25px', background: '#070f1e', zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ border: '1px solid #22d3ee', padding: '5px 10px', color: '#22d3ee', fontWeight: 'bold' }}>NC4</div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', letterSpacing: '2px' }}>NEXUS C4I</div>
            <div style={{ fontSize: '10px', color: '#4ade80' }}>
              <Typewriter text="ENGR. SYED SAAD BIN IRFAN // VAA-9 SYSTEM" />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <a href="https://github.com/syedsaad314" target="_blank" style={{ color: '#94a3b8' }}><Github size={20}/></a>
          <a href="#" style={{ color: '#94a3b8' }}><Linkedin size={20}/></a>
          <a href="#" style={{ color: '#94a3b8' }}><Globe size={20}/></a>
          <div style={{ marginLeft: '10px', borderLeft: '1px solid #1e293b', paddingLeft: '20px', color: '#4ade80', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={14} /> SYSTEM OPTIMUM
          </div>
        </div>
      </header>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          
          {/* THE MAP SECTION */}
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            <TacticalMap threats={threats} />
          </div>

          {/* FREQUENCY SECTION */}
          <div style={{ height: isWaveOpen ? '160px' : '45px', flexShrink: 0, background: '#070f1e', borderTop: '1px solid #1e293b', transition: '0.4s' }}>
            <div style={{ height: '45px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 25px' }}>
              <div style={{ display: 'flex', gap: '20px', fontSize: '10px', fontWeight: 'bold' }}>
                <span style={{ color: '#ef4444' }}>● WEB ATTACKERS</span>
                <span style={{ color: '#22d3ee' }}>● INTRUDERS</span>
              </div>
              <button onClick={() => setWaveOpen(!isWaveOpen)} style={{ background: 'none', border: 'none', color: '#22d3ee', fontSize: '10px', cursor: 'pointer' }}>
                {isWaveOpen ? 'COLLAPSE' : 'EXPAND'} {isWaveOpen ? <ChevronDown size={14}/> : <ChevronUp size={14}/>}
              </button>
            </div>
            {isWaveOpen && (
              <div style={{ height: '115px', display: 'flex', alignItems: 'flex-end', gap: '2px', padding: '0 25px 15px 25px' }}>
                {waves.map((h, i) => (
                  <div key={i} style={{ flex: 1, backgroundColor: i % 12 === 0 ? '#ef4444' : '#22d3ee', height: `${h}%`, opacity: 0.6, transition: 'height 1s' }} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* SIDEBAR SECTION */}
        <aside style={{ width: isSidebarOpen ? '380px' : '0px', flexShrink: 0, background: '#070f1e', borderLeft: '1px solid #1e293b', transition: '0.4s', position: 'relative' }}>
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} style={{ position: 'absolute', left: '-30px', top: '20px', background: '#070f1e', border: '1px solid #1e293b', color: '#22d3ee', width: '30px', height: '30px' }}>
            {isSidebarOpen ? <ChevronRight size={18}/> : <ChevronLeft size={18}/>}
          </button>
          <div style={{ width: '380px', height: '100%' }}>
            <IntelFeed threats={threats} isOpen={isSidebarOpen} />
          </div>
        </aside>
      </div>
    </div>
  );
}