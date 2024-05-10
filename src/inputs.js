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
