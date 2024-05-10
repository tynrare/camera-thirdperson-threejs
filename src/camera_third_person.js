import * as THREE from "three";
import { Matrix4, Vector3 } from "three";

const Vec3Up = new Vector3(0, 0, 1);

function angle_sub(angle1, angle2) {
  const diff = ((angle2 - angle1 + Math.PI) % (Math.PI * 2)) - Math.PI;
  return diff < -Math.PI ? diff + Math.PI * 2 : diff;
}

export default class CameraThirdPerson {
  constructor() {
    /** @type {THREE.Camera} */
    this._camera = null;
    /** @type {THREE.Object3D} */
    this._target = null;

    this._target_lpos = new Vector3();
    this._target_lrot = 0;
    this._camera_lpos = new Vector3();

    this.cache = {
      v3: new Vector3(),
    };

    this.config = {
      // x distance to target
      distance: 10,
      // z height
      height: 7,
      // first target following factor. 0-1
      follow_speed: 0.1,
      // second target following factor. 0-1
      rotation_speed: 0.5,
      // final factor
      camera_speed: 0.1,
    };
  }

  step(dt) {
    if (!this._target || !this._camera) {
      return;
    }

    // construct local position vector
    const pos = this.cache.v3.set(0, -1, 0);
    pos.normalize().multiplyScalar(this.config.distance);
    pos.z += this.config.height;

    // rotate around axis
    const rot_lerp =
      angle_sub(this._target_lrot, this._target.rotation.z) *
      this.config.rotation_speed;
    this._target_lrot += rot_lerp;
    pos.applyAxisAngle(Vec3Up, this._target_lrot);

    // apply target position
    this._target_lpos.lerp(this._target.position, this.config.follow_speed);
    pos.add(this._target_lpos);

    // apply final lerp
    this._camera_lpos.lerp(pos, this.config.camera_speed);

    this._camera.position.copy(this._camera_lpos);
    this._camera.up = Vec3Up;

    this._camera.lookAt(this._target_lpos);

    // optianal: look straight to target
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
