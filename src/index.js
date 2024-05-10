import App from "./app.js";
import { run_inputs } from "./inputs.js";
import { run_toolbox } from "./toolbox.js";

function main() {
  const app = new App().init().run();
	run_inputs(app);
	run_toolbox(app);
  window["app"] = app;
}

main();
