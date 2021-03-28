import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
/* import { OBJLoader } from "./resources/threejs/r125/examples/jsm/loaders/OBJLoader.js"; */
/* const loader = new THREE.ObjectLoader(); */
/* const loader = new THREE.JSONLoader(); */
const loader = new GLTFLoader();

class GameObject {
  constructor(gameScene) {
    this.gameScene = gameScene;
    /* this.geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2); */
    /* this.material = new THREE.MeshNormalMaterial(); */
    /* this.mesh = new THREE.Mesh(this.geometry, this.material); */

    this.rotate = this.rotate.bind(this);
    this.move = this.move.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.initObject = this.initObject.bind(this);
  }

  async initObject() {
    return new Promise((resolve) => {
      loader.load(
        "src/objects/untitled.glb",
        (gltf) => {
          gltf.scene.scale.set(2, 2, 2);
          gltf.scene.position.x = 0; //Position (x = right+ left-)
          gltf.scene.position.y = 0; //Position (y = up+, down-)
          gltf.scene.position.z = 0; //Position (z = front +, back-)

          this.obj = gltf.scene;

          resolve(gltf.scene);
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  loadContent() {
    window.RENDERER.domElement.addEventListener("click", this.handleClick);
  }

  unloadContent() {
    window.RENDERER.domElement.removeEventListener("click", this.handleClick);
  }

  handleClick(event) {
    /* const x = (event.clientX - window.RENDERER.domElement.width / 2) / 1920;
    const y = -(event.clientY - window.RENDERER.domElement.height / 2) / 937;
    this.move(x, y); */
  }

  update() {
    this.rotate(this.obj.rotation.x + 0.01, this.obj.rotation.y + 0.01);
  }

  rotate(x, y) {
    this.obj.rotation.x = x;
    this.obj.rotation.y = y;
  }

  move(x, y) {
    this.obj.position.x = x;
    this.obj.position.y = y;
  }
}

export default GameObject;
