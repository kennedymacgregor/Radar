import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  Target, 
  Database, 
  Table, 
  Sparkles, 
  Link as LinkIcon,
  Settings,
  ChevronRight,
  ChevronDown,
  Globe,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Plus,
  RefreshCw,
  Search,
  Bell,
  X,
  Loader2,
  MessageSquare,
  Maximize2,
  Pencil,
  ArrowUp,
  TrendingUp,
  List,
  ListChecks,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface IssueItem {
  id: string;
  description: string;
}

interface IssueRowProps {
  icon: React.ReactNode;
  label: string;
  count: string;
  color: 'red' | 'orange' | 'green';
  isExpanded?: boolean;
  onClick?: () => void;
  items?: IssueItem[];
}

// --- Components ---

const Sidebar = () => {
  const icons = [
    { icon: <LayoutDashboard size={20} />, active: false },
    { icon: <Target size={20} />, active: true },
    { icon: <Database size={20} />, active: false },
    { icon: <Table size={20} />, active: false },
    { icon: <Sparkles size={20} />, active: false },
    { icon: <LinkIcon size={20} />, active: false },
  ];

  return (
    <aside className="w-16 bg-[#f0f0ee] border-r border-[#e8e8e5] flex flex-col items-center py-6 gap-6 h-screen sticky top-0">
      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white mb-4">
        <div className="w-5 h-5 border-2 border-white rotate-45" />
      </div>
      {icons.map((item, i) => (
        <button
          key={i}
          className={`p-2 rounded-lg transition-colors ${
            item.active 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-[#6b6b6b] hover:bg-white/50'
          }`}
        >
          {item.icon}
        </button>
      ))}
      <div className="mt-auto">
        <button className="p-2 text-[#6b6b6b] hover:bg-white/50 rounded-lg">
          <Settings size={20} />
        </button>
      </div>
    </aside>
  );
};

const TopNav = () => {
  const tabs = [
    { name: 'Overview', hasChevron: false },
    { name: 'Radar', hasChevron: false },
    { name: 'Data Model', hasChevron: true },
    { name: 'Tables', hasChevron: true },
    { name: 'Enrichment', hasChevron: false },
    { name: 'Connectors', hasChevron: true }
  ];
  
  return (
    <header className="bg-white border-b border-[#e8e8e5] px-6 py-1.5 flex items-center justify-between w-full">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 font-semibold text-[#2563eb] text-sm">
          <div className="w-7 h-7 bg-[#dbeafe] rounded flex items-center justify-center text-[#2563eb]">
            <div className="grid grid-cols-2 gap-0.5">
              <div className="w-1.5 h-1.5 bg-[#2563eb] rounded-sm" />
              <div className="w-1.5 h-1.5 bg-[#2563eb] rounded-sm" />
              <div className="w-1.5 h-1.5 bg-[#2563eb] rounded-sm" />
              <div className="w-1.5 h-1.5 bg-[#2563eb] rounded-sm" />
            </div>
          </div>
          Data Hub
        </div>
        
        <nav className="flex items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 transition-all ${
                tab.name === 'Radar'
                  ? 'bg-[#eff6ff] text-[#2563eb]'
                  : 'text-[#6b6b6b] hover:text-[#1a1a1a] hover:bg-[#f5f5f3]'
              }`}
            >
              {tab.name}
              {tab.hasChevron && <ChevronDown size={14} className="opacity-50" />}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

const SubNav = ({ activeTab, onTabChange }: { activeTab: 'radar' | 'inbox', onTabChange: (tab: 'radar' | 'inbox') => void }) => {
  return (
    <div className="px-6 py-2 border-b border-[#e8e8e5] flex items-center justify-between w-full bg-white">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-sm font-medium text-[#1a1a1a] cursor-pointer hover:bg-[#f5f5f3] px-2 py-1 rounded-lg transition-colors">
          <div className="w-6 h-6 bg-[#fce7f3] rounded flex items-center justify-center p-0.5">
            <div className="w-full h-full bg-[#2563eb] rounded-sm flex items-center justify-center text-white">
              <Globe size={12} />
            </div>
          </div>
          All motions
        </div>
        
        <div className="w-px h-4 bg-[#e8e8e5]" />
        
        <div className="flex items-center gap-1 bg-[#f5f5f3] p-1 rounded-xl border border-[#e8e8e5]">
          <button 
            onClick={() => onTabChange('radar')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'radar' ? 'bg-white text-[#1a1a1a] shadow-sm' : 'text-[#6b6b6b] hover:text-[#1a1a1a]'}`}
          >
            Radar
          </button>
          <button 
            onClick={() => onTabChange('inbox')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'inbox' ? 'bg-white text-[#1a1a1a] shadow-sm' : 'text-[#6b6b6b] hover:text-[#1a1a1a]'}`}
          >
            Inbox
            <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">3</span>
          </button>
        </div>

        <div className="w-px h-4 bg-[#e8e8e5]" />
        
        <div className="flex items-center gap-2 text-sm font-medium text-[#1a1a1a] cursor-pointer hover:bg-[#f5f5f3] px-2 py-1 rounded-lg transition-colors">
          <Calendar size={16} className="text-[#6b6b6b]" />
          All time
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-[#6b6b6b]">Filters</span>
        
        <button className="flex items-center gap-1.5 px-3 py-1 border border-dashed border-[#cbd5e1] rounded-lg text-sm font-medium text-[#1a1a1a] hover:bg-[#f8fafc] transition-colors">
          <div className="w-4 h-4 rounded-full bg-[#64748b] flex items-center justify-center text-white">
            <Plus size={10} strokeWidth={3} />
          </div>
          Event Types
        </button>

        <button className="flex items-center gap-1.5 px-3 py-1 border border-dashed border-[#cbd5e1] rounded-lg text-sm font-medium text-[#1a1a1a] hover:bg-[#f8fafc] transition-colors">
          <div className="w-4 h-4 rounded-full bg-[#64748b] flex items-center justify-center text-white">
            <Plus size={10} strokeWidth={3} />
          </div>
          Sources
        </button>
      </div>
    </div>
  );
};

const BowtieFunnel = () => {
  const vW = 1200, vH = 200;
  const pad = 30;         // x where diagonal line meets corner arc
  const cr = 15;          // outer corner radius
  const tY = 15;          // top y at outer edges
  const bY = 185;         // bottom y at outer edges
  const narrowTop = 70;   // top y at centre (narrowest point)
  const narrowBot = 130;  // bottom y at centre
  const cy = vH / 2;      // 100

  const N = 7;
  const innerW = vW - 2 * pad; // 1140
  // 8 x-positions (including outer edges) for dividers
  const divXs = Array.from({ length: N + 1 }, (_, i) => pad + (innerW * i) / N);

  // The Closing section (index 3–4) forms a flat rectangle at the narrowest point
  const xLeft  = divXs[3]; // left boundary of Closing  ≈ 518.6
  const xRight = divXs[4]; // right boundary of Closing ≈ 681.4

  // y bounds for divider lines — flat in the Closing section, diagonal elsewhere
  const getBounds = (x: number) => {
    if (x <= xLeft) {
      const frac = (x - pad) / (xLeft - pad);
      return { yTop: tY + (narrowTop - tY) * frac, yBottom: bY - (bY - narrowBot) * frac };
    } else if (x <= xRight) {
      return { yTop: narrowTop, yBottom: narrowBot };
    } else {
      const frac = (x - xRight) / (vW - pad - xRight);
      return { yTop: narrowTop + (tY - narrowTop) * frac, yBottom: narrowBot + (bY - narrowBot) * frac };
    }
  };

  // Pills at outer edges sit on the actual vertical left/right edge of the shape
  const pillXs = divXs.map((x, i) => {
    if (i === 0) return pad - cr;      // left vertical edge at x=15
    if (i === N) return vW - pad + cr; // right vertical edge at x=1185
    return x;
  });

  const stages = ['Awareness', 'Education', 'Selection', 'Closing', 'Onboarding', 'Retention', 'Expansion'];

  const dividers = [
    { pills: [{ val: '108', color: 'red' }, { val: '32', color: 'orange' }] },
    { pills: [{ val: '12', color: 'red' }, { val: '23', color: 'orange' }] },
    { pills: [{ val: '4', color: 'red' }, { val: '45', color: 'orange' }] },
    { pills: [{ val: '38', color: 'orange' }] },
    { pills: [{ val: '3', color: 'orange' }] },
    { pills: [{ val: '1', color: 'orange' }] },
    { pills: [{ val: '5', color: 'red' }] },
    { pills: [{ val: '4', color: 'red' }] },
  ];

  const pillColors = {
    red:    { bg: '#fee2e2', text: '#dc2626' },
    orange: { bg: '#fff7ed', text: '#ea580c' },
  };

  const pillH = 22;
  const pillW = (val: string) => val.length === 1 ? 28 : val.length === 2 ? 36 : 44;

  // Straight diagonal edges → flat Closing rectangle → rounded outer corners only
  const path = [
    `M ${pad},${tY}`,
    `L ${xLeft},${narrowTop}`,
    `L ${xRight},${narrowTop}`,
    `L ${vW - pad},${tY}`,
    `A ${cr} ${cr} 0 0 1 ${vW - pad + cr},${tY + cr}`,
    `L ${vW - pad + cr},${bY - cr}`,
    `A ${cr} ${cr} 0 0 1 ${vW - pad},${bY}`,
    `L ${xRight},${narrowBot}`,
    `L ${xLeft},${narrowBot}`,
    `L ${pad},${bY}`,
    `A ${cr} ${cr} 0 0 1 ${pad - cr},${bY - cr}`,
    `L ${pad - cr},${tY + cr}`,
    `A ${cr} ${cr} 0 0 1 ${pad},${tY} Z`,
  ].join(' ');

  return (
    <div className="relative w-full h-full bg-white">
      {/* Layer 1: bowtie shape + internal divider lines (stretched to fill width) */}
      <svg viewBox={`0 0 ${vW} ${vH}`} className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <path d={path} fill="white" stroke="#e8e8e5" strokeWidth="1.5" />
        {divXs.slice(1, -1).map((x, i) => {
          const { yTop, yBottom } = getBounds(x);
          return <line key={i} x1={x} y1={yTop} x2={x} y2={yBottom} stroke="#e8e8e5" strokeWidth="1.5" />;
        })}
      </svg>

      {/* Layer 2: pills + stage labels — overflow visible so edge pills aren't clipped */}
      <svg viewBox={`0 0 ${vW} ${vH}`} className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet" overflow="visible">
        {stages.map((label, i) => (
          <text
            key={i}
            x={(divXs[i] + divXs[i + 1]) / 2}
            y={cy + 5}
            textAnchor="middle"
            fill="#94a3b8"
            fontSize="13"
            fontWeight="500"
          >
            {label}
          </text>
        ))}

        {dividers.map((div, i) => {
          const x = pillXs[i];
          return (
            <g key={i}>
              {div.pills.map((pill, pIdx) => {
                const colors = pillColors[pill.color as keyof typeof pillColors];
                const w = pillW(pill.val);
                const pillCy = div.pills.length === 1 ? cy : pIdx === 0 ? cy - 17 : cy + 17;
                return (
                  <g key={pIdx} transform={`translate(${x - w / 2}, ${pillCy - pillH / 2})`}>
                    <rect width={w} height={pillH} rx="6" fill={colors.bg} />
                    <text x={w / 2} y={pillH / 2 + 4} textAnchor="middle" fill={colors.text} fontSize="12" fontWeight="600">
                      {pill.val}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const StackedBlockChart = () => {
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const rows = 7;

  const [hoveredCol, setHoveredCol] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // [unprocessed, incomplete] — total drives heatmap intensity
  // Wider bell curve: Mar/Apr/May all elevated, gentler falloff
  const data = useMemo<[number, number][]>(() => [
    // JAN - tiny
    [0, 1], [0, 1], [1, 1], [0, 1],
    // FEB - small
    [1, 2], [1, 2], [1, 3], [1, 2],
    // MAR - rising
    [3, 5], [3, 6], [4, 6], [4, 7],
    // APR - peak (flatter, not as extreme)
    [5, 7], [5, 8], [5, 7], [5, 8],
    // MAY - similar to APR
    [4, 7], [4, 6], [4, 6], [3, 6],
    // JUN - gradual decline
    [3, 5], [3, 4], [3, 4], [2, 4],
    // JUL
    [2, 3], [2, 3], [1, 3], [1, 3],
    // AUG
    [1, 2], [1, 2], [1, 2], [1, 1],
    // SEP
    [1, 1], [1, 1], [1, 1], [1, 1],
    // OCT
    [0, 1], [1, 1], [0, 1], [0, 1],
    // NOV - tiny
    [0, 1], [0, 1], [0, 1], [0, 1],
    // DEC - tiny
    [0, 1], [0, 1], [0, 1], [0, 1],
  ], []);

  const maxTotal = 17;

  // Seeded pseudo-random so the pattern is stable
  const seededRand = (seed: number) => {
    const x = Math.sin(seed + 1) * 10000;
    return x - Math.floor(x);
  };

  // Per-cell color: gradient-weighted by column intensity with scatter
  const getCellColor = (colIdx: number, rowIdx: number, total: number): string => {
    const intensity = total / maxTotal;
    const r1 = seededRand(colIdx * 31 + rowIdx * 17);
    const r2 = seededRand(colIdx * 31 + rowIdx * 17 + 500);
    // Colour ~95% of cells at peak, fewer in quiet months
    if (r1 > intensity * 0.95) return '#f3f4f6';
    // Scatter: randomly replace ~18% of cells with grey or light red
    const r3 = seededRand(colIdx * 31 + rowIdx * 17 + 999);
    if (r3 < 0.12) return '#f3f4f6';
    if (r3 < 0.18) return '#fde8d0';
    const shade = intensity * 0.65 + r2 * 0.35;
    if (shade < 0.20) return '#fde8d0';
    if (shade < 0.40) return '#fb923c';
    if (shade < 0.58) return '#ea580c';
    if (shade < 0.94) return '#b91c1c';
    return '#7c2d12';
  };

  const handleMouseMove = (e: React.MouseEvent, colIndex: number) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    setHoveredCol(colIndex);
  };

  return (
    <div className="w-full relative">
        <div className="flex-1 min-w-0">
          <div className="relative flex gap-[2px]">
            {/* Data Blocks */}
            {data.map((counts, colIdx) => {
              const total = counts[0] + counts[1];
              return (
              <div
                key={colIdx}
                className="flex-1 flex flex-col gap-[2px] relative cursor-crosshair"
                onMouseMove={(e) => handleMouseMove(e, colIdx)}
                onMouseLeave={() => setHoveredCol(null)}
              >
                {Array.from({ length: rows }).map((_, rowIdx) => (
                    <div
                      key={rowIdx}
                      className={`w-full aspect-square rounded-[3px] transition-colors duration-200 ${hoveredCol === colIdx ? 'opacity-75' : ''}`}
                      style={{ backgroundColor: getCellColor(colIdx, rowIdx, total) }}
                    />
                ))}
              </div>
              );
            })}

            {/* Tooltip */}
            <AnimatePresence>
              {hoveredCol !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  style={{
                    position: 'fixed',
                    left: mousePos.x + 20,
                    top: mousePos.y - 80,
                    zIndex: 100
                  }}
                  className="bg-white border border-[#e8e8e5] rounded-xl shadow-xl p-4 min-w-[160px] pointer-events-none"
                >
                  <p className="text-[11px] font-bold text-[#6b6b6b] mb-3">
                    {months[Math.floor(hoveredCol / 4)]} 2025
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#ea580c]" />
                        <span className="text-[11px] text-[#6b6b6b]">Incomplete</span>
                      </div>
                      <span className="text-[11px] font-bold text-[#1a1a1a]">{data[hoveredCol][1] * 3}k</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#dc2626]" />
                        <span className="text-[11px] text-[#6b6b6b]">Unprocessed</span>
                      </div>
                      <span className="text-[11px] font-bold text-[#1a1a1a]">{data[hoveredCol][0] * 3}k</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* X-Axis Labels */}
          <div className="flex justify-between mt-1">
            {months.map((month) => (
              <span key={month} className="text-[9px] font-normal text-[#9ca3af]">
                {month}
              </span>
            ))}
          </div>
        </div>
    </div>
  );
};

const TimelineVisualization = () => {
  return <StackedBlockChart />;
};

const DataHealthCard = () => {
  const [activeTab, setActiveTab] = React.useState<'bowtie' | 'timeline'>('bowtie');

  return (
    <div className="bg-white rounded-xl border border-[#e8e8e5] shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle cx="24" cy="24" r="20" fill="none" stroke="#f5f5f3" strokeWidth="4" />
              <circle cx="24" cy="24" r="20" fill="none" stroke="url(#greenGradient)" strokeWidth="4" strokeDasharray="125.6" strokeDashoffset="2.5" />
              <defs>
                <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#16a34a" />
                  <stop offset="100%" stopColor="#4ade80" />
                </linearGradient>
              </defs>
            </svg>
            <span className="absolute text-xs font-bold text-[#1a1a1a]">98</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#1a1a1a]">Data Health</h2>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#f5f5f3] p-1 rounded-lg border border-[#e8e8e5]">
            <button 
              onClick={() => setActiveTab('bowtie')}
              className={`px-3 py-1 text-xs font-medium rounded transition-all ${activeTab === 'bowtie' ? 'bg-white text-[#1a1a1a]' : 'text-[#6b6b6b] hover:text-[#1a1a1a]'}`}
            >
              Bowtie
            </button>
            <button 
              onClick={() => setActiveTab('timeline')}
              className={`px-3 py-1 text-xs font-medium rounded transition-all ${activeTab === 'timeline' ? 'bg-white text-[#1a1a1a]' : 'text-[#6b6b6b] hover:text-[#1a1a1a]'}`}
            >
              Timeline
            </button>
          </div>
        </div>
      </div>

      <div className="h-44">
        {activeTab === 'bowtie' ? <BowtieFunnel /> : <TimelineVisualization />}
      </div>

      <div className="mt-4 flex items-center min-h-[24px]">
        {activeTab === 'bowtie' ? (
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#dc2626]" />
              <span className="text-xs text-[#6b6b6b]">Unprocessed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#ea580c]" />
              <span className="text-xs text-[#6b6b6b]">Incomplete</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-medium text-[#6b6b6b]">Less issues</span>
            {['#f3f4f6', '#fde8d0', '#fb923c', '#ea580c', '#b91c1c', '#7c2d12'].map((color, i) => (
              <div key={i} className="w-3 h-3 rounded-[2px]" style={{ backgroundColor: color }} />
            ))}
            <span className="text-[10px] font-medium text-[#6b6b6b]">More issues</span>
          </div>
        )}
      </div>
    </div>
  );
};

const IssueRow = ({ icon, label, count, color, isExpanded, onClick, items = [], onStartFixing }: IssueRowProps & { onStartFixing?: () => void }) => {
  const colorClasses = {
    red: 'text-[#dc2626] bg-red-50',
    orange: 'text-[#f59e0b] bg-orange-50',
    green: 'text-[#16a34a] bg-green-50'
  };

  const pillClasses = {
    red: 'bg-[#dc2626] text-white',
    orange: 'bg-[#f59e0b] text-white',
    green: 'bg-[#16a34a] text-white'
  };

  return (
    <div className="bg-white rounded-xl border border-[#e8e8e5] shadow-sm overflow-hidden relative">
      <div 
        onClick={onClick}
        className="px-6 py-5 cursor-pointer flex items-center justify-between hover:bg-[#fcfcfb] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`p-1.5 rounded-lg ${colorClasses[color]}`}>
            {icon}
          </div>
          <span className="text-sm font-medium text-[#1a1a1a]">{label}</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${pillClasses[color]}`}>
            {count}
          </span>
        </div>
        <ChevronRight size={18} className={`text-[#1E293B] transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
      </div>

      <AnimatePresence>
        {isExpanded && items.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-[#e8e8e5]"
          >
            <div className="px-6 pb-8 pt-6 space-y-6">
              {/* Special view for Auto-fixed */}
              {label === 'Auto-fixed' ? (
                <div className="space-y-8">
                  {Array.from(new Set(items.map((i: any) => i.timestamp))).map((timestamp) => (
                    <div key={timestamp as string}>
                      <div className="mb-4">
                        <span className="text-xs font-bold text-[#1a1a1a]">{timestamp as string}</span>
                      </div>
                      <div className="space-y-3">
                        {items.filter((i: any) => i.timestamp === timestamp).map((item: any) => (
                          <div key={item.id} className="p-4 bg-white border border-[#e8e8e5] rounded-xl flex items-center justify-between shadow-sm hover:border-green-200 transition-colors">
                            <div className="flex items-center gap-4">
                              <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center">
                                <CheckCircle2 size={12} className="text-green-600" />
                              </div>
                              <span className="text-sm text-[#1a1a1a]">{item.description}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button className="w-full py-3 border border-[#e8e8e5] text-[#1a1a1a] bg-[#fcfcfb] rounded-xl text-xs font-bold hover:bg-[#f5f5f3] transition-all shadow-sm flex items-center justify-center">
                    View all reports
                  </button>
                </div>
              ) : (
                <>
                  {/* Fix Next Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs font-bold text-[#1a1a1a]">Fix Next</span>
                      <span className="px-2 py-0.5 border border-[#e8e8e5] rounded text-[9px] font-bold text-[#6b6b6b] uppercase tracking-wider">Recommended</span>
                    </div>
                    <div className="p-4 bg-white border border-[#e8e8e5] rounded-xl flex items-center justify-between shadow-sm hover:border-blue-200 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-5 h-5 rounded-full border-2 border-[#e8e8e5]" />
                        <span className="text-sm text-[#1a1a1a]">{items[0].description}</span>
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); onStartFixing?.(); }}
                        className="px-4 py-1.5 border border-[#e8e8e5] text-[#1a1a1a] rounded-lg text-xs font-bold hover:bg-[#f5f5f3] transition-colors"
                      >
                        Start fixing
                      </button>
                    </div>
                  </div>

                  {/* All Items Section */}
                  {items.length > 1 && (
                    <div>
                      <div className="mb-4">
                        <h4 className="text-xs font-bold text-[#6b6b6b]">All {label}</h4>
                      </div>
                      <div className="space-y-3">
                        {items.slice(1).map((item) => (
                          <div key={item.id} className="p-4 bg-white border border-[#e8e8e5] rounded-xl flex items-center justify-between shadow-sm hover:border-blue-200 transition-colors">
                            <div className="flex items-center gap-4">
                              <div className="w-5 h-5 rounded-full border-2 border-[#e8e8e5]" />
                              <span className="text-sm text-[#1a1a1a]">{item.description}</span>
                            </div>
                            <button 
                              onClick={(e) => { e.stopPropagation(); onStartFixing?.(); }}
                              className="px-4 py-1.5 border border-[#e8e8e5] text-[#1a1a1a] rounded-lg text-xs font-bold hover:bg-[#f5f5f3] transition-colors"
                            >
                              Start fixing
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DataMedicCard = ({ title = "Data Medic", description = "Your data health is looking strong, but there are a few critical issues in the funnel that need attention to ensure accurate attribution.", items: initialItems = ["Missing channel data for 124 events in Awareness stage.", "Incomplete attribution mapping for 57 closing deals."] }) => {
  const [items, setItems] = useState(initialItems.map((text, id) => ({ id, text, status: 'idle' as 'idle' | 'loading' | 'fixed' })));

  const handleAutoFix = async (id: number) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, status: 'loading' } : item));
    
    // Simulate fixing process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setItems(prev => prev.map(item => item.id === id ? { ...item, status: 'fixed' } : item));
    
    // Wait a bit in fixed state before removing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="m-4 bg-white rounded-xl border border-[#e8e8e5] shadow-lg overflow-hidden transform transition-transform hover:scale-[1.01]">
      <div className="p-5">
        <div className="flex items-center gap-2 mb-1">
          <Plus size={18} className="text-[#dc2626]" strokeWidth={3} />
          <h3 className="font-bold text-[#1a1a1a]">{title}</h3>
        </div>
        <p className="text-sm text-[#6b6b6b] mb-4">
          {description}
        </p>
        
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex items-center justify-between p-4 bg-white rounded-xl border border-[#e8e8e5] shadow-sm hover:border-blue-200 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {item.status === 'fixed' ? (
                    <CheckCircle2 size={16} className="text-green-600" />
                  ) : (
                    <CheckCircle2 size={16} className="text-[#6b6b6b]" />
                  )}
                  <span className={`text-sm text-[#1a1a1a] ${item.status === 'fixed' ? 'line-through text-[#6b6b6b]' : ''}`}>
                    {item.text}
                  </span>
                </div>
                <button 
                  onClick={() => item.status === 'idle' && handleAutoFix(item.id)}
                  disabled={item.status !== 'idle'}
                  className={`px-4 py-1.5 border border-[#e8e8e5] rounded-lg text-xs font-bold transition-all flex items-center gap-2 min-w-[80px] justify-center ${
                    item.status === 'loading' ? 'bg-[#f5f5f3] text-[#6b6b6b]' : 
                    item.status === 'fixed' ? 'bg-green-50 text-green-600 border-green-100' : 
                    'text-[#1a1a1a] hover:bg-[#f5f5f3]'
                  }`}
                >
                  {item.status === 'loading' ? (
                    <>
                      <Loader2 size={12} className="animate-spin" />
                      Fixing...
                    </>
                  ) : item.status === 'fixed' ? (
                    'Fixed'
                  ) : (
                    'Auto-fix'
                  )}
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          {items.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-4 text-center text-sm text-[#6b6b6b]"
            >
              All recommendations applied!
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

const CircularScore = ({ score, size = 32 }: { score: number, size?: number }) => {
  const radius = (size - 4) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  
  const getColor = (s: number) => {
    if (s >= 90) return '#16a34a';
    if (s >= 50) return '#f59e0b';
    return '#dc2626';
  };

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e8e8e5"
          strokeWidth="2.5"
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor(score)}
          strokeWidth="2.5"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-[10px] font-bold text-[#1a1a1a]">{score}</span>
    </div>
  );
};

const DataMedicSummaryCard = ({ onExpand, onApproveComplete, onStepComplete }: { onExpand: () => void, onApproveComplete: () => void, onStepComplete: (step: DataMedicPlanStep) => void }) => {
  const [plans, setPlans] = useState([
    {
      id: 'channel',
      title: "Channel Mapping Plan",
      steps: [
        { id: 1, title: "Fix Channel Mapping", count: "12 Events", desc: "Map HubSpot 'Original Traffic Source' to Vasco Channels", confidence: 'high' as const },
        { id: 2, title: "Resolve Motion Gaps", count: "123 Events", desc: "Identify unrouted events in 'Self-Serve' vs 'Sales-Led' motions", confidence: 'medium' as const },
      ]
    },
    {
      id: 'attribution',
      title: "Attribution Recovery Plan",
      steps: [
        { id: 1, title: "Attribution Recovery", count: "45 Events", desc: "Recover 15% of unattributed revenue by linking anonymous sessions", confidence: 'low' as const },
        { id: 2, title: "CRM Sync Audit", count: "57 Events", desc: "Audit 57 closing deals with missing attribution touchpoints", confidence: 'high' as const },
      ]
    }
  ]);

  const handlePlanComplete = (planId: string) => {
    setPlans(prev => prev.filter(p => p.id !== planId));
    onApproveComplete();
  };

  return (
    <div className="bg-white rounded-xl border border-[#e8e8e5] shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-5 relative overflow-hidden transform transition-transform hover:scale-[1.005]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 bg-[#f5f5f3] px-2 py-1 rounded-full border border-[#e8e8e5]">
          <Plus size={12} className="text-[#dc2626]" strokeWidth={4} />
          <span className="text-[10px] font-bold text-[#1a1a1a] uppercase tracking-wider">Data Medic</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#6b6b6b]">Summarized at 6:00 PM</span>
          <button
            onClick={onExpand}
            className="flex items-center p-1.5 border border-[#e8e8e5] text-[#1a1a1a] rounded-lg hover:bg-[#f5f5f3] transition-colors"
          >
            <Maximize2 size={12} className="text-[#1E293B]" />
          </button>
        </div>
      </div>
      <p className="text-sm text-[#1a1a1a] leading-relaxed font-medium mb-6">
        Global data health is looking strong, but there are a few critical issues in the funnel that need attention to ensure accurate attribution. Missing channel data for 124 events in Awareness stage and incomplete attribution mapping for 57 closing deals are the top priorities. <button onClick={onExpand} className="text-[#1E293B] hover:underline">Read more</button>
      </p>

      {plans.length > 0 && (
        <>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-bold text-[#1a1a1a]">Fix next</span>
            <span className="px-2 py-0.5 border border-[#e8e8e5] rounded text-[9px] font-bold text-[#1E293B] uppercase tracking-wider">Recommended</span>
          </div>

          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {plans.map((plan) => (
                <motion.div
                  key={plan.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <DataMedicActionPlanCard 
                    title={plan.title} 
                    steps={plan.steps} 
                    defaultCollapsed={true}
                    onComplete={() => handlePlanComplete(plan.id)}
                    onStepComplete={onStepComplete}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );
};

const ConfidenceMeter = ({ score }: { score: 'high' | 'medium' | 'low' }) => {
  const config = {
    high: { 
      label: 'High confidence', 
      color: 'bg-[#16a34a]', 
      activeBars: 10, 
      textColor: 'text-[#16a34a]',
      bgColor: 'bg-green-50/50'
    },
    medium: { 
      label: 'Medium confidence', 
      color: 'bg-[#d97706]', 
      activeBars: 6, 
      textColor: 'text-[#d97706]',
      bgColor: 'bg-amber-50/50'
    },
    low: { 
      label: 'Consider with caution', 
      color: 'bg-[#e11d48]', 
      activeBars: 3, 
      textColor: 'text-[#e11d48]',
      bgColor: 'bg-rose-50/50'
    },
  };

  const { label, color, activeBars, textColor, bgColor } = config[score];

  return (
    <div className={`flex items-center gap-2.5 ${bgColor} px-3 py-1.5 rounded-lg border border-[#e8e8e5]/50`}>
      <div className="flex gap-[1.5px]">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i} 
            className={`w-[2px] h-3 rounded-full ${i < activeBars ? color : 'bg-[#e8e8e5]'}`} 
          />
        ))}
      </div>
      <span className={`text-[10px] font-bold uppercase tracking-tight ${textColor}`}>
        {label}
      </span>
    </div>
  );
};

interface DataMedicPlanStep {
  id: number;
  title: string;
  count?: string;
  desc: string;
  confidence: 'high' | 'medium' | 'low';
}

interface DataMedicActionPlanCardProps {
  title: string;
  steps: DataMedicPlanStep[];
  defaultCollapsed?: boolean;
  onComplete?: () => void;
  onStepComplete?: (step: DataMedicPlanStep) => void;
}

const DataMedicActionPlanCard: React.FC<DataMedicActionPlanCardProps> = ({ 
  title, 
  steps, 
  defaultCollapsed = true,
  onComplete,
  onStepComplete
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [isApproving, setIsApproving] = useState(false);
  const [approvalStep, setApprovalStep] = useState(0);

  const handleApprove = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsApproving(true);
    setApprovalStep(1);
    
    // Simulate step-by-step progress
    for (let i = 1; i <= steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      if (onStepComplete) onStepComplete(steps[i-1]);
      setApprovalStep(i + 1);
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsApproving(false);
    if (onComplete) onComplete();
  };

  return (
    <div className="bg-white rounded-xl border border-[#e8e8e5] shadow-sm overflow-hidden relative">
      <div 
        className="px-6 py-5 cursor-pointer flex items-center justify-between hover:bg-[#fcfcfb] transition-colors"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-[#f5f5f3] text-[#1E293B]">
            {isApproving ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <ListChecks size={18} className="text-[#1E293B]" />
            )}
          </div>
          <span className="text-sm font-medium text-[#1a1a1a]">{title}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={handleApprove}
              disabled={isApproving}
              className="px-3 py-1.5 border border-[#e8e8e5] text-[#1a1a1a] bg-white rounded-lg text-xs font-bold hover:bg-[#f5f5f3] transition-colors flex items-center gap-2 min-w-[100px] justify-center"
            >
              {isApproving ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Loading...
                </>
              ) : (
                'Approve plan'
              )}
            </button>
          </div>
          <ChevronRight size={18} className={`text-[#1E293B] transition-transform ${isCollapsed ? '' : 'rotate-90'}`} />
        </div>
      </div>
      
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-[#e8e8e5]"
          >
            <div className="px-6 pb-5 pt-6">
              <p className="text-sm text-[#1a1a1a] mb-4">Here's the approach I would follow:</p>
              
              <div className="border border-[#e8e8e5] rounded-xl overflow-hidden mb-6">
                {steps.map((step, i) => {
                  const isStepLoading = isApproving && approvalStep === i + 1;
                  const isStepDone = isApproving && approvalStep > i + 1;
                  
                  return (
                    <div key={step.id} className={`p-4 flex items-center justify-between hover:bg-[#fcfcfb] transition-colors ${i !== steps.length - 1 ? 'border-b border-[#e8e8e5]' : ''}`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                          isStepDone ? 'bg-green-50 text-green-600' : 
                          isStepLoading ? 'bg-blue-50 text-blue-600' : 
                          'bg-[#f5f5f3] text-[#1E293B]'
                        }`}>
                          {isStepDone ? (
                            <CheckCircle2 size={16} />
                          ) : isStepLoading ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            step.id
                          )}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <div className={`text-sm font-bold transition-colors ${isStepDone ? 'text-[#6b6b6b] line-through' : 'text-[#1a1a1a]'}`}>{step.title}</div>
                            {step.count && (
                              <span className="px-1.5 py-0.5 bg-[#f5f5f3] border border-[#e8e8e5] rounded text-[9px] font-bold text-[#1E293B] uppercase tracking-wider">
                                {step.count}
                              </span>
                            )}
                          </div>
                          <div className={`text-xs transition-colors ${isStepDone ? 'text-[#94a3b8]' : 'text-[#1E293B]'}`}>{step.desc}</div>
                        </div>
                      </div>
                      <ConfidenceMeter score={step.confidence} />
                    </div>
                  );
                })}
              </div>

              {/* Input Field */}
              <div className="relative flex items-center">
                <div className="flex-1 flex items-center bg-white border border-[#e8e8e5] rounded-xl p-1.5 focus-within:border-[#cbd5e1] transition-colors">
                  <div className="p-2 bg-[#f5f5f3] rounded-lg mr-3">
                    <Pencil size={14} className="text-[#1E293B]" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Make changes to the plan" 
                    className="flex-1 bg-transparent border-none outline-none text-sm text-[#1a1a1a] placeholder:text-[#9ca3af]"
                  />
                  <button className="p-2 bg-[#f8f9fa] border border-[#e8e8e5] rounded-xl text-[#9ca3af] hover:bg-[#f1f3f5] transition-colors ml-2">
                    <ArrowUp size={18} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FixingDrawer = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
          >
            <div className="p-6 border-b border-[#e8e8e5] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#fef2f2] rounded-xl flex items-center justify-center text-[#dc2626]">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#1a1a1a]">Fix Issue</h2>
                  <p className="text-xs text-[#6b6b6b]">Manual resolution guide</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-[#f5f5f3] rounded-lg transition-colors">
                <X size={20} className="text-[#6b6b6b]" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <section className="space-y-3">
                <h3 className="text-sm font-bold text-[#1a1a1a] uppercase tracking-wider">The Problem</h3>
                <p className="text-sm text-[#1a1a1a] leading-relaxed">
                  Missing channel data for 124 events in the Awareness stage. These events are currently being categorized as "Direct" or "Unknown," which is skewing your attribution reports and under-reporting the impact of your paid social campaigns.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-sm font-bold text-[#1a1a1a] uppercase tracking-wider">The Impact</h3>
                <div className="p-4 bg-[#fff7ed] border border-[#ffedd5] rounded-xl">
                  <p className="text-sm text-[#9a3412] font-medium">
                    This issue is causing a 15% discrepancy in your ROI calculations for Q1. Without fixing this, you may be over-allocating budget to under-performing channels.
                  </p>
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-sm font-bold text-[#1a1a1a] uppercase tracking-wider">Instructions</h3>
                <div className="space-y-4">
                  {[
                    { step: 1, title: "Log into HubSpot", desc: "Navigate to your CRM and go to the 'Settings' panel." },
                    { step: 2, title: "Locate Property Mapping", desc: "Find the 'Original Traffic Source' property in your contact settings." },
                    { step: 3, title: "Update Vasco Connector", desc: "Ensure the mapping matches the Vasco 'Channel' schema." },
                    { step: 4, title: "Trigger Re-sync", desc: "Click 'Sync Now' in the Vasco dashboard to pull the updated data." }
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#f5f5f3] border border-[#e8e8e5] flex items-center justify-center text-[10px] font-bold text-[#1a1a1a]">
                        {item.step}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-[#1a1a1a]">{item.title}</p>
                        <p className="text-xs text-[#6b6b6b] leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <div className="p-5 bg-[#eff6ff] border border-[#dbeafe] rounded-2xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#2563eb] shadow-sm">
                    <Plus size={20} strokeWidth={3} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1a1a1a]">Need more help?</h4>
                    <p className="text-xs text-[#1e40af]">Chat with the Data Medic Agent</p>
                  </div>
                </div>
                <button className="w-full py-2.5 bg-[#2563eb] text-white rounded-xl text-sm font-bold hover:bg-[#1d4ed8] transition-colors shadow-sm">
                  Open Chat
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const DataMedicReport = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[200] backdrop-blur-[2px]"
          />
          
          {/* Report Panel */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-6 bottom-6 right-6 w-full max-w-2xl bg-[#fcfcfb] text-[#1a1a1a] z-[201] rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-[#e8e8e5]"
          >
            {/* Header */}
            <div className="px-10 py-6 flex items-center justify-between border-b border-[#e8e8e5]">
              <div className="flex items-center gap-2 bg-[#f5f5f3] px-2 py-1 rounded-full border border-[#e8e8e5]">
                <Sparkles size={12} className="text-[#1a1a1a]" />
                <span className="text-[10px] font-bold text-[#1a1a1a] uppercase tracking-wider">Data Medic</span>
              </div>
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#f5f5f3] flex items-center justify-center hover:bg-[#e8e8e5] transition-colors"
              >
                <X size={16} className="text-[#1E293B]" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-10 py-10 space-y-10 w-full">
              {/* Title & Summary */}
              <section className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tight text-[#1a1a1a]">Data Health Diagnosis</h1>
                <p className="text-base text-[#4b5563] leading-relaxed">
                  Your global data health is currently at <span className="font-bold text-[#16a34a]">98%</span>. While significant revenue over-performance was recorded this week, we've identified critical attribution gaps in the Awareness stage. Resolving these will unlock full visibility into <span className="font-bold text-[#2563eb]">$52K in won revenue</span> that is currently partially unrouted.
                </p>
              </section>

              {/* Confidence & Disclaimer */}
              <section className="flex items-center justify-between gap-8 py-4 border-y border-[#e8e8e5]/50">
                <div className="space-y-2">
                  <div className="text-[10px] font-bold text-[#1E293B] uppercase tracking-wider">Confidence Level</div>
                  <ConfidenceMeter score="high" />
                </div>
                <div className="flex-1 max-w-md">
                  <p className="text-[11px] text-[#1E293B] leading-relaxed italic">
                    Disclaimer: This diagnosis is based on current sync patterns and historical attribution models. Confidence is high due to consistent mapping across HubSpot and Vasco connectors, but manual verification of the "Original Traffic Source" field is recommended.
                  </p>
                </div>
              </section>

              {/* Citation Preview Cards */}
              <section className="space-y-4 pt-10 border-t border-[#e8e8e5]">
                <div className="text-[10px] font-bold text-[#1E293B] uppercase tracking-wider">Data Artifacts Analyzed</div>
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {[
                    { source: "HubSpot CRM", artifact: "Original Traffic Source", count: "50.1k", color: "bg-orange-50 text-orange-600" },
                    { source: "Vasco Config", artifact: "Channel Mapping Rules", count: "12 rules", color: "bg-blue-50 text-blue-600" },
                    { source: "Web Analytics", artifact: "Anonymous Sessions", count: "15.4k", color: "bg-purple-50 text-purple-600" }
                  ].map((cite, i) => (
                    <div key={i} className="flex-shrink-0 w-56 p-4 bg-white rounded-2xl border border-[#e8e8e5] space-y-2 hover:shadow-md transition-shadow cursor-pointer group">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-[#1E293B] uppercase">{cite.source}</span>
                        <ExternalLink size={12} className="text-[#cbd5e1] group-hover:text-[#2563eb] transition-colors" />
                      </div>
                      <div className="text-sm font-bold text-[#1a1a1a]">{cite.artifact}</div>
                      <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${cite.color}`}>
                        {cite.count} records
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Action Plans */}
              <section className="space-y-6 pt-10 border-t border-[#e8e8e5]">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold">Strategic Action Plans</h2>
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-blue-100">2 Active</span>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      title: "Funnel Integrity Plan",
                      desc: "Focuses on resolving NO_CHANNEL errors and motion gaps by mapping HubSpot 'Original Traffic Source' to Vasco Channels.",
                      impact: "+12 pts",
                      steps: 3
                    },
                    {
                      title: "Attribution Recovery",
                      desc: "Linking anonymous sessions to CRM records for full ROI. Audit 57 closing deals with missing attribution touchpoints.",
                      impact: "+26 pts",
                      steps: 4
                    }
                  ].map((plan, i) => (
                    <div key={i} className="p-5 bg-white rounded-2xl border border-[#e8e8e5] hover:border-blue-200 transition-colors cursor-pointer group flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                          <Target size={20} />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-bold text-[#1a1a1a] group-hover:text-blue-600 transition-colors">{plan.title}</h3>
                          <p className="text-xs text-[#6b6b6b] max-w-xl">{plan.desc}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-[#1E293B] uppercase font-bold">Impact</div>
                        <div className="text-sm font-bold text-[#16a34a]">{plan.impact}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Next Steps */}
              <section className="space-y-6 pt-10 border-t border-[#e8e8e5]">
                <h2 className="text-lg font-bold">Top Priority Next Steps</h2>
                <div className="space-y-4">
                  {[
                    {
                      title: "Map HubSpot 'Original Traffic Source'",
                      desc: "50,119 events are currently unrouted. Mapping this field will recover 42% of failed events.",
                      priority: "Critical"
                    },
                    {
                      title: "Audit CRM Sync for 57 Deals",
                      desc: "Closing deals in the 'Sales-Led' motion are missing key attribution touchpoints.",
                      priority: "High"
                    },
                    {
                      title: "Resolve Self-Serve motion Gaps",
                      desc: "Identify anonymous sessions that converted via the self-serve path.",
                      priority: "Medium"
                    }
                  ].map((step, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-white rounded-2xl border border-[#e8e8e5] group hover:bg-[#fcfcfb] transition-colors">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#f5f5f3] flex items-center justify-center text-[10px] font-bold text-[#1E293B]">
                        {i + 1}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-[#1a1a1a]">{step.title}</h4>
                          <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                            step.priority === 'Critical' ? 'bg-red-50 text-red-600 border border-red-100' :
                            step.priority === 'High' ? 'bg-orange-50 text-orange-600 border border-orange-100' :
                            'bg-blue-50 text-blue-600 border border-blue-100'
                          }`}>
                            {step.priority}
                          </span>
                        </div>
                        <p className="text-xs text-[#1E293B] leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Integrity Summaries */}
              <section className="space-y-10 pt-10 border-t border-[#e8e8e5]">
                <div className="space-y-4">
                  <h2 className="text-lg font-bold text-[#1a1a1a]">Employee Integrity Analysis</h2>
                  <p className="text-sm text-[#4b5563] leading-relaxed">
                    Our analysis shows that <span className="font-bold text-[#1a1a1a]">Nicolas Mejia</span> and <span className="font-bold text-[#1a1a1a]">Justin Hudon</span> are currently associated with the highest volume of unrouted events, primarily due to inconsistent "Original Traffic Source" tagging in HubSpot. This pattern accounts for <span className="font-bold text-[#2563eb]">64% of the current data gaps</span>.
                  </p>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-[#2563eb] cursor-pointer hover:underline">
                    <ExternalLink size={12} /> View Employee Integrity Artifact
                  </div>
                </div>

                <div className="space-y-4 pt-10 border-t border-[#e8e8e5]">
                  <h2 className="text-lg font-bold text-[#1a1a1a]">Dimension Integrity Analysis</h2>
                  <p className="text-sm text-[#4b5563] leading-relaxed">
                    The <span className="font-bold text-[#1a1a1a]">Medium</span> and <span className="font-bold text-[#1a1a1a]">Inbound Lead ID</span> dimensions are the least filled across the Awareness stage funnel. Specifically, 53% of events are missing a defined Medium, which prevents accurate channel categorization for self-serve motions.
                  </p>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-[#2563eb] cursor-pointer hover:underline">
                    <ExternalLink size={12} /> View Dimension Integrity Artifact
                  </div>
                </div>
              </section>

              {/* Chat CTA */}
              <section className="pt-10 border-t border-[#e8e8e5]">
                <div className="bg-[#f8fafc] rounded-2xl border border-[#e2e8f0] p-6 flex items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                      <MessageSquare size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1a1a1a]">Need more clarity?</h3>
                      <p className="text-xs text-[#64748b]">Chat with the Data Medic Agent to dive deeper into these findings.</p>
                    </div>
                  </div>
                  <button className="px-5 py-2.5 bg-white border border-[#e2e8f0] rounded-xl text-sm font-bold text-[#1a1a1a] hover:bg-[#f1f5f9] transition-colors shadow-sm">
                    Start Chat
                  </button>
                </div>
              </section>
            </div>

            {/* Footer Actions */}
            <div className="px-10 py-6 bg-white border-t border-[#e8e8e5] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-[#f5f5f3]" />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-[#1E293B] uppercase tracking-wider">Shared with team</span>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 rounded-xl border border-[#e8e8e5] text-xs font-bold text-[#1a1a1a] hover:bg-[#f5f5f3] transition-colors">
                  Download PDF
                </button>
                <button className="px-6 py-2 rounded-xl bg-[#2563eb] text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm">
                  Share Report
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const IntegrityCard = ({ title, items, pageInfo }: { title: string, items: any[], pageInfo: string }) => {
  return (
    <div className="bg-white rounded-xl border border-[#e8e8e5] shadow-sm overflow-hidden flex-1">
      <div className="px-5 py-4 border-b border-[#e8e8e5]">
        <h3 className="font-bold text-[#1a1a1a]">{title}</h3>
      </div>
      <div className="divide-y divide-[#e8e8e5]">
        {items.map((item, i) => (
          <div key={i} className="px-5 py-4 flex items-center justify-between hover:bg-[#fcfcfb] transition-colors">
            <div className="flex items-center gap-4 flex-1">
              <CircularScore score={item.score} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-[#1a1a1a] truncate">{item.label}</div>
                <div className="text-[10px] text-[#6b6b6b]">{item.sublabel}</div>
              </div>
              <div className="flex-[2] px-4">
                <div className="h-1.5 bg-[#e8e8e5] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#2563eb] rounded-full" 
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="text-sm font-bold text-[#2563eb] ml-4">{item.value}</div>
          </div>
        ))}
      </div>
      <div className="px-5 py-3 border-t border-[#e8e8e5] bg-[#fcfcfb] flex items-center justify-between">
        <span className="text-xs text-[#6b6b6b]">{pageInfo}</span>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-[#e8e8e5] rounded-md text-xs font-bold text-[#6b6b6b] hover:bg-white transition-colors disabled:opacity-50" disabled>Previous</button>
          <button className="px-3 py-1 border border-[#e8e8e5] rounded-md text-xs font-bold text-[#1a1a1a] hover:bg-white transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
};

const IntegrityTab = ({ onStartFixing }: { onStartFixing: () => void }) => {
  const dimensionItems = [
    { score: 9, label: "Close Date (M...", sublabel: "Event-level", progress: 85, value: "10K" },
    { score: 9, label: "Close Date (Q...", sublabel: "Event-level", progress: 85, value: "10K" },
    { score: 10, label: "Channel (Cust...", sublabel: "Event-level", progress: 85, value: "10K" },
    { score: 33, label: "Inbound Lead I...", sublabel: "Event-level", progress: 60, value: "7K" },
    { score: 53, label: "Medium", sublabel: "Event-level", progress: 45, value: "5K" },
  ];

  const employeeItems = [
    { score: 99, label: "Nicolas Mejia", sublabel: "Sales", progress: 80, value: "47" },
    { score: 99, label: "Justin Hudon", sublabel: "Customer Succ...", progress: 75, value: "44" },
    { score: 98, label: "Guillaume Jac...", sublabel: "CEO", progress: 60, value: "27" },
    { score: 100, label: "Suzanne Tran", sublabel: "BDR", progress: 50, value: "22" },
    { score: 98, label: "Alexis Boucher", sublabel: "Sales", progress: 40, value: "15" },
  ];

  return (
    <div className="flex flex-col">
      <div className="bg-[#fcfcfb] border-b border-[#e8e8e5]">
        <DataMedicCard />
      </div>
      <div className="p-6 flex gap-6">
        <IntegrityCard 
          title="Dimension Integrity" 
          items={dimensionItems} 
          pageInfo="Page 1 of 6" 
        />
        <IntegrityCard 
          title="Employee Integrity" 
          items={employeeItems} 
          pageInfo="Page 1 of 2" 
        />
      </div>
    </div>
  );
};

const Inbox = ({ onStartFixing, autoFixedItems, defaultExpanded }: { onStartFixing: () => void, autoFixedItems: (IssueItem & { timestamp: string })[], defaultExpanded?: string | null }) => {
  const [expanded, setExpanded] = React.useState<string | null>(defaultExpanded || null);

  const unprocessedItems: IssueItem[] = [
    { id: '1', description: 'One liner explaining the fix type and why it matters' },
    { id: '2', description: 'One liner explaining the fix type and why it matters' },
    { id: '3', description: 'One liner explaining the fix type and why it matters' },
  ];

  const incompleteItems: IssueItem[] = [
    { id: '1', description: 'Missing UTM parameters for LinkedIn campaign' },
    { id: '2', description: 'Duplicate lead entries detected in CRM sync' },
  ];

  return (
    <div className="bg-white rounded-xl border border-[#e8e8e5] shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden mb-8">
      <div className="px-6 py-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#1a1a1a]">Issues</h2>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#6b6b6b]">Refreshed 1 hour ago</span>
          <button className="flex items-center gap-2 px-3 py-1.5 border border-[#e8e8e5] text-[#1a1a1a] rounded-lg text-xs font-bold hover:bg-[#f5f5f3] transition-colors">
            <RefreshCw size={14} className="text-[#6b6b6b]" />
            Refresh
          </button>
        </div>
      </div>

      <div className="px-6 pb-6 pt-0 space-y-4">
        <IssueRow 
          icon={<AlertTriangle size={18} />} 
          label="Unprocessed Events" 
          count="133" 
          color="red" 
          isExpanded={expanded === 'unprocessed'}
          onClick={() => setExpanded(expanded === 'unprocessed' ? null : 'unprocessed')}
          items={unprocessedItems}
          onStartFixing={onStartFixing}
        />
        <IssueRow 
          icon={<AlertTriangle size={18} />} 
          label="Incomplete Attribution" 
          count="57" 
          color="orange" 
          isExpanded={expanded === 'incomplete'}
          onClick={() => setExpanded(expanded === 'incomplete' ? null : 'incomplete')}
          items={incompleteItems}
          onStartFixing={onStartFixing}
        />
        <IssueRow 
          icon={<CheckCircle2 size={18} />} 
          label="Auto-fixed" 
          count={autoFixedItems.length >= 1000 ? `${(autoFixedItems.length / 1000).toFixed(1)}K` : autoFixedItems.length.toString()} 
          color="green" 
          isExpanded={expanded === 'fixed'}
          onClick={() => setExpanded(expanded === 'fixed' ? null : 'fixed')}
          items={autoFixedItems}
        />
      </div>
    </div>
  );
};

const RadarDashboard = () => {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isFixingOpen, setIsFixingOpen] = useState(false);
  const [autoFixedItems, setAutoFixedItems] = useState<(IssueItem & { timestamp: string })[]>([
    { id: '1', description: 'Mapped HubSpot "Original Traffic Source" to Vasco Channels', timestamp: 'Today' },
    { id: '2', description: 'Resolved Motion Gaps for Self-Serve motion', timestamp: 'Today' },
    { id: '3', description: 'Recovered unattributed revenue by linking anonymous sessions', timestamp: 'Yesterday' },
    { id: '4', description: 'Audited CRM Sync for missing attribution touchpoints', timestamp: 'Yesterday' },
    { id: '5', description: 'Fixed channel mapping for 124 awareness events', timestamp: '1 week ago' },
  ]);

  const handleStepComplete = (step: DataMedicPlanStep) => {
    setAutoFixedItems(prev => [
      { id: Date.now().toString(), description: step.desc, timestamp: 'Just now' },
      ...prev
    ]);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#f5f5f3]">
      <TopNav />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto py-6 px-6">
          <div className="grid grid-cols-1 gap-6">
            <DataHealthCard />
            <DataMedicSummaryCard 
              onExpand={() => setIsReportOpen(true)} 
              onApproveComplete={() => {}}
              onStepComplete={handleStepComplete}
            />
            <Inbox onStartFixing={() => setIsFixingOpen(true)} autoFixedItems={autoFixedItems} />
          </div>
        </div>
      </main>

      <FixingDrawer isOpen={isFixingOpen} onClose={() => setIsFixingOpen(false)} />
      <DataMedicReport isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} />
    </div>
  );
};

export default function Layout() {
  return (
    <div className="flex h-screen overflow-hidden font-sans text-[#1a1a1a]">
      <Sidebar />
      <RadarDashboard />
    </div>
  );
}
