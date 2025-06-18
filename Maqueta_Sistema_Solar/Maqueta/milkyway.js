// milkyway.js
// Lógica de la Vía Láctea y transición al sistema solar
// Este archivo debe incluirse después de main.js en index.html

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';

// Vía Láctea profesional y artística
const canvas = document.getElementById('milkyway');
const ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

// Parámetros
const arms = 6;
const spiralLength = 2500;
const spiralStars = [];
const centerX = width / 2;
const centerY = height / 2;
const rotationSpeed = 0.00012;

// Estrellas de fondo
const backgroundStars = [];
for (let i = 0; i < 400; i++) {
  backgroundStars.push({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 1.2 + 0.2,
    alpha: Math.random() * 0.5 + 0.2
  });
}

// Generar partículas de la espiral
for (let i = 0; i < spiralLength; i++) {
  const arm = i % arms;
  const t = i / spiralLength * 5 * Math.PI; // ángulo de la espiral
  const radius = 60 + (i / spiralLength) * (Math.min(width, height) * 0.48);
  const angle = t + arm * (2 * Math.PI / arms) + Math.random() * 0.18;
  const x = centerX + Math.cos(angle) * radius + Math.random() * 16 - 8;
  const y = centerY + Math.sin(angle) * radius * 0.62 + Math.random() * 16 - 8;
  // Colores degradados y mezcla
  let color;
  if (radius < 120) color = 'rgba(255,255,255,0.95)';
  else if (radius < 200) color = 'rgba(255,200,220,0.7)';
  else if (radius < 300) color = 'rgba(180,120,255,0.5)';
  else if (radius < 400) color = 'rgba(80,180,255,0.4)';
  else color = 'rgba(80,80,255,0.13)';
  spiralStars.push({x, y, size: Math.random() * 2.8 + 1.2, color, angle, radius, arm, twinkle: Math.random()});
}

// Nubes de gas
const clouds = [];
for (let i = 0; i < 180; i++) {
  const t = Math.random() * 5 * Math.PI;
  const r = 90 + Math.random() * (Math.min(width, height) * 0.48);
  const x = centerX + Math.cos(t) * r + Math.random() * 60 - 30;
  const y = centerY + Math.sin(t) * r * 0.62 + Math.random() * 60 - 30;
  const color = Math.random() > 0.5 ? 'rgba(180,120,255,0.10)' : 'rgba(80,180,255,0.10)';
  clouds.push({x, y, r: 50 + Math.random() * 80, color});
}

// Variables para transición
let transitionPhase = 0; // 0: normal, 1: estrella viajando, 2: galaxia a la derecha, 3: mostrar sistema solar
let travelStar = null;
let travelProgress = 0;
let showSolarSystem = false;

// Coordenadas de la estrella de viaje
function getTravelStarStart() {
  return { x: centerX, y: centerY };
}
function getTravelStarEnd() {
  return { x: width * 0.22, y: height * 0.7 };
}

// Variables para transición inversa
let reverseTravel = false;
let reverseProgress = 0;

// Modificar la animación principal para soportar transición
function drawMilkyWaySpiral(time) {
  ctx.clearRect(0, 0, width, height);
  const grad = ctx.createRadialGradient(centerX, centerY, 40, centerX, centerY, Math.max(width, height)/1.1);
  grad.addColorStop(0, '#222');
  grad.addColorStop(1, '#000');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);
  
  // Estrellas de fondo
  for (const s of backgroundStars) {
    ctx.save();
    ctx.globalAlpha = s.alpha;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.shadowColor = '#fff';
    ctx.shadowBlur = 6;
    ctx.fill();
    ctx.restore();
  }
  
  // Nubes de gas
  for (const cloud of clouds) {
    ctx.save();
    ctx.globalAlpha = 0.16;
    ctx.beginPath();
    ctx.arc(cloud.x, cloud.y, cloud.r, 0, 2 * Math.PI);
    ctx.fillStyle = cloud.color;
    ctx.shadowColor = cloud.color;
    ctx.shadowBlur = 80;
    ctx.fill();
    ctx.restore();
  }
  
  // Núcleo brillante
  ctx.save();
  const coreGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 160);
  coreGrad.addColorStop(0, 'rgba(255,255,255,1)');
  coreGrad.addColorStop(0.2, 'rgba(255,200,220,0.7)');
  coreGrad.addColorStop(0.5, 'rgba(180,120,255,0.3)');
  coreGrad.addColorStop(1, 'rgba(80,80,255,0.01)');
  ctx.globalAlpha = 1;
  ctx.beginPath();
  ctx.arc(centerX, centerY, 160, 0, 2 * Math.PI);
  ctx.fillStyle = coreGrad;
  ctx.fill();
  ctx.restore();
  
  // Espiral de estrellas
  let offsetX = 0;
  if (transitionPhase >= 2 && !reverseTravel) {
    offsetX = width * 0.22;
  } else if (transitionPhase === 1 && travelStar) {
    offsetX = (width * 0.22) * travelProgress;
  } else if (reverseTravel) {
    offsetX = (width * 0.22) * (1 - reverseProgress);
  }
  
  for (const star of spiralStars) {
    ctx.save();
    const rot = time * rotationSpeed;
    const a = star.angle + Math.sin(time/1200 + star.arm) * 0.09 + rot;
    const r = star.radius + Math.sin(time/900 + star.arm) * 7;
    const x = centerX + Math.cos(a) * r + offsetX;
    const y = centerY + Math.sin(a) * r * 0.62;
    const tw = 0.7 + 0.3 * Math.sin(time/400 + star.twinkle * 10);
    ctx.globalAlpha = tw;
    ctx.beginPath();
    ctx.arc(x, y, star.size * tw, 0, 2 * Math.PI);
    ctx.fillStyle = star.color;
    ctx.shadowColor = star.color;
    ctx.shadowBlur = 18;
    ctx.fill();
    ctx.restore();
  }
  
  // Estrella viajera
  if ((transitionPhase === 1 && travelStar) || reverseTravel) {
    ctx.save();
    ctx.globalAlpha = 1;
    // Efecto especial: escala y brillo aumentan hasta la mitad del trayecto
    let t = reverseTravel ? (1 - reverseProgress) : travelProgress;
    let scale = 1 + 1.2 * Math.sin(Math.PI * Math.min(t, 0.5));
    let glow = 40 + 60 * Math.sin(Math.PI * Math.min(t, 0.5));
    ctx.beginPath();
    let starPos;
    if (reverseTravel) {
      const start = getTravelStarEnd();
      const end = getTravelStarStart();
      starPos = {
        x: start.x + (end.x - start.x) * reverseProgress,
        y: start.y + (end.y - start.y) * reverseProgress
      };
    } else {
      starPos = travelStar;
    }
    ctx.arc(starPos.x, starPos.y, 12 * scale, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(255,255,180,1)';
    ctx.shadowColor = '#fffbe0';
    ctx.shadowBlur = glow;
    ctx.fill();
    ctx.restore();
  }
  
  // Haz de luz y sistema solar
  if (transitionPhase >= 2) {
    const start = getTravelStarEnd();
    ctx.save();
    ctx.globalAlpha = 0.25;
    ctx.beginPath();
    ctx.moveTo(centerX + offsetX, centerY);
    ctx.lineTo(start.x, start.y);
    ctx.lineWidth = 32;
    ctx.strokeStyle = 'rgba(255,255,200,0.25)';
    ctx.shadowColor = '#fffbe0';
    ctx.shadowBlur = 30;
    ctx.stroke();
    ctx.restore();
    
    if (showSolarSystem) drawMiniSolarSystem(start.x, start.y);
  }
}

// Dibuja un sistema solar simple en la esquina
function drawMiniSolarSystem(x, y) {
  ctx.save();
  for (let i = 1; i <= 4; i++) {
    ctx.beginPath();
    ctx.ellipse(x, y, 22*i, 10*i, 0, 0, 2*Math.PI);
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, 2*Math.PI);
  ctx.fillStyle = 'rgba(255,220,100,1)';
  ctx.shadowColor = '#fffbe0';
  ctx.shadowBlur = 20;
  ctx.fill();
  
  const planets = [
    {r: 22, color: '#bbb'},
    {r: 34, color: '#f9c'},
    {r: 46, color: '#3af'},
    {r: 60, color: '#fa3'}
  ];
  
  for (let i = 0; i < planets.length; i++) {
    const angle = Math.PI/4 + i * Math.PI/2;
    ctx.beginPath();
    ctx.arc(x + Math.cos(angle)*planets[i].r, y + Math.sin(angle)*planets[i].r*0.45, 5, 0, 2*Math.PI);
    ctx.fillStyle = planets[i].color;
    ctx.shadowColor = planets[i].color;
    ctx.shadowBlur = 10;
    ctx.fill();
  }
  ctx.restore();
}

// Dummy para evitar error si drawShootingStars no existe
function drawShootingStars() {}

// Ajustar velocidad de transición para que dure exactamente 2 segundos
const TRAVEL_DURATION = 2000; // milisegundos
let travelStartTime = null;
let reverseStartTime = null;

function animateMilkyWayWithShooting(time = 0) {
  if (transitionPhase === 1 && travelStar) {
    if (!travelStartTime) travelStartTime = time;
    travelProgress = Math.min((time - travelStartTime) / TRAVEL_DURATION, 1);
    const start = getTravelStarStart();
    const end = getTravelStarEnd();
    travelStar.x = start.x + (end.x - start.x) * travelProgress;
    travelStar.y = start.y + (end.y - start.y) * travelProgress;
    if (travelProgress >= 1) {
      setTimeout(() => {
        transitionPhase = 2;
        showSolarSystem = true;
        document.getElementById('milkyway-container').style.display = 'none';
        document.getElementById('solar-system-container').style.display = 'block';
        travelStartTime = null;
      }, 400);
    }
  } else if (reverseTravel) {
    if (!reverseStartTime) reverseStartTime = time;
    reverseProgress = Math.min((time - reverseStartTime) / TRAVEL_DURATION, 1);
    if (reverseProgress >= 1) {
      reverseTravel = false;
      transitionPhase = 0;
      showSolarSystem = false;
      document.getElementById('solar-system-container').style.display = 'none';
      document.getElementById('milkyway-container').style.display = 'block';
      reverseStartTime = null;
    }
  } else {
    travelStartTime = null;
    reverseStartTime = null;
  }
  drawMilkyWaySpiral(time);
  drawShootingStars();
  requestAnimationFrame(animateMilkyWayWithShooting);
}
animateMilkyWayWithShooting();

// Al hacer clic, lanzar estrella viajera y mover galaxia
canvas.addEventListener('click', () => {
  if (transitionPhase === 0) {
    transitionPhase = 1;
    travelStar = getTravelStarStart();
    travelProgress = 0;
  }
});

// Manejar clics en el Sol para volver a la Vía Láctea (solo si el sistema solar está visible)
window.handleSunClick = function() {
  reverseTravel = true;
  reverseProgress = 0;
  transitionPhase = 2;
  showSolarSystem = false;
  document.getElementById('solar-system-container').style.display = 'none';
  document.getElementById('milkyway-container').style.display = 'block';
};

// Detectar clic en el Sol 3D y volver a la galaxia (sin tocar lógica ni DOM del sistema solar)
if (window.THREE && document.getElementById('solar-system-container')) {
  document.getElementById('solar-system-container').addEventListener('pointerdown', function (event) {
    if (window.solarScene && window.solarCamera) {
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, window.solarCamera);
      const sunMesh = window.solarScene.children.find(obj => obj.name === 'Sol');
      if (sunMesh) {
        const intersects = raycaster.intersectObject(sunMesh);
        if (intersects.length > 0) {
          window.handleSunClick();
        }
      }
    }
  });
}
