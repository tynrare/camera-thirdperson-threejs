import App from "./app.js";

/**
 * @enum {number}
 */
const InputAction = {
  left: 0,
  up: 1,
  right: 2,
  down: 3,
  action_a: 4,
  action_b: 5,
  action_c: 6,
  action_d: 7,
  action_f: 8,
  action_shift: 9,
  action_esc: 10,
  action_cmd: 11,
  action_enter: 12,
};

/**
 * @param {App} app .
 */
function run_inputs(app) {
  document.body.addEventListener("keydown", keydown);
  document.body.addEventListener("keyup", keyup);

  document.body.addEventListener("touchstart", pointerdown);
  document.body.addEventListener("mousedown", pointerdown);
  document.body.addEventListener("touchend", pointerup);
  document.body.addEventListener("mouseup", pointerup);
  document.body.addEventListener("touchmove", pointermove);
  document.body.addEventListener("mousemove", pointermove);

	/** @type {HTMLElement} */
	let joystick_el = document.querySelector("#screen_joytick");
	/** @type {HTMLElement} */
	let joystick_pimp_el = document.querySelector("#screen_joytick_pimp");
  let start_x = 0;
  let start_y = 0;
	let dx = 0;
	let dy = 0;
  let pointer_down = false;


	function loop() {
		requestAnimationFrame(loop);

		if(!pointer_down) {
			app.input_analog(0, 0);
			return;
		}

		const w = joystick_el.clientWidth;
		const h = joystick_el.clientHeight;
		app.input_analog(dx / w, dy / h);
	}
	loop();

	/**
		* @param {TouchEvent|MouseEvent} ev
	*/
  function pointerdown(ev) {
    pointer_down = true;
    start_x = ev.clientX ?? ev.touches[0]?.clientX ?? 0;
    start_y = ev.clientY ?? ev.touches[0]?.clientY ?? 0;

		joystick_el.classList.add("visible");
		joystick_pimp_el.classList.add("visible");

		joystick_el.style.left = start_x + "px";
		joystick_el.style.top = start_y + "px";
		joystick_pimp_el.style.left = start_x + "px";
		joystick_pimp_el.style.top = start_y + "px";
  }

  function pointermove(ev) {
    if (!pointer_down) {
      return;
    }
    const x = ev.clientX ?? ev.touches[0]?.clientX ?? 0;
    const y = ev.clientY ?? ev.touches[0]?.clientY ?? 0;
    dx = start_x - x;
    dy = start_y - y;
		joystick_pimp_el.style.left = x + "px";
		joystick_pimp_el.style.top = y + "px";
  }

  function pointerup(ev) {
    pointer_down = false;
		joystick_el.classList.remove("visible");
		joystick_pimp_el.classList.remove("visible");
  }

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
  };
  function keycode(key, start) {
    const action = key_to_action[key] ?? null;
    if (action !== null) {
      app.input(action, start);
    }
  }
}

export { InputAction, run_inputs };
