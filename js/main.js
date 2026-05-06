import * as THREE from "three";

import { FBXLoader } from "three/addons/loaders/FBXLoader.js";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import { AnaglyphEffect } from "three/addons/effects/AnaglyphEffect.js";

let useAnaglyph = false;
let currentModel = null;
let mixer = null;

const clock = new THREE.Clock();

const loader = new FBXLoader();

const animations = {
  idle: "./assets/idle.fbx",
  run: "./assets/run.fbx",
  kick: "./assets/kick.fbx",
  takedown: "./assets/takedown.fbx",
  assassination: "./assets/assassination.fbx",
};

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x020617);

scene.fog = new THREE.Fog(0x020617, 5, 20);

const camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

camera.position.set(0, 1.55, 3.2);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.outputColorSpace = THREE.SRGBColorSpace;

document.body.appendChild(renderer.domElement);

const effect = new AnaglyphEffect(renderer);

effect.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;

controls.dampingFactor = 0.06;

controls.target.set(0, 1, 0);

controls.minDistance = 1.2;

controls.maxDistance = 7;

controls.update();

scene.add(new THREE.HemisphereLight(0xffffff, 0x0f172a, 2.3));

const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);

keyLight.position.set(4, 6, 5);

scene.add(keyLight);

function normalizeModel(object) {
  object.scale.set(0.02, 0.02, 0.02);

  const box = new THREE.Box3().setFromObject(object);

  const center = box.getCenter(new THREE.Vector3());

  object.position.sub(center);

  const box2 = new THREE.Box3().setFromObject(object);

  object.position.y -= box2.min.y;
}

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

      if (currentModel.animations.length > 0) {
        mixer = new THREE.AnimationMixer(currentModel);

        const action = mixer.clipAction(currentModel.animations[0]);

        action.play();
      }

      document.getElementById("loader").style.display = "none";
    },
  );
}

document.querySelectorAll(".animBtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    loadAnimation(btn.dataset.anim);
  });
});

document.getElementById("btnNormal").addEventListener("click", () => {
  useAnaglyph = false;

  document.getElementById("modeBadge").textContent = "Modo actual: NORMAL";
});

document.getElementById("btnAnaglyph").addEventListener("click", () => {
  useAnaglyph = true;

  document.getElementById("modeBadge").textContent = "Modo actual: ANAGLIFO";
});

loadAnimation("idle");

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

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  effect.setSize(window.innerWidth, window.innerHeight);
});
