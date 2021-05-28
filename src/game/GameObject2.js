import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
/* import { OBJLoader } from "./resources/threejs/r125/examples/jsm/loaders/OBJLoader.js"; */
/* const loader = new THREE.ObjectLoader(); */
/* const loader = new THREE.JSONLoader(); */
const loader = new GLTFLoader();

function rotateAboutPoint(obj, point, axis, theta, pointIsWorld) {
  pointIsWorld = pointIsWorld === undefined ? false : pointIsWorld;

  if (pointIsWorld) {
    obj.parent.localToWorld(obj.position); // compensate for world coordinate
  }

  obj.position.sub(point); // remove the offset
  obj.position.applyAxisAngle(axis, theta); // rotate the POSITION
  obj.position.add(point); // re-add the offset

  if (pointIsWorld) {
    obj.parent.worldToLocal(obj.position); // undo world coordinates compensation
  }

  obj.rotateOnAxis(axis, theta); // rotate the OBJECT
}

class GameObject2 {
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
        "src/objects/bullet.glb",
        (gltf) => {
          gltf.scene.scale.set(0.5, 0.5, 0.5);
          gltf.scene.position.x = 1; //Position (x = right+ left-)
          gltf.scene.position.y = 1; //Position (y = up+, down-)
          gltf.scene.position.z = 0; //Position (z = front +, back-)

          gltf.scene.rotation.x = 0;
          gltf.scene.rotation.y = (2 * Math.PI) / 4;

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
    const x = (event.clientX - window.RENDERER.domElement.width / 2) / 1920;
    const y = -(event.clientY - window.RENDERER.domElement.height / 2) / 937;
    this.move(x, y);
  }

  update() {
    this.rotate(this.obj.rotation.x + 0.01, this.obj.rotation.y + 0.01);
  }

  rotate() {
    /* rotateAboutPoint(
      this.obj,
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 1, 0),
      0.1
    ); */
  }

  move(x, y) {
    this.obj.position.x = x;
    this.obj.position.y = y;
  }
}

export default GameObject2;
