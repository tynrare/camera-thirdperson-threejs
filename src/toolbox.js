/** @namespace Core */

import App from "./app.js";
import GUI from "lil-gui";

/**
 * draw control panel
 *
 * @param {App} app .
 * @memberof Core
 */
function run_toolbox(app) {
  const gui = new GUI();
  gui.close();
  gui.domElement.style.top = "15px";
  const camera_conf = app.playspace.camera_controller.config;
  const pawn_conf = app.playspace.pawn_controller.config;

  const fcamera = gui.addFolder("camera");
  fcamera.add(camera_conf, "distance", 1e-4, 100);
  fcamera.add(camera_conf, "height", 0, 100);
  fcamera.add(camera_conf, "follow_speed", 1e-4, 1);
  fcamera.add(camera_conf, "rotation_passive_speed", 1e-4, 1);
  fcamera.add(camera_conf, "rotation_active_speed", 1e-4, 1);
  fcamera.add(camera_conf, "camera_speed", 1e-4, 1);
  fcamera.add(camera_conf, "stick_factor", 0.5, 8);
  const fpawn = gui.addFolder("pawn");
  fpawn.add(pawn_conf, "rotation_speed", 1e-4, 1);
  fpawn.add(pawn_conf, "movement_speed", 1e-4, 1);
  fpawn.add(pawn_conf, "steer_threshold", 1e-4, 1);
}

export { run_toolbox };
