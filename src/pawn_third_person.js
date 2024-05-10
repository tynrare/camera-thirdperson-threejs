import * as THREE from "three";
import { Vector3 } from "three";
import { InputAction } from "./inputs.js";
import { Vec3Up, angle_sub } from "./math.js";

export default class PawnThirdPerson {
  constructor() {
    /** @type {THREE.Camera} */
    this._camera = null;
    /** @type {THREE.Object3D} */
    this._target = null;

    this.direction = new THREE.Vector3();

		this.view_rot = 0;

    this.cache = {
      v3: new Vector3(),
      v3_0: new Vector3(),
    };
		
		this.config = {
			rotation_speed: 0.1
		}
  }

  step(dt) {
    if (!this._target || !this._camera) {
      return;
    }

		this.view_rot = this._camera.rotation.z;
		const dv = this.cache.v3.copy(this._target.position).sub(this._camera.position);
		dv.normalize();
		const dv_c = this.cache.v3_0.copy(dv);
		dv_c.applyAxisAngle(Vec3Up, Math.PI / 2);
		const px = dv_c.x * this.direction.x + dv_c.y * this.direction.y;
		const dx =  px * 0.01 * dt;
		const py = dv.y * this.direction.y + dv.x * this.direction.x;
		const dy =  py * 0.01 * dt;

		this._target.position.x += dx;
		this._target.position.y += dy;

		if (this.direction.x || this.direction.y) {
			dv.normalize();
			const angle_d = angle_sub(this._target.rotation.z, Math.atan2(-dx, dy)) * this.config.rotation_speed;
			this._target.rotation.z += angle_d;
		}
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
        factor = start ? 1 : 0;
        break;
      case InputAction.down:
        direction = "y";
        factor = start ? -1 : 0;
        break;
    }

    if (factor !== null && direction !== null) {
      this.direction[direction] = factor;
    }
  }

  /**
   * @param {THREE.Camera} camera .
   */
  set_camera(camera) {
    this._camera = camera;
		this.view_rot = this._camera.rotation.z;
  }

  /**
   * @param {THREE.Object3D} target .
   */
  set_target(target) {
    this._target = target;
  }

  cleanup() {
    this._camera = null;
    this._target = null;
  }
}
