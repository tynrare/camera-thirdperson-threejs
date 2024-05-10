import App from "./app.js";
import GUI from 'lil-gui';

/**
* @param {App} app .
*/
export function run_toolbox(app) {
	const gui = new GUI();
	const camera_conf = app.render.playspace.camera_controller.config;

	gui.add(camera_conf, "distance", 1e-4, 100);
	gui.add(camera_conf, "height", 0, 100);
	gui.add(camera_conf, "follow_speed", 1e-4, 1);
	gui.add(camera_conf, "rotation_speed", 1e-4, 1);
	gui.add(camera_conf, "camera_speed", 1e-4, 1);
}
