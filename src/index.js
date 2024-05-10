import Render from "./render.js";
import logger from "./logger.js";

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
  window['app'] = app;
}

main();