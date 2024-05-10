# camera-thirdperson-threejs

d240510

[web demo](https://camera-thirdperson-threejs.netlify.app/)

# build & run

npm required

install:
```
> npm i
```

run dev:
```
> npm start
```

build:
```
> npm run build
```

# configuration, api

essential code - camera_third_person.js, pawn_third_person.js;

initialization:
```js
    const camera_controller = new CameraThirdPerson();
    const pawn_controller = new PawnThirdPerson();
    // object is THREE.Object3D to controll and follow
    camera_controller.set_target(object);
    pawn_controller.set_target(object);
    // camera is camera ;)
    camera_controller.set_camera(camera);
    pawn_controller.set_camera(camera);
```

update:
```js
    // dt is frame time in ms
    camera_controller.step(dt);
    pawn_controller.step(dt);
```

input, analog:
```js
    // x, y has to be clamped in range [-1, 1]
    pawn_controller.input_analog(x, y);
    camera_controller.direction.set(x, y);
```

input, keyboard:
```js
    // code is one of InputAction.left, InputAction.right, InputAction.up, InputAction.down
    // action is boolean true,false where true - key press, false - key release
    // import InputActions: import { InputAction } from "./inputs.js";
    pawn_controller.input(code, action);
    const dir = pawn_controller.direction;
    camera_controller.direction.set(dir.x, dir.y);
```

cofiguration:

tweak values in `camera_controller.config` and `pawn_controller.config`.
All values exposed on page gui menu for quick test.
