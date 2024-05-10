import * as THREE from "three";
import Loader from "./loader.js";
import CameraThirdPerson from "./camera_third_person.js";
import { InputAction } from "./inputs.js";

export default class Playspace {
  constructor() {
    /** @type {THREE.Scene} */
    this._scene = null;
    /** @type {THREE.Mesh} */
    this.cube = null;
    /** @type {THREE.Mesh} */
    this.plane = null;
    /** @type {CameraThirdPerson} */
    this.camera_controller = null;

    this.movement = new THREE.Vector2();
  }

  /**
   * @param {THREE.Scene} scene .
   */
  init(scene) {
    this._scene = scene;
    this.camera_controller = new CameraThirdPerson();

    return this;
  }

  run() {
    {
      const geometry = new THREE.PlaneGeometry(10, 10);
      const texture = Loader.instance.get_texture("tex0.png");
      const material = new THREE.MeshBasicMaterial({
        map: texture,
      });
      const plane = new THREE.Mesh(geometry, material);
      this._scene.add(plane);
      this.plane = plane;
    }

    {
      const geometry = new THREE.BoxGeometry(1, 1, 2);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      this._scene.add(cube);
      this.cube = cube;
    }

    this.camera_controller.set_target(this.cube);

    return this;
  }

  step(dt) {
    this.camera_controller.step(dt);

    this.cube.rotateZ(this.movement.x * 0.001 * dt);
    this.cube.position.x -=
      Math.sin(this.cube.rotation.z) * this.movement.y * 0.001 * dt;
    this.cube.position.y +=
      Math.cos(this.cube.rotation.z) * this.movement.y * 0.001 * dt;
  }

  /**
   * @param {InputAction} action .
   * @param {boolean} start .
   */
  input(action, start) {
    let direction = null;
    let factor = null;

    switch (action) {
      case InputAction.left:
        direction = "x";
        factor = start ? 1 : 0;
        break;
      case InputAction.right:
        direction = "x";
        factor = start ? -1 : 0;
        break;
      case InputAction.up:
        direction = "y";
        factor = start ? -1 : 0;
        break;
      case InputAction.down:
        direction = "y";
        factor = start ? 1 : 0;
        break;
    }

    if (factor !== null && direction !== null) {
      this.movement[direction] = factor;
    }
  }

  stop() {
    this.cube?.removeFromParent();
    this.cube = null;
    this.plane?.removeFromParent();
    this.plane = null;
  }

  dispose() {
    this.stop();
    this._scene = null;
    this.camera_controller?.cleanup();
    this.camera_controller = null;
  }
}
