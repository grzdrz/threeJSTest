import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import GameScene from "./GameScene";
import GameObject from "./GameObject";

const gameScene = new GameScene();

const gameObject1 = new GameObject(gameScene);

function animation(time) {
  window.GAME_TIME = time;

  gameObject1.update();

  window.RENDERER.render(gameScene.scene, gameScene.camera);
}

export async function init() {
  const o1 = await gameObject1.initObject();
  debugger;
  gameScene.scene.add(o1);

  window.RENDERER = new THREE.WebGLRenderer({ alpha: false });
  window.RENDERER.setSize(window.innerWidth, window.innerHeight);
  window.RENDERER.setAnimationLoop(animation);
  document.body.appendChild(window.RENDERER.domElement);

  const ambientLight = new THREE.AmbientLight(0xcccccc);
  gameScene.scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(0, 1, 1).normalize();
  gameScene.scene.add(directionalLight);

  const controls = new OrbitControls(
    gameScene.camera,
    window.RENDERER.domElement
  );

  gameObject1.loadContent();
}
