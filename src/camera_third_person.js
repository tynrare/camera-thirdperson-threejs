import * as THREE from "three";
import { Matrix4, Vector3 } from "three";

export default class CameraThirdPerson {
  constructor() {
    /** @type {THREE.Camera} */
    this._camera = null;
    /** @type {THREE.Object3D} */
    this._target = null;

    this.cache = {
      m4: new Matrix4(),
      v3: new Vector3(),
      v3_0: new Vector3(),
    };

    this.config = {
      distance: 10,
      height: 7,
    };
  }

  step(dt) {
    if (!this._target || !this._camera) {
      return;
    }

    const pos = this.cache.v3.set(0, 1, 0);

    pos.normalize().multiplyScalar(this.config.distance);
    pos.z += this.config.height;
    pos.applyAxisAngle(this.cache.v3_0.set(0, 0, 1), this._target.rotation.z);
		pos.add(this._target.position);

    this._camera.position.copy(pos);
    this._camera.up = new Vector3(0, 0, 1);
    this._camera.lookAt(this._target.position);
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
  }
}
