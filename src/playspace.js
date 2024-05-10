import * as THREE from "three";
import { Scene } from "three";

export default class Playspace {
  constructor() {
    /** @type {THREE.Scene} */
    this.scene = null;
    /** @type {THREE.Mesh} */
    this.cube = null;
	}

  init(scene) {
		this.scene = scene;

		return this;
	}

  run() {
		{
			const geometry = new THREE.BoxGeometry(1, 1, 1);
			const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
			const cube = new THREE.Mesh(geometry, material);
			this.scene.add(cube);
			this.cube = cube;
		}

		return this;
	}

  step(dt) {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
	}

	stop() {
		this.cube?.removeFromParent();
		this.cube = null;
	}

  dispose() {
		this.stop();
		this.scene = null;
	}
}
