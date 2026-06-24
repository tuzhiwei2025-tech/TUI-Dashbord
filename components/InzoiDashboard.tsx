"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import * as echarts from "echarts/core";
import { BarChart, GaugeChart, GraphChart, HeatmapChart, LineChart, RadarChart, ScatterChart } from "echarts/charts";
import { GridComponent, PolarComponent, RadarComponent, TooltipComponent, VisualMapComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import {
  Activity,
  BatteryCharging,
  Bell,
  BookOpen,
  Boxes,
  ChevronRight,
  CheckCircle2,
  Compass,
  Crown,
  Flame,
  Gauge,
  Layers3,
  LockKeyhole,
  Palette,
  Plus,
  RadioTower,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Store,
  Trophy,
  type LucideIcon,
  UsersRound,
  Wand2,
  Zap,
} from "lucide-react";

echarts.use([BarChart, GaugeChart, GraphChart, HeatmapChart, LineChart, RadarChart, ScatterChart, GridComponent, PolarComponent, RadarComponent, TooltipComponent, VisualMapComponent, CanvasRenderer]);

type PageKey =
  | "inzoi"
  | "soft"
  | "electric"
  | "premium"
  | "request"
  | "unlock"
  | "confirm"
  | "filament"
  | "battery"
  | "depth"
  | "void"
  | "divine"
  | "ticket"
  | "clay"
  | "lumen"
  | "prompt"
  | "neural";

type PageConfig = {
  nav: string;
  title: string;
  score: string;
  refresh: string;
  earning: string;
  total: string;
  balance: string;
  banner: string;
  bannerCopy: string;
  primaryAction: string;
  secondaryAction: string;
  infoTitle: string;
  infoCopy: string;
  avatarName: string;
  avatarRole: string;
  payout: string;
  accent: string;
  accent2: string;
  ink: string;
  theme: "inzoi" | "soft" | "electric" | "premium" | "request" | "unlock" | "confirm" | "filament" | "battery" | "depth" | "void" | "divine" | "ticket" | "clay" | "lumen" | "prompt" | "neural";
};

const pages: Record<PageKey, PageConfig> = {
  inzoi: {
    nav: "Dashboard",
    title: "Dashboard",
    score: "CGQS : 56,000",
    refresh: "Data Refresh Time : Oct 27, 2025, 2:32 PM.",
    earning: "+56,530",
    total: "248,500",
    balance: "5,210",
    banner: "New Digital Talents",
    bannerCopy: "Don't know how to build your own intelligent AI Talents? Learn from experts who show the process.",
    primaryAction: "Create new AI Talents",
    secondaryAction: "Create use templates",
    infoTitle: "AI Information Dashboard",
    infoCopy: "inZOI style glass panels, soft studio controls, avatar analytics and a clear one-screen management layout.",
    avatarName: "Word Expert Lina",
    avatarRole: "Last week's earnings 1st",
    payout: "+ $500",
    accent: "#6d4cff",
    accent2: "#d8c8ff",
    ink: "#171823",
    theme: "inzoi",
  },
  soft: {
    nav: "Soft Dashboard",
    title: "Soft Dashboard",
    score: "SOFT : 128.4K",
    refresh: "Soft refresh : neumorphic surface ready.",
    earning: "+18,200",
    total: "428,190",
    balance: "12,800",
    banner: "Soft Liquid Overview",
    bannerCopy: "Neumorphic depth, mint liquid surfaces and soft inset controls are preserved in a tighter layout.",
    primaryAction: "Create soft report",
    secondaryAction: "Open soft templates",
    infoTitle: "Soft Information Dashboard",
    infoCopy: "Soft cards keep pill depth, bright highlights and rounded liquid controls while using the reference composition.",
    avatarName: "Soft Flow Mina",
    avatarRole: "Neumorphic operator",
    payout: "+ $520",
    accent: "#4caf50",
    accent2: "#a7f3d0",
    ink: "#263238",
    theme: "soft",
  },
  electric: {
    nav: "Electric Flow",
    title: "Electric Dashboard",
    score: "PLASMA : 96.4%",
    refresh: "Signal refresh : live arc pipeline.",
    earning: "+12,840",
    total: "488,900",
    balance: "8,910",
    banner: "Neon Route Engines",
    bannerCopy: "Neon arcs, dark glass and plasma hover effects stay intact while the dashboard fits one screen.",
    primaryAction: "Charge plasma routes",
    secondaryAction: "Create signal template",
    infoTitle: "Electric Information Dashboard",
    infoCopy: "High contrast neon shadows, rainbow rails and spark buttons remain the signature interactions.",
    avatarName: "Arc Runner Nova",
    avatarRole: "Top plasma operator",
    payout: "+ $880",
    accent: "#5eeabd",
    accent2: "#9a4df1",
    ink: "#16343f",
    theme: "electric",
  },
  premium: {
    nav: "Premium",
    title: "Premium Dashboard",
    score: "VALUE : 920K",
    refresh: "Premium refresh : Oct 27, 2025, 2:32 PM.",
    earning: "+31,800",
    total: "920,000",
    balance: "18,600",
    banner: "Private Capsule Club",
    bannerCopy: "Luxury capsule lighting, blue-gold-pink accents and polished controls stay visible.",
    primaryAction: "Open private capsule",
    secondaryAction: "Create luxury template",
    infoTitle: "Premium Information Dashboard",
    infoCopy: "Premium keeps its satin highlights, capsule shadows and expensive soft-glass spacing.",
    avatarName: "Crown Desk Ava",
    avatarRole: "Premium conversion lead",
    payout: "+ $1,240",
    accent: "#c4548e",
    accent2: "#f7e6a1",
    ink: "#181924",
    theme: "premium",
  },
  request: {
    nav: "Request",
    title: "Request Dashboard",
    score: "ASKS : 12,400",
    refresh: "Request refresh : queue synced.",
    earning: "+8,240",
    total: "144,800",
    balance: "2,018",
    banner: "Creative Request Board",
    bannerCopy: "Request counters, dark glass and queue-state feedback remain distinct.",
    primaryAction: "Create new request",
    secondaryAction: "Create review template",
    infoTitle: "Request Information Dashboard",
    infoCopy: "Purple/orange request lanes keep their glow and directional hover behavior.",
    avatarName: "Brief Engine Mia",
    avatarRole: "Fastest request finisher",
    payout: "+ $420",
    accent: "#6b3bd3",
    accent2: "#ff8800",
    ink: "#241f32",
    theme: "request",
  },
  unlock: {
    nav: "Unlock",
    title: "Unlock Dashboard",
    score: "VAULT : 99.8%",
    refresh: "Vault refresh : biometric ready.",
    earning: "+4,860",
    total: "128,000",
    balance: "4,218",
    banner: "Identity Gate Studio",
    bannerCopy: "Vault, key and swipe-to-unlock language are preserved with security-glass modules.",
    primaryAction: "Open identity gate",
    secondaryAction: "Create access template",
    infoTitle: "Unlock Information Dashboard",
    infoCopy: "Muted steel, yellow lock light and soft frosted panels keep the unlock identity.",
    avatarName: "Vault Prime Eli",
    avatarRole: "Identity gate owner",
    payout: "+ $360",
    accent: "#ffcd58",
    accent2: "#7a929d",
    ink: "#30424a",
    theme: "unlock",
  },
  confirm: {
    nav: "Confirm",
    title: "Confirm Dashboard",
    score: "CONFIRM : 128",
    refresh: "Approval refresh : green lane open.",
    earning: "+6,410",
    total: "97,000",
    balance: "1,820",
    banner: "Approval Flow Center",
    bannerCopy: "Green confirmation states, check feedback and soft embossing remain readable.",
    primaryAction: "Confirm new action",
    secondaryAction: "Create approval template",
    infoTitle: "Confirm Information Dashboard",
    infoCopy: "Neumorphic green confirmation controls keep their pressed and success states.",
    avatarName: "Green Lane Zoe",
    avatarRole: "Approval quality lead",
    payout: "+ $290",
    accent: "#41a88f",
    accent2: "#a1ffc0",
    ink: "#31424a",
    theme: "confirm",
  },
  filament: {
    nav: "Filament",
    title: "Filament Dashboard",
    score: "IGNITION : 84%",
    refresh: "Filament refresh : lamp array warm.",
    earning: "+7,820",
    total: "220,000",
    balance: "6,800",
    banner: "Lighting Studio Array",
    bannerCopy: "Filament orange heat, metal glass and bulb energy are kept in compact modules.",
    primaryAction: "Ignite lighting set",
    secondaryAction: "Create lighting template",
    infoTitle: "Filament Information Dashboard",
    infoCopy: "Warm glow, screw-metal shadows and light strip reactions remain the interaction signature.",
    avatarName: "Filament Arc Rae",
    avatarRole: "Lighting lead",
    payout: "+ $610",
    accent: "#ff8800",
    accent2: "#00fbff",
    ink: "#3c2514",
    theme: "filament",
  },
  battery: {
    nav: "Battery",
    title: "Battery Dashboard",
    score: "CHARGE : 69%",
    refresh: "Battery refresh : cell matrix synced.",
    earning: "+9,690",
    total: "215,000",
    balance: "8,400",
    banner: "Energy Cell Matrix",
    bannerCopy: "Green charge, cell bars and circuit feedback remain crisp inside the same layout.",
    primaryAction: "Balance cell rack",
    secondaryAction: "Create charge template",
    infoTitle: "Battery Information Dashboard",
    infoCopy: "Battery keeps segmented charge bars, health accents and electric-green module shadows.",
    avatarName: "Cell Balancer Lin",
    avatarRole: "Battery health owner",
    payout: "+ $500",
    accent: "#2dc48d",
    accent2: "#85ffdb",
    ink: "#143b31",
    theme: "battery",
  },
  depth: {
    nav: "Depth Battery",
    title: "Depth Dashboard",
    score: "DEPTH : 7.8x",
    refresh: "Depth refresh : instrument aligned.",
    earning: "+5,280",
    total: "178,500",
    balance: "3,120",
    banner: "Layered Depth Instrument",
    bannerCopy: "Depth gauges, layered shadows and Z-axis controls keep their technical visual language.",
    primaryAction: "Calibrate depth",
    secondaryAction: "Create instrument template",
    infoTitle: "Depth Information Dashboard",
    infoCopy: "Depth keeps dark instrument panels, precision ticks and stacked glass surfaces.",
    avatarName: "Depth Pilot Kai",
    avatarRole: "Instrument operator",
    payout: "+ $460",
    accent: "#3eea8e",
    accent2: "#ffffff",
    ink: "#203833",
    theme: "depth",
  },
  void: {
    nav: "Void Card",
    title: "Void Dashboard",
    score: "VOID : 88,000",
    refresh: "Void refresh : card matrix live.",
    earning: "+8,880",
    total: "301,400",
    balance: "9,018",
    banner: "Void Card Market",
    bannerCopy: "Void neon, monolith cards and hover sensors stay sharp, but the layout is now clean.",
    primaryAction: "Open void market",
    secondaryAction: "Create card template",
    infoTitle: "Void Information Dashboard",
    infoCopy: "Cyan/magenta void lighting, dark surfaces and card-like interactions remain.",
    avatarName: "Void Unit Nyx",
    avatarRole: "Card market lead",
    payout: "+ $770",
    accent: "#00f2ff",
    accent2: "#ff0055",
    ink: "#152a34",
    theme: "void",
  },
  divine: {
    nav: "Divine Engine",
    title: "Divine Dashboard",
    score: "DIVINE : 777",
    refresh: "Divine refresh : engine stable.",
    earning: "+7,770",
    total: "277,700",
    balance: "5,777",
    banner: "Divine Engine Room",
    bannerCopy: "Gold, crimson and molten engine motion remain the defining style.",
    primaryAction: "Start divine engine",
    secondaryAction: "Create engine template",
    infoTitle: "Divine Information Dashboard",
    infoCopy: "Divine keeps its gold heat, ceremonial shadows and strong dramatic contrast.",
    avatarName: "Divine Forge Sol",
    avatarRole: "Engine master",
    payout: "+ $920",
    accent: "#ffd700",
    accent2: "#ff5e00",
    ink: "#3d2a12",
    theme: "divine",
  },
  ticket: {
    nav: "VIP Ticket",
    title: "Ticket Dashboard",
    score: "PASSES : 30,112",
    refresh: "Ticket refresh : gate 3 ready.",
    earning: "+3,112",
    total: "120,500",
    balance: "5,005",
    banner: "VIP Ticket Gate",
    bannerCopy: "Ticket flip, barcode mood and purple/gold event energy remain intact.",
    primaryAction: "Scan VIP ticket",
    secondaryAction: "Create pass template",
    infoTitle: "Ticket Information Dashboard",
    infoCopy: "Ticket keeps event-pass shadows, VIP contrast and scan-line interactions.",
    avatarName: "Gate Host Umi",
    avatarRole: "VIP agenda owner",
    payout: "+ $301",
    accent: "#af40ff",
    accent2: "#ffd700",
    ink: "#2f2441",
    theme: "ticket",
  },
  clay: {
    nav: "Clay Palette",
    title: "Clay Dashboard",
    score: "SWATCH : 10",
    refresh: "Clay refresh : palette mixed.",
    earning: "+2,840",
    total: "98,400",
    balance: "1,010",
    banner: "Soft Clay Palette",
    bannerCopy: "Clay color, blob buttons and tactile neumorphic shadows remain soft and playful.",
    primaryAction: "Mix new palette",
    secondaryAction: "Create color template",
    infoTitle: "Clay Information Dashboard",
    infoCopy: "Clay keeps rounded tactile buttons, colorful pods and soft raised surfaces.",
    avatarName: "Mint Flow Hana",
    avatarRole: "Palette director",
    payout: "+ $260",
    accent: "#10b981",
    accent2: "#f472b6",
    ink: "#20212b",
    theme: "clay",
  },
  lumen: {
    nav: "Luminous Gate",
    title: "Lumen Dashboard",
    score: "LUMEN : 92%",
    refresh: "Lumen refresh : light folds active.",
    earning: "+6,920",
    total: "192,000",
    balance: "4,620",
    banner: "Luminous Gate Lab",
    bannerCopy: "Lumen keeps its light slits, monochrome glow and aperture controls.",
    primaryAction: "Activate lumen gate",
    secondaryAction: "Create beam template",
    infoTitle: "Lumen Information Dashboard",
    infoCopy: "Luminous keeps white glow, black glass and focused beam interactions.",
    avatarName: "Primary Slit Noa",
    avatarRole: "Light channel lead",
    payout: "+ $640",
    accent: "#ffffff",
    accent2: "#7e7e7e",
    ink: "#222327",
    theme: "lumen",
  },
  prompt: {
    nav: "Prompt Bot",
    title: "Prompt Dashboard",
    score: "TOKENS : 24/s",
    refresh: "Prompt refresh : context packed.",
    earning: "+12,024",
    total: "240,000",
    balance: "8,096",
    banner: "Prompt Bot Cockpit",
    bannerCopy: "Prompt input, submit glow and tool chips keep their compact AI command style.",
    primaryAction: "Generate new brief",
    secondaryAction: "Create prompt template",
    infoTitle: "Prompt Information Dashboard",
    infoCopy: "Prompt keeps dark input trays, send-button motion and parameter chips.",
    avatarName: "Prompt Pilot Ivy",
    avatarRole: "Context composer",
    payout: "+ $730",
    accent: "#d4d4d4",
    accent2: "#555555",
    ink: "#25272b",
    theme: "prompt",
  },
  neural: {
    nav: "Neural Card",
    title: "Neural Dashboard",
    score: "ENERGY : 7/9",
    refresh: "Neural refresh : card table ready.",
    earning: "+7,095",
    total: "209,400",
    balance: "3,047",
    banner: "Neural Card Table",
    bannerCopy: "Neural keeps battle-card scanlines, purple energy and card hover behavior.",
    primaryAction: "Resolve neural card",
    secondaryAction: "Create deck template",
    infoTitle: "Neural Information Dashboard",
    infoCopy: "Neural keeps cyber card surfaces, scanline effects and energy stats.",
    avatarName: "Neural Surge Ren",
    avatarRole: "Card strategist",
    payout: "+ $705",
    accent: "#d4b5ff",
    accent2: "#9370db",
    ink: "#302244",
    theme: "neural",
  },
};

const navItems: { key: PageKey; icon: LucideIcon }[] = [
  { key: "inzoi", icon: Compass },
  { key: "soft", icon: Gauge },
  { key: "electric", icon: Sparkles },
  { key: "premium", icon: Crown },
  { key: "request", icon: Wand2 },
  { key: "unlock", icon: LockKeyhole },
  { key: "confirm", icon: Layers3 },
  { key: "filament", icon: Zap },
  { key: "battery", icon: Activity },
  { key: "depth", icon: BookOpen },
  { key: "void", icon: Store },
  { key: "divine", icon: Trophy },
  { key: "ticket", icon: Boxes },
  { key: "clay", icon: Palette },
  { key: "lumen", icon: Sparkles },
  { key: "prompt", icon: Search },
  { key: "neural", icon: Zap },
];

const pageKeys = new Set<PageKey>(navItems.map((item) => item.key));

const ranks = [
  ["ByeWind", "$942.00", "Studio lead", "#d9d3ff"],
  ["Natali CrAlg", "$891.00", "Pose artist", "#ffd4ea"],
  ["Drew Cano", "$840.00", "Lighting TD", "#d7f6ff"],
  ["Oriando Diggs", "$593.00", "Template maker", "#efe4ff"],
  ["Andi Lane", "$596.00", "Creator ops", "#ffe3d2"],
  ["Mina Vale", "$570.00", "AI stylist", "#d8f2e5"],
];

const bars = [36, 46, 42, 58, 55, 68, 76, 64, 60, 49, 43, 52, 48, 55, 47, 60];

const themeModes: Record<
  PageConfig["theme"],
  {
    display: "avatar" | "soft" | "neon" | "luxury" | "queue" | "vault" | "approval" | "filament" | "battery" | "depth" | "void" | "divine" | "ticket" | "clay" | "lumen" | "prompt" | "neural";
    chart: "bars" | "cells" | "bubbles" | "rings" | "heat" | "wave" | "scan" | "swatches" | "terminal" | "cards";
    texture: "silk" | "foam" | "arc" | "velvet" | "mesh" | "steel" | "mint" | "amber" | "circuit" | "instrument" | "void" | "gold" | "ticket" | "clay" | "beam" | "console" | "card";
    icon: LucideIcon;
  }
> = {
  inzoi: { display: "avatar", chart: "bars", texture: "silk", icon: UsersRound },
  soft: { display: "soft", chart: "rings", texture: "foam", icon: Gauge },
  electric: { display: "neon", chart: "wave", texture: "arc", icon: RadioTower },
  premium: { display: "luxury", chart: "rings", texture: "velvet", icon: Crown },
  request: { display: "queue", chart: "bubbles", texture: "mesh", icon: Wand2 },
  unlock: { display: "vault", chart: "scan", texture: "steel", icon: ShieldCheck },
  confirm: { display: "approval", chart: "cells", texture: "mint", icon: CheckCircle2 },
  filament: { display: "filament", chart: "heat", texture: "amber", icon: Flame },
  battery: { display: "battery", chart: "cells", texture: "circuit", icon: BatteryCharging },
  depth: { display: "depth", chart: "rings", texture: "instrument", icon: Layers3 },
  void: { display: "void", chart: "cards", texture: "void", icon: Store },
  divine: { display: "divine", chart: "heat", texture: "gold", icon: Trophy },
  ticket: { display: "ticket", chart: "scan", texture: "ticket", icon: Boxes },
  clay: { display: "clay", chart: "swatches", texture: "clay", icon: Palette },
  lumen: { display: "lumen", chart: "wave", texture: "beam", icon: Sparkles },
  prompt: { display: "prompt", chart: "terminal", texture: "console", icon: Search },
  neural: { display: "neural", chart: "cards", texture: "card", icon: Zap },
};

const displayNodes: Record<PageConfig["theme"], readonly string[]> = {
  inzoi: ["Talent", "Pose", "Studio"],
  soft: ["Inset", "Pill", "Flow"],
  electric: ["Arc", "Pulse", "Route"],
  premium: ["Crown", "Velvet", "Pearl"],
  request: ["Brief", "Build", "Review"],
  unlock: ["Key", "Vault", "Seal"],
  confirm: ["Swipe", "Check", "Done"],
  filament: ["Warm", "Glow", "Spark"],
  battery: ["Cell", "Charge", "Health"],
  depth: ["Layer", "Gauge", "Z Axis"],
  void: ["Card", "Neon", "Market"],
  divine: ["Gold", "Forge", "Engine"],
  ticket: ["Scan", "VIP", "Gate"],
  clay: ["Mint", "Rose", "Sky"],
  lumen: ["Beam", "Slit", "Focus"],
  prompt: ["Input", "Tools", "Send"],
  neural: ["Deck", "Energy", "Move"],
};

const pageMetrics: Record<PageConfig["theme"], readonly number[]> = {
  inzoi: [36, 46, 42, 58, 55, 68, 76, 64, 60, 49, 43, 52],
  soft: [68, 54, 72, 48, 82, 64, 76, 58, 70, 62, 84, 66],
  electric: [22, 68, 36, 88, 44, 96, 52, 78, 35, 92, 48, 84],
  premium: [52, 60, 68, 80, 76, 88, 72, 92, 84, 96, 78, 90],
  request: [74, 91, 68, 83, 59, 88, 72, 66, 94, 61, 79, 86],
  unlock: [94, 76, 88, 69, 83, 97, 72, 81, 90, 74, 86, 92],
  confirm: [34, 48, 44, 62, 58, 78, 72, 88, 81, 96, 84, 91],
  filament: [92, 61, 78, 88, 73, 96, 68, 84, 90, 57, 81, 99],
  battery: [69, 74, 82, 91, 63, 96, 78, 88, 54, 73, 84, 92],
  depth: [44, 62, 58, 78, 72, 88, 67, 91, 75, 84, 69, 93],
  void: [88, 46, 92, 54, 76, 66, 98, 61, 84, 72, 90, 58],
  divine: [77, 91, 63, 88, 95, 72, 84, 99, 69, 87, 93, 78],
  ticket: [62, 85, 44, 96, 71, 58, 90, 66, 79, 88, 53, 94],
  clay: [72, 58, 86, 44, 92, 64, 78, 50, 84, 68, 76, 60],
  lumen: [34, 52, 78, 46, 90, 64, 84, 58, 72, 42, 88, 66],
  prompt: [46, 72, 58, 88, 64, 96, 52, 76, 68, 84, 60, 92],
  neural: [70, 90, 50, 80, 60, 100, 40, 86, 74, 92, 56, 82],
};

type ChartKind = "revenue" | "benchmark" | "secondary";

const chartFamilies: Record<PageConfig["theme"], "bar" | "line" | "heatmap" | "radar" | "gauge" | "scatter" | "graph"> = {
  inzoi: "bar",
  soft: "gauge",
  electric: "line",
  premium: "radar",
  request: "scatter",
  unlock: "radar",
  confirm: "heatmap",
  filament: "heatmap",
  battery: "heatmap",
  depth: "gauge",
  void: "heatmap",
  divine: "line",
  ticket: "bar",
  clay: "scatter",
  lumen: "line",
  prompt: "bar",
  neural: "graph",
};

const styleFamilies: Record<PageConfig["theme"], "glass" | "neumorphic" | "neonLight" | "luxury" | "queue" | "security" | "industrial" | "energy" | "card" | "ticket" | "clay" | "mono"> = {
  inzoi: "glass",
  soft: "neumorphic",
  electric: "neonLight",
  premium: "luxury",
  request: "queue",
  unlock: "security",
  confirm: "neumorphic",
  filament: "industrial",
  battery: "energy",
  depth: "energy",
  void: "card",
  divine: "card",
  ticket: "ticket",
  clay: "clay",
  lumen: "mono",
  prompt: "mono",
  neural: "card",
};

const bgMove = keyframes`
  0% { background-position: 0% 28%, 100% 70%, 0% 50%; }
  100% { background-position: 22% 10%, 72% 92%, 100% 50%; }
`;

const wave = keyframes`
  0% { transform: translateX(-2%) scaleY(.82); opacity: .72; }
  50% { transform: translateX(2%) scaleY(1.08); opacity: 1; }
  100% { transform: translateX(-2%) scaleY(.82); opacity: .72; }
`;

const shine = keyframes`
  from { transform: translateX(-130%) skewX(-18deg); opacity: 0; }
  34% { opacity: .7; }
  to { transform: translateX(160%) skewX(-18deg); opacity: 0; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: .72; }
  50% { transform: scale(1.08); opacity: 1; }
`;

const chargeFlow = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 140% 50%; }
`;

const scanSweep = keyframes`
  0% { transform: translateX(-130%); opacity: 0; }
  28% { opacity: .8; }
  100% { transform: translateX(130%); opacity: 0; }
`;

const springPop = keyframes`
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-3px) scale(1.03); }
`;

const Shell = styled.main<{ $theme: PageConfig["theme"] }>`
  height: 100vh;
  width: 100%;
  overflow: hidden;
  color: var(--ink);
  background:
    radial-gradient(circle at 8% 12%, color-mix(in srgb, var(--accent-2) 42%, transparent), transparent 0 24%),
    radial-gradient(circle at 72% 4%, color-mix(in srgb, var(--accent) 28%, transparent), transparent 0 28%),
    radial-gradient(circle at 92% 84%, color-mix(in srgb, var(--accent-2) 26%, transparent), transparent 0 24%),
    linear-gradient(126deg, #fbfbff 0%, #f4f8ff 34%, #effaf5 66%, #fff6fb 100%);
  background-size: 130% 130%, 125% 125%, 120% 120%, 230% 230%;
  animation: ${bgMove} 16s cubic-bezier(.45, 0, .2, 1) infinite alternate;

  * {
    box-sizing: border-box;
  }

  button,
  input {
    font: inherit;
  }

  button {
    border: 0;
  }

  @media (max-width: 980px) {
    height: auto;
    min-height: 100vh;
    overflow: visible;
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  width: 100%;
  height: 100vh;
  min-height: 0;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    height: auto;
    min-height: 100vh;
  }
`;

const Sidebar = styled.aside`
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  min-height: 0;
  border-right: 1px solid color-mix(in srgb, var(--ink) 10%, transparent);
  padding: 14px 12px 12px;
  background:
    linear-gradient(150deg, rgba(255,255,255,.72), rgba(255,255,255,.24)),
    color-mix(in srgb, var(--accent) 7%, transparent);
  box-shadow: inset -1px 0 0 rgba(255,255,255,.38);
  backdrop-filter: blur(30px) saturate(1.22);

  @media (max-width: 980px) {
    grid-template-rows: auto auto;
    height: auto;
  }
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 10px 10px;
  border-bottom: 1px solid color-mix(in srgb, var(--ink) 9%, transparent);

  .mark {
    display: grid;
    width: 32px;
    height: 32px;
    place-items: center;
    border-radius: 12px;
    color: #fff;
    background: linear-gradient(135deg, var(--accent), var(--accent-2));
    box-shadow: 0 14px 28px color-mix(in srgb, var(--accent) 28%, transparent);
  }

  strong {
    color: var(--ink);
    font-size: 20px;
    font-weight: 920;
  }

  em {
    margin-left: 6px;
    border-radius: 999px;
    padding: 4px 8px;
    color: color-mix(in srgb, var(--ink) 60%, transparent);
    background: rgba(255,255,255,.54);
    font-size: 11px;
    font-style: normal;
    font-weight: 850;
  }
`;

const Nav = styled.nav`
  display: grid;
  align-content: start;
  gap: 3px;
  min-height: 0;
  overflow: auto;
  padding: 10px 0;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  > span {
    margin: 2px 12px 6px;
    color: color-mix(in srgb, var(--ink) 44%, transparent);
    font-size: 12px;
    font-weight: 900;
    letter-spacing: .12em;
    text-transform: uppercase;
  }
`;

const NavButton = styled.button<{ $active?: boolean }>`
  display: grid;
  grid-template-columns: 30px 1fr;
  gap: 10px;
  align-items: center;
  min-height: 32px;
  border-radius: 13px;
  padding: 0 12px;
  color: ${({ $active }) => ($active ? "var(--ink)" : "color-mix(in srgb, var(--ink) 62%, transparent)")};
  background: ${({ $active }) => ($active ? "rgba(255,255,255,.62)" : "transparent")};
  box-shadow: ${({ $active }) =>
    $active
      ? "0 16px 32px color-mix(in srgb, var(--accent) 12%, transparent), inset 0 0 0 1px rgba(255,255,255,.7)"
      : "none"};
  cursor: pointer;
  font-size: 12px;
  font-weight: ${({ $active }) => ($active ? 860 : 650)};
  text-align: left;
  transition: transform 180ms cubic-bezier(.22,1,.36,1), background-color 180ms ease, box-shadow 180ms ease;

  svg {
    width: 17px;
    height: 17px;
    justify-self: center;
  }

  &:hover {
    background: rgba(255,255,255,.48);
    transform: translateX(5px);
  }
`;

const DevCard = styled.div`
  display: grid;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 18px;
  background: rgba(255,255,255,.52);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.75), 0 22px 42px color-mix(in srgb, var(--accent) 12%, transparent);
  text-align: center;
  backdrop-filter: blur(22px);

  strong {
    font-size: 13px;
  }

  p {
    margin: 0;
    color: color-mix(in srgb, var(--ink) 56%, transparent);
    font-size: 11px;
    font-weight: 650;
    line-height: 1.25;
  }
`;

const PrimaryButton = styled.button<{ $theme?: PageConfig["theme"] }>`
  position: relative;
  min-height: 36px;
  overflow: hidden;
  border-radius: ${({ $theme }) => ($theme === "soft" || $theme === "confirm" || $theme === "clay" ? "999px" : $theme === "ticket" ? "16px 16px 16px 6px" : "13px")};
  padding: 0 18px;
  color: ${({ $theme }) => ($theme === "soft" || $theme === "confirm" || $theme === "clay" || $theme === "battery" ? "var(--ink)" : "#fff")};
  background: ${({ $theme }) =>
    $theme === "soft" || $theme === "confirm"
      ? "linear-gradient(145deg, rgba(255,255,255,.92), rgba(230,242,236,.72))"
      : $theme === "clay"
      ? "radial-gradient(circle at 20% 20%, rgba(255,255,255,.9), transparent 0 28%), linear-gradient(145deg, #fff7f2, #dff4eb)"
      : $theme === "battery"
      ? "repeating-linear-gradient(90deg, rgba(45,196,141,.22) 0 9px, rgba(255,255,255,.72) 9px 14px), linear-gradient(135deg, #effff8, #c9f7df)"
      : $theme === "ticket"
      ? "repeating-linear-gradient(90deg, rgba(255,255,255,.28) 0 2px, transparent 2px 8px), linear-gradient(135deg, var(--accent), var(--accent-2))"
      : "radial-gradient(circle at 86% 18%, rgba(255,255,255,.3), transparent 0 24%), linear-gradient(135deg, var(--accent), var(--accent-2))"};
  box-shadow: ${({ $theme }) =>
    $theme === "soft" || $theme === "confirm" || $theme === "clay"
      ? "7px 7px 18px rgba(63,90,93,.15), -7px -7px 18px rgba(255,255,255,.94), inset 0 1px 0 rgba(255,255,255,.82)"
      : "0 18px 36px color-mix(in srgb, var(--accent) 26%, transparent), inset 0 1px 0 rgba(255,255,255,.36)"};
  cursor: pointer;
  font-size: 12px;
  font-weight: 880;
  transition: transform 180ms cubic-bezier(.22,1,.36,1), filter 180ms ease;

  &::after {
    position: absolute;
    inset: 0;
    content: "";
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.38), transparent);
    animation: ${shine} 4.8s ease-in-out infinite;
  }

  &:hover {
    filter: brightness(1.04) saturate(1.08);
    transform: translateY(-4px);
  }

  &:active {
    transform: translateY(-1px) scale(.96);
  }
`;

const UserPlan = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 10px 6px 0;

  .avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background:
      radial-gradient(circle at 50% 32%, #ffe2d9 0 15%, transparent 16%),
      linear-gradient(135deg, var(--accent), var(--accent-2));
    box-shadow: inset 0 0 0 3px rgba(255,255,255,.8);
  }

  span,
  strong {
    display: block;
  }

  span {
    color: color-mix(in srgb, var(--ink) 46%, transparent);
    font-size: 11px;
    font-weight: 900;
  }

  strong {
    margin-top: 3px;
    color: var(--ink);
    font-size: 14px;
  }
`;

const Content = styled.section`
  display: grid;
  grid-template-rows: auto auto auto minmax(0, 1fr);
  gap: 8px;
  min-width: 0;
  min-height: 0;
  padding: 12px 18px 12px 22px;
  overflow: hidden;

  @media (max-width: 980px) {
    overflow: visible;
    padding: 22px 16px;
  }
`;

const Topbar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;

  h1 {
    margin: 0;
    color: var(--ink);
    font-size: clamp(28px, 2.4vw, 38px);
    font-weight: 940;
    letter-spacing: 0;
    line-height: .92;
  }

  .tools {
    display: flex;
    gap: 10px;
  }
`;

const SearchBox = styled.div`
  display: flex;
  width: min(330px, 100%);
  min-height: 40px;
  align-items: center;
  gap: 9px;
  border-radius: 999px;
  padding: 0 15px;
  color: var(--ink);
  background: rgba(255,255,255,.54);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.68), 0 16px 34px rgba(0,0,0,.06);
  backdrop-filter: blur(22px);

  input {
    width: 100%;
    border: 0;
    outline: 0;
    color: inherit;
    background: transparent;
    font-size: 14px;
    font-weight: 700;
  }
`;

const IconButton = styled.button`
  display: grid;
  width: 40px;
  height: 40px;
  place-items: center;
  border-radius: 15px;
  color: var(--ink);
  background: rgba(255,255,255,.52);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.64), 0 14px 28px rgba(0,0,0,.06);
  cursor: pointer;
  transition: transform 160ms cubic-bezier(.22,1,.36,1), background-color 160ms ease;

  &:hover {
    background: rgba(255,255,255,.78);
    transform: translateY(-3px) rotate(3deg);
  }
`;

const HeroStats = styled.div`
  display: grid;
  grid-template-columns: minmax(280px, .82fr) repeat(3, minmax(150px, .32fr));
  gap: 14px;
  align-items: end;

  @media (max-width: 1180px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const CreditHeadline = styled.div`
  padding-left: clamp(0px, 1.2vw, 20px);

  strong {
    display: block;
    color: var(--accent);
    font-size: clamp(28px, 3vw, 44px);
    font-weight: 960;
    line-height: .95;
    text-shadow: 0 12px 28px color-mix(in srgb, var(--accent) 18%, transparent);
  }

  span {
    display: block;
    margin-top: 5px;
    color: color-mix(in srgb, var(--ink) 54%, transparent);
    font-size: 14px;
    font-weight: 720;
  }
`;

const StatBlock = styled.div`
  position: relative;
  min-width: 0;
  padding: 3px 0;

  .eyebrow {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;
    color: color-mix(in srgb, var(--ink) 48%, transparent);
    font-size: 12px;
    font-weight: 720;
  }

  strong {
    display: flex;
    align-items: baseline;
    gap: 8px;
    color: var(--ink);
    font-size: clamp(22px, 2.2vw, 34px);
    font-weight: 760;
    line-height: .95;
    white-space: nowrap;
  }

  small {
    color: color-mix(in srgb, var(--ink) 54%, transparent);
    font-size: 13px;
    font-weight: 700;
  }

  .label {
    display: block;
    margin-top: 4px;
    color: color-mix(in srgb, var(--ink) 60%, transparent);
    font-size: 13px;
    font-weight: 720;
  }

  .bar {
    position: absolute;
    top: -10px;
    left: 0;
    width: 132px;
    height: 5px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--ink) 10%, transparent);
  }

  .bar::before {
    display: block;
    width: 72%;
    height: 100%;
    content: "";
    border-radius: inherit;
    background: color-mix(in srgb, var(--ink) 72%, transparent);
  }
`;

const MidGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.12fr) minmax(300px, .88fr);
  gap: 14px;
  min-height: 104px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Banner = styled.div<{ $theme: PageConfig["theme"] }>`
  position: relative;
  min-height: 104px;
  overflow: hidden;
  border-radius: 24px;
  background:
    radial-gradient(circle at 86% 20%, rgba(255,255,255,.34), transparent 0 22%),
    linear-gradient(100deg, color-mix(in srgb, var(--accent) 78%, transparent), color-mix(in srgb, var(--accent-2) 56%, transparent)),
    rgba(255,255,255,.3);
  box-shadow: 0 24px 52px color-mix(in srgb, var(--accent) 16%, transparent), inset 0 1px 0 rgba(255,255,255,.48);
  backdrop-filter: blur(22px) saturate(1.18);

  &::before {
    position: absolute;
    inset: 0;
    content: "";
    background:
      repeating-linear-gradient(100deg, rgba(255,255,255,.16) 0 2px, transparent 2px 34px),
      radial-gradient(circle at 20% 80%, rgba(255,255,255,.2), transparent 0 30%);
    opacity: .65;
  }

  h2 {
    position: absolute;
    z-index: 1;
    left: 30px;
    top: 15px;
    max-width: 520px;
    margin: 0;
    color: rgba(255,255,255,.62);
    font-size: clamp(28px, 3.6vw, 48px);
    font-style: ${({ $theme }) => ($theme === "premium" || $theme === "inzoi" ? "italic" : "normal")};
    font-weight: 950;
    letter-spacing: 0;
    line-height: .78;
    text-transform: uppercase;
  }

  .copy {
    position: absolute;
    right: 16px;
    bottom: 10px;
    left: 42px;
    z-index: 2;
    display: flex;
    min-height: 38px;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    padding: 8px 12px 8px 18px;
    color: #fff;
    background: color-mix(in srgb, var(--accent) 72%, rgba(0,0,0,.2));
    box-shadow: inset 0 1px 0 rgba(255,255,255,.24);
    backdrop-filter: blur(18px);
  }

  .copy span {
    font-size: 12px;
    font-weight: 720;
    line-height: 1.3;
  }
`;

const ActionStack = styled.div`
  display: grid;
  gap: 8px;
`;

const WideAction = styled.button<{ $primary?: boolean; $theme?: PageConfig["theme"]; $family?: (typeof styleFamilies)[PageConfig["theme"]] }>`
  position: relative;
  min-height: 48px;
  overflow: hidden;
  border-radius: ${({ $theme }) => ($theme === "soft" || $theme === "confirm" || $theme === "clay" ? "999px" : $theme === "ticket" ? "24px 24px 24px 8px" : "20px")};
  color: ${({ $primary, $theme }) => ($primary && !["soft", "confirm", "clay", "battery"].includes($theme || "") ? "#fff" : "var(--ink)")};
  background: ${({ $primary, $theme, $family }) =>
    $family === "neumorphic"
      ? $primary
        ? "linear-gradient(145deg, rgba(255,255,255,.96), rgba(206,244,222,.78))"
        : "linear-gradient(145deg, #dfe8e3, #f8fffb)"
      : $theme === "clay"
      ? $primary
        ? "radial-gradient(circle at 12% 18%, rgba(255,255,255,.88), transparent 0 24%), linear-gradient(135deg, #fce7f3, #d1fae5)"
        : "linear-gradient(145deg, #fff7f2, #dff4eb)"
      : $theme === "battery"
      ? $primary
        ? "repeating-linear-gradient(90deg, rgba(45,196,141,.28) 0 10px, rgba(255,255,255,.72) 10px 16px), linear-gradient(135deg, #effff8, #c7f9df)"
        : "linear-gradient(145deg, #f6fffb, #d7f5e7)"
      : $theme === "ticket"
      ? $primary
        ? "repeating-linear-gradient(90deg, rgba(255,255,255,.26) 0 3px, transparent 3px 9px), linear-gradient(135deg, var(--accent), var(--accent-2))"
        : "repeating-linear-gradient(90deg, rgba(47,36,65,.12) 0 2px, transparent 2px 10px), linear-gradient(135deg, #fff, #fff1bf)"
      : $theme === "prompt" || $theme === "lumen"
      ? $primary
        ? "linear-gradient(135deg, #202124, #6c6f75)"
        : "linear-gradient(145deg, #ffffff, #dfe1e5)"
      : $primary
      ? "radial-gradient(circle at 88% 24%, rgba(255,255,255,.25), transparent 0 24%), linear-gradient(135deg, var(--accent), var(--accent-2))"
      : "rgba(255,255,255,.58)"};
  box-shadow: ${({ $primary, $family }) =>
    $family === "neumorphic" || $family === "clay"
      ? $primary
        ? "9px 9px 22px rgba(63,90,93,.16), -9px -9px 22px rgba(255,255,255,.92), inset 0 1px 0 rgba(255,255,255,.86)"
        : "inset 6px 6px 14px rgba(65,86,88,.13), inset -6px -6px 14px rgba(255,255,255,.9)"
      : $primary
      ? "0 22px 48px color-mix(in srgb, var(--accent) 28%, transparent), inset 0 1px 0 rgba(255,255,255,.42)"
      : "0 20px 44px rgba(0,0,0,.08), inset 0 1px 0 rgba(255,255,255,.82)"};
  backdrop-filter: blur(24px) saturate(1.2);
  cursor: pointer;
  font-size: clamp(16px, 1.45vw, 21px);
  font-weight: 760;
  transition: transform 180ms cubic-bezier(.22,1,.36,1), box-shadow 180ms ease;

  &::after {
    position: absolute;
    inset: 0;
    content: "";
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.36), transparent);
    animation: ${shine} 5.2s ease-in-out infinite;
  }

  &:hover {
    transform: translateY(-5px);
  }

  &:active {
    transform: translateY(-1px) scale(.99);
  }
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(320px, .52fr);
  gap: 18px;
  min-height: 0;

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.section<{ $family?: (typeof styleFamilies)[PageConfig["theme"]] }>`
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  min-height: 0;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--ink) 10%, transparent);
  border-radius: 24px;
  padding: 10px;
  background:
    ${({ $family }) =>
      $family === "neumorphic" || $family === "clay"
        ? "linear-gradient(145deg, #eef5f1, #dce8e2)"
        : $family === "ticket"
        ? "repeating-linear-gradient(90deg, rgba(47,36,65,.08) 0 2px, transparent 2px 12px), linear-gradient(150deg, rgba(255,255,255,.82), rgba(255,248,218,.48))"
        : $family === "energy"
        ? "repeating-linear-gradient(90deg, rgba(45,196,141,.08) 0 2px, transparent 2px 26px), linear-gradient(150deg, rgba(255,255,255,.82), rgba(218,250,239,.52))"
        : $family === "industrial"
        ? "linear-gradient(150deg, rgba(255,250,240,.84), rgba(255,231,203,.48))"
        : $family === "card"
        ? "linear-gradient(150deg, rgba(255,255,255,.82), color-mix(in srgb, var(--accent-2) 20%, rgba(255,255,255,.42)))"
        : "linear-gradient(150deg, rgba(255,255,255,.78), rgba(255,255,255,.46) 48%, color-mix(in srgb, var(--accent-2) 16%, rgba(255,255,255,.22)))"};
  box-shadow: ${({ $family }) =>
    $family === "neumorphic" || $family === "clay"
      ? "inset 6px 6px 14px rgba(65,86,88,.12), inset -7px -7px 16px rgba(255,255,255,.86), 0 18px 38px rgba(56,91,96,.12)"
      : "0 24px 54px rgba(0,0,0,.08), inset 0 1px 0 rgba(255,255,255,.75)"};
  backdrop-filter: blur(26px) saturate(1.2);

  > header {
    display: flex;
    align-items: start;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 6px;
  }

  h2 {
    margin: 0;
    color: var(--ink);
    font-size: clamp(18px, 1.45vw, 23px);
    font-weight: 880;
    letter-spacing: 0;
  }

  p {
    margin: 4px 0 0;
    color: color-mix(in srgb, var(--ink) 64%, transparent);
    font-size: 12px;
    font-weight: 650;
    line-height: 1.42;
  }
`;

const InfoLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(190px, .42fr) minmax(0, 1fr);
  gap: 16px;
  min-height: 0;
  height: 100%;

  > * {
    min-width: 0;
  }
`;

const CharacterCard = styled.div<{ $theme: PageConfig["theme"] }>`
  position: relative;
  min-height: 0;
  height: 100%;
  overflow: hidden;
  border-radius: 26px;
  background:
    radial-gradient(circle at 50% 18%, #ffe1d6 0 7%, transparent 8%),
    linear-gradient(180deg, color-mix(in srgb, var(--accent) 18%, #24242a), color-mix(in srgb, var(--accent-2) 24%, #111));
  box-shadow: inset 0 1px 0 rgba(255,255,255,.4), 0 20px 42px color-mix(in srgb, var(--accent) 14%, transparent);
  transition: transform 220ms cubic-bezier(.22,1,.36,1), box-shadow 220ms ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.48), 0 28px 56px color-mix(in srgb, var(--accent) 22%, transparent);
  }

  &::before {
    position: absolute;
    left: 50%;
    top: 54px;
    width: 160px;
    height: 292px;
    content: "";
    border-radius: ${({ $theme }) => ($theme === "void" || $theme === "neural" ? "22px" : "78px 78px 28px 28px")};
    background:
      ${({ $theme }) =>
        $theme === "battery"
          ? "repeating-linear-gradient(180deg, #85ffdb 0 18px, #101412 18px 28px)"
          : $theme === "electric"
          ? "linear-gradient(135deg, #5eeabd, #9a4df1 52%, #03081b)"
          : $theme === "clay"
          ? "linear-gradient(135deg, #e11d48, #10b981 48%, #8b5cf6)"
          : $theme === "lumen"
          ? "linear-gradient(180deg, #ffffff, #505050 50%, #0a0a0a)"
          : "radial-gradient(circle at 50% 12%, #ffd7ca 0 15%, transparent 16%), linear-gradient(180deg, var(--accent) 0 20%, var(--accent-2) 21% 58%, #2b2f37 59%)"};
    box-shadow: inset 0 0 0 1px rgba(255,255,255,.28), 0 18px 34px rgba(0,0,0,.18);
    transform: translateX(-50%);
    animation: ${float} 5s ease-in-out infinite;
  }

  .glass-caption {
    position: absolute;
    right: 0;
    bottom: 78px;
    left: 0;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 16px;
    min-height: 78px;
    align-items: center;
    padding: 15px 18px;
    color: #fff;
    background: rgba(48, 40, 45, .42);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.26), 0 -18px 40px rgba(255,255,255,.12);
    backdrop-filter: blur(20px) saturate(1.2);
  }

  .glass-caption strong {
    display: block;
    font-size: 18px;
    font-weight: 850;
  }

  .glass-caption span {
    display: block;
    margin-top: 6px;
    color: rgba(255,255,255,.72);
    font-size: 14px;
    font-weight: 650;
  }

  .stats {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    padding: 12px 18px 14px;
    background: color-mix(in srgb, var(--accent-2) 16%, rgba(255,255,255,.72));
    backdrop-filter: blur(18px);
  }

  .stats span {
    color: color-mix(in srgb, var(--ink) 55%, transparent);
    font-size: 14px;
    font-weight: 720;
  }

  .stats strong {
    display: block;
    margin-top: 6px;
    color: var(--ink);
    font-size: 24px;
  }
`;

const ThemeStage = styled.div<{ $display: (typeof themeModes)[PageConfig["theme"]]["display"]; $texture: (typeof themeModes)[PageConfig["theme"]]["texture"]; $family?: (typeof styleFamilies)[PageConfig["theme"]] }>`
  position: relative;
  display: grid;
  min-height: 268px;
  height: 100%;
  overflow: hidden;
  border-radius: 26px;
  padding: 16px;
  background:
    ${({ $texture, $family }) =>
      $family === "neumorphic"
        ? "radial-gradient(circle at 24% 22%, rgba(255,255,255,.96), transparent 0 20%), linear-gradient(145deg, #f7fffb, #dce8e2)"
        : $family === "clay"
        ? "radial-gradient(circle at 20% 24%, rgba(244,114,182,.28), transparent 0 22%), linear-gradient(145deg, #fff8f2, #d9f3ea)"
        : $texture === "foam"
        ? "radial-gradient(circle at 24% 22%, rgba(255,255,255,.92), transparent 0 20%), linear-gradient(145deg, rgba(244,255,249,.82), rgba(200,245,225,.5))"
        : $texture === "arc"
        ? "repeating-linear-gradient(125deg, rgba(94,234,189,.18) 0 2px, transparent 2px 24px), linear-gradient(145deg, rgba(240,255,250,.95), rgba(228,220,255,.72))"
        : $texture === "velvet"
        ? "radial-gradient(circle at 70% 20%, rgba(247,230,161,.48), transparent 0 24%), linear-gradient(145deg, rgba(255,255,255,.72), rgba(196,84,142,.28))"
        : $texture === "steel"
        ? "linear-gradient(145deg, rgba(255,255,255,.76), rgba(172,190,198,.46)), repeating-linear-gradient(90deg, rgba(30,40,45,.08) 0 1px, transparent 1px 12px)"
        : $texture === "amber"
        ? "radial-gradient(circle at 50% 16%, rgba(255,136,0,.34), transparent 0 24%), linear-gradient(145deg, rgba(255,248,236,.96), rgba(255,221,184,.76))"
        : $texture === "circuit"
        ? "repeating-linear-gradient(90deg, rgba(45,196,141,.16) 0 2px, transparent 2px 28px), linear-gradient(145deg, rgba(240,255,250,.96), rgba(198,245,225,.72))"
        : $texture === "void"
        ? "radial-gradient(circle at 74% 20%, rgba(255,0,85,.22), transparent 0 22%), linear-gradient(145deg, rgba(242,253,255,.96), rgba(255,218,232,.72))"
        : $texture === "gold"
        ? "radial-gradient(circle at 50% 22%, rgba(255,215,0,.36), transparent 0 28%), linear-gradient(145deg, rgba(255,250,230,.96), rgba(255,218,174,.72))"
        : $texture === "ticket"
        ? "radial-gradient(circle at 20% 22%, rgba(255,215,0,.32), transparent 0 20%), linear-gradient(135deg, rgba(250,245,255,.96), rgba(236,218,255,.72))"
        : $texture === "clay"
        ? "radial-gradient(circle at 20% 24%, rgba(244,114,182,.45), transparent 0 22%), linear-gradient(145deg, rgba(255,248,242,.9), rgba(191,238,221,.7))"
        : $texture === "beam"
        ? "repeating-linear-gradient(90deg, rgba(0,0,0,.08) 0 2px, transparent 2px 22px), linear-gradient(145deg, rgba(255,255,255,.96), rgba(221,224,228,.78))"
        : $texture === "console"
        ? "linear-gradient(145deg, rgba(255,255,255,.96), rgba(218,220,224,.78)), repeating-linear-gradient(0deg, rgba(0,0,0,.05) 0 1px, transparent 1px 18px)"
        : $texture === "card"
        ? "radial-gradient(circle at 60% 18%, rgba(212,181,255,.32), transparent 0 26%), linear-gradient(145deg, rgba(252,248,255,.96), rgba(226,210,255,.78))"
        : "radial-gradient(circle at 50% 18%, #ffe1d6 0 7%, transparent 8%), linear-gradient(180deg, color-mix(in srgb, var(--accent) 18%, #24242a), color-mix(in srgb, var(--accent-2) 24%, #111))"};
  box-shadow: ${({ $family }) =>
    $family === "neumorphic" || $family === "clay"
      ? "inset 6px 6px 14px rgba(65,86,88,.13), inset -7px -7px 16px rgba(255,255,255,.9), 0 18px 34px rgba(56,91,96,.12)"
      : "inset 0 1px 0 rgba(255,255,255,.54), 0 20px 42px color-mix(in srgb, var(--accent) 16%, transparent)"};
  backdrop-filter: blur(24px) saturate(1.22);
  transition: transform 220ms cubic-bezier(.22,1,.36,1), box-shadow 220ms ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.52), 0 30px 58px color-mix(in srgb, var(--accent) 24%, transparent);
  }

  &::before {
    position: absolute;
    inset: ${({ $display }) => ($display === "ticket" ? "16px 34px" : "auto auto 42px 50%")};
    width: ${({ $display }) => ($display === "battery" ? "116px" : $display === "ticket" ? "auto" : $display === "vault" ? "154px" : "148px")};
    height: ${({ $display }) => ($display === "battery" ? "190px" : $display === "ticket" ? "auto" : $display === "prompt" ? "145px" : "198px")};
    content: "";
    border-radius: ${({ $display }) =>
      $display === "void" || $display === "neural" || $display === "ticket"
        ? "22px"
        : $display === "battery"
        ? "22px 22px 34px 34px"
        : $display === "vault"
        ? "50% 50% 28px 28px"
        : "78px 78px 28px 28px"};
    background:
      ${({ $display }) =>
        $display === "battery"
          ? "repeating-linear-gradient(180deg, #85ffdb 0 18px, #101412 18px 28px)"
        : $display === "neon"
          ? "linear-gradient(135deg, #5eeabd, #9a4df1 52%, #effcff)"
          : $display === "soft"
          ? "radial-gradient(circle at 50% 50%, rgba(255,255,255,.94), rgba(203,247,226,.82) 42%, rgba(129,225,176,.68))"
          : $display === "luxury"
          ? "linear-gradient(135deg, #f7e6a1, #c4548e 52%, #2c1630)"
          : $display === "queue"
          ? "linear-gradient(135deg, #6b3bd3 0 32%, #ff8800 33% 66%, #0fb4c6)"
          : $display === "vault"
          ? "radial-gradient(circle at 50% 34%, #ffcd58 0 16%, transparent 17%), linear-gradient(180deg, #eef7fa 0 20%, #7a929d 21% 58%, #30424a 59%)"
        : $display === "filament"
          ? "radial-gradient(circle at 50% 18%, #fff7b0 0 13%, transparent 14%), linear-gradient(180deg, #ff8800, #fff1dc)"
          : $display === "clay"
          ? "linear-gradient(135deg, #e11d48, #10b981 48%, #8b5cf6)"
        : $display === "lumen"
          ? "linear-gradient(180deg, #ffffff, #d8d8d8 50%, #f7f7f7)"
        : $display === "prompt"
          ? "linear-gradient(180deg, #ffffff, #cfcfcf)"
          : "radial-gradient(circle at 50% 12%, #ffd7ca 0 15%, transparent 16%), linear-gradient(180deg, var(--accent) 0 20%, var(--accent-2) 21% 58%, #2b2f37 59%)"};
    box-shadow: inset 0 0 0 1px rgba(255,255,255,.28), 0 18px 34px rgba(0,0,0,.18), 0 0 30px color-mix(in srgb, var(--accent) 28%, transparent);
    transform: ${({ $display }) => ($display === "ticket" ? "none" : "translateX(-50%)")};
    animation: ${float} 5s ease-in-out infinite;
  }

  &::after {
    position: absolute;
    inset: 0;
    content: "";
    background:
      ${({ $display }) =>
        $display === "neon" || $display === "void" || $display === "neural"
          ? "linear-gradient(115deg, transparent, rgba(255,255,255,.18), transparent)"
          : $display === "ticket"
          ? "repeating-linear-gradient(90deg, rgba(255,255,255,.72) 0 3px, transparent 3px 8px)"
          : $display === "prompt"
          ? "repeating-linear-gradient(0deg, rgba(255,255,255,.06) 0 1px, transparent 1px 15px)"
          : "radial-gradient(circle at 30% 18%, rgba(255,255,255,.34), transparent 0 18%)"};
    opacity: ${({ $display }) => ($display === "ticket" ? ".18" : ".64")};
    animation: ${shine} 5.6s ease-in-out infinite;
  }
`;

const StageCaption = styled.div`
  position: absolute;
  right: 0;
  bottom: 78px;
  left: 0;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 14px;
  min-height: 56px;
  align-items: center;
  padding: 14px 18px;
  color: #fff;
  background: rgba(32, 30, 36, .42);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.26), 0 -18px 40px rgba(255,255,255,.12);
  backdrop-filter: blur(20px) saturate(1.2);

  strong {
    display: block;
    font-size: 18px;
    font-weight: 850;
    line-height: 1.05;
  }

  span {
    display: block;
    margin-top: 6px;
    color: rgba(255,255,255,.72);
    font-size: 13px;
    font-weight: 650;
  }
`;

const StageStats = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  padding: 12px 18px 14px;
  background: color-mix(in srgb, var(--accent-2) 16%, rgba(255,255,255,.72));
  backdrop-filter: blur(18px);

  span {
    color: color-mix(in srgb, var(--ink) 55%, transparent);
    font-size: 13px;
    font-weight: 720;
  }

  strong {
    display: block;
    margin-top: 5px;
    color: var(--ink);
    font-size: 23px;
  }
`;

const StageChipRail = styled.div`
  position: absolute;
  z-index: 3;
  top: 16px;
  left: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  span {
    border-radius: 999px;
    padding: 7px 10px;
    color: var(--ink);
    background: rgba(255,255,255,.48);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.72);
    backdrop-filter: blur(16px);
    font-size: 11px;
    font-weight: 900;
  }
`;

const StageGlyph = styled.div<{ $display: (typeof themeModes)[PageConfig["theme"]]["display"] }>`
  position: absolute;
  z-index: 3;
  top: 18px;
  right: 18px;
  display: grid;
  width: 46px;
  height: 46px;
  place-items: center;
  border-radius: ${({ $display }) => ($display === "soft" || $display === "clay" ? "50%" : "15px")};
  color: ${({ $display }) => ($display === "neon" || $display === "void" || $display === "prompt" || $display === "neural" ? "#fff" : "var(--ink)")};
  background: ${({ $display }) =>
    $display === "soft"
      ? "rgba(255,255,255,.82)"
      : $display === "prompt"
      ? "rgba(0,0,0,.42)"
      : "color-mix(in srgb, var(--accent) 22%, rgba(255,255,255,.62))"};
  box-shadow: inset 0 1px 0 rgba(255,255,255,.64), 0 15px 28px color-mix(in srgb, var(--accent) 20%, transparent);
`;

const Charts = styled.div`
  display: grid;
  grid-template-rows: minmax(188px, 1.45fr) minmax(126px, .9fr);
  gap: 8px;
  min-height: 0;
  min-width: 0;
`;

const ChartCard = styled.div<{ $family?: (typeof styleFamilies)[PageConfig["theme"]] }>`
  position: relative;
  min-height: 0;
  border-radius: 24px;
  padding: 12px;
  background: ${({ $family }) =>
    $family === "neumorphic" || $family === "clay"
      ? "linear-gradient(145deg, #f8fffb, #dfece6)"
      : $family === "mono"
      ? "linear-gradient(145deg, rgba(255,255,255,.88), rgba(214,216,219,.58))"
      : "color-mix(in srgb, rgba(255,255,255,.72) 84%, var(--accent-2))"};
  box-shadow: ${({ $family }) =>
    $family === "neumorphic" || $family === "clay"
      ? "8px 8px 22px rgba(63,90,93,.12), -8px -8px 22px rgba(255,255,255,.9), inset 0 1px 0 rgba(255,255,255,.82)"
      : "inset 0 1px 0 rgba(255,255,255,.85), 0 18px 34px rgba(0,0,0,.06)"};
  backdrop-filter: blur(22px);

  > header {
    position: relative;
    z-index: 2;
  }

  > [role="img"] {
    position: absolute;
    right: 12px;
    bottom: 12px;
    left: 12px;
    top: 42px;
  }

  h3 {
    margin: 0;
    color: var(--ink);
    font-size: 17px;
    font-weight: 850;
  }
`;

const Bars = styled.div`
  display: flex;
  height: 70px;
  align-items: end;
  gap: 6px;
  margin-top: 16px;
  border-bottom: 1px dashed color-mix(in srgb, var(--ink) 14%, transparent);

  span {
    flex: 1;
    min-width: 5px;
    height: var(--h);
    border-radius: 999px 999px 3px 3px;
    background: linear-gradient(180deg, var(--accent), color-mix(in srgb, var(--accent) 10%, transparent));
    box-shadow: 0 0 14px color-mix(in srgb, var(--accent) 18%, transparent);
    transition: transform 160ms cubic-bezier(.22,1,.36,1), filter 160ms ease;
  }

  span:hover {
    filter: brightness(1.08);
    transform: translateY(-7px);
  }
`;

const VisualChart = styled.div<{ $chart: (typeof themeModes)[PageConfig["theme"]]["chart"] }>`
  position: relative;
  height: 76px;
  margin-top: 12px;
  overflow: hidden;
  border-radius: 18px;
  background: ${({ $chart }) =>
    $chart === "terminal"
      ? "rgba(0,0,0,.34)"
      : $chart === "cards"
      ? "linear-gradient(135deg, rgba(0,0,0,.22), color-mix(in srgb, var(--accent) 18%, transparent))"
      : "color-mix(in srgb, var(--accent-2) 14%, rgba(255,255,255,.42))"};

  &[data-chart="bars"] {
    display: flex;
    align-items: end;
    gap: 6px;
    padding: 12px 12px 0;
    border-bottom: 1px dashed color-mix(in srgb, var(--ink) 14%, transparent);
  }

  &[data-chart="bars"] span {
    flex: 1;
    min-width: 4px;
    height: var(--h);
    border-radius: 999px 999px 3px 3px;
    background: linear-gradient(180deg, var(--accent), color-mix(in srgb, var(--accent) 12%, transparent));
    box-shadow: 0 0 14px color-mix(in srgb, var(--accent) 22%, transparent);
  }

  &[data-chart="cells"] {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 7px;
    padding: 10px;
  }

  &[data-chart="cells"] span {
    border-radius: 10px;
    background: color-mix(in srgb, var(--accent) var(--h), rgba(255,255,255,.2));
    box-shadow: inset 0 1px 0 rgba(255,255,255,.36), 0 0 14px color-mix(in srgb, var(--accent) 16%, transparent);
  }

  &[data-chart="bubbles"] span {
    position: absolute;
    left: var(--x);
    top: var(--y);
    width: var(--s);
    height: var(--s);
    border-radius: 50%;
    background: color-mix(in srgb, var(--accent) var(--h), var(--accent-2));
    box-shadow: inset 0 1px 0 rgba(255,255,255,.58), 0 0 22px color-mix(in srgb, var(--accent) 24%, transparent);
    animation: ${pulse} calc(3s + var(--i) * .18s) ease-in-out infinite;
  }

  &[data-chart="rings"] {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    place-items: center;
    gap: 8px;
    padding: 10px;
  }

  &[data-chart="rings"] span {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: conic-gradient(var(--accent) var(--h), rgba(255,255,255,.24) 0);
    box-shadow: inset 0 0 0 9px color-mix(in srgb, var(--accent-2) 12%, rgba(255,255,255,.5));
  }

  &[data-chart="heat"] {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 5px;
    padding: 10px;
  }

  &[data-chart="heat"] span {
    border-radius: 999px;
    background: linear-gradient(180deg, color-mix(in srgb, var(--accent) var(--h), #fff2b8), color-mix(in srgb, var(--accent-2) 44%, #3b1300));
    filter: saturate(1.12);
  }

  &[data-chart="wave"]::before,
  &[data-chart="wave"]::after {
    position: absolute;
    right: -8%;
    left: -8%;
    height: 56px;
    content: "";
    border-radius: 50%;
    border-top: 3px solid color-mix(in srgb, var(--accent) 78%, transparent);
    top: 22px;
    animation: ${wave} 3.4s ease-in-out infinite;
  }

  &[data-chart="wave"]::after {
    top: 36px;
    border-color: color-mix(in srgb, var(--accent-2) 78%, transparent);
    animation-delay: -.9s;
  }

  &[data-chart="scan"] {
    background:
      repeating-linear-gradient(90deg, color-mix(in srgb, var(--accent) 70%, transparent) 0 3px, transparent 3px 10px),
      color-mix(in srgb, var(--accent-2) 16%, rgba(255,255,255,.42));
  }

  &[data-chart="scan"]::after {
    position: absolute;
    inset: 0;
    content: "";
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.58), transparent);
    animation: ${shine} 2.8s ease-in-out infinite;
  }

  &[data-chart="swatches"] {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px;
  }

  &[data-chart="swatches"] span {
    flex: 1;
    height: var(--h);
    min-height: 28px;
    border-radius: 18px;
    background: hsl(calc(var(--i) * 32deg), 78%, 62%);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.48);
  }

  &[data-chart="terminal"] {
    display: grid;
    gap: 7px;
    padding: 12px;
  }

  &[data-chart="terminal"] span {
    height: 8px;
    width: var(--h);
    border-radius: 999px;
    background: color-mix(in srgb, var(--accent) 66%, #fff);
    box-shadow: 0 0 14px color-mix(in srgb, var(--accent) 26%, transparent);
  }

  &[data-chart="cards"] {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 7px;
    padding: 10px;
  }

  &[data-chart="cards"] span {
    border-radius: 9px;
    background:
      linear-gradient(135deg, rgba(255,255,255,.18), transparent),
      linear-gradient(145deg, color-mix(in srgb, var(--accent) var(--h), #111), color-mix(in srgb, var(--accent-2) 46%, #050505));
    box-shadow: inset 0 1px 0 rgba(255,255,255,.28);
  }
`;

const MiniGrid = styled.div`
  display: grid;
  grid-template-columns: .9fr 1fr;
  gap: 8px;
  min-height: 0;
`;

const OriginalDock = styled.div<{ $theme: PageConfig["theme"]; $family: (typeof styleFamilies)[PageConfig["theme"]]; $compact?: boolean }>`
  ${({ $compact }) =>
    $compact
      ? `
  position: absolute;
  z-index: 4;
  right: 12px;
  bottom: 70px;
  left: 12px;
`
      : ""}
  display: grid;
  grid-template-columns: ${({ $compact }) => ($compact ? "minmax(86px, 1fr) repeat(2, minmax(52px, .62fr))" : "minmax(168px, 1.08fr) repeat(3, minmax(72px, .66fr))")};
  gap: ${({ $compact }) => ($compact ? "6px" : "10px")};
  height: ${({ $compact }) => ($compact ? "42px" : "48px")};
  min-height: 0;
  border-radius: ${({ $theme }) => ($theme === "ticket" ? "22px 22px 22px 8px" : $theme === "soft" || $theme === "confirm" || $theme === "clay" ? "28px" : "22px")};
  padding: ${({ $compact }) => ($compact ? "6px" : "8px")};
  background: ${({ $theme, $family }) =>
    $family === "neumorphic"
      ? "linear-gradient(145deg, #dfe8e3, #f8fffb)"
      : $theme === "clay"
      ? "radial-gradient(circle at 18% 22%, rgba(244,114,182,.32), transparent 0 24%), linear-gradient(145deg, #fff7f2, #dff4eb)"
      : $theme === "battery"
      ? "repeating-linear-gradient(90deg, rgba(45,196,141,.16) 0 2px, transparent 2px 22px), linear-gradient(145deg, #f6fffb, #d6f7e8)"
      : $theme === "ticket"
      ? "repeating-linear-gradient(90deg, rgba(47,36,65,.12) 0 2px, transparent 2px 10px), linear-gradient(135deg, #fff, #fff2c6)"
      : $theme === "prompt"
      ? "linear-gradient(145deg, #ffffff, #dfe1e5)"
      : $theme === "lumen"
      ? "repeating-linear-gradient(90deg, rgba(0,0,0,.08) 0 2px, transparent 2px 22px), linear-gradient(145deg, #fff, #e5e7eb)"
      : "linear-gradient(145deg, rgba(255,255,255,.76), color-mix(in srgb, var(--accent-2) 20%, rgba(255,255,255,.42)))"};
  box-shadow: ${({ $family }) =>
    $family === "neumorphic" || $family === "clay"
      ? "inset 6px 6px 14px rgba(65,86,88,.13), inset -7px -7px 16px rgba(255,255,255,.92)"
      : "inset 0 1px 0 rgba(255,255,255,.78), 0 16px 30px rgba(0,0,0,.05)"};
  backdrop-filter: blur(20px) saturate(1.18);

  .signature {
    position: relative;
    min-width: 0;
    overflow: hidden;
    border-radius: ${({ $theme }) => ($theme === "soft" || $theme === "confirm" || $theme === "clay" ? "999px" : "16px")};
    background: rgba(255,255,255,.52);
    box-shadow: ${({ $family }) =>
      $family === "neumorphic" || $family === "clay"
        ? "7px 7px 18px rgba(63,90,93,.13), -7px -7px 18px rgba(255,255,255,.9), inset 0 1px 0 rgba(255,255,255,.82)"
        : "inset 0 1px 0 rgba(255,255,255,.76), 0 12px 24px color-mix(in srgb, var(--accent) 12%, transparent)"};
  }

  .theme-button {
    position: relative;
    overflow: hidden;
    border-radius: ${({ $theme }) => ($theme === "soft" || $theme === "confirm" || $theme === "clay" ? "999px" : $theme === "ticket" ? "14px 14px 14px 5px" : "15px")};
    color: ${({ $theme }) => ($theme === "prompt" ? "#fff" : "var(--ink)")};
    background: ${({ $theme, $family }) =>
      $family === "neumorphic" || $family === "clay"
        ? "linear-gradient(145deg, rgba(255,255,255,.92), rgba(236,246,241,.72))"
        : $theme === "prompt"
        ? "linear-gradient(135deg, #202124, #6b6f76)"
        : $theme === "ticket"
        ? "linear-gradient(135deg, #fff, #fff0b6)"
        : "color-mix(in srgb, var(--accent) 14%, rgba(255,255,255,.68))"};
    box-shadow: ${({ $family }) =>
      $family === "neumorphic" || $family === "clay"
        ? "6px 6px 15px rgba(63,90,93,.14), -6px -6px 15px rgba(255,255,255,.92)"
        : "inset 0 1px 0 rgba(255,255,255,.62), 0 12px 22px color-mix(in srgb, var(--accent) 12%, transparent)"};
    cursor: pointer;
    font-size: ${({ $compact }) => ($compact ? "10px" : "12px")};
    font-weight: 930;
    transition: transform 190ms cubic-bezier(.68,-.55,.27,1.55), box-shadow 190ms ease, filter 190ms ease;
  }

  .theme-button:hover {
    filter: brightness(1.04) saturate(1.08);
    transform: translateY(-4px);
  }

  .theme-button:active {
    transform: translateY(0) scale(.95);
  }

  .liquid-switch {
    display: grid;
    height: 100%;
    align-items: center;
    padding: 7px;
  }

  .switch-track {
    position: relative;
    display: flex;
    min-height: 34px;
    align-items: center;
    justify-content: flex-end;
    border-radius: 999px;
    padding: ${({ $compact }) => ($compact ? "0 10px 0 38px" : "0 16px 0 56px")};
    color: #fff;
    background: linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent-2) 72%, #ecfff4));
    box-shadow: inset 5px 5px 11px rgba(65,86,88,.18), inset -5px -5px 11px rgba(255,255,255,.42);
    font-size: ${({ $compact }) => ($compact ? "10px" : "12px")};
    font-weight: 940;
  }

  .switch-knob {
    position: absolute;
    left: 6px;
    top: 50%;
    width: ${({ $compact }) => ($compact ? "22px" : "26px")};
    height: ${({ $compact }) => ($compact ? "22px" : "26px")};
    border-radius: 50%;
    background: #fff;
    box-shadow: 7px 7px 16px rgba(63,90,93,.18), -4px -4px 12px rgba(255,255,255,.8);
    transform: translateY(-50%);
    transition: transform 420ms cubic-bezier(.68,-.55,.27,1.55);
  }

  .signature:hover .switch-knob {
    transform: translate(108px, -50%);
  }

  .battery-mini,
  .bar-code,
  .prompt-mini,
  .beam-mini,
  .card-mini,
  .clay-mini,
  .bulb-mini,
  .arc-mini,
  .capsule-mini {
    position: absolute;
    inset: 8px;
    display: grid;
    align-items: center;
  }

  .battery-mini {
    grid-template-columns: repeat(5, 1fr) 10px;
    gap: 6px;
    padding: 9px;
    border-radius: 14px;
    background: #f6fffb;
    box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--accent) 34%, transparent);
  }

  .battery-mini span {
    height: 100%;
    border-radius: 7px;
    background: linear-gradient(90deg, var(--accent), var(--accent-2), var(--accent));
    background-size: 220% 100%;
    animation: ${chargeFlow} 2.4s linear infinite;
  }

  .battery-mini i {
    width: 8px;
    height: 24px;
    border-radius: 0 6px 6px 0;
    background: var(--accent);
  }

  .bar-code {
    grid-template-columns: repeat(16, 1fr);
    gap: 3px;
    padding: 10px;
    background: #fff;
  }

  .bar-code span {
    height: 100%;
    border-radius: 2px;
    background: ${({ $theme }) => ($theme === "ticket" ? "#2f2441" : "var(--accent)")};
    opacity: var(--bar);
  }

  .bar-code::after,
  .beam-mini::after,
  .card-mini::after,
  .prompt-mini::after {
    position: absolute;
    inset: 0;
    content: "";
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.72), transparent);
    animation: ${scanSweep} 2.6s ease-in-out infinite;
  }

  .prompt-mini {
    grid-template-columns: 1fr 36px;
    gap: 8px;
    padding: 8px;
    background: #202124;
  }

  .prompt-mini span {
    height: 12px;
    border-radius: 999px;
    background: linear-gradient(90deg, #fff, rgba(255,255,255,.2));
  }

  .prompt-mini i {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: linear-gradient(135deg, #fff, #cfd2d8);
    box-shadow: 0 0 22px rgba(255,255,255,.32);
  }

  .beam-mini {
    gap: 6px;
    padding: 8px;
    background: #f9fafb;
  }

  .beam-mini span {
    height: 4px;
    border-radius: 999px;
    background: #111827;
    box-shadow: 0 0 14px rgba(0,0,0,.18);
  }

  .card-mini {
    place-items: center;
    background: linear-gradient(145deg, color-mix(in srgb, var(--accent) 70%, #fff), color-mix(in srgb, var(--accent-2) 60%, #fff));
  }

  .card-mini strong {
    position: relative;
    z-index: 1;
    color: #fff;
    font-size: 22px;
    font-weight: 980;
    text-shadow: 0 0 18px color-mix(in srgb, var(--accent) 54%, transparent);
  }

  .clay-mini {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .clay-mini span {
    width: 30px;
    height: 30px;
    border-radius: 30% 70% 65% 35%;
    background: var(--swatch);
    box-shadow: 6px 6px 14px rgba(63,90,93,.14), -6px -6px 14px rgba(255,255,255,.9);
    animation: ${springPop} 3s ease-in-out infinite;
  }

  .bulb-mini {
    place-items: center;
  }

  .bulb-mini span {
    width: 44px;
    height: 44px;
    border-radius: 50% 50% 42% 42%;
    background: radial-gradient(circle at 50% 36%, #fff8b7, var(--accent) 45%, #fff1dc);
    box-shadow: 0 0 28px color-mix(in srgb, var(--accent) 42%, transparent), inset 0 0 0 1px rgba(255,255,255,.7);
  }

  .arc-mini {
    place-items: center;
  }

  .arc-mini span {
    width: 108px;
    height: 36px;
    border-radius: 999px;
    border: 3px solid transparent;
    background: linear-gradient(#fff, #fff) padding-box, linear-gradient(90deg, var(--accent), var(--accent-2), #5eeabd) border-box;
    box-shadow: 0 0 22px color-mix(in srgb, var(--accent) 28%, transparent);
  }

  .capsule-mini {
    place-items: center;
  }

  .capsule-mini span {
    width: 128px;
    height: 38px;
    border-radius: 999px;
    background: linear-gradient(135deg, var(--accent-2), #fff, var(--accent));
    box-shadow: 0 18px 32px color-mix(in srgb, var(--accent) 18%, transparent), inset 0 1px 0 rgba(255,255,255,.8);
  }
`;

const MiniCard = styled.div<{ $family?: (typeof styleFamilies)[PageConfig["theme"]] }>`
  position: relative;
  min-height: 0;
  border-radius: 22px;
  padding: 10px;
  background: ${({ $family }) => ($family === "neumorphic" || $family === "clay" ? "linear-gradient(145deg, #f7fffb, #e1ece6)" : "color-mix(in srgb, rgba(255,255,255,.7) 86%, var(--accent-2))")};
  box-shadow: ${({ $family }) => ($family === "neumorphic" || $family === "clay" ? "inset 5px 5px 11px rgba(65,86,88,.12), inset -5px -5px 11px rgba(255,255,255,.9)" : "inset 0 1px 0 rgba(255,255,255,.82), 0 16px 30px rgba(0,0,0,.05)")};
  backdrop-filter: blur(20px);

  > h3 {
    position: relative;
    z-index: 2;
  }

  > [role="img"] {
    position: absolute;
    right: 10px;
    bottom: 10px;
    left: 10px;
    top: 38px;
  }

  h3 {
    margin: 0;
    color: var(--ink);
    font-size: 17px;
    font-weight: 850;
  }
`;

const ChartSurface = styled.div`
  width: 100%;
  height: auto;
  min-height: 0;
  margin-top: 0;
  overflow: hidden;
  border-radius: 18px;
  background:
    linear-gradient(145deg, rgba(255,255,255,.52), rgba(255,255,255,.18)),
    color-mix(in srgb, var(--accent-2) 10%, transparent);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.56);
`;

const MiniChartSurface = styled(ChartSurface)`
  height: auto;
  margin-top: 0;
  border-radius: 16px;
`;

const Radar = styled.div`
  position: relative;
  width: 82px;
  height: 82px;
  margin: 12px auto 0;
  background:
    conic-gradient(from 0deg, transparent 0 12%, color-mix(in srgb, var(--accent) 16%, transparent) 12% 17%, transparent 17% 32%, color-mix(in srgb, var(--accent) 12%, transparent) 32% 37%, transparent 37%),
    repeating-radial-gradient(circle, transparent 0 17px, color-mix(in srgb, var(--ink) 18%, transparent) 18px 19px);
  clip-path: polygon(50% 0, 96% 34%, 78% 92%, 22% 92%, 4% 34%);

  &::after {
    position: absolute;
    inset: 23px 22px 20px;
    content: "";
    clip-path: polygon(50% 0, 100% 45%, 70% 100%, 18% 82%, 0 38%);
    background: color-mix(in srgb, var(--accent) 68%, transparent);
  }
`;

const Leaderboard = styled(Panel)`
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
`;

const RankList = styled.div`
  display: grid;
  gap: 7px;
  min-height: 0;
`;

const RankRow = styled.button<{ $active?: boolean }>`
  display: grid;
  grid-template-columns: 36px 1fr auto;
  gap: 10px;
  align-items: center;
  min-height: 47px;
  border-radius: 16px;
  padding: 0 13px;
  color: var(--ink);
  background: ${({ $active }) => ($active ? "color-mix(in srgb, var(--accent-2) 32%, rgba(255,255,255,.72))" : "rgba(255,255,255,.54)")};
  box-shadow: inset 0 1px 0 rgba(255,255,255,.65);
  cursor: pointer;
  text-align: left;
  transition: transform 170ms cubic-bezier(.22,1,.36,1), background-color 170ms ease;

  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background:
      radial-gradient(circle at 50% 32%, #ffe5da 0 16%, transparent 17%),
      linear-gradient(135deg, var(--tone), #ffffff);
    box-shadow: inset 0 0 0 2px rgba(255,255,255,.7);
  }

  strong,
  span {
    display: block;
  }

  strong {
    color: var(--ink);
    font-size: 14px;
    font-weight: 840;
  }

  span {
    color: color-mix(in srgb, var(--ink) 48%, transparent);
    font-size: 10px;
    font-weight: 700;
  }

  em {
    color: var(--ink);
    font-size: 15px;
    font-style: normal;
    font-weight: 800;
  }

  &:hover {
    background: color-mix(in srgb, var(--accent-2) 34%, rgba(255,255,255,.72));
    transform: translateX(7px);
  }
`;

const Pager = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-top: 9px;

  button {
    min-height: 31px;
    border-radius: 12px;
    padding: 0 14px;
    color: var(--ink);
    background: rgba(255,255,255,.62);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.78);
    cursor: pointer;
    font-size: 12px;
    font-weight: 800;
  }

  span {
    color: var(--ink);
    font-size: 12px;
    font-weight: 760;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 20;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(5, 7, 12, .46);
  backdrop-filter: blur(22px);
`;

const ModalPanel = styled.div<{ $display: (typeof themeModes)[PageConfig["theme"]]["display"]; $theme: PageConfig["theme"]; $family: (typeof styleFamilies)[PageConfig["theme"]] }>`
  width: min(520px, 100%);
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.42);
  border-radius: ${({ $display, $theme }) => ($display === "ticket" || $display === "void" || $display === "neural" ? "24px" : $theme === "soft" || $theme === "confirm" || $theme === "clay" ? "34px" : "28px")};
  padding: 22px;
  color: var(--ink);
  background:
    ${({ $display, $theme, $family }) =>
      $family === "neumorphic"
        ? "linear-gradient(145deg, #eef5f1, #dce8e2)"
        : $theme === "clay"
        ? "radial-gradient(circle at 20% 24%, rgba(244,114,182,.26), transparent 0 22%), linear-gradient(145deg, #fff8f2, #d9f3ea)"
        : $display === "prompt"
        ? "linear-gradient(145deg, #ffffff, #dfe1e5)"
        : $display === "battery"
        ? "linear-gradient(145deg, #f1fff8, #c8f6de)"
        : $display === "ticket"
        ? "repeating-linear-gradient(90deg, rgba(47,36,65,.11) 0 2px, transparent 2px 10px), linear-gradient(135deg, #fff, #fff0bd)"
        : $display === "filament"
        ? "radial-gradient(circle at 50% 10%, rgba(255,136,0,.28), transparent 0 28%), linear-gradient(145deg, #fff7e8, #ffe0bd)"
        : "linear-gradient(145deg, rgba(255,255,255,.84), color-mix(in srgb, var(--accent-2) 24%, rgba(255,255,255,.42)))"};
  box-shadow: ${({ $family }) =>
    $family === "neumorphic" || $family === "clay"
      ? "inset 7px 7px 16px rgba(65,86,88,.12), inset -8px -8px 18px rgba(255,255,255,.86), 0 34px 90px rgba(55,78,80,.22)"
      : "inset 0 1px 0 rgba(255,255,255,.56), 0 34px 90px rgba(0,0,0,.18)"};

  header {
    display: flex;
    align-items: start;
    justify-content: space-between;
    gap: 18px;
  }

  h2 {
    margin: 0;
    font-size: 26px;
    font-weight: 950;
  }

  p {
    margin: 8px 0 0;
    color: currentColor;
    opacity: .72;
    font-size: 14px;
    font-weight: 700;
    line-height: 1.45;
  }

  .modal-visual {
    position: relative;
    display: grid;
    min-height: 180px;
    margin-top: 22px;
    overflow: hidden;
    border-radius: ${({ $theme }) => ($theme === "soft" || $theme === "confirm" || $theme === "clay" ? "30px" : "24px")};
    background: ${({ $family }) => ($family === "neumorphic" || $family === "clay" ? "linear-gradient(145deg, #dfe8e3, #f8fffb)" : "rgba(255,255,255,.42)")};
    box-shadow: ${({ $family }) => ($family === "neumorphic" || $family === "clay" ? "inset 6px 6px 14px rgba(65,86,88,.14), inset -6px -6px 14px rgba(255,255,255,.88)" : "inset 0 1px 0 rgba(255,255,255,.58)")};
  }

  .modal-visual ${OriginalDock} {
    align-self: center;
    width: calc(100% - 28px);
    margin: 14px;
  }

  .modal-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-top: 14px;
  }
`;

function ThemeDisplay({ page, family }: { page: PageConfig; family: (typeof styleFamilies)[PageConfig["theme"]] }) {
  const mode = themeModes[page.theme];
  const Icon = mode.icon;
  const parts = page.avatarName.split(" ");
  return (
    <ThemeStage $display={mode.display} $texture={mode.texture} $family={family}>
      <StageChipRail>
        {displayNodes[page.theme].map((node) => (
          <span key={node}>{node}</span>
        ))}
      </StageChipRail>
      <StageGlyph $display={mode.display}>
        <Icon size={22} />
      </StageGlyph>
      <StageCaption>
        <div>
          <strong>
            {parts.slice(0, -1).join(" ")}
            <br />
            {parts.slice(-1)}
          </strong>
          <span>{page.avatarRole}</span>
        </div>
        <strong>{page.payout}</strong>
      </StageCaption>
      <StageStats>
        <div>
          <span>{mode.display === "battery" ? "Cells" : mode.display === "prompt" ? "Tools" : "Users"}</span>
          <strong>{mode.display === "ticket" ? "VIP" : "34"}</strong>
        </div>
        <div>
          <span>{mode.display === "vault" ? "Seals" : mode.display === "neural" ? "Cards" : "Conversations"}</span>
          <strong>{mode.display === "filament" ? "84%" : "78"}</strong>
        </div>
      </StageStats>
      <ThemeOriginalControls page={page} family={family} compact onOpen={() => undefined} />
    </ThemeStage>
  );
}

function ThemeChart({ page }: { page: PageConfig }) {
  const mode = themeModes[page.theme];
  const values = pageMetrics[page.theme];
  return (
    <VisualChart $chart={mode.chart} data-chart={mode.chart} aria-label={`${page.title} theme chart`}>
      {values.map((value, index) => (
        <span
          key={`${page.theme}-${mode.chart}-${index}`}
          style={
            {
              "--h": mode.chart === "terminal" ? `${Math.max(26, value)}%` : `${value}%`,
              "--i": index,
              "--x": `${8 + ((index * 19) % 78)}%`,
              "--y": `${12 + ((index * 23) % 58)}%`,
              "--s": `${18 + (value % 42)}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </VisualChart>
  );
}

function SignatureVisual({ page }: { page: PageConfig }) {
  const barsForCode = [0.95, 0.42, 0.72, 0.28, 0.86, 0.54, 0.98, 0.38, 0.74, 0.48, 0.9, 0.34, 0.8, 0.58, 0.68, 0.46];

  if (page.theme === "soft" || page.theme === "confirm") {
    return (
      <div className="liquid-switch">
        <div className="switch-track">
          <span className="switch-knob" />
          {page.theme === "confirm" ? "Confirmed" : "Soft slide"}
        </div>
      </div>
    );
  }

  if (page.theme === "battery" || page.theme === "depth") {
    return (
      <div className="battery-mini" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <span key={index} style={{ animationDelay: `${index * 0.08}s` }} />
        ))}
        <i />
      </div>
    );
  }

  if (page.theme === "ticket" || page.theme === "unlock") {
    return (
      <div className="bar-code" aria-hidden="true">
        {barsForCode.map((bar, index) => (
          <span key={index} style={{ "--bar": bar } as React.CSSProperties} />
        ))}
      </div>
    );
  }

  if (page.theme === "prompt") {
    return (
      <div className="prompt-mini" aria-hidden="true">
        <span />
        <i />
      </div>
    );
  }

  if (page.theme === "lumen") {
    return (
      <div className="beam-mini" aria-hidden="true">
        {[82, 64, 92, 48].map((width) => (
          <span key={width} style={{ width: `${width}%` }} />
        ))}
      </div>
    );
  }

  if (page.theme === "clay") {
    return (
      <div className="clay-mini" aria-hidden="true">
        {["#e11d48", "#10b981", "#0ea5e9", "#8b5cf6"].map((color, index) => (
          <span key={color} style={{ "--swatch": color, animationDelay: `${index * 0.1}s` } as React.CSSProperties} />
        ))}
      </div>
    );
  }

  if (page.theme === "filament" || page.theme === "divine") {
    return (
      <div className="bulb-mini" aria-hidden="true">
        <span />
      </div>
    );
  }

  if (page.theme === "electric" || page.theme === "request") {
    return (
      <div className="arc-mini" aria-hidden="true">
        <span />
      </div>
    );
  }

  if (page.theme === "premium" || page.theme === "inzoi") {
    return (
      <div className="capsule-mini" aria-hidden="true">
        <span />
      </div>
    );
  }

  return (
    <div className="card-mini" aria-hidden="true">
      <strong>{page.theme === "void" ? "VOID" : page.theme === "neural" ? "N9" : "777"}</strong>
    </div>
  );
}

function ThemeOriginalControls({
  page,
  family,
  compact = false,
  onOpen,
}: {
  page: PageConfig;
  family: (typeof styleFamilies)[PageConfig["theme"]];
  compact?: boolean;
  onOpen: () => void;
}) {
  const labels: Record<PageConfig["theme"], readonly string[]> = {
    inzoi: ["Glass pose", "Avatar", "Studio"],
    soft: ["Inset", "Raise", "Slide"],
    electric: ["Arc", "Pulse", "Route"],
    premium: ["Pearl", "Crown", "Capsule"],
    request: ["Brief", "Queue", "Review"],
    unlock: ["Seal", "Scan", "Open"],
    confirm: ["Swipe", "Check", "Done"],
    filament: ["Warm", "Glow", "Ignite"],
    battery: ["Cell", "Balance", "Charge"],
    depth: ["Layer", "Gauge", "Calibrate"],
    void: ["Hover", "Neon", "Market"],
    divine: ["Forge", "Gold", "Start"],
    ticket: ["Scan", "Flip", "Gate"],
    clay: ["Copy", "Mix", "Blob"],
    lumen: ["Slit", "Beam", "Focus"],
    prompt: ["Input", "Tools", "Send"],
    neural: ["Deck", "Energy", "Resolve"],
  };

  return (
    <OriginalDock $theme={page.theme} $family={family} $compact={compact}>
      <button className="signature" type="button" aria-label={`${page.nav} signature control`} onClick={onOpen}>
        <SignatureVisual page={page} />
      </button>
      {labels[page.theme].slice(0, compact ? 2 : 3).map((label) => (
        <button key={label} className="theme-button" type="button" onClick={onOpen}>
          {label}
        </button>
      ))}
    </OriginalDock>
  );
}

function hexToRgba(hex: string, alpha: number) {
  const normalized = hex.replace("#", "");
  const full = normalized.length === 3 ? normalized.split("").map((char) => char + char).join("") : normalized;
  const value = Number.parseInt(full, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function chartOption(page: PageConfig, kind: ChartKind): echarts.EChartsCoreOption {
  const values = pageMetrics[page.theme];
  const family = kind === "benchmark" ? "radar" : kind === "secondary" && chartFamilies[page.theme] === "heatmap" ? "bar" : chartFamilies[page.theme];
  const textColor = "rgba(20,22,32,.58)";
  const isMini = kind !== "revenue";
  const grid = isMini ? { top: 4, right: 4, bottom: 4, left: 4 } : { top: 8, right: 8, bottom: 8, left: 8 };
  const gradient = new echarts.graphic.LinearGradient(0, 0, 1, 1, [
    { offset: 0, color: page.accent },
    { offset: 1, color: page.accent2 },
  ]);

  if (family === "line") {
    return {
      animationDuration: 900,
      grid,
      xAxis: { type: "category", show: false, data: values.map((_, index) => index) },
      yAxis: { type: "value", show: false, min: 0, max: 110 },
      series: [
        {
          type: "line",
          smooth: true,
          symbol: "none",
          lineStyle: { width: kind === "secondary" ? 2 : 4, color: page.accent },
          areaStyle: { color: hexToRgba(page.accent, kind === "secondary" ? 0.14 : 0.24) },
          data: values,
        },
        {
          type: "line",
          smooth: true,
          symbol: "none",
          lineStyle: { width: 2, color: page.accent2 },
          data: values.map((value, index) => Math.max(8, 100 - value + index * 2)),
        },
      ],
    };
  }

  if (family === "heatmap") {
    const data = values.map((value, index) => [index % 6, Math.floor(index / 6), value]);
    return {
      animationDuration: 700,
      grid: { top: 4, right: 4, bottom: 4, left: 4 },
      xAxis: { type: "category", show: false, data: ["A", "B", "C", "D", "E", "F"] },
      yAxis: { type: "category", show: false, data: ["1", "2"] },
      visualMap: { show: false, min: 35, max: 100, inRange: { color: [hexToRgba(page.accent2, 0.42), page.accent, page.accent2] } },
      series: [{ type: "heatmap", data, itemStyle: { borderRadius: 10, borderWidth: 5, borderColor: "rgba(255,255,255,.28)" } }],
    };
  }

  if (family === "radar") {
    return {
      animationDuration: 900,
      radar: {
        center: ["50%", isMini ? "55%" : "54%"],
        radius: isMini ? "58%" : "76%",
        splitNumber: 3,
        axisName: { color: textColor, fontSize: isMini ? 8 : 10, padding: isMini ? 1 : 3 },
        axisLine: { lineStyle: { color: hexToRgba(page.accent, 0.22) } },
        splitLine: { lineStyle: { color: hexToRgba(page.accent, 0.18) } },
        splitArea: { areaStyle: { color: ["rgba(255,255,255,.08)", "rgba(255,255,255,.18)"] } },
        indicator: ["Flow", "Depth", "Signal", "Trust", "Style", "Speed"].map((name) => ({ name, max: 100 })),
      },
      series: [
        {
          type: "radar",
          symbol: "circle",
          symbolSize: isMini ? 3 : 5,
          lineStyle: { width: isMini ? 2 : 4, color: page.accent },
          areaStyle: { color: hexToRgba(page.accent, 0.26) },
          data: [{ value: values.slice(0, 6), name: page.nav }],
        },
      ],
    };
  }

  if (family === "gauge") {
    return {
      animationDuration: 900,
      series: [
        {
          type: "gauge",
          startAngle: 210,
          endAngle: -30,
          min: 0,
          max: 100,
          radius: isMini ? "86%" : "96%",
          center: ["50%", isMini ? "58%" : "60%"],
          progress: { show: true, roundCap: true, width: isMini ? 9 : 14, itemStyle: { color: gradient } },
          axisLine: { roundCap: true, lineStyle: { width: isMini ? 9 : 14, color: [[1, hexToRgba(page.accent2, 0.22)]] } },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: false },
          pointer: { show: false },
          title: { show: false },
          detail: { valueAnimation: true, color: page.ink, fontSize: isMini ? 18 : 26, fontWeight: 900, offsetCenter: [0, "20%"], formatter: "{value}%" },
          data: [{ value: values[0], name: page.nav }],
        },
      ],
    };
  }

  if (family === "scatter") {
    return {
      animationDuration: 900,
      grid,
      xAxis: { show: false, min: 0, max: 100 },
      yAxis: { show: false, min: 0, max: 100 },
      series: [
        {
          type: "scatter",
          symbolSize: (value: unknown) => {
            const point = value as number[];
            return Math.max(isMini ? 10 : 16, point[2] / (isMini ? 3.4 : 2.4));
          },
          itemStyle: { color: gradient, shadowColor: hexToRgba(page.accent, 0.42), shadowBlur: 18 },
          data: values.map((value, index) => [10 + ((index * 17) % 82), 12 + ((index * 29) % 76), value]),
        },
      ],
    };
  }

  if (family === "graph") {
    return {
      animationDuration: 900,
      series: [
        {
          type: "graph",
          layout: "force",
          roam: false,
          force: { repulsion: isMini ? 42 : 95, edgeLength: isMini ? 18 : 34 },
          data: values.slice(0, 9).map((value, index) => ({ name: `N${index}`, value, symbolSize: Math.max(isMini ? 12 : 20, value / (isMini ? 4.2 : 2.5)), itemStyle: { color: index % 2 ? page.accent2 : page.accent } })),
          links: values.slice(0, 8).map((_, index) => ({ source: `N${index}`, target: `N${index + 1}` })),
          lineStyle: { color: hexToRgba(page.accent2, 0.44), width: 2 },
        },
      ],
    };
  }

  return {
    animationDuration: 800,
    grid,
    xAxis: { type: "category", show: false, data: values.map((_, index) => index) },
    yAxis: { type: "value", show: false, min: 0, max: 110 },
    series: [
      {
        type: "bar",
        barWidth: kind === "secondary" ? "42%" : "58%",
        itemStyle: { color: gradient, borderRadius: [9, 9, 2, 2] },
        data: values,
      },
    ],
  };
}

function EChartBlock({ page, kind = "revenue", mini = false }: { page: PageConfig; kind?: ChartKind; mini?: boolean }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }
    const chart = echarts.init(containerRef.current, undefined, { renderer: "canvas" });
    chart.setOption(chartOption(page, kind));
    const resize = () => chart.resize();
    const observer = new ResizeObserver(() => resize());
    observer.observe(containerRef.current);
    window.addEventListener("resize", resize);
    requestAnimationFrame(resize);
    return () => {
      window.removeEventListener("resize", resize);
      observer.disconnect();
      chart.dispose();
    };
  }, [page, kind]);

  const Surface = mini ? MiniChartSurface : ChartSurface;
  return <Surface ref={containerRef} role="img" aria-label={`${page.title} ${kind} chart`} />;
}

function splitBanner(text: string) {
  const words = text.split(" ");
  const pivot = Math.max(1, Math.ceil(words.length / 2));
  return [words.slice(0, pivot).join(" "), words.slice(pivot).join(" ") || words[0]];
}

export default function InzoiDashboard() {
  const [activePage, setActivePage] = useState<PageKey>("inzoi");
  const [modalOpen, setModalOpen] = useState(false);
  const page = pages[activePage];
  const mode = themeModes[page.theme];
  const family = styleFamilies[page.theme];
  const [lineA, lineB] = useMemo(() => splitBanner(page.banner), [page.banner]);
  const rankingRows = useMemo(
    () =>
      ranks.map((row, index) => {
        if (index === 0) {
          return [page.avatarName.split(" ").slice(-1)[0], row[1], page.avatarRole, page.accent] as const;
        }
        return row;
      }),
    [page],
  );

  useEffect(() => {
    const readLocation = () => {
      const queryKey = new URLSearchParams(window.location.search).get("dashboard") as PageKey | null;
      const hashKey = window.location.hash.replace("#", "") as PageKey;
      const key = queryKey || hashKey;
      if (pageKeys.has(key)) {
        setActivePage(key);
      }
    };
    readLocation();
    window.addEventListener("popstate", readLocation);
    window.addEventListener("hashchange", readLocation);
    return () => {
      window.removeEventListener("popstate", readLocation);
      window.removeEventListener("hashchange", readLocation);
    };
  }, []);

  const selectPage = (key: PageKey) => {
    setActivePage(key);
    const nextUrl = key === "inzoi" ? window.location.pathname : `${window.location.pathname}?dashboard=${key}`;
    if (`${window.location.pathname}${window.location.search}` !== nextUrl) {
      window.history.replaceState(null, "", nextUrl);
    }
  };

  return (
    <Shell
      $theme={page.theme}
      style={
        {
          "--accent": page.accent,
          "--accent-2": page.accent2,
          "--ink": page.ink,
        } as React.CSSProperties
      }
    >
      <Layout>
        <Sidebar>
          <div>
            <Brand>
              <span className="mark">
                <Sparkles size={20} />
              </span>
              <div>
                <strong>
                  inZOI Studio <em>Dev</em>
                </strong>
              </div>
            </Brand>
            <Nav>
              <span>Main</span>
              {navItems.map(({ key, icon: Icon }) => (
                <NavButton key={key} type="button" $active={activePage === key} onClick={() => selectPage(key)}>
                  <Icon />
                  {pages[key].nav}
                </NavButton>
              ))}
            </Nav>
          </div>

          <DevCard>
            <strong>I am a developer!</strong>
            <p>Every dashboard keeps its own visual identity inside one product layout.</p>
            <PrimaryButton type="button" $theme={page.theme} onClick={() => setModalOpen(true)}>Dev Platform</PrimaryButton>
          </DevCard>

          <UserPlan>
            <span className="avatar" />
            <div>
              <span>FREE PLAN</span>
              <strong>Isaac Allen</strong>
            </div>
          </UserPlan>
        </Sidebar>

        <Content>
          <Topbar>
            <h1>{page.title}</h1>
            <div className="tools">
              <SearchBox>
                <Search size={17} />
                <input aria-label="Search dashboard" placeholder={`Search ${page.nav}`} />
              </SearchBox>
              <IconButton type="button" aria-label="Notifications">
                <Bell size={18} />
              </IconButton>
              <IconButton type="button" aria-label="Settings">
                <Settings size={18} />
              </IconButton>
            </div>
          </Topbar>

          <HeroStats>
            <CreditHeadline>
              <strong>{page.score}</strong>
              <span>{page.refresh}</span>
            </CreditHeadline>
            <StatBlock>
              <span className="eyebrow">Today&apos;s from yesterday</span>
              <strong>
                {page.earning} <small>credits</small>
              </strong>
              <span className="label">Today&apos;s Earnings</span>
            </StatBlock>
            <StatBlock>
              <span className="bar" />
              <span className="eyebrow">Revenue points</span>
              <strong>
                {page.total} <small>credits</small>
              </strong>
              <span className="label">Total Revenue Points</span>
            </StatBlock>
            <StatBlock>
              <span className="eyebrow">
                Recharge <ChevronRight size={16} />
              </span>
              <strong>
                {page.balance} <small>credits</small>
              </strong>
              <span className="label">Consumption Credits Balance</span>
            </StatBlock>
          </HeroStats>

          <MidGrid>
            <Banner $theme={page.theme}>
              <h2>
                {lineA}
                <br />
                {lineB}
              </h2>
              <div className="copy">
                <span>{page.bannerCopy}</span>
                <PrimaryButton type="button" $theme={page.theme} onClick={() => setModalOpen(true)} style={{ minHeight: 40, padding: "0 16px", fontSize: 14 }}>
                  View Tutorial
                </PrimaryButton>
              </div>
            </Banner>
            <ActionStack>
              <WideAction type="button" $primary $theme={page.theme} $family={family} onClick={() => setModalOpen(true)}>
                {page.primaryAction}
              </WideAction>
              <WideAction type="button" $theme={page.theme} $family={family} onClick={() => setModalOpen(true)}>{page.secondaryAction}</WideAction>
            </ActionStack>
          </MidGrid>

          <MainGrid>
            <Panel $family={family}>
              <header>
                <div>
                  <h2>{page.infoTitle}</h2>
                  <p>{page.infoCopy}</p>
                </div>
                <IconButton type="button" aria-label="Add item" onClick={() => setModalOpen(true)}>
                  <Plus size={18} />
                </IconButton>
              </header>

              <InfoLayout>
                <ThemeDisplay page={page} family={family} />

                <Charts>
                  <ChartCard $family={family}>
                    <header style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center" }}>
                      <div>
                        <h3>Revenue trend chart</h3>
                      </div>
                      <strong style={{ whiteSpace: "nowrap", fontSize: 12 }}>Week</strong>
                    </header>
                    <EChartBlock page={page} kind="revenue" />
                  </ChartCard>

                  <MiniGrid>
                    <MiniCard $family={family}>
                      <h3>{themeModes[page.theme].display === "prompt" ? "Context" : "Benchmark"}</h3>
                      <EChartBlock page={page} kind="benchmark" mini />
                    </MiniCard>
                    <MiniCard $family={family}>
                      <h3>{themeModes[page.theme].display === "battery" ? "Cell Rack" : "DAU"}</h3>
                      <EChartBlock page={page} kind="secondary" mini />
                    </MiniCard>
                  </MiniGrid>
                </Charts>
              </InfoLayout>
            </Panel>

            <Leaderboard $family={family}>
              <header>
                <div>
                  <h2>Historical Total Earnings Leaderboard</h2>
                  <p>Each row keeps the page accent, glass fill and interaction feedback.</p>
                </div>
              </header>
              <RankList>
                {rankingRows.slice(0, 5).map(([name, amount, role, tone], index) => (
                  <RankRow key={`${name}-${index}`} type="button" $active={index % 2 === 0}>
                    <span className="avatar" style={{ "--tone": tone } as React.CSSProperties} />
                    <span>
                      <strong>{name}</strong>
                      <span>{role}</span>
                    </span>
                    <em>{amount}</em>
                  </RankRow>
                ))}
              </RankList>
              <Pager>
                <button type="button">Previous Page</button>
                <span>Page 1 of 5</span>
              </Pager>
            </Leaderboard>
          </MainGrid>
        </Content>
      </Layout>
      {modalOpen && (
        <ModalOverlay role="presentation" onClick={() => setModalOpen(false)}>
          <ModalPanel $display={mode.display} $theme={page.theme} $family={family} role="dialog" aria-modal="true" aria-labelledby="dashboard-modal-title" onClick={(event) => event.stopPropagation()}>
            <header>
              <div>
                <h2 id="dashboard-modal-title">{page.primaryAction}</h2>
                <p>{page.infoCopy}</p>
              </div>
              <IconButton type="button" aria-label="Close modal" onClick={() => setModalOpen(false)}>
                <ChevronRight size={18} />
              </IconButton>
            </header>
            <div className="modal-visual">
              <ThemeOriginalControls page={page} family={family} onOpen={() => undefined} />
            </div>
            <div className="modal-actions">
              <WideAction type="button" $primary $theme={page.theme} $family={family} onClick={() => setModalOpen(false)}>
                {displayNodes[page.theme][0]}
              </WideAction>
              <WideAction type="button" $theme={page.theme} $family={family} onClick={() => setModalOpen(false)}>
                {displayNodes[page.theme][1]}
              </WideAction>
            </div>
          </ModalPanel>
        </ModalOverlay>
      )}
    </Shell>
  );
}
