import * as THREE from "three";

class GameScene {
  constructor() {
    this.camera = new THREE.PerspectiveCamera(
      25,
      window.innerWidth / window.innerHeight,
      1,
      2000
    );
    /* this.camera.position.z = 1; */
    this.camera.position.set(1, 1, 20);

    this.scene = new THREE.Scene();
  }
}

export default GameScene;
