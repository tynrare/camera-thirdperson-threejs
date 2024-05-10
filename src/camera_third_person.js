import * as THREE from "three";
import { Vector2, Vector3 } from "three";
import { Vec3Up, angle_sub } from "./math.js";

export default class CameraThirdPerson {
  constructor() {
    /** @type {THREE.Camera} */
    this._camera = null;
    /** @type {THREE.Object3D} */
    this._target = null;

    this._target_lpos = new Vector3();
    this._target_lrot = 0;
    this._camera_lpos = new Vector3();

    // input pawn direction update required to correct target angles
    this.direction = new Vector2();

    this.cache = {
      v3: new Vector3(),
    };

    this.config = {
      // x distance to target
      distance: 10,
      // z height
      height: 3,
      // first target following factor. 0-1
      follow_speed: 0.2,
      // second target following factor. 0-1
      rotation_speed: 0.01,
      // final factor
      camera_speed: 0.1,
      // scales rotation_speed depends on camera-target angle diff
      stick_factor: 0.1,
    };
  }

  step(dt) {
    if (!this._target || !this._camera) {
      return;
    }

    // ---
    // construct local position vector
    const pos = this.cache.v3.set(0, -1, 0);
    pos.normalize().multiplyScalar(this.config.distance);
    pos.z += this.config.height;

    // -- angle
    // modify target rotation based on imput
    // while input camera does not follow target
    let target_angle = this._target_lrot;
    let rot_speed = this.config.rotation_speed;
    if (this.direction.y < 0) {
      //..
    } else if (this.direction.y > 0) {
			//rot_speed = Math.pow(rot_speed, 1e-2);
      target_angle = this._target.rotation.z;
    } else if (this.direction.x != 0) {
      //target_angle += this.direction.x * 0.01 * dt;
    } else {
      target_angle = this._target.rotation.z;
    }

    const angle_d = angle_sub(this._target_lrot, target_angle);
    this._target_lrot +=
      angle_d *
      Math.pow(1 - Math.abs(angle_d / Math.PI), 1) *
      this.config.rotation_speed;

    pos.applyAxisAngle(Vec3Up, this._target_lrot);

    // ---

    // apply target position
    this._target_lpos.lerp(this._target.position, this.config.follow_speed);
    pos.add(this._target_lpos);

    // apply final lerp
    this._camera_lpos.lerp(pos, this.config.camera_speed);

    this._camera.position.copy(this._camera_lpos);
    this._camera.up = Vec3Up;

    this._camera.lookAt(this._target_lpos);

    // optional: look straight to target
    //this._camera.lookAt(this._target.position);
  }

  cleanup() {
    this._camera = null;
    this._target = null;
  }

  /**
   * @param {THREE.Camera} camera .
   */
  set_camera(camera) {
    this._camera = camera;
  }

  /**
   * @param {THREE.Object3D} target .
   */
  set_target(target) {
    this._target = target;
    this._target_lpos.copy(this._target.position);
    this._target_lrot = this._target.rotation.z;
  }
}
