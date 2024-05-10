import Render from "./render.js";
import logger from "./logger.js";
import { InputAction } from "./inputs.js";

class App {
  constructor() {
    this.active = false;
    this.timestamp = -1;
    /** @type {Render} */
    this.render = null;
  }

  init() {
    logger.log("App initializing..");
    this.render = new Render().init();

    logger.log("App initialized.");
    return this;
  }

  run() {
    this.active = true;
    this.timestamp = performance.now();

    this.render.run();
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
    this.timestamp = now;

    this.step(dt);

    requestAnimationFrame(this.loop.bind(this));
  }

  step(dt) {
    this.render.step(dt);
  }

  /**
   * @param {InputAction} action .
   * @param {boolean} start .
   */
  input(action, start) {
		if (!this.active) {
			return;
		}

		this.render.playspace.input(action, start);
	}

  stop() {
    this.active = false;
    this.timestamp = -1;
    this.render?.stop();
  }

  dispose() {
    this.stop();
    this.render?.dispose();
    this.render = null;
  }
}

function main() {
  const app = new App().init().run();

  document.body.addEventListener("keydown", keydown);
  document.body.addEventListener("keyup", keyup);

  /**
   * @param {KeyboardEvent} ev
   */
  function keydown(ev) {
    if (ev.repeat) return;

		keycode(ev.code, true);
  }
  /**
   * @param {KeyboardEvent} ev
   */
  function keyup(ev) {
    if (ev.repeat) return;

		keycode(ev.code, false);
  }

	const key_to_action = {
		ArrowLeft: InputAction.left,
		KeyA: InputAction.left,
		ArrowRight: InputAction.right,
		KeyD: InputAction.right,
		ArrowUp: InputAction.up,
		KeyW: InputAction.up,
		ArrowDown: InputAction.down,
		KeyS: InputAction.down,
	}
	function keycode(key, start) {
		const action = key_to_action[key] ?? null;
		if (action !== null) {
			app.input(action, start);
		}
	}

  window["app"] = app;
}

main();
