"use client";

import React, { useMemo, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import {
  Activity,
  Bell,
  Boxes,
  ChevronDown,
  CircleDollarSign,
  Crown,
  Gauge,
  Layers3,
  LayoutDashboard,
  LockKeyhole,
  Menu,
  Palette,
  Play,
  Plus,
  Search,
  Settings,
  Sparkles,
  Trophy,
  Users,
  Wand2,
  X,
  Zap,
} from "lucide-react";
import { liquidTheme as t } from "@/lib/liquidTheme";

type DashboardPage = "soft" | "electric" | "premium" | "request" | "unlock" | "confirm" | "filament" | "battery" | "depth" | "void" | "divine" | "ticket" | "clay" | "lumen" | "prompt" | "neural";
type BackgroundMode = "mint" | "sky" | "pearl";

const backgroundLabels: Record<BackgroundMode, string> = {
  mint: "Mint",
  sky: "Sky",
  pearl: "Pearl",
};

const dashboardItems = [
  ["soft", "Soft Dashboard", LayoutDashboard],
  ["electric", "Electric Dashboard", Sparkles],
  ["premium", "Premium Dashboard", Crown],
  ["request", "Request Dashboard", Wand2],
  ["unlock", "Unlock Dashboard", LockKeyhole],
  ["confirm", "Confirm Dashboard", Gauge],
  ["filament", "Filament Dashboard", Zap],
  ["battery", "Battery Dashboard", Activity],
  ["depth", "Depth Battery", Layers3],
  ["void", "Void Card", Crown],
  ["divine", "Divine Engine", Trophy],
  ["ticket", "VIP Ticket", Boxes],
  ["clay", "Clay Palette", Palette],
  ["lumen", "Luminous Gate", Sparkles],
  ["prompt", "Prompt Bot", Search],
  ["neural", "Neural Card", Zap],
] as const;

const statCards = [
  { label: "Revenue", value: "$128.4K", delta: "+18.2%", icon: CircleDollarSign, tone: "green" },
  { label: "Active users", value: "42,819", delta: "+8.7%", icon: Users, tone: "blue" },
  { label: "Conversion", value: "12.8%", delta: "+3.1%", icon: Gauge, tone: "orange" },
  { label: "Automation", value: "93.6%", delta: "+6.4%", icon: Zap, tone: "green" },
] as const;

const barData = [42, 64, 54, 78, 58, 92, 72, 86, 68, 96, 82, 104];
const activityData = [28, 42, 38, 56, 48, 68, 61, 74, 66, 82, 78, 92];
const clayColors = ["#e11d48", "#f472b6", "#fb923c", "#facc15", "#84cc16", "#10b981", "#0ea5e9", "#3b82f6", "#8b5cf6", "#a78bfa"] as const;
const clayBars = [72, 58, 86, 44, 92, 64, 78, 50];
const lumenBars = [34, 52, 78, 46, 90, 64, 84, 58, 72];
const promptBars = [46, 72, 58, 88, 64, 96, 52, 76];
const neuralBars = [7, 9, 5, 8, 6, 10, 4];
const ranking = [
  { name: "North Star", score: 98, value: "$38.2K" },
  { name: "Aurora Ops", score: 91, value: "$31.8K" },
  { name: "Mint Flow", score: 86, value: "$26.4K" },
  { name: "Cloud Core", score: 78, value: "$21.7K" },
  { name: "Signal Lab", score: 72, value: "$18.9K" },
];

const electricMetrics = [
  { label: "Plasma ARR", value: "$487K", delta: "+28%", accent: "#5eeabd" },
  { label: "Cook Rate", value: "96.4%", delta: "+12%", accent: "#9a4df1" },
  { label: "Signal Heat", value: "8.9x", delta: "+4.8", accent: "#60a5fa" },
] as const;

const electricFeed = [
  { label: "Neon Core", value: "fusion report", time: "02:18", tone: "#5eeabd" },
  { label: "Pulse Engine", value: "12 tasks cooked", time: "04:42", tone: "#9a4df1" },
  { label: "Arc Runner", value: "routing stable", time: "07:09", tone: "#60a5fa" },
  { label: "Liquid Gate", value: "new handoff", time: "11:30", tone: "#f9799c" },
] as const;

const electricRanks = [
  { name: "Let Cook Ops", score: 99, amount: "$88.1K" },
  { name: "Prism Stack", score: 94, amount: "$76.4K" },
  { name: "Wave Control", score: 89, amount: "$62.9K" },
  { name: "Flash Route", score: 83, amount: "$50.6K" },
] as const;

const premiumTiles = [
  { label: "Total Value", value: "$920K", note: "compound reserve", tone: "#f7e6a1" },
  { label: "Premium Users", value: "18.6K", note: "membership active", tone: "#5691c8" },
  { label: "Conversion", value: "31.8%", note: "capsule funnel", tone: "#c4548e" },
] as const;

const premiumDeals = [
  { name: "Velvet Launch", stage: "negotiation", value: "$218K", progress: 86 },
  { name: "Lunar Club", stage: "signed", value: "$176K", progress: 72 },
  { name: "Noble Desk", stage: "review", value: "$141K", progress: 61 },
  { name: "Pearl Room", stage: "warm", value: "$98K", progress: 48 },
] as const;

const premiumRanks = [
  { name: "Crown Desk", score: 98, value: "$420K" },
  { name: "Velvet Ops", score: 94, value: "$318K" },
  { name: "Pearl Team", score: 89, value: "$276K" },
] as const;

const requestQueue = [
  { name: "Creative brief", status: "queued", value: "08:12", accent: "#6b3bd3" },
  { name: "API cleanup", status: "running", value: "14 files", accent: "#ff8800" },
  { name: "Launch copy", status: "review", value: "2 asks", accent: "#0fb4c6" },
  { name: "Motion polish", status: "ready", value: "96%", accent: "#ff4fa3" },
] as const;

const requestRanks = [
  { name: "Brief Engine", score: 99, value: "12 asks" },
  { name: "Design QA", score: 92, value: "8 asks" },
  { name: "Motion Lab", score: 87, value: "6 asks" },
] as const;

const unlockStages = [
  { name: "Identity Gate", status: "armed", value: "99.8%", accent: "#ffcd58" },
  { name: "Key Rotation", status: "pending", value: "04:18", accent: "#7a929d" },
  { name: "Vault Hold", status: "secure", value: "128", accent: "#fff9bc" },
  { name: "Session Seal", status: "confirmed", value: "42", accent: "#56b2dc" },
] as const;

const unlockRanks = [
  { name: "Vault Prime", score: 99, value: "A+" },
  { name: "Cipher Desk", score: 95, value: "A" },
  { name: "Token Room", score: 91, value: "A-" },
] as const;

const confirmMetrics = [
  { label: "Confirmed", value: "128", note: "approved flows", accent: "#86e3ce" },
  { label: "Pending", value: "18", note: "awaiting swipe", accent: "#8a9baf" },
  { label: "Success", value: "97%", note: "green channel", accent: "#a1ffc0" },
] as const;

const confirmRanks = [
  { name: "Green Lane", score: 99, value: "42 ok" },
  { name: "Glass Ops", score: 94, value: "31 ok" },
  { name: "Dent Flow", score: 90, value: "24 ok" },
] as const;

const requestBubbleData = [
  { label: "Brief", value: 74, x: 18, y: 28, size: 92, color: "#6b3bd3" },
  { label: "Runtime", value: 91, x: 52, y: 16, size: 122, color: "#ff8800" },
  { label: "Motion", value: 68, x: 74, y: 56, size: 84, color: "#0fb4c6" },
  { label: "QA", value: 83, x: 32, y: 70, size: 104, color: "#ff4fa3" },
] as const;

const unlockRadarData = [
  { label: "Vault", value: 94 },
  { label: "Token", value: 76 },
  { label: "Session", value: 88 },
  { label: "Audit", value: 69 },
  { label: "Key", value: 83 },
  { label: "Seal", value: 97 },
] as const;

const confirmAreaData = [34, 48, 44, 62, 58, 78, 72, 88, 81, 96];
const confirmHeatmapData = [92, 76, 84, 61, 98, 73, 69, 88, 80, 95, 71, 86, 64, 90, 78, 83];

const filamentMetrics = [
  { label: "Ignition", value: "84%", note: "lamp array", accent: "#ff8800" },
  { label: "Voltage", value: "220v", note: "stable rail", accent: "#00fbff" },
  { label: "Thermal", value: "68c", note: "glass safe", accent: "#ffc4af" },
] as const;

const filamentRows = [
  { name: "Glass Reflex", value: "active", score: 94, accent: "#ff8800" },
  { name: "Steel Screw", value: "locked", score: 88, accent: "#b7b7b7" },
  { name: "Filament Arc", value: "warming", score: 76, accent: "#ffc4af" },
  { name: "Noise Filter", value: "clean", score: 91, accent: "#00fbff" },
] as const;

const filamentHeat = [92, 61, 78, 88, 73, 96, 68, 84, 90, 57, 81, 99];

const batteryMetrics = [
  { label: "Charge", value: "69%", note: "charging", accent: "#2dc48d" },
  { label: "Health", value: "96%", note: "excellent", accent: "#85ffdb" },
  { label: "Cycles", value: "215", note: "73% life", accent: "#1aa27a" },
] as const;

const batterySystems = [
  { name: "Cell Balancer", value: "96% health", score: 96, accent: "#2dc48d" },
  { name: "Thermal Loop", value: "41c", score: 78, accent: "#85ffdb" },
  { name: "Cycle Guard", value: "215 cycles", score: 73, accent: "#1aa27a" },
  { name: "Grid Output", value: "8.4kw", score: 88, accent: "#ffffff" },
] as const;

const batteryCellGrid = [69, 74, 82, 91, 63, 96, 78, 88, 54, 73, 84, 92, 66, 79, 87, 95];

const sweep = keyframes`
  0% { transform: translateX(-120%) rotate(8deg); opacity: 0; }
  24% { opacity: 0.62; }
  100% { transform: translateX(180%) rotate(8deg); opacity: 0; }
`;

const float = keyframes`
  from { transform: translate3d(-1%, -1%, 0) rotate(-1deg); }
  to { transform: translate3d(1.5%, 1%, 0) rotate(1deg); }
`;

const pop = keyframes`
  from { opacity: 0; transform: translateY(10px) scale(0.94); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const electricSweep = keyframes`
  from { background-position: 0% 50%; }
  to { background-position: 220% 50%; }
`;

const electricPulse = keyframes`
  0%, 100% { filter: drop-shadow(0 0 10px rgba(154, 77, 241, .38)); }
  50% { filter: drop-shadow(0 0 20px rgba(94, 234, 189, .52)); }
`;

const waveSpin = keyframes`
  to { transform: translate(-50%, -68%) rotate(360deg); }
`;

const arcFlash = keyframes`
  0%, 100% { opacity: .45; transform: scaleX(.92); }
  50% { opacity: 1; transform: scaleX(1.04); }
`;

const premiumFloat = keyframes`
  50% {
    transform: translateY(-4px);
    box-shadow:
      0 15px 25px rgba(0, 0, 0, 0.2),
      0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const premiumSpin = keyframes`
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
`;

const softLineDraw = keyframes`
  from { stroke-dashoffset: 720; }
  to { stroke-dashoffset: 0; }
`;

const softFillBreathe = keyframes`
  0%, 100% { filter: saturate(1); transform: scaleX(.98); }
  50% { filter: saturate(1.18); transform: scaleX(1); }
`;

const requestGlowPulse = keyframes`
  0%, 100% { transform: scale(.9); opacity: .6; }
  50% { transform: scale(1.1); opacity: .86; }
`;

const requestDisabledShake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  50% { transform: translateX(2px); }
  75% { transform: translateX(-2px); }
`;

const requestGlitchText = keyframes`
  0%, 30%, 100% { transform: translate(0); text-shadow: none; }
  10% { transform: translate(-2px, 2px); text-shadow: 2px 2px 0 #ff8800; }
  20% { transform: translate(2px, -2px); text-shadow: -2px -2px 0 #0fb4c6; }
`;

const requestGlitchEdge = keyframes`
  0%, 100% { transform: translate(0, 0); opacity: 1; }
  20% { transform: translate(-5px, 0); opacity: .8; }
  40% { transform: translate(5px, 0); opacity: 1; }
  60% { transform: translate(-2px, 0); opacity: .7; }
  80% { transform: translate(2px, 0); opacity: 1; }
`;

const unlockRipple = keyframes`
  0% { transform: scale(.5); opacity: .6; }
  80% { opacity: .1; }
  100% { transform: scale(4); opacity: 0; }
`;

const unlockSpark = keyframes`
  0%, 25% { stroke-dashoffset: -17; }
  40% { stroke-dashoffset: 0; }
  80%, 100% { stroke-dashoffset: 17; }
`;

const unlockVanish = keyframes`
  from { opacity: 1; filter: blur(0); transform: translateY(0); }
  to { opacity: 0; filter: blur(6px); transform: translateY(-6px); }
`;

const unlockAppear = keyframes`
  from { opacity: 0; filter: blur(6px); transform: translateY(6px); }
  to { opacity: 1; filter: blur(0); transform: translateY(0); }
`;

const unlockBlur = keyframes`
  0% { filter: blur(0); }
  66% { filter: blur(.1rem); }
  100% { filter: blur(1.5rem); }
`;

const unlockInBlur = keyframes`
  0% { filter: blur(1rem); }
  25%, 100% { filter: blur(0); }
`;

const unlockKeyTravel = keyframes`
  0% { stroke-dashoffset: -65; translate: 100% -45%; scale: .25; }
  30% { stroke-dashoffset: 5; translate: 185% -35%; scale: .5; }
  50% { transform: rotate(50deg); stroke-dashoffset: 40; translate: 285% -45%; scale: .75; }
  80% { stroke-dashoffset: 65; translate: 345% -15%; scale: .75; rotate: 90deg; }
  100% { stroke-dashoffset: 65; translate: 160% -40%; rotate: 130deg; scale: .75; }
`;

const unlockClank = keyframes`
  0%, 65% { stroke-dashoffset: -100; }
  72% { stroke-dashoffset: 0; }
  85%, 100% { stroke-dashoffset: 100; }
`;

const unlockBigLock = keyframes`
  0% { opacity: 1; stroke-dashoffset: 250; }
  50% { opacity: 1; stroke-dashoffset: 0; }
  100% { opacity: 0; stroke-dashoffset: -250; }
`;

const unlockConfirm = keyframes`
  0%, 4% { opacity: 1; cursor: progress; transform: scaleY(1.1); }
  10% { opacity: 1; filter: blur(0); transform: scaleY(1.15); cursor: none; }
  15% { opacity: 1; transform: scaleY(.8); }
  20% { opacity: 1; transform: scaleY(1.2); }
  25% { opacity: 1; transform: scaleY(1); }
  35% { transform: scaleY(1.15); cursor: none; }
  50% { transform: scaleY(1.5); filter: blur(2rem); opacity: 0; }
  80%, 100% { transform: scaleY(2); opacity: 0; filter: blur(2rem); cursor: grabbing; }
`;

const unlockRestore = keyframes`
  0%, 25% { opacity: 0; filter: blur(2rem); }
  50%, 100% { opacity: 1; filter: blur(0); }
`;

const confirmShine = keyframes`
  0% { transform: translateX(-100px) skewX(-25deg); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateX(320px) skewX(-25deg); opacity: 0; }
`;

const confirmPulseGlow = keyframes`
  0%, 100% { transform: scale(1); opacity: .7; }
  50% { transform: scale(1.1); opacity: 1; }
`;

const RootShell = styled.main<{ $background: BackgroundMode; $dashboard: DashboardPage }>`
  min-height: 100vh;
  padding: 0;
  color: ${t.ink};
  background: ${({ $background, $dashboard }) =>
    $dashboard === "ticket"
      ? "radial-gradient(circle at 78% 10%, rgba(175,64,255,.22), transparent 0 26%), radial-gradient(circle at 18% 18%, rgba(91,66,243,.24), transparent 0 30%), radial-gradient(circle at 74% 84%, rgba(232,232,232,.14), transparent 0 30%), linear-gradient(135deg, #121212, #212121 46%, #08071d)"
      : $dashboard === "neural"
      ? "radial-gradient(circle at 76% 10%, rgba(212,181,255,.2), transparent 0 25%), radial-gradient(circle at 18% 22%, rgba(147,112,219,.22), transparent 0 29%), radial-gradient(circle at 70% 84%, rgba(255,255,255,.08), transparent 0 28%), linear-gradient(135deg, #08080a, #1a1a1a 44%, #0b0712)"
      : $dashboard === "prompt"
      ? "radial-gradient(circle at 16% 14%, rgba(255,255,255,.16), transparent 0 16%), radial-gradient(circle at 82% 18%, rgba(126,126,126,.22), transparent 0 29%), radial-gradient(circle at 70% 84%, rgba(255,255,255,.08), transparent 0 28%), linear-gradient(135deg, #0a0a0a, #1b1b1b 45%, #050505)"
      : $dashboard === "lumen"
      ? "radial-gradient(circle at 52% 12%, rgba(255,255,255,.18), transparent 0 16%), radial-gradient(circle at 78% 18%, rgba(120,120,120,.18), transparent 0 28%), radial-gradient(circle at 20% 82%, rgba(255,255,255,.08), transparent 0 28%), radial-gradient(circle at 50% 30%, #2a2a2a 0%, #131313 64%)"
      : $dashboard === "clay"
      ? "radial-gradient(circle at 80% 12%, rgba(16,185,129,.16), transparent 0 24%), radial-gradient(circle at 18% 18%, rgba(251,146,60,.16), transparent 0 29%), radial-gradient(circle at 76% 82%, rgba(139,92,246,.14), transparent 0 28%), linear-gradient(135deg, #dcdcdc, #e7e7e7 48%, #f4f4f4)"
      : $dashboard === "divine"
      ? "radial-gradient(circle at 78% 10%, rgba(255,215,0,.2), transparent 0 26%), radial-gradient(circle at 18% 18%, rgba(124,32,57,.28), transparent 0 30%), radial-gradient(circle at 74% 84%, rgba(255,94,0,.18), transparent 0 30%), linear-gradient(135deg, #08071d, #151b2d 45%, #130008)"
      : $dashboard === "void"
      ? "radial-gradient(circle at 78% 12%, rgba(0,242,255,.2), transparent 0 26%), radial-gradient(circle at 18% 18%, rgba(157,0,255,.2), transparent 0 30%), radial-gradient(circle at 72% 82%, rgba(255,0,85,.16), transparent 0 30%), linear-gradient(135deg, #010103, #05070a 44%, #080a12)"
      : $dashboard === "depth"
      ? "radial-gradient(circle at 76% 10%, rgba(255,255,255,.12), transparent 0 26%), radial-gradient(circle at 18% 18%, rgba(62,234,142,.2), transparent 0 28%), radial-gradient(circle at 66% 84%, rgba(255,255,255,.08), transparent 0 34%), linear-gradient(135deg, #050505, #151515 46%, #070807)"
      : $dashboard === "battery"
      ? "radial-gradient(circle at 78% 12%, rgba(45,196,141,.22), transparent 0 28%), radial-gradient(circle at 18% 18%, rgba(133,255,219,.14), transparent 0 28%), radial-gradient(circle at 72% 82%, rgba(26,162,122,.18), transparent 0 30%), linear-gradient(135deg, #020403, #101412 44%, #050706)"
      : $dashboard === "filament"
      ? "radial-gradient(circle at 78% 8%, rgba(255,136,0,.35), transparent 0 26%), radial-gradient(circle at 20% 22%, rgba(0,251,255,.18), transparent 0 28%), radial-gradient(circle at 58% 88%, rgba(255,196,175,.22), transparent 0 34%), linear-gradient(135deg, #12100f, #26211e 45%, #090909)"
      : $dashboard === "confirm"
      ? "radial-gradient(circle at 82% 12%, rgba(161,255,192,.38), transparent 0 28%), radial-gradient(circle at 14% 18%, rgba(134,227,206,.32), transparent 0 31%), linear-gradient(135deg, #e0e5ec, #eef4f1 45%, #d7e7e5)"
      : $dashboard === "unlock"
      ? "radial-gradient(circle at 18% 12%, rgba(255,249,188,.46), transparent 0 28%), radial-gradient(circle at 82% 18%, rgba(122,146,157,.28), transparent 0 30%), radial-gradient(circle at 72% 82%, rgba(255,174,88,.28), transparent 0 32%), linear-gradient(135deg, #edf3f4, #cdd8dc 42%, #eef2eb)"
      : $dashboard === "request"
      ? "radial-gradient(circle at 18% 12%, rgba(107,59,211,.32), transparent 0 30%), radial-gradient(circle at 86% 18%, rgba(255,136,0,.24), transparent 0 28%), radial-gradient(circle at 78% 82%, rgba(15,180,198,.26), transparent 0 30%), linear-gradient(135deg, #0a0a0f, #17151f 42%, #111b22)"
      : $dashboard === "premium"
      ? "radial-gradient(circle at 78% 7%, rgba(247,230,161,.32), transparent 0 26%), radial-gradient(circle at 16% 18%, rgba(86,145,200,.28), transparent 0 32%), radial-gradient(circle at 76% 76%, rgba(196,84,142,.23), transparent 0 30%), linear-gradient(135deg, #f5eee2, #d9e4ea 38%, #e9d1dc 67%, #f4e8cb)"
      : $dashboard === "electric"
      ? "radial-gradient(circle at 75% 10%, rgba(94, 234, 189, 0.22), transparent 0 28%), radial-gradient(circle at 16% 18%, rgba(154, 77, 241, 0.32), transparent 0 34%), linear-gradient(130deg, #03050f, #101a3e 42%, #240f33 72%, #050b16)"
      : $background === "sky"
        ? "radial-gradient(circle at 86% 8%, rgba(255,255,255,.92) 0 8%, transparent 28%), radial-gradient(circle at 12% 22%, rgba(101,177,236,.42) 0 13%, transparent 36%), linear-gradient(128deg, #edf6fb, #cbe8f6 46%, #d8f1ea)"
        : $background === "pearl"
          ? "radial-gradient(circle at 82% 12%, rgba(255,255,255,.96) 0 10%, transparent 30%), radial-gradient(circle at 16% 18%, rgba(203,216,218,.55) 0 15%, transparent 36%), linear-gradient(128deg, #f5f4ee, #e5ebe8 48%, #d7e4e5)"
          : "radial-gradient(circle at 88% 8%, rgba(255,255,255,.92) 0 8%, transparent 26%), radial-gradient(circle at 12% 18%, rgba(122,210,232,.45) 0 14%, transparent 34%), linear-gradient(128deg, #f0f3f2, #d7eeea 43%, #b7d9ec)"};
  background-size: ${({ $dashboard }) =>
    $dashboard === "ticket"
      ? "120% 120%, 130% 130%, 120% 120%, 100% 100%"
      : $dashboard === "neural"
      ? "120% 120%, 130% 130%, 120% 120%, 100% 100%"
      : $dashboard === "prompt"
      ? "120% 120%, 130% 130%, 120% 120%, 100% 100%"
      : $dashboard === "lumen"
      ? "120% 120%, 130% 130%, 120% 120%, 100% 100%"
      : $dashboard === "clay"
      ? "120% 120%, 130% 130%, 120% 120%, 100% 100%"
      : $dashboard === "divine"
      ? "120% 120%, 130% 130%, 120% 120%, 100% 100%"
      : $dashboard === "void"
      ? "120% 120%, 130% 130%, 120% 120%, 100% 100%"
      : $dashboard === "depth"
      ? "120% 120%, 130% 130%, 120% 120%, 100% 100%"
      : $dashboard === "battery"
      ? "120% 120%, 130% 130%, 120% 120%, 100% 100%"
      : $dashboard === "filament"
      ? "120% 120%, 130% 130%, 120% 120%, 100% 100%"
      : $dashboard === "confirm"
      ? "125% 125%, 130% 130%, 100% 100%"
      : $dashboard === "unlock"
      ? "120% 120%, 130% 130%, 120% 120%, 100% 100%"
      : $dashboard === "request"
      ? "130% 130%, 120% 120%, 130% 130%, 100% 100%"
      : $dashboard === "premium"
        ? "120% 120%, 130% 130%, 120% 120%, 100% 100%"
        : $dashboard === "electric"
          ? "120% 120%, 130% 130%, 100% 100%"
          : "120% 120%, 110% 110%, 240% 240%"};

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
`;

const AppShell = styled.div`
  display: grid;
  grid-template-columns: 74px minmax(0, 1fr);
  gap: 0;
  width: 100%;
  min-height: 100vh;
  max-width: none;
  margin: 0;

  @media (max-width: 1040px) {
    grid-template-columns: 1fr;
  }
`;

const GlobalSidebar = styled.aside<{ $dashboard: DashboardPage }>`
  position: sticky;
  top: 0;
  z-index: 5;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  align-content: start;
  gap: 5px;
  height: 100vh;
  width: 74px;
  overflow: visible;
  border-radius: 0;
  padding: 0;
  color: ${({ $dashboard }) => (["electric", "request", "filament", "battery", "depth", "void", "divine", "ticket", "lumen", "prompt", "neural"].includes($dashboard) ? "#ffffff" : "#263238")};
  background: ${({ $dashboard }) =>
    $dashboard === "ticket"
      ? "linear-gradient(145deg, rgba(18,18,18,.96), rgba(91,66,243,.72))"
      : $dashboard === "neural"
      ? "radial-gradient(circle at 50% 0%, rgba(212,181,255,.14), transparent 0 30%), linear-gradient(145deg, rgba(26,26,26,.96), rgba(40,31,52,.72))"
      : $dashboard === "prompt"
      ? "linear-gradient(145deg, rgba(16,16,16,.96), rgba(54,54,54,.74))"
      : $dashboard === "lumen"
      ? "radial-gradient(circle at 50% 0%, rgba(255,255,255,.09), transparent 0 28%), linear-gradient(145deg, rgba(30,30,30,.96), rgba(10,10,10,.9))"
      : $dashboard === "clay"
      ? "linear-gradient(145deg, rgba(231,231,231,.96), rgba(250,250,250,.68))"
      : $dashboard === "divine"
      ? "linear-gradient(145deg, rgba(8,7,29,.96), rgba(124,32,57,.72))"
      : $dashboard === "void"
      ? "linear-gradient(145deg, rgba(1,1,3,.96), rgba(10,12,18,.88))"
      : $dashboard === "depth"
      ? "linear-gradient(135deg, rgba(18,18,18,.96), rgba(32,32,32,.9))"
      : $dashboard === "battery"
      ? "linear-gradient(135deg, rgba(25,25,25,.96), rgba(30,30,30,.92))"
      : $dashboard === "filament"
        ? "linear-gradient(145deg, rgba(23,20,18,.88), rgba(50,42,35,.72))"
        : $dashboard === "electric"
          ? "linear-gradient(180deg, rgba(5,7,19,.95), rgba(14,21,48,.86))"
          : $dashboard === "request"
            ? "linear-gradient(145deg, rgba(19,19,25,.86), rgba(32,27,43,.78))"
            : $dashboard === "premium"
              ? "linear-gradient(145deg, rgba(255,255,255,.72), rgba(245,238,226,.42))"
              : "linear-gradient(145deg, rgba(255,255,255,.7), rgba(255,255,255,.28))"};
  box-shadow: ${({ $dashboard }) =>
    ["electric", "request", "filament", "battery", "depth", "void", "divine", "ticket", "lumen", "prompt", "neural"].includes($dashboard)
      ? "0 24px 58px rgba(0,0,0,.42), inset 0 0 0 1px rgba(255,255,255,.08)"
      : $dashboard === "clay"
      ? "14px 14px 34px rgba(160,160,160,.32), -14px -14px 34px rgba(255,255,255,.72), inset 6px 6px 12px rgba(197,197,197,.7), inset -6px -6px 12px rgba(255,255,255,.78)"
      : "18px 18px 44px rgba(94,111,116,.14), -14px -14px 34px rgba(255,255,255,.64), inset 0 0 0 1px rgba(255,255,255,.62)"};
  backdrop-filter: blur(24px) saturate(1.18);

  &::before {
    position: absolute;
    inset: -20% auto auto -28%;
    width: 70%;
    height: 42%;
    content: "";
    border-radius: 50%;
    opacity: ${({ $dashboard }) => ($dashboard === "battery" ? ".22" : ".28")};
    filter: blur(34px);
    background: ${({ $dashboard }) =>
      $dashboard === "ticket"
        ? "#af40ff"
        : $dashboard === "neural"
        ? "#d4b5ff"
        : $dashboard === "prompt"
        ? "#ffffff"
        : $dashboard === "lumen"
        ? "#ffffff"
        : $dashboard === "clay"
        ? "#f472b6"
        : $dashboard === "divine"
        ? "#ffd700"
        : $dashboard === "void"
        ? "#00f2ff"
        : $dashboard === "depth"
        ? "#3eea8e"
        : $dashboard === "battery"
        ? "#2dc48d"
        : $dashboard === "filament"
          ? "#ff8800"
          : $dashboard === "electric"
            ? "#9a4df1"
            : $dashboard === "request"
              ? "#6b3bd3"
              : $dashboard === "premium"
                ? "#f7e6a1"
                : "#7ad2e8"};
  }

  @media (max-width: 1040px) {
    position: static;
    height: auto;
    width: 100%;
  }
`;

const GlobalBrand = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  justify-items: center;
  align-items: center;
  padding: 5px 0 0;

  .mark {
    display: grid;
    width: 26px;
    height: 26px;
    place-items: center;
    border-radius: 9px;
    background: rgba(255,255,255,.18);
    box-shadow: inset 0 0 0 1px rgba(255,255,255,.18), 0 14px 28px rgba(0,0,0,.14);
  }

  .mark svg {
    width: 15px;
    height: 15px;
  }

  > div {
    display: none;
  }
`;

const GlobalNav = styled.nav`
  position: relative;
  z-index: 1;
  display: grid;
  gap: 4px;
  min-height: 0;
  overflow: visible;
  padding-right: 0;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 999px;
    background: rgba(255,255,255,.24);
  }

  @media (max-width: 1040px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    overflow: visible;
  }

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;

const GlobalNavButton = styled.button<{ $active?: boolean; $dashboard: DashboardPage }>`
  position: relative;
  display: flex;
  min-height: 35px;
  align-items: center;
  justify-content: center;
  gap: 0;
  overflow: visible;
  border-radius: 10px;
  padding: 0;
  color: ${({ $active, $dashboard }) => ($active ? "#ffffff" : ["electric", "request", "filament", "battery", "depth", "void", "divine", "ticket", "lumen", "prompt", "neural"].includes($dashboard) ? "rgba(255,255,255,.68)" : "rgba(38,50,56,.72)")};
  background: ${({ $active, $dashboard }) =>
    $active
      ? $dashboard === "ticket"
        ? "linear-gradient(135deg, #af40ff, #5b42f3 58%, #e8e8e8)"
        : $dashboard === "neural"
        ? "linear-gradient(135deg, #2a2a2a, #9370db 54%, #d4b5ff)"
        : $dashboard === "prompt"
        ? "linear-gradient(135deg, #7e7e7e, #363636 46%, #1b1b1b)"
        : $dashboard === "lumen"
        ? "radial-gradient(circle at 50% 0%, rgba(255,255,255,.9), rgba(255,255,255,.14) 42%, rgba(0,0,0,.42)), linear-gradient(135deg, #505050, #171717)"
        : $dashboard === "clay"
        ? "linear-gradient(135deg, #10b981, #0ea5e9 56%, #8b5cf6)"
        : $dashboard === "divine"
        ? "linear-gradient(135deg, #7c2039, #ff5e00 48%, #ffd700)"
        : $dashboard === "void"
        ? "linear-gradient(135deg, #00f2ff, #9d00ff 52%, #ff0055)"
        : $dashboard === "depth"
        ? "linear-gradient(135deg, #3eea8e, #ffffff22)"
        : $dashboard === "battery"
        ? "linear-gradient(135deg, #2dc48d, #1aa27a)"
        : $dashboard === "filament"
          ? "linear-gradient(135deg, #ff8800, #ffc4af)"
          : $dashboard === "electric"
            ? "linear-gradient(135deg, rgba(96,165,250,.5), rgba(154,77,241,.62), rgba(94,234,189,.36))"
            : $dashboard === "request"
              ? "linear-gradient(135deg, #6b3bd3, #ff8800)"
              : $dashboard === "premium"
                ? "radial-gradient(150% 100% at 50% 100%, #000 40%, transparent 80%), linear-gradient(90deg, #181924, #5691c8, #f7e6a1, #c4548e)"
                : "#4caf50"
      : ["electric", "request", "filament", "battery", "depth", "void", "divine", "ticket", "lumen", "prompt", "neural"].includes($dashboard)
        ? "rgba(255,255,255,.055)"
        : "rgba(255,255,255,.48)"};
  box-shadow: ${({ $active, $dashboard }) =>
    $active
      ? $dashboard === "ticket"
        ? "0 0 30px rgba(175,64,255,.34), inset 0 0 0 1px rgba(255,255,255,.2)"
        : $dashboard === "neural"
        ? "0 0 30px rgba(212,181,255,.24), inset 0 0 0 1px rgba(255,255,255,.18)"
        : $dashboard === "prompt"
        ? "0 18px 34px rgba(0,0,0,.36), inset 0 6px 12px rgba(255,255,255,.12), inset 0 0 0 1px rgba(255,255,255,.18)"
        : $dashboard === "lumen"
        ? "0 -12px 24px rgba(255,255,255,.14), 0 16px 34px rgba(0,0,0,.44), inset 0 1px 10px rgba(255,255,255,.38), inset 0 -18px 22px rgba(0,0,0,.42)"
        : $dashboard === "clay"
        ? "6px 6px 14px rgba(160,160,160,.42), -6px -6px 14px rgba(255,255,255,.82), inset 2px 2px 5px rgba(0,0,0,.1), inset -2px -2px 6px rgba(255,255,255,.28)"
        : $dashboard === "divine"
        ? "0 0 30px rgba(255,174,0,.3), inset 0 0 0 1px rgba(255,237,138,.2)"
        : $dashboard === "void"
        ? "0 0 30px rgba(0,242,255,.28), inset 0 0 0 1px rgba(255,255,255,.16)"
        : $dashboard === "depth"
        ? "0 0 26px rgba(62,234,142,.32), inset 0 0 0 1px rgba(255,255,255,.16)"
        : $dashboard === "battery"
        ? "0 0 26px rgba(45,196,141,.36), inset 0 0 0 1px rgba(255,255,255,.1)"
        : "0 14px 28px rgba(0,0,0,.18), inset 0 0 0 1px rgba(255,255,255,.18)"
      : "inset 0 0 0 1px rgba(255,255,255,.08)"};
  cursor: pointer;
  font-size: 9px;
  font-weight: 900;
  white-space: nowrap;
  transition: transform 220ms cubic-bezier(.22,1,.36,1), box-shadow 220ms ease, background-color 220ms ease;

  svg {
    flex: 0 0 15px;
    width: 15px;
    height: 15px;
  }

  .label {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }

  &::before {
    position: absolute;
    left: calc(100% + 8px);
    top: 50%;
    z-index: 20;
    min-width: max-content;
    content: attr(data-label);
    padding: 7px 10px;
    border-radius: 10px;
    color: ${({ $dashboard }) => (["electric", "request", "filament", "battery", "depth", "void", "divine", "ticket", "lumen", "prompt", "neural"].includes($dashboard) ? "#f8fafc" : "#263238")};
    background: ${({ $dashboard }) => (["electric", "request", "filament", "battery", "depth", "void", "divine", "ticket", "lumen", "prompt", "neural"].includes($dashboard) ? "rgba(18,18,18,.92)" : "rgba(255,255,255,.9)")};
    box-shadow: 0 14px 30px rgba(0,0,0,.22), inset 0 0 0 1px rgba(255,255,255,.14);
    opacity: 0;
    pointer-events: none;
    transform: translate3d(-4px, -50%, 0) scale(.96);
    transition: opacity 130ms ease, transform 180ms cubic-bezier(.22,1,.36,1);
  }

  &::after {
    position: absolute;
    inset: 0 auto 0 -42%;
    width: 38%;
    content: "";
    opacity: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.34), transparent);
    transform: skewX(-18deg);
    transition: transform 360ms cubic-bezier(.22,1,.36,1), opacity 180ms ease;
  }

  &:hover {
    transform: translateX(1px) translateY(-1px);
  }

  &:hover::before {
    opacity: 1;
    transform: translate3d(0, -50%, 0) scale(1);
  }

  &:hover::after {
    opacity: ${({ $active }) => ($active ? ".8" : ".34")};
    transform: translateX(380%) skewX(-18deg);
  }
`;

const GlobalSidebarFooter = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  height: 34px;
  place-items: center;
  margin: 0 4px 4px;
  padding: 0;
  border-radius: 12px;
  background: rgba(255,255,255,.12);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.1);

  &::before {
    display: grid;
    width: 24px;
    height: 24px;
    place-items: center;
    content: "S";
    border-radius: 50%;
    background: rgba(255,255,255,.18);
    box-shadow: inset 0 0 0 1px rgba(255,255,255,.14);
    font-size: 10px;
    font-weight: 950;
  }

  strong {
    display: none;
  }

  span {
    display: none;
  }
`;

const GlobalContent = styled.div`
  min-width: 0;
  width: 100%;
  align-self: stretch;
  max-height: 100vh;
  overflow: auto;
  padding: 0;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 999px;
    background: rgba(255,255,255,.22);
  }

  @media (max-width: 1040px) {
    max-height: none;
    overflow: visible;
  }
`;

const SoftFrame = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 20px;
  min-height: 100vh;
  width: 100%;
  max-width: none;
  margin: 0;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const GlassPanel = styled.div`
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.62);
  border-radius: ${t.radius};
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.68), rgba(255, 255, 255, 0.2) 46%, rgba(111, 213, 224, 0.14)),
    rgba(224, 228, 226, 0.55);
  box-shadow: ${t.containerShadow};
  backdrop-filter: blur(18px) saturate(1.35);

  &::before {
    position: absolute;
    inset: -42% auto auto -26%;
    width: 72%;
    height: 72%;
    content: "";
    border-radius: 43% 57% 65% 35% / 46% 42% 58% 54%;
    opacity: 0.34;
    filter: blur(30px);
    background:
      radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.92), transparent 0 22%),
      radial-gradient(circle at 62% 70%, rgba(119, 222, 234, 0.58), transparent 0 44%);
    animation: ${float} 9s cubic-bezier(0.45, 0, 0.2, 1) infinite alternate;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

const Sidebar = styled(GlassPanel)`
  min-height: calc(100vh - 48px);
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 18px;

  @media (max-width: 980px) {
    min-height: auto;
  }
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
`;

const BrandMark = styled.div`
  display: grid;
  width: 48px;
  height: 48px;
  place-items: center;
  border-radius: 50%;
  color: #ffffff;
  background: ${t.success};
  box-shadow: ${t.roundControlActiveShadow};
`;

const BrandCopy = styled.div`
  strong,
  span {
    display: block;
  }

  strong {
    font-size: 17px;
    letter-spacing: 0;
  }

  span {
    margin-top: 3px;
    color: ${t.muted};
    font-size: 12px;
    font-weight: 700;
  }
`;

const SidebarFooter = styled.div`
  margin-top: auto;
  padding: 14px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.48);
  box-shadow: ${t.insetShadow};

  strong,
  span {
    display: block;
  }

  strong {
    font-size: 15px;
  }

  span {
    margin-top: 5px;
    color: ${t.muted};
    font-size: 12px;
    line-height: 1.4;
  }
`;

const Main = styled.div`
  display: grid;
  gap: 12px;
  min-height: 100vh;
`;

const Header = styled(GlassPanel)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-radius: 0 26px 26px 0;
  padding: 16px 18px;

  @media (max-width: 760px) {
    align-items: stretch;
    flex-direction: column;
  }
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;

  h1 {
    margin: 0;
    color: #344246;
    font-size: clamp(24px, 3vw, 40px);
    letter-spacing: 0;
  }

  p {
    margin: 4px 0 0;
    color: ${t.muted};
    font-size: 13px;
    font-weight: 700;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-end;
`;

const IconButton = styled.button<{ $active?: boolean }>`
  display: inline-grid;
  width: 46px;
  height: 46px;
  place-items: center;
  border-radius: 50%;
  color: ${({ $active }) => ($active ? "#ffffff" : t.ink)};
  background: ${({ $active }) => ($active ? t.success : "rgba(255,255,255,.68)")};
  box-shadow: ${({ $active }) => ($active ? t.roundControlActiveShadow : t.roundControlShadow)};
  cursor: pointer;
  transition:
    transform 220ms ${t.spring},
    box-shadow 220ms ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const SearchShell = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 9px;
  align-items: center;
  min-width: min(300px, 100%);
  height: 46px;
  padding: 0 15px;
  border-radius: ${t.pill};
  background: ${t.bgInitial};
  box-shadow: ${t.insetShadow};
  color: ${t.muted};

  input {
    min-width: 0;
    border: 0;
    outline: 0;
    color: ${t.ink};
    background: transparent;
    font-weight: 800;
  }
`;

const SettingsPopover = styled(GlassPanel)`
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  z-index: 6;
  width: min(360px, calc(100vw - 36px));
  padding: 16px;
  animation: ${pop} 180ms ease both;

  @media (max-width: 760px) {
    position: static;
    width: 100%;
  }
`;

const ToggleGroup = styled.div`
  display: grid;
  gap: 8px;
  margin-top: 12px;

  label {
    color: ${t.muted};
    font-size: 12px;
    font-weight: 900;
    text-transform: uppercase;
  }
`;

const Segments = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(76px, 1fr));
  gap: 7px;
  padding: 7px;
  border-radius: 18px;
  background: ${t.bgInitial};
  box-shadow: ${t.insetShadow};
`;

const SegmentButton = styled.button<{ $active?: boolean }>`
  min-height: 38px;
  border-radius: 13px;
  color: ${({ $active }) => ($active ? t.ink : t.muted)};
  background: ${({ $active }) => ($active ? "rgba(255,255,255,.78)" : "transparent")};
  box-shadow: ${({ $active }) => ($active ? t.roundControlShadow : "none")};
  cursor: pointer;
  font-weight: 900;
`;

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 14px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(GlassPanel)<{ $span?: number; $tall?: boolean }>`
  grid-column: span ${({ $span }) => $span ?? 3};
  min-height: ${({ $tall }) => ($tall ? "300px" : "148px")};
  padding: 18px;
  transition:
    transform 260ms ${t.spring},
    box-shadow 260ms ease,
    border-color 260ms ease;

  &:hover {
    transform: translateY(-5px) scale(1.01);
    border-color: rgba(255,255,255,.82);
    box-shadow: ${t.hoverShadow};
  }

  @media (max-width: 1100px) {
    grid-column: span 3;
  }

  @media (max-width: 680px) {
    grid-column: 1 / -1;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;

  h2,
  p {
    margin: 0;
  }

  h2 {
    font-size: 17px;
  }

  p {
    margin-top: 5px;
    color: ${t.muted};
    font-size: 13px;
    line-height: 1.45;
  }
`;

const Bubble = styled.div<{ $tone?: string }>`
  display: grid;
  width: 46px;
  height: 46px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 50%;
  color: ${({ $tone }) => ($tone === "green" ? t.successDeep : $tone === "orange" ? "#ba7420" : "#237fb4")};
  background: rgba(255, 255, 255, 0.72);
  box-shadow: ${t.roundControlShadow};
`;

const StatValue = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 12px;

  strong {
    color: #314244;
    font-size: clamp(30px, 4vw, 46px);
    line-height: 0.95;
    letter-spacing: 0;
  }

  span {
    padding: 8px 11px;
    border-radius: ${t.pill};
    color: #ffffff;
    background: ${t.success};
    box-shadow: ${t.roundControlActiveShadow};
    font-size: 12px;
    font-weight: 900;
  }
`;

const ProgressTrack = styled.div`
  height: 12px;
  margin-top: 20px;
  overflow: hidden;
  border-radius: ${t.pill};
  background: ${t.bgInitial};
  box-shadow: ${t.insetShadow};

  span {
    display: block;
    height: 100%;
    width: var(--value);
    border-radius: inherit;
    background: linear-gradient(90deg, ${t.successDeep}, ${t.success});
  }
`;

const ChartCard = styled(Card)`
  min-height: 330px;
`;

const SoftFlowDock = styled.div`
  display: grid;
  grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr);
  gap: 12px;
  margin-top: 14px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const SoftTrendRail = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;

  button {
    display: grid;
    min-height: 76px;
    align-content: center;
    gap: 6px;
    border-radius: 22px;
    padding: 12px;
    color: #344246;
    background: ${t.bgInitial};
    box-shadow: ${t.insetShadow};
    cursor: pointer;
    text-align: left;
    transition: transform 220ms ${t.spring}, box-shadow 220ms ease, color 220ms ease;
  }

  button:hover {
    color: ${t.successDeep};
    box-shadow: ${t.roundControlShadow};
    transform: translateY(-4px);
  }

  strong,
  span {
    display: block;
  }

  strong {
    font-size: 20px;
    line-height: 1;
  }

  span {
    color: ${t.muted};
    font-size: 11px;
    font-weight: 900;
    text-transform: uppercase;
  }
`;

const SoftMiniMatrix = styled.div`
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 8px;
  padding: 12px;
  border-radius: 22px;
  background: rgba(255,255,255,.42);
  box-shadow: ${t.insetShadow};

  span {
    display: block;
    height: 36px;
    border-radius: 14px;
    background:
      linear-gradient(180deg, rgba(255,255,255,.82), rgba(255,255,255,.24)),
      linear-gradient(135deg, ${t.success}, #78ddec);
    box-shadow: ${t.roundControlShadow};
    opacity: var(--cell-opacity);
    transition: transform 180ms ${t.spring}, opacity 180ms ease;
  }

  span:hover {
    opacity: 1;
    transform: translateY(-4px) scale(1.04);
  }
`;

const BarChart = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  align-items: end;
  gap: 10px;
  height: 172px;
  padding: 16px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.42);
  box-shadow: ${t.insetShadow};
`;

const Bar = styled.div<{ $value: number }>`
  position: relative;
  min-height: 16px;
  height: ${({ $value }) => $value}%;
  overflow: hidden;
  border-radius: ${t.pill};
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.85), ${t.success} 34%, ${t.successDeep});
  box-shadow: ${t.roundControlActiveShadow};

  &::after {
    position: absolute;
    inset: 0 auto 0 -70%;
    width: 50%;
    content: "";
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.55), transparent);
    animation: ${sweep} 4s ease-in-out infinite;
  }
`;

const LineChart = styled.svg`
  width: 100%;
  height: 128px;
  overflow: visible;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.36);
  box-shadow: ${t.insetShadow};

  .line-path {
    stroke-dasharray: 720;
    stroke-dashoffset: 720;
    animation: ${softLineDraw} 1.6s ease forwards;
  }

  .area-path {
    transform-origin: left bottom;
    animation: ${softFillBreathe} 4.6s ease-in-out infinite;
  }
`;

const RankingList = styled.ol`
  display: grid;
  gap: 8px;
  padding: 0;
  margin: 0;
  list-style: none;
`;

const RankRow = styled.li`
  display: grid;
  grid-template-columns: 38px 1fr auto;
  gap: 10px;
  align-items: center;
  padding: 8px 10px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.48);
  box-shadow: ${t.insetShadow};
  transition:
    transform 220ms ${t.spring},
    box-shadow 220ms ease,
    background 220ms ease;

  &:hover {
    transform: translateX(5px);
    background: rgba(255,255,255,.64);
    box-shadow: ${t.roundControlShadow};
  }

  .rank {
    display: grid;
    width: 38px;
    height: 38px;
    place-items: center;
    border-radius: 50%;
    color: #ffffff;
    background: ${t.success};
    box-shadow: ${t.roundControlActiveShadow};
    font-weight: 900;
  }

  strong,
  span {
    display: block;
  }

  span {
    margin-top: 4px;
    color: ${t.muted};
    font-size: 12px;
    font-weight: 800;
  }

  .value {
    color: ${t.ink};
    font-weight: 900;
  }
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const SoftButton = styled.button<{ $active?: boolean; $danger?: boolean }>`
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 0 16px;
  border-radius: ${t.pill};
  color: ${({ $active, $danger }) => ($danger ? t.danger : $active ? "#ffffff" : t.ink)};
  background: ${({ $active, $danger }) => ($danger ? "rgba(255, 255, 255, 0.7)" : $active ? t.success : "rgba(255, 255, 255, 0.66)")};
  box-shadow: ${({ $active }) => ($active ? t.roundControlActiveShadow : t.roundControlShadow)};
  cursor: pointer;
  font-weight: 900;
  transition:
    transform 240ms ${t.spring},
    box-shadow 240ms ease,
    background 240ms ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${t.hoverShadow};
  }

  &:active {
    transform: scale(0.96);
  }
`;

const ModalBackdrop = styled.div<{ $electric?: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 20;
  display: grid;
  place-items: center;
  padding: 20px;
  background: ${({ $electric }) => ($electric ? "rgba(3, 5, 15, 0.66)" : "rgba(205, 224, 221, 0.42)")};
  backdrop-filter: blur(12px);
`;

const Modal = styled(GlassPanel)`
  width: min(520px, 100%);
  padding: 22px;
  animation: ${pop} 180ms ease both;
`;

const ModalTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;

  h2,
  p {
    margin: 0;
  }

  h2 {
    font-size: 24px;
  }

  p {
    margin-top: 7px;
    color: ${t.muted};
    line-height: 1.55;
  }
`;

const ElectricFrame = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 22px;
  width: 100%;
  max-width: none;
  margin: 0;
  color: rgba(248, 251, 255, 0.92);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ElectricRail = styled.aside`
  position: sticky;
  top: 18px;
  display: grid;
  align-content: start;
  gap: 14px;
  min-height: auto;
  padding: 14px;
  border-radius: 32px;
  background:
    linear-gradient(180deg, rgba(255,255,255,.1), rgba(255,255,255,.03)),
    #050713;
  box-shadow:
    0 24px 58px rgba(0, 0, 0, 0.42),
    inset 0 0 0 1px rgba(255, 255, 255, 0.09),
    inset 0 0 34px rgba(154, 77, 241, 0.18);

  @media (max-width: 900px) {
    position: static;
    min-height: auto;
    grid-template-columns: auto 1fr;
    align-items: center;
  }
`;

const ElectricLogo = styled.div`
  display: grid;
  width: 68px;
  height: 68px;
  place-items: center;
  border-radius: 24px;
  background:
    linear-gradient(#060814, #060814) padding-box,
    linear-gradient(135deg, #60a5fa, #9a4df1, #5eeabd) border-box;
  border: 1px solid transparent;
  box-shadow:
    0 0 30px rgba(154, 77, 241, 0.46),
    inset 0 0 24px rgba(94, 234, 189, 0.18);
  color: #ffffff;
`;

const ElectricNav = styled.nav`
  display: grid;
  gap: 12px;

  @media (max-width: 900px) {
    display: flex;
    overflow-x: auto;
    padding-bottom: 2px;
  }
`;

const ElectricIconButton = styled.button<{ $active?: boolean }>`
  position: relative;
  display: grid;
  width: 68px;
  height: 60px;
  place-items: center;
  border-radius: 22px;
  color: ${({ $active }) => ($active ? "#ffffff" : "rgba(248,251,255,.58)")};
  background: ${({ $active }) =>
    $active ? "linear-gradient(140deg, rgba(96,165,250,.24), rgba(154,77,241,.28), rgba(94,234,189,.18))" : "rgba(255,255,255,.04)"};
  box-shadow: ${({ $active }) =>
    $active
      ? "0 0 28px rgba(154,77,241,.34), inset 0 0 0 1px rgba(255,255,255,.16)"
      : "inset 0 0 0 1px rgba(255,255,255,.06)"};
  cursor: pointer;
  transition:
    transform 220ms ease,
    box-shadow 220ms ease;

  &:hover {
    transform: translateY(-2px);
  }

  ${({ $active }) =>
    $active &&
    css`
      &::after {
        position: absolute;
        right: -4px;
        width: 4px;
        height: 26px;
        content: "";
        border-radius: 999px;
        background: #5eeabd;
        box-shadow: 0 0 18px #5eeabd;
      }
    `}
`;

const ElectricMain = styled.div`
  position: relative;
  display: grid;
  gap: 12px;
  height: 100vh;
  min-height: 0;
  max-height: 100vh;
  overflow: hidden;
  grid-template-rows: auto 1fr;
`;

const ElectricTopbar = styled.header`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(240px, 360px);
  gap: 18px;
  align-items: center;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const ElectricTitle = styled.div`
  h1 {
    margin: 0;
    color: #ffffff;
    font-size: clamp(30px, 5vw, 62px);
    line-height: 0.9;
    letter-spacing: 0;
    text-shadow:
      0 0 18px rgba(154, 77, 241, 0.5),
      0 0 40px rgba(94, 234, 189, 0.18);
  }

  p {
    max-width: 620px;
    margin: 6px 0 0;
    color: rgba(248, 251, 255, 0.64);
    font-size: 12px;
    font-weight: 800;
    line-height: 1.55;
  }
`;

const ElectricSearch = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 10px;
  align-items: center;
  min-width: 0;
  height: 56px;
  padding: 0 16px;
  border-radius: 22px;
  color: rgba(248, 251, 255, 0.62);
  background:
    linear-gradient(#070a16, #070a16) padding-box,
    linear-gradient(100deg, rgba(96,165,250,.5), rgba(154,77,241,.46), rgba(94,234,189,.44)) border-box;
  border: 1px solid transparent;
  box-shadow:
    0 18px 44px rgba(0, 0, 0, 0.24),
    inset 0 0 24px rgba(255, 255, 255, 0.04);

  input {
    min-width: 0;
    border: 0;
    outline: 0;
    color: #ffffff;
    background: transparent;
    font-weight: 900;
  }
`;

const ElectricLayout = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(250px, .42fr);
  gap: 18px;
  min-height: 0;
  overflow: hidden;
  align-items: stretch;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const ElectricHero = styled.div`
  position: relative;
  min-height: 100%;
  overflow: hidden;
  padding: clamp(10px, 2vw, 26px) 0;
  background:
    radial-gradient(circle at 78% 22%, rgba(94, 234, 189, 0.28), transparent 0 22%),
    radial-gradient(circle at 28% 16%, rgba(154, 77, 241, 0.36), transparent 0 34%),
    linear-gradient(90deg, rgba(96,165,250,.12) 1px, transparent 1px),
    linear-gradient(180deg, rgba(94,234,189,.08) 1px, transparent 1px);
  background-size: auto, auto, 72px 72px, 72px 72px;

  &::before {
    position: absolute;
    inset: 6px 0 auto;
    height: 3px;
    content: "";
    border-radius: 999px;
    background: linear-gradient(90deg, transparent, #60a5fa, #9a4df1, #5eeabd, transparent);
    animation: ${arcFlash} 2.3s ease-in-out infinite;
    transform-origin: center;
  }

  &::after {
    position: absolute;
    right: -190px;
    bottom: -250px;
    width: 590px;
    height: 590px;
    content: "";
    border-radius: 43%;
    background:
      radial-gradient(circle at 50% 46%, rgba(255,255,255,.58), transparent 0 16%),
      radial-gradient(circle at 52% 56%, rgba(94,234,189,.46), transparent 0 33%),
      radial-gradient(circle at 46% 54%, rgba(154,77,241,.42), transparent 0 45%);
    opacity: 0.7;
    filter: blur(5px);
    animation: ${waveSpin} 12s linear infinite;
  }
`;

const ElectricHeroContent = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(170px, .42fr);
  gap: 22px;
  align-items: center;
  min-height: 310px;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const ElectricHeroCopy = styled.div`
  h2 {
    max-width: 620px;
    margin: 0;
    color: #ffffff;
    font-size: clamp(34px, 5.6vw, 66px);
    line-height: 0.86;
    letter-spacing: 0;
  }

  p {
    max-width: 560px;
    margin: 18px 0 0;
    color: rgba(248, 251, 255, 0.66);
    font-size: 15px;
    font-weight: 800;
    line-height: 1.55;
  }
`;

const ElectricButtonDeck = styled.div`
  display: grid;
  gap: 18px;
  justify-items: start;
  margin-top: 28px;
`;

const ElectricArcDock = styled.div`
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin-top: 24px;

  button {
    position: relative;
    display: grid;
    min-height: 84px;
    align-content: center;
    gap: 7px;
    overflow: hidden;
    border-radius: 24px;
    padding: 12px;
    color: rgba(248,251,255,.9);
    background:
      linear-gradient(#070a16, #070a16) padding-box,
      linear-gradient(135deg, var(--arc), rgba(255,255,255,.14), transparent) border-box;
    border: 1px solid transparent;
    box-shadow: inset 0 0 24px rgba(255,255,255,.035), 0 0 22px color-mix(in srgb, var(--arc) 34%, transparent);
    cursor: pointer;
    text-align: left;
    transition: transform 220ms cubic-bezier(.22,1,.36,1), box-shadow 220ms ease, filter 220ms ease;
  }

  button::after {
    position: absolute;
    inset: auto 10px 10px;
    height: 4px;
    content: "";
    border-radius: 999px;
    background: var(--arc);
    box-shadow: 0 0 14px var(--arc);
    transform: scaleX(var(--charge));
    transform-origin: left;
  }

  button:hover {
    filter: brightness(1.12);
    box-shadow: inset 0 0 28px rgba(255,255,255,.055), 0 0 32px color-mix(in srgb, var(--arc) 58%, transparent);
    transform: translateY(-5px);
  }

  strong,
  span {
    display: block;
  }

  strong {
    color: #ffffff;
    font-size: 22px;
    line-height: 1;
  }

  span {
    color: rgba(248,251,255,.56);
    font-size: 10px;
    font-weight: 900;
    letter-spacing: .1em;
    text-transform: uppercase;
  }

  @media (max-width: 820px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const ElectricButton = styled.button`
  position: relative;
  width: min(320px, 100%);
  height: 72px;
  overflow: hidden;
  border-radius: 50px;
  color: rgba(255, 255, 255, 0.88);
  background: linear-gradient(to bottom, #000000 72%, #f2f2f2 120%);
  box-shadow:
    0 -10px 30px rgba(57, 20, 115, 0.3),
    0 20px 30px rgba(57, 20, 115, 0.4),
    inset 0 0 2px 0 black;
  cursor: pointer;
  font-size: 21px;
  font-weight: 900;
  isolation: isolate;
  transition: transform 420ms ${t.spring};

  &:hover {
    transform: translateY(-4px) scale(1.015);
  }

  &::before {
    position: absolute;
    inset: -3px;
    content: "";
    border-radius: inherit;
    padding: 2px;
    background: repeating-linear-gradient(100deg, #60a5fa 10%, #f9799c 15%, #60a5fa 20%, #5eeabd 25%, #9a4df1 30%);
    background-size: 260% 100%;
    animation: ${electricSweep} 4s linear infinite;
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    mask-composite: exclude;
    opacity: 0.95;
    z-index: 2;
  }

  &::after {
    position: absolute;
    left: 50%;
    top: 56px;
    width: 560px;
    height: 560px;
    content: "";
    border-radius: 46%;
    background: radial-gradient(white 42%, #03081b 67%);
    opacity: 0.34;
    filter: blur(3px);
    animation: ${waveSpin} 5s linear infinite;
    z-index: 1;
  }

  .shine {
    position: absolute;
    inset: 0;
    z-index: 3;
    border-radius: inherit;
    background:
      linear-gradient(105deg, transparent 0 30%, rgba(244,221,255,.42) 45%, transparent 62%),
      linear-gradient(180deg, rgba(255,255,255,.28), transparent 46%);
    transform: translateX(-36%);
    transition: transform 560ms ease;
    mix-blend-mode: screen;
  }

  &:hover .shine {
    transform: translateX(24%);
  }

  .electric-text {
    position: relative;
    z-index: 4;
    display: inline-flex;
    gap: 0;
    letter-spacing: 0;
    animation: ${electricPulse} 2s ease-in-out infinite;
  }
`;

const ParticleField = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;

  span {
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--particle-color);
    box-shadow: 0 0 18px var(--particle-color);
    opacity: .8;
  }

  span:nth-child(1) { left: 18%; top: 18%; --particle-color: #60a5fa; }
  span:nth-child(2) { left: 68%; top: 17%; --particle-color: #5eeabd; }
  span:nth-child(3) { left: 78%; top: 46%; --particle-color: #f9799c; }
  span:nth-child(4) { left: 42%; top: 78%; --particle-color: #9a4df1; }
  span:nth-child(5) { left: 14%; top: 67%; --particle-color: #5eeabd; }
`;

const ElectricGauge = styled.div`
  position: relative;
  display: grid;
  aspect-ratio: 1;
  max-width: 260px;
  min-height: 0;
  place-items: center;
  border-radius: 50%;
  background:
    linear-gradient(#070a16, #070a16) padding-box,
    conic-gradient(from 140deg, #60a5fa, #9a4df1, #5eeabd, #f9799c, #60a5fa) border-box;
  border: 1px solid transparent;
  box-shadow:
    0 24px 70px rgba(0, 0, 0, 0.28),
    inset 0 0 38px rgba(255, 255, 255, 0.05);

  &::before {
    position: absolute;
    width: min(68%, 260px);
    aspect-ratio: 1;
    content: "";
    border-radius: 50%;
    background:
      radial-gradient(circle, #070a16 0 52%, transparent 53%),
      conic-gradient(from -30deg, #5eeabd 0 38%, rgba(255,255,255,.08) 38% 100%);
    filter: drop-shadow(0 0 22px rgba(94, 234, 189, 0.35));
  }

  strong,
  span {
    position: relative;
    z-index: 1;
    display: block;
    text-align: center;
  }

  strong {
    color: #ffffff;
    font-size: clamp(54px, 8vw, 92px);
    line-height: .88;
  }

  span {
    margin-top: 10px;
    color: rgba(248,251,255,.62);
    font-size: 12px;
    font-weight: 900;
    text-transform: uppercase;
  }
`;

const ElectricSideStack = styled.div`
  display: grid;
  grid-template-rows: minmax(0, .92fr) minmax(0, .78fr) minmax(0, 1fr);
  gap: 12px;
  align-self: stretch;
  min-height: 0;
  overflow: hidden;
  padding-right: 2px;
  scrollbar-width: thin;

  > div {
    min-height: 0;
    overflow: auto;
    padding: 14px;
  }
`;

const ElectricPanel = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 32px;
  padding: 16px;
  background:
    linear-gradient(#070a16, #070a16) padding-box,
    linear-gradient(130deg, rgba(96,165,250,.55), rgba(154,77,241,.45), rgba(94,234,189,.5)) border-box;
  border: 1px solid transparent;
  box-shadow:
    0 22px 54px rgba(0, 0, 0, 0.34),
    inset 0 0 30px rgba(255, 255, 255, 0.035);

  h3,
  p {
    margin: 0;
  }

  h3 {
    color: #ffffff;
    font-size: 18px;
  }

  p {
    margin-top: 6px;
    color: rgba(248, 251, 255, 0.58);
    font-size: 13px;
    font-weight: 800;
  }
`;

const ElectricMetricGrid = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 3;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 0;
  align-items: stretch;

  @media (max-width: 720px) {
    display: grid;
  }
`;

const ElectricMetricCard = styled.div<{ $accent: string }>`
  position: relative;
  flex: 1 1 132px;
  min-height: 60px;
  border-radius: 999px;
  padding: 12px 16px;
  background: linear-gradient(90deg, ${({ $accent }) => `${$accent}20`}, rgba(255,255,255,.045));
  box-shadow:
    inset 0 0 0 1px rgba(255,255,255,.08),
    0 0 26px ${({ $accent }) => `${$accent}22`};
  transition:
    transform 260ms ease,
    box-shadow 260ms ease,
    background 260ms ease;

  &:hover {
    transform: translateY(-3px);
    background: rgba(255,255,255,.08);
    box-shadow:
      inset 0 0 0 1px rgba(255,255,255,.14),
      0 0 34px ${({ $accent }) => `${$accent}55`};
  }

  &::after {
    position: absolute;
    right: -34px;
    bottom: -48px;
    width: 112px;
    height: 112px;
    content: "";
    border-radius: 48%;
    background: ${({ $accent }) => $accent};
    opacity: .24;
    filter: blur(6px);
  }

  span,
  strong,
  em {
    position: relative;
    z-index: 1;
    display: block;
  }

  span {
    color: rgba(248,251,255,.58);
    font-size: 12px;
    font-weight: 900;
    text-transform: uppercase;
  }

  strong {
    margin-top: 6px;
    color: #ffffff;
    font-size: clamp(28px, 3.4vw, 42px);
    line-height: .9;
  }

  em {
    margin-top: 8px;
    color: ${({ $accent }) => $accent};
    font-style: normal;
    font-weight: 900;
  }
`;

const NeonBars = styled.div`
  display: grid;
  gap: 10px;
  margin-top: 14px;
`;

const NeonBarRow = styled.div<{ $value: number; $accent: string }>`
  display: grid;
  grid-template-columns: 104px 1fr 42px;
  gap: 12px;
  align-items: center;
  color: rgba(248,251,255,.72);
  font-size: 12px;
  font-weight: 900;

  .track {
    height: 12px;
    overflow: hidden;
    border-radius: 999px;
    background: rgba(255,255,255,.08);
    box-shadow: inset 0 0 0 1px rgba(255,255,255,.05);
  }

  .fill {
    width: ${({ $value }) => $value}%;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, ${({ $accent }) => $accent}, #ffffff);
    box-shadow: 0 0 18px ${({ $accent }) => $accent};
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const ElectricFeedList = styled.div`
  display: grid;
  gap: 9px;
  margin-top: 14px;
`;

const ElectricFeedRow = styled.div<{ $tone: string }>`
  display: grid;
  grid-template-columns: 14px 1fr auto;
  gap: 10px;
  align-items: center;
  padding: 10px;
  border-radius: 20px;
  background: rgba(255,255,255,.055);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.07);

  i {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ $tone }) => $tone};
    box-shadow: 0 0 16px ${({ $tone }) => $tone};
  }

  strong,
  span {
    display: block;
  }

  strong {
    color: #ffffff;
    font-size: 13px;
  }

  span {
    margin-top: 3px;
    color: rgba(248,251,255,.52);
    font-size: 12px;
    font-weight: 800;
  }

  em {
    color: rgba(248,251,255,.7);
    font-size: 12px;
    font-style: normal;
    font-weight: 900;
  }
`;

const ElectricRankGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(300px, .72fr) minmax(0, 1fr);
  gap: 18px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const ElectricWaveChart = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  align-items: end;
  gap: 8px;
  height: 92px;
  margin-top: 22px;
  padding: 18px;
  border-radius: 28px;
  background:
    radial-gradient(circle at 50% 110%, rgba(94,234,189,.18), transparent 0 48%),
    rgba(255,255,255,.045);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.07);

  span {
    height: var(--h);
    min-height: 24px;
    border-radius: 999px 999px 8px 8px;
    background:
      linear-gradient(180deg, rgba(255,255,255,.82), rgba(94,234,189,.86) 34%, rgba(154,77,241,.78));
    box-shadow:
      0 0 20px rgba(94,234,189,.3),
      inset 0 1px 1px rgba(255,255,255,.45);
    animation: ${arcFlash} 2.8s ease-in-out infinite;
    animation-delay: var(--d);
    transition: transform 220ms ease, filter 220ms ease;
  }

  span:hover {
    transform: translateY(-8px);
    filter: brightness(1.18);
  }
`;

const ElectricOrbitalStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-top: 16px;

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

const ElectricOrb = styled.div<{ $accent: string }>`
  position: relative;
  display: grid;
  min-height: 134px;
  place-items: center;
  overflow: hidden;
  border-radius: 50%;
  background:
    radial-gradient(circle at 34% 24%, rgba(255,255,255,.52), transparent 0 18%),
    radial-gradient(circle, ${({ $accent }) => `${$accent}66`}, rgba(255,255,255,.05) 62%);
  box-shadow:
    0 0 34px ${({ $accent }) => `${$accent}44`},
    inset 0 0 0 1px rgba(255,255,255,.1),
    inset 0 -22px 36px rgba(0,0,0,.26);
  transition: transform 260ms ease, box-shadow 260ms ease;

  &:hover {
    transform: translateY(-7px) scale(1.04);
    box-shadow:
      0 0 44px ${({ $accent }) => `${$accent}77`},
      inset 0 0 0 1px rgba(255,255,255,.16),
      inset 0 -22px 36px rgba(0,0,0,.3);
  }

  strong,
  span {
    grid-area: 1 / 1;
    display: block;
    text-align: center;
  }

  strong {
    color: #ffffff;
    font-size: 31px;
    line-height: 1;
  }

  span {
    margin-top: 44px;
    color: rgba(248,251,255,.62);
    font-size: 11px;
    font-weight: 900;
    text-transform: uppercase;
  }
`;

const ElectricLeaderboard = styled.ol`
  display: grid;
  gap: 9px;
  padding: 0;
  margin: 14px 0 0;
  list-style: none;
`;

const ElectricRankRow = styled.li`
  display: grid;
  grid-template-columns: 42px 1fr auto;
  gap: 10px;
  align-items: center;
  padding: 10px;
  border-radius: 22px;
  background: rgba(255,255,255,.055);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.07);
  transition:
    transform 220ms ease,
    background 220ms ease,
    box-shadow 220ms ease;

  &:hover {
    transform: translateX(7px);
    background: rgba(255,255,255,.085);
    box-shadow: inset 0 0 0 1px rgba(94,234,189,.26), 0 0 26px rgba(154,77,241,.18);
  }

  .rank {
    display: grid;
    width: 42px;
    height: 42px;
    place-items: center;
    border-radius: 16px;
    color: #ffffff;
    background: linear-gradient(135deg, #60a5fa, #9a4df1 54%, #5eeabd);
    box-shadow: 0 0 20px rgba(154,77,241,.4);
    font-weight: 900;
  }

  strong,
  span {
    display: block;
  }

  strong {
    color: #ffffff;
  }

  span {
    margin-top: 4px;
    color: rgba(248,251,255,.52);
    font-size: 12px;
    font-weight: 800;
  }

  .amount {
    color: #5eeabd;
    font-weight: 900;
  }
`;

const ElectricModal = styled(ElectricPanel)`
  width: min(560px, 100%);
  animation: ${pop} 180ms ease both;
`;

const PremiumFrame = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 24px;
  width: 100%;
  max-width: none;
  margin: 0;
  color: #181924;

  @media (max-width: 1040px) {
    grid-template-columns: 1fr;
  }
`;

const PremiumAside = styled.aside`
  position: sticky;
  top: 18px;
  min-height: auto;
  padding: 18px;
  border-radius: 36px;
  background:
    linear-gradient(145deg, rgba(255,255,255,.68), rgba(255,255,255,.28)),
    rgba(245, 238, 226, .56);
  box-shadow:
    18px 18px 42px rgba(84, 72, 92, .14),
    -14px -14px 34px rgba(255, 255, 255, .62),
    inset 0 0 0 1px rgba(255,255,255,.68);
  backdrop-filter: blur(24px) saturate(1.26);

  @media (max-width: 1040px) {
    position: static;
    min-height: auto;
  }
`;

const PremiumBrand = styled.div`
  display: grid;
  gap: 14px;
  padding: 14px;

  .mark {
    display: grid;
    width: 68px;
    height: 68px;
    place-items: center;
    border-radius: 28px;
    color: #ffffff;
    background:
      radial-gradient(120% 100% at 50% 100%, #000000 34%, transparent 82%),
      linear-gradient(90deg, #181924 0%, #5691c8 28%, #f7e6a1 55%, #c4548e 82%, #181924 100%);
    box-shadow:
      0 18px 28px rgba(24, 25, 36, .2),
      inset 1px -1px 2px rgba(255,255,255,.5),
      inset -8px 4px 10px -6px rgba(0,0,0,.34);
  }

  h2 {
    margin: 0;
    font-size: 28px;
    line-height: .95;
    letter-spacing: 0;
  }

  p {
    margin: 0;
    color: rgba(24,25,36,.56);
    font-size: 13px;
    font-weight: 800;
    line-height: 1.5;
  }
`;

const PremiumNav = styled.nav`
  display: grid;
  gap: 10px;
  margin-top: 18px;
`;

const PremiumNavButton = styled.button<{ $active?: boolean }>`
  display: flex;
  min-height: 52px;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  border-radius: 999px;
  color: ${({ $active }) => ($active ? "#ffffff" : "#181924")};
  background: ${({ $active }) =>
    $active
      ? "radial-gradient(150% 100% at 50% 100%, #000000 40%, transparent 80%), linear-gradient(90deg, #181924 0%, #5691c8 25%, #f7e6a1 50%, #c4548e 75%, #181924 100%)"
      : "rgba(255,255,255,.46)"};
  box-shadow: ${({ $active }) =>
    $active
      ? "0 14px 26px rgba(24,25,36,.24), inset 1px -1px 2px rgba(255,255,255,.48), inset -8px 4px 10px -6px rgba(0,0,0,.3)"
      : "inset 4px 5px 10px rgba(74,71,78,.1), inset -4px -5px 12px rgba(255,255,255,.72)"};
  cursor: pointer;
  font-weight: 900;
  transition:
    transform 220ms ease,
    box-shadow 220ms ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const PremiumMain = styled.div`
  display: grid;
  gap: 14px;
  min-height: 100vh;
  align-content: stretch;
`;

const PremiumHero = styled.section`
  position: relative;
  min-height: 238px;
  overflow: hidden;
  padding: clamp(14px, 2vw, 24px) 0;
  background:
    linear-gradient(90deg, rgba(24,25,36,.14), transparent 1px),
    linear-gradient(180deg, rgba(255,255,255,.38), transparent 1px);
  background-size: 86px 86px;

  &::before {
    position: absolute;
    right: -120px;
    top: -160px;
    width: 430px;
    height: 430px;
    content: "";
    border-radius: 48%;
    background:
      radial-gradient(circle at 42% 38%, rgba(255,255,255,.85), transparent 0 15%),
      radial-gradient(circle at 54% 58%, rgba(86,145,200,.58), transparent 0 36%),
      radial-gradient(circle at 52% 52%, rgba(196,84,142,.42), transparent 0 54%);
    opacity: .58;
    filter: blur(7px);
    animation: ${waveSpin} 16s linear infinite;
  }
`;

const PremiumHeroGrid = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(210px, .34fr);
  gap: 22px;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const PremiumHeadline = styled.div`
  display: grid;
  gap: 14px;

  h1 {
    max-width: 740px;
    margin: 0;
    color: #181924;
    font-size: clamp(38px, 5vw, 66px);
    line-height: .86;
    letter-spacing: 0;
  }

  p {
    max-width: 650px;
    margin: 0;
    color: rgba(24,25,36,.62);
    font-size: 12px;
    font-weight: 800;
    line-height: 1.58;
  }
`;

const PremiumButton = styled.button`
  position: relative;
  width: min(300px, 100%);
  padding: 3px;
  overflow: hidden;
  border-radius: 999px;
  color: #ffffff;
  background: #181924;
  box-shadow:
    0 10px 20px rgba(0, 0, 0, 0.25),
    0 2px 8px rgba(0, 0, 0, 0.45);
  cursor: pointer;
  animation: ${premiumFloat} 2.5s infinite ease-in-out;
  transition: all 150ms ease-in-out;

  &::before {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 250%;
    aspect-ratio: 1;
    content: "";
    background: linear-gradient(
      to right,
      transparent 30%,
      rgba(255, 255, 255, 0.8) 45%,
      #db92e8 50%,
      rgba(255, 255, 255, 0.8) 55%,
      transparent 70%
    );
    transform: translate(-50%, -50%);
    animation: ${premiumSpin} 3s linear infinite;
    animation-play-state: paused;
    z-index: 0;
  }

  .text {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    min-height: 58px;
    padding: 0 48px;
    overflow: hidden;
    border-radius: inherit;
    background:
      radial-gradient(150% 100% at 50% 100%, #000000 40%, transparent 80%),
      linear-gradient(90deg, #181924 0%, #5691c8 25%, #f7e6a1 50%, #c4548e 75%, #181924 100%);
    box-shadow:
      1px -1px 2px hsl(0 0% 100% / 0.5) inset,
      0px -1px 2px hsl(0 0% 100% / 0.5) inset,
      -1px -1px 2px hsl(0 0% 100% / 0.5) inset,
      1px 1px 2px hsl(0 0% 30% / 0.5) inset,
      -8px 4px 10px -6px hsl(0 0% 30% / 0.25) inset,
      -1px 1px 6px hsl(0 0% 30% / 0.25) inset,
      -1px -1px 8px hsl(0 0% 60% / 0.15),
      3px 6px 16px -6px hsl(0 0% 30% / 0.5);
    font-size: clamp(18px, 2.4vw, 22px);
    font-weight: 500;
    text-shadow:
      0 1px 3px rgba(0, 0, 0, 0.8),
      0 0 8px rgba(255, 255, 255, 0.3);
  }

  .text::before,
  .text::after {
    position: absolute;
    inset: 0;
    z-index: 2;
    content: "";
    border-radius: inherit;
    pointer-events: none;
  }

  .text::before {
    background: linear-gradient(155deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.05) 42%, transparent 42.5%);
  }

  .text::after {
    background: linear-gradient(-155deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.05) 42%, transparent 42.5%);
  }

  .words {
    position: relative;
    z-index: 3;
    display: flex;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .char {
    position: relative;
    display: block;
    overflow: hidden;
  }

  .char span {
    display: block;
    transition: transform 0.4s cubic-bezier(0.5, 0, 0.2, 1);
    transition-delay: calc(var(--i) * 0.03s);
  }

  .char span::after {
    position: absolute;
    top: 100%;
    left: 0;
    content: attr(data-label);
    color: #db92e8;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
  }

  svg {
    position: absolute;
    right: -40px;
    z-index: 3;
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover {
    animation: none;
    transform: translateY(-2px);
  }

  &:hover::before {
    animation-play-state: running;
  }

  &:hover .words {
    transform: translateX(-16px);
  }

  &:hover .char span {
    transform: translateY(-100%);
  }

  &:hover svg {
    right: 30px;
    opacity: 1;
  }

  &:active {
    transform: translateY(2px) scale(0.96);
    box-shadow:
      0 2px 4px rgba(0, 0, 0, 0.15),
      0 0 0 rgba(0, 0, 0, 0.1);
  }
`;

const PremiumPanel = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 34px;
  padding: 14px;
  background:
    linear-gradient(145deg, rgba(255,255,255,.62), rgba(255,255,255,.22)),
    rgba(255, 255, 255, .32);
  box-shadow:
    16px 18px 48px rgba(84, 72, 92, .13),
    -12px -12px 34px rgba(255,255,255,.58),
    inset 0 0 0 1px rgba(255,255,255,.64);
  backdrop-filter: blur(24px) saturate(1.22);

  h3,
  p {
    margin: 0;
  }

  h3 {
    color: #181924;
    font-size: 18px;
  }

  p {
    margin-top: 6px;
    color: rgba(24,25,36,.55);
    font-size: 13px;
    font-weight: 800;
  }
`;

const PremiumTileGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  @media (max-width: 780px) {
    display: grid;
  }
`;

const PremiumTile = styled(PremiumPanel)<{ $tone: string }>`
  flex: 1 1 220px;
  min-height: 102px;
  border-radius: 999px;
  padding: 16px 22px;
  background:
    linear-gradient(90deg, rgba(255,255,255,.7), ${({ $tone }) => `${$tone}55`}),
    rgba(255,255,255,.3);
  transition:
    transform 260ms ease,
    box-shadow 260ms ease;

  &:hover {
    transform: translateY(-6px) rotate(-.4deg);
    box-shadow:
      18px 22px 54px rgba(84, 72, 92, .17),
      -12px -12px 34px rgba(255,255,255,.64),
      inset 0 0 0 1px rgba(255,255,255,.74);
  }

  &::after {
    position: absolute;
    right: -26px;
    bottom: -44px;
    width: 126px;
    height: 126px;
    content: "";
    border-radius: 45%;
    background: ${({ $tone }) => $tone};
    opacity: .42;
    filter: blur(4px);
  }

  span,
  strong,
  em {
    position: relative;
    z-index: 1;
    display: block;
  }

  span {
    color: rgba(24,25,36,.56);
    font-size: 12px;
    font-weight: 900;
    text-transform: uppercase;
  }

  strong {
    margin-top: 8px;
    color: #181924;
    font-size: clamp(32px, 4vw, 52px);
    line-height: .86;
  }

  em {
    margin-top: 14px;
    color: rgba(24,25,36,.58);
    font-style: normal;
    font-weight: 900;
  }
`;

const PremiumCapsuleRail = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-top: 14px;

  button {
    position: relative;
    min-height: 74px;
    overflow: hidden;
    border-radius: 999px;
    padding: 11px 16px;
    color: #181924;
    background:
      linear-gradient(90deg, rgba(255,255,255,.7), var(--capsule)),
      rgba(255,255,255,.42);
    box-shadow:
      inset 3px 4px 9px rgba(84,72,92,.08),
      inset -3px -4px 11px rgba(255,255,255,.72),
      8px 10px 22px rgba(84,72,92,.1);
    cursor: pointer;
    text-align: left;
    transition: transform 210ms cubic-bezier(.22,1,.36,1), box-shadow 210ms ease;
  }

  button::after {
    position: absolute;
    right: -18px;
    bottom: -34px;
    width: 92px;
    height: 92px;
    content: "";
    border-radius: 45%;
    background: var(--capsule);
    opacity: .45;
    filter: blur(4px);
  }

  button:hover {
    box-shadow:
      inset 0 0 0 1px rgba(255,255,255,.74),
      12px 14px 30px rgba(84,72,92,.15);
    transform: translateY(-5px) rotate(-.35deg);
  }

  strong,
  span {
    position: relative;
    z-index: 1;
    display: block;
  }

  strong {
    font-size: 20px;
    line-height: 1;
  }

  span {
    margin-top: 7px;
    color: rgba(24,25,36,.56);
    font-size: 10px;
    font-weight: 900;
    letter-spacing: .08em;
    text-transform: uppercase;
  }
`;

const PremiumMemberTrack = styled.div`
  display: grid;
  gap: 8px;
  margin-top: 12px;
  padding: 10px;
  border-radius: 26px;
  background: rgba(255,255,255,.42);
  box-shadow: inset 7px 8px 16px rgba(84,72,92,.08), inset -7px -8px 18px rgba(255,255,255,.68);

  button {
    display: grid;
    grid-template-columns: 34px 1fr auto;
    gap: 10px;
    align-items: center;
    min-height: 42px;
    border-radius: 18px;
    padding: 7px 10px;
    color: #181924;
    background: rgba(255,255,255,.46);
    cursor: pointer;
    text-align: left;
    transition: transform 180ms cubic-bezier(.22,1,.36,1), background-color 180ms ease, box-shadow 180ms ease;
  }

  button:hover {
    background: rgba(255,255,255,.68);
    box-shadow: 8px 9px 20px rgba(84,72,92,.1);
    transform: translateX(5px);
  }

  i {
    width: 34px;
    height: 24px;
    border-radius: 999px;
    background:
      radial-gradient(120% 100% at 50% 100%, #000 18%, transparent 72%),
      linear-gradient(90deg, #5691c8, #f7e6a1, #c4548e);
    box-shadow: inset 1px -1px 2px rgba(255,255,255,.5);
  }

  strong,
  span,
  em {
    display: block;
  }

  strong {
    font-size: 12px;
  }

  span,
  em {
    color: rgba(24,25,36,.52);
    font-size: 10px;
    font-weight: 900;
  }

  em {
    color: #181924;
    font-style: normal;
  }
`;

const PremiumLowerGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(230px, .36fr);
  gap: 18px;
  min-height: 310px;

  > ${PremiumPanel} {
    height: 100%;
    max-height: 360px;
    overflow: auto;
    scrollbar-width: thin;
  }

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const PremiumChart = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  align-items: end;
  gap: 12px;
  height: 220px;
  margin-top: 22px;
  padding: 18px;
  border-radius: 28px;
  background: rgba(255,255,255,.44);
  box-shadow: inset 8px 8px 18px rgba(84,72,92,.1), inset -8px -8px 18px rgba(255,255,255,.72);
`;

const PremiumChartBar = styled.div<{ $value: number }>`
  position: relative;
  height: ${({ $value }) => $value}%;
  min-height: 26px;
  overflow: hidden;
  border-radius: 999px;
  background:
    radial-gradient(120% 100% at 50% 100%, #000000 20%, transparent 74%),
    linear-gradient(180deg, #5691c8 0%, #f7e6a1 48%, #c4548e 100%);
  box-shadow:
    0 12px 24px rgba(84,72,92,.16),
    inset 1px -1px 2px rgba(255,255,255,.5);
  transition: transform 220ms ease, filter 220ms ease;

  &:hover {
    transform: translateY(-8px);
    filter: saturate(1.2) brightness(1.05);
  }
`;

const PremiumStackChart = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  align-items: end;
  gap: 12px;
  height: 118px;
  margin-top: 10px;
  padding: 10px;
  border-radius: 0;
  background:
    linear-gradient(90deg, rgba(24,25,36,.1) 1px, transparent 1px),
    linear-gradient(180deg, rgba(24,25,36,.08) 1px, transparent 1px);
  background-size: 42px 42px;
  box-shadow: none;
`;

const PremiumStackColumn = styled.div<{ $value: number }>`
  display: grid;
  align-content: end;
  gap: 7px;
  height: ${({ $value }) => $value}%;
  min-height: 72px;
  transition: transform 220ms ease, filter 220ms ease;

  &:hover {
    transform: translateY(-8px);
    filter: saturate(1.16);
  }

  span {
    min-height: 22px;
    border-radius: 999px;
    background:
      radial-gradient(120% 100% at 50% 100%, #000000 18%, transparent 74%),
      linear-gradient(90deg, #181924 0%, #5691c8 28%, #f7e6a1 58%, #c4548e 100%);
    box-shadow:
      0 8px 18px rgba(84,72,92,.14),
      inset 1px -1px 2px rgba(255,255,255,.52);
  }

  span:nth-child(2) {
    opacity: .78;
    transform: scaleX(.82);
  }

  span:nth-child(3) {
    opacity: .56;
    transform: scaleX(.62);
  }
`;

const PremiumRankList = styled.ol`
  display: grid;
  gap: 8px;
  padding: 0;
  margin: 12px 0 0;
  list-style: none;
`;

const PremiumRankRow = styled.li`
  display: grid;
  grid-template-columns: 42px 1fr auto;
  gap: 10px;
  align-items: center;
  padding: 8px;
  border-radius: 18px;
  background: rgba(255,255,255,.5);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.56), 8px 9px 22px rgba(84,72,92,.09);
  transition: transform 220ms ease, box-shadow 220ms ease;

  &:hover {
    transform: translateX(6px);
    box-shadow: inset 0 0 0 1px rgba(255,255,255,.78), 13px 14px 30px rgba(84,72,92,.14);
  }

  .rank {
    display: grid;
    width: 42px;
    height: 42px;
    place-items: center;
    border-radius: 16px;
    color: #ffffff;
    background:
      radial-gradient(150% 100% at 50% 100%, #000000 40%, transparent 80%),
      linear-gradient(90deg, #181924 0%, #5691c8 25%, #f7e6a1 50%, #c4548e 75%, #181924 100%);
    box-shadow: 0 12px 20px rgba(24,25,36,.18);
    font-weight: 900;
  }

  strong,
  span {
    display: block;
  }

  span {
    margin-top: 4px;
    color: rgba(24,25,36,.52);
    font-size: 12px;
    font-weight: 900;
  }

  .value {
    color: #181924;
    font-weight: 900;
  }
`;

const PremiumDealList = styled.div`
  display: grid;
  gap: 8px;
  margin-top: 10px;
`;

const PremiumDealRow = styled.div<{ $progress: number }>`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  align-items: center;
  padding: 8px 11px;
  border-radius: 20px;
  background: rgba(255,255,255,.48);
  box-shadow:
    inset 0 0 0 1px rgba(255,255,255,.52),
    7px 8px 22px rgba(84,72,92,.09);
  transition:
    transform 220ms ease,
    box-shadow 220ms ease,
    background 220ms ease;

  &:hover {
    transform: translateX(6px);
    background: rgba(255,255,255,.58);
    box-shadow:
      inset 0 0 0 1px rgba(255,255,255,.72),
      12px 13px 28px rgba(84,72,92,.13);
  }

  strong,
  span,
  em {
    display: block;
  }

  strong {
    color: #181924;
  }

  span {
    margin-top: 4px;
    color: rgba(24,25,36,.52);
    font-size: 12px;
    font-weight: 900;
  }

  em {
    color: #181924;
    font-style: normal;
    font-weight: 900;
  }

  .bar {
    grid-column: 1 / -1;
    height: 10px;
    overflow: hidden;
    border-radius: 999px;
    background: rgba(24,25,36,.1);
  }

  .fill {
    width: ${({ $progress }) => $progress}%;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, #5691c8, #f7e6a1 50%, #c4548e);
  }
`;

const PremiumOrbit = styled.div`
  position: relative;
  display: grid;
  aspect-ratio: 1;
  max-width: 140px;
  min-height: 0;
  place-items: center;
  margin-top: 20px;
  border-radius: 50%;
  background:
    radial-gradient(circle at center, rgba(255,255,255,.72) 0 19%, transparent 20%),
    conic-gradient(from 210deg, #181924, #5691c8, #f7e6a1, #c4548e, #181924);
  box-shadow:
    inset 0 0 0 18px rgba(255,255,255,.34),
    inset 0 0 44px rgba(24,25,36,.12),
    0 18px 42px rgba(84,72,92,.14);

  &::before {
    position: absolute;
    width: 58%;
    aspect-ratio: 1;
    content: "";
    border-radius: 50%;
    background: rgba(245,238,226,.9);
    box-shadow: inset 8px 8px 18px rgba(84,72,92,.12), inset -8px -8px 18px rgba(255,255,255,.7);
  }

  strong,
  span {
    position: relative;
    z-index: 1;
    display: block;
    text-align: center;
  }

  strong {
    font-size: clamp(54px, 7vw, 86px);
    line-height: .9;
  }

  span {
    margin-top: 8px;
    color: rgba(24,25,36,.54);
    font-size: 12px;
    font-weight: 900;
    text-transform: uppercase;
  }
`;

const RequestFrame = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 24px;
  width: 100%;
  max-width: none;
  margin: 0;
  color: rgba(255,255,255,.92);
`;

const RequestAside = styled.aside`
  display: grid;
  grid-template-columns: minmax(230px, .36fr) minmax(0, 1fr);
  gap: 18px;
  align-items: center;
  padding: 18px;
  border-radius: 34px;
  background: rgba(34, 34, 41, .45);
  box-shadow:
    0 .5em 2em rgba(0, 0, 0, .5),
    inset 0 0 0 .06em rgba(255, 255, 255, .08);
  backdrop-filter: blur(40px);

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

const RequestBrand = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 14px;
  align-items: center;
  padding: 8px;

  .mark {
    display: grid;
    width: 64px;
    height: 64px;
    place-items: center;
    border-radius: 22px;
    background:
      radial-gradient(circle at 18% 18%, rgba(107,59,211,.82), transparent 0 48%),
      radial-gradient(circle at 80% 18%, rgba(255,136,0,.8), transparent 0 45%),
      radial-gradient(circle at 76% 82%, rgba(15,180,198,.72), transparent 0 48%),
      rgba(19,19,21,.72);
    box-shadow: 0 18px 42px rgba(0,0,0,.42), inset 0 0 0 1px rgba(255,255,255,.12);
  }

  h2 {
    margin: 0;
    font-size: 30px;
    line-height: .94;
    letter-spacing: 0;
  }

  p {
    margin: 10px 0 0;
    color: rgba(255,255,255,.54);
    font-size: 13px;
    font-weight: 700;
    line-height: 1.55;
  }
`;

const RequestNav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-end;
`;

const RequestNavButton = styled.button<{ $active?: boolean }>`
  display: flex;
  min-height: 48px;
  align-items: center;
  gap: 12px;
  padding: 0 17px;
  border-radius: 18px;
  color: ${({ $active }) => ($active ? "#ffffff" : "rgba(255,255,255,.68)")};
  background: ${({ $active }) => ($active ? "rgba(34,34,41,.72)" : "rgba(255,255,255,.045)")};
  box-shadow: ${({ $active }) =>
    $active
      ? "0 .5em 1.4em rgba(0,0,0,.42), inset 0 0 0 .06em rgba(255,255,255,.14)"
      : "inset 0 0 0 .06em rgba(255,255,255,.07)"};
  cursor: pointer;
  font-weight: 900;
  transition: transform .22s ease, background .22s ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(34,34,41,.58);
  }
`;

const RequestMain = styled.div`
  display: grid;
  gap: 24px;
`;

const RequestHero = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, .88fr) minmax(420px, 1.12fr);
  gap: 28px;
  align-items: center;
  min-height: 540px;
  overflow: hidden;
  border-radius: 38px;
  padding: clamp(22px, 4vw, 46px);
  background:
    radial-gradient(circle at 14% 12%, rgba(107,59,211,.28), transparent 0 28%),
    radial-gradient(circle at 94% 10%, rgba(255,136,0,.18), transparent 0 28%),
    radial-gradient(circle at 80% 88%, rgba(15,180,198,.18), transparent 0 30%),
    rgba(34,34,41,.34);
  box-shadow:
    0 .8em 3em rgba(0,0,0,.45),
    inset 0 0 0 .06em rgba(255,255,255,.08);
  backdrop-filter: blur(34px);

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
`;

const RequestHeroCopy = styled.div`
  h1 {
    margin: 0;
    color: rgba(255,255,255,.96);
    font-size: clamp(46px, 7vw, 96px);
    line-height: .86;
    letter-spacing: 0;
  }

  p {
    max-width: 590px;
    margin: 20px 0 0;
    color: rgba(255,255,255,.58);
    font-size: 15px;
    font-weight: 700;
    line-height: 1.6;
  }
`;

const RequestInteractiveCard = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  place-items: center;
  width: 100%;
  min-height: 300px;
  perspective: 1000px;
  transform-style: preserve-3d;
  transform: scale(.78);
  transform-origin: center;

  .directional-hover-area {
    width: 100%;
    height: 100%;
    z-index: 5;
    pointer-events: auto;
    background: transparent;
  }

  .interactive-card {
    --card-radius: 1.8em;
    --padding: 2em;
    --pill-radius: 1.2em;
    --pill-bg: rgba(19, 19, 21, 0.72);
    --glass-bg: rgba(34, 34, 41, 0.45);
    --accent-top-left: #6b3bd3d1;
    --accent-top-right: #ff8800d3;
    --accent-bottom-right: #0fb4c6ca;
    --glow-blur: 60px;
    --noise-opacity: 0.07;
    position: absolute;
    grid-column: 1 / -1;
    grid-row: 1 / -1;
    width: min(100%, 34em);
    padding: var(--padding);
    overflow: hidden;
    user-select: none;
    border-radius: var(--card-radius);
    background: var(--glass-bg);
    box-shadow:
      0 .5em 2em rgba(0, 0, 0, .5),
      inset 0 0 0 .06em rgba(255, 255, 255, .08);
    backdrop-filter: blur(40px);
    transform-style: preserve-3d;
    transition: transform .6s cubic-bezier(.23, 1, .32, 1);
    will-change: transform;
    z-index: 10;
  }

  .interactive-card::before,
  .interactive-card::after {
    position: absolute;
    top: 0;
    width: 5px;
    height: 100%;
    content: "";
    opacity: 0;
    pointer-events: none;
    z-index: 100;
    mix-blend-mode: screen;
  }

  .interactive-card::before {
    left: 0;
    background: var(--accent-top-right);
  }

  .interactive-card::after {
    right: 0;
    background: var(--accent-bottom-right);
  }

  .interactive-card__counter-input--2:checked ~ .interactive-card::before {
    animation: ${requestGlitchEdge} .5s cubic-bezier(.25, .46, .45, .94) infinite both;
  }

  .interactive-card__counter-input--2:checked ~ .interactive-card::after {
    animation: ${requestGlitchEdge} .5s cubic-bezier(.25, .46, .45, .94) infinite reverse both;
  }

  .interactive-card__glow-layer {
    position: absolute;
    inset: 1px;
    z-index: -1;
    overflow: hidden;
    border-radius: inherit;
    pointer-events: none;
    transform: translateZ(0);
  }

  .interactive-card__glow-layer::before {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200%;
    padding-bottom: 200%;
    content: "";
    border-radius: 50%;
    background: radial-gradient(circle at center, rgba(255,255,255,.12) 0%, transparent 40%);
    opacity: 0;
    transform: translate(-50%, -50%);
    transition: transform .6s cubic-bezier(.23,1,.32,1), opacity .4s ease-out;
  }

  .interactive-card__glow {
    position: absolute;
    width: 12em;
    height: 12em;
    border-radius: 50%;
    filter: blur(var(--glow-blur));
    opacity: .6;
    animation: ${requestGlowPulse} 6s ease-in-out infinite;
    transition: transform .6s cubic-bezier(.23,1,.32,1), opacity .4s ease;
    will-change: transform, opacity;
  }

  .interactive-card:hover .interactive-card__glow {
    opacity: .9;
  }

  .interactive-card__glow--purple {
    --glow-x-dir: -1;
    --glow-y-dir: -1;
    top: -2em;
    left: -2em;
    background: radial-gradient(circle, var(--accent-top-left) 0%, transparent 70%);
  }

  .interactive-card__glow--pink {
    --glow-x-dir: 1;
    --glow-y-dir: -1;
    top: -2em;
    right: -2em;
    background: radial-gradient(circle, var(--accent-top-right) 0%, transparent 70%);
    animation-delay: 2s;
  }

  .interactive-card__glow--teal {
    --glow-x-dir: 1;
    --glow-y-dir: 1;
    right: -2em;
    bottom: -2em;
    background: radial-gradient(circle, var(--accent-bottom-right) 0%, transparent 70%);
    animation-delay: 4s;
  }

  .interactive-card__noise-overlay {
    position: absolute;
    inset: 0;
    z-index: 1;
    border-radius: inherit;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: var(--noise-opacity);
    pointer-events: none;
    mix-blend-mode: overlay;
    transform-style: preserve-3d;
    transition: transform .6s cubic-bezier(.23,1,.32,1);
  }

  .interactive-card__inner {
    position: relative;
    z-index: 2;
    transform: translateZ(1em);
  }

  .interactive-card__header {
    margin-bottom: 2em;
    transform: translateZ(.5em);
    transition: transform .4s cubic-bezier(.23,1,.32,1);
  }

  .interactive-card:hover .interactive-card__header {
    transform: translateZ(1.2em);
  }

  .interactive-card__title,
  .interactive-card__subtitle,
  .interactive-card__limit-message {
    margin: 0;
  }

  .interactive-card__title {
    margin-bottom: .5em;
    color: rgba(255,255,255,.95);
    font-size: 1.2em;
    font-weight: 800;
    letter-spacing: .12em;
    line-height: 1.2;
    text-shadow: 0 .1em .3em rgba(0,0,0,.3);
  }

  .interactive-card__subtitle {
    color: rgba(255,255,255,.55);
    font-size: 1em;
    line-height: 1.5;
    transition: all .3s ease;
  }

  .interactive-card__limit-message {
    max-height: 0;
    margin-top: .8em;
    overflow: hidden;
    color: var(--accent-top-right);
    font-size: .9em;
    font-weight: 600;
    line-height: 1;
    opacity: 0;
    transform: translateY(-.5em);
    transition: max-height .4s ease-out, opacity .4s ease-out, transform .4s ease-out;
  }

  .interactive-card__counter-input--2:checked ~ .interactive-card .interactive-card__limit-message {
    max-height: 2em;
    opacity: 1;
    transform: translateY(0);
  }

  .interactive-card__counter-input--2:checked ~ .interactive-card .interactive-card__subtitle {
    max-height: 0;
    margin-bottom: -.5em;
    opacity: 0;
  }

  .interactive-card__control-pill {
    position: relative;
    z-index: 100;
    display: flex;
    align-items: center;
    gap: .8em;
    padding: .8em 1em;
    border-radius: var(--pill-radius);
    background: var(--pill-bg);
    box-shadow:
      inset 0 .15em .3em rgba(255,255,255,.03),
      inset 0 -.15em .4em rgba(0,0,0,.6),
      0 .3em 1em rgba(0,0,0,.3);
    transform: translateZ(.8em);
    transition: transform .3s ease, box-shadow .3s ease;
  }

  .interactive-card__control-pill:hover {
    transform: translateZ(1.2em) scale(1.02);
    box-shadow:
      inset 0 .15em .3em rgba(255,255,255,.03),
      inset 0 -.15em .4em rgba(0,0,0,.6),
      0 .5em 1.5em rgba(0,0,0,.5);
  }

  .interactive-card__pill-icon {
    color: rgba(120,110,104,.6);
    font-size: 1.2em;
    transform: translateZ(.2em);
  }

  .interactive-card__pill-label {
    flex: 1;
    color: rgba(255,255,255,.7);
    font-size: .85em;
    font-weight: 700;
    letter-spacing: .15em;
    text-transform: uppercase;
    transform: translateZ(.2em);
  }

  .interactive-card__counter-input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    pointer-events: none;
  }

  .interactive-card__count-display {
    z-index: 100;
    display: flex;
    width: 2.5em;
    height: 2.5em;
    align-items: center;
    justify-content: center;
    border-radius: .4em;
    color: #1a1a1e;
    background: #ffffff;
    box-shadow: 0 .15em .4em rgba(0,0,0,.3), inset 0 .05em .1em rgba(0,0,0,.1);
    font-weight: 700;
    transform: translateZ(.5em);
    transition: all .2s ease;
  }

  .interactive-card__counter-input--2:checked ~ .interactive-card .interactive-card__count-display {
    animation: ${requestGlitchText} .8s cubic-bezier(.25,.46,.45,.94) infinite both;
  }

  .interactive-card__count-value::before {
    content: "0";
  }

  .interactive-card__counter-input--0:checked ~ .interactive-card .interactive-card__count-value::before {
    content: "0";
  }

  .interactive-card__counter-input--1:checked ~ .interactive-card .interactive-card__count-value::before {
    content: "1";
  }

  .interactive-card__counter-input--2:checked ~ .interactive-card .interactive-card__count-value::before {
    content: "2";
  }

  .interactive-card__buttons {
    z-index: 100;
    display: none;
    align-items: center;
    gap: 0;
    transform: translateZ(.3em);
  }

  .interactive-card__counter-input--0:checked ~ .interactive-card .interactive-card__buttons--state-0,
  .interactive-card__counter-input--1:checked ~ .interactive-card .interactive-card__buttons--state-1,
  .interactive-card__counter-input--2:checked ~ .interactive-card .interactive-card__buttons--state-2 {
    display: flex;
  }

  .interactive-card__btn {
    z-index: 101;
    display: flex;
    width: 2.2em;
    height: 2.2em;
    align-items: center;
    justify-content: center;
    border-radius: .3em;
    color: rgba(255,255,255,.8);
    background: rgba(30,30,35,.9);
    box-shadow:
      inset 0 .1em .2em rgba(255,255,255,.05),
      inset 0 -.1em .3em rgba(0,0,0,.7),
      0 .2em .5em rgba(0,0,0,.3);
    cursor: pointer;
    font-size: 1.1em;
    font-weight: 700;
    line-height: 1;
    transition: all .15s ease;
  }

  .interactive-card__btn:hover:not(.interactive-card__btn--disabled) {
    color: #ffffff;
    background: rgba(40,40,48,.95);
    transform: translateY(-.1em);
  }

  .interactive-card__btn:active:not(.interactive-card__btn--disabled) {
    transform: translateY(.1em) scale(.98);
  }

  .interactive-card__btn--disabled {
    opacity: .5;
    cursor: not-allowed;
  }

  .interactive-card__btn--disabled:hover {
    animation: ${requestDisabledShake} .3s ease-in-out;
  }

  .interactive-card__counter-input--2:checked ~ .interactive-card .interactive-card__buttons--state-2 .interactive-card__btn--inc {
    animation: ${requestGlitchText} .7s cubic-bezier(.25,.46,.45,.94) infinite both;
    animation-delay: .1s;
  }

  .interactive-card__btn-separator {
    width: .06em;
    height: 1.5em;
    margin: 0 .15em;
    background: linear-gradient(to bottom, transparent 0%, rgba(255,255,255,.1) 20%, rgba(255,255,255,.1) 80%, transparent 100%);
  }

  .hover-top-left:hover ~ .interactive-card { transform: translate(-12px, -12px) scale(1.02); }
  .hover-top-right:hover ~ .interactive-card { transform: translate(12px, -12px) scale(1.02); }
  .hover-bottom-left:hover ~ .interactive-card { transform: translate(-12px, 12px) scale(1.02); }
  .hover-bottom-right:hover ~ .interactive-card { transform: translate(12px, 12px) scale(1.02); }

  .hover-top-left:hover ~ .interactive-card .interactive-card__noise-overlay { transform: translateZ(2em) rotateX(-2deg) rotateY(2deg); }
  .hover-top-right:hover ~ .interactive-card .interactive-card__noise-overlay { transform: translateZ(2em) rotateX(-2deg) rotateY(-2deg); }
  .hover-bottom-left:hover ~ .interactive-card .interactive-card__noise-overlay { transform: translateZ(2em) rotateX(2deg) rotateY(2deg); }
  .hover-bottom-right:hover ~ .interactive-card .interactive-card__noise-overlay { transform: translateZ(2em) rotateX(2deg) rotateY(-2deg); }

  .hover-top-left:hover ~ .interactive-card .interactive-card__glow,
  .hover-top-right:hover ~ .interactive-card .interactive-card__glow {
    --y-transform: translateY(calc(var(--glow-y-dir) * -3em));
    --y-scale: 1.1;
  }

  .hover-bottom-left:hover ~ .interactive-card .interactive-card__glow,
  .hover-bottom-right:hover ~ .interactive-card .interactive-card__glow {
    --y-transform: translateY(calc(var(--glow-y-dir) * -2em));
    --y-scale: .9;
  }

  .hover-top-left:hover ~ .interactive-card .interactive-card__glow,
  .hover-bottom-left:hover ~ .interactive-card .interactive-card__glow {
    --x-transform: translateX(calc(var(--glow-x-dir) * -3em));
    --x-scale: 1.1;
  }

  .hover-top-right:hover ~ .interactive-card .interactive-card__glow,
  .hover-bottom-right:hover ~ .interactive-card .interactive-card__glow {
    --x-transform: translateX(calc(var(--glow-x-dir) * -2em));
    --x-scale: .9;
  }

  .directional-hover-area:hover ~ .interactive-card .interactive-card__glow {
    transform: var(--x-transform, translateX(0)) var(--y-transform, translateY(0)) scale(var(--x-scale, 1)) scale(var(--y-scale, 1));
  }

  .hover-top-left:hover ~ .interactive-card .interactive-card__glow-layer::before { transform: translate(-75%, -75%); opacity: 1; }
  .hover-top-right:hover ~ .interactive-card .interactive-card__glow-layer::before { transform: translate(-25%, -75%); opacity: 1; }
  .hover-bottom-left:hover ~ .interactive-card .interactive-card__glow-layer::before { transform: translate(-75%, -25%); opacity: 1; }
  .hover-bottom-right:hover ~ .interactive-card .interactive-card__glow-layer::before { transform: translate(-25%, -25%); opacity: 1; }
`;

const RequestPanel = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 30px;
  padding: 16px;
  background: rgba(34,34,41,.45);
  box-shadow:
    0 .5em 2em rgba(0,0,0,.44),
    inset 0 0 0 .06em rgba(255,255,255,.08);
  backdrop-filter: blur(34px);

  h3,
  p {
    margin: 0;
  }

  h3 {
    color: rgba(255,255,255,.94);
    font-size: 18px;
    letter-spacing: .03em;
    text-transform: uppercase;
  }

  p {
    margin-top: 7px;
    color: rgba(255,255,255,.52);
    font-size: 13px;
    font-weight: 700;
    line-height: 1.5;
  }
`;

const RequestActionButton = styled.button`
  display: inline-flex;
  min-height: 46px;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 0 17px;
  border-radius: 16px;
  color: rgba(255,255,255,.9);
  background: rgba(30,30,35,.9);
  box-shadow:
    inset 0 .1em .2em rgba(255,255,255,.05),
    inset 0 -.1em .3em rgba(0,0,0,.7),
    0 .4em 1.1em rgba(0,0,0,.34);
  cursor: pointer;
  font-weight: 900;
  transition:
    transform 180ms ease,
    box-shadow 220ms ease,
    background 220ms ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(40,40,48,.95);
    box-shadow:
      inset 0 .1em .2em rgba(255,255,255,.07),
      inset 0 -.1em .3em rgba(0,0,0,.7),
      0 0 24px rgba(107,59,211,.24),
      0 .5em 1.4em rgba(0,0,0,.42);
  }

  &:active {
    transform: translateY(1px) scale(.98);
  }
`;

const RequestModal = styled(RequestPanel)`
  width: min(620px, 100%);
  animation: ${pop} 180ms ease both;
`;

const RequestQueue = styled.div`
  display: grid;
  gap: 12px;
  margin-top: 20px;
`;

const RequestQueueRow = styled.div<{ $accent: string }>`
  display: grid;
  grid-template-columns: 12px 1fr auto;
  gap: 13px;
  align-items: center;
  padding: 13px;
  border-radius: 18px;
  background: rgba(19,19,21,.52);
  box-shadow: inset 0 0 0 .06em rgba(255,255,255,.07);
  transition:
    transform 220ms ease,
    background 220ms ease,
    box-shadow 220ms ease;

  &:hover {
    transform: translateX(7px) translateZ(0);
    background: rgba(34,34,41,.68);
    box-shadow:
      inset 0 0 0 .06em rgba(255,255,255,.12),
      0 0 24px ${({ $accent }) => `${$accent}44`};
  }

  i {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ $accent }) => $accent};
    box-shadow: 0 0 18px ${({ $accent }) => $accent};
  }

  strong,
  span,
  em {
    display: block;
  }

  strong {
    color: rgba(255,255,255,.9);
    font-size: 13px;
  }

  span {
    margin-top: 4px;
    color: rgba(255,255,255,.48);
    font-size: 12px;
    font-weight: 700;
  }

  em {
    color: rgba(255,255,255,.72);
    font-style: normal;
    font-weight: 900;
  }
`;

const RequestMetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;

  @media (max-width: 780px) {
    grid-template-columns: 1fr;
  }
`;

const RequestMetric = styled(RequestPanel)<{ $accent: string }>`
  min-height: 150px;
  transition:
    transform 260ms cubic-bezier(.23,1,.32,1),
    box-shadow 260ms ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow:
      0 .8em 2.4em rgba(0,0,0,.48),
      0 0 30px ${({ $accent }) => `${$accent}33`},
      inset 0 0 0 .06em rgba(255,255,255,.13);
  }

  &::after {
    position: absolute;
    right: -38px;
    bottom: -48px;
    width: 130px;
    height: 130px;
    content: "";
    border-radius: 50%;
    background: ${({ $accent }) => $accent};
    opacity: .35;
    filter: blur(34px);
  }

  span,
  strong,
  em {
    position: relative;
    z-index: 1;
    display: block;
  }

  span {
    color: rgba(255,255,255,.52);
    font-size: 12px;
    font-weight: 900;
    letter-spacing: .12em;
    text-transform: uppercase;
  }

  strong {
    margin-top: 20px;
    color: rgba(255,255,255,.94);
    font-size: clamp(36px, 5vw, 58px);
    line-height: .9;
  }

  em {
    margin-top: 12px;
    color: ${({ $accent }) => $accent};
    font-style: normal;
    font-weight: 900;
  }
`;

const RequestLowerGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.18fr) minmax(360px, .82fr);
  gap: 24px;
  align-items: start;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const RequestBubbleChart = styled.div`
  position: relative;
  min-height: 0;
  margin-top: 20px;
  overflow: hidden;
  border-radius: 28px;
  background:
    radial-gradient(circle at 28% 24%, rgba(107,59,211,.28), transparent 0 28%),
    radial-gradient(circle at 68% 32%, rgba(255,136,0,.18), transparent 0 22%),
    radial-gradient(circle at 58% 80%, rgba(15,180,198,.2), transparent 0 26%),
    rgba(19,19,21,.52);
  box-shadow:
    inset 0 0 0 .06em rgba(255,255,255,.07),
    inset 0 -30px 80px rgba(0,0,0,.24);

  &::before {
    position: absolute;
    inset: 18px;
    content: "";
    border-radius: 24px;
    background-image:
      linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: radial-gradient(circle at center, black, transparent 72%);
  }
`;

const RequestBubble = styled.div<{ $x: number; $y: number; $size: number; $color: string }>`
  position: absolute;
  left: ${({ $x }) => $x}%;
  top: ${({ $y }) => $y}%;
  display: grid;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  place-items: center;
  border-radius: 50%;
  color: rgba(255,255,255,.94);
  background:
    radial-gradient(circle at 30% 24%, rgba(255,255,255,.46), transparent 0 24%),
    radial-gradient(circle at 50% 56%, ${({ $color }) => `${$color}dd`}, ${({ $color }) => `${$color}44`} 58%, transparent 72%);
  box-shadow:
    0 0 38px ${({ $color }) => `${$color}66`},
    inset 0 .15em .4em rgba(255,255,255,.12),
    inset 0 -.35em .7em rgba(0,0,0,.45);
  transform: translate(-50%, -50%);
  transition:
    transform 280ms cubic-bezier(.23,1,.32,1),
    filter 220ms ease,
    box-shadow 220ms ease;

  &:hover {
    transform: translate(-50%, -50%) translateY(-10px) scale(1.06);
    filter: saturate(1.16);
    box-shadow:
      0 0 48px ${({ $color }) => `${$color}99`},
      inset 0 .15em .4em rgba(255,255,255,.16),
      inset 0 -.35em .7em rgba(0,0,0,.5);
  }

  strong,
  span {
    display: block;
    text-align: center;
    line-height: 1;
  }

  strong {
    font-size: ${({ $size }) => Math.max(22, Math.round($size * 0.24))}px;
    text-shadow: 0 .15em .6em rgba(0,0,0,.5);
  }

  span {
    margin-top: 7px;
    font-size: 11px;
    font-weight: 900;
    letter-spacing: .08em;
    text-transform: uppercase;
    opacity: .72;
  }
`;

const RequestRankList = styled.ol`
  display: grid;
  gap: 12px;
  padding: 0;
  margin: 20px 0 0;
  list-style: none;
`;

const RequestRankRow = styled(RequestQueueRow)`
  grid-template-columns: 42px 1fr auto;

  .rank {
    display: grid;
    width: 42px;
    height: 42px;
    place-items: center;
    border-radius: 14px;
    color: rgba(255,255,255,.95);
    background: rgba(30,30,35,.9);
    box-shadow:
      inset 0 .1em .2em rgba(255,255,255,.05),
      inset 0 -.1em .3em rgba(0,0,0,.7),
      0 .2em .5em rgba(0,0,0,.3);
    font-weight: 900;
  }
`;

const UnlockFrame = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 24px;
  width: 100%;
  max-width: none;
  margin: 0;
  color: #30424a;
`;

const UnlockAside = styled.aside`
  display: grid;
  grid-template-columns: minmax(220px, .45fr) minmax(0, 1fr);
  gap: 18px;
  align-items: center;
  padding: 18px;
  border-radius: 34px;
  background: rgba(255,255,255,.28);
  box-shadow:
    -1px .5px 2px rgba(255,255,255,1),
    1px -.5px 2px rgba(27,40,52,.2),
    0 1px 0 1px #c7cfd2 inset,
    0 -1px 0 1px rgba(255,255,255,.65) inset,
    0 16px 30px rgba(0,0,0,.08);
  backdrop-filter: blur(10px) saturate(120%);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const UnlockBrand = styled.div`
  padding: 12px;

  .mark {
    display: grid;
    width: 64px;
    height: 64px;
    place-items: center;
    border-radius: 50%;
    background: rgba(0,91,166,.08);
    box-shadow:
      1.5px 2.5px 8px #7a929d70 inset,
      0 0 0 2px rgba(255,255,255,.86) inset,
      3px 16px 6px 2px rgba(255,255,255,.7) inset,
      0 18px 30px rgba(0,0,0,.1);
    color: #7a929d;
  }

  h2 {
    margin: 18px 0 0;
    color: #30424a;
    font-size: 30px;
    line-height: .94;
    letter-spacing: 0;
  }

  p {
    margin: 10px 0 0;
    color: rgba(48,66,74,.62);
    font-size: 13px;
    font-weight: 800;
    line-height: 1.55;
  }
`;

const UnlockNav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-end;
`;

const UnlockNavButton = styled.button<{ $active?: boolean }>`
  display: flex;
  min-height: 48px;
  align-items: center;
  gap: 12px;
  padding: 0 17px;
  border-radius: 26px;
  color: ${({ $active }) => ($active ? "#30424a" : "rgba(48,66,74,.68)")};
  background: ${({ $active }) => ($active ? "rgba(255,255,255,.52)" : "rgba(255,255,255,.2)")};
  box-shadow: ${({ $active }) =>
    $active
      ? "-1px .5px 2px rgba(255,255,255,1), 1px -.5px 2px rgba(27,40,52,.16), 0 1px 0 1px #c7cfd2 inset, 0 -1px 0 1px rgba(255,255,255,.65) inset, 0 12px 22px rgba(0,0,0,.08)"
      : "inset 0 0 0 1px rgba(255,255,255,.32)"};
  cursor: pointer;
  font-weight: 900;
  transition: transform .22s ease, box-shadow .22s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      -5px -5px 10px rgba(255,255,255,1),
      5px 5px 15px rgba(0,0,0,.18);
  }
`;

const UnlockMain = styled.div`
  display: grid;
  gap: 24px;
`;

const UnlockHero = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, .72fr) minmax(420px, 1.28fr);
  gap: 30px;
  align-items: center;
  min-height: 530px;
  overflow: hidden;
  border-radius: 38px;
  padding: clamp(24px, 5vw, 52px);
  background:
    radial-gradient(circle at 88% 10%, rgba(255,249,188,.48), transparent 0 24%),
    radial-gradient(circle at 78% 86%, rgba(255,174,88,.18), transparent 0 32%),
    rgba(255,255,255,.24);
  box-shadow:
    -1px .5px 2px rgba(255,255,255,1),
    1px -.5px 2px rgba(27,40,52,.22),
    0 1px 0 1px #c7cfd2 inset,
    0 -1px 0 1px rgba(255,255,255,.65) inset,
    0 24px 42px rgba(0,0,0,.1);
  backdrop-filter: blur(10px) saturate(120%);

  @media (max-width: 1050px) {
    grid-template-columns: 1fr;
  }
`;

const UnlockHeroCopy = styled.div`
  h1 {
    margin: 0;
    color: #30424a;
    font-size: clamp(46px, 7vw, 94px);
    line-height: .86;
    letter-spacing: 0;
  }

  p {
    max-width: 610px;
    margin: 20px 0 0;
    color: rgba(48,66,74,.68);
    font-size: 15px;
    font-weight: 800;
    line-height: 1.6;
  }
`;

const UnlockSwipeWrap = styled.div<{ $compact?: boolean }>`
  position: relative;
  display: grid;
  min-height: ${({ $compact }) => ($compact ? "170px" : "300px")};
  place-items: center;
  overflow: visible;
  transform: ${({ $compact }) => ($compact ? "scale(.82)" : "none")};
  transform-origin: center;

  .conti {
    position: relative;
    width: 320px;
    height: 120px;
  }

  .swipe {
    position: relative;
    z-index: 10;
    display: flex;
    width: 320px;
    height: 64px;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 32px;
    background: #005ba611;
    box-shadow:
      -1px .5px 2px rgba(255,255,255,1),
      1px -.5px 2px rgba(27,40,52,.3),
      0 1px 0 1px #c7cfd2 inset,
      0 -1px 0 1px rgba(255,255,255,.647) inset,
      0 6px 10px #6a7d8652 inset,
      0 -4px 4px #3d556013 inset,
      0 -8px 12px rgba(255,255,255,.866) inset,
      0 16px 15px #00000011,
      0 24px 32px #00000011;
    backdrop-filter: blur(4px) saturate(120%);
    transition: .5s, box-shadow .4s ease;
  }

  .swipe:hover {
    cursor: grab;
    translate: 0 -1px;
    transform: scaleY(1.05) scaleX(1.01);
    box-shadow:
      -5px -5px 10px rgba(255,255,255,1),
      5px 5px 15px rgba(0,0,0,.3);
  }

  .glow {
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(90deg, transparent 0%, rgba(255,174,88,.25) 30%, rgba(255,249,188,.5) 50%, rgba(255,205,88,.25) 70%, transparent 100%);
    transform: scaleX(2.5) skewX(-20deg);
    transition: all 1.6s ease;
  }

  .swipe:hover .glow {
    left: 150%;
  }

  .knob {
    position: absolute;
    left: 2.5px;
    top: 50%;
    display: flex;
    width: 58px;
    height: 58px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    filter: blur(0);
    transform: translateY(-50%);
    box-shadow:
      1.5px 2.5px 8px #7a929d70 inset,
      0 0 0 2px rgba(255,255,255,.857) inset,
      3px 16px 6px 2px rgba(255,255,255,.697) inset,
      0 1px 1px rgba(255,255,255,.9) inset,
      3px 16px 14px -12px #3247512e;
    transition: .6s ease-in;
  }

  .lock,
  .lock-glow {
    width: 24px;
    height: 24px;
    stroke-dasharray: 1000;
    stroke-dashoffset: 0;
    scale: 1.3;
    transition: .5s;
    filter:
      drop-shadow(0 2px .5px rgb(255,255,255))
      drop-shadow(0 -1px .5px rgba(0,0,0,.3));
  }

  .lock {
    translate: 50%;
  }

  .lock-glow {
    translate: -50%;
    stroke-dasharray: 50;
    stroke-dashoffset: -50;
    opacity: 5.5;
    filter:
      brightness(5.5)
      drop-shadow(0 4px .5px rgb(255,255,255))
      drop-shadow(0 -2px .5px rgba(0,0,0,0));
  }

  .label,
  .label-alt {
    position: absolute;
    display: flex;
    pointer-events: none;
    font-size: 18px;
    font-weight: 700;
    transition: .4s;
  }

  .label {
    color: #9aa3a9e3;
  }

  .label-alt {
    color: #fffae9e3;
    opacity: 0;
    translate: 20px;
    filter: brightness(1.25);
    text-shadow: 0 0 12px rgba(176,126,20,.871), 0 0 8px rgba(239,209,102,.871);
  }

  .label span,
  .label-alt span {
    display: inline-block;
    transition: transform .4s ease, opacity .4s ease, filter .4s ease;
  }

  .label-alt span {
    opacity: 0;
  }

  .swipe:hover .label span {
    animation: ${unlockVanish} .3s forwards;
  }

  .swipe:not(:hover) .label span {
    animation: ${unlockAppear} .3s forwards;
  }

  .swipe:hover .label-alt {
    opacity: 1;
  }

  .swipe:hover .label-alt span {
    animation: ${unlockAppear} .3s forwards;
  }

  .swipe:not(:hover) .label-alt span {
    animation: ${unlockVanish} .3s forwards;
  }

  ${Array.from({ length: 24 })
    .map(
      (_, index) => `
        .swipe:hover .label span:nth-child(${index + 1}) { animation-delay: ${(index * 0.01).toFixed(2)}s; }
        .swipe:hover .label-alt span:nth-child(${index + 1}) { animation-delay: ${(0.15 + index * 0.01).toFixed(2)}s; }
      `,
    )
    .join("\n")}

  .swipe:hover .knob {
    translate: 0 10px;
    scale: .98;
    filter:
      drop-shadow(0 0 2px rgb(247,246,232))
      drop-shadow(0 0 2px rgb(255,255,255))
      drop-shadow(0 -1px 0 rgba(0,0,0,.2));
  }

  .swipe:hover .lock-glow {
    stroke-dashoffset: 0;
    filter:
      brightness(2)
      drop-shadow(0 0 3px rgb(255,255,255))
      drop-shadow(0 0 2px rgb(229,226,185));
  }

  .swipe:active {
    cursor: grabbing;
    box-shadow:
      5px 5px 10px rgb(251,255,226),
      -5px -5px 15px rgba(112,16,109,.106),
      0 1px 0 1px #c7cfd2 inset,
      0 -1px 0 1px rgba(255,255,255,.647) inset,
      0 0 120px #ffa53825,
      -4px -4px 8px #ffd64f29,
      4px 4px 16px #ffd64f35,
      0 0 32px 2px #ffc85a36;
    animation: ${unlockConfirm} 4s forwards ease-in;
  }

  .swipe:not(:active) {
    animation: ${unlockRestore} 1s forwards ease-in;
  }

  .swipe:active .knob {
    translate: 442%;
    animation: ${unlockBlur} .6s forwards ease-in;
  }

  .swipe:not(:active) .knob {
    translate: 0%;
    animation: ${unlockInBlur} .6s ease-in;
  }

  .swipe:active .lock,
  .swipe:active .lock-glow {
    rotate: 52deg;
  }

  .outline,
  .ripple,
  .particles,
  .clank,
  .big-lock,
  .key {
    position: absolute;
    pointer-events: none;
  }

  .outline {
    top: -3px;
    left: -4px;
    z-index: 0;
    width: 320px;
    height: 64px;
    opacity: 0;
    stroke-dasharray: 750;
    stroke-dashoffset: -750;
    transform: scaleY(1.5) scaleX(1.175);
    filter:
      brightness(5.5)
      drop-shadow(0 0 3px rgb(255,255,255))
      drop-shadow(0 0 8px rgba(239,209,102,.69));
    transition: 2.5s cubic-bezier(0,1.87,.68,.98);
  }

  .swipe:hover ~ .outline {
    opacity: 1;
    stroke-dasharray: 210;
    stroke-dashoffset: -1000;
  }

  .swipe:active ~ .outline {
    opacity: 0;
    stroke-dasharray: 250;
    stroke-dashoffset: 0;
    transition: 1s;
  }

  .ripple {
    top: -3px;
    left: -4px;
    z-index: 0;
    transform: scaleY(1.2) scaleX(1.02);
    opacity: 1;
    animation: ${unlockRipple} 3s ease-out infinite;
  }

  .swipe:active ~ .ripple {
    opacity: 0;
    transition: 1s;
  }

  .particles {
    left: -50px;
    top: -35px;
    z-index: 10;
    height: 40px;
    fill: none;
    stroke: #ffffff;
    stroke-dasharray: 17;
    stroke-dashoffset: -17;
    filter:
      brightness(5.5)
      drop-shadow(0 0 3px rgb(255,255,255))
      drop-shadow(0 0 8px rgba(239,209,102,.69));
  }

  .swipe:hover ~ .particles {
    animation: ${unlockSpark} 1.5s forwards;
  }

  .clank {
    right: 24px;
    top: -112px;
    z-index: 10;
    height: 64px;
    fill: none;
    stroke: #ffffff;
    stroke-dasharray: 100;
    stroke-dashoffset: 100;
    filter:
      brightness(5.5)
      drop-shadow(0 0 3px rgb(255,255,255))
      drop-shadow(0 0 8px rgba(239,209,102,.69));
  }

  .swipe:active ~ .clank {
    animation: ${unlockClank} 3.1s forwards ease-in;
  }

  .key {
    translate: 150% -70%;
    scale: 1.1;
    opacity: 1;
    stroke-dasharray: 65;
    stroke-dashoffset: -65;
    transform-origin: right;
    filter:
      drop-shadow(0 -3px 2px rgb(255,255,255))
      drop-shadow(0 4px 1px rgba(0,0,0,.3));
    transition: 1s;
  }

  .swipe:active ~ .key {
    translate: 185% -35%;
    scale: .5;
    z-index: 1;
    rotate: 90deg;
    animation: ${unlockKeyTravel} 3.6s forwards ease-in-out;
  }

  .big-lock {
    inset: 0;
    left: calc(0% - 40px);
    top: calc(0% - 1500px / 7 + 15px);
    z-index: 0;
    height: 1500px;
    opacity: .8;
    fill: none;
    stroke-dasharray: 250;
    stroke-dashoffset: 250;
    filter:
      drop-shadow(0 4px 1px rgb(255,255,255))
      drop-shadow(0 -4px 1px rgba(0,0,0,.3))
      drop-shadow(0 0 3px rgba(255,255,255,.65));
    transition: 3s;
  }

  .swipe:active ~ .big-lock {
    stroke-dashoffset: 0;
    animation: ${unlockBigLock} 4.5s forwards ease-in;
  }

  .swipe:not(:active) ~ .big-lock {
    opacity: 0;
    stroke-dashoffset: 250;
    transition: .5s;
  }
`;

const UnlockPanel = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 30px;
  padding: 18px;
  background: rgba(255,255,255,.28);
  box-shadow:
    -1px .5px 2px rgba(255,255,255,1),
    1px -.5px 2px rgba(27,40,52,.2),
    0 1px 0 1px #c7cfd2 inset,
    0 -1px 0 1px rgba(255,255,255,.65) inset,
    0 16px 28px rgba(0,0,0,.08);
  backdrop-filter: blur(8px) saturate(120%);
  transition: transform 220ms ease, box-shadow 220ms ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow:
      -5px -5px 10px rgba(255,255,255,1),
      5px 5px 15px rgba(0,0,0,.2),
      0 1px 0 1px #c7cfd2 inset,
      0 -1px 0 1px rgba(255,255,255,.65) inset;
  }

  h3,
  p {
    margin: 0;
  }

  h3 {
    color: #30424a;
    font-size: 18px;
  }

  p {
    margin-top: 7px;
    color: rgba(48,66,74,.62);
    font-size: 13px;
    font-weight: 800;
    line-height: 1.5;
  }
`;

const UnlockMetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  @media (max-width: 780px) {
    grid-template-columns: 1fr;
  }
`;

const UnlockMetric = styled(UnlockPanel)<{ $accent: string }>`
  min-height: 104px;

  &::after {
    position: absolute;
    right: -34px;
    bottom: -46px;
    width: 122px;
    height: 122px;
    content: "";
    border-radius: 50%;
    background: ${({ $accent }) => $accent};
    opacity: .3;
    filter: blur(18px);
  }

  span,
  strong,
  em {
    position: relative;
    z-index: 1;
    display: block;
  }

  span {
    color: rgba(48,66,74,.58);
    font-size: 12px;
    font-weight: 900;
    letter-spacing: .12em;
    text-transform: uppercase;
  }

  strong {
    margin-top: 12px;
    color: #30424a;
    font-size: clamp(30px, 3.4vw, 46px);
    line-height: .9;
  }

  em {
    margin-top: 12px;
    color: #7a929d;
    font-style: normal;
    font-weight: 900;
  }
`;

const UnlockLowerGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(320px, .82fr) minmax(320px, .78fr) minmax(340px, 1fr);
  gap: 24px;
  align-items: start;

  @media (max-width: 1180px) {
    grid-template-columns: 1fr;
  }
`;

const UnlockRadarChart = styled.svg`
  display: block;
  width: min(100%, 320px);
  margin: 14px auto 0;
  overflow: visible;
  border-radius: 50%;
  background:
    radial-gradient(circle at 50% 50%, rgba(255,249,188,.34), transparent 0 28%),
    rgba(255,255,255,.18);
  box-shadow:
    1.5px 2.5px 8px #7a929d42 inset,
    0 0 0 2px rgba(255,255,255,.56) inset,
    0 22px 38px rgba(0,0,0,.08);

  .grid-ring,
  .grid-line {
    fill: none;
    stroke: rgba(122,146,157,.34);
    stroke-width: 1;
  }

  .radar-fill {
    fill: rgba(255,205,88,.28);
    filter: drop-shadow(0 0 16px rgba(255,205,88,.32));
  }

  .radar-stroke {
    fill: none;
    stroke: #ffcd58;
    stroke-width: 3;
    stroke-linejoin: round;
  }

  text {
    fill: rgba(48,66,74,.68);
    font-size: 10px;
    font-weight: 900;
    text-transform: uppercase;
  }
`;

const UnlockTimeline = styled.div`
  position: relative;
  display: grid;
  gap: 12px;
  margin-top: 16px;

  &::before {
    position: absolute;
    left: 17px;
    top: 12px;
    bottom: 12px;
    width: 3px;
    content: "";
    border-radius: 999px;
    background: linear-gradient(#fff9bc, #ffcd58, #7a929d);
    box-shadow: 0 0 18px rgba(255,205,88,.35);
  }
`;

const UnlockTimelineRow = styled.div<{ $accent: string }>`
  position: relative;
  display: grid;
  grid-template-columns: 38px 1fr auto;
  gap: 12px;
  align-items: center;
  padding: 11px 12px;
  border-radius: 24px;
  background: rgba(255,255,255,.3);
  box-shadow:
    0 1px 0 1px #c7cfd2 inset,
    0 -1px 0 1px rgba(255,255,255,.65) inset,
    0 12px 22px rgba(0,0,0,.06);
  transition: transform 220ms ease, box-shadow 220ms ease;

  &:hover {
    transform: translateX(8px);
    box-shadow:
      -5px -5px 10px rgba(255,255,255,1),
      5px 5px 15px rgba(0,0,0,.16),
      0 0 22px ${({ $accent }) => `${$accent}55`};
  }

  i {
    position: relative;
    z-index: 1;
    display: grid;
    width: 36px;
    height: 36px;
    place-items: center;
    border-radius: 50%;
    background: ${({ $accent }) => $accent};
    box-shadow:
      0 0 18px ${({ $accent }) => `${$accent}aa`},
      inset 0 0 0 3px rgba(255,255,255,.45);
  }

  i::after {
    width: 10px;
    height: 10px;
    content: "";
    border-radius: 50%;
    background: rgba(48,66,74,.42);
  }

  strong,
  span,
  em {
    display: block;
  }

  strong {
    color: #30424a;
  }

  span {
    margin-top: 4px;
    color: rgba(48,66,74,.56);
    font-size: 12px;
    font-weight: 900;
  }

  em {
    color: #30424a;
    font-style: normal;
    font-weight: 900;
  }

  @media (max-width: 560px) {
    grid-template-columns: 38px 1fr;

    em {
      grid-column: 2;
    }
  }
`;

const UnlockRankList = styled.ol`
  display: grid;
  gap: 10px;
  padding: 0;
  margin: 16px 0 0;
  list-style: none;
`;

const UnlockRankRow = styled.li`
  display: grid;
  grid-template-columns: 42px 1fr auto;
  gap: 10px;
  align-items: center;
  padding: 10px 12px;
  border-radius: 22px;
  background: rgba(255,255,255,.28);
  box-shadow:
    0 1px 0 1px #c7cfd2 inset,
    0 -1px 0 1px rgba(255,255,255,.65) inset,
    0 10px 18px rgba(0,0,0,.06);
  transition: transform 220ms ease, box-shadow 220ms ease;

  &:hover {
    transform: translateX(6px);
    box-shadow:
      -5px -5px 10px rgba(255,255,255,1),
      5px 5px 15px rgba(0,0,0,.16);
  }

  .rank {
    display: grid;
    width: 42px;
    height: 42px;
    place-items: center;
    border-radius: 50%;
    color: #7a929d;
    background: rgba(255,255,255,.36);
    box-shadow:
      1.5px 2.5px 8px #7a929d70 inset,
      0 0 0 2px rgba(255,255,255,.857) inset;
    font-weight: 900;
  }

  strong,
  span {
    display: block;
  }

  span {
    margin-top: 4px;
    color: rgba(48,66,74,.55);
    font-size: 12px;
    font-weight: 900;
  }

  .value {
    color: #30424a;
    font-weight: 900;
  }
`;

const UnlockModal = styled(UnlockPanel)`
  width: min(620px, 100%);
  animation: ${pop} 180ms ease both;
`;

const UnlockActionButton = styled.button`
  display: inline-flex;
  min-height: 46px;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 0 17px;
  border-radius: 23px;
  color: #30424a;
  background: rgba(255,255,255,.32);
  box-shadow:
    -1px .5px 2px rgba(255,255,255,1),
    1px -.5px 2px rgba(27,40,52,.2),
    0 1px 0 1px #c7cfd2 inset,
    0 -1px 0 1px rgba(255,255,255,.65) inset;
  cursor: pointer;
  font-weight: 900;
  transition: transform 180ms ease, box-shadow 220ms ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      -5px -5px 10px rgba(255,255,255,1),
      5px 5px 15px rgba(0,0,0,.18),
      0 0 22px rgba(255,205,88,.2);
  }

  &:active {
    transform: translateY(1px) scale(.98);
  }
`;

const ConfirmFrame = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 24px;
  width: 100%;
  max-width: none;
  margin: 0;
  color: #435260;
`;

const ConfirmAside = styled.aside`
  display: grid;
  grid-template-columns: minmax(220px, .42fr) minmax(0, 1fr);
  gap: 18px;
  align-items: center;
  padding: 18px;
  border-radius: 34px;
  background: #e0e5ec;
  box-shadow:
    -7px -7px 15px rgba(255,255,255,.8),
    7px 7px 15px rgba(0,0,0,.1);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const ConfirmBrand = styled.div`
  padding: 12px;

  .mark {
    display: grid;
    width: 64px;
    height: 64px;
    place-items: center;
    border-radius: 50%;
    color: #41c5a7;
    background: #e0e5ec;
    box-shadow:
      -3px -3px 7px rgba(255,255,255,.9),
      3px 3px 5px rgba(0,0,0,.2);
  }

  h2 {
    margin: 18px 0 0;
    color: #435260;
    font-size: 30px;
    line-height: .94;
    letter-spacing: 0;
  }

  p {
    margin: 10px 0 0;
    color: rgba(67,82,96,.62);
    font-size: 13px;
    font-weight: 800;
    line-height: 1.55;
  }
`;

const ConfirmNav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-end;
`;

const ConfirmNavButton = styled.button<{ $active?: boolean }>`
  display: flex;
  min-height: 48px;
  align-items: center;
  gap: 12px;
  padding: 0 17px;
  border-radius: 26px;
  color: ${({ $active }) => ($active ? "#41a88f" : "#8a9baf")};
  background: #e0e5ec;
  box-shadow: ${({ $active }) =>
    $active
      ? "inset 3px 3px 5px rgba(0,0,0,.12), inset -3px -3px 7px rgba(255,255,255,1)"
      : "-3px -3px 7px rgba(255,255,255,.82), 3px 3px 7px rgba(0,0,0,.09)"};
  cursor: pointer;
  font-weight: 900;
  transition: transform .22s ease, box-shadow .22s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ConfirmMain = styled.div`
  display: grid;
  gap: 24px;
`;

const ConfirmHero = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(340px, .9fr);
  gap: 30px;
  align-items: center;
  min-height: 520px;
  border-radius: 38px;
  padding: clamp(24px, 5vw, 52px);
  background: #e0e5ec;
  box-shadow:
    -7px -7px 15px rgba(255,255,255,.8),
    7px 7px 15px rgba(0,0,0,.1);

  @media (max-width: 1050px) {
    grid-template-columns: 1fr;
  }
`;

const ConfirmHeroCopy = styled.div`
  h1 {
    margin: 0;
    color: #435260;
    font-size: clamp(46px, 7vw, 94px);
    line-height: .86;
    letter-spacing: 0;
  }

  p {
    max-width: 610px;
    margin: 20px 0 0;
    color: rgba(67,82,96,.66);
    font-size: 15px;
    font-weight: 800;
    line-height: 1.6;
  }
`;

const ConfirmSwipeWrap = styled.div`
  display: grid;
  place-items: center;
  min-height: 220px;

  .swipe-toggle {
    display: none;
  }

  .swipe-container {
    position: relative;
    display: flex;
    width: 320px;
    height: 70px;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 35px;
    background: #e0e5ec;
    box-shadow:
      -7px -7px 15px rgba(255,255,255,.8),
      7px 7px 15px rgba(0,0,0,.1);
    cursor: pointer;
    user-select: none;
    transition: all .5s cubic-bezier(.23,1,.32,1);
  }

  .swipe-container::after {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    content: "";
    border-radius: 35px;
    background: linear-gradient(145deg, #86e3ce, #a1ffc0);
    filter: blur(20px);
    opacity: 0;
    transform: scale(.9);
    transition: opacity .7s ease, transform .7s ease;
    transition-delay: .5s;
  }

  .dent-effect {
    position: absolute;
    top: 5px;
    left: 5px;
    z-index: 0;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background:
      radial-gradient(circle at 75% 75%, rgba(0,0,0,.25) 0%, transparent 50%),
      radial-gradient(circle at 25% 25%, rgba(255,255,255,.5) 0%, transparent 40%);
    opacity: 0;
    pointer-events: none;
    mix-blend-mode: overlay;
    transition: left .6s cubic-bezier(.23,1,.32,1), opacity .5s ease;
  }

  .swipe-handle {
    position: absolute;
    left: 5px;
    z-index: 6;
    display: flex;
    width: 60px;
    height: 60px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: #e0e5ec;
    box-shadow:
      -3px -3px 7px rgba(255,255,255,.9),
      3px 3px 5px rgba(0,0,0,.2);
    transition: all .6s cubic-bezier(.23,1,.32,1);
  }

  .swipe-container:active .swipe-handle {
    transform: scale(1.05);
    box-shadow:
      -4px -4px 10px rgba(255,255,255,.9),
      4px 4px 8px rgba(0,0,0,.2);
  }

  .icon-container {
    position: relative;
    width: 28px;
    height: 28px;
  }

  .lock-icon,
  .checkmark-icon {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .lock-icon {
    stroke: #8a9baf;
  }

  .lock-icon path,
  .lock-icon rect {
    transition: stroke-dashoffset .4s cubic-bezier(.5,0,.9,.5);
  }

  .lock-icon path {
    stroke-dasharray: 35;
    stroke-dashoffset: 0;
  }

  .lock-icon rect {
    stroke-dasharray: 58;
    stroke-dashoffset: 0;
  }

  .checkmark-icon {
    stroke: #41c5a7;
    stroke-dasharray: 24;
    stroke-dashoffset: 24;
    opacity: 0;
    transition: stroke-dashoffset .4s ease-out .2s, opacity .2s ease-out .2s;
  }

  .text-container {
    position: absolute;
    z-index: 5;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
  }

  .swipe-text,
  .text-confirmed {
    position: absolute;
    font-size: 16px;
    font-weight: 700;
    transition: opacity .4s ease-in-out;
  }

  .swipe-text {
    color: #8a9baf;
    opacity: 1;
  }

  .text-confirmed {
    color: white;
    opacity: 0;
  }

  .swipe-fill,
  .glass-effect-layer,
  .glass-tint-layer,
  .glass-shine-layer {
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 100%;
    border-radius: 35px;
    transition: width .6s cubic-bezier(.6,.04,.98,.34);
  }

  .swipe-fill {
    z-index: 1;
    background: linear-gradient(145deg, #86e3ce, #a1ffc0);
  }

  .glass-effect-layer {
    z-index: 2;
  }

  .glass-tint-layer {
    z-index: 3;
    background: rgba(255,255,255,.2);
  }

  .glass-shine-layer {
    z-index: 4;
    overflow: hidden;
    box-shadow: inset 1px 1px 1px rgba(255,255,255,.4);
    transition: width .6s cubic-bezier(.6,.04,.98,.34), box-shadow .5s ease-out;
  }

  .glass-shine-layer::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 60px;
    height: 100%;
    content: "";
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.5), transparent);
    opacity: 0;
    transform: translateX(-100px) skewX(-25deg);
  }

  .swipe-toggle:checked + .swipe-container {
    transform: scale(.98);
    box-shadow:
      -2px -2px 5px rgba(255,255,255,.7),
      2px 2px 8px rgba(71,199,163,.4);
  }

  .swipe-toggle:checked + .swipe-container::after {
    opacity: .7;
    transform: scale(1);
    animation: ${confirmPulseGlow} 2.5s infinite ease-in-out .5s;
  }

  .swipe-toggle:checked + .swipe-container .swipe-handle {
    left: calc(100% - 65px);
    background: #e0e5ec;
    box-shadow:
      inset 3px 3px 5px rgba(0,0,0,.15),
      inset -3px -3px 7px rgba(255,255,255,1);
  }

  .swipe-toggle:checked + .swipe-container .dent-effect {
    left: calc(100% - 65px);
    opacity: .7;
    transition-delay: .05s;
  }

  .swipe-toggle:checked + .swipe-container .swipe-fill,
  .swipe-toggle:checked + .swipe-container .glass-effect-layer,
  .swipe-toggle:checked + .swipe-container .glass-tint-layer,
  .swipe-toggle:checked + .swipe-container .glass-shine-layer {
    width: 100%;
  }

  .swipe-toggle:checked + .swipe-container .glass-effect-layer {
    filter: url(#glass-distortion);
  }

  .swipe-toggle:checked + .swipe-container .glass-shine-layer::before {
    animation: ${confirmShine} 1s cubic-bezier(.23,1,.32,1) .3s;
  }

  .swipe-toggle:checked + .swipe-container .glass-shine-layer {
    box-shadow:
      inset 3px 3px 6px rgba(55,84,78,.3),
      inset -2px -2px 5px rgba(255,255,255,.5);
  }

  .swipe-toggle:checked + .swipe-container .lock-icon path {
    stroke-dashoffset: 35;
  }

  .swipe-toggle:checked + .swipe-container .lock-icon rect {
    stroke-dashoffset: 58;
  }

  .swipe-toggle:checked + .swipe-container .checkmark-icon {
    opacity: 1;
    stroke-dashoffset: 0;
  }

  .swipe-toggle:checked + .swipe-container .swipe-text {
    opacity: 0;
  }

  .swipe-toggle:checked + .swipe-container .text-confirmed {
    opacity: 1;
    transition-delay: .2s;
  }
`;

const ConfirmPanel = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 30px;
  padding: 16px;
  background: #e0e5ec;
  box-shadow:
    -7px -7px 15px rgba(255,255,255,.8),
    7px 7px 15px rgba(0,0,0,.1);
  transition: transform 220ms ease, box-shadow 220ms ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow:
      -10px -10px 20px rgba(255,255,255,.86),
      10px 10px 20px rgba(0,0,0,.12);
  }

  h3,
  p {
    margin: 0;
  }

  h3 {
    color: #435260;
    font-size: 18px;
  }

  p {
    margin-top: 7px;
    color: rgba(67,82,96,.62);
    font-size: 13px;
    font-weight: 800;
    line-height: 1.5;
  }
`;

const ConfirmMetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;

  @media (max-width: 780px) {
    grid-template-columns: 1fr;
  }
`;

const ConfirmMetric = styled(ConfirmPanel)<{ $accent: string }>`
  min-height: 150px;

  &::after {
    position: absolute;
    right: -34px;
    bottom: -46px;
    width: 126px;
    height: 126px;
    content: "";
    border-radius: 50%;
    background: ${({ $accent }) => $accent};
    opacity: .28;
    filter: blur(18px);
  }

  span,
  strong,
  em {
    position: relative;
    z-index: 1;
    display: block;
  }

  span {
    color: #8a9baf;
    font-size: 12px;
    font-weight: 900;
    letter-spacing: .12em;
    text-transform: uppercase;
  }

  strong {
    margin-top: 18px;
    color: #435260;
    font-size: clamp(34px, 5vw, 58px);
    line-height: .9;
  }

  em {
    margin-top: 12px;
    color: #41c5a7;
    font-style: normal;
    font-weight: 900;
  }
`;

const ConfirmLowerGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(260px, .78fr) minmax(230px, .58fr);
  gap: 24px;
  align-items: start;

  @media (max-width: 980px) {
    grid-template-columns: minmax(0, 1fr) minmax(260px, .82fr);
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const ConfirmAreaChart = styled.svg`
  display: block;
  width: 100%;
  height: 156px;
  margin-top: 20px;
  overflow: visible;
  border-radius: 28px;
  background:
    linear-gradient(180deg, rgba(255,255,255,.32), rgba(255,255,255,.08)),
    #e0e5ec;
  box-shadow:
    inset 5px 5px 11px rgba(65,86,88,.14),
    inset -5px -5px 11px rgba(255,255,255,.92);

  .area {
    fill: rgba(65,197,167,.16);
  }

  .line {
    fill: none;
    stroke: #41c5a7;
    stroke-width: 10;
    stroke-linecap: round;
    stroke-linejoin: round;
    filter: drop-shadow(0 8px 10px rgba(65,197,167,.28));
  }

  .point {
    fill: #e0e5ec;
    stroke: #41c5a7;
    stroke-width: 4;
    filter: drop-shadow(0 4px 6px rgba(65,197,167,.22));
  }
`;

const ConfirmHeatmap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin-top: 20px;
  padding: 14px;
  border-radius: 26px;
  background: #e0e5ec;
  box-shadow:
    inset 5px 5px 11px rgba(65,86,88,.14),
    inset -5px -5px 11px rgba(255,255,255,.92);
`;

const ConfirmHeatCell = styled.div<{ $value: number }>`
  display: grid;
  min-height: 58px;
  place-items: center;
  border-radius: 18px;
  color: ${({ $value }) => ($value > 86 ? "#ffffff" : "#435260")};
  background: ${({ $value }) =>
    $value > 90
      ? "linear-gradient(145deg, #41c5a7, #a1ffc0)"
      : $value > 78
        ? "linear-gradient(145deg, #86e3ce, #d8fff0)"
        : "linear-gradient(145deg, #d7dce3, #eef4f1)"};
  box-shadow: ${({ $value }) =>
    $value > 86
      ? "0 10px 18px rgba(65,197,167,.28), inset 1px 1px 1px rgba(255,255,255,.42)"
      : "-3px -3px 7px rgba(255,255,255,.78), 3px 3px 7px rgba(0,0,0,.08)"};
  font-size: 12px;
  font-weight: 900;
  transition: transform 220ms ${t.spring}, box-shadow 220ms ease;

  &:hover {
    transform: translateY(-5px) scale(1.03);
  }
`;

const ConfirmRingDeck = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 16px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const ConfirmRing = styled.div<{ $value: number }>`
  display: grid;
  min-height: 130px;
  place-items: center;
  border-radius: 26px;
  background:
    radial-gradient(circle, #e0e5ec 0 51%, transparent 52%),
    conic-gradient(#41c5a7 0 ${({ $value }) => $value}%, rgba(138,155,175,.18) ${({ $value }) => $value}% 100%);
  box-shadow:
    -5px -5px 10px rgba(255,255,255,.82),
    5px 5px 12px rgba(0,0,0,.09);
  transition: transform 220ms ${t.spring}, box-shadow 220ms ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow:
      -8px -8px 14px rgba(255,255,255,.9),
      8px 8px 16px rgba(0,0,0,.12),
      0 0 22px rgba(65,197,167,.18);
  }

  strong,
  span {
    grid-area: 1 / 1;
    display: block;
    text-align: center;
  }

  strong {
    margin-top: -14px;
    color: #435260;
    font-size: 23px;
    line-height: 1;
  }

  span {
    margin-top: 36px;
    color: #8a9baf;
    font-size: 11px;
    font-weight: 900;
    text-transform: uppercase;
  }
`;

const ConfirmRankList = styled.ol`
  display: grid;
  gap: 12px;
  padding: 0;
  margin: 20px 0 0;
  list-style: none;
`;

const ConfirmRankRow = styled.li`
  display: grid;
  grid-template-columns: 42px 1fr auto;
  gap: 12px;
  align-items: center;
  padding: 13px;
  border-radius: 22px;
  background: #e0e5ec;
  box-shadow:
    -3px -3px 7px rgba(255,255,255,.78),
    3px 3px 7px rgba(0,0,0,.09);
  transition: transform 220ms ease, box-shadow 220ms ease;

  &:hover {
    transform: translateX(6px);
    box-shadow:
      inset 3px 3px 5px rgba(0,0,0,.1),
      inset -3px -3px 7px rgba(255,255,255,1);
  }

  .rank {
    display: grid;
    width: 42px;
    height: 42px;
    place-items: center;
    border-radius: 50%;
    color: #41c5a7;
    background: #e0e5ec;
    box-shadow:
      inset 3px 3px 5px rgba(0,0,0,.12),
      inset -3px -3px 7px rgba(255,255,255,1);
    font-weight: 900;
  }

  strong,
  span {
    display: block;
  }

  span {
    margin-top: 4px;
    color: #8a9baf;
    font-size: 12px;
    font-weight: 900;
  }

  .value {
    color: #435260;
    font-weight: 900;
  }
`;

const ConfirmActionButton = styled.button`
  display: inline-flex;
  min-height: 46px;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 0 17px;
  border-radius: 23px;
  color: #41a88f;
  background: #e0e5ec;
  box-shadow:
    -3px -3px 7px rgba(255,255,255,.82),
    3px 3px 7px rgba(0,0,0,.09);
  cursor: pointer;
  font-weight: 900;
  transition: transform 180ms ease, box-shadow 220ms ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      -5px -5px 10px rgba(255,255,255,.9),
      5px 5px 12px rgba(0,0,0,.14);
  }
`;

const ConfirmModal = styled(ConfirmPanel)`
  width: min(620px, 100%);
  animation: ${pop} 180ms ease both;
`;

const FilamentFrame = styled.div`
  display: grid;
  gap: 24px;
  width: 100%;
  max-width: none;
  margin: 0;
  color: rgba(255, 246, 232, .92);
`;

const FilamentHeader = styled.header`
  display: grid;
  grid-template-columns: minmax(240px, .34fr) minmax(0, 1fr);
  gap: 18px;
  align-items: center;
  padding: 16px;
  overflow: hidden;
  border-radius: 34px;
  background:
    linear-gradient(145deg, rgba(255,255,255,.1), rgba(255,255,255,.025)),
    rgba(21, 19, 18, .76);
  box-shadow:
    0 28px 70px rgba(0,0,0,.38),
    inset 0 0 0 1px rgba(255,255,255,.08),
    inset 0 -26px 60px rgba(0,0,0,.26);
  backdrop-filter: blur(28px) saturate(1.2);

  @media (max-width: 940px) {
    grid-template-columns: 1fr;
  }
`;

const FilamentBrand = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;

  .mark {
    display: grid;
    width: 62px;
    height: 62px;
    place-items: center;
    border-radius: 22px;
    color: #ff8800;
    background:
      linear-gradient(180deg, #7a7a7a, #eeeeee 28%, #787878 58%, #666666 78%, #9e9e9e),
      #777;
    box-shadow:
      inset 8px -15px 15px -12px black,
      inset 10px -17px 12px -12px white,
      0 20px 46px rgba(0,0,0,.34);
  }

  h2,
  p {
    margin: 0;
  }

  h2 {
    color: #fff6e8;
    font-size: 26px;
    line-height: .96;
  }

  p {
    margin-top: 6px;
    color: rgba(255,246,232,.52);
    font-size: 13px;
    font-weight: 800;
    line-height: 1.45;
  }
`;

const FilamentNav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-end;
`;

const FilamentNavButton = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  min-height: 46px;
  align-items: center;
  gap: 9px;
  padding: 0 15px;
  border-radius: 999px;
  color: ${({ $active }) => ($active ? "#1b1410" : "rgba(255,246,232,.68)")};
  background: ${({ $active }) =>
    $active
      ? "linear-gradient(180deg, #ffcc84, #ff8800 62%, #814000)"
      : "linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.025))"};
  box-shadow: ${({ $active }) =>
    $active
      ? "0 0 28px rgba(255,136,0,.38), inset 0 1px 1px rgba(255,255,255,.5), inset 0 -12px 18px rgba(0,0,0,.24)"
      : "inset 0 0 0 1px rgba(255,255,255,.08), 0 12px 26px rgba(0,0,0,.2)"};
  cursor: pointer;
  font-weight: 900;
  transition: transform 240ms cubic-bezier(.5,2,.3,.8), box-shadow 220ms ease;

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow:
      0 0 30px rgba(255,136,0,.2),
      inset 0 0 0 1px rgba(255,255,255,.14);
  }
`;

const FilamentHero = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(320px, .85fr);
  gap: 30px;
  align-items: center;
  min-height: 560px;
  overflow: hidden;
  border-radius: 42px;
  padding: clamp(24px, 5vw, 58px);
  background:
    radial-gradient(circle at 76% 18%, rgba(255,136,0,.28), transparent 0 24%),
    radial-gradient(circle at 20% 20%, rgba(0,251,255,.1), transparent 0 26%),
    linear-gradient(145deg, rgba(255,255,255,.09), rgba(255,255,255,.025)),
    rgba(21,19,18,.72);
  box-shadow:
    0 34px 90px rgba(0,0,0,.44),
    inset 0 0 0 1px rgba(255,255,255,.08),
    inset 0 -50px 100px rgba(0,0,0,.3);

  &::before {
    position: absolute;
    right: -12%;
    top: -20%;
    width: 42%;
    height: 52%;
    content: "";
    border-radius: 50%;
    background: #ff8800;
    border-left: 10px solid rgba(255,255,255,.76);
    border-bottom: 10px solid rgba(255,255,255,.62);
    filter: blur(120px);
  }

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const FilamentHeroCopy = styled.div`
  position: relative;
  z-index: 1;

  > span {
    color: #ff8800;
    font-size: 12px;
    font-weight: 900;
    letter-spacing: .16em;
    text-transform: uppercase;
  }

  h1 {
    max-width: 820px;
    margin: 14px 0 0;
    color: #fff6e8;
    font-size: clamp(48px, 8vw, 112px);
    line-height: .82;
    letter-spacing: 0;
    text-shadow: 0 0 32px rgba(255,136,0,.24);
  }

  p {
    max-width: 690px;
    margin: 22px 0 0;
    color: rgba(255,246,232,.62);
    font-size: 15px;
    font-weight: 800;
    line-height: 1.65;
  }
`;

const FilamentActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  margin-top: 30px;
`;

const FilamentButtonWrap = styled.div`
  --ease-elastic: cubic-bezier(.5, 2, .3, .8);
  --ease-elastic-2: cubic-bezier(.5, -1, .3, .8);
  --primary: #ff8800;
  --h: 78px;

  position: relative;
  display: inline-grid;
  min-width: min(330px, 100%);
  min-height: 118px;
  place-items: center;

  .area-wrapper {
    position: relative;
    display: inline-block;
    padding: 20px 5px;
    cursor: pointer;
  }

  input {
    position: absolute;
    inset: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  .button {
    position: relative;
    display: flex;
    transform: translateY(-10px) scale(1.02);
    transition: transform .6s var(--ease-elastic);
  }

  .area-wrapper:hover .button {
    transform: translateY(0) scale(1);
  }

  .button::before,
  .button::after {
    position: absolute;
    pointer-events: none;
    content: "";
    opacity: 0;
    transition: opacity 1s ease .2s;
    mix-blend-mode: color-dodge;
  }

  .button::before {
    top: 0;
    bottom: 0;
    left: 25%;
    width: 72%;
    height: 100%;
    margin: auto;
    border-radius: 0 50% 50% 0;
    background: linear-gradient(to right, var(--primary), transparent);
    filter: blur(30px);
  }

  .button::after {
    top: 0;
    bottom: 0;
    left: 31%;
    width: 50px;
    height: 50px;
    margin: auto;
    border-radius: 50%;
    background: var(--primary);
    filter: blur(15px);
  }

  .area-wrapper:hover input:checked ~ .button::before,
  .area-wrapper:hover input:checked ~ .button::after {
    opacity: 1;
  }

  .socket {
    position: relative;
    z-index: 1;
    display: flex;
    width: 104px;
    height: var(--h);
    align-items: center;
    justify-content: flex-end;
    overflow: hidden;
    border-radius: 100px 12px 12px 100px;
    background:
      linear-gradient(to bottom, #2c2e31 0%, #31343e 20%, #212329 100%);
    box-shadow:
      inset 8px -15px 15px -10px black,
      inset 10px -17px 12px -12px white,
      0 30px 70px -5px #111;
    transform: translateX(-36px);
    transition: transform 1.05s var(--ease-elastic-2), box-shadow .7s var(--ease-elastic);
  }

  input:checked ~ .button .socket {
    transform: translateX(0);
  }

  .area-wrapper:hover .socket {
    box-shadow:
      inset 8px -15px 15px -10px black,
      inset 10px -17px 12px -12px white,
      0 20px 50px -5px #111;
  }

  .socket i {
    display: block;
    width: 13px;
    height: 58px;
    margin-left: 3px;
    border-radius: 9px;
    background: linear-gradient(180deg, #7a7a7a 8%, #eeeeee 30%, #787878 58%, #666 78%, #9e9e9e);
    box-shadow:
      inset 0 0 0 1px rgba(0,0,0,.42),
      inset 0 13px 18px rgba(255,255,255,.22),
      inset 0 -20px 20px rgba(0,0,0,.28);
    transform-origin: center;
  }

  .area-wrapper:hover .socket i {
    animation: filamentPulse .8s ease calc(var(--i) * .07s) both;
  }

  .glass {
    position: relative;
    display: grid;
    width: 210px;
    height: var(--h);
    place-items: center;
    overflow: hidden;
    border-left: 1px solid rgba(0,0,0,.34);
    border-radius: 12px 100px 100px 12px;
    background:
      linear-gradient(to bottom, rgba(255,255,255,.15), rgba(255,255,255,.22) 50%, rgba(0,0,0,.5)),
      rgba(255,255,255,.04);
    box-shadow:
      inset 0 0 7px -4px white,
      inset 0 -10px 10px -8px rgba(255,255,255,.4),
      inset 8px -15px 15px -10px black,
      inset 8px -10px 12px -12px white,
      0 30px 70px -5px #111;
    transition: box-shadow .9s var(--ease-elastic);
  }

  .glass::before {
    position: absolute;
    left: 0;
    top: 10%;
    right: 14%;
    height: 70%;
    content: "";
    border-radius: 0 25px 0 0;
    background: linear-gradient(to bottom, rgba(255,255,255,.5), rgba(255,255,255,0) 60%);
  }

  .glass::after {
    position: absolute;
    left: 0;
    bottom: 15%;
    right: 5%;
    height: 75%;
    content: "";
    border-radius: 0 30px 30px 0;
    box-shadow: inset -2px -6px 5px -5px rgba(255,255,255,.8);
    filter: blur(3px);
  }

  .glass-reflex {
    position: absolute;
    inset: 0 auto 0 0;
    width: 70%;
    border-radius: 0 50% 50% 0;
    background: linear-gradient(to right, rgba(255,255,255,.03), rgba(255,255,255,.2));
    transform: translateX(-115%) skewX(30deg);
  }

  .area-wrapper:hover .glass-reflex {
    animation: filamentReflex .6s ease;
  }

  .filament {
    position: absolute;
    left: 18px;
    width: 72px;
    height: 44px;
    fill: none;
    stroke: #ffc4af;
    stroke-width: 1.8;
    opacity: .32;
  }

  .filament-on {
    opacity: 1;
    filter: blur(4px) drop-shadow(0 0 10px var(--primary));
    stroke: white;
  }

  .filament-on path {
    stroke-dasharray: 100 100;
    stroke-dashoffset: 100;
    transition: stroke-dashoffset .6s ease .35s, stroke-dasharray .6s ease .35s;
  }

  .area-wrapper:hover input:checked ~ .button .filament-on path {
    stroke-dasharray: 100 0;
    stroke-dashoffset: 0;
  }

  .content,
  .text {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .content {
    left: 66px;
  }

  .filament-letters {
    display: flex;
    gap: .08em;
    letter-spacing: .12em;
  }

  .filament-letters span {
    position: relative;
    display: block;
    color: transparent;
    font-size: 15px;
    font-weight: 900;
    text-transform: uppercase;
  }

  .filament-letters span::before,
  .filament-letters span::after {
    position: absolute;
    left: 0;
    content: attr(data-label);
    color: rgba(255,255,255,.9);
  }

  .filament-letters span::before {
    opacity: 0;
    transform: translateY(-100%);
  }

  .area-wrapper:hover .filament-letters span::before {
    animation: filamentCharIn 1s ease calc(var(--i) * .03s) forwards;
  }

  .area-wrapper:hover .filament-letters span::after {
    animation: filamentCharOut 1.1s ease calc(var(--i) * .04s) backwards;
  }

  .state-2 {
    opacity: 0;
  }

  input:checked ~ .button .state-1 {
    opacity: 0;
  }

  input:checked ~ .button .state-2 {
    opacity: 1;
  }

  @keyframes filamentPulse {
    30% { transform: scaleY(.78); filter: drop-shadow(0 0 5px var(--primary)); }
  }

  @keyframes filamentReflex {
    from { transform: translateX(-115%) skewX(30deg); }
    to { transform: translateX(140%) skewX(30deg); }
  }

  @keyframes filamentCharIn {
    0% { opacity: 0; transform: scale(7) translateX(-25%); filter: blur(10px); color: #00fbff; }
    25% { opacity: 1; transform: translateY(-15%); filter: blur(1px); color: var(--primary); }
    100% { opacity: 1; transform: translateY(0); filter: blur(0); }
  }

  @keyframes filamentCharOut {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(-70%); filter: blur(4px); }
  }
`;

const FilamentSmallButton = styled.button`
  display: inline-flex;
  min-height: 50px;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 0 17px;
  border-radius: 999px;
  color: #1d1410;
  background: linear-gradient(180deg, #ffcc84, #ff8800 62%, #814000);
  box-shadow:
    0 0 28px rgba(255,136,0,.34),
    inset 0 1px 1px rgba(255,255,255,.5),
    inset 0 -14px 18px rgba(0,0,0,.24);
  cursor: pointer;
  font-weight: 900;
  transition: transform 220ms cubic-bezier(.5,2,.3,.8), box-shadow 220ms ease;

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow:
      0 0 38px rgba(255,136,0,.5),
      inset 0 1px 1px rgba(255,255,255,.56),
      inset 0 -14px 18px rgba(0,0,0,.28);
  }

  &:active {
    transform: translateY(1px) scale(.98);
  }
`;

const FilamentGauge = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  min-height: 360px;
  place-items: center;
  border-radius: 38px;
  background:
    radial-gradient(circle at 50% 48%, rgba(255,136,0,.28), transparent 0 30%),
    radial-gradient(circle at 50% 50%, rgba(255,246,232,.9) 0 15%, transparent 16%),
    conic-gradient(from -110deg, #ff8800 0 72%, rgba(255,255,255,.08) 72% 100%);
  box-shadow:
    0 30px 80px rgba(0,0,0,.34),
    inset 0 0 0 1px rgba(255,255,255,.1),
    inset 0 -32px 54px rgba(0,0,0,.26);

  &::before {
    position: absolute;
    width: 58%;
    aspect-ratio: 1;
    content: "";
    border-radius: 50%;
    background: #171412;
    box-shadow:
      inset 8px -15px 15px -10px black,
      inset 10px -17px 12px -12px white;
  }

  strong,
  span {
    position: relative;
    z-index: 1;
    display: block;
    text-align: center;
  }

  strong {
    color: #fff6e8;
    font-size: clamp(60px, 8vw, 104px);
    line-height: .86;
    text-shadow: 0 0 26px rgba(255,136,0,.5);
  }

  span {
    margin-top: 8px;
    color: rgba(255,246,232,.58);
    font-size: 12px;
    font-weight: 900;
    text-transform: uppercase;
  }
`;

const FilamentMetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const FilamentPanel = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 32px;
  padding: 22px;
  background:
    linear-gradient(145deg, rgba(255,255,255,.1), rgba(255,255,255,.025)),
    rgba(21,19,18,.76);
  box-shadow:
    0 24px 62px rgba(0,0,0,.34),
    inset 0 0 0 1px rgba(255,255,255,.08),
    inset 0 -22px 48px rgba(0,0,0,.24);
  backdrop-filter: blur(24px) saturate(1.12);
  transition: transform 240ms cubic-bezier(.5,2,.3,.8), box-shadow 220ms ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow:
      0 28px 74px rgba(0,0,0,.42),
      0 0 30px rgba(255,136,0,.14),
      inset 0 0 0 1px rgba(255,255,255,.11),
      inset 0 -22px 48px rgba(0,0,0,.26);
  }

  h3,
  p {
    margin: 0;
  }

  h3 {
    color: #fff6e8;
    font-size: 18px;
    letter-spacing: .06em;
    text-transform: uppercase;
  }

  p {
    margin-top: 7px;
    color: rgba(255,246,232,.52);
    font-size: 13px;
    font-weight: 800;
    line-height: 1.5;
  }
`;

const FilamentMetric = styled(FilamentPanel)<{ $accent: string }>`
  min-height: 158px;

  &::after {
    position: absolute;
    right: -38px;
    bottom: -48px;
    width: 130px;
    height: 130px;
    content: "";
    border-radius: 50%;
    background: ${({ $accent }) => $accent};
    opacity: .3;
    filter: blur(28px);
  }

  span,
  strong,
  em {
    position: relative;
    z-index: 1;
    display: block;
  }

  span {
    color: rgba(255,246,232,.54);
    font-size: 12px;
    font-weight: 900;
    letter-spacing: .14em;
    text-transform: uppercase;
  }

  strong {
    margin-top: 22px;
    color: #fff6e8;
    font-size: clamp(34px, 5vw, 58px);
    line-height: .9;
  }

  em {
    margin-top: 12px;
    color: ${({ $accent }) => $accent};
    font-style: normal;
    font-weight: 900;
  }
`;

const FilamentConsoleGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(250px, .72fr) minmax(250px, .72fr);
  gap: 22px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const FilamentWave = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;
  gap: 9px;
  height: 100%;
  min-height: 270px;
  margin-top: 22px;
  padding: 20px;
  border-radius: 28px;
  background:
    radial-gradient(circle at 50% 50%, rgba(255,136,0,.16), transparent 0 45%),
    rgba(0,0,0,.22);
  box-shadow:
    inset 8px -15px 15px -12px black,
    inset 10px -17px 12px -12px rgba(255,255,255,.18);

  span {
    height: var(--h);
    min-height: 22px;
    border-radius: 999px;
    background:
      linear-gradient(180deg, rgba(255,255,255,.86), #ffc4af 34%, #ff8800 72%, #5b2a00);
    box-shadow:
      0 0 22px rgba(255,136,0,.42),
      inset 0 1px 1px rgba(255,255,255,.5),
      inset 0 -12px 16px rgba(0,0,0,.28);
    animation: ${arcFlash} 2.8s ease-in-out infinite;
    animation-delay: var(--d);
    transition: transform 220ms cubic-bezier(.5,2,.3,.8), filter 220ms ease;
  }

  span:hover {
    transform: translateY(-9px) scaleY(1.06);
    filter: brightness(1.18);
  }
`;

const FilamentHeatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-top: 22px;
`;

const FilamentHeatCell = styled.div<{ $value: number }>`
  display: grid;
  min-height: 64px;
  place-items: center;
  border-radius: 18px;
  color: ${({ $value }) => ($value > 86 ? "#1b1410" : "rgba(255,246,232,.78)")};
  background: ${({ $value }) =>
    $value > 90
      ? "linear-gradient(180deg, #ffcc84, #ff8800 62%, #814000)"
      : $value > 76
        ? "linear-gradient(180deg, rgba(255,196,175,.72), rgba(255,136,0,.34))"
        : "linear-gradient(180deg, rgba(255,255,255,.09), rgba(255,255,255,.03))"};
  box-shadow:
    inset 0 0 0 1px rgba(255,255,255,.08),
    inset 0 -12px 18px rgba(0,0,0,.24),
    0 10px 20px rgba(0,0,0,.18);
  font-size: 12px;
  font-weight: 900;
  transition: transform 220ms cubic-bezier(.5,2,.3,.8), box-shadow 220ms ease;

  &:hover {
    transform: translateY(-5px) scale(1.04);
    box-shadow:
      inset 0 0 0 1px rgba(255,255,255,.12),
      inset 0 -12px 18px rgba(0,0,0,.28),
      0 0 24px rgba(255,136,0,.28);
  }
`;

const FilamentRankList = styled.ol`
  display: grid;
  gap: 13px;
  padding: 0;
  margin: 22px 0 0;
  list-style: none;
`;

const FilamentRankRow = styled.li<{ $accent: string }>`
  display: grid;
  grid-template-columns: 44px 1fr auto;
  gap: 13px;
  align-items: center;
  padding: 13px;
  border-radius: 22px;
  background: rgba(0,0,0,.22);
  box-shadow:
    inset 0 0 0 1px rgba(255,255,255,.08),
    inset 0 -10px 20px rgba(0,0,0,.22);
  transition: transform 220ms cubic-bezier(.5,2,.3,.8), box-shadow 220ms ease;

  &:hover {
    transform: translateX(7px);
    box-shadow:
      inset 0 0 0 1px rgba(255,255,255,.12),
      0 0 24px ${({ $accent }) => `${$accent}55`};
  }

  .rank {
    display: grid;
    width: 44px;
    height: 44px;
    place-items: center;
    border-radius: 15px;
    color: #1b1410;
    background: ${({ $accent }) => `linear-gradient(180deg, #eeeeee, ${$accent} 58%, #666)`};
    box-shadow:
      inset 0 1px 1px rgba(255,255,255,.5),
      inset 0 -12px 18px rgba(0,0,0,.26);
    font-weight: 900;
  }

  strong,
  span,
  em {
    display: block;
  }

  strong {
    color: #fff6e8;
  }

  span {
    margin-top: 4px;
    color: rgba(255,246,232,.5);
    font-size: 12px;
    font-weight: 800;
  }

  em {
    color: ${({ $accent }) => $accent};
    font-style: normal;
    font-weight: 900;
  }
`;

const FilamentModal = styled(FilamentPanel)`
  width: min(650px, 100%);
  animation: ${pop} 180ms ease both;
`;

const BatteryFrame = styled.div`
  display: grid;
  gap: 24px;
  width: 100%;
  max-width: none;
  margin: 0;
  color: #ffffff;
`;

const BatteryHeader = styled.header`
  display: grid;
  grid-template-columns: minmax(240px, .36fr) minmax(0, 1fr);
  gap: 18px;
  align-items: center;
  padding: 16px;
  overflow: hidden;
  border-radius: 28px;
  background:
    linear-gradient(135deg, rgba(25,25,25,.95), rgba(30,30,30,.95)),
    #050706;
  box-shadow:
    0 16px 40px rgba(0,0,0,.48),
    inset 0 0 30px rgba(0,0,0,.5),
    inset 0 0 0 1px rgba(255,255,255,.06);
  backdrop-filter: blur(12px);

  @media (max-width: 940px) {
    grid-template-columns: 1fr;
  }
`;

const BatteryBrand = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  .mark {
    position: relative;
    display: grid;
    width: 62px;
    height: 62px;
    place-items: center;
    border-radius: 22px;
    color: #85ffdb;
    background: linear-gradient(135deg, rgba(25,25,25,.95), rgba(30,30,30,.95));
    box-shadow:
      0 10px 25px rgba(0,0,0,.5),
      inset 0 0 30px rgba(0,0,0,.5),
      0 0 20px rgba(45,196,141,.18);
  }

  .mark::before,
  .mark::after {
    position: absolute;
    width: 7px;
    height: 7px;
    content: "";
    border-radius: 50%;
    background: #2dc48d;
    box-shadow: 0 0 10px rgba(45,196,141,.7);
  }

  .mark::before {
    top: 10px;
    left: 10px;
  }

  .mark::after {
    right: 10px;
    bottom: 10px;
  }

  h2,
  p {
    margin: 0;
  }

  h2 {
    font-size: 27px;
    line-height: .96;
  }

  p {
    margin-top: 6px;
    color: #888888;
    font-size: 13px;
    font-weight: 800;
    line-height: 1.45;
  }
`;

const BatteryNav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-end;
`;

const BatteryNavButton = styled.button<{ $active?: boolean }>`
  position: relative;
  display: inline-flex;
  min-height: 46px;
  align-items: center;
  gap: 9px;
  overflow: hidden;
  padding: 0 15px;
  border-radius: 18px;
  color: ${({ $active }) => ($active ? "#ffffff" : "#888888")};
  background: ${({ $active }) => ($active ? "linear-gradient(135deg, #2dc48d, #1aa27a)" : "rgba(25,25,25,.95)")};
  box-shadow: ${({ $active }) =>
    $active
      ? "0 0 20px rgba(45,196,141,.42), inset 0 0 0 1px rgba(255,255,255,.1)"
      : "0 10px 22px rgba(0,0,0,.32), inset 0 0 0 1px rgba(255,255,255,.06)"};
  cursor: pointer;
  font-weight: 900;
  transition: transform 260ms cubic-bezier(.175,.885,.32,1.275), box-shadow 220ms ease, color 220ms ease;

  &:hover {
    transform: translateY(-3px) scale(1.03);
    color: #ffffff;
    box-shadow:
      0 0 30px rgba(45,196,141,.32),
      inset 0 0 0 1px rgba(133,255,219,.18);
  }
`;

const BatteryHero = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, .92fr) minmax(340px, 1.08fr);
  gap: 30px;
  align-items: center;
  min-height: 560px;
  overflow: hidden;
  border-radius: 34px;
  padding: clamp(24px, 5vw, 54px);
  background:
    radial-gradient(circle at 72% 40%, rgba(45,196,141,.16), transparent 0 35%),
    linear-gradient(135deg, rgba(25,25,25,.95), rgba(30,30,30,.95)),
    #050706;
  box-shadow:
    0 20px 60px rgba(0,0,0,.5),
    inset 0 0 50px rgba(0,0,0,.58),
    inset 0 0 0 1px rgba(255,255,255,.06);

  &::before {
    position: absolute;
    inset: 0;
    content: "";
    opacity: .06;
    background:
      linear-gradient(90deg, transparent 90%, #2dc48d 90% 91%, transparent 91%) 0 0 / 40px 40px,
      linear-gradient(0deg, transparent 90%, #2dc48d 90% 91%, transparent 91%) 0 0 / 40px 40px;
    animation: batteryCircuitFlash 8s infinite;
  }

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const BatteryHeroCopy = styled.div`
  position: relative;
  z-index: 1;

  > span {
    color: #85ffdb;
    font-size: 12px;
    font-weight: 900;
    letter-spacing: .16em;
    text-transform: uppercase;
  }

  h1 {
    max-width: 760px;
    margin: 14px 0 0;
    font-size: clamp(48px, 8vw, 106px);
    line-height: .84;
    letter-spacing: 0;
    background: linear-gradient(180deg, #ffffff 40%, #c8c8c8 100%);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    text-shadow: 0 2px 10px rgba(255,255,255,.1);
  }

  p {
    max-width: 660px;
    margin: 22px 0 0;
    color: #888888;
    font-size: 15px;
    font-weight: 800;
    line-height: 1.65;
  }
`;

const BatteryActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  margin-top: 28px;
`;

const BatteryActionButton = styled.button`
  display: inline-flex;
  min-height: 50px;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 0 17px;
  border-radius: 18px;
  color: #ffffff;
  background: linear-gradient(135deg, #2dc48d, #1aa27a);
  box-shadow:
    0 0 22px rgba(45,196,141,.38),
    inset 0 0 0 1px rgba(255,255,255,.11);
  cursor: pointer;
  font-weight: 900;
  letter-spacing: .02em;
  transition: transform 220ms cubic-bezier(.175,.885,.32,1.275), box-shadow 220ms ease;

  &:hover {
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0 0 34px rgba(45,196,141,.5);
  }

  &:active {
    transform: translateY(1px) scale(.98);
  }
`;

const BatteryChargeCard = styled.div`
  --green-gradient-start: #2dc48d;
  --green-gradient-end: #1aa27a;
  --green-dark: #166d52;
  --green-glow: rgba(45,196,141,.6);
  --lightning-color: #85ffdb;

  position: relative;
  z-index: 1;
  display: flex;
  width: min(100%, 360px);
  min-height: 360px;
  flex-direction: column;
  justify-content: space-between;
  justify-self: center;
  overflow: hidden;
  border-radius: 22px;
  padding: 30px;
  color: #ffffff;
  background: linear-gradient(135deg, rgba(25,25,25,.95), rgba(30,30,30,.95));
  box-shadow:
    0 10px 25px rgba(0,0,0,.5),
    inset 0 0 30px rgba(0,0,0,.5);
  backdrop-filter: blur(10px);
  transform: perspective(1000px) rotateX(5deg);
  transform-style: preserve-3d;
  animation: batteryFloat 6s ease-in-out infinite;
  transition:
    transform .5s cubic-bezier(.175,.885,.32,1.275),
    filter .5s ease;

  &:hover {
    transform: perspective(1000px) rotateX(10deg) scale(1.03) translateY(-5px);
    filter: drop-shadow(0 20px 20px rgba(0,0,0,.4));
    animation: none;
  }

  &::before,
  &::after {
    position: absolute;
    z-index: 1;
    width: 150px;
    height: 100px;
    content: "";
    animation: batteryLineGlow 2s linear infinite;
  }

  &::before {
    top: 0;
    right: 0;
    border-top: 2px solid rgba(255,255,255,.85);
    border-right: 2px solid rgba(255,255,255,.85);
    border-top-right-radius: 22px;
  }

  &::after {
    bottom: 0;
    left: 0;
    border-bottom: 2px solid rgba(255,255,255,.85);
    border-left: 2px solid rgba(255,255,255,.85);
    border-bottom-left-radius: 22px;
  }

  &:hover::before,
  &:hover::after {
    animation: batteryLineScan 3s linear infinite;
    border-color: var(--lightning-color);
  }

  .card-glow {
    position: absolute;
    inset: -5px;
    z-index: -1;
    border-radius: 22px;
    opacity: 0;
    box-shadow: 0 0 60px 2px var(--green-glow);
    transition: opacity .5s ease;
  }

  &:hover .card-glow {
    opacity: 1;
  }

  .circuit-lines {
    position: absolute;
    inset: 0;
    z-index: 0;
    opacity: .05;
    pointer-events: none;
    background:
      radial-gradient(circle at 30% 20%, var(--green-dark) 0%, transparent 8%),
      radial-gradient(circle at 70% 80%, var(--green-dark) 0%, transparent 8%);
  }

  .circuit-lines::before {
    position: absolute;
    inset: 0;
    content: "";
    background:
      linear-gradient(90deg, transparent 90%, var(--green-gradient-start) 90% 91%, transparent 91%) 0 0 / 40px 40px,
      linear-gradient(0deg, transparent 90%, var(--green-gradient-start) 90% 91%, transparent 91%) 0 0 / 40px 40px;
    animation: batteryCircuitFlash 8s infinite;
  }

  .percentage,
  .charging-status,
  .battery-info,
  .progress-bar,
  .corner-dots {
    position: relative;
    z-index: 2;
  }

  .percentage {
    text-align: center;
    color: transparent;
    background: linear-gradient(180deg, #ffffff 40%, #c8c8c8 100%);
    background-clip: text;
    -webkit-background-clip: text;
    font-size: clamp(58px, 8vw, 82px);
    font-weight: 900;
    text-shadow: 0 2px 10px rgba(255,255,255,.1);
    transition: transform .3s ease;
  }

  &:hover .percentage {
    animation: batteryTextPop .5s ease-out forwards;
    text-shadow: 0 0 15px rgba(255,255,255,.3);
  }

  .charging-status {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: #888888;
    font-size: 13px;
    font-weight: 900;
    letter-spacing: 1px;
    transition: color .3s ease, letter-spacing .3s ease;
  }

  .charging-status svg {
    color: var(--lightning-color);
    filter: drop-shadow(0 0 8px var(--lightning-color));
    animation: batteryBoltPulse 1.5s infinite;
  }

  &:hover .charging-status {
    color: #ffffff;
    letter-spacing: 2px;
  }

  .battery-info {
    display: grid;
    gap: 8px;
    margin-top: 16px;
  }

  .battery-core-grid {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    margin: 18px 0;
  }

  .battery-core-grid button {
    min-height: 58px;
    border-radius: 16px;
    padding: 9px;
    color: #ffffff;
    background: rgba(25,25,25,.82);
    box-shadow:
      inset 0 0 0 1px rgba(255,255,255,.06),
      0 0 18px rgba(45,196,141,.08);
    cursor: pointer;
    text-align: left;
    transition: transform .26s cubic-bezier(.175,.885,.32,1.275), box-shadow .22s ease;
  }

  .battery-core-grid button:hover {
    transform: translateY(-4px) scale(1.03);
    box-shadow:
      inset 0 0 0 1px rgba(133,255,219,.16),
      0 0 24px rgba(45,196,141,.22);
  }

  .battery-core-grid strong,
  .battery-core-grid span {
    display: block;
  }

  .battery-core-grid strong {
    color: var(--lightning-color);
    font-size: 17px;
  }

  .battery-core-grid span {
    margin-top: 7px;
    color: #888888;
    font-size: 10px;
    font-weight: 900;
    letter-spacing: .1em;
    text-transform: uppercase;
  }

  .battery-mini-rail {
    position: relative;
    z-index: 2;
    display: grid;
    gap: 8px;
  }

  .battery-mini-rail span {
    position: relative;
    height: 8px;
    overflow: hidden;
    border-radius: 999px;
    background: #333333;
  }

  .battery-mini-rail span::before {
    position: absolute;
    inset: 0 auto 0 0;
    width: var(--rail);
    content: "";
    border-radius: inherit;
    background: linear-gradient(90deg, var(--green-gradient-start), var(--lightning-color));
    box-shadow: 0 0 12px rgba(45,196,141,.6);
  }

  .battery-info-row {
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    color: #888888;
    font-size: 12px;
    font-weight: 900;
    cursor: pointer;
    transition: transform .3s ease, color .3s ease;
  }

  .battery-info-row:hover {
    color: #ffffff;
    transform: translateX(3px) scale(1.04);
  }

  .battery-info-row .tooltip {
    position: absolute;
    right: -4px;
    top: -2px;
    padding: 5px 8px;
    border-radius: 6px;
    color: #ffffff;
    background: var(--green-dark);
    box-shadow: 0 2px 10px rgba(0,0,0,.3);
    opacity: 0;
    pointer-events: none;
    transform: translateX(10px);
    transition: opacity .3s ease, transform .3s ease;
    white-space: nowrap;
  }

  .battery-info-row:hover .tooltip {
    opacity: 1;
    transform: translateX(0);
  }

  .progress-bar {
    display: flex;
    gap: 6px;
    margin-top: 22px;
  }

  .segment {
    position: relative;
    flex: 1;
    height: 6px;
    overflow: hidden;
    border-radius: 4px;
    background: #333333;
  }

  .segment.active {
    background: linear-gradient(to right, var(--green-gradient-start), var(--green-gradient-end));
    box-shadow: 0 0 8px rgba(45,196,141,.6);
    animation: batterySegmentPulse 2s infinite;
  }

  .segment.active::before {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    content: "";
    background: linear-gradient(to right, transparent, rgba(255,255,255,.22), transparent);
    transform: skewX(-15deg);
    animation: batterySegmentFlow 2s infinite;
  }

  &:hover .segment.active {
    animation: batterySegmentEnergize 1.5s infinite;
  }

  .energy-particles {
    position: absolute;
    inset: 0;
    z-index: 0;
    opacity: 0;
    overflow: hidden;
    transition: opacity .8s ease;
  }

  &:hover .energy-particles {
    opacity: 1;
  }

  .energy-particles::before,
  .energy-particles::after {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 3px;
    height: 3px;
    content: "";
    border-radius: 50%;
    background: var(--lightning-color);
    box-shadow:
      0 0 10px 2px var(--lightning-color),
      120px -60px 0 0 var(--lightning-color),
      -120px 60px 0 0 var(--lightning-color);
  }

  .energy-particles::before {
    animation: batteryParticle1 4s linear infinite;
  }

  .energy-particles::after {
    animation: batteryParticle2 6s linear infinite;
  }

  .corner-dots {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .corner-dots span {
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--green-gradient-start);
    box-shadow: 0 0 8px var(--green-glow);
    opacity: .7;
  }

  .corner-dots span:nth-child(1) { top: 12px; left: 12px; animation: batteryDotPulse 3s ease-in-out infinite; }
  .corner-dots span:nth-child(2) { top: 12px; right: 12px; animation: batteryDotPulse 3s ease-in-out infinite .5s; }
  .corner-dots span:nth-child(3) { bottom: 12px; left: 12px; animation: batteryDotPulse 3s ease-in-out infinite 1s; }
  .corner-dots span:nth-child(4) { bottom: 12px; right: 12px; animation: batteryDotPulse 3s ease-in-out infinite 1.5s; }

  &:hover .corner-dots span {
    animation: batteryDotGlow 1.5s ease-in-out infinite;
  }

  &[data-compact="true"] {
    width: min(100%, 320px);
    min-height: 100%;
    padding: 22px;
  }

  &[data-compact="true"] .percentage {
    font-size: 58px;
  }

  &[data-compact="true"] .battery-info {
    gap: 6px;
    margin-top: 10px;
  }

  &[data-compact="true"] .battery-core-grid {
    margin: 14px 0;
  }

  &[data-compact="true"] .progress-bar {
    margin-top: 14px;
  }
`;

const BatteryMetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const BatteryPanel = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  padding: 22px;
  background:
    linear-gradient(135deg, rgba(25,25,25,.95), rgba(30,30,30,.95)),
    #050706;
  box-shadow:
    0 12px 34px rgba(0,0,0,.46),
    inset 0 0 30px rgba(0,0,0,.5),
    inset 0 0 0 1px rgba(255,255,255,.06);
  transition: transform .34s cubic-bezier(.175,.885,.32,1.275), box-shadow 220ms ease;

  &::before {
    position: absolute;
    inset: 0;
    content: "";
    opacity: .05;
    background:
      linear-gradient(90deg, transparent 90%, #2dc48d 90% 91%, transparent 91%) 0 0 / 40px 40px,
      linear-gradient(0deg, transparent 90%, #2dc48d 90% 91%, transparent 91%) 0 0 / 40px 40px;
  }

  &:hover {
    transform: translateY(-6px) scale(1.01);
    box-shadow:
      0 16px 44px rgba(0,0,0,.52),
      0 0 34px rgba(45,196,141,.18),
      inset 0 0 30px rgba(0,0,0,.5),
      inset 0 0 0 1px rgba(133,255,219,.12);
  }

  > * {
    position: relative;
    z-index: 1;
  }

  h3,
  p {
    margin: 0;
  }

  h3 {
    color: #ffffff;
    font-size: 18px;
    letter-spacing: .08em;
    text-transform: uppercase;
  }

  p {
    margin-top: 7px;
    color: #888888;
    font-size: 13px;
    font-weight: 800;
    line-height: 1.5;
  }
`;

const BatteryMetric = styled(BatteryPanel)<{ $accent: string }>`
  min-height: 154px;

  &::after {
    position: absolute;
    right: -36px;
    bottom: -48px;
    width: 126px;
    height: 126px;
    content: "";
    border-radius: 50%;
    background: ${({ $accent }) => $accent};
    opacity: .24;
    filter: blur(28px);
  }

  span,
  strong,
  em {
    display: block;
  }

  span {
    color: #888888;
    font-size: 12px;
    font-weight: 900;
    letter-spacing: .14em;
    text-transform: uppercase;
  }

  strong {
    margin-top: 20px;
    color: transparent;
    background: linear-gradient(180deg, #ffffff 40%, #c8c8c8);
    background-clip: text;
    -webkit-background-clip: text;
    font-size: clamp(34px, 5vw, 58px);
    line-height: .9;
  }

  em {
    margin-top: 12px;
    color: ${({ $accent }) => $accent};
    font-style: normal;
    font-weight: 900;
  }
`;

const BatteryConsoleGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(250px, .72fr) minmax(250px, .72fr);
  gap: 22px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const BatterySegmentChart = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  align-items: end;
  gap: 10px;
  height: 230px;
  margin-top: 22px;
  padding: 18px;
  border-radius: 22px;
  background: rgba(0,0,0,.28);
  box-shadow: inset 0 0 24px rgba(0,0,0,.42);

  span {
    position: relative;
    height: var(--h);
    min-height: 28px;
    overflow: hidden;
    border-radius: 6px;
    background: linear-gradient(180deg, #2dc48d, #1aa27a);
    box-shadow: 0 0 12px rgba(45,196,141,.42);
    animation: batterySegmentPulse 2.2s infinite;
    animation-delay: var(--d);
    transition: transform 220ms cubic-bezier(.175,.885,.32,1.275), box-shadow 220ms ease;
  }

  span::before {
    position: absolute;
    inset: 0 auto 0 -100%;
    width: 100%;
    content: "";
    background: linear-gradient(to right, transparent, rgba(255,255,255,.22), transparent);
    transform: skewX(-15deg);
    animation: batterySegmentFlow 2s infinite;
  }

  span:hover {
    transform: translateY(-8px) scaleY(1.06);
    box-shadow: 0 0 24px rgba(45,196,141,.68);
  }
`;

const BatteryCellGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-top: 10px;
`;

const BatteryCell = styled.div<{ $value: number }>`
  display: grid;
  min-height: 44px;
  place-items: center;
  border-radius: 14px;
  color: ${({ $value }) => ($value > 86 ? "#ffffff" : "#888888")};
  background: ${({ $value }) =>
    $value > 88
      ? "linear-gradient(135deg, #2dc48d, #1aa27a)"
      : $value > 72
        ? "linear-gradient(135deg, rgba(45,196,141,.42), rgba(26,162,122,.26))"
        : "linear-gradient(135deg, rgba(51,51,51,.9), rgba(25,25,25,.95))"};
  box-shadow:
    0 8px 20px rgba(0,0,0,.3),
    inset 0 0 0 1px rgba(255,255,255,.06),
    0 0 14px ${({ $value }) => ($value > 88 ? "rgba(45,196,141,.38)" : "transparent")};
  font-size: 12px;
  font-weight: 900;
  transition: transform 220ms cubic-bezier(.175,.885,.32,1.275), box-shadow 220ms ease;

  &:hover {
    transform: translateY(-5px) scale(1.04);
    box-shadow:
      0 10px 24px rgba(0,0,0,.34),
      0 0 22px rgba(133,255,219,.22);
  }
`;

const BatteryRankList = styled.ol`
  display: grid;
  gap: 8px;
  padding: 0;
  margin: 10px 0 0;
  list-style: none;
`;

const BatteryRankRow = styled.li<{ $accent: string }>`
  display: grid;
  grid-template-columns: 34px 1fr auto;
  gap: 10px;
  align-items: center;
  min-height: 44px;
  padding: 7px 10px;
  border-radius: 14px;
  background: rgba(25,25,25,.82);
  box-shadow:
    inset 0 0 0 1px rgba(255,255,255,.06),
    0 10px 22px rgba(0,0,0,.28);
  transition: transform 220ms cubic-bezier(.175,.885,.32,1.275), box-shadow 220ms ease;

  &:hover {
    transform: translateX(7px) scale(1.01);
    box-shadow:
      inset 0 0 0 1px rgba(133,255,219,.14),
      0 0 24px ${({ $accent }) => `${$accent}55`};
  }

  .rank {
    display: grid;
    width: 34px;
    height: 34px;
    place-items: center;
    border-radius: 14px;
    color: #ffffff;
    background: ${({ $accent }) => `linear-gradient(135deg, ${$accent}, #1aa27a)`};
    box-shadow: 0 0 16px ${({ $accent }) => `${$accent}55`};
    font-weight: 900;
  }

  strong,
  span,
  em {
    display: block;
  }

  span {
    margin-top: 4px;
    color: #888888;
    font-size: 11px;
    font-weight: 800;
  }

  em {
    color: ${({ $accent }) => $accent};
    font-style: normal;
    font-size: 12px;
    font-weight: 900;
  }
`;

const BatteryModal = styled(BatteryPanel)`
  width: min(640px, 100%);
  animation: ${pop} 180ms ease both;
`;

const BatteryKeyframes = styled.div`
  @keyframes batteryLineGlow {
    0%, 100% { opacity: .3; }
    50% { opacity: .8; }
  }

  @keyframes batteryLineScan {
    0%, 50%, 100% { border-color: #85ffdb; opacity: .35; }
    25% { border-color: #2dc48d; opacity: .85; }
    75% { border-color: #1aa27a; opacity: .85; }
  }

  @keyframes batteryCircuitFlash {
    0%, 100% { opacity: .03; }
    50% { opacity: .08; }
    85%, 95% { opacity: .12; }
  }

  @keyframes batteryBoltPulse {
    0%, 100% { opacity: .72; transform: scale(1) rotate(0deg); }
    50% { opacity: 1; transform: scale(1.16) rotate(5deg); }
  }

  @keyframes batterySegmentPulse {
    0%, 100% { opacity: .82; }
    50% { opacity: 1; }
  }

  @keyframes batterySegmentEnergize {
    0%, 100% { opacity: .9; transform: scaleY(1); }
    50% { opacity: 1; transform: scaleY(1.5); box-shadow: 0 0 20px #2dc48d; }
  }

  @keyframes batterySegmentFlow {
    from { left: -100%; }
    to { left: 100%; }
  }

  @keyframes batteryParticle1 {
    0%, 100% { transform: translate(-50%, -50%) rotate(0deg) translateX(0); opacity: 0; }
    10%, 90% { opacity: 1; }
    50% { transform: translate(-50%, -50%) rotate(180deg) translateX(100px); }
  }

  @keyframes batteryParticle2 {
    0%, 100% { transform: translate(-50%, -50%) rotate(90deg) translateX(0); opacity: 0; }
    20%, 80% { opacity: 1; }
    60% { transform: translate(-50%, -50%) rotate(270deg) translateX(80px); }
  }

  @keyframes batteryDotPulse {
    0%, 100% { opacity: .3; box-shadow: 0 0 5px rgba(45,196,141,.6); }
    50% { opacity: .8; box-shadow: 0 0 8px rgba(45,196,141,.6); }
  }

  @keyframes batteryDotGlow {
    0%, 100% { opacity: .5; transform: scale(1); box-shadow: 0 0 5px rgba(45,196,141,.6); }
    50% { opacity: 1; transform: scale(1.3); box-shadow: 0 0 20px rgba(45,196,141,.7); }
  }

  @keyframes batteryFloat {
    0%, 100% { transform: perspective(1000px) rotateX(5deg) translateY(0); }
    50% { transform: perspective(1000px) rotateX(5deg) translateY(-10px); }
  }

  @keyframes batteryTextPop {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
`;

const DepthFrame = styled.div`
  display: grid;
  gap: 24px;
  width: 100%;
  max-width: none;
  margin: 0;
  color: #f5f5f5;
`;

const DepthHero = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: minmax(380px, .86fr) minmax(0, 1.14fr);
  gap: clamp(22px, 4vw, 54px);
  align-items: center;
  min-height: 610px;
  overflow: hidden;
  border-radius: 34px;
  padding: clamp(28px, 5vw, 62px);
  background:
    radial-gradient(circle at 24% 46%, rgba(62,234,142,.18), transparent 0 28%),
    radial-gradient(circle at 82% 18%, rgba(255,255,255,.1), transparent 0 26%),
    linear-gradient(135deg, rgba(33,33,33,.92), rgba(15,15,15,.96)),
    #0b0b0b;
  box-shadow:
    0 24px 70px rgba(0,0,0,.54),
    inset 0 0 0 1px rgba(255,255,255,.08),
    inset 0 -60px 110px rgba(0,0,0,.44);

  &::before {
    position: absolute;
    inset: -1px;
    content: "";
    opacity: .18;
    background:
      linear-gradient(90deg, transparent 95%, rgba(255,255,255,.2) 95% 96%, transparent 96%) 0 0 / 44px 44px,
      linear-gradient(0deg, transparent 95%, rgba(62,234,142,.28) 95% 96%, transparent 96%) 0 0 / 44px 44px;
    mask-image: radial-gradient(circle at 35% 45%, #000, transparent 72%);
  }

  @media (max-width: 1120px) {
    grid-template-columns: 1fr;
  }
`;

const DepthStage = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  min-height: 420px;
  place-items: center;
  border-radius: 32px;
  background:
    radial-gradient(circle at 50% 50%, rgba(62,234,142,.11), transparent 0 42%),
    linear-gradient(180deg, rgba(255,255,255,.035), rgba(255,255,255,.015));
  box-shadow:
    inset 0 0 0 1px rgba(255,255,255,.06),
    inset 0 -24px 60px rgba(0,0,0,.34);
  perspective: 3000px;
`;

const DepthBatteryCard = styled.div`
  --depth-accent: #3eea8e;
  --depth-muted: #888888;

  .parent {
    position: relative;
    width: 240px;
    height: 240px;
    perspective: 3000px;
    transform: scale(1.16);
  }

  .a {
    position: absolute;
    z-index: 4;
    width: 100px;
    height: 100px;
    transform: translateZ(600px);
  }

  .tl { top: -30px; left: -30px; }
  .t { top: -30px; left: 70px; }
  .tr { top: -30px; left: 170px; }
  .l { top: 70px; left: -30px; }
  .c { top: 70px; left: 70px; }
  .r { top: 70px; left: 170px; }
  .bl { top: 170px; left: -30px; }
  .b { top: 170px; left: 70px; }
  .br { top: 170px; left: 170px; }

  .card {
    position: relative;
    width: 240px;
    height: 240px;
    transform-style: preserve-3d;
    transition: transform .7s cubic-bezier(.22,1,.36,1), filter .7s ease;
  }

  .card:hover {
    transform: rotateX(5deg) rotateY(10deg);
    filter: drop-shadow(0 24px 28px rgba(0,0,0,.42));
  }

  .tl:hover ~ .card { transform: rotateX(-20deg) rotateY(20deg); }
  .t:hover ~ .card { transform: rotateX(-20deg); }
  .tr:hover ~ .card { transform: rotateX(-20deg) rotateY(-20deg); }
  .l:hover ~ .card { transform: rotateY(20deg); }
  .r:hover ~ .card { transform: rotateY(-20deg); }
  .bl:hover ~ .card { transform: rotateX(20deg) rotateY(20deg); }
  .b:hover ~ .card { transform: rotateX(20deg); }
  .br:hover ~ .card { transform: rotateX(20deg) rotateY(-20deg); }

  .a:hover ~ .card .outer .patt,
  .card:hover .outer .patt {
    stroke-dasharray: 0 90 280 999;
    stroke-dashoffset: 10;
  }

  .a:hover ~ .card .bar.bak,
  .card:hover .bar.bak {
    opacity: .78;
  }

  .outer {
    position: absolute;
    top: calc(50% - 150px);
    left: calc(50% - 150px);
    overflow: visible;
    transform: scale(1.0535) translateZ(calc(-55px + 5px * var(--z, 0)));
    transform-origin: 170px;
    pointer-events: none;
  }

  .outer.bb {
    transform: scale(1.0535) translateZ(-55px);
  }

  .outer path {
    fill: none;
    stroke: #fff;
    stroke-width: 6;
    stroke-linecap: round;
    stroke-dasharray: 0 0 280 999;
    transition: stroke-dasharray 1s cubic-bezier(.22,1,.36,1), stroke-dashoffset 1s cubic-bezier(.22,1,.36,1), opacity 260ms ease;
  }

  .outer .blur {
    filter: blur(8px);
    opacity: .42;
  }

  .outer .bak {
    stroke: rgba(255,255,255,.04);
    stroke-dasharray: 0 0 360 0;
  }

  .outer .bak20 {
    stroke: rgba(255,255,255,.06);
    stroke-dasharray: 20 50;
    animation: depthStronk 40s linear infinite;
  }

  .outer .patt {
    stroke: #ffffff;
  }

  .inner {
    position: absolute;
    inset: 1px;
    overflow: hidden;
    border-radius: 29px;
    background: #212121;
    transform-style: preserve-3d;
    perspective: 100px;
    box-shadow:
      inset 0 0 0 1px rgba(255,255,255,.08),
      inset 0 -30px 70px rgba(0,0,0,.4);
  }

  .inner-bg {
    position: absolute;
    inset: -1000%;
    opacity: .3;
    filter: blur(40px);
    transform: translateZ(-10px);
    background: conic-gradient(from 45deg, #fff 5%, #fff0 10% 40%, #fff 45% 55%, #fff0 60% 90%, #fff 95%);
    animation: depthSpeen 24s cubic-bezier(.36,.2,.64,.8) infinite;
  }

  .inner-border {
    position: absolute;
    inset: 0;
    border: double 2px transparent;
    background-image: linear-gradient(-45deg, rgba(34,34,34,.06), rgba(255,255,255,.14), rgba(51,51,51,.06));
    background-origin: border-box;
    clip-path: path("M30 0H210A30 30 0 01240 30V210A30 30 0 01210 240H30A30 30 0 010 210V30A30 30 0 0130 0V2A28 28 0 002 30V210A28 28 0 0030 238H210A28 28 0 00238 210V30A28 28 0 00210 2H30");
    pointer-events: none;
    transform: translateZ(calc(var(--z, 0) * 1px));
  }

  .percent {
    position: absolute;
    top: 24px;
    left: 34px;
    color: #cccccc;
    cursor: default;
    font-size: 42px;
    font-weight: 900;
    pointer-events: none;
    transform: translate3d(0, 0, calc(40px + var(--z, 0) * 1.5px));
    transition: transform .4s cubic-bezier(.22,1,.36,1), text-shadow .24s ease;
  }

  .percent.top {
    color: transparent;
    pointer-events: auto;
  }

  .percent.bak {
    color: #ffffff;
    opacity: .78;
    filter: blur(8px);
    transform: translate3d(0, 0, 1px);
  }

  .percent.top:hover ~ .percent {
    text-shadow: 0 0 6px rgba(255,255,255,.24);
    transform: translate3d(0, 0, calc(60px + var(--z, 0) * 1.5px));
  }

  .txt {
    position: absolute;
    display: flex;
    gap: 5px;
    align-items: center;
    color: var(--depth-muted);
    fill: var(--depth-muted);
    cursor: default;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 14px;
    font-weight: 650;
    transform: translate3d(0, 0, 20px);
    transition: transform .4s cubic-bezier(.22,1,.36,1), color .2s ease, fill .2s ease;
  }

  .txt:hover {
    color: #aaaaaa;
    fill: #aaaaaa;
    transform: translate3d(0, 0, 40px);
  }

  .txt svg {
    width: 18px;
    height: 18px;
    transition: transform .5s ease, stroke-dashoffset .5s ease, opacity .2s ease;
  }

  .charging {
    top: 104px;
    left: 28px;
  }

  .charging svg {
    fill: none;
    stroke: #00ff88;
    stroke-width: 1.5px;
    stroke-dasharray: 10 10;
    stroke-dashoffset: 10;
  }

  .charging:hover svg {
    stroke-dashoffset: 0;
  }

  .health {
    top: 140px;
    left: 28px;
  }

  .health svg .fd {
    opacity: 0;
    transition: opacity .4s ease;
  }

  .health:hover svg .fd {
    opacity: 1;
  }

  .cycles {
    top: 164px;
    left: 28px;
  }

  .cycles:hover svg {
    fill: #55dd99;
    transform: rotate(180deg);
  }

  .bar-hb {
    position: absolute;
    top: 205px;
    left: 25px;
    width: 190px;
    height: 14px;
    transform: translate3d(0, 0, 10px);
  }

  .bar-hb:hover ~ .bar:not(.bak) {
    transform: translate3d(0, 0, calc(30px + var(--z, 0) * 2px));
  }

  .bar-hb:hover ~ .bar:not(.bak) .bar-slider {
    background-color: rgba(62,234,142,.42);
  }

  .bar {
    position: absolute;
    top: 210px;
    left: 30px;
    width: 180px;
    height: 4px;
    overflow: hidden;
    border-radius: 2px;
    background: linear-gradient(90deg, transparent 128px, rgba(255,255,255,.04) 0);
    clip-path: path("M2 0a1 1 0 000 4h22a1 1 0 000-4Zm30 0a1 1 0 000 4h22a1 1 0 000-4Zm30 0a1 1 0 000 4h22a1 1 0 000-4Zm30 0a1 1 0 000 4h22a1 1 0 000-4Zm30 0a1 1 0 000 4h22a1 1 0 000-4Zm30 0a1 1 0 000 4h22a1 1 0 000-4Z");
    pointer-events: none;
    transform: translate3d(0, 0, calc(10px + var(--z, 0) * 1.5px));
    transition: transform .4s cubic-bezier(.22,1,.36,1), opacity .3s ease;
  }

  .bar-slider {
    width: 128px;
    height: 4px;
    border-radius: inherit;
    background:
      linear-gradient(90deg, rgba(62,234,142,0), rgba(62,234,142,.44), rgba(62,234,142,0)),
      linear-gradient(90deg, rgba(62,234,142,0), rgba(62,234,142,.6), rgba(62,234,142,0));
    background-size: 200%;
    animation: depthBg 4s linear infinite;
    transition: background-color .3s ease;
  }

  .bar.bak {
    opacity: .12;
    filter: blur(6px);
    clip-path: none;
    transform: translate3d(0, 0, 1px);
  }

  .bar.bak .bar-slider {
    width: 124px;
    background: #3eea8e;
  }

  @keyframes depthStronk {
    from { stroke-dashoffset: 360; }
  }

  @keyframes depthSpeen {
    50% { transform: translateZ(-10px) rotate(180deg); }
    to { transform: translateZ(-10px) rotate(360deg); }
  }

  @keyframes depthBg {
    from { background-position: 200%, 0%; }
  }
`;

const DepthHeroCopy = styled.div`
  position: relative;
  z-index: 1;

  > span {
    color: #3eea8e;
    font-size: 12px;
    font-weight: 900;
    letter-spacing: .16em;
    text-transform: uppercase;
  }

  h1 {
    max-width: 720px;
    margin: 14px 0 0;
    color: #f5f5f5;
    font-size: clamp(48px, 7vw, 96px);
    line-height: .86;
    letter-spacing: 0;
  }

  p {
    max-width: 660px;
    margin: 22px 0 0;
    color: rgba(245,245,245,.56);
    font-size: 15px;
    font-weight: 780;
    line-height: 1.7;
  }
`;

const DepthButton = styled.button`
  position: relative;
  display: inline-flex;
  min-height: 50px;
  align-items: center;
  justify-content: center;
  gap: 9px;
  overflow: hidden;
  padding: 0 18px;
  border-radius: 18px;
  color: #f5f5f5;
  background: #212121;
  box-shadow:
    0 14px 28px rgba(0,0,0,.34),
    inset 0 0 0 1px rgba(255,255,255,.1),
    inset 0 -18px 24px rgba(0,0,0,.34);
  cursor: pointer;
  font-weight: 900;
  transition: transform 220ms cubic-bezier(.22,1,.36,1), box-shadow 220ms ease;

  &::after {
    position: absolute;
    inset: 0 auto 0 -42%;
    width: 38%;
    content: "";
    opacity: .5;
    background: linear-gradient(90deg, transparent, rgba(62,234,142,.44), transparent);
    transform: skewX(-18deg);
    transition: transform 380ms cubic-bezier(.22,1,.36,1), opacity 180ms ease;
  }

  &:hover {
    transform: translateY(-3px) scale(1.03);
    box-shadow:
      0 18px 34px rgba(0,0,0,.42),
      0 0 26px rgba(62,234,142,.2),
      inset 0 0 0 1px rgba(62,234,142,.22);
  }

  &:hover::after {
    opacity: 1;
    transform: translateX(380%) skewX(-18deg);
  }
`;

const DepthConsole = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(320px, .92fr);
  gap: 22px;
  align-items: start;

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
`;

const DepthPanel = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 28px;
  padding: 22px;
  background:
    radial-gradient(circle at 90% 12%, rgba(255,255,255,.08), transparent 0 24%),
    linear-gradient(135deg, rgba(33,33,33,.94), rgba(15,15,15,.96));
  box-shadow:
    0 18px 42px rgba(0,0,0,.42),
    inset 0 0 0 1px rgba(255,255,255,.07),
    inset 0 -26px 60px rgba(0,0,0,.36);
  transition: transform 240ms cubic-bezier(.22,1,.36,1), box-shadow 220ms ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow:
      0 22px 50px rgba(0,0,0,.48),
      0 0 26px rgba(62,234,142,.12),
      inset 0 0 0 1px rgba(62,234,142,.14);
  }

  h3,
  p {
    margin: 0;
  }

  h3 {
    color: #f5f5f5;
    font-size: 18px;
    letter-spacing: .08em;
    text-transform: uppercase;
  }

  p {
    margin-top: 8px;
    color: rgba(245,245,245,.5);
    font-size: 13px;
    font-weight: 780;
    line-height: 1.5;
  }
`;

const DepthLayerChart = styled.div`
  display: grid;
  gap: 14px;
  margin-top: 24px;
`;

const DepthLayerRow = styled.div<{ $value: number }>`
  position: relative;
  display: grid;
  grid-template-columns: 82px 1fr 54px;
  gap: 12px;
  align-items: center;
  color: rgba(245,245,245,.72);
  font-size: 12px;
  font-weight: 900;

  .track {
    position: relative;
    height: 16px;
    overflow: hidden;
    border-radius: 999px;
    background: rgba(255,255,255,.04);
    box-shadow: inset 0 0 0 1px rgba(255,255,255,.06);
  }

  .track::before {
    position: absolute;
    inset: 3px auto 3px 3px;
    width: ${({ $value }) => `${$value}%`};
    content: "";
    border-radius: inherit;
    background:
      linear-gradient(90deg, rgba(62,234,142,0), rgba(62,234,142,.76), rgba(255,255,255,.55)),
      #3eea8e;
    box-shadow: 0 0 18px rgba(62,234,142,.38);
  }
`;

const DepthMetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(96px, 1fr));
  gap: 12px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const DepthMetric = styled(DepthPanel)`
  min-height: 130px;

  span,
  strong,
  em {
    display: block;
  }

  span {
    color: rgba(245,245,245,.5);
    font-size: 12px;
    font-weight: 900;
    letter-spacing: .14em;
    text-transform: uppercase;
  }

  strong {
    margin-top: 18px;
    color: #f5f5f5;
    font-size: clamp(34px, 5vw, 56px);
    line-height: .92;
  }

  em {
    margin-top: 10px;
    color: #3eea8e;
    font-style: normal;
    font-weight: 900;
  }
`;

const DepthList = styled.ol`
  display: grid;
  gap: 13px;
  padding: 0;
  margin: 22px 0 0;
  list-style: none;
`;

const DepthListRow = styled.li<{ $accent: string }>`
  display: grid;
  grid-template-columns: 44px 1fr auto;
  gap: 13px;
  align-items: center;
  padding: 13px;
  border-radius: 20px;
  background: rgba(255,255,255,.035);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.06);
  transition: transform 220ms cubic-bezier(.22,1,.36,1), box-shadow 220ms ease;

  &:hover {
    transform: translateX(7px) translateZ(0);
    box-shadow:
      inset 0 0 0 1px ${({ $accent }) => `${$accent}55`},
      0 0 24px ${({ $accent }) => `${$accent}22`};
  }

  .rank {
    display: grid;
    width: 44px;
    height: 44px;
    place-items: center;
    border-radius: 16px;
    color: #080908;
    background: ${({ $accent }) => $accent};
    box-shadow: 0 0 16px ${({ $accent }) => `${$accent}55`};
    font-weight: 900;
  }

  strong,
  span,
  em {
    display: block;
  }

  strong {
    color: #f5f5f5;
  }

  span {
    margin-top: 4px;
    color: rgba(245,245,245,.45);
    font-size: 12px;
    font-weight: 780;
  }

  em {
    color: ${({ $accent }) => $accent};
    font-style: normal;
    font-weight: 900;
  }
`;

const DepthModal = styled(DepthPanel)`
  width: min(720px, 100%);
  animation: ${pop} 180ms ease both;
`;

const VoidFrame = styled.div`
  display: grid;
  gap: 24px;
  width: 100%;
  max-width: none;
  margin: 0;
  color: #ffffff;
`;

const VoidHero = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: minmax(360px, .82fr) minmax(0, 1.18fr);
  gap: clamp(24px, 5vw, 58px);
  align-items: center;
  min-height: 660px;
  overflow: hidden;
  border-radius: 34px;
  padding: clamp(26px, 5vw, 60px);
  background:
    radial-gradient(circle at 24% 48%, rgba(0,242,255,.16), transparent 0 32%),
    radial-gradient(circle at 78% 20%, rgba(157,0,255,.16), transparent 0 26%),
    linear-gradient(135deg, rgba(10,12,18,.92), rgba(1,1,3,.98)),
    #010103;
  box-shadow:
    0 28px 78px rgba(0,0,0,.58),
    inset 0 0 0 1px rgba(255,255,255,.08),
    inset 0 -70px 130px rgba(0,0,0,.5);

  &::before {
    position: absolute;
    inset: -1px;
    content: "";
    opacity: .16;
    background:
      linear-gradient(90deg, transparent 94%, rgba(0,242,255,.3) 94% 95%, transparent 95%) 0 0 / 42px 42px,
      linear-gradient(0deg, transparent 94%, rgba(255,255,255,.18) 94% 95%, transparent 95%) 0 0 / 42px 42px;
    mask-image: radial-gradient(circle at 36% 50%, #000, transparent 72%);
  }

  @media (max-width: 1120px) {
    grid-template-columns: 1fr;
  }
`;

const VoidStage = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  min-height: 560px;
  place-items: center;
  overflow: hidden;
  border-radius: 32px;
  background:
    radial-gradient(circle at 50% 50%, rgba(0,242,255,.1), transparent 0 42%),
    linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.015));
  box-shadow:
    inset 0 0 0 1px rgba(255,255,255,.06),
    inset 0 -36px 78px rgba(0,0,0,.42);
  perspective: 2500px;
`;

const VoidCardWrap = styled.div`
  --bg-void: #05070a;
  --theme: #00f2ff;
  --rx: 0deg;
  --ry: 0deg;
  --tx: 0px;
  --ty: 0px;
  --glide: 0px;
  --op: .1;
  --z-pull: 0px;

  .anchor {
    position: relative;
    width: 320px;
    height: 480px;
    perspective: 2500px;
  }

  .sensors {
    position: absolute;
    inset: -80px;
    z-index: 100;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }

  .anchor:has(.s1:hover) { --rx: 12deg; --ry: -12deg; --tx: 10px; --ty: 10px; --glide: -30px; --theme: #00f2ff; --op: .6; --z-pull: 40px; }
  .anchor:has(.s2:hover) { --rx: 12deg; --ry: 0deg; --tx: 0px; --ty: 10px; --glide: -40px; --theme: #00ffaa; --op: .4; --z-pull: 20px; }
  .anchor:has(.s3:hover) { --rx: 12deg; --ry: 12deg; --tx: -10px; --ty: 10px; --glide: -30px; --theme: #ff00ea; --op: .6; --z-pull: 40px; }
  .anchor:has(.s4:hover) { --rx: 0deg; --ry: -12deg; --tx: 15px; --ty: 0px; --glide: 0px; --theme: #9d00ff; --op: .5; --z-pull: 50px; }
  .anchor:has(.s5:hover) { --rx: 0deg; --ry: 0deg; --tx: 0px; --ty: 0px; --glide: 0px; --theme: #ffffff; --op: .1; --z-pull: 0px; }
  .anchor:has(.s6:hover) { --rx: 0deg; --ry: 12deg; --tx: -15px; --ty: 0px; --glide: 0px; --theme: #ff4500; --op: .5; --z-pull: 50px; }
  .anchor:has(.s7:hover) { --rx: -12deg; --ry: -12deg; --tx: 10px; --ty: -10px; --glide: 30px; --theme: #00ff00; --op: .6; --z-pull: 40px; }
  .anchor:has(.s8:hover) { --rx: -12deg; --ry: 0deg; --tx: 0px; --ty: -10px; --glide: 40px; --theme: #ffff00; --op: .4; --z-pull: 20px; }
  .anchor:has(.s9:hover) { --rx: -12deg; --ry: 12deg; --tx: -10px; --ty: -10px; --glide: 30px; --theme: #ff0055; --op: .6; --z-pull: 40px; }

  .assembly {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    transform: rotateX(var(--rx)) rotateY(var(--ry)) translate(var(--tx), var(--ty));
    transform-style: preserve-3d;
    transition: transform .8s cubic-bezier(.15,.85,.35,1);
  }

  .aura {
    position: absolute;
    inset: -50%;
    z-index: -1;
    opacity: var(--op);
    background: radial-gradient(circle at center, var(--theme) 0%, transparent 70%);
    filter: blur(150px);
    pointer-events: none;
    transition: background .5s ease, opacity .3s ease;
  }

  .monolith {
    position: absolute;
    z-index: 5;
    display: flex;
    width: 160px;
    height: 440px;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,.1);
    background: var(--bg-void);
    box-shadow: 0 40px 100px rgba(0,0,0,.8);
    transform: translateZ(10px);
  }

  .monolith::before {
    position: absolute;
    inset: 0;
    content: "";
    opacity: .2;
    border: 1px solid transparent;
    background: linear-gradient(to bottom, var(--theme), transparent, var(--theme)) border-box;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    transition: background .4s ease;
  }

  .monolith::after {
    position: absolute;
    inset: auto 0 0;
    height: 100%;
    content: "";
    background: linear-gradient(to bottom, transparent 60%, rgba(0,0,0,.8));
    pointer-events: none;
  }

  .band {
    position: absolute;
    z-index: 10;
    width: 320px;
    border: 1px solid rgba(255,255,255,.15);
    padding: 20px;
    background: rgba(10,12,18,.9);
    box-shadow: 0 10px 40px rgba(0,0,0,.6);
    backdrop-filter: blur(15px);
    transition: transform .8s cubic-bezier(.15,.85,.35,1), border-color .4s ease, box-shadow .4s ease;
  }

  .anchor:hover .band {
    border-color: color-mix(in srgb, var(--theme) 56%, white 10%);
    box-shadow: 0 18px 50px rgba(0,0,0,.68), 0 0 26px color-mix(in srgb, var(--theme) 28%, transparent);
  }

  .band-top {
    top: 40px;
    height: 110px;
    clip-path: polygon(0 0, 100% 0, 100% 85%, 90% 100%, 0 100%);
    transform: translateZ(calc(var(--z-pull) + 40px)) translateY(var(--glide));
  }

  .band-bot {
    bottom: 40px;
    display: flex;
    height: 200px;
    flex-direction: column;
    clip-path: polygon(0 0, 90% 0, 100% 15%, 100% 100%, 0 100%);
    transform: translateZ(calc(var(--z-pull) + 40px)) translateY(var(--glide));
  }

  .aperture {
    position: relative;
    z-index: 2;
    display: flex;
    width: 100px;
    height: 100px;
    align-items: center;
    justify-content: center;
    margin-top: 170px;
    border: 1px solid rgba(255,255,255,.1);
    background: #080a12;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  }

  .core-light {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: var(--theme);
    box-shadow: 0 0 30px var(--theme), 0 0 60px var(--theme);
    filter: blur(15px);
    animation: voidCorePulse 3s ease-in-out infinite alternate;
    transition: background .4s ease, box-shadow .4s ease;
  }

  .label {
    margin-bottom: 4px;
    color: var(--theme);
    font-size: .55rem;
    font-weight: 900;
    letter-spacing: 3px;
    text-transform: uppercase;
    transition: color .4s ease;
  }

  .title {
    margin: 0;
    color: #fff;
    background: linear-gradient(to right, #fff, var(--theme));
    background-clip: text;
    -webkit-background-clip: text;
    font-size: 1.6rem;
    font-weight: 900;
    line-height: 1;
    text-transform: uppercase;
    -webkit-text-fill-color: transparent;
  }

  .desc {
    margin-top: 12px;
    color: #cbd5e1;
    font-size: .8rem;
    line-height: 1.5;
  }

  .desc p {
    margin: 0;
  }

  .hl {
    border-bottom: 2px solid var(--theme);
    color: #fff;
    font-weight: 900;
    transition: border-color .4s ease;
  }

  .actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: auto;
  }

  .btn {
    padding: 12px;
    border: 1px solid var(--theme);
    color: var(--theme);
    background: #000;
    clip-path: polygon(0 0, 100% 0, 100% 75%, 80% 100%, 0 100%);
    cursor: pointer;
    font-size: .7rem;
    font-weight: 900;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform .2s ease, background-color .2s ease, color .2s ease, box-shadow .2s ease;
  }

  .btn:hover {
    color: #000;
    background: var(--theme);
    box-shadow: 0 0 25px var(--theme);
    transform: translateY(-2px);
  }

  .status-hud {
    position: absolute;
    bottom: 0;
    z-index: 10;
    display: flex;
    width: 100%;
    height: 50px;
    align-items: center;
    justify-content: space-around;
    border-top: 1px solid rgba(255,255,255,.1);
    background: rgba(0,0,0,.5);
  }

  .hud-cell {
    text-align: center;
  }

  .hud-v,
  .hud-l {
    display: block;
  }

  .hud-v {
    color: #fff;
    font-size: 1rem;
    font-weight: 900;
    line-height: 1;
  }

  .hud-l {
    color: #64748b;
    font-size: .5rem;
    font-weight: 900;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .glare {
    position: absolute;
    inset: 0;
    z-index: 50;
    background: radial-gradient(circle at 50% 0%, rgba(255,255,255,.1) 0%, transparent 70%);
    pointer-events: none;
  }

  .rarity-tag {
    position: absolute;
    top: 15px;
    right: 15px;
    padding: 2px 8px;
    color: #000;
    background: var(--theme);
    font-size: .5rem;
    font-weight: 900;
    transform: skewX(-20deg);
    transition: background-color .4s ease;
  }

  @keyframes voidCorePulse {
    from {
      opacity: .3;
      transform: scale(.7);
    }
    to {
      opacity: 1;
      transform: scale(1.4);
    }
  }
`;

const VoidHeroCopy = styled.div`
  position: relative;
  z-index: 1;

  > span {
    color: #00f2ff;
    font-size: 12px;
    font-weight: 900;
    letter-spacing: .18em;
    text-transform: uppercase;
  }

  h1 {
    max-width: 720px;
    margin: 14px 0 0;
    color: #ffffff;
    font-size: clamp(48px, 7vw, 98px);
    line-height: .84;
    letter-spacing: 0;
  }

  p {
    max-width: 660px;
    margin: 22px 0 0;
    color: rgba(203,213,225,.68);
    font-size: 15px;
    font-weight: 780;
    line-height: 1.7;
  }
`;

const VoidActionButton = styled.button`
  display: inline-flex;
  min-height: 50px;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 0 18px;
  border: 1px solid #00f2ff;
  color: #00f2ff;
  background: #000;
  clip-path: polygon(0 0, 100% 0, 100% 76%, 82% 100%, 0 100%);
  cursor: pointer;
  font-weight: 900;
  letter-spacing: .02em;
  transition: transform 200ms ease, background-color 200ms ease, color 200ms ease, box-shadow 200ms ease;

  &:hover {
    color: #000;
    background: #00f2ff;
    box-shadow: 0 0 28px rgba(0,242,255,.55);
    transform: translateY(-3px);
  }
`;

const VoidPanel = styled.div`
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 6px;
  padding: 22px;
  background: rgba(10,12,18,.88);
  box-shadow: 0 14px 42px rgba(0,0,0,.44), inset 0 0 0 1px rgba(255,255,255,.04);
  backdrop-filter: blur(14px);
  transition: transform 220ms cubic-bezier(.22,1,.36,1), border-color 220ms ease, box-shadow 220ms ease;

  &::before {
    position: absolute;
    inset: 0;
    content: "";
    opacity: .18;
    background: radial-gradient(circle at 50% 0%, rgba(255,255,255,.18), transparent 0 68%);
    pointer-events: none;
  }

  &:hover {
    border-color: rgba(0,242,255,.34);
    box-shadow: 0 18px 48px rgba(0,0,0,.5), 0 0 26px rgba(0,242,255,.12);
    transform: translateY(-5px);
  }

  > * {
    position: relative;
    z-index: 1;
  }

  h3,
  p {
    margin: 0;
  }

  h3 {
    color: #ffffff;
    font-size: 18px;
    letter-spacing: .1em;
    text-transform: uppercase;
  }

  p {
    margin-top: 8px;
    color: rgba(203,213,225,.58);
    font-size: 13px;
    font-weight: 760;
    line-height: 1.5;
  }
`;

const VoidAbilityPanel = styled(VoidPanel)`
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
`;

const VoidRankingPanel = styled(VoidPanel)`
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
`;

const VoidMetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const VoidMetric = styled(VoidPanel)<{ $accent: string }>`
  min-height: 150px;
  clip-path: polygon(0 0, 100% 0, 100% 86%, 90% 100%, 0 100%);

  span,
  strong,
  em {
    display: block;
  }

  span {
    color: ${({ $accent }) => $accent};
    font-size: 12px;
    font-weight: 900;
    letter-spacing: .14em;
    text-transform: uppercase;
  }

  strong {
    margin-top: 18px;
    color: #ffffff;
    font-size: clamp(34px, 5vw, 58px);
    line-height: .9;
  }

  em {
    margin-top: 10px;
    color: rgba(203,213,225,.62);
    font-style: normal;
    font-weight: 900;
  }
`;

const VoidConsole = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(340px, .95fr);
  gap: 22px;
  align-items: start;

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
`;

const VoidAbilityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(128px, 1fr);
  gap: 12px;
  margin-top: 22px;
  min-height: 0;

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;

const VoidAbility = styled.div<{ $accent: string }>`
  min-height: 0;
  padding: 14px;
  border: 1px solid ${({ $accent }) => `${$accent}55`};
  background: rgba(0,0,0,.36);
  clip-path: polygon(0 0, 100% 0, 100% 78%, 88% 100%, 0 100%);
  transition: transform 200ms ease, box-shadow 200ms ease, background-color 200ms ease;

  &:hover {
    background: ${({ $accent }) => `${$accent}18`};
    box-shadow: 0 0 22px ${({ $accent }) => `${$accent}33`};
    transform: translateY(-4px);
  }

  strong,
  span {
    display: block;
  }

  strong {
    color: ${({ $accent }) => $accent};
    font-size: 13px;
    letter-spacing: .08em;
    text-transform: uppercase;
  }

  span {
    margin-top: 10px;
    color: rgba(203,213,225,.7);
    font-size: 12px;
    font-weight: 760;
    line-height: 1.45;
  }
`;

const VoidList = styled.ol`
  display: grid;
  align-content: stretch;
  gap: 13px;
  padding: 0;
  margin: 22px 0 0;
  list-style: none;
`;

const VoidListRow = styled.li<{ $accent: string }>`
  display: grid;
  grid-template-columns: 46px 1fr auto;
  gap: 13px;
  align-items: center;
  padding: 13px;
  border: 1px solid rgba(255,255,255,.08);
  background: rgba(0,0,0,.32);
  clip-path: polygon(0 0, 100% 0, 100% 78%, 92% 100%, 0 100%);
  transition: transform 220ms cubic-bezier(.22,1,.36,1), border-color 220ms ease, box-shadow 220ms ease;

  &:hover {
    border-color: ${({ $accent }) => `${$accent}66`};
    box-shadow: 0 0 22px ${({ $accent }) => `${$accent}22`};
    transform: translateX(7px);
  }

  .rank {
    display: grid;
    width: 46px;
    height: 46px;
    place-items: center;
    color: #000;
    background: ${({ $accent }) => $accent};
    clip-path: polygon(0 0, 100% 0, 100% 72%, 78% 100%, 0 100%);
    font-weight: 900;
  }

  strong,
  span,
  em {
    display: block;
  }

  strong {
    color: #ffffff;
  }

  span {
    margin-top: 4px;
    color: rgba(203,213,225,.52);
    font-size: 12px;
    font-weight: 760;
  }

  em {
    color: ${({ $accent }) => $accent};
    font-style: normal;
    font-weight: 900;
  }
`;

const VoidModal = styled(VoidPanel)`
  width: min(760px, 100%);
  animation: ${pop} 180ms ease both;
`;

const DivineFrame = styled.div`
  display: grid;
  gap: 24px;
  width: 100%;
  max-width: none;
  margin: 0;
  color: #fff6dd;
`;

const DivineHero = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: minmax(390px, .84fr) minmax(0, 1.16fr);
  gap: clamp(24px, 5vw, 58px);
  align-items: center;
  min-height: 690px;
  overflow: hidden;
  border-radius: 34px;
  padding: clamp(24px, 5vw, 58px);
  background:
    radial-gradient(circle at 24% 44%, rgba(255,215,0,.16), transparent 0 31%),
    radial-gradient(circle at 84% 18%, rgba(255,94,0,.16), transparent 0 26%),
    linear-gradient(135deg, rgba(21,27,45,.92), rgba(8,7,29,.98)),
    #08071d;
  box-shadow:
    0 28px 78px rgba(0,0,0,.58),
    inset 0 0 0 1px rgba(255,237,138,.12),
    inset 0 -78px 130px rgba(124,32,57,.22);

  &::before {
    position: absolute;
    inset: 0;
    content: "";
    opacity: .16;
    background:
      repeating-linear-gradient(90deg, #151b2d, #08071d 3px, #151b2d 6px),
      radial-gradient(circle at 20% 20%, #ffd700 1px, transparent 4px);
    mix-blend-mode: color-dodge;
  }

  @media (max-width: 1120px) {
    grid-template-columns: 1fr;
  }
`;

const DivineStage = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  min-height: 590px;
  place-items: center;
  overflow: hidden;
  border-radius: 32px;
  background:
    radial-gradient(circle at 50% 50%, rgba(255,215,0,.1), transparent 0 44%),
    linear-gradient(180deg, rgba(255,237,138,.045), rgba(124,32,57,.05));
  box-shadow:
    inset 0 0 0 1px rgba(255,237,138,.08),
    inset 0 -40px 80px rgba(0,0,0,.42);
  perspective: 1200px;
`;

const DivineCardWrap = styled.div`
  .scene {
    display: grid;
    min-height: 100px;
    place-items: center;
    perspective: 1000px;
    transform: scale(.82);
  }

  .card {
    position: relative;
    isolation: isolate;
    width: 400px;
    padding: 30px;
    border-radius: 26px;
    background:
      linear-gradient(135deg, transparent 1px, rgba(244,11,11,.149) 100px, transparent 505px),
      repeating-linear-gradient(90deg, #151b2d, #08071d 3px, #151b2d 6px);
    box-shadow:
      inset 0 0 0 10px #11142b,
      inset 0 0 0 13px #ffed8a,
      inset 0 0 0 16px #ae8e00,
      inset 0 0 13px 18px rgba(255,217,0,.54);
    mask: linear-gradient(#000 0 0);
    transform-style: preserve-3d;
    animation: divineIdle 7s ease-in-out infinite;
    transition: transform .2s ease, scale .2s ease;
  }

  .card:hover {
    scale: 1.08;
  }

  .lava-trim {
    position: absolute;
    inset: -4px;
    z-index: -1;
    border-radius: 10%;
    padding: 5px;
    background: conic-gradient(from 0deg, transparent 0deg, #ffae00 40deg, #ff5e00 90deg, transparent 140deg, #ffd700 200deg, transparent 360deg);
    filter: blur(2rem) brightness(1);
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    mask-composite: exclude;
    pointer-events: none;
    transform: rotate(-18deg);
    animation: divineLavaSpin 7.8s ease infinite;
    animation-delay: .2s;
  }

  .particles-outside,
  .footnote-bg {
    pointer-events: none;
  }

  .particles-outside {
    position: absolute;
    inset: -160px;
    z-index: -2;
    background:
      radial-gradient(circle at 12% 14%, #ffd700 2px, transparent 5px),
      radial-gradient(circle at 11% 88%, #ffc981 1.6px, transparent 3px),
      radial-gradient(circle at 25% 38%, #ff5e00 1.6px, transparent 10px),
      radial-gradient(circle at 33% 47%, #ff396e 1.1px, transparent 2.2px),
      radial-gradient(circle at 43% 47%, #7c2039 1.1px, transparent 10.2px),
      radial-gradient(circle at 13% 67%, #ffd700 1.3px, transparent 9.9px),
      radial-gradient(circle at 28% 32%, #ffae00 1.9px, transparent 9.7px),
      radial-gradient(circle at 44% 71%, #7c2039 2.4px, transparent 8.1px);
    background-position: 0 0, 43px 19px, 97px 61px;
    background-size: 171px 197px, 113px 179px, 173px 131px;
    filter: brightness(.5) contrast(.5);
    mix-blend-mode: color-dodge;
    animation:
      divineParticleFine 6s linear infinite,
      divineParticleMid 11s linear infinite,
      divineParticleHeavy 19s linear infinite,
      divinePhaseWobble 13s ease-in-out infinite;
  }

  .rarity {
    position: absolute;
    top: 32px;
    right: 36px;
    color: #ffd700;
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 1.5px;
    text-shadow: 0 0 18px #7c2039;
  }

  .header {
    z-index: -9;
    padding: 36px 10% 15px 30%;
    margin: 4px -5% 26px;
    border-radius: 50%;
    background: #7c2039;
    box-shadow:
      0 9px 0 17px #7c2039,
      0 -80px 32px 12px rgba(255,189,23,.23),
      0 -20px 3px 12px #7c2039,
      0 35px 3px 12px rgba(124,32,57,.53);
    mix-blend-mode: color-dodge;
  }

  .title {
    display: block;
    color: #d6bfc5;
    font-size: 20px;
    font-style: italic;
    font-weight: 1000;
    transform: scale(1.6);
    transform-origin: left center;
  }

  .art {
    z-index: 9;
    display: grid;
    height: 150px;
    place-items: center;
    margin-bottom: 12px;
    border: 4px solid rgba(235,157,30,.04);
    border-radius: 32px;
    background: linear-gradient(135deg, #300c28, #0a1228);
    box-shadow:
      inset 0 0 0 1.5px #761515,
      inset 0 5px 10px 12px #140923;
    mix-blend-mode: luminosity;
    transition: mix-blend-mode .1s ease;
  }

  .art:hover {
    mix-blend-mode: normal;
  }

  .subs {
    position: relative;
    top: calc(50% - 10px);
    padding: 5px 20px;
    margin-bottom: 10px;
    border-radius: 26px;
    color: #ffd700;
    background: rgba(136,41,24,.5);
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 1.5px;
    text-shadow: 0 0 18px #7c2039;
    transition: padding .2s ease;
  }

  .art:hover > .subs {
    padding-right: 40px;
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-bottom: 10px;
  }

  .stats div {
    width: 100%;
    padding: 12px;
    border: 1px solid #912323;
    border-radius: 15px;
    background: rgba(0,0,0,.22);
    box-shadow:
      inset 0 5px 10px 12px #140923,
      inset 0 0 24px 6px rgba(145,97,8,.35);
    text-align: center;
    opacity: 1;
    transition: transform .2s ease, opacity .2s ease, width .2s ease, filter .2s ease;
  }

  .stats:hover div:hover {
    width: 300%;
    border-radius: 15px;
    filter: brightness(1);
    mix-blend-mode: luminosity;
  }

  .stats div:nth-child(1):hover { transform: translateX(0); }
  .stats div:nth-child(2):hover { transform: translateX(-33.33%); }
  .stats div:nth-child(3):hover { transform: translateX(-66.66%); }

  .stats:hover div:not(:hover) {
    opacity: 0;
  }

  .label,
  .value {
    display: block;
  }

  .label {
    color: #e44646;
    font-size: 9px;
  }

  .value {
    color: #ffc32a;
    font-size: 18px;
    font-weight: 800;
  }

  .energy {
    color: #ffd700;
  }

  .abilities {
    display: grid;
    gap: 0;
    perspective: 500px;
    transform: translateZ(0);
    transform-style: preserve-3d;
  }

  .ability {
    z-index: 10;
    padding: 16px;
    border: 1px solid rgba(255,22,22,.32);
    border-radius: 14px;
    background: rgba(15,0,0,.95);
    transform: translateZ(0) rotateX(0deg) rotateZ(0deg);
    transform-style: preserve-3d;
    transition: transform .2s ease, z-index .2s ease, box-shadow .2s ease;
  }

  .ability:hover {
    z-index: 9;
    box-shadow: 0 16px 28px rgba(0,0,0,.28), 0 0 24px rgba(255,94,0,.18);
    transform: translateZ(50px) rotateX(10deg) rotateZ(-5deg);
  }

  .abilities:hover ~ .footnote {
    opacity: 0;
  }

  .ability-title {
    display: block;
    margin-bottom: 4px;
    padding: 8px;
    border-radius: 100%;
    font-size: 11px;
    font-weight: 800;
  }

  .passive .ability-title {
    color: #ffd700;
    background: rgba(255,217,0,.13);
  }

  .active .ability-title {
    color: #bd3156;
    background: rgba(255,0,89,.13);
  }

  .ability-text {
    color: rgba(194,182,185,.52);
    font-size: 11px;
    line-height: 1.4;
  }

  .footnote {
    z-index: -99;
    color: #ff9c9c;
    font-size: 9px;
    font-style: italic;
    text-align: center;
    mix-blend-mode: color-dodge;
    transform: translateY(4px);
    transition: opacity .2s ease;
  }

  .footnote-bg {
    height: 100px;
    margin: -64px -9% -28px;
    border-radius: 100%;
    box-shadow: 0 50px 3px 4px rgba(144,6,6,.5);
    mix-blend-mode: color-dodge;
    transform: translateY(-42px);
  }

  @keyframes divineIdle {
    0%, 100% {
      transform: translateY(0) rotateX(15.5deg) rotateZ(-8.5deg);
    }
    50% {
      transform: translateY(-14px) rotateX(-18.5deg) rotateZ(8deg);
    }
  }

  @keyframes divineLavaSpin {
    0%, 100% {
      transform: rotate(-18deg) rotateX(0deg);
      background: conic-gradient(from 0deg, transparent 0deg, #ffae00 40deg, #ff5e00 90deg, transparent 140deg, #ffd700 200deg, transparent 360deg);
    }
    50% {
      transform: rotate(18deg) rotateX(-360deg);
      background: conic-gradient(from 360deg, transparent 0deg, #ffae00 40deg, #ff5e00 90deg, transparent 140deg, #ffd700 200deg, transparent 360deg);
    }
  }

  @keyframes divineParticleFine {
    0%, 100% { opacity: .5; }
    50% { opacity: 0; background-position: -300px -600px, 0 0, 0 0; }
  }

  @keyframes divineParticleMid {
    0%, 100% { opacity: 0; }
    50% { opacity: .1; background-position: 0 0, 500px -900px, 0 0; }
  }

  @keyframes divineParticleHeavy {
    0%, 100% { opacity: .6; }
    50% { opacity: 0; background-position: 0 0, 0 0, -700px -300px; }
  }

  @keyframes divinePhaseWobble {
    0%, 100% { transform: rotate(0deg); }
    50% { transform: rotate(.6deg); }
  }
`;

const DivineHeroCopy = styled.div`
  position: relative;
  z-index: 1;

  > span {
    color: #ffd700;
    font-size: 12px;
    font-weight: 900;
    letter-spacing: .18em;
    text-transform: uppercase;
  }

  h1 {
    max-width: 760px;
    margin: 14px 0 0;
    color: #fff6dd;
    font-size: clamp(48px, 7vw, 98px);
    line-height: .84;
    letter-spacing: 0;
  }

  p {
    max-width: 660px;
    margin: 22px 0 0;
    color: rgba(255,222,170,.66);
    font-size: 15px;
    font-weight: 780;
    line-height: 1.7;
  }
`;

const DivineActionButton = styled.button`
  display: inline-flex;
  min-height: 50px;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 0 18px;
  border: 1px solid #ffd700;
  border-radius: 14px;
  color: #ffd700;
  background:
    linear-gradient(135deg, rgba(124,32,57,.56), rgba(8,7,29,.92)),
    #000;
  box-shadow:
    inset 0 0 18px rgba(255,94,0,.16),
    0 0 20px rgba(255,174,0,.12);
  cursor: pointer;
  font-weight: 900;
  transition: transform 200ms ease, background-color 200ms ease, color 200ms ease, box-shadow 200ms ease;

  &:hover {
    color: #130008;
    background: #ffd700;
    box-shadow: 0 0 28px rgba(255,174,0,.55);
    transform: translateY(-3px) rotateZ(-1deg);
  }
`;

const DivinePanel = styled.div`
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255,215,0,.14);
  border-radius: 22px;
  padding: 18px;
  background:
    linear-gradient(135deg, rgba(124,32,57,.18), transparent 42%),
    repeating-linear-gradient(90deg, #151b2d, #08071d 3px, #151b2d 6px);
  box-shadow:
    0 14px 42px rgba(0,0,0,.44),
    inset 0 0 0 1px rgba(255,237,138,.04),
    inset 0 0 28px rgba(255,94,0,.08);
  transition: transform 220ms cubic-bezier(.22,1,.36,1), border-color 220ms ease, box-shadow 220ms ease;

  &:hover {
    border-color: rgba(255,215,0,.36);
    box-shadow: 0 18px 48px rgba(0,0,0,.5), 0 0 28px rgba(255,94,0,.14);
    transform: translateY(-5px) rotateZ(-.5deg);
  }

  h3,
  p {
    margin: 0;
  }

  h3 {
    color: #ffd700;
    font-size: 18px;
    letter-spacing: .1em;
    text-transform: uppercase;
  }

  p {
    margin-top: 8px;
    color: rgba(255,222,170,.58);
    font-size: 13px;
    font-weight: 760;
    line-height: 1.5;
  }
`;

const DivineAbilityPanel = styled(DivinePanel)`
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
`;

const DivineRankingPanel = styled(DivinePanel)`
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
`;

const DivineMetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const DivineMetric = styled(DivinePanel)<{ $accent: string }>`
  min-height: 150px;

  span,
  strong,
  em {
    display: block;
  }

  span {
    color: ${({ $accent }) => $accent};
    font-size: 12px;
    font-weight: 900;
    letter-spacing: .14em;
    text-transform: uppercase;
  }

  strong {
    margin-top: 18px;
    color: #ffc32a;
    font-size: clamp(34px, 5vw, 58px);
    line-height: .9;
  }

  em {
    margin-top: 10px;
    color: rgba(255,222,170,.62);
    font-style: normal;
    font-weight: 900;
  }
`;

const DivineConsole = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(340px, .95fr);
  gap: 22px;
  align-items: start;

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
`;

const DivineAbilityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(116px, 1fr);
  gap: 12px;
  margin-top: 22px;
  min-height: 0;

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;

const DivineAbility = styled.div<{ $accent: string }>`
  min-height: 0;
  padding: 14px;
  border: 1px solid ${({ $accent }) => `${$accent}66`};
  border-radius: 16px;
  background: rgba(15,0,0,.72);
  transition: transform 200ms ease, box-shadow 200ms ease, background-color 200ms ease;

  &:hover {
    background: ${({ $accent }) => `${$accent}18`};
    box-shadow: 0 0 22px ${({ $accent }) => `${$accent}33`};
    transform: translateY(-6px) rotateX(8deg) rotateZ(-2deg);
  }

  strong,
  span {
    display: block;
  }

  strong {
    color: ${({ $accent }) => $accent};
    font-size: 13px;
    letter-spacing: .08em;
    text-transform: uppercase;
  }

  span {
    margin-top: 10px;
    color: rgba(255,222,170,.66);
    font-size: 12px;
    font-weight: 760;
    line-height: 1.45;
  }
`;

const DivineList = styled.ol`
  display: grid;
  gap: 13px;
  padding: 0;
  margin: 22px 0 0;
  list-style: none;
`;

const DivineListRow = styled.li<{ $accent: string }>`
  display: grid;
  grid-template-columns: 46px 1fr auto;
  gap: 13px;
  align-items: center;
  padding: 13px;
  border: 1px solid rgba(255,215,0,.12);
  border-radius: 16px;
  background: rgba(0,0,0,.32);
  transition: transform 220ms cubic-bezier(.22,1,.36,1), border-color 220ms ease, box-shadow 220ms ease;

  &:hover {
    border-color: ${({ $accent }) => `${$accent}66`};
    box-shadow: 0 0 22px ${({ $accent }) => `${$accent}22`};
    transform: translateX(7px) rotateZ(-.7deg);
  }

  .rank {
    display: grid;
    width: 46px;
    height: 46px;
    place-items: center;
    border-radius: 14px;
    color: #130008;
    background: ${({ $accent }) => $accent};
    box-shadow: inset 0 0 12px rgba(255,255,255,.28);
    font-weight: 900;
  }

  strong,
  span,
  em {
    display: block;
  }

  strong {
    color: #fff6dd;
  }

  span {
    margin-top: 4px;
    color: rgba(255,222,170,.52);
    font-size: 12px;
    font-weight: 760;
  }

  em {
    color: ${({ $accent }) => $accent};
    font-style: normal;
    font-weight: 900;
  }
`;

const DivineModal = styled(DivinePanel)`
  width: min(760px, 100%);
  animation: ${pop} 180ms ease both;
`;

const TicketFrame = styled.div`
  display: grid;
  gap: 24px;
  width: 100%;
  max-width: none;
  margin: 0;
  color: #e8e8e8;
`;

const TicketHero = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: minmax(620px, 1.08fr) minmax(0, .92fr);
  gap: clamp(24px, 5vw, 58px);
  align-items: center;
  min-height: 640px;
  overflow: hidden;
  border-radius: 34px;
  padding: clamp(24px, 5vw, 58px);
  background:
    radial-gradient(circle at 24% 44%, rgba(175,64,255,.18), transparent 0 31%),
    radial-gradient(circle at 84% 18%, rgba(91,66,243,.2), transparent 0 26%),
    linear-gradient(135deg, rgba(33,33,33,.96), rgba(8,7,29,.96)),
    #121212;
  box-shadow:
    0 28px 78px rgba(0,0,0,.58),
    inset 0 0 0 1px rgba(255,255,255,.08),
    inset 0 -78px 130px rgba(91,66,243,.16);

  @media (max-width: 1180px) {
    grid-template-columns: 1fr;
  }
`;

const TicketStage = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  min-height: 460px;
  place-items: center;
  overflow: hidden;
  border-radius: 32px;
  background:
    radial-gradient(circle at 50% 50%, rgba(175,64,255,.12), transparent 0 44%),
    linear-gradient(180deg, rgba(255,255,255,.04), rgba(91,66,243,.05));
  box-shadow:
    inset 0 0 0 1px rgba(255,255,255,.06),
    inset 0 -36px 78px rgba(0,0,0,.42);
  perspective: 10cm;
`;

const TicketWidgetWrap = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  width: min(100%, 760px);
  min-height: 360px;
  transform: scale(.9);

  .hint {
    position: absolute;
    top: 8px;
    left: 50%;
    color: #af40ff;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 10px;
    text-wrap: nowrap;
    transform: translateX(-50%);
  }

  .ticket {
    position: relative;
    display: inline-block;
  }

  .container {
    display: inline-block;
    line-height: 1.3;
    transform-style: preserve-3d;
    animation: ticketGlow 1s ease-in-out infinite alternate;
    transition: transform .5s cubic-bezier(.22,1,.36,1);
  }

  .tilt-after,
  .tilt-before {
    position: absolute;
    top: 0;
    z-index: 10;
    width: 20%;
    height: 100%;
  }

  .tilt-after {
    right: 0;
  }

  .tilt-before {
    left: 0;
  }

  .tilt-after:hover ~ .container {
    transform: perspective(10cm) rotateX(15deg) rotateY(15deg);
  }

  .tilt-before:hover ~ .container {
    transform: perspective(10cm) rotateX(-15deg) rotateY(-15deg);
  }

  .flip-input {
    display: none;
  }

  .card-container {
    position: relative;
    width: 600px;
    height: 250px;
    transform-style: preserve-3d;
    transition: transform .999s cubic-bezier(.22,1,.36,1);
  }

  .flip-input:checked ~ .card-container {
    transform: perspective(10cm) rotateY(180deg);
  }

  .card,
  .card-back {
    position: absolute;
    display: flex;
    width: 600px;
    height: 250px;
    backface-visibility: hidden;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  .card {
    transform: rotateY(0deg);
  }

  .card-back {
    flex-direction: row-reverse;
    filter: drop-shadow(-25px 25px 29px #272727);
    transform: rotateY(180deg);
  }

  .main-part,
  .main-part-back {
    width: 450px;
    height: 250px;
    padding: 20px;
    mask: radial-gradient(20px, #0000 98%, #000) -225px -125px;
  }

  .main-part {
    background: linear-gradient(90deg, #212121 0%, #5b42f3 50%, #e8e8e8 100%);
  }

  .main-part-back {
    background: linear-gradient(90deg, #e8e8e8 0%, #5b42f3 50%, #212121 100%);
  }

  .pattern-body {
    width: 100%;
    height: 100%;
    padding-left: 10px;
    border-radius: 5px;
    color: #e8e8e8;
    background:
      radial-gradient(farthest-side at -33.33% 50%, #0000 52%, rgba(89,65,242,.35) 54% 57%, #0000 59%) 0 calc(100px / 2),
      radial-gradient(farthest-side at 50% 133.33%, #0000 52%, rgba(89,65,242,.35) 54% 57%, #0000 59%) calc(100px / 2) 0,
      radial-gradient(farthest-side at 133.33% 50%, #0000 52%, rgba(89,65,242,.35) 54% 57%, #0000 59%),
      radial-gradient(farthest-side at 50% -33.33%, #0000 52%, rgba(89,65,242,.35) 54% 57%, #0000 59%),
      #212121;
    background-size: calc(100px / 4.667) 100px, 100px calc(100px / 4.667);
  }

  .title {
    margin-bottom: 20px;
  }

  .main-title {
    position: relative;
    z-index: 1;
    display: inline-block;
    color: transparent;
    background-image: linear-gradient(144deg, #af40ff, #5b42f3);
    background-clip: text;
    font-size: 50px;
    font-weight: 900;
    animation: ticketGlowPink 1s ease-in-out infinite alternate;
  }

  .main-title::before,
  .main-title::after {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    content: attr(data-glitch);
    opacity: .8;
  }

  .main-title:hover::before {
    z-index: -1;
    color: #5b42f3;
    animation: ticketGlitchColor .3s cubic-bezier(.25,.46,.45,.94) both infinite;
  }

  .main-title:hover::after {
    z-index: -2;
    color: #af40ff;
    animation: ticketGlitchColor .3s cubic-bezier(.25,.46,.45,.94) reverse both infinite;
  }

  .sub-title {
    color: #e8e8e8;
    font-size: 10px;
    font-weight: 300;
  }

  .vip-pass {
    display: flex;
    align-items: baseline;
    justify-content: flex-start;
  }

  .vip {
    color: gold;
    font-size: 25px;
    font-weight: 300;
    animation: ticketGoldGlow 1s ease-in-out infinite alternate;
  }

  .vip-number {
    color: #e8e8e8;
    font-size: 15px;
  }

  .agenda-info {
    padding-right: 5px;
    margin-left: auto;
    font-size: 10px;
    font-weight: 300;
  }

  .ticket-info {
    display: flex;
    flex-direction: row-reverse;
    align-items: stretch;
    justify-content: space-around;
    padding-top: 5px;
    border-top: 1px solid #e8e8e8;
    font-family: "Courier New", monospace;
    font-size: 15px;
  }

  .ticket-info > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 5px;
  }

  .time,
  .location {
    border-right: 1px solid #e8e8e8;
  }

  .day {
    font-size: 15px;
    font-weight: 900;
  }

  .small-part,
  .small-part-back {
    position: absolute;
    top: 50px;
    width: 250px;
    height: 150px;
    padding: 20px;
    background-color: #e8e8e8;
    mask: radial-gradient(20px, #0000 98%, #000) -125px -75px;
    transform: rotate(-90deg);
  }

  .small-part {
    left: 400px;
    border-top: 3px dotted #121212;
    box-shadow: -23px 23px 46px #828282, 23px -23px 46px #ffffff;
  }

  .small-part-back {
    right: 400px;
    border-bottom: 3px dotted #121212;
    color: rgba(0,0,0,.5);
    font-size: 30px;
    padding-top: 50px;
    text-align: center;
    box-shadow: -23px 23px 46px #828282, 23px -23px 46px #ffffff;
  }

  .small-body {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 10px;
    border-radius: 5px;
    color: #e8e8e8;
    background:
      radial-gradient(farthest-side at -33.33% 50%, #0000 52%, rgba(89,65,242,.35) 54% 57%, #0000 59%) 0 calc(100px / 2),
      radial-gradient(farthest-side at 50% 133.33%, #0000 52%, rgba(89,65,242,.35) 54% 57%, #0000 59%) calc(100px / 2) 0,
      radial-gradient(farthest-side at 133.33% 50%, #0000 52%, rgba(89,65,242,.35) 54% 57%, #0000 59%),
      radial-gradient(farthest-side at 50% -33.33%, #0000 52%, rgba(89,65,242,.35) 54% 57%, #0000 59%),
      #212121;
    background-size: calc(100px / 4.667) 100px, 100px calc(100px / 4.667);
  }

  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .small-title {
    position: absolute;
    top: 35px;
    right: -25px;
    color: transparent;
    background-image: linear-gradient(144deg, #af40ff, #5b42f3);
    background-clip: text;
    font-size: 20px;
    font-weight: 900;
    transform: rotate(90deg);
    animation: ticketGlowPink 1s ease-in-out infinite alternate;
  }

  .infos {
    margin-bottom: 10px;
  }

  .stub-info {
    display: inline;
    padding: 5px;
    margin-right: 5px;
    border: 1px solid #e8e8e8;
    font-size: 10px;
    font-weight: 300;
    text-align: center;
  }

  .highlight {
    font-family: "Courier New", monospace;
    font-size: 13px;
    font-weight: 900;
  }

  .barcode rect {
    fill: #e8e8e8;
  }

  .mono {
    font-family: "Courier New", monospace;
  }

  .agenda {
    display: flex;
    width: 100%;
    height: 100%;
    gap: 1px;
  }

  .col {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 5px;
    border-left: 2px solid #212121;
  }

  .agenda-item {
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding-top: 5px;
    padding-left: 5px;
    margin: 0 8px;
    border-radius: 5px;
    background:
      radial-gradient(farthest-side at -33.33% 50%, #0000 52%, rgba(89,65,242,.35) 54% 57%, #0000 59%) 0 calc(100px / 2),
      radial-gradient(farthest-side at 50% 133.33%, #0000 52%, rgba(89,65,242,.35) 54% 57%, #0000 59%) calc(100px / 2) 0,
      radial-gradient(farthest-side at 133.33% 50%, #0000 52%, rgba(89,65,242,.35) 54% 57%, #0000 59%),
      radial-gradient(farthest-side at 50% -33.33%, #0000 52%, rgba(89,65,242,.35) 54% 57%, #0000 59%),
      #212121;
    background-size: calc(100px / 4.667) 100px, 100px calc(100px / 4.667);
  }

  .agenda-item::before {
    position: absolute;
    top: 50%;
    left: -9px;
    width: 10px;
    height: 10px;
    content: "";
    border-radius: 50%;
    background-color: #212121;
    transform: translate(-50%, -50%);
  }

  .agenda-time {
    color: transparent;
    background-image: linear-gradient(144deg, #af40ff, #5b42f3);
    background-clip: text;
    font-family: "Courier New", Courier, monospace;
    font-size: 15px;
    font-weight: 900;
  }

  .agenda-text {
    color: #e8e8e8;
    font-size: 10px;
    font-weight: 400;
  }

  .speaker {
    color: #e8e8e8;
    font-size: 7px;
    font-weight: 300;
  }

  @keyframes ticketGlitchColor {
    0%, 100% { transform: translate(0); }
    20% { transform: translate(-3px, 3px); }
    40% { transform: translate(-3px, -3px); }
    60% { transform: translate(3px, 3px); }
    80% { transform: translate(3px, -3px); }
  }

  @keyframes ticketGoldGlow {
    from { text-shadow: 0 0 10px gold, 0 0 20px #fff, 0 0 30px gold; }
    to { text-shadow: 0 0 20px gold, 0 0 30px gold, 0 0 40px gold; }
  }

  @keyframes ticketGlowPink {
    from { text-shadow: 0 0 20px rgba(175,64,255,0); }
    to { text-shadow: 0 0 20px rgba(175,64,255,.34); }
  }

  @keyframes ticketGlow {
    from {
      filter: drop-shadow(0 0 100px rgba(175,64,255,.34)) drop-shadow(0 0 30px rgba(255,255,255,.4)) drop-shadow(0 0 15px rgba(175,64,255,.67));
    }
    to {
      filter: drop-shadow(0 0 150px rgba(91,66,243,.34)) drop-shadow(0 0 20px rgba(255,255,255,.4)) drop-shadow(0 0 10px rgba(91,66,243,.67));
    }
  }
`;

const TicketHeroCopy = styled.div`
  position: relative;
  z-index: 1;

  > span {
    color: #af40ff;
    font-size: 12px;
    font-weight: 900;
    letter-spacing: .18em;
    text-transform: uppercase;
  }

  h1 {
    max-width: 760px;
    margin: 14px 0 0;
    color: #e8e8e8;
    font-size: clamp(48px, 7vw, 98px);
    line-height: .84;
    letter-spacing: 0;
  }

  p {
    max-width: 660px;
    margin: 22px 0 0;
    color: rgba(232,232,232,.66);
    font-size: 15px;
    font-weight: 780;
    line-height: 1.7;
  }
`;

const TicketActionButton = styled.button`
  display: inline-flex;
  min-height: 50px;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 0 18px;
  border: 1px solid #af40ff;
  border-radius: 12px;
  color: #e8e8e8;
  background: linear-gradient(144deg, #af40ff, #5b42f3);
  box-shadow: 0 0 24px rgba(175,64,255,.28);
  cursor: pointer;
  font-weight: 900;
  transition: transform 200ms ease, box-shadow 200ms ease;

  &:hover {
    box-shadow: 0 0 34px rgba(175,64,255,.48), 0 0 18px rgba(255,255,255,.24);
    transform: translateY(-3px) rotateZ(-1deg);
  }
`;

const TicketPanel = styled.div`
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(175,64,255,.18);
  border-radius: 22px;
  padding: 22px;
  background:
    radial-gradient(circle at 85% 10%, rgba(175,64,255,.13), transparent 0 26%),
    linear-gradient(135deg, rgba(33,33,33,.9), rgba(18,18,18,.94));
  box-shadow: 0 14px 42px rgba(0,0,0,.44), inset 0 0 0 1px rgba(255,255,255,.04);
  transition: transform 220ms cubic-bezier(.22,1,.36,1), border-color 220ms ease, box-shadow 220ms ease;

  &:hover {
    border-color: rgba(175,64,255,.4);
    box-shadow: 0 18px 48px rgba(0,0,0,.5), 0 0 28px rgba(175,64,255,.18);
    transform: translateY(-5px);
  }

  h3,
  p {
    margin: 0;
  }

  h3 {
    color: #e8e8e8;
    font-size: 18px;
    letter-spacing: .1em;
    text-transform: uppercase;
  }

  p {
    margin-top: 8px;
    color: rgba(232,232,232,.58);
    font-size: 13px;
    font-weight: 760;
    line-height: 1.5;
  }
`;

const TicketAgendaPulse = styled.div`
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 9px;
  margin-top: 18px;

  button {
    position: relative;
    min-height: 58px;
    overflow: hidden;
    border: 1px solid rgba(175,64,255,.2);
    border-radius: 16px;
    padding: 10px;
    color: rgba(232,232,232,.72);
    background:
      radial-gradient(circle at 50% 0%, var(--ticket-pulse), transparent 0 42%),
      rgba(0,0,0,.28);
    cursor: pointer;
    text-align: left;
    transition: transform 180ms cubic-bezier(.22,1,.36,1), border-color 180ms ease, box-shadow 180ms ease;
  }

  button::after {
    position: absolute;
    inset: auto 10px 9px;
    height: 4px;
    content: "";
    border-radius: 999px;
    background: linear-gradient(90deg, var(--ticket-pulse), transparent);
    box-shadow: 0 0 14px var(--ticket-pulse);
  }

  button:hover {
    border-color: rgba(175,64,255,.46);
    box-shadow: 0 0 24px rgba(175,64,255,.16);
    transform: translateY(-5px) rotateZ(-1deg);
  }

  strong,
  span {
    display: block;
  }

  strong {
    color: #e8e8e8;
    font-family: "Courier New", monospace;
    font-size: 13px;
  }

  span {
    margin-top: 6px;
    color: rgba(232,232,232,.48);
    font-size: 10px;
    font-weight: 900;
    letter-spacing: .08em;
    text-transform: uppercase;
  }

  @media (max-width: 980px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const TicketMetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const TicketMetric = styled(TicketPanel)<{ $accent: string }>`
  min-height: 150px;

  span,
  strong,
  em {
    display: block;
  }

  span {
    color: ${({ $accent }) => $accent};
    font-size: 12px;
    font-weight: 900;
    letter-spacing: .14em;
    text-transform: uppercase;
  }

  strong {
    margin-top: 18px;
    color: #e8e8e8;
    font-size: clamp(34px, 5vw, 58px);
    line-height: .9;
  }

  em {
    margin-top: 10px;
    color: rgba(232,232,232,.62);
    font-style: normal;
    font-weight: 900;
  }
`;

const TicketConsole = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(340px, .95fr);
  gap: 22px;
  align-items: start;

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
`;

const TicketAgendaList = styled.div`
  display: grid;
  gap: 13px;
  margin-top: 22px;
`;

const TicketAgendaRow = styled.div<{ $accent: string }>`
  display: grid;
  grid-template-columns: 90px 1fr auto;
  gap: 13px;
  align-items: center;
  padding: 13px;
  border: 1px solid ${({ $accent }) => `${$accent}55`};
  border-radius: 14px;
  background: rgba(0,0,0,.24);
  transition: transform 220ms cubic-bezier(.22,1,.36,1), box-shadow 220ms ease;

  &:hover {
    box-shadow: 0 0 22px ${({ $accent }) => `${$accent}22`};
    transform: translateX(7px);
  }

  strong,
  span,
  em {
    display: block;
  }

  strong {
    color: ${({ $accent }) => $accent};
    font-family: "Courier New", monospace;
  }

  span {
    color: #e8e8e8;
    font-size: 13px;
    font-weight: 800;
  }

  em {
    color: rgba(232,232,232,.5);
    font-style: normal;
    font-size: 12px;
    font-weight: 800;
  }
`;

const TicketSeatMap = styled.div`
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  gap: 7px;
  margin-top: 14px;

  button {
    min-height: 28px;
    border: 1px solid rgba(175,64,255,.16);
    border-radius: 10px;
    color: rgba(232,232,232,.62);
    background: rgba(0,0,0,.22);
    box-shadow: inset 0 0 0 1px rgba(255,255,255,.025);
    cursor: pointer;
    font-family: "Courier New", monospace;
    font-size: 10px;
    font-weight: 900;
    transition: transform 160ms cubic-bezier(.22,1,.36,1), border-color 160ms ease, color 160ms ease, box-shadow 160ms ease;
  }

  button[data-active="true"],
  button:hover {
    border-color: rgba(175,64,255,.52);
    color: #fff;
    box-shadow: 0 0 18px rgba(175,64,255,.18), inset 0 0 0 1px rgba(255,255,255,.06);
    transform: translateY(-4px);
  }
`;

const TicketScanLines = styled.div`
  display: grid;
  gap: 8px;
  min-width: 180px;

  span {
    position: relative;
    display: block;
    height: 8px;
    overflow: hidden;
    border-radius: 999px;
    background: rgba(0,0,0,.36);
    box-shadow: inset 0 0 0 1px rgba(175,64,255,.14);
  }

  span::before {
    position: absolute;
    inset: 0 auto 0 0;
    width: var(--scan);
    content: "";
    border-radius: inherit;
    background: linear-gradient(90deg, #af40ff, #5b42f3, gold);
    box-shadow: 0 0 14px rgba(175,64,255,.4);
  }
`;

const TicketModal = styled(TicketPanel)`
  width: min(920px, 100%);
  animation: ${pop} 180ms ease both;
`;

const ClayFrame = styled.div`
  display: grid;
  gap: 24px;
  width: 100%;
  max-width: none;
  margin: 0;
  color: #4a4a4a;
  font-family: "Quicksand", "Nunito", system-ui, sans-serif;
  -webkit-tap-highlight-color: transparent;
`;

const ClayHero = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: minmax(480px, .9fr) minmax(0, 1.1fr);
  gap: clamp(24px, 4vw, 54px);
  align-items: center;
  min-height: 640px;
  overflow: hidden;
  border-radius: 44px;
  padding: clamp(22px, 5vw, 58px);
  background:
    radial-gradient(circle at 16% 20%, rgba(244,114,182,.12), transparent 0 28%),
    radial-gradient(circle at 86% 16%, rgba(14,165,233,.12), transparent 0 24%),
    #e7e7e7;
  box-shadow:
    18px 18px 44px rgba(160,160,160,.38),
    -18px -18px 44px rgba(255,255,255,.8),
    inset 7px 7px 14px rgba(197,197,197,.64),
    inset -7px -7px 14px rgba(255,255,255,.78);

  @media (max-width: 1120px) {
    grid-template-columns: 1fr;
  }
`;

const ClayStage = styled.div`
  position: relative;
  display: grid;
  min-height: 430px;
  place-items: center;
  border-radius: 38px;
  background: #e7e7e7;
  box-shadow:
    inset 10px 10px 20px #c5c5c5,
    inset -10px -10px 20px #ffffff;

  &::before,
  &::after {
    position: absolute;
    content: "";
    border-radius: 41% 59% 45% 55% / 58% 44% 56% 42%;
    opacity: .18;
    pointer-events: none;
  }

  &::before {
    width: 136px;
    height: 136px;
    top: 28px;
    left: 30px;
    background: #f472b6;
    box-shadow: inset 5px 5px 12px rgba(0,0,0,.18), inset -5px -5px 12px rgba(255,255,255,.52);
  }

  &::after {
    right: 34px;
    bottom: 28px;
    width: 168px;
    height: 116px;
    background: #0ea5e9;
    box-shadow: inset 5px 5px 12px rgba(0,0,0,.18), inset -5px -5px 12px rgba(255,255,255,.52);
    transform: rotate(-10deg);
  }
`;

const ClayPaletteWrap = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  place-content: center;
  width: 100%;

  .clay-slab {
    width: min(100%, 333px);
    padding: 1rem;
    border-radius: 40px;
    background: #e7e7e7;
    box-shadow:
      inset 6px 6px 12px #c5c5c5,
      inset -6px -6px 12px #ffffff;
  }

  .container-items {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
  }

  .item-color {
    position: relative;
    flex-shrink: 0;
    width: 50px;
    height: 50px;
    border: none;
    outline: none;
    cursor: pointer;
    background-color: var(--color);
    border-radius: 41% 59% 45% 55% / 58% 44% 56% 42%;
    box-shadow:
      4px 4px 8px rgba(160, 160, 160, 0.6),
      -4px -4px 8px rgba(255, 255, 255, 0.8),
      inset 2px 2px 4px color-mix(in srgb, var(--color) 80%, black),
      inset -2px -2px 4px color-mix(in srgb, var(--color) 80%, white);
    transition:
      transform 300ms cubic-bezier(0.165, 0.84, 0.44, 1),
      border-radius 300ms cubic-bezier(0.165, 0.84, 0.44, 1),
      box-shadow 160ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .item-color::before {
    position: absolute;
    left: 50%;
    bottom: 120%;
    padding: 8px 12px;
    border-radius: 20px;
    color: #555;
    background: #e7e7e7;
    box-shadow:
      inset 2px 2px 4px #c5c5c5,
      inset -2px -2px 4px #ffffff;
    content: attr(data-color);
    font-size: 14px;
    font-weight: 800;
    opacity: 0;
    pointer-events: none;
    transform: translateX(-50%) scale(.88);
    transform-origin: bottom center;
    transition:
      transform 180ms cubic-bezier(0.22, 1, 0.36, 1),
      opacity 140ms ease-out,
      color 140ms ease-out;
    white-space: nowrap;
  }

  @media (hover: hover) and (pointer: fine) {
    .item-color:hover {
      border-radius: 50%;
      transform: translateY(-5px) scale(1.05);
    }

    .item-color:hover::before {
      opacity: 1;
      transform: translateX(-50%) scale(1);
    }
  }

  .item-color:active {
    box-shadow:
      1px 1px 4px rgba(160, 160, 160, 0.6),
      -1px -1px 4px rgba(255, 255, 255, 0.8),
      inset 8px 8px 16px color-mix(in srgb, var(--color) 80%, black),
      inset -8px -8px 16px color-mix(in srgb, var(--color) 80%, white);
    transform: translateY(2px) scale(0.96);
  }

  .item-color:focus-visible::before {
    color: #10b981;
    content: "Copied";
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }
`;

const ClayHeroCopy = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  justify-items: start;

  > span {
    color: #10b981;
    font-size: 12px;
    font-weight: 900;
    letter-spacing: .18em;
    text-transform: uppercase;
  }

  h1 {
    max-width: 800px;
    margin: 14px 0 0;
    color: #3f3f3f;
    font-size: clamp(46px, 7vw, 96px);
    line-height: .86;
    letter-spacing: 0;
    text-shadow: 3px 3px 0 rgba(197,197,197,.65), -3px -3px 0 rgba(255,255,255,.86);
  }

  p {
    max-width: 680px;
    margin: 22px 0 0;
    color: #686868;
    font-size: 15px;
    font-weight: 780;
    line-height: 1.7;
  }
`;

const ClayActionButton = styled.button`
  display: inline-flex;
  min-height: 52px;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 0 20px;
  border-radius: 24px;
  color: #555;
  background: #e7e7e7;
  box-shadow:
    6px 6px 12px rgba(160,160,160,.55),
    -6px -6px 12px rgba(255,255,255,.82),
    inset 0 0 0 1px rgba(255,255,255,.42);
  cursor: pointer;
  font-weight: 900;
  transition: transform 180ms cubic-bezier(.22,1,.36,1), box-shadow 180ms ease, color 180ms ease;

  &:hover {
    color: #10b981;
    box-shadow:
      8px 8px 16px rgba(160,160,160,.48),
      -8px -8px 16px rgba(255,255,255,.9),
      inset 2px 2px 4px rgba(197,197,197,.44),
      inset -2px -2px 4px rgba(255,255,255,.68);
    transform: translateY(-3px);
  }

  &:active {
    box-shadow:
      2px 2px 6px rgba(160,160,160,.44),
      -2px -2px 6px rgba(255,255,255,.82),
      inset 7px 7px 14px rgba(197,197,197,.74),
      inset -7px -7px 14px rgba(255,255,255,.78);
    transform: translateY(2px) scale(.97);
  }
`;

const ClayMetricGrid = styled.div`
  display: grid;
  grid-template-columns: 1.1fr .9fr 1.25fr;
  gap: 18px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const ClayPanel = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 30px;
  padding: 22px;
  background: #e7e7e7;
  box-shadow:
    10px 10px 22px rgba(160,160,160,.38),
    -10px -10px 22px rgba(255,255,255,.74),
    inset 2px 2px 5px rgba(255,255,255,.34);
  transition: transform 220ms cubic-bezier(.22,1,.36,1), box-shadow 220ms ease;

  &:hover {
    box-shadow:
      12px 12px 26px rgba(160,160,160,.42),
      -12px -12px 26px rgba(255,255,255,.82),
      inset 5px 5px 10px rgba(197,197,197,.26),
      inset -5px -5px 10px rgba(255,255,255,.54);
    transform: translateY(-4px);
  }

  h3,
  p {
    margin: 0;
  }

  h3 {
    color: #4a4a4a;
    font-size: 18px;
    letter-spacing: .08em;
    text-transform: uppercase;
  }

  p {
    margin-top: 8px;
    color: #747474;
    font-size: 13px;
    font-weight: 760;
    line-height: 1.5;
  }
`;

const ClayMetric = styled(ClayPanel)<{ $accent: string }>`
  min-height: ${({ $accent }) => ($accent === "#f472b6" ? "184px" : "150px")};

  span,
  strong,
  em {
    display: block;
  }

  span {
    color: ${({ $accent }) => $accent};
    font-size: 12px;
    font-weight: 900;
    letter-spacing: .14em;
    text-transform: uppercase;
  }

  strong {
    margin-top: 18px;
    color: #4b4b4b;
    font-size: clamp(34px, 5vw, 58px);
    line-height: .9;
    text-shadow: 2px 2px 0 rgba(197,197,197,.7), -2px -2px 0 rgba(255,255,255,.8);
  }

  em {
    margin-top: 10px;
    color: #747474;
    font-style: normal;
    font-weight: 900;
  }
`;

const ClayConsole = styled.div`
  display: grid;
  grid-template-columns: minmax(0, .88fr) minmax(360px, 1.12fr);
  gap: 22px;
  align-items: start;

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
`;

const ClayChartGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 280px;
  gap: 16px;
  margin-top: 22px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const ClayBarChart = styled.div`
  display: flex;
  min-height: 210px;
  align-items: end;
  gap: 11px;
  padding: 18px;
  border-radius: 28px;
  background: #e7e7e7;
  box-shadow:
    inset 8px 8px 16px #c5c5c5,
    inset -8px -8px 16px #ffffff;

  .bar {
    position: relative;
    flex: 1;
    min-width: 18px;
    border-radius: 999px 999px 16px 16px;
    background: var(--bar-color);
    box-shadow:
      4px 4px 8px rgba(160,160,160,.46),
      -4px -4px 8px rgba(255,255,255,.76),
      inset 2px 2px 4px color-mix(in srgb, var(--bar-color) 80%, black),
      inset -2px -2px 4px color-mix(in srgb, var(--bar-color) 82%, white);
    transition: transform 220ms cubic-bezier(.22,1,.36,1), border-radius 220ms ease;
  }

  .bar:hover {
    border-radius: 40% 60% 46% 54% / 70% 54% 46% 30%;
    transform: translateY(-7px) scaleX(1.08);
  }
`;

const ClayBubbleMap = styled.div`
  position: relative;
  min-height: 210px;
  border-radius: 28px;
  background: #e7e7e7;
  box-shadow:
    inset 8px 8px 16px #c5c5c5,
    inset -8px -8px 16px #ffffff;

  span {
    position: absolute;
    display: grid;
    width: var(--size);
    height: var(--size);
    place-items: center;
    border-radius: 41% 59% 45% 55% / 58% 44% 56% 42%;
    color: rgba(255,255,255,.92);
    background: var(--color);
    box-shadow:
      5px 5px 10px rgba(160,160,160,.5),
      -5px -5px 10px rgba(255,255,255,.82),
      inset 2px 2px 5px color-mix(in srgb, var(--color) 74%, black),
      inset -2px -2px 5px color-mix(in srgb, var(--color) 82%, white);
    font-size: 12px;
    font-weight: 900;
    transform: translate(-50%, -50%);
    transition: transform 220ms cubic-bezier(.22,1,.36,1), border-radius 220ms ease;
  }

  span:hover {
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(1.08);
  }
`;

const ClaySwatchList = styled.div`
  display: grid;
  gap: 13px;
  margin-top: 22px;
`;

const ClaySwatchRow = styled.div<{ $accent: string }>`
  display: grid;
  grid-template-columns: 48px 1fr auto;
  gap: 13px;
  align-items: center;
  padding: 13px;
  border-radius: 22px;
  background: #e7e7e7;
  box-shadow:
    inset 5px 5px 10px rgba(197,197,197,.72),
    inset -5px -5px 10px rgba(255,255,255,.82);
  transition: transform 220ms cubic-bezier(.22,1,.36,1), box-shadow 220ms ease;

  &:hover {
    box-shadow:
      6px 6px 12px rgba(160,160,160,.36),
      -6px -6px 12px rgba(255,255,255,.7),
      inset 2px 2px 5px ${({ $accent }) => `${$accent}44`};
    transform: translateX(7px);
  }

  .chip {
    width: 48px;
    height: 48px;
    border-radius: 41% 59% 45% 55% / 58% 44% 56% 42%;
    background: ${({ $accent }) => $accent};
    box-shadow:
      3px 3px 7px rgba(160,160,160,.5),
      -3px -3px 7px rgba(255,255,255,.82),
      inset 2px 2px 4px color-mix(in srgb, ${({ $accent }) => $accent} 80%, black),
      inset -2px -2px 4px color-mix(in srgb, ${({ $accent }) => $accent} 80%, white);
  }

  strong,
  span,
  em {
    display: block;
  }

  strong {
    color: #515151;
    font-size: 14px;
  }

  span {
    margin-top: 4px;
    color: #777;
    font-size: 12px;
    font-weight: 760;
  }

  em {
    color: ${({ $accent }) => $accent};
    font-style: normal;
    font-weight: 900;
  }
`;

const ClayModal = styled(ClayPanel)`
  width: min(760px, 100%);
  animation: ${pop} 180ms ease both;
`;

const LumenFrame = styled.div`
  display: grid;
  gap: 24px;
  width: 100%;
  max-width: none;
  margin: 0;
  color: #f4f4f4;
  font-family: "Aeonik Pro Regular", "Avenir Next", system-ui, sans-serif;
`;

const LumenHero = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, .82fr) minmax(520px, 1.18fr);
  gap: clamp(24px, 5vw, 64px);
  align-items: center;
  min-height: 660px;
  overflow: hidden;
  border-radius: 34px;
  padding: clamp(24px, 5vw, 62px);
  background:
    radial-gradient(circle at 72% 16%, rgba(255,255,255,.16), transparent 0 23%),
    radial-gradient(circle at 50% 30%, #2a2a2a 0%, #131313 64%);
  box-shadow:
    0 32px 78px rgba(0,0,0,.58),
    inset 0 0 0 1px rgba(255,255,255,.1),
    inset 0 -80px 120px rgba(0,0,0,.44);

  &::before {
    position: absolute;
    top: -18%;
    right: 12%;
    width: 34%;
    height: 58%;
    content: "";
    background: linear-gradient(180deg, rgba(255,255,255,.22), rgba(255,255,255,0));
    filter: blur(16px);
    opacity: .4;
    pointer-events: none;
    transform: perspective(520px) rotateX(58deg);
  }

  @media (max-width: 1160px) {
    grid-template-columns: 1fr;
  }
`;

const LumenHeroCopy = styled.div`
  position: relative;
  z-index: 1;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 26px;

  > div > span {
    color: rgba(255,255,255,.72);
    font-size: 12px;
    font-weight: 900;
    letter-spacing: .2em;
    text-transform: uppercase;
  }

  h1 {
    max-width: 720px;
    margin: 14px 0 0;
    color: #f8f8f8;
    font-size: clamp(48px, 7vw, 104px);
    line-height: .84;
    letter-spacing: 0;
    text-shadow: 0 -18px 42px rgba(255,255,255,.18), 0 18px 44px rgba(0,0,0,.82);
  }

  p {
    max-width: 640px;
    margin: 22px 0 0;
    color: rgba(255,255,255,.56);
    font-size: 15px;
    font-weight: 760;
    line-height: 1.72;
  }
`;

const LumenStage = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  min-height: 520px;
  place-items: center;
  overflow: hidden;
  border-radius: 30px;
  background:
    radial-gradient(circle at 50% 4%, rgba(255,255,255,.12), transparent 0 26%),
    linear-gradient(180deg, rgba(255,255,255,.05), rgba(0,0,0,.28));
  box-shadow:
    inset 0 0 0 1px rgba(255,255,255,.08),
    inset 0 26px 60px rgba(255,255,255,.04),
    inset 0 -42px 78px rgba(0,0,0,.48);
`;

const LumenWidgetWrap = styled.div<{ $compact?: boolean }>`
  --sz: ${({ $compact }) => ($compact ? "14px" : "clamp(15px, 1.45vw, 22px)")};
  position: relative;
  display: grid;
  place-items: center;
  width: min(100%, ${({ $compact }) => ($compact ? "360px" : "520px")});
  min-height: ${({ $compact }) => ($compact ? "410px" : "500px")};
  font-size: var(--sz);

  .luminous-card-container,
  .luminous-card-container * {
    box-sizing: border-box;
  }

  .luminous-card-container {
    display: grid;
    min-width: 100%;
    min-height: 100%;
    place-items: center;
    overflow: hidden;
  }

  .luminous-toggle-input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  .luminous-card {
    position: relative;
    display: flex;
    width: 18rem;
    height: 24rem;
    flex-direction: column;
    justify-content: end;
    padding: 1rem;
    border-radius: 1.8rem;
    color: #fff;
    background: radial-gradient(circle at 50% 0%, #3a3a3a 0%, #1a1a1a 64%);
    box-shadow:
      inset 0 1.01rem 0.2rem -1rem rgba(255,255,255,0),
      inset 0 -1.01rem 0.2rem -1rem rgba(0,0,0,0),
      0 -1.02rem 0.2rem -1rem rgba(255,255,255,0),
      0 1rem 0.2rem -1rem rgba(0,0,0,0),
      0 0 0 1px rgba(255,255,255,.2),
      0 4px 4px 0 rgba(0,0,0,.26),
      0 0 0 1px #333;
    cursor: pointer;
    transition:
      transform 240ms cubic-bezier(.22,1,.36,1),
      box-shadow 400ms ease,
      background-color 400ms ease;
  }

  .luminous-card::before {
    position: absolute;
    inset: -1rem;
    content: "";
    border-radius: 2.6rem;
    clip-path: polygon(4rem 0, 0 0, 0 4rem, 4rem 4rem, 4rem calc(100% - 4rem), 0 calc(100% - 4rem), 0 100%, 4rem 100%, 4rem calc(100% - 4rem), calc(100% - 4rem) calc(100% - 4rem), calc(100% - 4rem) 100%, 100% 100%, 100% calc(100% - 4rem), calc(100% - 4rem) calc(100% - 4rem), calc(100% - 4rem) 4rem, 100% 4rem, 100% 0, calc(100% - 4rem) 0, calc(100% - 4rem) 4rem, 4rem 4rem);
    box-shadow: inset 0 0 0 .06rem rgba(255,255,255,.13);
    transition: clip-path 360ms cubic-bezier(.22,1,.36,1), border-radius 360ms ease, box-shadow 360ms ease, inset 360ms ease;
  }

  @media (hover: hover) and (pointer: fine) {
    .luminous-card:hover {
      transform: translateY(-.2rem);
    }

    .luminous-card:hover::before {
      inset: -.5rem;
      border-radius: 2.2rem;
      clip-path: polygon(8rem 0, 0 0, 0 8rem, 8rem 8rem, 8rem calc(100% - 8rem), 0 calc(100% - 8rem), 0 100%, 8rem 100%, 8rem calc(100% - 8rem), calc(100% - 8rem) calc(100% - 8rem), calc(100% - 8rem) 100%, 100% 100%, 100% calc(100% - 8rem), calc(100% - 8rem) calc(100% - 8rem), calc(100% - 8rem) 8rem, 100% 8rem, 100% 0, calc(100% - 8rem) 0, calc(100% - 8rem) 8rem, 8rem 8rem);
      box-shadow: inset 0 0 0 .08rem rgba(255,255,255,.08);
    }
  }

  .luminous-light-layer {
    position: absolute;
    inset: 0;
    pointer-events: none;
    perspective: 400px;
    transform-style: preserve-3d;
  }

  .luminous-slit {
    position: absolute;
    inset: 0;
    width: 64%;
    height: 1.2rem;
    margin: auto;
    background: #121212;
    box-shadow: 0 0 4px 0 rgba(255,255,255,0);
    transform: rotateX(-76deg);
    transition: background-color 400ms ease, box-shadow 400ms ease;
  }

  .luminous-lumen,
  .luminous-darken {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    margin: auto;
    pointer-events: none;
    perspective: 400px;
  }

  .luminous-lumen {
    opacity: 0;
    transition: opacity 400ms ease;
  }

  .luminous-lumen .min,
  .luminous-lumen .mid,
  .luminous-lumen .hi {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 100% 100% 0 0;
    background: linear-gradient(rgba(255,255,255,0), rgba(255,255,255,.66));
  }

  .luminous-lumen .min {
    top: 0;
    bottom: 2.5rem;
    width: 70%;
    height: 3rem;
    opacity: .4;
    transform: rotateX(-42deg);
  }

  .luminous-lumen .mid {
    top: 0;
    bottom: 10em;
    width: 74%;
    height: 13rem;
    filter: blur(1rem);
    opacity: .8;
    transform: rotateX(-42deg);
  }

  .luminous-lumen .hi {
    top: 0;
    bottom: 12em;
    width: 50%;
    height: 13rem;
    filter: blur(1rem);
    opacity: .6;
    transform: rotateX(22deg);
  }

  .luminous-darken {
    opacity: .5;
    transition: opacity 400ms ease;
  }

  .luminous-darken > * {
    position: absolute;
    margin: auto;
    transition: opacity 400ms ease;
  }

  .luminous-darken .sl {
    left: 0;
    right: 0;
    top: 9.6em;
    bottom: 0;
    width: 64%;
    height: 10rem;
    border-radius: 0 0 100% 100%;
    background: linear-gradient(#000, rgba(0,0,0,0));
    filter: blur(.2rem);
    opacity: .1;
    transform: rotateX(-22deg);
  }

  .luminous-darken .ll {
    left: 0;
    right: 0;
    top: 11em;
    bottom: 0;
    width: 62%;
    height: 10rem;
    border-radius: 0 0 100% 100%;
    background: linear-gradient(rgba(0,0,0,.66), rgba(0,0,0,0));
    filter: blur(.8rem);
    opacity: .4;
    transform: rotateX(22deg);
  }

  .luminous-darken .slt,
  .luminous-darken .srt {
    top: 3.9em;
    bottom: 0;
    width: .5rem;
    height: 4rem;
    border-radius: 0 0 100% 100%;
    background: linear-gradient(rgba(0,0,0,.34), rgba(0,0,0,0));
    opacity: .6;
  }

  .luminous-darken .slt {
    left: 0;
    right: 11.5rem;
    transform: skewY(42deg);
  }

  .luminous-darken .srt {
    right: 0;
    left: 11.5rem;
    transform: skewY(-42deg);
  }

  .luminous-content {
    position: relative;
    z-index: 1;
  }

  .luminous-icon {
    position: absolute;
    top: -13rem;
    left: 0;
    right: 0;
    width: fit-content;
    margin: auto;
    color: #8d8d8d;
    filter: drop-shadow(0 -1.2rem 1px transparent);
    transition: filter 400ms ease, color 400ms ease, transform 400ms cubic-bezier(.22,1,.36,1);
  }

  .luminous-bottom {
    position: relative;
  }

  .luminous-title {
    margin: 0 0 1rem;
    color: #fff;
    font-size: 1.2rem;
    font-weight: 500;
  }

  .luminous-description {
    max-width: 64%;
    padding-bottom: .6rem;
    margin: 0;
    border-bottom: 1px solid rgba(255,255,255,.07);
    color: #aaa;
    font-size: .6rem;
    font-weight: 400;
    line-height: 1.5;
  }

  .luminous-toggle {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 4.8rem;
    height: 2rem;
    border-radius: .6rem;
    background: #000;
    box-shadow:
      inset 0 -8px 8px .3rem rgba(0,0,0,.26),
      inset 0 0 1px .3rem #ddd,
      inset 0 -2px 1px .3rem #fff,
      inset 0 1px 2px .3rem rgba(0,0,0,.4),
      inset 0 0 1px .8rem #aaa;
    cursor: pointer;
    transition: box-shadow 400ms ease, background-color 400ms ease;
  }

  .luminous-toggle::before {
    position: absolute;
    inset: 0;
    display: block;
    width: 3.4rem;
    height: .68rem;
    margin: auto;
    border-radius: .2rem;
    background: #000;
    content: "";
    transition: background-color 400ms ease, box-shadow 400ms ease;
  }

  .luminous-handle {
    position: absolute;
    top: 0;
    bottom: .04rem;
    left: .68rem;
    width: 40%;
    height: 30%;
    margin: auto;
    border-radius: .2rem;
    background: #aaa;
    box-shadow:
      inset 0 1px 4px 0 #fff,
      inset 0 -1px 1px 0 rgba(0,0,0,.66),
      0 0 1px 1px rgba(0,0,0,.2),
      1px 3px 6px 1px rgba(0,0,0,.66);
    pointer-events: none;
    transition: transform 400ms cubic-bezier(.22,1,.36,1), box-shadow 400ms ease, background-color 400ms ease;
  }

  .luminous-toggle-label {
    position: absolute;
    right: 0;
    bottom: calc(100% + .4rem);
    left: 0;
    margin: auto;
    color: #999;
    font-size: .6rem;
    font-weight: 400;
    opacity: 0;
    pointer-events: none;
    text-align: center;
    transition: opacity 140ms ease-out;
  }

  @media (hover: hover) and (pointer: fine) {
    .luminous-toggle:hover .luminous-toggle-label {
      opacity: 1;
    }

    .luminous-toggle:hover .luminous-handle {
      transform: translateX(.2rem);
    }
  }

  .luminous-card-container:has(.luminous-toggle-input:checked) .luminous-card {
    box-shadow:
      inset 0 1.01rem .1rem -1rem rgba(255,255,255,.66),
      inset 0 -4rem 3rem -3rem rgba(0,0,0,.66),
      0 -1.02rem .2rem -1rem rgba(255,255,255,.66),
      0 1rem .2rem -1rem #000,
      0 0 0 1px rgba(255,255,255,.13),
      0 4px 4px 0 rgba(0,0,0,.26),
      0 0 0 1px #333;
  }

  .luminous-card-container:has(.luminous-toggle-input:checked) .luminous-card .luminous-slit {
    background: #fff;
    box-shadow: 0 0 4px 0 #fff;
  }

  .luminous-card-container:has(.luminous-toggle-input:checked) .luminous-card .luminous-lumen {
    opacity: .5;
  }

  .luminous-card-container:has(.luminous-toggle-input:checked) .luminous-card .luminous-darken {
    opacity: .8;
  }

  .luminous-card-container:has(.luminous-toggle-input:checked) .luminous-card .luminous-darken .sl {
    opacity: .2;
  }

  .luminous-card-container:has(.luminous-toggle-input:checked) .luminous-card .luminous-darken .ll,
  .luminous-card-container:has(.luminous-toggle-input:checked) .luminous-card .luminous-darken .slt,
  .luminous-card-container:has(.luminous-toggle-input:checked) .luminous-card .luminous-darken .srt {
    opacity: 1;
  }

  .luminous-card-container:has(.luminous-toggle-input:checked) .luminous-card .luminous-icon {
    color: #f6f6f6;
    filter: drop-shadow(0 -1.2rem 2px rgba(0,0,0,.2)) brightness(1.64);
    transform: translateY(-.1rem);
  }

  .luminous-card-container:has(.luminous-toggle-input:checked) .luminous-card .luminous-toggle::before {
    background: rgba(255,255,255,.8);
    box-shadow: 0 0 .3rem .2rem rgba(255,255,255,.46);
  }

  .luminous-card-container:has(.luminous-toggle-input:checked) .luminous-card .luminous-toggle .luminous-handle {
    box-shadow:
      inset 0 1px 12px 0 #fff,
      inset 0 -1px 1px 0 rgba(255,255,255,.66),
      0 0 2px 1px rgba(68,68,68,.2),
      1px 3px 6px 1px rgba(0,0,0,.26);
    transform: translateX(1.58rem);
  }
`;

const LumenActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
`;

const LumenActionButton = styled.button`
  display: inline-flex;
  min-height: 50px;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 0 18px;
  border-radius: 14px;
  color: rgba(255,255,255,.82);
  background: radial-gradient(circle at 50% 0%, rgba(255,255,255,.2), rgba(255,255,255,.04) 58%, rgba(0,0,0,.36));
  box-shadow:
    inset 0 0 0 1px rgba(255,255,255,.14),
    inset 0 -18px 22px rgba(0,0,0,.32),
    0 12px 24px rgba(0,0,0,.32);
  cursor: pointer;
  font-weight: 900;
  transition: transform 180ms cubic-bezier(.22,1,.36,1), box-shadow 180ms ease, color 180ms ease;

  &:hover {
    color: #fff;
    box-shadow:
      inset 0 1px 18px rgba(255,255,255,.22),
      inset 0 -18px 22px rgba(0,0,0,.32),
      0 -10px 26px rgba(255,255,255,.1),
      0 14px 28px rgba(0,0,0,.4);
    transform: translateY(-3px);
  }

  &:active {
    transform: scale(.97);
  }
`;

const LumenMetricGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr .9fr .9fr;
  gap: 18px;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

const LumenPanel = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 26px;
  padding: 22px;
  background:
    radial-gradient(circle at 50% 0%, rgba(255,255,255,.11), transparent 0 38%),
    linear-gradient(180deg, rgba(58,58,58,.72), rgba(22,22,22,.94));
  box-shadow:
    0 22px 52px rgba(0,0,0,.44),
    inset 0 0 0 1px rgba(255,255,255,.1),
    inset 0 -42px 60px rgba(0,0,0,.34);
  transition: transform 220ms cubic-bezier(.22,1,.36,1), box-shadow 220ms ease;

  &:hover {
    box-shadow:
      0 26px 58px rgba(0,0,0,.5),
      0 -12px 28px rgba(255,255,255,.06),
      inset 0 0 0 1px rgba(255,255,255,.16),
      inset 0 12px 24px rgba(255,255,255,.04);
    transform: translateY(-5px);
  }

  h3,
  p {
    margin: 0;
  }

  h3 {
    color: #f8f8f8;
    font-size: 18px;
    letter-spacing: .12em;
    text-transform: uppercase;
  }

  p {
    margin-top: 8px;
    color: rgba(255,255,255,.52);
    font-size: 13px;
    font-weight: 760;
    line-height: 1.5;
  }
`;

const LumenMetric = styled(LumenPanel)<{ $wide?: boolean }>`
  min-height: ${({ $wide }) => ($wide ? "178px" : "150px")};

  span,
  strong,
  em {
    display: block;
  }

  span {
    color: rgba(255,255,255,.54);
    font-size: 12px;
    font-weight: 900;
    letter-spacing: .14em;
    text-transform: uppercase;
  }

  strong {
    margin-top: 18px;
    color: #fff;
    font-size: clamp(34px, 5vw, 58px);
    line-height: .9;
    text-shadow: 0 -12px 24px rgba(255,255,255,.22), 0 14px 28px rgba(0,0,0,.82);
  }

  em {
    margin-top: 10px;
    color: rgba(255,255,255,.5);
    font-style: normal;
    font-weight: 900;
  }
`;

const LumenConsole = styled.div`
  display: grid;
  grid-template-columns: minmax(360px, .82fr) minmax(0, 1.18fr);
  gap: 22px;
  align-items: start;

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
`;

const LumenSlotList = styled.div`
  display: grid;
  gap: 13px;
  margin-top: 22px;
`;

const LumenSlotRow = styled.div<{ $on?: boolean }>`
  display: grid;
  grid-template-columns: 56px 1fr auto;
  gap: 13px;
  align-items: center;
  padding: 13px;
  border-radius: 18px;
  background: ${({ $on }) =>
    $on
      ? "radial-gradient(circle at 18% 0%, rgba(255,255,255,.18), transparent 0 46%), rgba(255,255,255,.07)"
      : "rgba(0,0,0,.22)"};
  box-shadow: ${({ $on }) =>
    $on
      ? "inset 0 1px 18px rgba(255,255,255,.12), 0 -8px 20px rgba(255,255,255,.05)"
      : "inset 0 0 0 1px rgba(255,255,255,.05)"};
  transition: transform 220ms cubic-bezier(.22,1,.36,1), box-shadow 220ms ease, background-color 220ms ease;

  &:hover {
    transform: translateX(7px);
  }

  .slot {
    display: grid;
    width: 56px;
    height: 42px;
    place-items: center;
    border-radius: 13px;
    color: ${({ $on }) => ($on ? "#fff" : "rgba(255,255,255,.38)")};
    background: radial-gradient(circle at 50% 0%, ${({ $on }) => ($on ? "rgba(255,255,255,.36)" : "rgba(255,255,255,.08)")}, rgba(0,0,0,.36));
    box-shadow:
      inset 0 0 0 1px rgba(255,255,255,.1),
      inset 0 -14px 18px rgba(0,0,0,.3);
    font-weight: 900;
  }

  strong,
  span,
  em {
    display: block;
  }

  strong {
    color: #f5f5f5;
  }

  span {
    margin-top: 4px;
    color: rgba(255,255,255,.48);
    font-size: 12px;
    font-weight: 760;
  }

  em {
    color: ${({ $on }) => ($on ? "#fff" : "rgba(255,255,255,.42)")};
    font-style: normal;
    font-weight: 900;
  }
`;

const LumenChart = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  gap: 11px;
  min-height: 260px;
  align-items: end;
  margin-top: 22px;
  padding: 20px;
  border-radius: 24px;
  background:
    linear-gradient(180deg, rgba(255,255,255,.04), rgba(0,0,0,.22)),
    #151515;
  box-shadow:
    inset 0 0 0 1px rgba(255,255,255,.08),
    inset 0 30px 60px rgba(255,255,255,.03),
    inset 0 -36px 60px rgba(0,0,0,.42);

  .beam {
    position: relative;
    min-width: 16px;
    border-radius: 999px 999px 10px 10px;
    background: linear-gradient(180deg, rgba(255,255,255,.94), rgba(255,255,255,.22) 32%, rgba(255,255,255,.04));
    box-shadow:
      0 -14px 28px rgba(255,255,255,.18),
      inset 0 1px 8px rgba(255,255,255,.74),
      inset 0 -16px 18px rgba(0,0,0,.36);
    transition: transform 220ms cubic-bezier(.22,1,.36,1), opacity 220ms ease;
  }

  .beam::before {
    position: absolute;
    right: 18%;
    bottom: 100%;
    left: 18%;
    height: 46px;
    content: "";
    background: linear-gradient(180deg, rgba(255,255,255,.42), transparent);
    filter: blur(7px);
    opacity: .6;
  }

  .beam:hover {
    opacity: 1;
    transform: translateY(-8px) scaleY(1.04);
  }
`;

const LumenModal = styled(LumenPanel)`
  width: min(760px, 100%);
  animation: ${pop} 180ms ease both;
`;

const PromptFrame = styled.div`
  display: grid;
  gap: 24px;
  width: 100%;
  max-width: none;
  margin: 0;
  color: #f3f6fd;
  font-family: "Avenir Next", "SF Pro Display", system-ui, sans-serif;
`;

const PromptHero = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: minmax(480px, .95fr) minmax(0, 1.05fr);
  gap: clamp(24px, 4vw, 58px);
  align-items: center;
  min-height: 620px;
  overflow: hidden;
  border-radius: 34px;
  padding: clamp(24px, 5vw, 58px);
  background:
    radial-gradient(circle at 12% 14%, rgba(255,255,255,.14), transparent 0 14%),
    radial-gradient(circle at 90% 10%, rgba(126,126,126,.2), transparent 0 24%),
    linear-gradient(135deg, rgba(27,27,27,.96), rgba(5,5,5,.98));
  box-shadow:
    0 30px 74px rgba(0,0,0,.6),
    inset 0 0 0 1px rgba(255,255,255,.08),
    inset 0 -80px 120px rgba(0,0,0,.42);

  @media (max-width: 1120px) {
    grid-template-columns: 1fr;
  }
`;

const PromptStage = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  min-height: 390px;
  place-items: center;
  overflow: hidden;
  border-radius: 28px;
  background:
    radial-gradient(circle at 18% 12%, rgba(255,255,255,.13), transparent 0 18%),
    linear-gradient(145deg, rgba(126,126,126,.1), rgba(0,0,0,.3));
  box-shadow:
    inset 0 0 0 1px rgba(255,255,255,.08),
    inset 0 24px 54px rgba(255,255,255,.03),
    inset 0 -36px 80px rgba(0,0,0,.48);
`;

const PromptHeroCopy = styled.div`
  position: relative;
  z-index: 1;

  > span {
    color: rgba(255,255,255,.64);
    font-size: 12px;
    font-weight: 900;
    letter-spacing: .2em;
    text-transform: uppercase;
  }

  h1 {
    max-width: 780px;
    margin: 14px 0 0;
    color: #f3f6fd;
    font-size: clamp(48px, 7vw, 100px);
    line-height: .84;
    letter-spacing: 0;
    text-shadow: 0 18px 42px rgba(0,0,0,.82), 0 0 24px rgba(255,255,255,.12);
  }

  p {
    max-width: 680px;
    margin: 22px 0 0;
    color: rgba(243,246,253,.58);
    font-size: 15px;
    font-weight: 760;
    line-height: 1.72;
  }
`;

const PromptWidgetWrap = styled.div<{ $wide?: boolean }>`
  display: flex;
  width: min(100%, ${({ $wide }) => ($wide ? "760px" : "330px")});
  flex-direction: column;

  .container-chat-options {
    position: relative;
    display: flex;
    overflow: hidden;
    border-radius: 16px;
    padding: 1.5px;
    background: linear-gradient(to bottom right, #7e7e7e, #363636, #363636, #363636, #363636);
    box-shadow: 0 18px 44px rgba(0,0,0,.42), inset 0 0 0 1px rgba(255,255,255,.06);
  }

  .container-chat-options::after {
    position: absolute;
    top: -10px;
    left: -10px;
    width: 30px;
    height: 30px;
    content: "";
    background: radial-gradient(ellipse at center, #ffffff, rgba(255,255,255,.3), rgba(255,255,255,.1), rgba(0,0,0,0), rgba(0,0,0,0), rgba(0,0,0,0), rgba(0,0,0,0));
    filter: blur(1px);
    pointer-events: none;
  }

  .chat {
    display: flex;
    width: 100%;
    flex-direction: column;
    overflow: hidden;
    border-radius: 15px;
    background-color: rgba(0,0,0,.5);
  }

  .chat-bot {
    position: relative;
    display: flex;
  }

  textarea {
    width: 100%;
    height: ${({ $wide }) => ($wide ? "132px" : "64px")};
    padding: 10px;
    border: none;
    border-radius: 16px;
    outline: none;
    color: #ffffff;
    background-color: transparent;
    font-size: ${({ $wide }) => ($wide ? "14px" : "12px")};
    font-weight: 500;
    line-height: 1.45;
    resize: none;
  }

  textarea::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  textarea::-webkit-scrollbar-track {
    background: transparent;
  }

  textarea::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: #888;
  }

  textarea::-webkit-scrollbar-thumb:hover {
    background: #555;
    cursor: pointer;
  }

  textarea::placeholder {
    color: #f3f6fd;
    transition: color 200ms ease, opacity 200ms ease;
  }

  textarea:focus::placeholder {
    color: #363636;
  }

  .options {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 10px;
  }

  .btns-add {
    display: flex;
    gap: 8px;
  }

  .btns-add button {
    display: flex;
    padding: 0;
    border: none;
    color: rgba(255,255,255,.1);
    background-color: transparent;
    cursor: pointer;
    transition: transform 180ms cubic-bezier(.22,1,.36,1), color 180ms ease;
  }

  .btns-add button:hover {
    color: #ffffff;
    transform: translateY(-5px);
  }

  .btn-submit {
    display: flex;
    padding: 2px;
    border: none;
    border-radius: 10px;
    outline: none;
    background-image: linear-gradient(to top, #292929, #555555, #292929);
    box-shadow: inset 0 6px 2px -4px rgba(255,255,255,.5);
    cursor: pointer;
    transition: transform 150ms cubic-bezier(.22,1,.36,1), box-shadow 150ms ease;
  }

  .btn-submit i {
    width: 30px;
    height: 30px;
    padding: 6px;
    border-radius: 10px;
    color: #8b8b8b;
    background: rgba(0,0,0,.1);
    backdrop-filter: blur(3px);
  }

  .btn-submit svg {
    transition: transform 220ms cubic-bezier(.22,1,.36,1), color 220ms ease, filter 220ms ease;
  }

  .btn-submit:hover svg {
    color: #f3f6fd;
    filter: drop-shadow(0 0 5px #ffffff);
  }

  .btn-submit:focus svg,
  .btn-submit.is-sent svg {
    color: #f3f6fd;
    filter: drop-shadow(0 0 5px #ffffff);
    transform: scale(1.2) rotate(45deg) translateX(-2px) translateY(1px);
  }

  .btn-submit:active {
    transform: scale(.92);
  }

  .tags {
    display: flex;
    gap: 4px;
    padding: 14px 0;
    color: #ffffff;
    font-size: 10px;
  }

  .tags span {
    padding: 4px 8px;
    border: 1.5px solid #363636;
    border-radius: 10px;
    background-color: #1b1b1b;
    cursor: pointer;
    user-select: none;
    transition: transform 160ms cubic-bezier(.22,1,.36,1), border-color 160ms ease, color 160ms ease;
  }

  .tags span:hover {
    border-color: #7e7e7e;
    color: #fff;
    transform: translateY(-2px);
  }
`;

const PromptActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
`;

const PromptActionButton = styled.button`
  display: inline-flex;
  min-height: 50px;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 0 18px;
  border-radius: 12px;
  color: #f3f6fd;
  background-image: linear-gradient(to top, #292929, #555555, #292929);
  box-shadow: inset 0 6px 2px -4px rgba(255,255,255,.5), 0 14px 28px rgba(0,0,0,.34);
  cursor: pointer;
  font-weight: 900;
  transition: transform 180ms cubic-bezier(.22,1,.36,1), box-shadow 180ms ease;

  &:hover {
    box-shadow: inset 0 6px 2px -4px rgba(255,255,255,.65), 0 0 18px rgba(255,255,255,.12), 0 16px 30px rgba(0,0,0,.42);
    transform: translateY(-3px);
  }

  &:active {
    transform: scale(.96);
  }
`;

const PromptMetricGrid = styled.div`
  display: grid;
  grid-template-columns: .95fr 1.15fr .9fr;
  gap: 18px;

  @media (max-width: 940px) {
    grid-template-columns: 1fr;
  }
`;

const PromptPanel = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 22px;
  padding: 22px;
  background:
    radial-gradient(circle at 0 0, rgba(255,255,255,.13), transparent 0 18%),
    linear-gradient(145deg, rgba(54,54,54,.82), rgba(12,12,12,.94));
  box-shadow:
    0 22px 52px rgba(0,0,0,.44),
    inset 0 0 0 1px rgba(255,255,255,.08),
    inset 0 12px 28px rgba(255,255,255,.03);
  transition: transform 220ms cubic-bezier(.22,1,.36,1), box-shadow 220ms ease;

  &:hover {
    box-shadow:
      0 26px 58px rgba(0,0,0,.5),
      inset 0 0 0 1px rgba(255,255,255,.12),
      inset 0 14px 32px rgba(255,255,255,.05);
    transform: translateY(-5px);
  }

  h3,
  p {
    margin: 0;
  }

  h3 {
    color: #f3f6fd;
    font-size: 18px;
    letter-spacing: .12em;
    text-transform: uppercase;
  }

  p {
    margin-top: 8px;
    color: rgba(243,246,253,.52);
    font-size: 13px;
    font-weight: 760;
    line-height: 1.5;
  }
`;

const PromptMetric = styled(PromptPanel)`
  min-height: 150px;

  span,
  strong,
  em {
    display: block;
  }

  span {
    color: rgba(243,246,253,.56);
    font-size: 12px;
    font-weight: 900;
    letter-spacing: .14em;
    text-transform: uppercase;
  }

  strong {
    margin-top: 18px;
    color: #fff;
    font-size: clamp(34px, 5vw, 58px);
    line-height: .9;
  }

  em {
    margin-top: 10px;
    color: rgba(243,246,253,.46);
    font-style: normal;
    font-weight: 900;
  }
`;

const PromptConsole = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(340px, .92fr);
  gap: 22px;
  align-items: start;

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
`;

const PromptQueue = styled.div`
  display: grid;
  gap: 13px;
  margin-top: 22px;
`;

const PromptQueueRow = styled.div`
  display: grid;
  grid-template-columns: 42px 1fr auto;
  gap: 13px;
  align-items: center;
  padding: 13px;
  border: 1.5px solid #363636;
  border-radius: 16px;
  background: rgba(27,27,27,.78);
  transition: transform 180ms cubic-bezier(.22,1,.36,1), border-color 180ms ease, background-color 180ms ease;

  &:hover {
    border-color: #7e7e7e;
    background: rgba(54,54,54,.62);
    transform: translateX(6px);
  }

  .index {
    display: grid;
    width: 42px;
    height: 42px;
    place-items: center;
    border-radius: 12px;
    color: #f3f6fd;
    background-image: linear-gradient(to top, #292929, #555555, #292929);
    box-shadow: inset 0 6px 2px -4px rgba(255,255,255,.45);
    font-weight: 900;
  }

  strong,
  span,
  em {
    display: block;
  }

  strong {
    color: #f3f6fd;
  }

  span {
    margin-top: 4px;
    color: rgba(243,246,253,.48);
    font-size: 12px;
    font-weight: 760;
  }

  em {
    color: rgba(243,246,253,.64);
    font-style: normal;
    font-weight: 900;
  }
`;

const PromptChart = styled.div`
  display: flex;
  min-height: 240px;
  align-items: end;
  gap: 12px;
  margin-top: 22px;
  padding: 20px;
  border: 1.5px solid #363636;
  border-radius: 18px;
  background: rgba(0,0,0,.42);

  .bar {
    flex: 1;
    min-width: 18px;
    border-radius: 10px 10px 4px 4px;
    background-image: linear-gradient(to top, #292929, #555555, #d4d4d4);
    box-shadow: inset 0 6px 2px -4px rgba(255,255,255,.55), 0 0 16px rgba(255,255,255,.08);
    transition: transform 180ms cubic-bezier(.22,1,.36,1), filter 180ms ease;
  }

  .bar:hover {
    filter: drop-shadow(0 0 5px rgba(255,255,255,.8));
    transform: translateY(-7px);
  }
`;

const PromptModal = styled(PromptPanel)`
  width: min(820px, 100%);
  animation: ${pop} 180ms ease both;
`;

const NeuralFrame = styled.div`
  display: grid;
  gap: 24px;
  width: 100%;
  max-width: none;
  margin: 0;
  color: #ddd;
  font-family: "Rajdhani", "Avenir Next", system-ui, sans-serif;
`;

const NeuralHero = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: minmax(420px, .82fr) minmax(0, 1.18fr);
  gap: clamp(24px, 5vw, 62px);
  align-items: center;
  min-height: 700px;
  overflow: hidden;
  border-radius: 34px;
  padding: clamp(24px, 5vw, 58px);
  background:
    radial-gradient(circle at 28% 24%, rgba(212,181,255,.16), transparent 0 25%),
    radial-gradient(circle at 82% 16%, rgba(147,112,219,.18), transparent 0 25%),
    linear-gradient(135deg, rgba(26,26,26,.96), rgba(7,7,9,.98));
  box-shadow:
    0 30px 78px rgba(0,0,0,.62),
    inset 0 0 0 1px rgba(255,255,255,.08),
    inset 0 -86px 126px rgba(0,0,0,.5);

  @media (max-width: 1140px) {
    grid-template-columns: 1fr;
  }
`;

const NeuralStage = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  min-height: 590px;
  place-items: center;
  overflow: hidden;
  border-radius: 30px;
  background:
    radial-gradient(circle at 50% 0%, rgba(212,181,255,.1), transparent 0 34%),
    linear-gradient(180deg, rgba(255,255,255,.05), rgba(0,0,0,.28));
  box-shadow:
    inset 0 0 0 1px rgba(255,255,255,.08),
    inset 0 28px 60px rgba(255,255,255,.04),
    inset 0 -44px 80px rgba(0,0,0,.5);
`;

const NeuralHeroCopy = styled.div`
  position: relative;
  z-index: 1;

  > span {
    color: #d4b5ff;
    font-size: 12px;
    font-weight: 900;
    letter-spacing: .2em;
    text-transform: uppercase;
  }

  h1 {
    max-width: 800px;
    margin: 14px 0 0;
    color: #f4efff;
    font-size: clamp(50px, 7vw, 104px);
    line-height: .84;
    letter-spacing: 0;
    text-shadow: 0 0 20px rgba(212,181,255,.24), 0 20px 48px rgba(0,0,0,.82);
  }

  p {
    max-width: 700px;
    margin: 22px 0 0;
    color: rgba(244,239,255,.58);
    font-size: 15px;
    font-weight: 760;
    line-height: 1.72;
  }
`;

const NeuralCardWrap = styled.div<{ $compact?: boolean }>`
  position: relative;
  width: ${({ $compact }) => ($compact ? "288px" : "320px")};
  height: ${({ $compact }) => ($compact ? "450px" : "500px")};

  .card {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 20px;
    cursor: pointer;
    background: radial-gradient(circle at 50% 0%, #2a2a2a 0%, #1a1a1a 64%);
    box-shadow:
      inset 0 1.01rem .2rem -1rem rgba(255,255,255,0),
      inset 0 -1.01rem .2rem -1rem rgba(0,0,0,0),
      0 -1.02rem .2rem -1rem rgba(255,255,255,0),
      0 1rem .2rem -1rem rgba(0,0,0,0),
      0 0 0 1px rgba(255,255,255,.13),
      0 20px 60px rgba(0,0,0,.5),
      0 4px 4px 0 rgba(0,0,0,.26),
      0 0 0 1px #222;
    transition: transform 320ms cubic-bezier(.22,1,.36,1), box-shadow 320ms ease;
  }

  .card::before {
    position: absolute;
    inset: -1rem;
    content: "";
    z-index: 0;
    border-radius: 2.6rem;
    clip-path: polygon(4rem 0, 0 0, 0 4rem, 4rem 4rem, 4rem calc(100% - 4rem), 0 calc(100% - 4rem), 0 100%, 4rem 100%, 4rem calc(100% - 4rem), calc(100% - 4rem) calc(100% - 4rem), calc(100% - 4rem) 100%, 100% 100%, 100% calc(100% - 4rem), calc(100% - 4rem) calc(100% - 4rem), calc(100% - 4rem) 4rem, 100% 4rem, 100% 0, calc(100% - 4rem) 0, calc(100% - 4rem) 4rem, 4rem 4rem);
    box-shadow: inset 0 0 0 .06rem rgba(255,255,255,.13);
    transition: inset 320ms cubic-bezier(.22,1,.36,1), clip-path 320ms ease, border-radius 320ms ease, box-shadow 320ms ease;
  }

  @media (hover: hover) and (pointer: fine) {
    .card:hover {
      box-shadow:
        inset 0 1.01rem .1rem -1rem rgba(255,255,255,.66),
        inset 0 -4rem 3rem -3rem rgba(0,0,0,.66),
        0 -1.02rem .2rem -1rem rgba(255,255,255,.27),
        0 1rem .2rem -1rem #000,
        0 0 0 1px rgba(255,255,255,.2),
        0 30px 80px rgba(255,255,255,.1),
        0 4px 4px 0 rgba(0,0,0,.26),
        0 0 0 1px #333;
      transform: translateY(-10px) scale(1.02);
    }

    .card:hover::before {
      inset: -.5rem;
      border-radius: 2.2rem;
      clip-path: polygon(8rem 0, 0 0, 0 8rem, 8rem 8rem, 8rem calc(100% - 8rem), 0 calc(100% - 8rem), 0 100%, 8rem 100%, 8rem calc(100% - 8rem), calc(100% - 8rem) calc(100% - 8rem), calc(100% - 8rem) 100%, 100% 100%, 100% calc(100% - 8rem), calc(100% - 8rem) calc(100% - 8rem), calc(100% - 8rem) 8rem, 100% 8rem, 100% 0, calc(100% - 8rem) 0, calc(100% - 8rem) 8rem, 8rem 8rem);
      box-shadow: inset 0 0 0 .08rem rgba(255,255,255,.08);
    }
  }

  .light-layer {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    perspective: 400px;
    transform-style: preserve-3d;
  }

  .luminous-slit {
    position: absolute;
    right: 0;
    left: 0;
    top: 52%;
    width: 64%;
    height: 1.2rem;
    margin: auto;
    background: radial-gradient(ellipse at center, #2a2a2a 0%, #1a1a1a 100%);
    box-shadow: 0 0 4px 0 rgba(42,42,42,.3);
    transform: rotateX(-76deg);
    transition: background 320ms ease, box-shadow 320ms ease;
  }

  .card:hover .luminous-slit {
    background: radial-gradient(ellipse at center, #d4b5ff 0%, #9370db 100%);
    box-shadow: 0 0 12px 3px rgba(212,181,255,.6);
  }

  .lumen,
  .darken {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    margin: auto;
    pointer-events: none;
    perspective: 400px;
  }

  .lumen {
    opacity: 0;
    transition: opacity 320ms ease;
  }

  .card:hover .lumen {
    opacity: .5;
  }

  .lumen .min,
  .lumen .mid,
  .lumen .hi {
    position: absolute;
    right: 0;
    left: 0;
    margin: auto;
    border-radius: 100% 100% 0 0;
    background: linear-gradient(rgba(212,181,255,0), rgba(212,181,255,.6));
  }

  .lumen .min {
    top: 42%;
    width: 70%;
    height: 3rem;
    opacity: .4;
    transform: rotateX(-42deg);
  }

  .lumen .mid {
    top: 32%;
    width: 74%;
    height: 13rem;
    opacity: .8;
    filter: blur(1rem);
    transform: rotateX(-42deg);
  }

  .lumen .hi {
    top: 27%;
    width: 50%;
    height: 13rem;
    opacity: .6;
    filter: blur(1rem);
    transform: rotateX(22deg);
  }

  .darken {
    opacity: .3;
    transition: opacity 320ms ease;
  }

  .card:hover .darken {
    opacity: .8;
  }

  .darken .sl,
  .darken .ll {
    position: absolute;
    right: 0;
    left: 0;
    margin: auto;
    border-radius: 0 0 100% 100%;
    transition: opacity 320ms ease;
  }

  .darken .sl {
    top: 68%;
    width: 64%;
    height: 10rem;
    background: linear-gradient(#000, rgba(0,0,0,0));
    filter: blur(.2rem);
    opacity: .1;
    transform: rotateX(-22deg);
  }

  .card:hover .darken .sl {
    opacity: .3;
  }

  .darken .ll {
    top: 72%;
    width: 62%;
    height: 10rem;
    background: linear-gradient(rgba(0,0,0,.66), rgba(0,0,0,0));
    filter: blur(.8rem);
    opacity: .2;
    transform: rotateX(22deg);
  }

  .card:hover .darken .ll {
    opacity: 1;
  }

  .card-header,
  .card-image,
  .stats,
  .ability,
  .card-footer {
    position: relative;
    z-index: 2;
  }

  .card-header {
    display: flex;
    gap: 15px;
    align-items: center;
    padding: 20px 20px 10px;
  }

  .cost {
    display: flex;
    width: 45px;
    height: 45px;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: #999;
    background: #2a2a2a;
    box-shadow: 0 0 20px rgba(0,0,0,.5), inset 0 0 10px rgba(255,255,255,.1);
    font-size: 24px;
    font-weight: 900;
    transition: color 320ms ease, filter 320ms ease;
  }

  .card:hover .cost {
    color: #fff;
    filter: brightness(1.3);
  }

  .title-group {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .card-title {
    color: #ddd;
    font-size: ${({ $compact }) => ($compact ? "18px" : "20px")};
    font-weight: 900;
    letter-spacing: 1px;
    text-shadow: 0 0 10px rgba(255,255,255,.3);
  }

  .card-type {
    margin: 0;
    color: #777;
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .rarity {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 5px 12px;
    border-radius: 15px;
    color: #999;
    background: #333;
    box-shadow: 0 0 10px rgba(0,0,0,.5);
    font-size: 10px;
    font-weight: 900;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .card-image {
    display: flex;
    height: ${({ $compact }) => ($compact ? "150px" : "180px")};
    align-items: center;
    justify-content: center;
    margin: 15px;
    overflow: hidden;
    border-radius: 10px;
    background: linear-gradient(135deg, rgba(255,255,255,.03) 0%, rgba(255,255,255,.05) 50%, rgba(255,255,255,.03) 100%);
    box-shadow: inset 0 0 30px rgba(0,0,0,.3), 0 5px 15px rgba(0,0,0,.5);
  }

  .card-image svg {
    width: ${({ $compact }) => ($compact ? "104px" : "120px")};
    height: ${({ $compact }) => ($compact ? "104px" : "120px")};
    filter: drop-shadow(0 0 10px rgba(255,255,255,.3));
    transition: transform 320ms cubic-bezier(.22,1,.36,1), filter 320ms ease;
  }

  .card:hover .card-image svg {
    filter: drop-shadow(0 0 25px rgba(255,255,255,.6));
    transform: scale(1.05);
  }

  .lightning-bolt {
    fill: url(#boltGradient);
    animation: neural-pulse-glow 2s ease-in-out infinite;
  }

  .energy-ring {
    transform-origin: center;
    fill: none;
    stroke: url(#ringGradient);
    stroke-width: 2;
    animation: neural-rotate-ring 8s linear infinite;
  }

  .particle {
    fill: #888;
    animation: neural-float-particle 3s ease-in-out infinite;
  }

  .stats {
    display: flex;
    justify-content: space-around;
    padding: 0 20px;
    margin: 15px 0;
  }

  .stat {
    text-align: center;
  }

  .stat-label {
    color: #888;
    font-size: 10px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .stat-value {
    margin-top: 5px;
    color: #bbb;
    font-size: 20px;
    font-weight: 900;
    text-shadow: 0 0 10px rgba(255,255,255,.3);
  }

  .ability {
    margin: 15px 20px;
    padding: ${({ $compact }) => ($compact ? "12px" : "15px")};
    border: 1px solid rgba(255,255,255,.1);
    border-radius: 10px;
    background: rgba(255,255,255,.02);
  }

  .ability::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    border-radius: 10px 0 0 10px;
    background: linear-gradient(180deg, #888, #444);
    content: "";
  }

  .ability-name {
    margin-bottom: 8px;
    color: #999;
    font-size: ${({ $compact }) => ($compact ? "12px" : "14px")};
    font-weight: 900;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .ability-text {
    color: #aaa;
    font-size: ${({ $compact }) => ($compact ? "11px" : "12px")};
    line-height: 1.6;
  }

  .ability-text strong {
    color: #ddd;
    text-shadow: 0 0 5px rgba(255,255,255,.3);
  }

  .card-footer {
    position: absolute;
    right: 20px;
    bottom: 8px;
    left: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #666;
    font-size: 10px;
  }

  .scanlines {
    position: absolute;
    inset: 0;
    z-index: 3;
    pointer-events: none;
    opacity: .3;
    background: repeating-linear-gradient(0deg, rgba(0,0,0,.1) 0px, transparent 1px, transparent 2px, rgba(0,0,0,.1) 3px);
  }

  @keyframes neural-pulse-glow {
    0%, 100% { opacity: .8; }
    50% { opacity: 1; }
  }

  @keyframes neural-rotate-ring {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes neural-float-particle {
    0%, 100% { opacity: .3; transform: translateY(0); }
    50% { opacity: .7; transform: translateY(-8px); }
  }
`;

const NeuralActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
`;

const NeuralActionButton = styled.button`
  display: inline-flex;
  min-height: 50px;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 0 18px;
  border: 1px solid rgba(212,181,255,.28);
  border-radius: 14px;
  color: #f4efff;
  background: linear-gradient(135deg, rgba(42,42,42,.95), rgba(147,112,219,.28));
  box-shadow: 0 14px 30px rgba(0,0,0,.36), inset 0 0 0 1px rgba(255,255,255,.08);
  cursor: pointer;
  font-weight: 900;
  transition: transform 180ms cubic-bezier(.22,1,.36,1), box-shadow 180ms ease, border-color 180ms ease;

  &:hover {
    border-color: rgba(212,181,255,.56);
    box-shadow: 0 0 24px rgba(212,181,255,.18), 0 16px 32px rgba(0,0,0,.42);
    transform: translateY(-3px);
  }

  &:active {
    transform: scale(.97);
  }
`;

const NeuralMetricGrid = styled.div`
  display: grid;
  grid-template-columns: .85fr 1.3fr .85fr;
  gap: 18px;

  @media (max-width: 940px) {
    grid-template-columns: 1fr;
  }
`;

const NeuralPanel = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  padding: 22px;
  background:
    radial-gradient(circle at 50% 0%, rgba(212,181,255,.11), transparent 0 34%),
    linear-gradient(180deg, rgba(42,42,42,.88), rgba(16,16,18,.96));
  box-shadow:
    0 22px 54px rgba(0,0,0,.48),
    inset 0 0 0 1px rgba(255,255,255,.08),
    inset 0 -40px 60px rgba(0,0,0,.34);
  transition: transform 220ms cubic-bezier(.22,1,.36,1), box-shadow 220ms ease;

  &:hover {
    box-shadow: 0 26px 60px rgba(0,0,0,.54), 0 0 28px rgba(212,181,255,.11), inset 0 0 0 1px rgba(255,255,255,.13);
    transform: translateY(-5px);
  }

  h3,
  p {
    margin: 0;
  }

  h3 {
    color: #f4efff;
    font-size: 18px;
    letter-spacing: .12em;
    text-transform: uppercase;
  }

  p {
    margin-top: 8px;
    color: rgba(244,239,255,.52);
    font-size: 13px;
    font-weight: 760;
    line-height: 1.5;
  }
`;

const NeuralMetric = styled(NeuralPanel)`
  min-height: 150px;

  span,
  strong,
  em {
    display: block;
  }

  span {
    color: #d4b5ff;
    font-size: 12px;
    font-weight: 900;
    letter-spacing: .14em;
    text-transform: uppercase;
  }

  strong {
    margin-top: 18px;
    color: #ddd;
    font-size: clamp(34px, 5vw, 58px);
    line-height: .9;
    text-shadow: 0 0 10px rgba(255,255,255,.3);
  }

  em {
    margin-top: 10px;
    color: rgba(244,239,255,.48);
    font-style: normal;
    font-weight: 900;
  }
`;

const NeuralConsole = styled.div`
  display: grid;
  grid-template-columns: minmax(0, .92fr) minmax(360px, 1.08fr);
  gap: 22px;
  align-items: start;

  @media (max-width: 1080px) {
    grid-template-columns: 1fr;
  }
`;

const NeuralDeckList = styled.div`
  display: grid;
  gap: 13px;
  margin-top: 22px;
`;

const NeuralDeckRow = styled.div`
  display: grid;
  grid-template-columns: 48px 1fr auto;
  gap: 13px;
  align-items: center;
  padding: 13px;
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 16px;
  background: rgba(255,255,255,.025);
  transition: transform 180ms cubic-bezier(.22,1,.36,1), border-color 180ms ease, box-shadow 180ms ease;

  &:hover {
    border-color: rgba(212,181,255,.42);
    box-shadow: 0 0 18px rgba(212,181,255,.1);
    transform: translateX(7px);
  }

  .cost {
    display: grid;
    width: 48px;
    height: 48px;
    place-items: center;
    border-radius: 50%;
    color: #ddd;
    background: #2a2a2a;
    box-shadow: inset 0 0 10px rgba(255,255,255,.1), 0 0 20px rgba(0,0,0,.5);
    font-weight: 900;
  }

  strong,
  span,
  em {
    display: block;
  }

  strong {
    color: #ddd;
  }

  span {
    margin-top: 4px;
    color: #777;
    font-size: 12px;
    font-weight: 760;
    letter-spacing: .08em;
    text-transform: uppercase;
  }

  em {
    color: #d4b5ff;
    font-style: normal;
    font-weight: 900;
  }
`;

const NeuralStatsChart = styled.div`
  display: flex;
  min-height: 240px;
  align-items: end;
  gap: 12px;
  margin-top: 22px;
  padding: 20px;
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 18px;
  background: rgba(255,255,255,.02);
  box-shadow: inset 0 0 30px rgba(0,0,0,.3);

  .bar {
    flex: 1;
    min-width: 18px;
    border-radius: 12px 12px 4px 4px;
    background: linear-gradient(180deg, #d4b5ff, #9370db 42%, #2a2a2a);
    box-shadow: 0 0 18px rgba(212,181,255,.16), inset 0 0 10px rgba(255,255,255,.1);
    transition: transform 180ms cubic-bezier(.22,1,.36,1), filter 180ms ease;
  }

  .bar:hover {
    filter: drop-shadow(0 0 8px rgba(212,181,255,.7));
    transform: translateY(-8px);
  }
`;

const NeuralModal = styled(NeuralPanel)`
  width: min(760px, 100%);
  animation: ${pop} 180ms ease both;
`;

const RequestCommandBoard = styled.div`
  display: grid;
  grid-template-columns: minmax(260px, .7fr) minmax(360px, .95fr) minmax(240px, .52fr);
  grid-template-rows: auto minmax(440px, 1fr) minmax(150px, auto);
  gap: 16px;
  min-height: 100vh;
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 0;
  overflow: visible;
  background: transparent;
  box-shadow: none;
  backdrop-filter: none;

  > :nth-child(2) {
    grid-column: 1;
    grid-row: 2 / 4;
  }

  > :nth-child(3) {
    grid-column: 2;
    grid-row: 2;
  }

  > :nth-child(4) {
    grid-column: 3;
    grid-row: 2 / 4;
  }

  > :nth-child(5) {
    grid-column: 2;
    grid-row: 3;
  }

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;

    > * {
      grid-column: auto;
      grid-row: auto;
    }
  }
`;

const RequestBoardHeader = styled(RequestPanel)`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 0 2px 4px;
  overflow: visible;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
  backdrop-filter: none;

  strong,
  span {
    display: block;
  }

  strong {
    color: rgba(255,255,255,.96);
    font-size: clamp(22px, 2.4vw, 32px);
    line-height: 1;
  }

  span {
    color: #ff8800;
    font-size: 12px;
    font-weight: 900;
    letter-spacing: .16em;
    text-transform: uppercase;
  }
`;

const RequestControlStage = styled(RequestPanel)`
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  gap: 18px;
  min-height: 100%;
  align-items: center;
`;

const RequestGlitchRail = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  width: 100%;

  button {
    position: relative;
    min-height: 76px;
    overflow: hidden;
    border-radius: 18px;
    padding: 12px;
    color: rgba(255,255,255,.9);
    background: rgba(19,19,21,.58);
    box-shadow:
      inset 0 0 0 .06em rgba(255,255,255,.08),
      inset 0 -.7em 1.2em rgba(0,0,0,.28);
    cursor: pointer;
    text-align: left;
    transition: transform 220ms cubic-bezier(.23,1,.32,1), box-shadow 220ms ease, background 220ms ease;
  }

  button::before {
    position: absolute;
    inset: 0 auto 0 -40%;
    width: 36%;
    content: "";
    background: linear-gradient(90deg, transparent, var(--rail-accent), transparent);
    opacity: .34;
    transform: skewX(-18deg);
    transition: transform 420ms cubic-bezier(.23,1,.32,1), opacity 180ms ease;
  }

  button:hover {
    transform: translateY(-5px);
    background: rgba(34,34,41,.72);
    box-shadow:
      inset 0 0 0 .06em rgba(255,255,255,.13),
      0 0 26px color-mix(in srgb, var(--rail-accent) 36%, transparent);
  }

  button:hover::before {
    opacity: .72;
    transform: translateX(420%) skewX(-18deg);
  }

  button:active {
    transform: translateY(1px) scale(.98);
  }

  strong,
  span {
    position: relative;
    z-index: 1;
    display: block;
  }

  strong {
    font-size: 12px;
    letter-spacing: .08em;
    text-transform: uppercase;
  }

  span {
    margin-top: 9px;
    color: var(--rail-accent);
    font-size: 18px;
    font-weight: 900;
  }
`;

const RequestBubblePanel = styled(RequestPanel)`
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  min-height: 100%;
  max-height: 520px;
  overflow: auto;
`;

const RequestQueuePanel = styled(RequestPanel)`
  display: grid;
  align-content: start;
  gap: 14px;
  max-height: 520px;
  overflow: auto;
`;

const RequestStatusTray = styled(RequestPanel)`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 12px;
  align-items: start;
  padding: 8px 10px;
  max-height: 100%;
  overflow: auto;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const UnlockVaultBoard = styled.div`
  display: grid;
  grid-template-columns: minmax(300px, .78fr) minmax(280px, .62fr) minmax(260px, .5fr);
  grid-template-rows: auto minmax(470px, 1fr) minmax(150px, auto);
  gap: 14px;
  min-height: 100vh;
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 0;
  overflow: visible;
  background: transparent;
  box-shadow: none;

  > :nth-child(2) {
    grid-column: 1;
    grid-row: 2;
  }

  > :nth-child(3) {
    grid-column: 1 / 3;
    grid-row: 3;
  }

  > :nth-child(4) {
    grid-column: 2;
    grid-row: 2;
  }

  > :nth-child(5) {
    grid-column: 3;
    grid-row: 2 / 4;
  }

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;

    > * {
      grid-column: auto;
      grid-row: auto;
    }
  }
`;

const UnlockVaultHeader = styled(UnlockPanel)`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 0 2px 4px;
  overflow: visible;
  border-radius: 0;
  background: transparent;
  box-shadow: none;

  strong,
  span {
    display: block;
  }

  strong {
    color: #30424a;
    font-size: clamp(24px, 3vw, 42px);
    line-height: 1;
  }

  span {
    color: #7a929d;
    font-size: 12px;
    font-weight: 900;
    letter-spacing: .16em;
    text-transform: uppercase;
  }
`;

const UnlockSwipeStage = styled(UnlockPanel)`
  display: grid;
  min-height: 150px;
  place-items: center;
  padding: 8px;
`;

const UnlockRadarPanel = styled(UnlockPanel)`
  min-height: 470px;
  max-height: 540px;
  overflow: hidden;
`;

const UnlockVaultTray = styled(UnlockPanel)`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 12px;
  align-items: start;
  max-height: 100%;
  overflow: auto;
  padding: 12px 14px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const UnlockKeySlots = styled.div`
  display: grid;
  gap: 10px;

  button {
    display: grid;
    grid-template-columns: 34px 1fr auto;
    gap: 10px;
    align-items: center;
    min-height: 58px;
    padding: 9px 10px;
    border-radius: 22px;
    color: #30424a;
    background: rgba(255,255,255,.24);
    box-shadow:
      0 1px 0 1px #c7cfd2 inset,
      0 -1px 0 1px rgba(255,255,255,.65) inset,
      0 12px 22px rgba(0,0,0,.05);
    cursor: pointer;
    text-align: left;
    transition: transform 180ms cubic-bezier(.22,1,.36,1), box-shadow 180ms ease;
  }

  button:hover {
    box-shadow:
      -4px -4px 10px rgba(255,255,255,.9),
      4px 4px 14px rgba(0,0,0,.14),
      0 0 22px rgba(255,205,88,.22);
    transform: translateX(5px);
  }

  i {
    display: grid;
    width: 34px;
    height: 34px;
    place-items: center;
    border-radius: 50%;
    background: var(--slot-color);
    box-shadow:
      inset 0 0 0 3px rgba(255,255,255,.45),
      0 0 18px color-mix(in srgb, var(--slot-color) 58%, transparent);
  }

  i::before {
    width: 10px;
    height: 10px;
    content: "";
    border-radius: 50%;
    background: rgba(48,66,74,.42);
  }

  strong,
  span,
  em {
    display: block;
  }

  span,
  em {
    color: rgba(48,66,74,.58);
    font-size: 11px;
    font-weight: 900;
  }

  em {
    color: #30424a;
    font-style: normal;
  }
`;

const ConfirmApprovalBoard = styled.div`
  display: grid;
  grid-template-columns: minmax(320px, .84fr) minmax(280px, .72fr) minmax(0, .6fr);
  grid-template-rows: auto minmax(320px, auto) minmax(150px, auto);
  gap: 16px;
  min-height: 100vh;
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 0;
  overflow: visible;
  background: transparent;
  box-shadow: none;

  > :nth-child(2) {
    grid-column: 1;
    grid-row: 2 / 4;
  }

  > :nth-child(3) {
    grid-column: 2;
    grid-row: 2;
  }

  > :nth-child(4) {
    grid-column: 3;
    grid-row: 2 / 4;
  }

  > :nth-child(5) {
    grid-column: 2;
    grid-row: 3;
  }

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;

    > * {
      grid-column: auto;
      grid-row: auto;
    }
  }
`;

const ConfirmBoardHeader = styled(ConfirmPanel)`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 0 2px 4px;
  overflow: visible;
  border-radius: 0;
  background: transparent;
  box-shadow: none;

  strong,
  span {
    display: block;
  }

  strong {
    color: #435260;
    font-size: clamp(22px, 2.4vw, 32px);
    line-height: 1;
  }

  span {
    color: #41c5a7;
    font-size: 12px;
    font-weight: 900;
    letter-spacing: .16em;
    text-transform: uppercase;
  }
`;

const ConfirmSwipeStage = styled(ConfirmPanel)`
  display: grid;
  grid-template-rows: minmax(0, .9fr) auto auto;
  gap: 18px;
  min-height: 100%;
  align-items: center;
`;

const ConfirmDentStack = styled.div`
  display: grid;
  gap: 12px;
  width: 100%;

  button {
    display: grid;
    grid-template-columns: 38px 1fr auto;
    gap: 12px;
    align-items: center;
    min-height: 64px;
    padding: 10px 12px;
    border-radius: 24px;
    color: #435260;
    background: #e0e5ec;
    box-shadow:
      inset 3px 3px 6px rgba(0,0,0,.1),
      inset -3px -3px 8px rgba(255,255,255,.94);
    cursor: pointer;
    transition: transform 200ms ease, box-shadow 220ms ease, color 220ms ease;
  }

  button:hover {
    color: #41a88f;
    transform: translateX(6px);
    box-shadow:
      -4px -4px 9px rgba(255,255,255,.86),
      4px 4px 10px rgba(0,0,0,.1);
  }

  button:active {
    transform: translateX(3px) scale(.98);
    box-shadow:
      inset 5px 5px 9px rgba(0,0,0,.13),
      inset -5px -5px 10px rgba(255,255,255,1);
  }

  i {
    display: grid;
    width: 38px;
    height: 38px;
    place-items: center;
    border-radius: 50%;
    background: linear-gradient(145deg, #86e3ce, #a1ffc0);
    box-shadow:
      0 9px 16px rgba(65,197,167,.22),
      inset 1px 1px 1px rgba(255,255,255,.55);
  }

  i::before {
    width: 14px;
    height: 8px;
    content: "";
    border-left: 3px solid #fff;
    border-bottom: 3px solid #fff;
    transform: rotate(-45deg) translate(1px, -1px);
  }

  strong,
  span,
  em {
    display: block;
  }

  strong {
    font-size: 13px;
  }

  span,
  em {
    color: #8a9baf;
    font-size: 11px;
    font-weight: 900;
  }

  em {
    color: #41a88f;
    font-style: normal;
  }
`;

const ConfirmAreaPanel = styled(ConfirmPanel)`
  display: grid;
  gap: 12px;
  min-height: 260px;
`;

const ConfirmStagePills = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  width: 100%;

  button {
    display: grid;
    min-height: 62px;
    align-content: center;
    gap: 6px;
    border-radius: 20px;
    padding: 10px;
    color: #435260;
    background: #e0e5ec;
    box-shadow:
      inset 4px 4px 8px rgba(0,0,0,.08),
      inset -4px -4px 9px rgba(255,255,255,.92);
    cursor: pointer;
    text-align: left;
    transition: transform 190ms cubic-bezier(.22,1,.36,1), box-shadow 190ms ease, color 190ms ease;
  }

  button:hover {
    color: #41a88f;
    box-shadow:
      -4px -4px 10px rgba(255,255,255,.82),
      4px 4px 12px rgba(0,0,0,.1);
    transform: translateY(-4px);
  }

  strong,
  span {
    display: block;
  }

  strong {
    font-size: 18px;
    line-height: 1;
  }

  span {
    color: #8a9baf;
    font-size: 10px;
    font-weight: 900;
    letter-spacing: .08em;
    text-transform: uppercase;
  }

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const ConfirmTimeline = styled.div`
  display: grid;
  gap: 8px;
  padding: 12px;
  border-radius: 24px;
  background: #e0e5ec;
  box-shadow:
    inset 5px 5px 10px rgba(0,0,0,.08),
    inset -5px -5px 12px rgba(255,255,255,.9);

  button {
    display: grid;
    grid-template-columns: 28px 1fr auto;
    gap: 10px;
    align-items: center;
    min-height: 42px;
    border-radius: 16px;
    padding: 7px 9px;
    color: #435260;
    background: rgba(255,255,255,.28);
    cursor: pointer;
    text-align: left;
    transition: transform 170ms cubic-bezier(.22,1,.36,1), background-color 170ms ease;
  }

  button:hover {
    background: rgba(255,255,255,.54);
    transform: translateX(5px);
  }

  i {
    display: grid;
    width: 28px;
    height: 28px;
    place-items: center;
    border-radius: 50%;
    background: linear-gradient(145deg, #86e3ce, #a1ffc0);
    box-shadow: 0 7px 14px rgba(65,197,167,.18);
  }

  i::before {
    width: 8px;
    height: 8px;
    content: "";
    border-radius: 50%;
    background: #fff;
  }

  strong,
  span,
  em {
    display: block;
  }

  strong {
    font-size: 12px;
  }

  span,
  em {
    color: #8a9baf;
    font-size: 10px;
    font-weight: 900;
  }

  em {
    color: #41a88f;
    font-style: normal;
  }
`;

const ConfirmInsightPanel = styled(ConfirmPanel)`
  min-height: 0;
  overflow: auto;
`;

const ConfirmApprovalTray = styled(ConfirmPanel)`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 12px;
  align-items: start;
  max-height: 100%;
  overflow: auto;
  padding: 10px 12px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const FilamentBench = styled.div`
  display: grid;
  grid-template-columns: minmax(260px, .72fr) minmax(0, 1fr);
  grid-template-rows: auto minmax(370px, 1fr) minmax(160px, auto) minmax(118px, auto);
  gap: 16px;
  min-height: 100vh;
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 0;
  overflow: visible;
  background: transparent;
  box-shadow: none;

  > :nth-child(2) {
    grid-column: 1;
    grid-row: 2 / 4;
  }

  > :nth-child(3) {
    grid-column: 2;
    grid-row: 2;
  }

  > :nth-child(4) {
    grid-column: 2;
    grid-row: 3;
    min-height: 0;
  }

  > :nth-child(5) {
    grid-column: 1 / -1;
    grid-row: 4;
  }

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;

    > * {
      grid-column: auto;
      grid-row: auto;
    }
  }
`;

const FilamentBenchHeader = styled(FilamentPanel)`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 0 2px 4px;
  overflow: visible;
  border-radius: 0;
  background: transparent;
  box-shadow: none;

  strong,
  span {
    display: block;
  }

  strong {
    color: #fff6e8;
    font-size: clamp(24px, 3vw, 42px);
    line-height: 1;
    text-shadow: 0 0 28px rgba(255,136,0,.24);
  }

  span {
    color: #ff8800;
    font-size: 12px;
    font-weight: 900;
    letter-spacing: .16em;
    text-transform: uppercase;
  }
`;

const FilamentLampDock = styled(FilamentPanel)`
  display: grid;
  align-content: stretch;
  justify-items: center;
  gap: 18px;
  min-height: clamp(330px, 42vh, 420px);
`;

const FilamentNodeStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  width: 100%;

  button {
    display: grid;
    min-height: 84px;
    align-content: center;
    gap: 7px;
    border-radius: 22px;
    padding: 12px;
    color: #fff6e8;
    background:
      linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.02)),
      rgba(0,0,0,.2);
    box-shadow:
      inset 8px -15px 15px -14px black,
      inset 8px -10px 12px -14px rgba(255,255,255,.26),
      0 12px 28px rgba(0,0,0,.24);
    cursor: pointer;
    transition: transform 220ms cubic-bezier(.5,2,.3,.8), box-shadow 220ms ease, filter 220ms ease;
  }

  button:hover {
    transform: translateY(-6px) scale(1.03);
    filter: brightness(1.1);
    box-shadow:
      inset 8px -15px 15px -14px black,
      inset 8px -10px 12px -14px rgba(255,255,255,.34),
      0 0 26px rgba(255,136,0,.26);
  }

  button:active {
    transform: translateY(1px) scale(.98);
  }

  strong,
  span {
    display: block;
  }

  strong {
    color: #ff8800;
    font-size: 20px;
    line-height: 1;
  }

  span {
    color: rgba(255,246,232,.58);
    font-size: 10px;
    font-weight: 900;
    letter-spacing: .1em;
    text-transform: uppercase;
  }
`;

const FilamentDiagnostics = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  width: 100%;

  button {
    position: relative;
    display: grid;
    min-height: 58px;
    align-content: center;
    gap: 5px;
    overflow: hidden;
    border-radius: 18px;
    padding: 9px 10px;
    color: #fff6e8;
    background:
      linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.02)),
      rgba(0,0,0,.22);
    box-shadow:
      inset 8px -14px 14px -14px #000,
      inset 8px -8px 10px -14px rgba(255,255,255,.3),
      0 10px 22px rgba(0,0,0,.2);
    cursor: pointer;
    text-align: left;
    transition: transform 210ms cubic-bezier(.5,2,.3,.8), box-shadow 210ms ease, filter 210ms ease;
  }

  button::after {
    position: absolute;
    inset: auto 8px 8px;
    height: 4px;
    content: "";
    border-radius: 999px;
    background: var(--filament-accent);
    box-shadow: 0 0 12px var(--filament-accent);
    transform: scaleX(var(--filament-load));
    transform-origin: left;
  }

  button:hover {
    filter: brightness(1.12);
    box-shadow:
      inset 8px -14px 14px -14px #000,
      inset 8px -8px 10px -14px rgba(255,255,255,.42),
      0 0 22px color-mix(in srgb, var(--filament-accent) 42%, transparent);
    transform: translateY(-5px) scale(1.03);
  }

  strong,
  span {
    display: block;
  }

  strong {
    color: var(--filament-accent);
    font-size: 17px;
    line-height: 1;
  }

  span {
    color: rgba(255,246,232,.56);
    font-size: 9px;
    font-weight: 900;
    letter-spacing: .08em;
    text-transform: uppercase;
  }

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const FilamentChartDeck = styled(FilamentPanel)`
  min-height: clamp(260px, 34vh, 360px);
`;

const FilamentThermalRack = styled.div`
  display: grid;
  grid-template-columns: minmax(0, .78fr) minmax(0, 1fr);
  gap: 12px;
  min-height: 0;
  overflow: auto;

  > ${FilamentPanel} {
    min-height: 0;
    padding: 16px;
  }

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const FilamentStatusTray = styled(FilamentPanel)`
  display: grid;
  grid-template-columns: minmax(160px, .34fr) minmax(0, 1fr) auto;
  gap: 16px;
  align-items: center;
  min-width: 0;
  max-height: 100%;
  overflow: auto;
  padding: 16px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const BatteryRack = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-template-rows: auto minmax(470px, 1fr) minmax(170px, auto);
  gap: 16px;
  min-height: calc(100vh - 24px);
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 0;
  overflow: visible;
  background: transparent;
  box-shadow: none;

  > :nth-child(2) {
    grid-column: 1 / 5;
    grid-row: 2;
    align-self: stretch;
  }

  > :nth-child(3) {
    grid-column: 5 / -1;
    grid-row: 2;
  }

  > :nth-child(4) {
    grid-column: 1 / 7;
    grid-row: 3;
    min-height: 0;
  }

  > :nth-child(5) {
    grid-column: 7 / -1;
    grid-row: 3;
    min-height: 0;
  }

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;

    > * {
      grid-column: auto;
      grid-row: auto;
    }
  }
`;

const BatteryRackHeader = styled(BatteryPanel)`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 0 2px 4px;
  overflow: visible;
  border-radius: 0;
  background: transparent;
  box-shadow: none;

  strong,
  span {
    display: block;
  }

  strong {
    color: #fff;
    font-size: clamp(24px, 3vw, 42px);
    line-height: 1;
  }

  span {
    color: #85ffdb;
    font-size: 12px;
    font-weight: 900;
    letter-spacing: .16em;
    text-transform: uppercase;
  }
`;

const BatteryCellRack = styled(BatteryPanel)`
  display: grid;
  grid-template-rows: auto auto minmax(0, 1fr) auto;
  min-height: 100%;
`;

const BatteryBusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin-top: 14px;

  button {
    position: relative;
    display: grid;
    min-height: 72px;
    align-content: center;
    gap: 6px;
    overflow: hidden;
    border-radius: 18px;
    padding: 10px;
    color: #fff;
    background: rgba(25,25,25,.9);
    box-shadow:
      inset 0 0 0 1px rgba(255,255,255,.06),
      0 10px 22px rgba(0,0,0,.28);
    cursor: pointer;
    transition: transform 220ms cubic-bezier(.175,.885,.32,1.275), box-shadow 220ms ease;
  }

  button::after {
    position: absolute;
    inset: auto 10px 10px;
    height: 5px;
    content: "";
    border-radius: 999px;
    background: linear-gradient(90deg, #2dc48d, #85ffdb);
    box-shadow: 0 0 12px rgba(45,196,141,.55);
    transform: scaleX(var(--bus));
    transform-origin: left;
  }

  button:hover {
    transform: translateY(-5px) scale(1.03);
    box-shadow:
      inset 0 0 0 1px rgba(133,255,219,.15),
      0 0 26px rgba(45,196,141,.24);
  }

  strong,
  span {
    display: block;
  }

  strong {
    color: #85ffdb;
    font-size: 18px;
  }

  span {
    color: #888;
    font-size: 10px;
    font-weight: 900;
    letter-spacing: .1em;
    text-transform: uppercase;
  }
`;

const BatterySystemRail = styled(BatteryPanel)`
  display: grid;
  grid-template-columns: minmax(0, .72fr) minmax(0, 1fr);
  gap: 14px;
  align-items: center;
  min-height: 0;
  max-height: 170px;
  overflow: auto;

  h3 {
    font-size: 13px;
  }

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    max-height: none;
  }
`;

const BatteryTray = styled(BatteryPanel)`
  display: grid;
  grid-template-columns: minmax(150px, .28fr) minmax(0, 1fr) auto;
  gap: 18px;
  align-items: center;
  min-width: 0;
  max-height: 100%;
  overflow: auto;
  padding: 16px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const DepthInstrumentBoard = styled.div`
  display: grid;
  grid-template-columns: minmax(240px, .64fr) minmax(280px, .74fr) minmax(0, 1fr);
  grid-template-rows: auto minmax(500px, 1fr) minmax(140px, auto);
  gap: 16px;
  min-height: 100vh;
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 0;
  overflow: visible;
  background: transparent;
  box-shadow: none;

  > :nth-child(2) {
    grid-column: 1;
    grid-row: 2;
  }

  > :nth-child(3) {
    grid-column: 2;
    grid-row: 2 / 4;
  }

  > :nth-child(4) {
    grid-column: 1;
    grid-row: 3;
  }

  > :nth-child(5) {
    grid-column: 3;
    grid-row: 2 / 4;
    align-self: stretch;
  }

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;

    > * {
      grid-column: auto;
      grid-row: auto;
    }
  }
`;

const DepthBoardHeader = styled(DepthPanel)`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 0 2px 4px;
  overflow: visible;
  border-radius: 0;
  background: transparent;
  box-shadow: none;

  strong,
  span {
    display: block;
  }

  strong {
    color: #f5fff8;
    font-size: clamp(24px, 3vw, 42px);
    line-height: 1;
  }

  span {
    color: #3eea8e;
    font-size: 12px;
    font-weight: 900;
    letter-spacing: .16em;
    text-transform: uppercase;
  }
`;

const DepthStageCompact = styled(DepthPanel)`
  display: grid;
  min-height: 100%;
  place-items: center;
`;

const DepthLayerLog = styled.div`
  display: grid;
  gap: 12px;
  width: 100%;

  button {
    display: grid;
    grid-template-columns: 40px 1fr auto;
    gap: 12px;
    align-items: center;
    min-height: 66px;
    padding: 10px 12px;
    border-radius: 18px;
    color: #f5fff8;
    background: linear-gradient(145deg, rgba(255,255,255,.08), rgba(255,255,255,.02));
    box-shadow:
      inset 0 0 0 1px rgba(255,255,255,.08),
      inset 0 -14px 24px rgba(0,0,0,.28);
    cursor: pointer;
    transition: transform 220ms cubic-bezier(.22,1,.36,1), box-shadow 220ms ease;
  }

  button:hover {
    transform: translateX(7px) translateZ(0);
    box-shadow:
      inset 0 0 0 1px rgba(62,234,142,.22),
      0 0 24px rgba(62,234,142,.2);
  }

  i {
    display: grid;
    width: 40px;
    height: 40px;
    place-items: center;
    border-radius: 14px;
    background:
      radial-gradient(circle at 35% 25%, rgba(255,255,255,.7), transparent 0 22%),
      linear-gradient(145deg, #3eea8e, #151515);
    box-shadow: 0 0 18px rgba(62,234,142,.34);
  }

  i::before {
    content: attr(data-layer);
    color: #050505;
    font-size: 12px;
    font-weight: 1000;
  }

  strong,
  span,
  em {
    display: block;
  }

  span,
  em {
    color: rgba(245,255,248,.54);
    font-size: 11px;
    font-weight: 900;
  }

  em {
    color: #3eea8e;
    font-style: normal;
  }
`;

const DepthTray = styled(DepthPanel)`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: auto auto minmax(0, 1fr) auto;
  gap: 14px;
  align-items: stretch;
  min-width: 0;
  max-height: 100%;
  overflow: auto;
  padding: 16px;

  > :first-child {
    grid-column: 1 / -1;
  }

  > ${DepthButton} {
    grid-column: 1 / -1;
    justify-self: end;
  }

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const VoidArena = styled.div`
  display: grid;
  grid-template-columns: minmax(0, .82fr) minmax(320px, 1fr) minmax(0, .7fr);
  grid-template-rows: auto minmax(620px, 1fr) minmax(150px, auto);
  gap: 16px;
  min-height: 100vh;
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 0;
  overflow: visible;
  background: transparent;
  box-shadow: none;

  > :nth-child(2) {
    grid-column: 1;
    grid-row: 2 / 4;
  }

  > :nth-child(3) {
    grid-column: 2;
    grid-row: 2 / 4;
  }

  > :nth-child(4) {
    grid-column: 3;
    grid-row: 2;
  }

  > :nth-child(5) {
    grid-column: 3;
    grid-row: 3;
    min-height: 0;
  }

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;

    > * {
      grid-column: auto;
      grid-row: auto;
    }
  }
`;

const VoidArenaHeader = styled(VoidPanel)`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 0 2px 4px;
  overflow: visible;
  border-radius: 0;
  background: transparent;
  box-shadow: none;

  strong,
  span {
    display: block;
  }

  strong {
    color: #f5fcff;
    font-size: clamp(24px, 3vw, 42px);
    line-height: 1;
  }

  span {
    color: #00f2ff;
    font-size: 12px;
    font-weight: 900;
    letter-spacing: .16em;
    text-transform: uppercase;
  }
`;

const VoidMonolithStage = styled(VoidPanel)`
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  gap: 12px;
  min-height: 100%;
  place-items: center;
  padding: 10px;
`;

const VoidSensorDeck = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  width: 100%;

  button {
    position: relative;
    min-height: 72px;
    overflow: hidden;
    border-radius: 18px;
    padding: 10px;
    color: #f5fcff;
    background: rgba(1,1,3,.72);
    box-shadow:
      inset 0 0 0 1px rgba(255,255,255,.08),
      inset 0 -18px 24px rgba(0,0,0,.34),
      0 0 22px color-mix(in srgb, var(--void-accent) 28%, transparent);
    cursor: pointer;
    text-align: left;
    transition: transform 200ms cubic-bezier(.22,1,.36,1), box-shadow 200ms ease, filter 200ms ease;
  }

  button::before {
    position: absolute;
    inset: 0 auto 0 0;
    width: 5px;
    content: "";
    background: var(--void-accent);
    box-shadow: 0 0 18px var(--void-accent);
  }

  button:hover {
    filter: saturate(1.2);
    transform: translateY(-6px);
    box-shadow:
      inset 0 0 0 1px rgba(255,255,255,.14),
      0 0 30px color-mix(in srgb, var(--void-accent) 48%, transparent);
  }

  button:active {
    transform: translateY(1px) scale(.98);
  }

  strong,
  span {
    display: block;
  }

  strong {
    color: var(--void-accent);
    font-size: 18px;
    line-height: 1;
  }

  span {
    margin-top: 8px;
    color: rgba(245,252,255,.58);
    font-size: 10px;
    font-weight: 900;
    letter-spacing: .12em;
    text-transform: uppercase;
  }
`;

const VoidHudTray = styled(VoidPanel)`
  display: grid;
  grid-template-columns: 1fr 1.2fr auto;
  gap: 16px;
  align-items: center;
  min-width: 0;
  max-height: 100%;
  overflow: auto;
  padding: 16px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const DivineForge = styled.div`
  display: grid;
  grid-template-columns: minmax(260px, .62fr) minmax(0, 1fr);
  grid-template-rows: auto minmax(300px, .62fr) minmax(132px, auto) minmax(86px, auto);
  gap: 14px;
  min-height: 100vh;
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 0;
  overflow: visible;
  background: transparent;
  box-shadow: none;

  > :nth-child(2) {
    grid-column: 2;
    grid-row: 2;
  }

  > :nth-child(3) {
    grid-column: 1;
    grid-row: 2 / 5;
  }

  > :nth-child(4) {
    grid-column: 2;
    grid-row: 3;
  }

  > :nth-child(5) {
    grid-column: 2;
    grid-row: 4;
  }

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;

    > * {
      grid-column: auto;
      grid-row: auto;
    }
  }
`;

const DivineForgeHeader = styled(DivinePanel)`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 0 2px 4px;
  overflow: visible;
  border-radius: 0;
  background: transparent;
  box-shadow: none;

  strong,
  span {
    display: block;
  }

  strong {
    color: #fff6dd;
    font-size: clamp(24px, 3vw, 42px);
    line-height: 1;
  }

  span {
    color: #ffd700;
    font-size: 12px;
    font-weight: 900;
    letter-spacing: .16em;
    text-transform: uppercase;
  }
`;

const DivineCardStage = styled(DivinePanel)`
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  gap: 12px;
  min-height: 0;
  place-items: center;
  padding: 8px;
  overflow: hidden;

  ${DivineCardWrap} {
    transform: scale(.62);
    transform-origin: center;
  }
`;

const DivineHeatDeck = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  width: 100%;

  button {
    position: relative;
    min-height: 68px;
    overflow: hidden;
    border-radius: 18px;
    padding: 10px;
    color: #fff6dd;
    background:
      radial-gradient(circle at 50% 0%, rgba(255,215,0,.18), transparent 0 56%),
      rgba(19,0,8,.62);
    box-shadow:
      inset 0 0 0 1px rgba(255,237,138,.12),
      inset 0 -18px 28px rgba(0,0,0,.32),
      0 0 24px color-mix(in srgb, var(--heat-accent) 32%, transparent);
    cursor: pointer;
    text-align: left;
    transition: transform 220ms cubic-bezier(.22,1,.36,1), box-shadow 220ms ease, filter 220ms ease;
  }

  button::after {
    position: absolute;
    inset: auto 10px 10px;
    height: 4px;
    content: "";
    border-radius: 999px;
    background: linear-gradient(90deg, var(--heat-accent), #ffd700);
    box-shadow: 0 0 14px var(--heat-accent);
    transform: scaleX(var(--heat-level));
    transform-origin: left;
  }

  button:hover {
    filter: brightness(1.12);
    transform: translateY(-6px);
    box-shadow:
      inset 0 0 0 1px rgba(255,237,138,.2),
      0 0 32px color-mix(in srgb, var(--heat-accent) 48%, transparent);
  }

  strong,
  span {
    display: block;
  }

  strong {
    color: #ffd700;
    font-size: 18px;
    line-height: 1;
  }

  span {
    margin-top: 8px;
    color: rgba(255,246,221,.58);
    font-size: 10px;
    font-weight: 900;
    letter-spacing: .12em;
    text-transform: uppercase;
  }
`;

const DivineForgeTray = styled(DivinePanel)`
  display: grid;
  grid-template-columns: 1fr 1.2fr auto;
  gap: 16px;
  align-items: center;
  min-width: 0;
  max-height: 100%;
  overflow: auto;
  padding: 16px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const TicketGate = styled.div`
  display: grid;
  grid-template-columns: minmax(0, .74fr) minmax(360px, 1.12fr);
  grid-template-rows: auto minmax(430px, 1fr) minmax(128px, auto);
  gap: 14px;
  min-height: 100vh;
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 0;
  overflow: visible;
  background: transparent;
  box-shadow: none;

  > :nth-child(2) {
    grid-column: 1;
    grid-row: 2;
  }

  > :nth-child(3) {
    grid-column: 2;
    grid-row: 2;
  }

  > :nth-child(4) {
    grid-column: 1;
    grid-row: 3;
  }

  > :nth-child(5) {
    grid-column: 2;
    grid-row: 3;
  }

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;

    > * {
      grid-column: auto;
      grid-row: auto;
    }
  }
`;

const TicketGateHeader = styled(TicketPanel)`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 0 2px 4px;
  overflow: visible;
  border-radius: 0;
  background: transparent;
  box-shadow: none;

  strong,
  span {
    display: block;
  }

  strong {
    color: #e8e8e8;
    font-size: clamp(24px, 3vw, 42px);
    line-height: 1;
  }

  span {
    color: #af40ff;
    font-size: 12px;
    font-weight: 900;
    letter-spacing: .16em;
    text-transform: uppercase;
  }
`;

const TicketPassStage = styled(TicketPanel)`
  display: grid;
  min-height: 0;
  place-items: center;
  perspective: 10cm;
  padding: 8px;
`;

const TicketScanTray = styled(TicketPanel)`
  display: grid;
  grid-template-columns: .8fr 1fr auto;
  gap: 12px;
  align-items: center;
  min-width: 0;
  max-height: 100%;
  overflow: auto;
  padding: 14px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const ClayWorkbench = styled.div`
  display: grid;
  grid-template-columns: minmax(260px, .42fr) minmax(0, 1fr);
  grid-template-rows: auto minmax(455px, 1fr) minmax(220px, auto);
  gap: 14px;
  min-height: 100vh;
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 0;
  background: transparent;
  box-shadow: none;

  > :nth-child(2) {
    grid-column: 1;
    grid-row: 2 / 4;
  }

  > :nth-child(3) {
    grid-column: 2;
    grid-row: 2;
  }

  > :nth-child(4) {
    grid-column: 1;
    grid-row: 4;
  }

  > :nth-child(5) {
    grid-column: 2;
    grid-row: 3 / 5;
  }

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;

    > * {
      grid-column: auto;
      grid-row: auto;
    }
  }
`;

const ClayCompactTitle = styled.div`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;

  span,
  strong {
    display: block;
  }

  span {
    color: #10b981;
    font-size: 12px;
    font-weight: 900;
    letter-spacing: .16em;
    text-transform: uppercase;
  }

  strong {
    margin-top: 4px;
    color: #464646;
    font-size: clamp(24px, 3vw, 42px);
    line-height: 1;
    text-shadow: 2px 2px 0 rgba(197,197,197,.7), -2px -2px 0 rgba(255,255,255,.85);
  }
`;

const ClayToolRail = styled(ClayPanel)`
  display: grid;
  align-content: start;
  gap: 10px;
  padding: 14px;
  min-height: 0;
  overflow: auto;
`;

const ClayBlobButton = styled.button<{ $accent: string; $active?: boolean }>`
  display: grid;
  grid-template-columns: 46px 1fr;
  gap: 12px;
  align-items: center;
  padding: 11px;
  border-radius: 22px;
  color: #555;
  background: #e7e7e7;
  box-shadow: ${({ $active, $accent }) =>
    $active
      ? `inset 6px 6px 12px rgba(197,197,197,.8), inset -6px -6px 12px rgba(255,255,255,.86), 0 0 0 2px ${$accent}55`
      : "5px 5px 10px rgba(160,160,160,.38), -5px -5px 10px rgba(255,255,255,.76)"};
  cursor: pointer;
  text-align: left;
  transition:
    transform 180ms cubic-bezier(.22,1,.36,1),
    box-shadow 180ms ease,
    color 180ms ease;

  .blob {
    width: 46px;
    height: 46px;
    border-radius: 41% 59% 45% 55% / 58% 44% 56% 42%;
    background: ${({ $accent }) => $accent};
    box-shadow:
      3px 3px 7px rgba(160,160,160,.48),
      -3px -3px 7px rgba(255,255,255,.82),
      inset 2px 2px 4px color-mix(in srgb, ${({ $accent }) => $accent} 78%, black),
      inset -2px -2px 4px color-mix(in srgb, ${({ $accent }) => $accent} 80%, white);
    transition: transform 180ms cubic-bezier(.22,1,.36,1), border-radius 180ms ease;
  }

  strong,
  span {
    display: block;
  }

  strong {
    font-size: 13px;
    font-weight: 900;
  }

  span {
    margin-top: 2px;
    color: #777;
    font-size: 11px;
    font-weight: 760;
  }

  &:hover {
    color: ${({ $accent }) => $accent};
    transform: translateX(6px);
  }

  &:hover .blob {
    border-radius: 50%;
    transform: scale(1.04);
  }

  &:active {
    transform: translateX(2px) scale(.98);
  }
`;

const ClayMixMat = styled.div<{ $accent: string }>`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(160px, .34fr);
  gap: 18px;
  min-height: 350px;
  align-items: center;
  overflow: hidden;
  border-radius: 36px;
  padding: 22px;
  background: #e7e7e7;
  box-shadow:
    inset 12px 12px 24px #c5c5c5,
    inset -12px -12px 24px #ffffff;

  &::before,
  &::after {
    position: absolute;
    content: "";
    pointer-events: none;
    border-radius: 41% 59% 45% 55% / 58% 44% 56% 42%;
    background: ${({ $accent }) => $accent};
    box-shadow:
      inset 5px 5px 12px color-mix(in srgb, ${({ $accent }) => $accent} 72%, black),
      inset -5px -5px 12px color-mix(in srgb, ${({ $accent }) => $accent} 78%, white);
  }

  &::before {
    top: 9%;
    left: 8%;
    width: 120px;
    height: 120px;
    opacity: .2;
  }

  &::after {
    right: 8%;
    bottom: 8%;
    width: 190px;
    height: 132px;
    opacity: .16;
    transform: rotate(-10deg);
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const ClayTokenRail = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  gap: 12px;
  width: 100%;

  button {
    display: grid;
    grid-template-columns: 42px 1fr auto;
    gap: 10px;
    align-items: center;
    min-height: 56px;
    padding: 8px 10px;
    border-radius: 22px;
    color: #555;
    background: #e7e7e7;
    box-shadow:
      5px 5px 10px rgba(160,160,160,.38),
      -5px -5px 10px rgba(255,255,255,.76);
    cursor: pointer;
    text-align: left;
    transition: transform 180ms cubic-bezier(.22,1,.36,1), box-shadow 180ms ease;
  }

  button:hover {
    transform: translateX(-6px);
    box-shadow:
      inset 5px 5px 10px rgba(197,197,197,.72),
      inset -5px -5px 10px rgba(255,255,255,.82);
  }

  i {
    width: 42px;
    height: 42px;
    border-radius: 41% 59% 45% 55% / 58% 44% 56% 42%;
    background: var(--token-color);
    box-shadow:
      3px 3px 7px rgba(160,160,160,.42),
      -3px -3px 7px rgba(255,255,255,.78),
      inset 2px 2px 4px color-mix(in srgb, var(--token-color) 78%, black),
      inset -2px -2px 4px color-mix(in srgb, var(--token-color) 80%, white);
    transition: border-radius 180ms ease, transform 180ms cubic-bezier(.22,1,.36,1);
  }

  button:hover i {
    border-radius: 50%;
    transform: scale(1.05);
  }

  strong,
  span,
  em {
    display: block;
  }

  strong {
    font-size: 12px;
  }

  span,
  em {
    color: #777;
    font-size: 10px;
    font-weight: 900;
  }

  em {
    color: var(--token-color);
    font-style: normal;
  }
`;

const ClayInspector = styled(ClayPanel)<{ $accent: string }>`
  align-self: stretch;
  display: grid;
  grid-template-columns: minmax(110px, .35fr) minmax(0, 1fr);
  gap: 14px;
  align-items: center;
  padding: 14px;

  .preview {
    width: 112px;
    height: 112px;
    margin: 0 auto;
    border-radius: 41% 59% 45% 55% / 58% 44% 56% 42%;
    background: ${({ $accent }) => $accent};
    box-shadow:
      8px 8px 16px rgba(160,160,160,.52),
      -8px -8px 16px rgba(255,255,255,.86),
      inset 4px 4px 8px color-mix(in srgb, ${({ $accent }) => $accent} 78%, black),
      inset -4px -4px 8px color-mix(in srgb, ${({ $accent }) => $accent} 80%, white);
    transition: border-radius 220ms cubic-bezier(.22,1,.36,1), transform 220ms cubic-bezier(.22,1,.36,1);
  }

  &:hover .preview {
    border-radius: 50%;
    transform: translateY(-4px) scale(1.03);
  }

  .code {
    display: grid;
    place-items: center;
    min-height: 56px;
    border-radius: 22px;
    color: ${({ $accent }) => $accent};
    background: #e7e7e7;
    box-shadow:
      inset 6px 6px 12px #c5c5c5,
      inset -6px -6px 12px #ffffff;
    font-size: 20px;
    font-weight: 900;
  }
`;

const ClayBottomTray = styled(ClayPanel)`
  display: grid;
  grid-template-columns: minmax(190px, .78fr) minmax(260px, 1.08fr) minmax(220px, .8fr);
  gap: 14px;
  align-items: stretch;
  min-width: 0;
  min-height: 0;
  max-height: 100%;
  overflow: auto;
  padding: 14px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const ClaySwatchStack = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  height: 100%;

  button {
    min-height: 82px;
    border-radius: 41% 59% 45% 55% / 58% 44% 56% 42%;
    background: var(--swatch-color);
    box-shadow:
      5px 5px 10px rgba(160,160,160,.38),
      -5px -5px 10px rgba(255,255,255,.76),
      inset 2px 2px 5px color-mix(in srgb, var(--swatch-color) 80%, black),
      inset -2px -2px 5px color-mix(in srgb, var(--swatch-color) 80%, white);
    cursor: pointer;
    transition: transform 180ms cubic-bezier(.22,1,.36,1), border-radius 180ms ease, box-shadow 180ms ease;
  }

  button:hover {
    border-radius: 50%;
    transform: translateY(-6px);
  }

  button:active {
    box-shadow:
      1px 1px 4px rgba(160,160,160,.5),
      -1px -1px 4px rgba(255,255,255,.78),
      inset 8px 8px 16px color-mix(in srgb, var(--swatch-color) 80%, black),
      inset -8px -8px 16px color-mix(in srgb, var(--swatch-color) 80%, white);
    transform: translateY(2px) scale(.96);
  }
`;

const ClayMiniChart = styled.div`
  display: flex;
  min-height: 104px;
  align-items: end;
  gap: 8px;
  padding: 12px;
  border-radius: 24px;
  background: #e7e7e7;
  box-shadow:
    inset 6px 6px 12px #c5c5c5,
    inset -6px -6px 12px #ffffff;

  span {
    flex: 1;
    min-width: 10px;
    border-radius: 999px 999px 12px 12px;
    background: var(--bar-color);
    box-shadow:
      3px 3px 7px rgba(160,160,160,.42),
      -3px -3px 7px rgba(255,255,255,.78),
      inset 2px 2px 4px color-mix(in srgb, var(--bar-color) 78%, black);
    transition: transform 180ms cubic-bezier(.22,1,.36,1), border-radius 180ms ease;
  }

  span:hover {
    border-radius: 50% 50% 18px 18px;
    transform: translateY(-6px);
  }
`;

const ClayMiniRanking = styled.div`
  display: grid;
  align-content: stretch;
  gap: 8px;

  button {
    display: grid;
    grid-template-columns: 32px 1fr auto;
    gap: 10px;
    align-items: center;
    min-height: 42px;
    padding: 7px 10px;
    border-radius: 18px;
    color: #555;
    background: #e7e7e7;
    box-shadow:
      inset 4px 4px 8px rgba(197,197,197,.72),
      inset -4px -4px 8px rgba(255,255,255,.82);
    cursor: pointer;
    font-size: 12px;
    font-weight: 900;
    transition: transform 180ms cubic-bezier(.22,1,.36,1), box-shadow 180ms ease;
  }

  button:hover {
    box-shadow:
      5px 5px 10px rgba(160,160,160,.34),
      -5px -5px 10px rgba(255,255,255,.72);
    transform: translateX(6px);
  }

  i {
    width: 32px;
    height: 32px;
    border-radius: 41% 59% 45% 55% / 58% 44% 56% 42%;
    background: var(--rank-color);
    box-shadow:
      inset 2px 2px 4px color-mix(in srgb, var(--rank-color) 78%, black),
      inset -2px -2px 4px color-mix(in srgb, var(--rank-color) 80%, white);
  }
`;

const ClayStatPods = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 14px;

  button {
    min-height: 82px;
    border-radius: 24px;
    padding: 10px;
    color: #555;
    background: #e7e7e7;
    box-shadow:
      5px 5px 10px rgba(160,160,160,.34),
      -5px -5px 10px rgba(255,255,255,.72);
    cursor: pointer;
    text-align: left;
    transition: transform 180ms cubic-bezier(.22,1,.36,1), box-shadow 180ms ease;
  }

  button:hover {
    transform: translateY(-5px);
    box-shadow:
      inset 5px 5px 10px rgba(197,197,197,.72),
      inset -5px -5px 10px rgba(255,255,255,.82);
  }

  strong,
  span {
    display: block;
  }

  strong {
    color: var(--pod-color);
    font-size: 22px;
    line-height: 1;
  }

  span {
    margin-top: 8px;
    color: #777;
    font-size: 10px;
    font-weight: 900;
    letter-spacing: .1em;
    text-transform: uppercase;
  }
`;

const LumenLab = styled.div`
  display: grid;
  grid-template-columns: minmax(240px, .5fr) minmax(360px, .72fr) minmax(260px, .48fr);
  grid-template-rows: auto minmax(660px, 1fr) minmax(140px, auto);
  gap: 16px;
  min-height: 100vh;
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 0;
  overflow: visible;
  background: transparent;
  box-shadow: none;

  > :nth-child(2) {
    grid-column: 1;
    grid-row: 2;
  }

  > :nth-child(3) {
    grid-column: 2;
    grid-row: 2;
  }

  > :nth-child(4) {
    grid-column: 3;
    grid-row: 2;
    min-height: 0;
  }

  > :nth-child(5) {
    grid-column: 1 / -1;
    grid-row: 4;
  }

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;

    > * {
      grid-column: auto;
      grid-row: auto;
    }
  }
`;

const LumenHeaderStrip = styled.div`
  grid-column: 1 / -1;
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 18px;

  span,
  strong {
    display: block;
  }

  span {
    color: rgba(255,255,255,.58);
    font-size: 12px;
    font-weight: 900;
    letter-spacing: .18em;
    text-transform: uppercase;
  }

  strong {
    margin-top: 6px;
    color: #fff;
    font-size: clamp(24px, 3vw, 44px);
    line-height: 1;
    text-shadow: 0 -14px 32px rgba(255,255,255,.18), 0 14px 34px rgba(0,0,0,.82);
  }
`;

const LumenRailPanel = styled(LumenPanel)`
  display: grid;
  align-content: stretch;
  gap: 10px;
  padding: 16px;
  max-height: 560px;
  overflow: auto;
`;

const LumenChannelButton = styled.button<{ $on?: boolean }>`
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 10px;
  align-items: center;
  padding: 10px;
  border-radius: 18px;
  color: ${({ $on }) => ($on ? "#fff" : "rgba(255,255,255,.62)")};
  background: ${({ $on }) =>
    $on
      ? "radial-gradient(circle at 50% 0%, rgba(255,255,255,.24), transparent 0 56%), rgba(255,255,255,.08)"
      : "rgba(0,0,0,.24)"};
  box-shadow: ${({ $on }) =>
    $on
      ? "inset 0 1px 18px rgba(255,255,255,.14), 0 -8px 22px rgba(255,255,255,.05)"
      : "inset 0 0 0 1px rgba(255,255,255,.06)"};
  cursor: pointer;
  text-align: left;
  transition: transform 180ms cubic-bezier(.22,1,.36,1), box-shadow 180ms ease, color 180ms ease;

  .slot {
    display: grid;
    width: 48px;
    height: 38px;
    place-items: center;
    border-radius: 13px;
    background: radial-gradient(circle at 50% 0%, ${({ $on }) => ($on ? "rgba(255,255,255,.44)" : "rgba(255,255,255,.08)")}, rgba(0,0,0,.36));
    box-shadow:
      inset 0 0 0 1px rgba(255,255,255,.1),
      inset 0 -14px 18px rgba(0,0,0,.3);
    font-weight: 900;
  }

  strong,
  span {
    display: block;
  }

  strong {
    font-size: 13px;
  }

  span {
    margin-top: 3px;
    color: rgba(255,255,255,.45);
    font-size: 11px;
    font-weight: 760;
  }

  &:hover {
    transform: translateX(7px);
  }
`;

const LumenCardBay = styled.div`
  position: relative;
  display: grid;
  min-height: 560px;
  place-items: center;
  overflow: visible;
  border-radius: 30px;
  background:
    linear-gradient(90deg, transparent 0 8%, rgba(255,255,255,.04) 8% 9%, transparent 9% 100%),
    radial-gradient(circle at 50% 0%, rgba(255,255,255,.16), transparent 0 34%),
    linear-gradient(180deg, rgba(255,255,255,.05), rgba(0,0,0,.36));
  box-shadow:
    inset 0 0 0 1px rgba(255,255,255,.08),
    inset 0 30px 68px rgba(255,255,255,.04),
    inset 0 -46px 84px rgba(0,0,0,.56);

  &::before {
    position: absolute;
    top: -20%;
    width: 44%;
    height: 74%;
    content: "";
    background: linear-gradient(180deg, rgba(255,255,255,.28), transparent);
    filter: blur(16px);
    opacity: .36;
    pointer-events: none;
    transform: perspective(520px) rotateX(58deg);
  }
`;

const LumenScope = styled(LumenPanel)`
  display: grid;
  align-content: start;
  gap: 14px;
  min-height: 0;
  max-height: 560px;
  overflow: auto;
`;

const LumenBeamStack = styled.div`
  display: grid;
  gap: 8px;

  button {
    position: relative;
    min-height: 39px;
    overflow: hidden;
    border-radius: 14px;
    color: rgba(255,255,255,.72);
    background: rgba(0,0,0,.3);
    box-shadow: inset 0 0 0 1px rgba(255,255,255,.07);
    cursor: pointer;
    font-weight: 900;
    transition: transform 180ms cubic-bezier(.22,1,.36,1), color 180ms ease, box-shadow 180ms ease;
  }

  button::before {
    position: absolute;
    inset: 0 auto 0 0;
    width: var(--beam);
    content: "";
    background: linear-gradient(90deg, rgba(255,255,255,.92), rgba(255,255,255,.12));
    opacity: .5;
    pointer-events: none;
  }

  button:hover {
    color: #fff;
    box-shadow: 0 -8px 20px rgba(255,255,255,.08), inset 0 0 0 1px rgba(255,255,255,.13);
    transform: translateY(-3px);
  }
`;

const LumenApertureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 4px;

  button {
    position: relative;
    min-height: 68px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,.08);
    border-radius: 18px;
    padding: 12px;
    color: rgba(255,255,255,.68);
    background:
      radial-gradient(circle at 50% 0%, rgba(255,255,255,.14), transparent 0 48%),
      linear-gradient(180deg, rgba(255,255,255,.045), rgba(0,0,0,.28));
    cursor: pointer;
    text-align: left;
    transition: transform 180ms cubic-bezier(.22,1,.36,1), box-shadow 180ms ease, color 180ms ease;
  }

  button::before {
    position: absolute;
    inset: auto 12px 14px;
    height: 8px;
    content: "";
    border-radius: 999px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,.72), transparent);
    filter: blur(.2px);
    opacity: var(--open);
    transform: scaleX(var(--open));
    transition: transform 220ms cubic-bezier(.22,1,.36,1), opacity 220ms ease;
  }

  button:hover {
    color: #fff;
    box-shadow: 0 -10px 26px rgba(255,255,255,.08), inset 0 0 0 1px rgba(255,255,255,.12);
    transform: translateY(-5px);
  }

  strong,
  span {
    display: block;
  }

  strong {
    font-size: 18px;
    line-height: 1;
  }

  span {
    margin-top: 8px;
    color: rgba(255,255,255,.42);
    font-size: 10px;
    font-weight: 900;
    letter-spacing: .12em;
    text-transform: uppercase;
  }
`;

const LumenRanking = styled.div`
  display: grid;
  gap: 8px;
  margin-top: 10px;

  button {
    display: grid;
    grid-template-columns: 40px 1fr auto;
    gap: 10px;
    align-items: center;
    min-height: 40px;
    padding: 8px 10px;
    border-radius: 16px;
    color: rgba(255,255,255,.76);
    background: rgba(0,0,0,.26);
    box-shadow: inset 0 0 0 1px rgba(255,255,255,.06);
    cursor: pointer;
    font-size: 12px;
    font-weight: 900;
    text-align: left;
    transition: transform 180ms cubic-bezier(.22,1,.36,1), box-shadow 180ms ease, color 180ms ease;
  }

  button:hover {
    color: #fff;
    box-shadow: 0 -8px 20px rgba(255,255,255,.08), inset 0 0 0 1px rgba(255,255,255,.13);
    transform: translateX(6px);
  }

  .rank {
    display: grid;
    width: 40px;
    height: 30px;
    place-items: center;
    border-radius: 12px;
    background: radial-gradient(circle at 50% 0%, rgba(255,255,255,.32), rgba(0,0,0,.36));
    box-shadow: inset 0 0 0 1px rgba(255,255,255,.12), inset 0 -12px 16px rgba(0,0,0,.3);
  }
`;

const LumenSpectrumTray = styled(LumenPanel)`
  display: grid;
  grid-template-columns: minmax(180px, .28fr) minmax(0, 1fr) auto;
  gap: 18px;
  align-items: center;
  min-width: 0;
  max-height: 100%;
  overflow: auto;
  padding: 16px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const LumenMirrorRail = styled.div`
  position: absolute;
  right: 22px;
  bottom: 22px;
  left: 22px;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 10px;
  pointer-events: none;

  span {
    height: 34px;
    border-radius: 999px 999px 8px 8px;
    background:
      radial-gradient(circle at 50% 0%, rgba(255,255,255,.55), transparent 0 58%),
      linear-gradient(180deg, rgba(255,255,255,.22), rgba(255,255,255,.025));
    box-shadow: inset 0 1px 0 rgba(255,255,255,.22), 0 -16px 30px rgba(255,255,255,.06);
    opacity: .55;
    transform: translateY(var(--lift));
  }
`;

const PromptCockpit = styled.div`
  display: grid;
  grid-template-columns: minmax(300px, .72fr) minmax(0, 1fr);
  grid-template-rows: auto minmax(620px, 1fr) minmax(230px, auto);
  gap: 16px;
  min-height: 100vh;
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 0;
  overflow: visible;
  background: transparent;
  box-shadow: none;

  > :nth-child(2) {
    grid-column: 2;
    grid-row: 2 / 4;
  }

  > :nth-child(3) {
    grid-column: 1;
    grid-row: 2;
  }

  > :nth-child(4) {
    grid-column: 1;
    grid-row: 3;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;

    > * {
      grid-column: auto;
      grid-row: auto;
    }
  }
`;

const PromptCommandHeader = styled(PromptPanel)`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 0 2px 4px;
  overflow: visible;
  border-radius: 0;
  background: transparent;
  box-shadow: none;

  strong,
  span {
    display: block;
  }

  strong {
    color: #f3f6fd;
    font-size: clamp(22px, 2.5vw, 38px);
    line-height: 1;
  }

  span {
    margin-top: 5px;
    color: rgba(243,246,253,.48);
    font-size: 12px;
    font-weight: 900;
    letter-spacing: .16em;
    text-transform: uppercase;
  }
`;

const PromptComposerBay = styled(PromptPanel)`
  display: grid;
  grid-template-rows: minmax(0, .72fr) minmax(330px, .88fr);
  gap: 14px;
  align-content: stretch;
  justify-items: center;
  min-height: 100%;
  padding: 18px;
`;

const PromptOutputGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, .92fr) minmax(0, 1.08fr);
  gap: 12px;
  width: 100%;
  min-height: 0;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const PromptTerminalPanel = styled.div`
  display: grid;
  gap: 10px;
  min-height: 0;
  border: 1.5px solid #363636;
  border-radius: 20px;
  padding: 12px;
  background: rgba(0,0,0,.38);
  box-shadow: inset 0 6px 2px -5px rgba(255,255,255,.22);

  button {
    display: grid;
    grid-template-columns: 36px 1fr auto;
    gap: 10px;
    align-items: center;
    min-height: 44px;
    padding: 8px 10px;
    border: 1.5px solid #292929;
    border-radius: 14px;
    color: rgba(243,246,253,.78);
    background: #101010;
    cursor: pointer;
    text-align: left;
    transition: transform 160ms cubic-bezier(.22,1,.36,1), border-color 160ms ease, color 160ms ease;
  }

  button:hover {
    border-color: #7e7e7e;
    color: #fff;
    transform: translateX(5px);
  }

  i {
    width: 36px;
    height: 30px;
    border-radius: 10px;
    background-image: linear-gradient(to top, #292929, #555555, #d4d4d4);
    box-shadow: inset 0 6px 2px -4px rgba(255,255,255,.5);
  }

  strong,
  span,
  em {
    display: block;
  }

  strong {
    font-size: 12px;
  }

  span,
  em {
    color: rgba(243,246,253,.48);
    font-size: 10px;
    font-weight: 900;
  }

  em {
    color: rgba(243,246,253,.72);
    font-style: normal;
  }
`;

const PromptParamPanel = styled.div`
  display: grid;
  gap: 12px;
  min-height: 0;
  border: 1.5px solid #363636;
  border-radius: 20px;
  padding: 12px;
  background: rgba(27,27,27,.74);

  button {
    display: grid;
    gap: 8px;
    border-radius: 14px;
    padding: 10px;
    color: rgba(243,246,253,.76);
    background: #101010;
    box-shadow: inset 0 0 0 1px rgba(255,255,255,.04);
    cursor: pointer;
    text-align: left;
    transition: transform 160ms cubic-bezier(.22,1,.36,1), box-shadow 160ms ease;
  }

  button:hover {
    transform: translateY(-3px);
    box-shadow: inset 0 0 0 1px rgba(126,126,126,.8), 0 0 18px rgba(255,255,255,.08);
  }

  span {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    font-weight: 900;
    text-transform: uppercase;
  }

  i {
    position: relative;
    height: 7px;
    overflow: hidden;
    border-radius: 999px;
    background: #292929;
  }

  i::before {
    position: absolute;
    inset: 0 auto 0 0;
    width: var(--param);
    content: "";
    border-radius: inherit;
    background-image: linear-gradient(to right, #555555, #d4d4d4);
    box-shadow: 0 0 12px rgba(255,255,255,.14);
  }
`;

const PromptQueueDock = styled(PromptPanel)`
  display: grid;
  grid-template-rows: auto auto repeat(4, auto) minmax(0, 1fr);
  gap: 12px;
  padding: 18px;
  min-height: 0;
  overflow: auto;
`;

const PromptQueueFooter = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  align-self: end;
  min-height: 0;
  padding: 12px;
  border: 1.5px solid #363636;
  border-radius: 18px;
  background:
    linear-gradient(180deg, rgba(255,255,255,.035), rgba(255,255,255,.01)),
    rgba(0,0,0,.36);
  box-shadow: inset 0 8px 2px -7px rgba(255,255,255,.18);

  button {
    display: grid;
    min-height: 58px;
    align-content: center;
    gap: 5px;
    border-radius: 14px;
    padding: 9px;
    color: rgba(243,246,253,.78);
    background: #101010;
    box-shadow: inset 0 0 0 1px rgba(255,255,255,.04);
    cursor: pointer;
    text-align: left;
    transition: transform 160ms cubic-bezier(.22,1,.36,1), box-shadow 160ms ease, color 160ms ease;
  }

  button:hover {
    color: #fff;
    box-shadow: inset 0 0 0 1px rgba(126,126,126,.7), 0 0 16px rgba(255,255,255,.06);
    transform: translateY(-3px);
  }

  strong,
  span {
    display: block;
  }

  strong {
    font-size: 17px;
    line-height: 1;
  }

  span {
    color: rgba(243,246,253,.45);
    font-size: 10px;
    font-weight: 900;
    letter-spacing: .08em;
    text-transform: uppercase;
  }
`;

const PromptTerminalTape = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 8px;
  padding: 10px;
  border: 1.5px solid #363636;
  border-radius: 18px;
  background: rgba(0,0,0,.38);

  span {
    height: 32px;
    border-radius: 10px;
    background-image: linear-gradient(to top, #292929, #555555, #d4d4d4);
    box-shadow: inset 0 6px 2px -4px rgba(255,255,255,.45), 0 0 14px rgba(255,255,255,.05);
    opacity: var(--tape-opacity);
    transition: transform 160ms cubic-bezier(.22,1,.36,1), opacity 160ms ease;
  }

  span:hover {
    opacity: 1;
    transform: translateY(-5px);
  }
`;

const PromptTaskButton = styled.button<{ $active?: boolean }>`
  display: grid;
  grid-template-columns: 42px 1fr auto;
  gap: 12px;
  align-items: center;
  padding: 12px;
  border: 1.5px solid ${({ $active }) => ($active ? "#7e7e7e" : "#363636")};
  border-radius: 16px;
  color: #f3f6fd;
  background: ${({ $active }) => ($active ? "rgba(54,54,54,.68)" : "rgba(27,27,27,.78)")};
  cursor: pointer;
  text-align: left;
  transition:
    transform 180ms cubic-bezier(.22,1,.36,1),
    border-color 180ms ease,
    background-color 180ms ease;

  .index {
    display: grid;
    width: 42px;
    height: 42px;
    place-items: center;
    border-radius: 12px;
    background-image: linear-gradient(to top, #292929, #555555, #292929);
    box-shadow: inset 0 6px 2px -4px rgba(255,255,255,.45);
    font-weight: 900;
  }

  strong,
  span,
  em {
    display: block;
  }

  strong {
    font-size: 13px;
  }

  span {
    margin-top: 3px;
    color: rgba(243,246,253,.46);
    font-size: 11px;
    font-weight: 760;
  }

  em {
    color: rgba(243,246,253,.62);
    font-style: normal;
    font-weight: 900;
  }

  &:hover {
    border-color: #7e7e7e;
    background: rgba(54,54,54,.62);
    transform: translateX(6px);
  }
`;

const PromptBottomModules = styled.div`
  display: grid;
  grid-template-columns: minmax(240px, .9fr) minmax(280px, 1fr) minmax(220px, .46fr);
  gap: 12px;
  min-width: 0;
  min-height: 0;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const PromptModule = styled(PromptPanel)`
  min-height: 112px;
  max-height: 154px;
  overflow: auto;
  padding: 14px;
`;

const PromptSparkline = styled.div`
  display: flex;
  height: 56px;
  align-items: end;
  gap: 8px;
  margin-top: 12px;
  padding: 12px;
  border: 1.5px solid #363636;
  border-radius: 18px;
  background: rgba(0,0,0,.42);

  span {
    flex: 1;
    border-radius: 10px 10px 4px 4px;
    background-image: linear-gradient(to top, #292929, #555555, #d4d4d4);
    box-shadow: inset 0 6px 2px -4px rgba(255,255,255,.55), 0 0 16px rgba(255,255,255,.08);
    transition: transform 180ms cubic-bezier(.22,1,.36,1), filter 180ms ease;
  }

  span:hover {
    filter: drop-shadow(0 0 5px rgba(255,255,255,.8));
    transform: translateY(-6px);
  }
`;

const PromptChipGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;

  button {
    min-height: 34px;
    padding: 0 12px;
    border: 1.5px solid #363636;
    border-radius: 10px;
    color: rgba(243,246,253,.72);
    background: #1b1b1b;
    cursor: pointer;
    font-size: 11px;
    font-weight: 900;
    transition: transform 160ms cubic-bezier(.22,1,.36,1), border-color 160ms ease, color 160ms ease;
  }

  button[data-active="true"],
  button:hover {
    border-color: #7e7e7e;
    color: #fff;
    transform: translateY(-2px);
  }
`;

const NeuralBoard = styled.div`
  display: grid;
  grid-template-columns: minmax(260px, .54fr) minmax(340px, .74fr) minmax(300px, .66fr);
  grid-template-rows: auto minmax(620px, 1fr) minmax(150px, auto);
  gap: 16px;
  min-height: 100vh;
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 0;
  overflow: visible;
  background: transparent;
  box-shadow: none;

  > :nth-child(2) {
    grid-column: 1;
    grid-row: 2;
  }

  > :nth-child(3) {
    grid-column: 2;
    grid-row: 2;
  }

  > :nth-child(4) {
    grid-column: 3;
    grid-row: 2;
    align-self: start;
  }

  > :nth-child(5) {
    grid-column: 1 / -1;
    grid-row: 3;
    min-height: 0;
  }

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;

    > * {
      grid-column: auto;
      grid-row: auto;
    }
  }
`;

const NeuralBoardHeader = styled(NeuralPanel)`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 0 2px 4px;
  overflow: visible;
  border-radius: 0;
  background: transparent;
  box-shadow: none;

  strong,
  span {
    display: block;
  }

  strong {
    color: #f4efff;
    font-size: clamp(22px, 2.7vw, 40px);
    line-height: 1;
    text-shadow: 0 0 18px rgba(212,181,255,.24), 0 16px 36px rgba(0,0,0,.82);
  }

  span {
    margin-top: 5px;
    color: #d4b5ff;
    font-size: 12px;
    font-weight: 900;
    letter-spacing: .16em;
    text-transform: uppercase;
  }
`;

const NeuralSidePanel = styled(NeuralPanel)`
  display: grid;
  align-content: stretch;
  gap: 12px;
  padding: 18px;
  min-height: 0;
  max-height: 620px;
  overflow: auto;
`;

const NeuralStatButton = styled.button<{ $active?: boolean }>`
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 12px;
  align-items: center;
  padding: 12px;
  border: 1px solid ${({ $active }) => ($active ? "rgba(212,181,255,.48)" : "rgba(255,255,255,.1)")};
  border-radius: 16px;
  color: #ddd;
  background: ${({ $active }) => ($active ? "rgba(212,181,255,.08)" : "rgba(255,255,255,.025)")};
  box-shadow: ${({ $active }) => ($active ? "0 0 18px rgba(212,181,255,.12)" : "none")};
  cursor: pointer;
  text-align: left;
  transition: transform 180ms cubic-bezier(.22,1,.36,1), border-color 180ms ease, box-shadow 180ms ease;

  .cost {
    display: grid;
    width: 48px;
    height: 48px;
    place-items: center;
    border-radius: 50%;
    background: #2a2a2a;
    box-shadow: inset 0 0 10px rgba(255,255,255,.1), 0 0 20px rgba(0,0,0,.5);
    font-weight: 900;
  }

  strong,
  span {
    display: block;
  }

  span {
    margin-top: 4px;
    color: #777;
    font-size: 12px;
    font-weight: 760;
    letter-spacing: .08em;
    text-transform: uppercase;
  }

  &:hover {
    border-color: rgba(212,181,255,.42);
    box-shadow: 0 0 18px rgba(212,181,255,.1);
    transform: translateX(7px);
  }
`;

const NeuralCardTable = styled.div`
  position: relative;
  display: grid;
  min-height: 620px;
  place-items: center;
  overflow: visible;
  border-radius: 30px;
  padding: 18px;
  background:
    repeating-linear-gradient(0deg, rgba(0,0,0,.12) 0 1px, transparent 1px 4px),
    radial-gradient(circle at 50% 0%, rgba(212,181,255,.1), transparent 0 34%),
    linear-gradient(180deg, rgba(255,255,255,.05), rgba(0,0,0,.3));
  box-shadow:
    inset 0 0 0 1px rgba(255,255,255,.08),
    inset 0 28px 60px rgba(255,255,255,.04),
    inset 0 -44px 80px rgba(0,0,0,.5);

  > div {
    transform: perspective(1000px) rotateX(2deg) rotateZ(-1deg);
  }
`;

const NeuralTableHud = styled.div`
  position: absolute;
  inset: 18px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  pointer-events: none;

  .scan-top,
  .scan-bottom {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 10px;
  }

  span {
    height: 5px;
    border-radius: 999px;
    background: linear-gradient(90deg, transparent, rgba(212,181,255,.46), transparent);
    box-shadow: 0 0 18px rgba(212,181,255,.12);
    opacity: .36;
  }

  .cross {
    align-self: center;
    justify-self: stretch;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(212,181,255,.18), transparent);
  }

  .cross::before,
  .cross::after {
    position: absolute;
    left: 50%;
    width: 1px;
    height: 54%;
    content: "";
    background: linear-gradient(180deg, transparent, rgba(212,181,255,.16), transparent);
  }
`;

const NeuralCombatLog = styled(NeuralPanel)`
  display: grid;
  align-content: start;
  gap: 12px;
  padding: 18px;
  min-height: 0;
  max-height: 620px;
  overflow: auto;

  .log {
    display: grid;
    gap: 10px;
  }

  .log span {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    padding: 11px 12px;
    border: 1px solid rgba(255,255,255,.1);
    border-radius: 14px;
    color: rgba(244,239,255,.66);
    background: rgba(255,255,255,.025);
    font-size: 12px;
    font-weight: 850;
    transition: transform 180ms cubic-bezier(.22,1,.36,1), border-color 180ms ease;
  }

  .log span:hover {
    border-color: rgba(212,181,255,.42);
    transform: translateX(-6px);
  }
`;

const NeuralBattleMatrix = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 4px;

  button {
    position: relative;
    min-height: 86px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,.1);
    border-radius: 16px;
    padding: 12px;
    color: #ddd;
    background:
      repeating-linear-gradient(0deg, rgba(255,255,255,.025) 0 1px, transparent 1px 5px),
      rgba(255,255,255,.025);
    cursor: pointer;
    text-align: left;
    transition: transform 180ms cubic-bezier(.22,1,.36,1), border-color 180ms ease, box-shadow 180ms ease;
  }

  button::after {
    position: absolute;
    inset: auto 10px 10px;
    height: 5px;
    content: "";
    border-radius: 999px;
    background: linear-gradient(90deg, #9370db, #d4b5ff);
    box-shadow: 0 0 14px rgba(212,181,255,.22);
    transform: scaleX(var(--matrix));
    transform-origin: left;
  }

  button:hover {
    border-color: rgba(212,181,255,.42);
    box-shadow: 0 0 22px rgba(212,181,255,.12);
    transform: translateY(-5px);
  }

  strong,
  span {
    display: block;
  }

  strong {
    color: #d4b5ff;
    font-size: 18px;
    line-height: 1;
  }

  span {
    margin-top: 8px;
    color: #777;
    font-size: 10px;
    font-weight: 900;
    letter-spacing: .12em;
    text-transform: uppercase;
  }
`;

const NeuralDiscardRail = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 4px;

  button {
    position: relative;
    min-height: 62px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,.1);
    border-radius: 16px;
    padding: 12px;
    color: rgba(244,239,255,.72);
    background:
      radial-gradient(circle at 50% 0%, rgba(212,181,255,.12), transparent 0 48%),
      rgba(255,255,255,.025);
    cursor: pointer;
    text-align: left;
    transition: transform 180ms cubic-bezier(.22,1,.36,1), border-color 180ms ease, box-shadow 180ms ease;
  }

  button::after {
    position: absolute;
    inset: auto 12px 11px;
    height: 4px;
    content: "";
    border-radius: 999px;
    background: linear-gradient(90deg, #9370db, #d4b5ff);
    box-shadow: 0 0 14px rgba(212,181,255,.2);
    transform: scaleX(var(--charge));
    transform-origin: left;
  }

  button:hover {
    border-color: rgba(212,181,255,.42);
    box-shadow: 0 0 22px rgba(212,181,255,.12);
    transform: translateY(-5px) rotateZ(-1deg);
  }

  strong,
  span {
    display: block;
  }

  strong {
    font-size: 13px;
  }

  span {
    margin-top: 8px;
    color: #777;
    font-size: 10px;
    font-weight: 900;
    letter-spacing: .12em;
    text-transform: uppercase;
  }
`;

const NeuralHandTray = styled(NeuralPanel)`
  display: grid;
  grid-template-columns: minmax(170px, .24fr) minmax(0, 1fr) minmax(240px, .34fr) auto;
  gap: 16px;
  align-items: center;
  min-width: 0;
  min-height: 120px;
  overflow: auto;
  padding: 16px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const NeuralMiniCards = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 2px;

  button {
    min-width: 128px;
    min-height: 76px;
    border: 1px solid rgba(255,255,255,.1);
    border-radius: 16px;
    color: #ddd;
    background:
      radial-gradient(circle at 50% 0%, rgba(212,181,255,.12), transparent 0 42%),
      linear-gradient(180deg, rgba(42,42,42,.88), rgba(16,16,18,.96));
    box-shadow: 0 14px 26px rgba(0,0,0,.28), inset 0 0 0 1px rgba(255,255,255,.04);
    cursor: pointer;
    font-weight: 900;
    transition: transform 180ms cubic-bezier(.22,1,.36,1), border-color 180ms ease, box-shadow 180ms ease;
  }

  button[data-active="true"],
  button:hover {
    border-color: rgba(212,181,255,.48);
    box-shadow: 0 0 22px rgba(212,181,255,.14), 0 16px 30px rgba(0,0,0,.34);
    transform: translateY(-8px);
  }
`;

const NeuralEnergyChart = styled.div`
  display: flex;
  height: 76px;
  align-items: end;
  gap: 8px;
  min-width: 260px;
  padding: 10px;
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 16px;
  background: rgba(255,255,255,.025);
  box-shadow: inset 0 0 30px rgba(0,0,0,.3);

  span {
    flex: 1;
    min-width: 12px;
    border-radius: 10px 10px 4px 4px;
    background: linear-gradient(180deg, #d4b5ff, #9370db 42%, #2a2a2a);
    box-shadow: 0 0 18px rgba(212,181,255,.16), inset 0 0 10px rgba(255,255,255,.1);
    transition: transform 180ms cubic-bezier(.22,1,.36,1), filter 180ms ease;
  }

  span:hover {
    filter: drop-shadow(0 0 8px rgba(212,181,255,.7));
    transform: translateY(-8px);
  }
`;

function makeLinePath(values: number[]) {
  const width = 560;
  const height = 148;
  const max = Math.max(...values);
  const min = Math.min(...values);
  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - ((value - min) / (max - min)) * (height - 24) - 12;
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

function makeAreaPath(values: number[], width = 640, height = 190) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const points = values.map((value, index) => {
    const x = (index / (values.length - 1)) * width;
    const y = height - ((value - min) / (max - min)) * (height - 34) - 17;
    return { x, y };
  });
  const line = points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" ");
  const area = `${line} L${width},${height} L0,${height} Z`;
  return { line, area, points };
}

function makeRadarPoints(values: readonly { value: number }[], radius = 104, center = 126) {
  return values
    .map((item, index) => {
      const angle = -Math.PI / 2 + (index / values.length) * Math.PI * 2;
      const distance = (item.value / 100) * radius;
      const x = center + Math.cos(angle) * distance;
      const y = center + Math.sin(angle) * distance;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

function SoftDashboard({
  backgroundMode,
  setBackgroundMode,
  setModalOpen,
}: {
  backgroundMode: BackgroundMode;
  setBackgroundMode: (mode: BackgroundMode) => void;
  setModalOpen: (open: boolean) => void;
}) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const linePath = useMemo(() => makeLinePath(activityData), []);

  return (
    <SoftFrame>
      <Main>
        <Header>
          <HeaderTitle>
            <Bubble $tone="green">
              <LayoutDashboard size={21} />
            </Bubble>
            <div>
              <h1>Dashboard</h1>
              <p>soft neumorphic cards, charts, ranking and components</p>
            </div>
          </HeaderTitle>

          <HeaderActions>
            <SearchShell>
              <Search size={18} />
              <input aria-label="Search dashboard" placeholder="Search metrics" />
            </SearchShell>
            <IconButton type="button" aria-label="Notifications">
              <Bell size={19} />
            </IconButton>
            <div style={{ position: "relative" }}>
              <IconButton
                type="button"
                aria-label="Open background settings"
                aria-expanded={settingsOpen}
                $active={settingsOpen}
                onClick={() => setSettingsOpen((value) => !value)}
              >
                <Settings size={19} />
              </IconButton>
              {settingsOpen && (
                <SettingsPopover>
                  <CardHeader>
                    <div>
                      <h2>Soft background</h2>
                      <p>只调整第一版软液态背景，不再用这里切换 dashboard 风格。</p>
                    </div>
                    <Bubble $tone="blue">
                      <Palette size={19} />
                    </Bubble>
                  </CardHeader>
                  <ToggleGroup>
                    <label>Background</label>
                    <Segments>
                      {(Object.keys(backgroundLabels) as BackgroundMode[]).map((mode) => (
                        <SegmentButton key={mode} type="button" $active={backgroundMode === mode} onClick={() => setBackgroundMode(mode)}>
                          {backgroundLabels[mode]}
                        </SegmentButton>
                      ))}
                    </Segments>
                  </ToggleGroup>
                </SettingsPopover>
              )}
            </div>
          </HeaderActions>
        </Header>

        <Grid>
          {statCards.map((card, index) => (
            <Card key={card.label}>
              <CardHeader>
                <div>
                  <h2>{card.label}</h2>
                  <p>live dashboard metric</p>
                </div>
                <Bubble $tone={card.tone}>
                  <card.icon size={20} />
                </Bubble>
              </CardHeader>
              <StatValue>
                <strong>{card.value}</strong>
                <span>{card.delta}</span>
              </StatValue>
              <ProgressTrack style={{ "--value": `${68 + index * 7}%` } as React.CSSProperties}>
                <span />
              </ProgressTrack>
            </Card>
          ))}

          <ChartCard $span={8} $tall>
            <CardHeader>
              <div>
                <h2>Revenue flow</h2>
                <p>Different height chart columns inside soft liquid panels.</p>
              </div>
              <ActionRow>
                <SoftButton type="button">
                  <ChevronDown size={17} />
                  Month
                </SoftButton>
                <SoftButton type="button" $active onClick={() => setModalOpen(true)}>
                  <Plus size={17} />
                  New report
                </SoftButton>
              </ActionRow>
            </CardHeader>
            <BarChart aria-label="Revenue bar chart">
              {barData.map((value, index) => (
                <Bar key={index} $value={(value / 110) * 100} title={`${value}`} />
              ))}
            </BarChart>
            <SoftFlowDock>
              <SoftTrendRail aria-label="Soft revenue controls">
                {[
                  ["$42.8K", "north pool"],
                  ["18.6%", "conversion"],
                  ["9.4x", "repeat lift"],
                ].map(([value, label]) => (
                  <button key={label} type="button">
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </button>
                ))}
              </SoftTrendRail>
              <SoftMiniMatrix aria-label="Soft revenue heat matrix">
                {[0.42, 0.58, 0.74, 0.9, 0.66, 0.82, 0.7, 0.96, 0.52, 0.88, 0.62, 0.78].map((opacity, index) => (
                  <span key={index} style={{ "--cell-opacity": opacity } as React.CSSProperties} />
                ))}
              </SoftMiniMatrix>
            </SoftFlowDock>
          </ChartCard>

          <Card $span={4} $tall>
            <CardHeader>
              <div>
                <h2>Ranking</h2>
                <p>Top operators by weekly score.</p>
              </div>
              <Bubble $tone="orange">
                <Trophy size={20} />
              </Bubble>
            </CardHeader>
            <RankingList>
              {ranking.map((item, index) => (
                <RankRow key={item.name}>
                  <span className="rank">{index + 1}</span>
                  <div>
                    <strong>{item.name}</strong>
                    <span>score {item.score}</span>
                  </div>
                  <span className="value">{item.value}</span>
                </RankRow>
              ))}
            </RankingList>
          </Card>

          <Card $span={5}>
            <CardHeader>
              <div>
                <h2>Activity curve</h2>
                <p>SVG chart with soft inset surface.</p>
              </div>
              <Bubble $tone="blue">
                <Activity size={20} />
              </Bubble>
            </CardHeader>
            <LineChart viewBox="0 0 560 174" aria-label="Activity line chart">
              <path d={linePath} fill="none" stroke="#4caf50" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
              <path d={`${linePath} L560,174 L0,174 Z`} fill="rgba(76,175,80,.14)" />
            </LineChart>
          </Card>

          <Card $span={4}>
            <CardHeader>
              <div>
                <h2>Actions</h2>
                <p>Buttons and modal trigger.</p>
              </div>
              <Bubble $tone="green">
                <Play size={20} />
              </Bubble>
            </CardHeader>
            <ActionRow>
              <SoftButton type="button" $active onClick={() => setModalOpen(true)}>
                <Wand2 size={17} />
                Open modal
              </SoftButton>
              <SoftButton type="button">
                <LockKeyhole size={17} />
                Confirm
              </SoftButton>
              <SoftButton type="button">
                <Menu size={17} />
                Menu
              </SoftButton>
            </ActionRow>
          </Card>

          <Card $span={3}>
            <CardHeader>
              <div>
                <h2>Champion</h2>
                <p>Large compact card.</p>
              </div>
              <Bubble $tone="orange">
                <Crown size={20} />
              </Bubble>
            </CardHeader>
            <StatValue>
              <strong>98</strong>
              <span>rank #1</span>
            </StatValue>
          </Card>
        </Grid>
      </Main>
    </SoftFrame>
  );
}

function ElectricDashboard({ setModalOpen }: { setModalOpen: (open: boolean) => void }) {
  return (
    <ElectricFrame>
      <ElectricMain>
        <ElectricTopbar>
          <ElectricTitle>
            <h1>Electric Flow</h1>
            <p>完全独立的暗色电光 dashboard：非同一布局换色，保留你给的黑色液态按钮、彩虹描边、电流高光和粒子感。</p>
          </ElectricTitle>
          <ElectricSearch>
            <Search size={18} />
            <input aria-label="Search electric dashboard" placeholder="Search plasma metrics" />
            <Bell size={18} />
          </ElectricSearch>
        </ElectricTopbar>

        <ElectricLayout>
          <ElectricHero>
            <ParticleField aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </ParticleField>
            <ElectricHeroContent>
              <ElectricHeroCopy>
                <h2>Get Started Let&apos;s Cook!</h2>
                <p>Hero 区域不是卡片网格，主操作使用黑色玻璃质感与液态波纹，整体动线从 CTA、环形能量仪表延伸到实时队列。</p>
                <ElectricButtonDeck>
                  <ElectricButton type="button" onClick={() => setModalOpen(true)}>
                    <span className="shine" />
                    <span className="electric-text">Let&apos;s Cook!</span>
                  </ElectricButton>
                </ElectricButtonDeck>
                <ElectricArcDock aria-label="Electric arc controls">
                  {[
                    ["12.8k", "spark tasks", "#5eeabd", ".86"],
                    ["04", "hot routes", "#60a5fa", ".72"],
                    ["91%", "signal", "#9a4df1", ".91"],
                    ["31ms", "latency", "#f9799c", ".58"],
                  ].map(([value, label, accent, charge]) => (
                    <button key={label} type="button" style={{ "--arc": accent, "--charge": charge } as React.CSSProperties}>
                      <strong>{value}</strong>
                      <span>{label}</span>
                    </button>
                  ))}
                </ElectricArcDock>
              </ElectricHeroCopy>

              <ElectricGauge aria-label="Electric success gauge">
                <strong>96</strong>
                <span>plasma score</span>
              </ElectricGauge>
            </ElectricHeroContent>
          </ElectricHero>

          <ElectricSideStack>
            <ElectricPanel>
              <h3>Live Reactor</h3>
              <p>Liquid-electrical command stream</p>
              <ElectricFeedList>
                {electricFeed.map((item) => (
                  <ElectricFeedRow key={item.label} $tone={item.tone}>
                    <i />
                    <div>
                      <strong>{item.label}</strong>
                      <span>{item.value}</span>
                    </div>
                    <em>{item.time}</em>
                  </ElectricFeedRow>
                ))}
              </ElectricFeedList>
            </ElectricPanel>

            <ElectricPanel>
              <h3>Signal Mix</h3>
              <p>Neon horizontal chart, separate from the soft bar chart.</p>
              <NeonBars>
                {[
                  ["Velocity", 86, "#5eeabd"],
                  ["Routing", 72, "#60a5fa"],
                  ["Heat", 94, "#9a4df1"],
                  ["Noise", 48, "#f9799c"],
                ].map(([label, value, accent]) => (
                  <NeonBarRow key={label} $value={Number(value)} $accent={String(accent)}>
                    <span>{label}</span>
                    <div className="track">
                      <div className="fill" />
                    </div>
                    <span>{value}%</span>
                  </NeonBarRow>
                ))}
              </NeonBars>
            </ElectricPanel>

            <ElectricPanel>
              <h3>Arc Leaderboard</h3>
              <ElectricLeaderboard>
                {electricRanks.slice(0, 3).map((item, index) => (
                  <ElectricRankRow key={item.name}>
                    <span className="rank">{index + 1}</span>
                    <div>
                      <strong>{item.name}</strong>
                      <span>score {item.score}</span>
                    </div>
                    <span className="amount">{item.amount}</span>
                  </ElectricRankRow>
                ))}
              </ElectricLeaderboard>
            </ElectricPanel>
          </ElectricSideStack>
        </ElectricLayout>

        <ElectricMetricGrid>
          {electricMetrics.map((item) => (
            <ElectricMetricCard key={item.label} $accent={item.accent}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <em>{item.delta}</em>
            </ElectricMetricCard>
          ))}
          <ElectricPanel style={{ flex: "2 1 360px" }}>
            <ElectricWaveChart aria-label="Electric wave chart" style={{ marginTop: 0 }}>
              {[42, 72, 58, 88, 66, 104, 76, 96, 62, 112, 84, 100].map((value, index) => (
                <span key={index} style={{ "--h": `${value}px`, "--d": `${index * 0.04}s` } as React.CSSProperties} />
              ))}
            </ElectricWaveChart>
          </ElectricPanel>
        </ElectricMetricGrid>
      </ElectricMain>
    </ElectricFrame>
  );
}

function PremiumWord({ text }: { text: string }) {
  return (
    <span className="words">
      {Array.from(text).map((letter, index) => (
        <span className="char" key={`${letter}-${index}`} style={{ "--i": index + 1 } as React.CSSProperties}>
          <span data-label={letter === " " ? "\u00a0" : letter}>{letter === " " ? "\u00a0" : letter}</span>
        </span>
      ))}
    </span>
  );
}

function PremiumDashboard({ setModalOpen }: { setModalOpen: (open: boolean) => void }) {
  return (
    <PremiumFrame>
      <PremiumMain>
        <PremiumHero>
          <PremiumHeroGrid>
            <PremiumHeadline>
              <h1>Premium Capsule Dashboard</h1>
              <p>这套是第三个完整布局：左侧奢华导航、上方大面积胶囊视觉、下方交易看板和环形资产面板，按钮动效沿用你新给的 styled-components 参考。</p>
              <PremiumButton type="button" aria-label="Get Started" onClick={() => setModalOpen(true)}>
                <span className="text">
                  <PremiumWord text="Get Started" />
                  <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <line x1={7} y1={17} x2={17} y2={7} />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </PremiumButton>
              <PremiumCapsuleRail aria-label="Premium capsule controls">
                {[
                  ["Elite", "segment", "#f7e6a1"],
                  ["31.8%", "conversion", "#c4548e"],
                  ["18.6k", "members", "#5691c8"],
                ].map(([value, label, color]) => (
                  <button key={label} type="button" style={{ "--capsule": color } as React.CSSProperties}>
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </button>
                ))}
              </PremiumCapsuleRail>
            </PremiumHeadline>

          <PremiumPanel>
            <h3>Membership Glow</h3>
            <p>Premium activation and portfolio quality.</p>
            <PremiumOrbit aria-label="Premium quality gauge">
              <strong>94</strong>
                <span>capsule score</span>
              </PremiumOrbit>
            </PremiumPanel>
          </PremiumHeroGrid>
        </PremiumHero>

        <PremiumTileGrid>
          {premiumTiles.map((tile) => (
            <PremiumTile key={tile.label} $tone={tile.tone}>
              <span>{tile.label}</span>
              <strong>{tile.value}</strong>
              <em>{tile.note}</em>
            </PremiumTile>
          ))}
        </PremiumTileGrid>

        <PremiumLowerGrid>
          <PremiumPanel>
            <h3>Luxury Deal Flow</h3>
            <p>Rounded rows and soft progress tracks, not the same chart layout.</p>
            <PremiumStackChart aria-label="Premium stacked capsule chart">
              {[58, 84, 66, 92, 74, 88].map((value, index) => (
                <PremiumStackColumn key={index} $value={value}>
                  <span />
                  <span />
                  <span />
                </PremiumStackColumn>
              ))}
            </PremiumStackChart>
            <PremiumDealList>
              {premiumDeals.map((deal) => (
                <PremiumDealRow key={deal.name} $progress={deal.progress}>
                  <div>
                    <strong>{deal.name}</strong>
                    <span>{deal.stage}</span>
                  </div>
                  <em>{deal.value}</em>
                  <div className="bar">
                    <div className="fill" />
                  </div>
                </PremiumDealRow>
              ))}
            </PremiumDealList>
          </PremiumPanel>

          <PremiumPanel>
            <h3>Capsule Controls</h3>
            <p>主控按钮保持旋转扫光、文字上翻和内凹玻璃阴影。</p>
            <div style={{ display: "grid", gap: 18, marginTop: 24 }}>
              <PremiumButton type="button" aria-label="Open Menu" onClick={() => setModalOpen(true)}>
                <span className="text">
                  <PremiumWord text="Open Menu" />
                  <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <line x1={7} y1={17} x2={17} y2={7} />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </PremiumButton>
              <PremiumDealRow $progress={78}>
                <div>
                  <strong>Private Pipeline</strong>
                  <span>members only</span>
                </div>
                <em>78%</em>
                <div className="bar">
                  <div className="fill" />
                </div>
              </PremiumDealRow>
            </div>
            <PremiumMemberTrack aria-label="Premium member track">
              {[
                ["Diamond", "priority access", "$420K"],
                ["Velvet", "warm account", "$318K"],
                ["Pearl", "renewal room", "$276K"],
              ].map(([name, note, value]) => (
                <button key={name} type="button">
                  <i />
                  <span>
                    <strong>{name}</strong>
                    <span>{note}</span>
                  </span>
                  <em>{value}</em>
                </button>
              ))}
            </PremiumMemberTrack>
            <PremiumRankList>
              {premiumRanks.map((item, index) => (
                <PremiumRankRow key={item.name}>
                  <span className="rank">{index + 1}</span>
                  <div>
                    <strong>{item.name}</strong>
                    <span>score {item.score}</span>
                  </div>
                  <span className="value">{item.value}</span>
                </PremiumRankRow>
              ))}
            </PremiumRankList>
          </PremiumPanel>
        </PremiumLowerGrid>
      </PremiumMain>
    </PremiumFrame>
  );
}

function RequestControlCard({ idPrefix = "request" }: { idPrefix?: string }) {
  const zeroId = `${idPrefix}-count-0`;
  const oneId = `${idPrefix}-count-1`;
  const twoId = `${idPrefix}-count-2`;

  return (
    <RequestInteractiveCard>
      <div className="directional-hover-area hover-top-left" aria-hidden="true" />
      <div className="directional-hover-area hover-top-right" aria-hidden="true" />
      <div className="directional-hover-area hover-bottom-left" aria-hidden="true" />
      <div className="directional-hover-area hover-bottom-right" aria-hidden="true" />
      <input type="radio" name={`${idPrefix}-request-count`} id={zeroId} className="interactive-card__counter-input interactive-card__counter-input--0" defaultChecked />
      <input type="radio" name={`${idPrefix}-request-count`} id={oneId} className="interactive-card__counter-input interactive-card__counter-input--1" />
      <input type="radio" name={`${idPrefix}-request-count`} id={twoId} className="interactive-card__counter-input interactive-card__counter-input--2" />
      <section className="interactive-card" role="region" aria-label="Add additional requests panel">
        <div className="interactive-card__glow-layer" aria-hidden="true">
          <div className="interactive-card__glow interactive-card__glow--purple" />
          <div className="interactive-card__glow interactive-card__glow--pink" />
          <div className="interactive-card__glow interactive-card__glow--teal" />
        </div>
        <div className="interactive-card__noise-overlay" aria-hidden="true" />
        <div className="interactive-card__inner">
          <header className="interactive-card__header">
            <p className="interactive-card__title">ADD ADDITIONAL REQUESTS</p>
            <p className="interactive-card__subtitle">Add up to 2 additional requests to your plan.</p>
            <p className="interactive-card__limit-message">Request limit reached.</p>
          </header>
          <div className="interactive-card__control-pill" role="group" aria-label="add request control">
            <span className="interactive-card__pill-icon" aria-hidden="true">
              *
            </span>
            <span className="interactive-card__pill-label">ADD REQUEST</span>
            <div className="interactive-card__count-display">
              <span className="interactive-card__count-value" />
            </div>
            <div className="interactive-card__buttons interactive-card__buttons--state-0">
              <span className="interactive-card__btn interactive-card__btn--dec interactive-card__btn--disabled" aria-disabled="true">
                -
              </span>
              <div className="interactive-card__btn-separator" />
              <label htmlFor={oneId} className="interactive-card__btn interactive-card__btn--inc" aria-label="Add one request">
                +
              </label>
            </div>
            <div className="interactive-card__buttons interactive-card__buttons--state-1">
              <label htmlFor={zeroId} className="interactive-card__btn interactive-card__btn--dec" aria-label="Remove one request">
                -
              </label>
              <div className="interactive-card__btn-separator" />
              <label htmlFor={twoId} className="interactive-card__btn interactive-card__btn--inc" aria-label="Add second request">
                +
              </label>
            </div>
            <div className="interactive-card__buttons interactive-card__buttons--state-2">
              <label htmlFor={oneId} className="interactive-card__btn interactive-card__btn--dec" aria-label="Remove one request">
                -
              </label>
              <div className="interactive-card__btn-separator" />
              <span className="interactive-card__btn interactive-card__btn--inc interactive-card__btn--disabled" aria-disabled="true">
                +
              </span>
            </div>
          </div>
        </div>
      </section>
    </RequestInteractiveCard>
  );
}

function RequestDashboard({ setModalOpen }: { setModalOpen: (open: boolean) => void }) {
  return (
    <RequestFrame>
      <RequestMain>
        <RequestCommandBoard>
          <RequestBoardHeader>
            <div>
              <span>directional request control</span>
              <strong>Interactive Request Board</strong>
            </div>
            <RequestActionButton type="button" onClick={() => setModalOpen(true)}>
              <Plus size={17} />
              Open request modal
            </RequestActionButton>
          </RequestBoardHeader>

          <RequestBubblePanel>
            <h3>Request Bubble Map</h3>
            <RequestBubbleChart aria-label="Request bubble chart">
              {requestBubbleData.map((item) => (
                <RequestBubble
                  key={item.label}
                  $x={item.x}
                  $y={item.y}
                  $size={item.size}
                  $color={item.color}
                  title={`${item.label} ${item.value}%`}
                >
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </RequestBubble>
              ))}
            </RequestBubbleChart>
          </RequestBubblePanel>

          <RequestControlStage>
            <RequestControlCard />
            <RequestGlitchRail aria-label="Request quick controls">
              {[
                ["Priority", "P1", "#6b3bd3"],
                ["Retries", "02", "#ff8800"],
                ["Latency", "8m", "#0fb4c6"],
              ].map(([label, value, accent]) => (
                <button key={label} type="button" style={{ "--rail-accent": accent } as React.CSSProperties}>
                  <strong>{label}</strong>
                  <span>{value}</span>
                </button>
              ))}
            </RequestGlitchRail>
          </RequestControlStage>

          <RequestQueuePanel>
            <h3>Control Surface</h3>
            <RequestQueue>
              {requestQueue.map((item) => (
                <RequestQueueRow key={item.name} $accent={item.accent}>
                  <i />
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.status}</span>
                  </div>
                  <em>{item.value}</em>
                </RequestQueueRow>
              ))}
            </RequestQueue>
            <RequestRankList>
              {requestRanks.map((item, index) => (
                <RequestRankRow key={item.name} $accent={["#6b3bd3", "#ff8800", "#0fb4c6"][index]}>
                  <span className="rank">{index + 1}</span>
                  <div>
                    <strong>{item.name}</strong>
                    <span>score {item.score}</span>
                  </div>
                  <em>{item.value}</em>
                </RequestRankRow>
              ))}
            </RequestRankList>
          </RequestQueuePanel>

          <RequestStatusTray>
            <div>
              <h3>Request Metrics</h3>
              <p>指标合并到底部控制条，避免重复三卡区块。</p>
            </div>
            <RequestMetricGrid>
              {[
                ["Requests", "24", "#6b3bd3"],
                ["Limit Hits", "2", "#ff8800"],
                ["Turnaround", "8m", "#0fb4c6"],
              ].map(([label, value, accent]) => (
                <RequestMetric key={label} $accent={accent} style={{ minHeight: 82, padding: 14 }}>
                  <span>{label}</span>
                  <strong style={{ fontSize: 28, marginTop: 8 }}>{value}</strong>
                </RequestMetric>
              ))}
            </RequestMetricGrid>
            <RequestActionButton type="button">
              <Plus size={17} />
              Add request
            </RequestActionButton>
          </RequestStatusTray>
        </RequestCommandBoard>
      </RequestMain>
    </RequestFrame>
  );
}

function UnlockLetters({ text }: { text: string }) {
  return (
    <>
      {Array.from(text).map((letter, index) => (
        <span key={`${letter}-${index}`}>{letter === " " ? "\u00a0" : letter}</span>
      ))}
    </>
  );
}

function UnlockSwipeControl({ label = "Swipe to confirm", compact = false }: { label?: string; compact?: boolean }) {
  return (
    <UnlockSwipeWrap $compact={compact}>
      <div className="conti">
        <button className="swipe" type="button" aria-label={label}>
          <div className="glow" />
          <div className="knob">
            <svg className="lock" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <rect x={6} y={11} width={12} height={10} rx={2} ry={2} fill="none" stroke="#7a929d86" strokeWidth="1.6" />
              <path d="M8.5 11V8.5A3.5 3.5 0 0 1 12 5a3.5 3.5 0 0 1 3.5 3.5V11" fill="none" stroke="#7a929d86" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg className="lock-glow" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <rect x={6} y={11} width={12} height={10} rx={2} ry={2} fill="none" stroke="#7a929d" strokeWidth="1.6" />
              <path d="M8.5 11V8.5A3.5 3.5 0 0 1 12 5a3.5 3.5 0 0 1 3.5 3.5V11" fill="none" stroke="#7a929d" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="label">
            <UnlockLetters text="Swipe to confirm" />
          </div>
          <div className="label-alt">
            <UnlockLetters text="Press and hold to unlock" />
          </div>
        </button>
        <svg className="outline" xmlns="http://www.w3.org/2000/svg" width={329} height={69} viewBox="0,0,329,69">
          <g transform="translate(166.34519,34.05402)">
            <g fill="none" stroke="#ffffff" strokeWidth={3} strokeMiterlimit={10}>
              <path d="M-164.84519,-4.27474c0,-16.1705 12.23994,-28.27928 28.41044,-28.27928c0.62712,0 269.76321,0.01971 270.38053,0.05856c14.48923,0.91174 26.11884,12.36192 27.31149,26.7732c0.06679,0.807 -0.23249,12.13079 -0.23249,12.95503c0,16.1705 -12.08038,26.27928 -28.25088,26.27928c-0.53766,0 -269.75928,-0.01449 -270.2898,-0.0431c-13.76896,-0.74265 -25.0656,-12.1284 -27.26126,-25.61178c-0.26413,-1.62197 -0.06804,-10.45329 -0.06804,-12.1319z" />
            </g>
          </g>
        </svg>
        <svg className="ripple" xmlns="http://www.w3.org/2000/svg" width={329} height={69} viewBox="0,0,329,69">
          <g transform="translate(166.34519,34.05402)">
            <g fill="none" stroke="#aaaaaa22" strokeWidth={3} strokeMiterlimit={10}>
              <path d="M-164.84519,-4.27474c0,-16.1705 12.23994,-28.27928 28.41044,-28.27928c0.62712,0 269.76321,0.01971 270.38053,0.05856c14.48923,0.91174 26.11884,12.36192 27.31149,26.7732c0.06679,0.807 -0.23249,12.13079 -0.23249,12.95503c0,16.1705 -12.08038,26.27928 -28.25088,26.27928c-0.53766,0 -269.75928,-0.01449 -270.2898,-0.0431c-13.76896,-0.74265 -25.0656,-12.1284 -27.26126,-25.61178c-0.26413,-1.62197 -0.06804,-10.45329 -0.06804,-12.1319z" />
            </g>
          </g>
        </svg>
        <svg className="particles" xmlns="http://www.w3.org/2000/svg" viewBox="0,0,25,28">
          <g transform="translate(23.16486,16.9609)" strokeWidth={3} strokeLinecap="round" strokeMiterlimit={10}>
            <path d="M-8.60292,-15.4609l9.72436,11.28025" />
            <path d="M-17.88391,-3.73728l14.00307,5.05667" />
            <path d="M-21.66486,9.43345h14.39205" />
          </g>
        </svg>
        <svg className="clank" xmlns="http://www.w3.org/2000/svg" width={39} height={64} viewBox="0,0,39,64">
          <g transform="translate(2.70145,41.30984)" fill="none" stroke="#ffffff" strokeWidth={3} strokeLinecap="round" strokeMiterlimit={10}>
            <path d="M0.31997,-7.0285l16.51652,-31.53153l16.51652,21.02102z" />
            <path d="M4.82448,1.98051l22.52252,1.5015l-9.00901,16.51652z" />
          </g>
        </svg>
        <div className="key" aria-hidden="true">
          <svg width={128} height={128} viewBox="0 0 20 20">
            <path fill="transparent" stroke="#777f82" strokeWidth="0.5" d="M14 1C10.69 1 8 3.69 8 7c0 .66.17 1.29.38 1.91L.15 17.15A.5.5 0 0 0 0 17.5v2A.5.5 0 0 0 .5 20h3a.5.5 0 0 0 .35-.15L4.7 19H6.5a.5.5 0 0 0 .5-.5V17h1.5a.5.5 0 0 0 .5-.5v-1.79l2.41-2.41c.81.4 1.68.7 2.59.7A6 6 0 0 0 14 1zm1 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
          </svg>
        </div>
        <svg className="big-lock" viewBox="0 0 120 120">
          <path fill="none" stroke="#c7cfd2" strokeWidth="0.5" d="M23,14l0,-4.706c0,-3.833 -2.953,-7.175 -6.785,-7.29c-3.964,-.12 -7.215,3.058 -7.215,6.996v5h-1c-1.657,0 -3,1.343 -3,3v10c0,1.657 1.343,3 3,3h16c1.657,0 3,-1.343 3,-3v-10c0,-1.657 -1.343,-3 -3,-3h-1z" />
        </svg>
      </div>
    </UnlockSwipeWrap>
  );
}

function UnlockDashboard({ setModalOpen }: { setModalOpen: (open: boolean) => void }) {
  const radarPoints = useMemo(() => makeRadarPoints(unlockRadarData), []);

  return (
    <UnlockFrame>
      <UnlockMain>
        <UnlockVaultBoard>
          <UnlockVaultHeader>
            <div>
              <span>hold to unlock vault</span>
              <strong>Secure Unlock Vault</strong>
            </div>
            <UnlockActionButton type="button" onClick={() => setModalOpen(true)}>
              <LockKeyhole size={17} />
              Open unlock modal
            </UnlockActionButton>
          </UnlockVaultHeader>

          <UnlockRadarPanel>
            <h3>Vault Radar</h3>
            <UnlockRadarChart viewBox="0 0 252 252" aria-label="Vault security radar chart">
              {[42, 72, 104].map((radius) => (
                <circle key={radius} cx="126" cy="126" r={radius} className="grid-ring" />
              ))}
              {unlockRadarData.map((item, index) => {
                const angle = -Math.PI / 2 + (index / unlockRadarData.length) * Math.PI * 2;
                const x = 126 + Math.cos(angle) * 112;
                const y = 126 + Math.sin(angle) * 112;
                return (
                  <g key={item.label}>
                    <line x1="126" y1="126" x2={x.toFixed(1)} y2={y.toFixed(1)} className="grid-line" />
                    <text x={x.toFixed(1)} y={y.toFixed(1)} textAnchor="middle" dominantBaseline="middle">
                      {item.label}
                    </text>
                  </g>
                );
              })}
              <polygon points={radarPoints} className="radar-fill" />
              <polygon points={radarPoints} className="radar-stroke" />
            </UnlockRadarChart>
          </UnlockRadarPanel>

          <UnlockSwipeStage>
            <UnlockSwipeControl compact />
          </UnlockSwipeStage>

          <UnlockPanel>
            <h3>Key Timeline</h3>
            <UnlockTimeline>
              {unlockStages.map((item) => (
                <UnlockTimelineRow key={item.name} $accent={item.accent}>
                  <i />
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.status}</span>
                  </div>
                  <em>{item.value}</em>
                </UnlockTimelineRow>
              ))}
            </UnlockTimeline>
            <h3>Vault Ranking</h3>
            <UnlockRankList>
              {unlockRanks.map((item, index) => (
                <UnlockRankRow key={item.name}>
                  <span className="rank">{index + 1}</span>
                  <div>
                    <strong>{item.name}</strong>
                    <span>score {item.score}</span>
                  </div>
                  <span className="value">{item.value}</span>
                </UnlockRankRow>
              ))}
            </UnlockRankList>
          </UnlockPanel>

          <UnlockVaultTray>
            <div>
              <h3>Vault Metrics</h3>
              <p>安全指标移到底部钥匙控制条。</p>
            </div>
            <UnlockMetricGrid>
              {[
                ["Vault Health", "99%", "#fff9bc"],
                ["Confirmations", "42", "#ffcd58"],
                ["Key Age", "18m", "#7a929d"],
              ].map(([label, value, accent]) => (
                <UnlockMetric key={label} $accent={accent} style={{ minHeight: 82, padding: 14 }}>
                  <span>{label}</span>
                  <strong style={{ fontSize: 28, marginTop: 8 }}>{value}</strong>
                </UnlockMetric>
              ))}
            </UnlockMetricGrid>
            <UnlockKeySlots aria-label="Vault key slots">
              {[
                ["Palm Seal", "biometric active", "ready", "#fff9bc"],
                ["Cold Token", "rotating key", "04:18", "#7a929d"],
                ["Audit Ring", "session watch", "live", "#ffcd58"],
              ].map(([name, note, value, color]) => (
                <button key={name} type="button" style={{ "--slot-color": color } as React.CSSProperties}>
                  <i />
                  <span>
                    <strong>{name}</strong>
                    <span>{note}</span>
                  </span>
                  <em>{value}</em>
                </button>
              ))}
            </UnlockKeySlots>
            <UnlockActionButton type="button">
              <LockKeyhole size={17} />
              Seal vault
            </UnlockActionButton>
          </UnlockVaultTray>
        </UnlockVaultBoard>
      </UnlockMain>
    </UnlockFrame>
  );
}

function ConfirmSwipeControl({ idPrefix = "confirm" }: { idPrefix?: string }) {
  const inputId = `${idPrefix}-swipe-toggle`;

  return (
    <ConfirmSwipeWrap>
      <input type="checkbox" id={inputId} className="swipe-toggle" />
      <label className="swipe-container" htmlFor={inputId} aria-label="Swipe to confirm">
        <div className="swipe-fill" />
        <div className="dent-effect" />
        <div className="glass-effect-layer" />
        <div className="glass-tint-layer" />
        <div className="glass-shine-layer" />
        <div className="text-container">
          <span className="swipe-text">Swipe to confirm</span>
          <span className="text-confirmed">Confirmed!</span>
        </div>
        <div className="swipe-handle">
          <div className="icon-container">
            <svg className="lock-icon" viewBox="0 0 24 24" fill="none" strokeWidth={2}>
              <rect x={3} y={11} width={18} height={11} rx={2} ry={2} />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <svg className="checkmark-icon" viewBox="0 0 24 24" fill="none" strokeWidth={3}>
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      </label>
      <svg style={{ display: "none" }}>
        <filter id="glass-distortion">
          <feTurbulence type="fractalNoise" baseFrequency="0.02 0.05" numOctaves={2} result="turbulence" />
          <feDisplacementMap in="SourceGraphic" in2="turbulence" scale={10} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
    </ConfirmSwipeWrap>
  );
}

function ConfirmDashboard({ setModalOpen }: { setModalOpen: (open: boolean) => void }) {
  const area = useMemo(() => makeAreaPath(confirmAreaData), []);

  return (
    <ConfirmFrame>
      <ConfirmMain>
        <ConfirmApprovalBoard>
          <ConfirmBoardHeader>
            <div>
              <span>neumorphic swipe confirm</span>
              <strong>Approval Control Board</strong>
            </div>
            <ConfirmActionButton type="button" onClick={() => setModalOpen(true)}>
              <Gauge size={17} />
              Open confirm modal
            </ConfirmActionButton>
          </ConfirmBoardHeader>

          <ConfirmSwipeStage>
            <ConfirmSwipeControl />
            <ConfirmDentStack aria-label="Confirm checklist">
              {[
                ["Legal reviewed", "contract gate", "ok"],
                ["Deploy window", "green lane", "92%"],
                ["Billing sync", "manual hold", "68%"],
                ["Rollback plan", "standby", "ready"],
              ].map(([label, note, value]) => (
                <button key={label} type="button">
                  <i />
                  <span>
                    <strong>{label}</strong>
                    <span>{note}</span>
                  </span>
                  <em>{value}</em>
                </button>
              ))}
            </ConfirmDentStack>
            <ConfirmStagePills aria-label="Confirm status pockets">
              {[
                ["128", "approved"],
                ["18", "pending"],
                ["04", "blocked"],
                ["97%", "success"],
              ].map(([value, label]) => (
                <button key={label} type="button">
                  <strong>{value}</strong>
                  <span>{label}</span>
                </button>
              ))}
            </ConfirmStagePills>
          </ConfirmSwipeStage>

          <ConfirmAreaPanel>
            <h3>Confirm Area Flow</h3>
            <ConfirmAreaChart viewBox="0 0 640 190" aria-label="Confirmed area chart">
              <path d={area.area} className="area" />
              <path d={area.line} className="line" />
              {area.points.map((point, index) => (
                <circle key={index} cx={point.x} cy={point.y} r="6" className="point" />
              ))}
            </ConfirmAreaChart>
            <ConfirmTimeline aria-label="Approval timeline">
              {[
                ["Scope locked", "09:12", "done"],
                ["Security signed", "10:48", "done"],
                ["Release swipe", "12:30", "now"],
              ].map(([label, time, state]) => (
                <button key={label} type="button">
                  <i />
                  <span>
                    <strong>{label}</strong>
                    <span>{time}</span>
                  </span>
                  <em>{state}</em>
                </button>
              ))}
            </ConfirmTimeline>
          </ConfirmAreaPanel>

          <ConfirmInsightPanel>
            <h3>Approval Heatmap</h3>
            <ConfirmHeatmap aria-label="Approval heatmap">
              {confirmHeatmapData.map((value, index) => (
                <ConfirmHeatCell key={index} $value={value}>
                  {value}
                </ConfirmHeatCell>
              ))}
            </ConfirmHeatmap>
            <ConfirmRingDeck aria-label="Confirm ring charts">
              {[
                ["Forms", 84],
                ["Deploys", 92],
                ["Billing", 68],
              ].map(([label, value]) => (
                <ConfirmRing key={label} $value={Number(value)}>
                  <strong>{value}%</strong>
                  <span>{label}</span>
                </ConfirmRing>
              ))}
            </ConfirmRingDeck>
            <h3>Confirmed Ranking</h3>
            <ConfirmRankList>
              {confirmRanks.map((item, index) => (
                <ConfirmRankRow key={item.name}>
                  <span className="rank">{index + 1}</span>
                  <div>
                    <strong>{item.name}</strong>
                    <span>score {item.score}</span>
                  </div>
                  <span className="value">{item.value}</span>
                </ConfirmRankRow>
              ))}
            </ConfirmRankList>
          </ConfirmInsightPanel>

          <ConfirmApprovalTray>
            <div>
              <h3>Confirm Metrics</h3>
              <p>指标移到底部确认状态条。</p>
            </div>
            <ConfirmMetricGrid>
              {confirmMetrics.map((metric) => (
                <ConfirmMetric key={metric.label} $accent={metric.accent} style={{ minHeight: 82, padding: 14 }}>
                  <span>{metric.label}</span>
                  <strong style={{ fontSize: 28, marginTop: 8 }}>{metric.value}</strong>
                </ConfirmMetric>
              ))}
            </ConfirmMetricGrid>
            <ConfirmActionButton type="button">
              <Gauge size={17} />
              Confirm
            </ConfirmActionButton>
          </ConfirmApprovalTray>
        </ConfirmApprovalBoard>
      </ConfirmMain>
    </ConfirmFrame>
  );
}

function FilamentText({ text }: { text: string }) {
  return (
    <span className="filament-letters">
      {Array.from(text).map((letter, index) => (
        <span key={`${letter}-${index}`} data-label={letter === " " ? "\u00a0" : letter} style={{ "--i": index + 1 } as React.CSSProperties}>
          {letter === " " ? "\u00a0" : letter}
        </span>
      ))}
    </span>
  );
}

function FilamentPowerButton({ idPrefix = "filament-power" }: { idPrefix?: string }) {
  const inputId = `${idPrefix}-toggle`;

  return (
    <FilamentButtonWrap>
      <label className="area-wrapper" htmlFor={inputId}>
        <input id={inputId} defaultChecked type="checkbox" />
        <span className="button">
          <span className="socket" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((index) => (
              <i key={index} style={{ "--i": index + 1 } as React.CSSProperties} />
            ))}
          </span>
          <span className="glass">
            <span className="glass-reflex" />
            <svg className="filament" viewBox="0 0 80 48" aria-hidden="true">
              <path d="M2 24 C16 19 26 19 40 24 C54 29 64 29 78 24" />
              <path d="M2 24 C16 29 26 29 40 24 C54 19 64 19 78 24" />
            </svg>
            <svg className="filament filament-on" viewBox="0 0 80 48" aria-hidden="true">
              <path d="M2 24 C16 19 26 19 40 24 C54 29 64 29 78 24" />
              <path d="M2 24 C16 29 26 29 40 24 C54 19 64 19 78 24" />
            </svg>
            <span className="content">
              <span className="text state-1">
                <FilamentText text="Get Started" />
              </span>
              <span className="text state-2">
                <FilamentText text="Time to Shine" />
              </span>
            </span>
          </span>
        </span>
      </label>
    </FilamentButtonWrap>
  );
}

function FilamentDashboard({ setModalOpen }: { setModalOpen: (open: boolean) => void }) {
  return (
    <FilamentFrame>
      <FilamentBench>
        <FilamentBenchHeader>
          <div>
            <span>industrial glass control</span>
            <strong>Voltage Bench</strong>
          </div>
          <FilamentActionRow style={{ marginTop: 0 }}>
            <FilamentSmallButton type="button" onClick={() => setModalOpen(true)}>
              <Sparkles size={17} />
              Open lamp modal
            </FilamentSmallButton>
          </FilamentActionRow>
        </FilamentBenchHeader>

        <FilamentLampDock>
          <FilamentPowerButton />
          <p>灯泡开关保留玻璃扫光、文字逐字翻入、灯丝通电和金属螺口伸缩。</p>
          <FilamentNodeStrip aria-label="Voltage nodes">
            {[
              ["220v", "rail"],
              ["68c", "thermal"],
              ["84%", "ignite"],
              ["12ms", "pulse"],
            ].map(([value, label]) => (
              <button key={label} type="button">
                <strong>{value}</strong>
                <span>{label}</span>
              </button>
            ))}
          </FilamentNodeStrip>
          <FilamentDiagnostics aria-label="Filament diagnostics">
            {[
              ["0.82", "arc load", "#ff8800", ".82"],
              ["clean", "noise", "#00fbff", ".64"],
              ["hot", "coil", "#ffc4af", ".76"],
              ["safe", "glass", "#b7b7b7", ".58"],
            ].map(([value, label, color, load]) => (
              <button key={label} type="button" style={{ "--filament-accent": color, "--filament-load": load } as React.CSSProperties}>
                <strong>{value}</strong>
                <span>{label}</span>
              </button>
            ))}
          </FilamentDiagnostics>
        </FilamentLampDock>

        <FilamentChartDeck>
          <h3>Filament Wave</h3>
          <p>中间主图是灯丝波形，不再放普通 hero 文案。</p>
          <FilamentWave aria-label="Filament wave chart">
            {[34, 68, 52, 92, 74, 108, 66, 96, 58, 88, 42, 78].map((value, index) => (
              <span key={index} style={{ "--h": `${value}px`, "--d": `${index * 0.05}s` } as React.CSSProperties} />
            ))}
          </FilamentWave>
        </FilamentChartDeck>

        <FilamentThermalRack>
          <FilamentPanel>
            <h3>Thermal Cells</h3>
            <FilamentHeatGrid>
              {filamentHeat.map((value, index) => (
                <FilamentHeatCell key={index} $value={value}>
                  {value}
                </FilamentHeatCell>
              ))}
            </FilamentHeatGrid>
          </FilamentPanel>

          <FilamentPanel>
            <h3>Component Ranking</h3>
            <FilamentRankList>
              {filamentRows.map((item, index) => (
                <FilamentRankRow key={item.name} $accent={item.accent}>
                  <span className="rank">{index + 1}</span>
                  <div>
                    <strong>{item.name}</strong>
                    <span>{item.value}</span>
                  </div>
                  <em>{item.score}</em>
                </FilamentRankRow>
              ))}
            </FilamentRankList>
          </FilamentPanel>
        </FilamentThermalRack>

        <FilamentStatusTray>
          <div>
            <h3>Voltage Metrics</h3>
            <p>指标压缩到底部设备条，避免重复三卡布局。</p>
          </div>
          <FilamentMetricGrid>
            {filamentMetrics.map((metric) => (
              <FilamentMetric key={metric.label} $accent={metric.accent} style={{ minHeight: 82, padding: 14 }}>
                <span>{metric.label}</span>
                <strong style={{ fontSize: 28, marginTop: 8 }}>{metric.value}</strong>
              </FilamentMetric>
            ))}
          </FilamentMetricGrid>
          <FilamentSmallButton type="button">
            <Zap size={17} />
            Ignite
          </FilamentSmallButton>
        </FilamentStatusTray>
      </FilamentBench>
    </FilamentFrame>
  );
}

function BatteryChargeWidget({ compact = false }: { compact?: boolean }) {
  return (
    <BatteryChargeCard data-compact={compact ? "true" : undefined}>
      <div className="card-glow" />
      <div className="circuit-lines" />
      <div className="percentage">69%</div>
      <div className="charging-status">
        <Zap size={17} />
        CHARGING
      </div>
      <div className="battery-core-grid" aria-label="Battery core cells">
        {[
          ["8.4kw", "output"],
          ["41c", "thermal"],
          ["96%", "health"],
          ["215", "cycles"],
        ].map(([value, label]) => (
          <button key={label} type="button">
            <strong>{value}</strong>
            <span>{label}</span>
          </button>
        ))}
      </div>
      <div className="battery-info">
        <div className="battery-info-row">
          <Activity size={14} />
          96% BATTERY HEALTH
          <span className="tooltip">Excellent condition</span>
        </div>
        <div className="battery-info-row">
          <Gauge size={14} />
          215 CYCLES
          <span className="tooltip">73% lifetime remaining</span>
        </div>
      </div>
      <div className="battery-mini-rail" aria-hidden="true">
        {["82%", "64%", "96%"].map((width) => (
          <span key={width} style={{ "--rail": width } as React.CSSProperties} />
        ))}
      </div>
      <div className="progress-bar" aria-label="Battery charge segments">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <span key={index} className={index < 4 ? "segment active" : "segment"} />
        ))}
      </div>
      <div className="energy-particles" />
      <div className="corner-dots" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
    </BatteryChargeCard>
  );
}

function BatteryDashboard({ setModalOpen }: { setModalOpen: (open: boolean) => void }) {
  return (
    <BatteryFrame>
      <BatteryKeyframes aria-hidden="true" />
      <BatteryRack>
        <BatteryRackHeader>
          <div>
            <span>energy glass control</span>
            <strong>Battery Rack</strong>
          </div>
          <BatteryActionButton type="button" onClick={() => setModalOpen(true)}>
            <Zap size={17} />
            Open charge modal
          </BatteryActionButton>
        </BatteryRackHeader>

        <BatteryChargeWidget compact />

        <BatteryCellRack>
          <h3>Charge Segments</h3>
          <p>不是普通柱状图，使用参考组件的分段流光和绿色 energize 动画做成电芯输出图。</p>
          <BatterySegmentChart aria-label="Battery segment output chart">
            {[72, 98, 64, 116, 88, 142, 76, 126, 92, 154, 108, 136].map((value, index) => (
              <span key={index} style={{ "--h": `${value}px`, "--d": `${index * 0.045}s` } as React.CSSProperties} />
            ))}
          </BatterySegmentChart>
          <BatteryBusGrid aria-label="Battery energy bus">
            {[
              ["Grid", "8.4kw", .88],
              ["Loop", "41c", .72],
              ["Guard", "215", .64],
              ["Output", "96%", .96],
            ].map(([label, value, bus]) => (
              <button key={label} type="button" style={{ "--bus": bus } as React.CSSProperties}>
                <strong>{value}</strong>
                <span>{label}</span>
              </button>
            ))}
          </BatteryBusGrid>
        </BatteryCellRack>

        <BatterySystemRail>
          <h3>Cell Matrix</h3>
          <BatteryCellGrid>
            {batteryCellGrid.map((value, index) => (
              <BatteryCell key={index} $value={value}>
                {value}
              </BatteryCell>
            ))}
          </BatteryCellGrid>
          <h3>System Ranking</h3>
          <BatteryRankList>
            {batterySystems.map((item, index) => (
              <BatteryRankRow key={item.name} $accent={item.accent}>
                <span className="rank">{index + 1}</span>
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.value}</span>
                </div>
                <em>{item.score}</em>
              </BatteryRankRow>
            ))}
          </BatteryRankList>
        </BatterySystemRail>

        <BatteryTray>
          <div>
            <h3>Energy Metrics</h3>
            <p>底部设备条承载卡片数据，保持一屏内比较。</p>
          </div>
          <BatteryMetricGrid>
            {batteryMetrics.map((metric) => (
              <BatteryMetric key={metric.label} $accent={metric.accent} style={{ minHeight: 82, padding: 14 }}>
                <span>{metric.label}</span>
                <strong style={{ fontSize: 28, marginTop: 8 }}>{metric.value}</strong>
              </BatteryMetric>
            ))}
          </BatteryMetricGrid>
          <BatteryActionButton type="button">
            <Activity size={17} />
            Balance
          </BatteryActionButton>
        </BatteryTray>
      </BatteryRack>
    </BatteryFrame>
  );
}

function DepthBatteryWidget() {
  const outlinePath = "M0 110V70A70 70 135 0170 0H230A70 70 45 01300 70L300 110A40 40 135 01260 150H40A40 40 0 000 190V230A70 70 45 0070 300H230A70 70 135 00300 230V190";

  return (
    <DepthBatteryCard>
      <div className="parent">
        <div className="a tl" />
        <div className="a t" />
        <div className="a tr" />
        <div className="a l" />
        <div className="a c" />
        <div className="a r" />
        <div className="a bl" />
        <div className="a b" />
        <div className="a br" />
        <div className="card">
          <svg height={300} width={300} className="outer bb">
            <path className="bak" pathLength={360} d={outlinePath} />
            <path className="bak20" pathLength={360} d={outlinePath} />
            <path className="blur patt" pathLength={360} d={outlinePath} />
            <path className="patt" pathLength={360} d={outlinePath} />
          </svg>
          {[-1, 0, 1].map((z) => (
            <svg key={z} height={300} width={300} style={{ "--z": z } as React.CSSProperties} className="outer">
              <path className="patt" pathLength={360} d={outlinePath} />
            </svg>
          ))}
          <div className="inner">
            <div className="inner-bg" />
          </div>
          {[-3, 0, 3].map((z) => (
            <div key={z} style={{ "--z": z } as React.CSSProperties} className="inner-border" />
          ))}
          <div style={{ "--z": -2 } as React.CSSProperties} className="percent top">69%</div>
          {[-2, 0, 2].map((z) => (
            <div key={z} style={{ "--z": z } as React.CSSProperties} className="percent">69%</div>
          ))}
          <div className="percent bak">69%</div>
          <div className="txt charging">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M11 15H6L13 1V9H18L11 23V15Z" pathLength={10} />
            </svg>
            CHARGING
          </div>
          <div className="txt health">
            <svg viewBox="0 0 512 258.25" aria-hidden="true">
              <path d="M472.06 38.53V68.15H499.9C503.26 68.15 506.28 69.52 508.45 71.7 510.64 73.89 512 76.95 512 80.25V178.01C512 181.33 510.61 184.38 508.44 186.55 506.27 188.71 503.22 190.11 499.9 190.11H472.06V219.72C472.06 240.92 454.71 258.25 433.53 258.25H38.53C17.33 258.25 0 240.93 0 219.72V38.53C0 17.35 17.37 0 38.53 0H433.53C454.75 0 472.06 17.31 472.06 38.53ZM446.6 216.95V41.3C446.6 32.61 439.45 25.46 430.77 25.46H41.3C32.59 25.46 25.46 32.59 25.46 41.3V216.95C25.46 225.63 32.63 232.79 41.3 232.79H430.77C439.46 232.79 446.6 225.67 446.6 216.95Z" />
              <path d="M360.18 48.54c8.57 0 15.59 7.13 15.59 15.59v129.99c0 8.46-7.13 15.59-15.59 15.59H69.88c-8.46 0-15.58-7.02-15.58-15.59v-129.99c0-8.57 7.01-15.59 15.58-15.59z" />
              <path className="fd" d="M360.18 48.54c8.57 0 15.59 7.13 15.59 15.59v129.99c0 8.46-7.13 15.59-15.59 15.59H69.88c-8.46 0-15.58-7.02-15.58-15.59v-129.99c0-8.57 7.01-15.59 15.58-15.59z" fill="#00ffaa" />
            </svg>
            96% BATTERY HEALTH
          </div>
          <div className="txt cycles">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12,18A6,6 0 0,1 6,12C6,11 6.25,10.03 6.7,9.2L5.24,7.74C4.46,8.97 4,10.43 4,12A8,8 0 0,0 12,20V23L16,19L12,15M12,4V1L8,5L12,9V6A6,6 0 0,1 18,12C18,13 17.75,13.97 17.3,14.8L18.76,16.26C19.54,15.03 20,13.57 20,12A8,8 0 0,0 12,4Z" />
            </svg>
            215 CYCLES
          </div>
          <div className="bar-hb" />
          <div style={{ "--z": 0 } as React.CSSProperties} className="bar">
            <div className="bar-slider" />
          </div>
          <div className="bar bak">
            <div className="bar-slider" />
          </div>
        </div>
      </div>
    </DepthBatteryCard>
  );
}

function DepthDashboard({ setModalOpen }: { setModalOpen: (open: boolean) => void }) {
  return (
    <DepthFrame>
      <DepthInstrumentBoard>
        <DepthBoardHeader>
          <div>
            <span>z-axis hover instrument</span>
            <strong>Depth Battery Instrument</strong>
          </div>
          <BatteryActionRow>
            <DepthButton type="button" onClick={() => setModalOpen(true)}>
              <Layers3 size={17} />
              Open depth modal
            </DepthButton>
          </BatteryActionRow>
        </DepthBoardHeader>

        <DepthPanel>
          <h3>Z Layer Output</h3>
          <DepthLayerChart>
            {[
              ["Outer SVG", 88],
              ["Inner Glow", 74],
              ["Percent Stack", 96],
              ["Charge Rail", 69],
              ["Hover Grid", 91],
            ].map(([label, value]) => (
              <DepthLayerRow key={label} $value={Number(value)}>
                <span>{label}</span>
                <div className="track" />
                <strong>{value}%</strong>
              </DepthLayerRow>
            ))}
          </DepthLayerChart>
        </DepthPanel>

        <DepthStageCompact>
          <DepthBatteryWidget />
        </DepthStageCompact>

        <DepthPanel>
          <h3>Depth Ranking</h3>
          <DepthList>
            {[
              { name: "Top Left Tilt", value: "rotateX -20 / Y 20", score: 98, accent: "#3eea8e" },
              { name: "Center Hover", value: "outline redraw", score: 92, accent: "#ffffff" },
              { name: "Bottom Rail", value: "bar translateZ", score: 86, accent: "#55dd99" },
              { name: "Health Icon", value: "fill reveal", score: 79, accent: "#00ffaa" },
            ].map((item, index) => (
              <DepthListRow key={item.name} $accent={item.accent}>
                <span className="rank">{index + 1}</span>
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.value}</span>
                </div>
                <em>{item.score}</em>
              </DepthListRow>
            ))}
          </DepthList>
        </DepthPanel>

        <DepthTray>
          <div>
            <h3>Layer Metrics</h3>
            <p>仪表数据压到底部 Z 轴控制条。</p>
          </div>
          <DepthMetricGrid>
            {[
              ["Perspective", "3000", "px depth"],
              ["Health", "96%", "layer stable"],
              ["Cycles", "215", "rotational"],
            ].map(([label, value, note]) => (
              <DepthMetric key={label} style={{ minHeight: 82, padding: 14 }}>
                <span>{label}</span>
                <strong style={{ fontSize: 28, marginTop: 8 }}>{value}</strong>
                <em>{note}</em>
              </DepthMetric>
            ))}
          </DepthMetricGrid>
          <DepthLayerLog aria-label="Depth layer log">
            {[
              ["Z1", "Outer outline", "88%"],
              ["Z2", "Charge rail", "69%"],
              ["Z3", "Hover tilt", "91%"],
            ].map(([layer, label, value]) => (
              <button key={layer} type="button">
                <i data-layer={layer} />
                <span>
                  <strong>{label}</strong>
                  <span>depth trace</span>
                </span>
                <em>{value}</em>
              </button>
            ))}
          </DepthLayerLog>
          <DepthButton type="button">
            <Zap size={17} />
            Rebalance
          </DepthButton>
        </DepthTray>
      </DepthInstrumentBoard>
    </DepthFrame>
  );
}

function VoidCardWidget() {
  return (
    <VoidCardWrap>
      <div className="anchor">
        <div className="sensors">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className={`s${index + 1}`} />
          ))}
        </div>
        <div className="assembly">
          <div className="aura" />
          <main className="monolith">
            <div className="glare" />
            <div className="aperture">
              <div className="core-light" />
            </div>
            <div className="status-hud">
              {[
                ["1450", "HP"],
                ["60", "ATK"],
                ["9", "COST"],
              ].map(([value, label]) => (
                <div className="hud-cell" key={label}>
                  <span className="hud-v">{value}</span>
                  <span className="hud-l">{label}</span>
                </div>
              ))}
            </div>
          </main>
          <header className="band band-top">
            <div className="glare" />
            <div className="rarity-tag">LEGENDARY</div>
            <div className="label">Zenith Unit // Class 04</div>
            <p className="title">Void Stalker</p>
          </header>
          <footer className="band band-bot">
            <div className="glare" />
            <div className="label">Ability: Chronos Sink</div>
            <div className="desc">
              <p>
                When played, trigger <span className="hl">Singularity</span>. All units lose 20% total HP. Gain <span className="hl">+5 Attack</span> for each enemy destroyed.
              </p>
            </div>
            <div className="actions">
              <button className="btn" type="button">Summon</button>
              <button className="btn" type="button">Transcend</button>
            </div>
          </footer>
        </div>
      </div>
    </VoidCardWrap>
  );
}

function VoidDashboard({ setModalOpen }: { setModalOpen: (open: boolean) => void }) {
  return (
    <VoidFrame>
      <VoidArena>
        <VoidArenaHeader>
          <div>
            <span>legendary monolith card</span>
            <strong>Void Unit Arena</strong>
          </div>
          <BatteryActionRow>
            <VoidActionButton type="button" onClick={() => setModalOpen(true)}>
              <Crown size={17} />
              Open card modal
            </VoidActionButton>
          </BatteryActionRow>
        </VoidArenaHeader>

        <VoidAbilityPanel>
          <h3>Ability Matrix</h3>
          <VoidAbilityGrid>
            {[
              ["Singularity", "All units lose 20% total HP.", "#00f2ff"],
              ["Chronos Sink", "Gain +5 attack for each destroyed enemy.", "#ff00ea"],
              ["Void Aura", "Nine sensor zones remix card theme.", "#9d00ff"],
              ["Transcend", "Pull bands forward on hover.", "#00ffaa"],
            ].map(([title, copy, accent]) => (
              <VoidAbility key={title} $accent={accent}>
                <strong>{title}</strong>
                <span>{copy}</span>
              </VoidAbility>
            ))}
          </VoidAbilityGrid>
        </VoidAbilityPanel>

        <VoidMonolithStage>
          <VoidCardWidget />
          <VoidSensorDeck aria-label="Void sensor controls">
            {[
              ["1450", "hp", "#00f2ff"],
              ["60", "attack", "#ff00ea"],
              ["9", "cost", "#00ffaa"],
              ["04", "class", "#ff4500"],
            ].map(([value, label, accent]) => (
              <button key={label} type="button" style={{ "--void-accent": accent } as React.CSSProperties}>
                <strong>{value}</strong>
                <span>{label}</span>
              </button>
            ))}
          </VoidSensorDeck>
        </VoidMonolithStage>

        <VoidRankingPanel>
          <h3>Unit Ranking</h3>
          <VoidList>
            {[
              { name: "Void Stalker", value: "Legendary", score: "S+", accent: "#00f2ff" },
              { name: "Chronos Warden", value: "Epic", score: "A", accent: "#ff00ea" },
              { name: "Aperture Knight", value: "Rare", score: "B+", accent: "#00ffaa" },
              { name: "Null Scout", value: "Common", score: "B", accent: "#ff4500" },
            ].map((item, index) => (
              <VoidListRow key={item.name} $accent={item.accent}>
                <span className="rank">{index + 1}</span>
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.value}</span>
                </div>
                <em>{item.score}</em>
              </VoidListRow>
            ))}
          </VoidList>
        </VoidRankingPanel>

        <VoidHudTray>
          <div>
            <h3>Unit HUD</h3>
            <p>底部 HUD 展示 HP/ATK/COST，按钮仍是斜切发光。</p>
          </div>
          <VoidMetricGrid>
            {[
              ["Hit Points", "1450", "#00f2ff"],
              ["Attack", "60", "#ff00ea"],
              ["Cost", "9", "#00ffaa"],
            ].map(([label, value, accent]) => (
              <VoidMetric key={label} $accent={accent} style={{ minHeight: 82, padding: 14 }}>
                <span>{label}</span>
                <strong style={{ fontSize: 28, marginTop: 8 }}>{value}</strong>
              </VoidMetric>
            ))}
          </VoidMetricGrid>
          <VoidActionButton type="button">
            <Sparkles size={17} />
            Summon
          </VoidActionButton>
        </VoidHudTray>
      </VoidArena>
    </VoidFrame>
  );
}

function DivineCardWidget() {
  return (
    <DivineCardWrap>
      <div className="scene">
        <div className="card divine">
          <div className="lava-trim" />
          <div className="particles-outside" />
          <div className="rarity">DIVINE</div>
          <div className="header">
            <span className="title">V1 // STEEL BLOOD ENGINE</span>
          </div>
          <div className="art">
            <span className="subs">ART</span>
            <div className="lava-trim" />
          </div>
          <section className="stats">
            {[
              ["HP", "66"],
              ["ARMOR", "22"],
              ["COST", "2⚡"],
            ].map(([label, value]) => (
              <div key={label}>
                <span className="label">{label}</span>
                <span className={label === "COST" ? "value energy" : "value"}>{value}</span>
              </div>
            ))}
          </section>
          <section className="abilities">
            <div className="ability passive">
              <span className="ability-title">PASSIVE - BLOOD FUEL</span>
              <span className="ability-text">Heal 2 HP whenever an enemy bleeds.</span>
            </div>
            <div className="ability active">
              <span className="ability-title">ACTIVE - OVERDRIVE</span>
              <span className="ability-text">Enter RAGE MODE. +4 Damage for 2 turns.</span>
            </div>
          </section>
          <div className="footnote">
            <div className="footnote-bg" />
            “MANKIND IS DEAD. BLOOD IS FUEL. HELL IS FULL.”
          </div>
        </div>
      </div>
    </DivineCardWrap>
  );
}

function DivineDashboard({ setModalOpen }: { setModalOpen: (open: boolean) => void }) {
  return (
    <DivineFrame>
      <DivineForge>
        <DivineForgeHeader>
          <div>
            <span>divine lava combat card</span>
            <strong>Steel Blood Forge</strong>
          </div>
          <BatteryActionRow>
            <DivineActionButton type="button" onClick={() => setModalOpen(true)}>
              <Trophy size={17} />
              Open divine modal
            </DivineActionButton>
          </BatteryActionRow>
        </DivineForgeHeader>

        <DivineAbilityPanel>
          <h3>Ability Forge</h3>
          <DivineAbilityGrid>
            {[
              ["Blood Fuel", "Heal 2 HP whenever an enemy bleeds.", "#ffd700"],
              ["Overdrive", "Enter rage mode and gain +4 damage.", "#bd3156"],
              ["Lava Trim", "Conic border spins around the card shell.", "#ff5e00"],
              ["Particle Phase", "Outer sparks drift in layered rhythms.", "#ffae00"],
            ].map(([title, copy, accent]) => (
              <DivineAbility key={title} $accent={accent}>
                <strong>{title}</strong>
                <span>{copy}</span>
              </DivineAbility>
            ))}
          </DivineAbilityGrid>
        </DivineAbilityPanel>

        <DivineCardStage>
          <DivineCardWidget />
          <DivineHeatDeck aria-label="Divine heat controls">
            {[
              ["66", "hit points", "#ffd700", .88],
              ["22", "armor", "#e44646", .62],
              ["2", "energy", "#ffae00", .42],
              ["Rage", "mode", "#ff5e00", .76],
            ].map(([value, label, accent, level]) => (
              <button key={label} type="button" style={{ "--heat-accent": accent, "--heat-level": level } as React.CSSProperties}>
                <strong>{value}</strong>
                <span>{label}</span>
              </button>
            ))}
          </DivineHeatDeck>
        </DivineCardStage>

        <DivineRankingPanel>
          <h3>Combat Ranking</h3>
          <DivineList>
            {[
              { name: "Steel Blood Engine", value: "Divine", score: "S+", accent: "#ffd700" },
              { name: "Rage Injector", value: "Mythic", score: "A", accent: "#ff5e00" },
              { name: "Bleed Harvester", value: "Rare", score: "B+", accent: "#e44646" },
              { name: "Armor Vessel", value: "Common", score: "B", accent: "#ffc32a" },
            ].map((item, index) => (
              <DivineListRow key={item.name} $accent={item.accent}>
                <span className="rank">{index + 1}</span>
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.value}</span>
                </div>
                <em>{item.score}</em>
              </DivineListRow>
            ))}
          </DivineList>
        </DivineRankingPanel>

        <DivineForgeTray>
          <div>
            <h3>Combat Metrics</h3>
            <p>HP/Armor/Cost 移到底部熔岩控制条。</p>
          </div>
          <DivineMetricGrid>
            {[
              ["Hit Points", "66", "#ffd700"],
              ["Armor", "22", "#e44646"],
              ["Cost", "2", "#ffae00"],
            ].map(([label, value, accent]) => (
              <DivineMetric key={label} $accent={accent} style={{ minHeight: 82, padding: 14 }}>
                <span>{label}</span>
                <strong style={{ fontSize: 28, marginTop: 8 }}>{value}</strong>
              </DivineMetric>
            ))}
          </DivineMetricGrid>
          <DivineActionButton type="button">
            <Zap size={17} />
            Overdrive
          </DivineActionButton>
        </DivineForgeTray>
      </DivineForge>
    </DivineFrame>
  );
}

function TicketBarcode() {
  const bars = [
    [0, 3], [2, 1], [4, 2], [7, 1], [9, 3], [13, 1], [15, 2], [18, 1], [20, 2], [23, 1],
    [25, 3], [29, 1], [31, 2], [34, 1], [36, 2], [39, 1], [41, 3], [45, 2], [48, 1], [50, 2],
    [53, 1], [55, 2], [58, 1], [60, 3], [64, 2], [67, 1], [69, 3], [73, 1], [75, 2], [78, 1],
    [80, 2], [83, 1], [85, 3], [89, 1], [91, 2], [94, 1], [96, 2], [99, 1], [101, 3], [105, 2],
    [108, 1], [110, 2], [113, 1], [115, 2], [118, 1], [120, 3], [124, 2], [127, 1], [129, 3],
    [133, 1], [135, 2], [138, 1], [140, 2], [143, 1], [145, 3], [149, 1], [151, 2], [154, 1], [156, 2],
  ];

  return (
    <svg className="barcode" width={200} height={40} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {bars.map(([x, width], index) => (
        <rect key={index} x={x} y={0} width={width} height={40} />
      ))}
    </svg>
  );
}

function TicketWidget() {
  return (
    <TicketWidgetWrap>
      <div className="ticket">
        <div className="tilt-after" />
        <div className="tilt-before" />
        <label className="container">
          <input className="flip-input" type="checkbox" />
          <div className="card-container">
            <div className="card">
              <div className="main-part">
                <div className="pattern-body">
                  <div className="title">
                    <div className="main-title" data-glitch="UDC2025">UDC2025</div>
                    <span className="sub-title">Uiverse Dev Conference 2025</span>
                    <div>Shaping the Future of the Web</div>
                  </div>
                  <div className="vip-pass">
                    <span className="vip">VIP</span>
                    <span className="vip-number mono">#005</span>
                    <span className="agenda-info">Agenda on the back</span>
                  </div>
                  <div className="ticket-info">
                    <div className="date">
                      <span className="day">21</span>
                      <span>Aug</span>
                      <span>2025</span>
                    </div>
                    <div className="time">
                      <span>12:00 PM</span>
                      <span>—</span>
                      <span>6:00 PM</span>
                    </div>
                    <div className="location">
                      <span>Uiverse Convention Center,</span>
                      <span>San Francisco, CA</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="small-part">
                <div className="small-body">
                  <div className="content">
                    <div className="small-title">UDC2025</div>
                    <div className="infos">
                      <span className="ticket-number">Ticket <span className="mono">#30112</span></span>
                      <br />
                      <div className="stub-info">Gate: <span className="highlight">3</span></div>
                      <div className="stub-info">Row: <span className="highlight">1</span></div>
                      <div className="stub-info">Seat: <span className="highlight">12</span></div>
                    </div>
                    <TicketBarcode />
                  </div>
                </div>
              </div>
            </div>
            <div className="card-back">
              <div className="main-part-back">
                <div className="agenda">
                  {[
                    [
                      ["12:00 PM", "Opening Ceremony", "John Doe (Uiverse)"],
                      ["12:45 PM", "The Future of Web Design", "Jack McLovin (Uiverse)"],
                      ["02:00 PM", "Coffee Break", "Every creative mind needs coffee"],
                    ],
                    [
                      ["02:30 PM", "Panel: AI & the Next Era of Frontend", "Allison Burgers"],
                      ["03:15 PM", "Workshop: Building with Tailwind 4.0", "Design systems lab"],
                      ["05:30 PM", "Closing Remarks", "John Doe (Uiverse)"],
                    ],
                  ].map((col, colIndex) => (
                    <div className="col" key={colIndex}>
                      {col.map(([time, text, speaker]) => (
                        <div className="agenda-item" key={time}>
                          <div className="agenda-time">{time}</div>
                          <div className="agenda-text">{text}</div>
                          <div className="speaker">— {speaker}</div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="small-part-back">
                <span className="mono">#30112</span>
              </div>
            </div>
          </div>
        </label>
      </div>
      <div className="hint">CLICK TO FLIP</div>
    </TicketWidgetWrap>
  );
}

function TicketDashboard({ setModalOpen }: { setModalOpen: (open: boolean) => void }) {
  return (
    <TicketFrame>
      <TicketGate>
        <TicketGateHeader>
          <div>
            <span>flip ticket conference pass</span>
            <strong>VIP Ticket Gate</strong>
          </div>
          <BatteryActionRow>
            <TicketActionButton type="button" onClick={() => setModalOpen(true)}>
              <Boxes size={17} />
              Open ticket modal
            </TicketActionButton>
          </BatteryActionRow>
        </TicketGateHeader>

        <TicketPanel>
          <h3>Agenda Flow</h3>
          <TicketAgendaList>
            {[
              ["12:00", "Opening Ceremony", "Uiverse", "#af40ff"],
              ["12:45", "Future of Web Design", "Main Stage", "#5b42f3"],
              ["01:30", "Design Systems Review", "Studio B", "gold"],
              ["02:30", "AI & Frontend Panel", "Hall 3", "#af40ff"],
              ["03:15", "Tailwind 4.0 Workshop", "Lab A", "#5b42f3"],
              ["05:30", "Closing Remarks", "Universe", "gold"],
            ].map(([time, title, room, accent]) => (
              <TicketAgendaRow key={time} $accent={accent}>
                <strong>{time}</strong>
                <span>{title}</span>
                <em>{room}</em>
              </TicketAgendaRow>
            ))}
          </TicketAgendaList>
          <TicketAgendaPulse aria-label="Ticket agenda pulse">
            {[
              ["12", "open", "#af40ff"],
              ["01", "studio", "#5b42f3"],
              ["02", "panel", "gold"],
              ["03", "lab", "#af40ff"],
              ["04", "scan", "#5b42f3"],
              ["05", "close", "gold"],
            ].map(([time, label, accent]) => (
              <button key={`${time}-${label}`} type="button" style={{ "--ticket-pulse": accent } as React.CSSProperties}>
                <strong>{time}</strong>
                <span>{label}</span>
              </button>
            ))}
          </TicketAgendaPulse>
        </TicketPanel>

        <TicketPassStage>
          <TicketWidget />
        </TicketPassStage>

        <TicketPanel>
          <h3>Ticket Controls</h3>
          <TicketAgendaList>
            {[
              ["SCAN", "Barcode validation", "ready", "#af40ff"],
              ["FLIP", "Back agenda access", "click", "#5b42f3"],
              ["SEAT", "Gate 3 / Row 1 / Seat 12", "locked", "gold"],
              ["GLOW", "VIP pass highlight", "active", "#af40ff"],
            ].map(([code, title, state, accent]) => (
              <TicketAgendaRow key={code} $accent={accent}>
                <strong>{code}</strong>
                <span>{title}</span>
                <em>{state}</em>
              </TicketAgendaRow>
            ))}
          </TicketAgendaList>
          <TicketSeatMap aria-label="Ticket seat map">
            {Array.from({ length: 16 }, (_, index) => (
              <button key={index} type="button" data-active={index === 2 || index === 11}>
                {index < 8 ? "R1" : "R2"}-{(index % 8) + 1}
              </button>
            ))}
          </TicketSeatMap>
        </TicketPanel>

        <TicketScanTray>
          <div>
            <h3>Pass Metrics</h3>
            <p>票券信息移到底部检票条。</p>
          </div>
          <TicketMetricGrid>
            {[
              ["Pass Type", "VIP", "#af40ff"],
              ["Gate", "3", "#5b42f3"],
              ["Agenda", "6", "gold"],
            ].map(([label, value, accent]) => (
              <TicketMetric key={label} $accent={accent} style={{ minHeight: 82, padding: 14 }}>
                <span>{label}</span>
                <strong style={{ fontSize: 28, marginTop: 8 }}>{value}</strong>
              </TicketMetric>
            ))}
          </TicketMetricGrid>
          <TicketScanLines aria-hidden="true">
            {["88%", "64%", "96%", "52%"].map((width) => (
              <span key={width} style={{ "--scan": width } as React.CSSProperties} />
            ))}
          </TicketScanLines>
          <TicketActionButton type="button">
            <Sparkles size={17} />
            Scan
          </TicketActionButton>
        </TicketScanTray>
      </TicketGate>
    </TicketFrame>
  );
}

function ClayPaletteWidget() {
  return (
    <ClayPaletteWrap aria-label="Clay color palette">
      <div className="clay-slab">
        <div className="container-items">
          {clayColors.map((color) => (
            <button
              key={color}
              type="button"
              className="item-color"
              style={{ "--color": color } as React.CSSProperties}
              aria-label={color}
              data-color={color}
              onClick={() => void navigator.clipboard?.writeText(color).catch(() => undefined)}
            />
          ))}
        </div>
      </div>
    </ClayPaletteWrap>
  );
}

function ClayDashboard({ setModalOpen }: { setModalOpen: (open: boolean) => void }) {
  const [activeColor, setActiveColor] = useState<(typeof clayColors)[number]>("#10b981");
  const clayModes = [
    ["Copy", "#e11d48", "tooltip + copied"],
    ["Mix", "#fb923c", "blob morph"],
    ["Raise", "#10b981", "soft depth"],
    ["Round", "#0ea5e9", "hover circle"],
    ["Press", "#8b5cf6", "inset active"],
  ] as const;

  return (
    <ClayFrame>
      <ClayWorkbench>
        <ClayCompactTitle>
          <div>
            <span>soft clay neumorphic palette</span>
            <strong>Clay Palette Workbench</strong>
          </div>
          <ClayActionButton type="button" onClick={() => setModalOpen(true)}>
            <Palette size={17} />
            Open clay modal
          </ClayActionButton>
        </ClayCompactTitle>

        <ClayToolRail>
          <h3>Clay Tools</h3>
          <p>左侧工具是软陶按钮：点击后会凹陷选中，hover 保留 blob 变圆和横向浮动。</p>
          {clayModes.map(([name, color, note]) => (
            <ClayBlobButton key={name} type="button" $accent={color} $active={activeColor === color} onClick={() => setActiveColor(color)}>
              <span className="blob" />
              <span>
                <strong>{name}</strong>
                <span>{note}</span>
              </span>
            </ClayBlobButton>
          ))}
        </ClayToolRail>

        <ClayMixMat $accent={activeColor}>
          <ClayPaletteWidget />
          <ClayTokenRail aria-label="Clay blend controls">
            {[
              ["Base", activeColor, "active"],
              ["Soft", "#facc15", "warm"],
              ["Lift", "#0ea5e9", "cool"],
              ["Deep", "#8b5cf6", "shade"],
            ].map(([name, color, value]) => (
              <button key={`${name}-${color}`} type="button" style={{ "--token-color": color } as React.CSSProperties} onClick={() => setActiveColor(color as (typeof clayColors)[number])}>
                <i />
                <span>
                  <strong>{name}</strong>
                  <span>{color}</span>
                </span>
                <em>{value}</em>
              </button>
            ))}
          </ClayTokenRail>
        </ClayMixMat>

        <ClayInspector $accent={activeColor}>
          <h3>Selected Clay</h3>
          <p>点击左侧工具或中间色块对比：选中色会同步影响工作台背景 blob、预览块和底部图表。</p>
          <div className="preview" />
          <div className="code">{activeColor}</div>
        </ClayInspector>

        <ClayBottomTray>
          <div>
            <h3>Clay Analytics</h3>
            <p>软陶排行和柱体都保留 blob/凹陷/浮起反馈。</p>
            <ClayStatPods aria-label="Clay stat pods">
              {[
                ["98", "blend score", activeColor],
                ["10", "swatches", "#0ea5e9"],
                ["04", "modes", "#fb923c"],
                ["22", "radius", "#8b5cf6"],
              ].map(([value, label, color]) => (
                <button key={label} type="button" style={{ "--pod-color": color } as React.CSSProperties} onClick={() => setActiveColor(color as (typeof clayColors)[number])}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </button>
              ))}
            </ClayStatPods>
          </div>
          <div>
            <ClayMiniRanking aria-label="Clay palette ranking">
              {[
                ["01", "Mint Flow", "#10b981", "98"],
                ["02", "Rose Signal", "#e11d48", "91"],
                ["03", "Sky Glass", "#0ea5e9", "86"],
              ].map(([rank, name, color, score]) => (
                <button key={name} type="button" onClick={() => setActiveColor(color as (typeof clayColors)[number])}>
                  <i style={{ "--rank-color": color } as React.CSSProperties} />
                  <span>{rank} · {name}</span>
                  <strong>{score}</strong>
                </button>
              ))}
            </ClayMiniRanking>
            <ClayMiniChart aria-label="Clay compact bar chart" style={{ marginTop: 12 }}>
              {clayBars.map((height, index) => (
                <span
                  key={`${height}-${index}`}
                  style={{ height: `${Math.max(24, height)}%`, "--bar-color": index === 2 ? activeColor : clayColors[index % clayColors.length] } as React.CSSProperties}
                />
              ))}
            </ClayMiniChart>
          </div>
          <div>
            <ClaySwatchStack aria-label="Clay swatch controls">
              {clayColors.slice(0, 5).map((color) => (
                <button
                  key={color}
                  type="button"
                  aria-label={`Select ${color}`}
                  style={{ "--swatch-color": color } as React.CSSProperties}
                  onClick={() => setActiveColor(color)}
                />
              ))}
            </ClaySwatchStack>
            <ClayActionButton type="button" style={{ width: "100%", marginTop: 14 }} onClick={() => setActiveColor(clayColors[(clayColors.indexOf(activeColor) + 1) % clayColors.length])}>
              <Sparkles size={17} />
              Next blob
            </ClayActionButton>
          </div>
        </ClayBottomTray>
      </ClayWorkbench>
    </ClayFrame>
  );
}

function LuminousCardWidget({ idPrefix = "lumen-main", compact = false }: { idPrefix?: string; compact?: boolean }) {
  const inputId = `${idPrefix}-toggle`;

  return (
    <LumenWidgetWrap $compact={compact}>
      <div className="luminous-card-container">
        <input type="checkbox" className="luminous-toggle-input" id={inputId} />
        <label htmlFor={inputId} className="luminous-card">
          <div className="luminous-light-layer">
            <div className="luminous-slit" />
            <div className="luminous-lumen">
              <div className="min" />
              <div className="mid" />
              <div className="hi" />
            </div>
            <div className="luminous-darken">
              <div className="sl" />
              <div className="ll" />
              <div className="slt" />
              <div className="srt" />
            </div>
          </div>
          <div className="luminous-content">
            <div className="luminous-icon">
              <Boxes size={compact ? 42 : 58} strokeWidth={1.35} />
            </div>
            <div className="luminous-bottom">
              <div className="luminous-title">Luminous Design</div>
              <p className="luminous-description">
                Light Folds Around Form
                <br />
                Revealing Layers Of Depth
              </p>
              <div className="luminous-toggle" aria-hidden="true">
                <div className="luminous-handle" />
                <span className="luminous-toggle-label">Activate Lumen</span>
              </div>
            </div>
          </div>
        </label>
      </div>
    </LumenWidgetWrap>
  );
}

function LumenDashboard({ setModalOpen }: { setModalOpen: (open: boolean) => void }) {
  const [activeChannel, setActiveChannel] = useState("02");
  const channels = [
    ["01", "Primary Slit", "top aperture", 72],
    ["02", "Middle Lumen", "wide glow cone", 92],
    ["03", "Lower Darken", "shadow fold", 56],
    ["04", "Side Refraction", "edge bounce", 80],
  ] as const;

  return (
    <LumenFrame>
      <LumenLab>
        <LumenHeaderStrip>
          <div>
            <span>checkbox driven light-fold interface</span>
            <strong>Luminous Gate Lab</strong>
          </div>
          <LumenActionRow>
            <LumenActionButton type="button" onClick={() => setModalOpen(true)}>
              <Sparkles size={17} />
              Open lumen modal
            </LumenActionButton>
            <LumenActionButton type="button">
              <Gauge size={17} />
              Balance folds
            </LumenActionButton>
          </LumenActionRow>
        </LumenHeaderStrip>

        <LumenRailPanel>
          <h3>Light Channels</h3>
          <p>每个通道都是暗槽按钮，点击后像开关一样点亮。</p>
          {channels.map(([code, name, note]) => (
            <LumenChannelButton key={code} type="button" $on={activeChannel === code} onClick={() => setActiveChannel(code)}>
              <span className="slot">{code}</span>
              <span>
                <strong>{name}</strong>
                <span>{note}</span>
              </span>
            </LumenChannelButton>
          ))}
          <LumenApertureGrid aria-label="Lumen aperture controls">
            {[
              ["34", "slit width", .34],
              ["78", "halo depth", .78],
              ["62", "fold arc", .62],
              ["91", "white gain", .91],
            ].map(([value, label, open]) => (
              <button key={label} type="button" style={{ "--open": open } as React.CSSProperties}>
                <strong>{value}</strong>
                <span>{label}</span>
              </button>
            ))}
          </LumenApertureGrid>
        </LumenRailPanel>

        <LumenCardBay>
          <LuminousCardWidget compact />
          <LumenMirrorRail aria-hidden="true">
            {[0, 1, 2, 3, 4].map((index) => (
              <span key={index} style={{ "--lift": `${index % 2 === 0 ? 0 : -10}px` } as React.CSSProperties} />
            ))}
          </LumenMirrorRail>
        </LumenCardBay>

        <LumenScope>
          <h3>Beam Scope</h3>
          <p>右侧是光束排行和通道强度，不再是指标卡。</p>
          <LumenRanking aria-label="Lumen channel ranking">
            {channels.map(([code, name, , power], index) => (
              <button key={name} type="button" onClick={() => setActiveChannel(code)}>
                <span className="rank">{index + 1}</span>
                <span>{name}</span>
                <strong>{power}</strong>
              </button>
            ))}
          </LumenRanking>
          <LumenBeamStack>
            {channels.map(([code, name, , power]) => (
              <button key={code} type="button" style={{ "--beam": `${power}%` } as React.CSSProperties} onClick={() => setActiveChannel(code)}>
                {activeChannel === code ? "ON" : "DIM"} · {name}
              </button>
            ))}
          </LumenBeamStack>
        </LumenScope>

        <LumenSpectrumTray>
          <div>
            <h3>Spectrum Strip</h3>
            <p>底部压缩成一屏可见的光谱条。</p>
          </div>
          <LumenChart aria-label="Lumen compact chart" style={{ minHeight: 86, marginTop: 0, padding: 12 }}>
            {lumenBars.map((height, index) => (
              <span key={`${height}-${index}`} className="beam" style={{ height: `${height}%`, opacity: activeChannel === `0${(index % 4) + 1}` ? 1 : 0.42 + index * 0.035 }} />
            ))}
          </LumenChart>
          <strong>{activeChannel} / active</strong>
        </LumenSpectrumTray>
      </LumenLab>
    </LumenFrame>
  );
}

function PromptChatWidget({ wide = false, idPrefix = "prompt-main" }: { wide?: boolean; idPrefix?: string }) {
  const [submitArmed, setSubmitArmed] = useState(false);

  return (
    <PromptWidgetWrap $wide={wide}>
      <div className="container-chat-options">
        <div className="chat">
          <div className="chat-bot">
            <textarea id={`${idPrefix}-textarea`} name={`${idPrefix}-textarea`} placeholder="Imagine Something...✦˚" defaultValue="" aria-label="Prompt input" />
          </div>
          <div className="options">
            <div className="btns-add">
              <button type="button" aria-label="Attach file">
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
                  <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8v8a5 5 0 1 0 10 0V6.5a3.5 3.5 0 1 0-7 0V15a2 2 0 0 0 4 0V8" />
                </svg>
              </button>
              <button type="button" aria-label="Open tools">
                <svg viewBox="0 0 24 24" height={20} width={20} xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm0 10a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm10 0a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm0-8h6m-3-3v6" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" fill="none" />
                </svg>
              </button>
              <button type="button" aria-label="Use web context">
                <svg viewBox="0 0 24 24" height={20} width={20} xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m-2.29-2.333A17.9 17.9 0 0 1 8.027 13H4.062a8.01 8.01 0 0 0 5.648 6.667M10.03 13c.151 2.439.848 4.73 1.97 6.752A15.9 15.9 0 0 0 13.97 13zm9.908 0h-3.965a17.9 17.9 0 0 1-1.683 6.667A8.01 8.01 0 0 0 19.938 13M4.062 11h3.965A17.9 17.9 0 0 1 9.71 4.333A8.01 8.01 0 0 0 4.062 11m5.969 0h3.938A15.9 15.9 0 0 0 12 4.248A15.9 15.9 0 0 0 10.03 11m4.259-6.667A17.9 17.9 0 0 1 15.973 11h3.965a8.01 8.01 0 0 0-5.648-6.667" fill="currentColor" />
                </svg>
              </button>
            </div>
            <button
              type="button"
              className={`btn-submit${submitArmed ? " is-sent" : ""}`}
              aria-label="Submit prompt"
              onBlur={() => setSubmitArmed(false)}
              onClick={() => setSubmitArmed(true)}
              onFocus={() => setSubmitArmed(true)}
            >
              <i>
                <svg viewBox="0 0 512 512">
                  <path fill="currentColor" d="M473 39.05a24 24 0 0 0-25.5-5.46L47.47 185h-.08a24 24 0 0 0 1 45.16l.41.13l137.3 58.63a16 16 0 0 0 15.54-3.59L422 80a7.07 7.07 0 0 1 10 10L226.66 310.26a16 16 0 0 0-3.59 15.54l58.65 137.38c.06.2.12.38.19.57c3.2 9.27 11.3 15.81 21.09 16.25h1a24.63 24.63 0 0 0 23-15.46L478.39 64.62A24 24 0 0 0 473 39.05" />
                </svg>
              </i>
            </button>
          </div>
        </div>
      </div>
      <div className="tags">
        <span>Create An Image</span>
        <span>Analyse Data</span>
        <span>More</span>
      </div>
    </PromptWidgetWrap>
  );
}

function PromptDashboard({ setModalOpen }: { setModalOpen: (open: boolean) => void }) {
  const [activeTask, setActiveTask] = useState("02");
  const promptTasks = [
    ["01", "Image generation prompt", "image"],
    ["02", "Data analysis request", "data"],
    ["03", "Web context summary", "web"],
    ["04", "Dashboard copy polish", "copy"],
  ] as const;

  return (
    <PromptFrame>
      <PromptCockpit>
        <PromptCommandHeader>
          <div>
            <span>compact ai prompt cockpit</span>
            <strong>Prompt Bot Cockpit</strong>
          </div>
          <PromptActionRow style={{ marginTop: 0 }}>
            <PromptActionButton type="button" onClick={() => setModalOpen(true)}>
              <Search size={17} />
              Open prompt modal
            </PromptActionButton>
          </PromptActionRow>
        </PromptCommandHeader>

        <PromptComposerBay>
          <PromptChatWidget wide />
          <PromptOutputGrid>
            <PromptTerminalPanel aria-label="Prompt run log">
              {[
                ["01", "Intent parsed", "image"],
                ["02", "Context packed", "data"],
                ["03", "Draft streamed", "live"],
                ["04", "Guardrails checked", "ok"],
              ].map(([index, label, state]) => (
                <button key={index} type="button" onClick={() => setActiveTask(index)}>
                  <i />
                  <span>
                    <strong>{label}</strong>
                    <span>Imagine Something... pipeline</span>
                  </span>
                  <em>{state}</em>
                </button>
              ))}
            </PromptTerminalPanel>
            <PromptParamPanel aria-label="Prompt parameters">
              {[
                ["Creativity", "86%", "86%"],
                ["Context", "72%", "72%"],
                ["Precision", "64%", "64%"],
              ].map(([label, value, width]) => (
                <button key={label} type="button">
                  <span>
                    <strong>{label}</strong>
                    <em>{value}</em>
                  </span>
                  <i style={{ "--param": width } as React.CSSProperties} />
                </button>
              ))}
            </PromptParamPanel>
            <PromptTerminalTape aria-label="Prompt latency tape">
              {[0.48, 0.72, 0.58, 0.9, 0.66, 0.82, 0.54, 0.78, 0.62, 0.96, 0.7, 0.86].map((opacity, index) => (
                <span key={index} style={{ "--tape-opacity": opacity } as React.CSSProperties} />
              ))}
            </PromptTerminalTape>
          </PromptOutputGrid>
        </PromptComposerBay>

        <PromptQueueDock>
          <h3>Prompt Queue</h3>
          <p>点击队列项切换当前 prompt 类型，行样式沿用输入组件的暗色描边。</p>
          {promptTasks.map(([index, title, state]) => (
            <PromptTaskButton key={index} type="button" $active={activeTask === index} onClick={() => setActiveTask(index)}>
                <span className="index">{index}</span>
                <div>
                  <strong>{title}</strong>
                  <span>Imagine Something... ready</span>
                </div>
                <em>{state}</em>
            </PromptTaskButton>
          ))}
          <PromptQueueFooter aria-label="Prompt queue stats">
            {[
              ["24", "tokens/s"],
              ["1.2s", "latency"],
              ["8", "tools"],
              ["96%", "valid"],
            ].map(([value, label]) => (
              <button key={label} type="button">
                <strong>{value}</strong>
                <span>{label}</span>
              </button>
            ))}
          </PromptQueueFooter>
        </PromptQueueDock>

        <PromptBottomModules>
          <PromptModule>
            <h3>Prompt Volume</h3>
            <p>金属渐变柱体保留发送按钮的内阴影语言。</p>
            <PromptSparkline aria-label="Prompt compact chart">
              {promptBars.map((height, index) => (
                <span key={`${height}-${index}`} style={{ height: `${height}%`, opacity: activeTask === `0${(index % 4) + 1}` ? 1 : 0.62 }} />
              ))}
            </PromptSparkline>
          </PromptModule>
          <PromptModule>
            <h3>Tool Chips</h3>
            <p>chip 的描边、hover 上浮与原始 tags 一致。</p>
            <PromptChipGrid>
              {["Create An Image", "Analyse Data", "More", "Web", "Code", "Draft"].map((chip, index) => (
                <button key={chip} type="button" data-active={activeTask === `0${(index % 4) + 1}`} onClick={() => setActiveTask(`0${(index % 4) + 1}`)}>
                  {chip}
                </button>
              ))}
            </PromptChipGrid>
          </PromptModule>
          <PromptModule>
            <h3>Submit State</h3>
            <p>发送按钮 focus/click 后纸飞机仍会旋转发光。</p>
            <PromptActionButton type="button">
              <Sparkles size={17} />
              Generate brief
            </PromptActionButton>
          </PromptModule>
        </PromptBottomModules>
      </PromptCockpit>
    </PromptFrame>
  );
}

function NeuralCardWidget({ compact = false }: { compact?: boolean }) {
  return (
    <NeuralCardWrap $compact={compact}>
      <div className="card">
        <div className="scanlines" />
        <div className="light-layer">
          <div className="luminous-slit" />
          <div className="lumen">
            <div className="min" />
            <div className="mid" />
            <div className="hi" />
          </div>
          <div className="darken">
            <div className="sl" />
            <div className="ll" />
          </div>
        </div>
        <div className="card-header">
          <div className="cost">3</div>
          <div className="title-group">
            <span className="card-title">Neural Surge</span>
            <p className="card-type">Tech • Instant</p>
          </div>
          <div className="rarity">EPIC</div>
        </div>
        <div className="card-image">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
              <linearGradient id="boltGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ddd" stopOpacity={1} />
                <stop offset="50%" stopColor="#999" stopOpacity={1} />
                <stop offset="100%" stopColor="#666" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#999" stopOpacity=".6" />
                <stop offset="50%" stopColor="#ddd" stopOpacity=".8" />
                <stop offset="100%" stopColor="#999" stopOpacity=".6" />
              </linearGradient>
              <filter id="neuralGlow">
                <feGaussianBlur stdDeviation={2} result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <circle className="energy-ring" cx={100} cy={100} r={80} opacity=".3" />
            <circle className="energy-ring" cx={100} cy={100} r={70} opacity=".4" style={{ animationDuration: "6s", animationDirection: "reverse" }} />
            <circle className="particle" cx={60} cy={60} r={2} style={{ animationDelay: "0s" }} />
            <circle className="particle" cx={140} cy={70} r={2} style={{ animationDelay: ".5s" }} />
            <circle className="particle" cx={50} cy={130} r={2} style={{ animationDelay: "1s" }} />
            <circle className="particle" cx={150} cy={120} r={2} style={{ animationDelay: "1.5s" }} />
            <circle className="particle" cx={100} cy={50} r={2} style={{ animationDelay: "2s" }} />
            <circle className="particle" cx={100} cy={150} r={2} style={{ animationDelay: "2.5s" }} />
            <g className="lightning-bolt" filter="url(#neuralGlow)">
              <path d="M 100 40 L 85 90 L 105 90 L 95 110 L 115 110 L 100 160 L 110 115 L 95 115 L 105 95 L 85 95 Z" />
            </g>
            <circle cx={100} cy={100} r={50} fill="none" stroke="#777" strokeWidth={1} opacity=".2" />
            <circle cx={100} cy={100} r={40} fill="none" stroke="#888" strokeWidth={1} opacity=".3" />
          </svg>
        </div>
        <div className="stats">
          <div className="stat">
            <div className="stat-label">Power</div>
            <div className="stat-value">7</div>
          </div>
          <div className="stat">
            <div className="stat-label">Speed</div>
            <div className="stat-value">9</div>
          </div>
          <div className="stat">
            <div className="stat-label">Range</div>
            <div className="stat-value">5</div>
          </div>
        </div>
        <div className="ability">
          <div className="ability-name">Overload Protocol</div>
          <div className="ability-text">
            Deal <strong>7 damage</strong> to target enemy. If this destroys the target, draw 2 cards and gain <strong>+3 energy</strong>.
          </div>
        </div>
        <div className="card-footer">
          <span>#047/200</span>
          <span>CYBER-2084</span>
        </div>
      </div>
    </NeuralCardWrap>
  );
}

function NeuralDashboard({ setModalOpen }: { setModalOpen: (open: boolean) => void }) {
  const [activeCard, setActiveCard] = useState("Neural Surge");
  const deckCards = [
    ["3", "Neural Surge", "EPIC", "Tech • Instant"],
    ["2", "Ghost Relay", "RARE", "Signal • Trap"],
    ["5", "Chrome Titan", "MYTHIC", "Mech • Unit"],
    ["1", "Data Needle", "COMMON", "Hack • Quick"],
  ] as const;

  return (
    <NeuralFrame>
      <NeuralBoard>
        <NeuralBoardHeader>
          <div>
            <span>cyber collectible battle card</span>
            <strong>Neural Card Table</strong>
          </div>
          <NeuralActionRow style={{ marginTop: 0 }}>
            <NeuralActionButton type="button" onClick={() => setModalOpen(true)}>
              <Zap size={17} />
              Open card modal
            </NeuralActionButton>
            <NeuralActionButton type="button">
              <Trophy size={17} />
              Resolve overload
            </NeuralActionButton>
          </NeuralActionRow>
        </NeuralBoardHeader>

        <NeuralSidePanel>
          <h3>Deck Stack</h3>
          <p>左侧是卡牌堆，不再是指标卡。点击卡牌会同步底部手牌和右侧战斗日志。</p>
          {deckCards.map(([cost, name, rarity, type]) => (
            <NeuralStatButton key={name} type="button" $active={activeCard === name} onClick={() => setActiveCard(name)}>
              <span className="cost">{cost}</span>
              <span>
                <strong>{name}</strong>
                <span>{rarity} · {type}</span>
              </span>
            </NeuralStatButton>
          ))}
          <NeuralDiscardRail aria-label="Neural discard rail">
            {[
              ["Draw", "2 queued", .62],
              ["Discard", "1 burn", .34],
              ["Combo", "3 link", .82],
              ["Shield", "5 armor", .48],
            ].map(([name, value, charge]) => (
              <button key={name} type="button" style={{ "--charge": charge } as React.CSSProperties}>
                <strong>{name}</strong>
                <span>{value}</span>
              </button>
            ))}
          </NeuralDiscardRail>
        </NeuralSidePanel>

        <NeuralCardTable>
          <NeuralTableHud aria-hidden="true">
            <div className="scan-top">
              {[0, 1, 2, 3, 4].map((index) => <span key={index} />)}
            </div>
            <div className="cross" />
            <div className="scan-bottom">
              {[0, 1, 2, 3, 4].map((index) => <span key={index} />)}
            </div>
          </NeuralTableHud>
          <NeuralCardWidget />
        </NeuralCardTable>

        <NeuralCombatLog>
          <h3>Combat Log</h3>
          <p>右侧改成战斗日志，hover 反向滑动，延续卡牌扫描和紫色边光。</p>
          <div className="log">
            <span><strong>{activeCard}</strong><em>selected</em></span>
            <span><strong>Overload</strong><em>+7 dmg</em></span>
            <span><strong>Draw</strong><em>+2 cards</em></span>
            <span><strong>Energy</strong><em>+3 gain</em></span>
          </div>
          <NeuralBattleMatrix aria-label="Neural battle matrix">
            {[
              ["7", "power", .78],
              ["9", "speed", .94],
              ["5", "range", .56],
              ["3", "energy", .68],
            ].map(([value, label, matrix]) => (
              <button key={label} type="button" style={{ "--matrix": matrix } as React.CSSProperties}>
                <strong>{value}</strong>
                <span>{label}</span>
              </button>
            ))}
          </NeuralBattleMatrix>
        </NeuralCombatLog>

        <NeuralHandTray>
          <div>
            <h3>Hand Row</h3>
            <p>底部是一排可点击手牌和能量图表，而不是常规卡片。</p>
          </div>
          <NeuralMiniCards>
            {deckCards.map(([, name, rarity]) => (
              <button key={name} type="button" data-active={activeCard === name} onClick={() => setActiveCard(name)}>
                {name}
                <br />
                {rarity}
              </button>
            ))}
          </NeuralMiniCards>
          <NeuralEnergyChart aria-label="Neural energy chart">
            {neuralBars.map((value, index) => (
              <span key={`${value}-${index}`} style={{ height: `${value * 9}%`, opacity: activeCard === deckCards[index % deckCards.length][1] ? 1 : 0.66 }} />
            ))}
          </NeuralEnergyChart>
          <strong>{activeCard}</strong>
        </NeuralHandTray>
      </NeuralBoard>
    </NeuralFrame>
  );
}

export function LiquidKitShowcase() {
  const [activeDashboard, setActiveDashboard] = useState<DashboardPage>("soft");
  const [backgroundMode, setBackgroundMode] = useState<BackgroundMode>("mint");
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <RootShell $background={backgroundMode} $dashboard={activeDashboard} data-dashboard={activeDashboard}>
      <AppShell>
        <GlobalSidebar $dashboard={activeDashboard}>
          <GlobalBrand>
            <span className="mark">
              <Sparkles size={25} />
            </span>
            <div>
              <strong>Dashboard Lab</strong>
              <span>统一左侧菜单，每个页面独立布局和交互语言。</span>
            </div>
          </GlobalBrand>
          <GlobalNav aria-label="Dashboard style navigation">
            {dashboardItems.map(([id, label, Icon]) => (
              <GlobalNavButton key={id} type="button" aria-label={label} data-label={label} $dashboard={activeDashboard} $active={activeDashboard === id} onClick={() => setActiveDashboard(id)}>
                <Icon size={19} />
                <span className="label">{label}</span>
              </GlobalNavButton>
            ))}
          </GlobalNav>
          <GlobalSidebarFooter>
            <strong>Style switcher</strong>
            <span>左侧只负责切换风格，右侧 dashboard 不再放重复菜单。</span>
          </GlobalSidebarFooter>
        </GlobalSidebar>

        <GlobalContent>
          {activeDashboard === "soft" ? (
            <SoftDashboard backgroundMode={backgroundMode} setBackgroundMode={setBackgroundMode} setModalOpen={setModalOpen} />
          ) : activeDashboard === "electric" ? (
            <ElectricDashboard setModalOpen={setModalOpen} />
          ) : activeDashboard === "premium" ? (
            <PremiumDashboard setModalOpen={setModalOpen} />
          ) : activeDashboard === "request" ? (
            <RequestDashboard setModalOpen={setModalOpen} />
          ) : activeDashboard === "unlock" ? (
            <UnlockDashboard setModalOpen={setModalOpen} />
          ) : activeDashboard === "filament" ? (
            <FilamentDashboard setModalOpen={setModalOpen} />
          ) : activeDashboard === "battery" ? (
            <BatteryDashboard setModalOpen={setModalOpen} />
          ) : activeDashboard === "depth" ? (
            <DepthDashboard setModalOpen={setModalOpen} />
          ) : activeDashboard === "void" ? (
            <VoidDashboard setModalOpen={setModalOpen} />
          ) : activeDashboard === "divine" ? (
            <DivineDashboard setModalOpen={setModalOpen} />
          ) : activeDashboard === "ticket" ? (
            <TicketDashboard setModalOpen={setModalOpen} />
          ) : activeDashboard === "clay" ? (
            <ClayDashboard setModalOpen={setModalOpen} />
          ) : activeDashboard === "lumen" ? (
            <LumenDashboard setModalOpen={setModalOpen} />
          ) : activeDashboard === "prompt" ? (
            <PromptDashboard setModalOpen={setModalOpen} />
          ) : activeDashboard === "neural" ? (
            <NeuralDashboard setModalOpen={setModalOpen} />
          ) : (
            <ConfirmDashboard setModalOpen={setModalOpen} />
          )}
        </GlobalContent>
      </AppShell>

      {modalOpen &&
        (activeDashboard === "filament" ? (
          <ModalBackdrop role="presentation" $electric>
            <FilamentModal role="dialog" aria-modal="true" aria-labelledby="filament-modal-title">
              <ModalTop>
                <div>
                  <h2 id="filament-modal-title">Ignition Control</h2>
                  <p>弹窗沿用灯泡控件的金属、玻璃、灯丝点亮和文字翻转交互。</p>
                </div>
                <FilamentSmallButton type="button" aria-label="Close modal" onClick={() => setModalOpen(false)}>
                  <X size={18} />
                </FilamentSmallButton>
              </ModalTop>
              <FilamentPowerButton idPrefix="modal-filament" />
            </FilamentModal>
          </ModalBackdrop>
        ) : activeDashboard === "ticket" ? (
          <ModalBackdrop role="presentation" $electric>
            <TicketModal role="dialog" aria-modal="true" aria-labelledby="ticket-modal-title">
              <ModalTop>
                <div>
                  <h2 id="ticket-modal-title">VIP Ticket Inspect</h2>
                  <p>弹窗也保留点击翻面、左右 tilt、glitch 标题、barcode 和背面 agenda。</p>
                </div>
                <TicketActionButton type="button" aria-label="Close modal" onClick={() => setModalOpen(false)}>
                  <X size={18} />
                </TicketActionButton>
              </ModalTop>
              <ActionRow style={{ marginTop: 26, justifyContent: "center" }}>
                <TicketWidget />
              </ActionRow>
            </TicketModal>
          </ModalBackdrop>
        ) : activeDashboard === "clay" ? (
          <ModalBackdrop role="presentation">
            <ClayModal role="dialog" aria-modal="true" aria-labelledby="clay-modal-title">
              <ModalTop>
                <div>
                  <h2 id="clay-modal-title">Clay Palette Inspect</h2>
                  <p>弹窗也保留软陶调色盘的凹陷底板、异形色块、hover 色值 tooltip、按压内陷和 Copied focus 状态。</p>
                </div>
                <ClayActionButton type="button" aria-label="Close modal" onClick={() => setModalOpen(false)}>
                  <X size={18} />
                </ClayActionButton>
              </ModalTop>
              <ActionRow style={{ marginTop: 26, justifyContent: "center" }}>
                <ClayPaletteWidget />
              </ActionRow>
            </ClayModal>
          </ModalBackdrop>
        ) : activeDashboard === "lumen" ? (
          <ModalBackdrop role="presentation" $electric>
            <LumenModal role="dialog" aria-modal="true" aria-labelledby="lumen-modal-title">
              <ModalTop>
                <div>
                  <h2 id="lumen-modal-title">Luminous Gate Inspect</h2>
                  <p>弹窗也保留 checkbox 点亮光缝、lumen 光束层、暗部折影、toggle handle 移动和外框折角 hover。</p>
                </div>
                <LumenActionButton type="button" aria-label="Close modal" onClick={() => setModalOpen(false)}>
                  <X size={18} />
                </LumenActionButton>
              </ModalTop>
              <ActionRow style={{ marginTop: 26, justifyContent: "center" }}>
                <LuminousCardWidget idPrefix="modal-lumen" compact />
              </ActionRow>
            </LumenModal>
          </ModalBackdrop>
        ) : activeDashboard === "prompt" ? (
          <ModalBackdrop role="presentation" $electric>
            <PromptModal role="dialog" aria-modal="true" aria-labelledby="prompt-modal-title">
              <ModalTop>
                <div>
                  <h2 id="prompt-modal-title">Prompt Bot Composer</h2>
                  <p>弹窗也保留渐变描边输入框、左上光斑、hover 上浮附加按钮、发送按钮 focus 旋转发光和 tags。</p>
                </div>
                <PromptActionButton type="button" aria-label="Close modal" onClick={() => setModalOpen(false)}>
                  <X size={18} />
                </PromptActionButton>
              </ModalTop>
              <ActionRow style={{ marginTop: 26, justifyContent: "center" }}>
                <PromptChatWidget wide idPrefix="modal-prompt" />
              </ActionRow>
            </PromptModal>
          </ModalBackdrop>
        ) : activeDashboard === "neural" ? (
          <ModalBackdrop role="presentation" $electric>
            <NeuralModal role="dialog" aria-modal="true" aria-labelledby="neural-modal-title">
              <ModalTop>
                <div>
                  <h2 id="neural-modal-title">Neural Surge Inspect</h2>
                  <p>弹窗也保留卡牌 hover 抬升、scanlines、紫色 slit、lumen 光束、旋转能量环和漂浮粒子。</p>
                </div>
                <NeuralActionButton type="button" aria-label="Close modal" onClick={() => setModalOpen(false)}>
                  <X size={18} />
                </NeuralActionButton>
              </ModalTop>
              <ActionRow style={{ marginTop: 26, justifyContent: "center" }}>
                <NeuralCardWidget compact />
              </ActionRow>
            </NeuralModal>
          </ModalBackdrop>
        ) : activeDashboard === "divine" ? (
          <ModalBackdrop role="presentation" $electric>
            <DivineModal role="dialog" aria-modal="true" aria-labelledby="divine-modal-title">
              <ModalTop>
                <div>
                  <h2 id="divine-modal-title">Divine Engine Inspect</h2>
                  <p>弹窗也保留熔岩外圈、idle 浮动、stats 展开、ability 抬升和粒子外溢。</p>
                </div>
                <DivineActionButton type="button" aria-label="Close modal" onClick={() => setModalOpen(false)}>
                  <X size={18} />
                </DivineActionButton>
              </ModalTop>
              <ActionRow style={{ marginTop: 26, justifyContent: "center" }}>
                <DivineCardWidget />
              </ActionRow>
            </DivineModal>
          </ModalBackdrop>
        ) : activeDashboard === "void" ? (
          <ModalBackdrop role="presentation" $electric>
            <VoidModal role="dialog" aria-modal="true" aria-labelledby="void-modal-title">
              <ModalTop>
                <div>
                  <h2 id="void-modal-title">Void Unit Inspect</h2>
                  <p>弹窗也保留 monolith 卡牌结构、九宫格 hover 传感器、主题色切换和上下斜切玻璃 band。</p>
                </div>
                <VoidActionButton type="button" aria-label="Close modal" onClick={() => setModalOpen(false)}>
                  <X size={18} />
                </VoidActionButton>
              </ModalTop>
              <ActionRow style={{ marginTop: 26, justifyContent: "center" }}>
                <VoidCardWidget />
              </ActionRow>
            </VoidModal>
          </ModalBackdrop>
        ) : activeDashboard === "depth" ? (
          <ModalBackdrop role="presentation" $electric>
            <DepthModal role="dialog" aria-modal="true" aria-labelledby="depth-modal-title">
              <ModalTop>
                <div>
                  <h2 id="depth-modal-title">Depth Instrument</h2>
                  <p>弹窗也保留九宫格 hover、SVG 外轮廓、Z 层百分比和充电条视差，而不是普通对话框换色。</p>
                </div>
                <DepthButton type="button" aria-label="Close modal" onClick={() => setModalOpen(false)}>
                  <X size={18} />
                </DepthButton>
              </ModalTop>
              <ActionRow style={{ marginTop: 26, justifyContent: "center" }}>
                <DepthBatteryWidget />
              </ActionRow>
            </DepthModal>
          </ModalBackdrop>
        ) : activeDashboard === "battery" ? (
          <ModalBackdrop role="presentation" $electric>
            <BatteryModal role="dialog" aria-modal="true" aria-labelledby="battery-modal-title">
              <BatteryKeyframes aria-hidden="true" />
              <ModalTop>
                <div>
                  <h2 id="battery-modal-title">Charge Control</h2>
                  <p>弹窗也沿用电池卡片：边角扫描、分段充电、tooltip 和粒子能量状态都保留。</p>
                </div>
                <BatteryActionButton type="button" aria-label="Close modal" onClick={() => setModalOpen(false)}>
                  <X size={18} />
                </BatteryActionButton>
              </ModalTop>
              <ActionRow style={{ marginTop: 22, justifyContent: "center" }}>
                <BatteryChargeWidget compact />
              </ActionRow>
            </BatteryModal>
          </ModalBackdrop>
        ) : activeDashboard === "confirm" ? (
          <ModalBackdrop role="presentation">
            <ConfirmModal role="dialog" aria-modal="true" aria-labelledby="confirm-modal-title">
              <ModalTop>
                <div>
                  <h2 id="confirm-modal-title">Confirm Action</h2>
                  <p>弹窗内也保留同款 checkbox 确认态、绿色填充、玻璃变形和勾选绘制。</p>
                </div>
                <ConfirmActionButton type="button" aria-label="Close modal" onClick={() => setModalOpen(false)}>
                  <X size={18} />
                </ConfirmActionButton>
              </ModalTop>
              <ConfirmSwipeControl idPrefix="modal-confirm" />
            </ConfirmModal>
          </ModalBackdrop>
        ) : activeDashboard === "unlock" ? (
          <ModalBackdrop role="presentation">
            <UnlockModal role="dialog" aria-modal="true" aria-labelledby="unlock-modal-title">
              <ModalTop>
                <div>
                  <h2 id="unlock-modal-title">Hold To Unlock</h2>
                  <p>弹窗也使用滑动确认控件，保留描边、涟漪、锁扣和钥匙动画。</p>
                </div>
                <UnlockActionButton type="button" aria-label="Close modal" onClick={() => setModalOpen(false)}>
                  <X size={18} />
                </UnlockActionButton>
              </ModalTop>
              <UnlockSwipeControl label="Hold to unlock modal action" />
            </UnlockModal>
          </ModalBackdrop>
        ) : activeDashboard === "request" ? (
          <ModalBackdrop role="presentation" $electric>
            <RequestModal role="dialog" aria-modal="true" aria-labelledby="request-modal-title">
              <ModalTop>
                <div>
                  <h2 id="request-modal-title">Additional Requests</h2>
                  <p>弹窗也使用同款暗玻璃和发光组件，而不是普通换皮弹窗。</p>
                </div>
                <RequestActionButton type="button" aria-label="Close modal" onClick={() => setModalOpen(false)}>
                  <X size={18} />
                </RequestActionButton>
              </ModalTop>
              <RequestControlCard idPrefix="modal-request" />
            </RequestModal>
          </ModalBackdrop>
        ) : activeDashboard === "premium" ? (
          <ModalBackdrop role="presentation">
            <Modal role="dialog" aria-modal="true" aria-labelledby="premium-modal-title">
              <ModalTop>
                <div>
                  <h2 id="premium-modal-title">Premium Capsule</h2>
                  <p>这个弹窗跟随第三种高级胶囊风格，使用浅玻璃、蓝金粉渐变和柔和内阴影。</p>
                </div>
                <IconButton type="button" aria-label="Close modal" onClick={() => setModalOpen(false)}>
                  <X size={18} />
                </IconButton>
              </ModalTop>
              <ActionRow style={{ marginTop: 18 }}>
                <PremiumButton type="button" aria-label="Confirm" onClick={() => setModalOpen(false)}>
                  <span className="text">
                    <PremiumWord text="Confirm" />
                    <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <line x1={7} y1={17} x2={17} y2={7} />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </span>
                </PremiumButton>
              </ActionRow>
            </Modal>
          </ModalBackdrop>
        ) : activeDashboard === "electric" ? (
          <ModalBackdrop role="presentation" $electric>
            <ElectricModal role="dialog" aria-modal="true" aria-labelledby="electric-modal-title">
              <ModalTop>
                <div>
                  <h2 id="electric-modal-title">Let&apos;s Cook</h2>
                  <p>这个弹窗跟随 Electric Dashboard 的暗色电光风格，保留彩虹描边和黑色玻璃质感。</p>
                </div>
                <ElectricIconButton type="button" aria-label="Close modal" onClick={() => setModalOpen(false)}>
                  <X size={18} />
                </ElectricIconButton>
              </ModalTop>
              <ElectricMetricGrid>
                <ElectricMetricCard $accent="#5eeabd">
                  <span>Batch</span>
                  <strong>42</strong>
                  <em>ready</em>
                </ElectricMetricCard>
                <ElectricMetricCard $accent="#9a4df1">
                  <span>Power</span>
                  <strong>88%</strong>
                  <em>charged</em>
                </ElectricMetricCard>
              </ElectricMetricGrid>
            </ElectricModal>
          </ModalBackdrop>
        ) : (
          <ModalBackdrop role="presentation">
            <Modal role="dialog" aria-modal="true" aria-labelledby="dashboard-modal-title">
              <ModalTop>
                <div>
                  <h2 id="dashboard-modal-title">Create report</h2>
                  <p>这是第一版浅拟物液态风格的弹框，可以承载确认、配置或表单流程。</p>
                </div>
                <IconButton type="button" aria-label="Close modal" onClick={() => setModalOpen(false)}>
                  <X size={18} />
                </IconButton>
              </ModalTop>
              <ToggleGroup>
                <label>Report type</label>
                <Segments>
                  <SegmentButton type="button" $active>
                    Daily
                  </SegmentButton>
                  <SegmentButton type="button">Weekly</SegmentButton>
                  <SegmentButton type="button">Custom</SegmentButton>
                </Segments>
              </ToggleGroup>
              <ActionRow style={{ marginTop: 18, justifyContent: "flex-end" }}>
                <SoftButton type="button" onClick={() => setModalOpen(false)}>
                  Cancel
                </SoftButton>
                <SoftButton type="button" $active onClick={() => setModalOpen(false)}>
                  Save
                </SoftButton>
              </ActionRow>
            </Modal>
          </ModalBackdrop>
        ))}
    </RootShell>
  );
}
