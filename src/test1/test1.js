import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import GameScene from "./GameScene";
import GameObject from "./GameObject";
import GameObject2 from "./GameObject2";

const gameScene = new GameScene();

const gameObject1 = new GameObject(gameScene);
const gameObject2 = new GameObject2(gameScene);

function animation(time) {
  window.GAME_TIME = time;

  gameObject1.update();
  /* gameObject2.update(); */

  window.RENDERER.render(gameScene.scene, gameScene.camera);
}

export async function init() {
  const o1 = await gameObject1.initObject();
  const o2 = await gameObject2.initObject();
  /* gameScene.scene.add(o2); */
  o1.add(o2);
  gameScene.scene.add(o1);

  window.RENDERER = new THREE.WebGLRenderer({ alpha: false });
  window.RENDERER.setSize(window.innerWidth, window.innerHeight);
  window.RENDERER.setAnimationLoop(animation);
  document.body.appendChild(window.RENDERER.domElement);

  const ambientLight = new THREE.AmbientLight(0xcccccc, 0.2);
  gameScene.scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(0, 1, 1).normalize();
  gameScene.scene.add(directionalLight);

  const controls = new OrbitControls(
    gameScene.camera,
    window.RENDERER.domElement
  );

  const axesHelper = new THREE.AxesHelper(5);
  gameScene.scene.add(axesHelper);

  gameObject1.loadContent();
  /* gameObject2.loadContent(); */
}
