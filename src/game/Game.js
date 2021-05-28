import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import GameScene from "game/GameScene";
import GameObject from "game/GameObject";
import GameObject2 from "game/GameObject2";

export class Game {
  constructor() {
    this.gameScene = new GameScene();

    this.gameObject1 = new GameObject(this.gameScene);
    this.gameObject2 = new GameObject2(this.gameScene);
  }

  init = async () => {
    // настройка и подключение основы
    window.RENDERER = new THREE.WebGLRenderer({ alpha: false });
    window.RENDERER.setSize(window.innerWidth, window.innerHeight);
    window.RENDERER.setAnimationLoop(this.animation);
    document.body.appendChild(window.RENDERER.domElement);

    // свет
    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.2);
    this.gameScene.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(0, 1, 1).normalize();
    this.gameScene.scene.add(directionalLight);

    // (dev)вспомогательные штуки
    const controls = new OrbitControls(
      this.gameScene.camera,
      window.RENDERER.domElement
    );

    const axesHelper = new THREE.AxesHelper(5);
    this.gameScene.scene.add(axesHelper);

    // создание обжектов из моделек
    const o1 = await this.gameObject1.initObject();
    const o2 = await this.gameObject2.initObject();
    /* this.gameScene.scene.add(o2); */
    o1.add(o2);
    this.gameScene.scene.add(o1);

    this.gameObject1.loadContent();
    /* this.gameObject2.loadContent(); */
  };

  animation = (time) => {
    window.GAME_TIME = time;

    if (this.gameObject1.isInitialized) this.gameObject1.update();
    /* this.gameObject2.update(); */

    window.RENDERER.render(this.gameScene.scene, this.gameScene.camera);
  };
}
