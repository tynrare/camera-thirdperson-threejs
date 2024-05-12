/** @namespace Config */

/**
 * render config for {@link Render.Render}
 *
 * @memberof Config
 */
class RenderConfig {
  constructor() {
    /** @type {number} */
    this.camera_fov = 75;
  }
}

/**
 * Pawn config for {@link ThirdPersonControllers.PawnThirdPerson}
 *
 * @memberof Config
 */
class PawnConfig {
  constructor() {
    /*
     * This factor affects only model rotation.
     * To affect actual rotation speed
     * change CameraConfig::rotation_active_speed
     *
     * @type {number}
     */
    this.rotation_speed = 0.1;
    /**
     * @type {number}
     */
    this.movement_speed = 0.5;
    /**
     * decreases X movement factor
     * depending on Y
     *
     * @type {number}
     */
    this.steer_threshold = 0.3;
  }
}

/**
 * Camera config for {@link ThirdPersonControllers.CameraThirdPerson}
 *
 * @memberof Config
 */
class CameraConfig {
  constructor() {
    /**
     * x distance to target
     */
    this.distance = 10;
    /**
     * z height
     */
    this.height = 3;
    /**
     * how fast camera follows target
     */
    this.follow_speed = 0.2;
    /**
     * how fast camera rotates durning idle
     */
    this.rotation_passive_speed = 0.1;
    /**
     * how fast camera rotates durning input
     */
    this.rotation_active_speed = 0.03;
    /**
     * actial camera movement speed
     */
    this.camera_speed = 0.07;
    /**
     * scales rotation_speed depends on camera-target radial distance 
     */
    this.stick_factor = 2;
  }
}

export { RenderConfig, PawnConfig, CameraConfig };
