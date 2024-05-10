import App from "./app.js";
import GUI from 'lil-gui';

/**
* @param {App} app .
*/
export function run_toolbox(app) {
	const gui = new GUI();
	const camera_conf = app.playspace.camera_controller.config;
	const pawn_conf = app.playspace.pawn_controller.config;

	const fcamera = gui.addFolder("camera");
	fcamera.add(camera_conf, "distance", 1e-4, 100);
	fcamera.add(camera_conf, "height", 0, 100);
	fcamera.add(camera_conf, "follow_speed", 1e-4, 1);
	fcamera.add(camera_conf, "rotation_speed", 1e-4, 1);
	fcamera.add(camera_conf, "camera_speed", 1e-4, 1);
	const fpawn = gui.addFolder("pawn");
	fpawn.add(pawn_conf, "rotation_speed", 1e-4, 1);
}
