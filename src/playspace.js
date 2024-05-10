import * as THREE from "three";
import Loader from "./loader.js";
import CameraThirdPerson from "./camera_third_person.js";
import PawnThirdPerson from "./pawn_third_person.js";
import { clamp } from "./math.js";

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
    /** @type {PawnThirdPerson} */
    this.pawn_controller = null;
  }

  /**
   * @param {THREE.Scene} scene .
   */
  init(scene) {
    this._scene = scene;
    this.camera_controller = new CameraThirdPerson();
    this.pawn_controller = new PawnThirdPerson();

    return this;
  }

  run() {
    {
      const geometry = new THREE.PlaneGeometry(32, 32);
      const texture = Loader.instance.get_texture("tex0.png");
			texture.wrapS = THREE.RepeatWrapping;
			texture.wrapT = THREE.RepeatWrapping;
			texture.repeat.set( 4, 4 );
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
			this.cube.position.z += 1;
    }
		{
      const geometry = new THREE.BoxGeometry(0.9, 0.1, 0.1);
      const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
      const cube = new THREE.Mesh(geometry, material);
      this.cube.add(cube);
			cube.position.y += 0.5;
			cube.position.z += 0.5;
		}

    this.camera_controller.set_target(this.cube);
    this.pawn_controller.set_target(this.cube);

    return this;
  }

  step(dt) {
    this.camera_controller.step(dt);
    this.pawn_controller.step(dt);
  }

  /**
   * @param {InputAction} action .
   * @param {boolean} start .
   */
  input(action, start) {
		this.pawn_controller.input(action, start);
		const d = this.pawn_controller.direction;
		this.camera_controller.direction.set(d.x, d.y);
	}

	input_analog(x, y) {
		this.pawn_controller.input_analog(clamp(-1, 1, x), clamp(-1, 1, y));
		const d = this.pawn_controller.direction;
		this.camera_controller.direction.set(d.x, d.y);
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
    this.pawn_controller?.cleanup();
    this.pawn_controller = null;
  }
}
