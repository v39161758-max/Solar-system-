(function() {
  // --- 1. COMMANDER PROFILE & SAVE ---
  let saveData = {
    name: "VISHAL",
    credits: 600,
    xp: 0,
    level: 1,
    unlockedShips: [0],
    unlockedPilots: [0]
  };
  try {
    const saved = localStorage.getItem("solarSystem3DSaveV1");
    if (saved) saveData = JSON.parse(saved);
  } catch (e) {}

  function persistSave() {
    saveData.level = 1 + Math.floor(saveData.xp / 250);
    try { localStorage.setItem("solarSystem3DSaveV1", JSON.stringify(saveData)); } catch (e) {}
    updateHeaderUI();
  }

  function updateHeaderUI() {
    const ranks = ["CADET", "ORBITAL PILOT", "STAR NAVIGATOR", "SOLAR COMMANDER", "GALACTIC LEGEND"];
    const rankName = ranks[Math.min(ranks.length - 1, saveData.level - 1)];
    document.getElementById("commanderName").innerText = "CMDR. " + (saveData.name || "VISHAL").toUpperCase();
    document.getElementById("commanderRank").innerText = "LEVEL " + saveData.level + " • " + rankName;
    document.getElementById("headerAvatar").innerText = (saveData.name || "V")[0].toUpperCase();
    document.getElementById("creditBalance").innerText = saveData.credits;
  }

  document.getElementById("editCallsign").onclick = function() {
    const n = prompt("Enter Space Commander Name:", saveData.name);
    if (n && n.trim()) { saveData.name = n.trim(); persistSave(); }
  };

  // --- 2. 8 SPACECRAFT, 5 ASTRONAUTS & 4 SOLAR SYSTEM SECTORS ---
  const SHIPS = [
    { name: "ISRO VIKRAM-X", cls: "ORBITAL INTERCEPTOR", type: "jet", price: 0, color: "#38bdf8", speed: 1.0, agility: 11, specs: "Warp: 28,000 km/h • Twin Ion" },
    { name: "APOLLO FALCON", cls: "HEAVY SHUTTLE", type: "shuttle", price: 450, color: "#f8fafc", speed: 1.06, agility: 10, specs: "Warp: 34,000 km/h • Reinforced Hull" },
    { name: "SOLAR VIPER MK-IV", cls: "STEALTH FIGHTER", type: "delta", price: 950, color: "#f43f5e", speed: 1.14, agility: 13, specs: "Warp: 42,000 km/h • Plasma Core" },
    { name: "NEBULA CRUISER", cls: "DEEP SPACE CRAFT", type: "saucer", price: 1500, color: "#a855f7", speed: 1.18, agility: 14, specs: "Warp: 50,000 km/h • Anti-Gravity" },
    { name: "TITAN HYPERWING", cls: "SATURN RING RACER", type: "delta", price: 2200, color: "#facc15", speed: 1.24, agility: 15, specs: "Warp: 62,000 km/h • Quantum Thruster" },
    { name: "NOVA DESTROYER", cls: "ARMORED CORVETTE", type: "shuttle", price: 3200, color: "#10b981", speed: 1.28, agility: 14, specs: "Warp: 75,000 km/h • Dual Laser" },
    { name: "HELIX PHANTOM", cls: "DARK MATTER SHIP", type: "jet", price: 4800, color: "#f97316", speed: 1.34, agility: 16, specs: "Warp: 90,000 km/h • Zero-Drag" },
    { name: "GALAXY SOVEREIGN", cls: "INTERSTELLAR FLAGSHIP", type: "saucer", price: 7000, color: "#00f3ff", speed: 1.42, agility: 18, specs: "Warp: 120,000 km/h • Hyperdrive" }
  ];

  const HULL_COLORS = ["#38bdf8", "#f8fafc", "#f43f5e", "#facc15", "#10b981", "#a855f7", "#f97316", "#64748b"];

  const PILOTS = [
    { name: "ARYAN", role: "FLIGHT CADET", price: 0, suit: "#e2e8f0", visor: "#38bdf8", speedBonus: 1.0, creditBonus: 1, perk: "Suit Perk: Balanced Telemetry" },
    { name: "VIKRAM", role: "ORBITAL ACE", price: 350, suit: "#ef4444", visor: "#facc15", speedBonus: 1.06, creditBonus: 1, perk: "Suit Perk: +6% Thruster Velocity" },
    { name: "KABIR", role: "ASTEROID HUNTER", price: 800, suit: "#10b981", visor: "#00f3ff", speedBonus: 1.04, creditBonus: 2, perk: "Suit Perk: 2x Crystal Credits" },
    { name: "ROHAN", role: "WARP ENGINEER", price: 1400, suit: "#f59e0b", visor: "#ffffff", speedBonus: 1.10, creditBonus: 2, perk: "Suit Perk: +10% Warp & 2x Credits" },
    { name: "DEV", role: "GALAXY COMMANDER", price: 2400, suit: "#7c3aed", visor: "#f43f5e", speedBonus: 1.15, creditBonus: 3, perk: "Suit Perk: +15% Speed & 3x Credits" }
  ];

  // Solar System Sectors (Unlock by Level)
  const SECTORS = [
    {
      name: "Inner Solar Orbit",
      reqLevel: 1,
      desc: "Level 1 • Sun, Mercury, Venus & Earth",
      bgTop: "#090402",
      bgBot: "#1c0a04",
      planets: [
        { name: "SUN", r: 78, x: -130, y: -120, c1: "#fff7ed", c2: "#f97316", glow: "#ea580c", ring: false },
        { name: "MERCURY", r: 16, x: -45, y: -60, c1: "#cbd5e1", c2: "#64748b", glow: null, ring: false },
        { name: "VENUS", r: 24, x: 45, y: -85, c1: "#fef08a", c2: "#ca8a04", glow: "#eab308", ring: false },
        { name: "EARTH", r: 30, x: 115, y: -35, c1: "#38bdf8", c2: "#15803d", glow: "#0284c7", ring: false, moon: true }
      ]
    },
    {
      name: "Mars & Asteroid Belt",
      reqLevel: 2,
      desc: "Level 2 • Red Planet & Meteor Swarm",
      bgTop: "#0a0202",
      bgBot: "#240808",
      planets: [
        { name: "MARS", r: 36, x: -95, y: -85, c1: "#f87171", c2: "#991b1b", glow: "#dc2626", ring: false },
        { name: "CERES", r: 15, x: 95, y: -55, c1: "#94a3b8", c2: "#475569", glow: null, ring: false }
      ]
    },
    {
      name: "Jupiter & Saturn Rings",
      reqLevel: 3,
      desc: "Level 3 • Gas Giants & Ice Rings",
      bgTop: "#06040d",
      bgBot: "#1b1429",
      planets: [
        { name: "JUPITER", r: 54, x: -105, y: -90, c1: "#fed7aa", c2: "#b45309", glow: "#d97706", ring: false },
        { name: "SATURN", r: 44, x: 100, y: -65, c1: "#fef08a", c2: "#a16207", glow: "#eab308", ring: true }
      ]
    },
    {
      name: "Uranus & Neptune Edge",
      reqLevel: 4,
      desc: "Level 4 • Deep Ice Giants & Warp",
      bgTop: "#010612",
      bgBot: "#041630",
      planets: [
        { name: "URANUS", r: 38, x: -95, y: -80, c1: "#a5f3fc", c2: "#0891b2", glow: "#06b6d4", ring: true },
        { name: "NEPTUNE", r: 40, x: 100, y: -60, c1: "#60a5fa", c2: "#1d4ed8", glow: "#2563eb", ring: false }
      ]
    }
  ];

  let selectedShipIdx = 0, selectedHullColor = SHIPS[0].color, selectedPilotIdx = 0, selectedSectorIdx = 0;

  function switchPage(id) {
    document.querySelectorAll(".screen").forEach(function(s) { s.classList.remove("active"); });
    document.getElementById(id).classList.add("active");
  }

  // --- 3. SWATCHES & UI ---
  const swatchBox = document.getElementById("hullSwatches");
  HULL_COLORS.forEach(function(hex, idx) {
    const s = document.createElement("div");
    s.className = "swatch" + (idx === 0 ? " selected" : "");
    s.style.backgroundColor = hex;
    s.onclick = function() {
      document.querySelectorAll(".swatch").forEach(function(el) { el.classList.remove("selected"); });
      s.classList.add("selected");
      selectedHullColor = hex;
    };
    swatchBox.appendChild(s);
  });

  function refreshHangarUI() {
    const sh = SHIPS[selectedShipIdx];
    const unlocked = saveData.unlockedShips.indexOf(selectedShipIdx) !== -1;
    document.getElementById("shipClass").innerText = sh.cls;
    document.getElementById("shipName").innerText = sh.name;
    document.getElementById("shipSpecs").innerText = sh.specs;
    const btn = document.getElementById("shipActionBtn");
    btn.className = unlocked ? "btn-primary" : "btn-buy";
    btn.innerText = unlocked ? "SELECT CRAFT & CONTINUE ➔" : "💎 BUY SPACECRAFT (" + sh.price + ")";
  }

  document.getElementById("prevShip").onclick = function() {
    selectedShipIdx = (selectedShipIdx - 1 + SHIPS.length) % SHIPS.length;
    selectedHullColor = SHIPS[selectedShipIdx].color;
    refreshHangarUI();
  };
  document.getElementById("nextShip").onclick = function() {
    selectedShipIdx = (selectedShipIdx + 1) % SHIPS.length;
    selectedHullColor = SHIPS[selectedShipIdx].color;
    refreshHangarUI();
  };

  document.getElementById("shipActionBtn").onclick = function() {
    const sh = SHIPS[selectedShipIdx];
    if (saveData.unlockedShips.indexOf(selectedShipIdx) !== -1) {
      refreshPilotsUI();
      switchPage("page-pilots");
    } else if (saveData.credits >= sh.price) {
      saveData.credits -= sh.price;
      saveData.unlockedShips.push(selectedShipIdx);
      persistSave();
      refreshHangarUI();
    } else {
      alert("Need 💎" + sh.price + " Space Credits to unlock this spacecraft!");
    }
  };

  function refreshPilotsUI() {
    const p = PILOTS[selectedPilotIdx];
    const unlocked = saveData.unlockedPilots.indexOf(selectedPilotIdx) !== -1;
    document.getElementById("pilotRole").innerText = p.role;
    document.getElementById("pilotName").innerText = p.name;
    document.getElementById("pilotPerk").innerText = p.perk;
    const btn = document.getElementById("pilotActionBtn");
    btn.className = unlocked ? "btn-primary" : "btn-buy";
    btn.innerText = unlocked ? "CONFIRM PILOT ➔" : "💎 RECRUIT PILOT (" + p.price + ")";
  }

  document.getElementById("prevPilot").onclick = function() {
    selectedPilotIdx = (selectedPilotIdx - 1 + PILOTS.length) % PILOTS.length;
    refreshPilotsUI();
  };
  document.getElementById("nextPilot").onclick = function() {
    selectedPilotIdx = (selectedPilotIdx + 1) % PILOTS.length;
    refreshPilotsUI();
  };
  document.getElementById("backHangar").onclick = function() { switchPage("page-hangar"); };

  document.getElementById("pilotActionBtn").onclick = function() {
    const p = PILOTS[selectedPilotIdx];
    if (saveData.unlockedPilots.indexOf(selectedPilotIdx) !== -1) {
      renderSectors();
      switchPage("page-sectors");
    } else if (saveData.credits >= p.price) {
      saveData.credits -= p.price;
      saveData.unlockedPilots.push(selectedPilotIdx);
      persistSave();
      refreshPilotsUI();
    } else {
      alert("Need 💎" + p.price + " Space Credits to recruit this astronaut!");
    }
  };

  function renderSectors() {
    const grid = document.getElementById("sectorGrid");
    grid.innerHTML = "";
    SECTORS.forEach(function(sec, idx) {
      const locked = saveData.level < sec.reqLevel;
      const card = document.createElement("div");
      card.className = "sector-card" + (idx === selectedSectorIdx ? " selected" : "") + (locked ? " locked" : "");
      card.innerHTML = (locked ? "<span class='lock-badge'>🔒 LVL " + sec.reqLevel + "</span>" : "") +
        "<h3>" + sec.name + "</h3><p style='font-size:11px;color:#cbd5e1;margin-top:4px;'>" + sec.desc + "</p>";
      card.onclick = function() {
        if (locked) { alert("Reach Commander Level " + sec.reqLevel + " to unlock this sector!"); return; }
        selectedSectorIdx = idx;
        renderSectors();
      };
      grid.appendChild(card);
    });
  }

  document.getElementById("backPilots").onclick = function() { switchPage("page-pilots"); };

  // --- 4. 3D SOLAR SYSTEM & FLYING VEHICLE ENGINE ---
  const canvas = document.getElementById("spaceCanvas");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth || 360;
    canvas.height = window.innerHeight || 780;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  // 3D Starfield
  const stars = [];
  for (let i = 0; i < 140; i++) {
    stars.push({
      x: (Math.random() - 0.5) * 900,
      y: (Math.random() - 0.5) * 900,
      z: Math.random() * 1000 + 50
    });
  }

  let flightActive = false, distance = 0, missionCredits = 0, velocity = 16, retroBrake = false, warpBoost = false, cockpitView = false;
  let shipX = 0, shipY = 0, animTick = 0;
  let asteroids = [], crystals = [], lasers = [];
  let ctrl = { left: false, right: false, up: false, down: false };

  function bindHold(id, downFn, upFn) {
    const el = document.getElementById(id);
    el.addEventListener("touchstart", function(e) { e.preventDefault(); downFn(); });
    el.addEventListener("touchend", function(e) { e.preventDefault(); upFn(); });
    el.addEventListener("mousedown", downFn);
    el.addEventListener("mouseup", upFn);
  }
  bindHold("leftBtn", function() { ctrl.left = true; }, function() { ctrl.left = false; });
  bindHold("rightBtn", function() { ctrl.right = true; }, function() { ctrl.right = false; });
  bindHold("upBtn", function() { ctrl.up = true; }, function() { ctrl.up = false; });
  bindHold("downBtn", function() { ctrl.down = true; }, function() { ctrl.down = false; });
  bindHold("brakeBtn", function() { retroBrake = true; }, function() { retroBrake = false; });
  bindHold("boostBtn", function() { warpBoost = true; }, function() { warpBoost = false; });

  document.getElementById("camToggleBtn").onclick = function() { cockpitView = !cockpitView; };

  function fireLaser() {
    if (!flightActive) return;
    lasers.push({ x: shipX - 24, y: shipY, z: 0.92 });
    lasers.push({ x: shipX + 24, y: shipY, z: 0.92 });
  }
  document.getElementById("fireBtn").addEventListener("touchstart", function(e) { e.preventDefault(); fireLaser(); });
  document.getElementById("fireBtn").addEventListener("mousedown", fireLaser);

  function launchMission() {
    distance = 0; missionCredits = 0; velocity = 16; shipX = 0; shipY = 0;
    asteroids = []; crystals = []; lasers = [];
    document.getElementById("missionModal").classList.add("hidden");
    switchPage("page-flight");
    flightActive = true;
  }

  document.getElementById("launchMissionBtn").onclick = launchMission;
  document.getElementById("relaunchBtn").onclick = launchMission;
  document.getElementById("returnHangarBtn").onclick = function() {
    flightActive = false;
    refreshHangarUI();
    switchPage("page-hangar");
  };

  // Draw 3D Shaded Planet with Optional Rings & Orbiting Moon
  function draw3DPlanet(cx, cy, planet, tick) {
    ctx.save();
    ctx.translate(cx, cy);

    if (planet.glow) {
      const g = ctx.createRadialGradient(0, 0, planet.r * 0.7, 0, 0, planet.r * 1.9);
      g.addColorStop(0, planet.glow);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(0, 0, planet.r * 1.9, 0, Math.PI * 2);
      ctx.fill();
    }

    // Back Ring
    if (planet.ring) {
      ctx.strokeStyle = "rgba(253, 224, 71, 0.55)";
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.ellipse(0, 0, planet.r * 1.95, planet.r * 0.45, -0.25, Math.PI, Math.PI * 2);
      ctx.stroke();
    }

    // Planet Sphere Gradient
    const sphereGrad = ctx.createRadialGradient(-planet.r * 0.3, -planet.r * 0.3, planet.r * 0.1, 0, 0, planet.r);
    sphereGrad.addColorStop(0, planet.c1);
    sphereGrad.addColorStop(0.75, planet.c2);
    sphereGrad.addColorStop(1, "#020617");
    ctx.fillStyle = sphereGrad;
    ctx.beginPath();
    ctx.arc(0, 0, planet.r, 0, Math.PI * 2);
    ctx.fill();

    // Front Ring
    if (planet.ring) {
      ctx.strokeStyle = "rgba(253, 224, 71, 0.85)";
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.ellipse(0, 0, planet.r * 1.95, planet.r * 0.45, -0.25, 0, Math.PI);
      ctx.stroke();
    }

    // Orbiting Moon for Earth
    if (planet.moon) {
      const mx = Math.cos(tick * 0.04) * (planet.r + 18);
      const my = Math.sin(tick * 0.04) * 10;
      ctx.fillStyle = "#e2e8f0";
      ctx.beginPath();
      ctx.arc(mx, my, 6, 0, Math.PI * 2);
      ctx.fill();
    }

    // Planet Label
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = "bold 9px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(planet.name, 0, planet.r + 14);

    ctx.restore();
  }

  // Draw 3D Flying Spacecraft
  function draw3DSpacecraft(cx, cy, scale, hullColor, shipType, bankAngle, isWarp, isRetro) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);
    ctx.rotate(bankAngle);

    // Main Wings
    ctx.fillStyle = hullColor;
    ctx.beginPath();
    if (shipType === "saucer") {
      ctx.ellipse(0, 4, 75, 22, 0, 0, Math.PI * 2);
    } else if (shipType === "shuttle") {
      ctx.moveTo(0, -45);
      ctx.lineTo(68, 22);
      ctx.lineTo(25, 28);
      ctx.lineTo(-25, 28);
      ctx.lineTo(-68, 22);
    } else {
      ctx.moveTo(0, -52);
      ctx.lineTo(76, 20);
      ctx.lineTo(22, 14);
      ctx.lineTo(0, 26);
      ctx.lineTo(-22, 14);
      ctx.lineTo(-76, 20);
    }
    ctx.closePath();
    ctx.fill();

    // Central Fuselage Spine
    ctx.fillStyle = "#0f172a";
    ctx.beginPath();
    ctx.moveTo(0, -46);
    ctx.lineTo(18, 22);
    ctx.lineTo(-18, 22);
    ctx.closePath();
    ctx.fill();

    // Glowing Cockpit Canopy
    ctx.fillStyle = "#38bdf8";
    ctx.beginPath();
    ctx.ellipse(0, -10, 9, 18, 0, 0, Math.PI * 2);
    ctx.fill();

    // Twin Thruster Nozzles & Plasma Flames
    const flameLen = isWarp ? 42 + Math.random() * 18 : (isRetro ? 8 : 22 + Math.random() * 8);
    ctx.fillStyle = isWarp ? "#facc15" : "#38bdf8";
    [-16, 16].forEach(tx => {
      ctx.beginPath();
      ctx.moveTo(tx - 6, 22);
      ctx.lineTo(tx, 22 + flameLen);
      ctx.lineTo(tx + 6, 22);
      ctx.closePath();
      ctx.fill();
    });

    ctx.restore();
  }

  // Draw 3D Astronaut in Hangar
  function draw3DAstronaut(cx, cy, scale, pilot) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);

    // Backpack
    ctx.fillStyle = "#64748b";
    ctx.fillRect(-20, -24, 40, 42);

    // Legs
    ctx.fillStyle = pilot.suit;
    ctx.fillRect(-13, 20, 11, 44);
    ctx.fillRect(2, 20, 11, 44);

    // Torso
    ctx.fillRect(-17, -22, 34, 44);

    // Helmet & Gold/Neon Visor
    ctx.fillStyle = "#f8fafc";
    ctx.beginPath();
    ctx.arc(0, -36, 15, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = pilot.visor;
    ctx.beginPath();
    ctx.ellipse(0, -36, 11, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // --- 5. MAIN 3D SPACE LOOP ---
  function loop() {
    requestAnimationFrame(loop);
    animTick++;

    const W = canvas.width;
    const H = canvas.height;
    const sector = SECTORS[selectedSectorIdx];

    // Deep Space Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
    bgGrad.addColorStop(0, sector.bgTop);
    bgGrad.addColorStop(1, sector.bgBot);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Moving 3D Stars
    const starSpeed = flightActive ? (warpBoost ? velocity * 2.5 : velocity) : 2;
    stars.forEach(st => {
      st.z -= starSpeed;
      if (st.z <= 1) {
        st.z = 1000;
        st.x = (Math.random() - 0.5) * 900;
        st.y = (Math.random() - 0.5) * 900;
      }
      const sx = W / 2 + (st.x / st.z) * 320;
      const sy = H * 0.45 + (st.y / st.z) * 320;
      const sr = Math.max(0.8, (1 - st.z / 1000) * 3);
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(sx, sy, sr, 0, Math.PI * 2);
      ctx.fill();
    });

    // Render Solar System Planets in Background
    sector.planets.forEach(pl => {
      const floatY = Math.sin(animTick * 0.02 + pl.x) * 6;
      draw3DPlanet(W / 2 + pl.x, H * 0.34 + pl.y + floatY, pl, animTick);
    });

    // HANGAR / PILOT SHOWCASE VIEW
    if (!flightActive) {
      const sh = SHIPS[selectedShipIdx];
      const pi = PILOTS[selectedPilotIdx];
      const hoverY = Math.sin(animTick * 0.06) * 6;

      // Holographic Landing Pad
      ctx.strokeStyle = "rgba(56, 189, 248, 0.45)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(W / 2, H * 0.58, 160, 36, 0, 0, Math.PI * 2);
      ctx.stroke();

      draw3DAstronaut(W / 2 - 105, H * 0.50, 1.2, pi);
      draw3DSpacecraft(W / 2 + 25, H * 0.52 + hoverY, 1.35, selectedHullColor, sh.type, 0, false, false);
      return;
    }

    // ACTIVE 3D SPACE FLIGHT
    const shipStats = SHIPS[selectedShipIdx];
    const pilotStats = PILOTS[selectedPilotIdx];
    const maxVel = 24 * shipStats.speed * pilotStats.speedBonus;

    if (retroBrake) velocity = Math.max(6, velocity - 0.9);
    else if (warpBoost) velocity = Math.min(maxVel * 1.5, velocity + 0.7);
    else velocity += (maxVel * 0.8 - velocity) * 0.04;

    distance += velocity * 0.4;
    document.getElementById("hudDist").innerText = Math.floor(distance);
    document.getElementById("hudCredits").innerText = missionCredits;
    document.getElementById("hudSpeed").innerText = Math.floor(velocity * 1.8);

    // 3D Flight Movement (Left, Right, Up, Down)
    let bank = 0;
    if (ctrl.left && shipX > -145) { shipX -= shipStats.agility * 0.55; bank = -0.22; }
    if (ctrl.right && shipX < 145) { shipX += shipStats.agility * 0.55; bank = 
