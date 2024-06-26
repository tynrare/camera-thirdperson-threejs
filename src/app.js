 /** @namespace Core */

import Render from "./render.js";
import logger from "./logger.js";
import { InputAction } from "./inputs.js";
import Playspace from "./playspace.js";
import { lerp } from "./math.js";

/**
 * Core class
 * @example new App().init().run()
 * @class App
 * @memberof Core
 */
class App {
  constructor() {
    this.active = false;
    this.timestamp = -1;

    /** @type {Render} */
    this.render = null;
    /** @type {Playspace} */
    this.playspace = null;
    /** 
		 * in threejs dt has to be lerped for proper smooth movemets
		 *
		 * @type {number} 
		 */
		this.ldt = 0;
  }

  init() {
    logger.log("App initializing..");
    this.render = new Render().init();
    this.playspace = new Playspace().init(this.render.scene);

    logger.log("App initialized.");
    return this;
  }

  run() {
    this.active = true;
    this.timestamp = performance.now();

    this.render.run();
		this.playspace.run();
		this.playspace.camera_controller.set_camera(this.render.camera);
		this.playspace.pawn_controller.set_camera(this.render.camera);

    this.loop();

    logger.log("App ran.");

    return this;
  }

  loop() {
    if (!this.active) {
      return;
    }

    const now = performance.now();
    const dt = now - this.timestamp;
		this.ldt = lerp(this.ldt, dt, 1e-2);
    this.timestamp = now;

    this.step(this.ldt);

    requestAnimationFrame(this.loop.bind(this));
  }

  step(dt) {
    this.render.step(dt);
		this.playspace.step(dt);
  }

  /**
   * @param {InputAction} action .
   * @param {boolean} start .
   */
  input(action, start) {
    if (!this.active) {
      return;
    }

    this.playspace.input(action, start);
  }

	input_analog(x, y) {
    if (!this.active) {
      return;
    }

    this.playspace.input_analog(x, y);
	}

  stop() {
    this.active = false;
    this.timestamp = -1;
		this.playspace?.stop();
    this.render?.stop();
  }

  dispose() {
    this.stop();
    this.render?.dispose();
    this.render = null;
		this.playspace?.dispose();
		this.playspace = null;
  }
}

export default App;
