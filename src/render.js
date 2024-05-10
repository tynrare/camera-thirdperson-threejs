import * as THREE from "three";
import logger from "./logger.js";
import { Vector2 } from "three";
import Playspace from "./playspace.js";

export class RenderConfig {
  constructor() {
    this.camera_fov = 75;
  }
}

export class RenderCache {
  constructor() {
    this.vec2_0 = new Vector2();
  }
}

export default class Render {
  constructor() {
    /** @type {THREE.Scene} */
    this.scene = null;
    /** @type {THREE.PerspectiveCamera} */
    this.camera = null;
    /** @type {THREE.WebGLRenderer} */
    this.renderer = null;

    /** @type {Playspace} */
		this.playspace = null;

    this.cache = new RenderCache();
    this.config = new RenderConfig();

		this.active = false;
  }

  init() {
		logger.log("Render initializing..");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      this.viewport_w / this.viewport_h,
      0.1,
      1000,
    );
    camera.position.z = 5;

    this.scene = scene;
    this.camera = camera;

		this.playspace = new Playspace().init(this.scene);

		logger.log("Render initialized.");

    return this;
  }

  run() {
    const renderer = new THREE.WebGLRenderer();
		renderer.setSize(this.viewport_w, this.viewport_h);
    document.body.appendChild(renderer.domElement);

    this.renderer = renderer;
    this._equilizer();

		this.playspace.run();

		this.active = true;
		logger.log("Render ran.");
  }

  step(dt) {
		if (!this.active) {
			return;
		}

    this._equilizer();

		this.playspace.step(dt);

    this.renderer.render(this.scene, this.camera);
  }

	stop() {
		this.active = false;
		this.playspace?.stop();
		this.renderer?.dispose();
		this.renderer = null;
	}

	dispose() {
		this.stop();
		this.scene?.clear();
		this.scene = null;
		this.camera?.clear();
		this.camera = null;
		this.playspace?.dispose();
		this.playspace = null;
	}

  // ---

  get viewport_w() {
    return window.innerWidth;
  }

  get viewport_h() {
    return window.innerHeight;
  }

  /**
   * @private
   */
  _equilizer() {
    const size = this.renderer.getSize(this.cache.vec2_0);
    const w = this.viewport_w;
    const h = this.viewport_h;
    if (size.width != w || size.height != h) {
      this.renderer.setSize(w, h);
      //this.set_camera_aspect(w, h);
    }
  }

  set_camera_aspect(width = this.viewport_w, height = this.viewport_h) {
    this.camera.aspect = width / height;
    this.camera.fov = this.config.camera_fov * Math.min(1, width / height);
    this.camera.updateProjectionMatrix();
  }
}
