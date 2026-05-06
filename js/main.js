import * as THREE from "three";

import { FBXLoader } from "three/addons/loaders/FBXLoader.js";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import { AnaglyphEffect } from "three/addons/effects/AnaglyphEffect.js";

/* =========================
   VARIABLES
========================= */

let useAnaglyph = false;

let currentModel = null;

let mixer = null;

const clock = new THREE.Clock();

const loader = new FBXLoader();

/* =========================
   ANIMACIONES
========================= */

const animations = {
  idle: "./assets/idle.fbx",

  run: "./assets/Fast Run.fbx",

  kick: "./assets/Roundhouse Kick.fbx",

  takedown: "./assets/Double Leg Takedown - Attacker.fbx",

  jump: "./assets/Jump.fbx",
};

/* =========================
   ESCENA
========================= */

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x050505);

scene.fog = new THREE.Fog(0x050505, 4, 18);

/* =========================
   CÁMARA
========================= */

const camera = new THREE.PerspectiveCamera(
  48,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

camera.position.set(0, 1.55, 2.2);

/* =========================
   RENDERER
========================= */

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.outputColorSpace = THREE.SRGBColorSpace;

/* =========================
   CONTENEDOR
========================= */

document.getElementById("scene-container").appendChild(renderer.domElement);

/* =========================
   ANAGLIFO
========================= */

const effect = new AnaglyphEffect(renderer);

effect.eyeSep = 0.065;

effect.setSize(window.innerWidth, window.innerHeight);

/* =========================
   CONTROLES
========================= */

const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;

controls.dampingFactor = 0.06;

controls.target.set(0, 1.15, -0.4);

controls.minDistance = 1.2;

controls.maxDistance = 7;

controls.update();

/* =========================
   LUCES
========================= */

scene.add(new THREE.HemisphereLight(0xffffff, 0x0f172a, 2.3));

const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);

keyLight.position.set(4, 6, 5);

scene.add(keyLight);

/* =========================
   NORMALIZAR MODELO
========================= */

function normalizeModel(object) {
  object.scale.set(0.02, 0.02, 0.02);

  const box = new THREE.Box3().setFromObject(object);

  const center = box.getCenter(new THREE.Vector3());

  object.position.sub(center);

  const box2 = new THREE.Box3().setFromObject(object);

  object.position.y -= box2.min.y;
}

/* =========================
   CARGAR ANIMACIÓN
========================= */

function loadAnimation(name) {
  document.getElementById("loader").style.display = "flex";

  if (currentModel) {
    scene.remove(currentModel);
  }

  loader.load(
    animations[name],

    (object) => {
      currentModel = object;

      normalizeModel(currentModel);

      scene.add(currentModel);

      if (currentModel.animations && currentModel.animations.length > 0) {
        mixer = new THREE.AnimationMixer(currentModel);

        const action = mixer.clipAction(currentModel.animations[0]);

        action.reset();

        action.play();
      }

      document.getElementById("loader").style.display = "none";
    },

    undefined,

    (error) => {
      console.error("Error cargando FBX:", error);

      document.getElementById("loader").innerHTML = `

        <h3>Error cargando FBX</h3>

        <p>
          Revisa que exista:
          ${animations[name]}
        </p>

      `;
    },
  );
}

/* =========================
   TECLADO
========================= */

window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();

  switch (key) {
    case "1":
      loadAnimation("idle");

      break;

    case "2":
      loadAnimation("run");

      break;

    case "3":
      loadAnimation("kick");

      break;

    case "4":
      loadAnimation("takedown");

      break;

    case "5":
      loadAnimation("jump");

      break;

    case "q":
      useAnaglyph = false;

      document.getElementById("modeBadge").textContent = "Modo actual: NORMAL";

      break;

    case "e":
      useAnaglyph = true;

      document.getElementById("modeBadge").textContent =
        "Modo actual: ANAGLIFO";

      break;
  }
});

/* =========================
   CARGA INICIAL
========================= */

loadAnimation("idle");

/* =========================
   ANIMACIÓN
========================= */

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();

  if (mixer) {
    mixer.update(delta);
  }

  controls.update();

  if (useAnaglyph) {
    effect.render(scene, camera);
  } else {
    renderer.render(scene, camera);
  }
}

animate();

/* =========================
   RESIZE
========================= */

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  effect.setSize(window.innerWidth, window.innerHeight);
});
