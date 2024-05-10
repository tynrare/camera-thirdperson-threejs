import * as THREE from "three";
import logger from "./logger.js";

export class LoaderCache {
	constructor() {
		this.guids = 0;
		this.textures = {};
	}
}
export default class Loader {
	static _instance;

	constructor() {
		this.cache = new LoaderCache();
	}

	/**
		* @returns {Loader} .
	*/
	static get instance(){
		if (!Loader._instance) {
			Loader._instance = new Loader();
		}

		return Loader._instance;
	}

	get_texture(url, flip = false) {
		if (this.cache.textures[url]) {
			logger.log(`Loader::get_texture texture ${url} fetched from cache..`)
			return this.cache.textures[url];
		}

		logger.log(`Loader::get_texture texture ${url} loading..`)
		const texture = new THREE.TextureLoader().load(url, () => {
			logger.log(`Loader::get_texture texture ${url} loaded.`)
		});
		texture.colorSpace = THREE.SRGBColorSpace;
		texture.flipY = flip;
		this.cache.textures[url] = texture;

		return texture;
	}
}
