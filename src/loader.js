/** @namespace Render */

import * as THREE from "three";
import logger from "./logger.js";

/**
 * @class
 * @memberof Render
 */
class LoaderCache {
  constructor() {
    this.guids = 0;
    this.textures = {};
  }
}

/**
 * @class
 * @memberof Render
 */
class Loader {
  static _instance;

  constructor() {
    this.cache = new LoaderCache();
  }

  /**
   * @returns {Loader} .
   */
  static get instance() {
    if (!Loader._instance) {
      Loader._instance = new Loader();
    }

    return Loader._instance;
  }

  /**
   * @param {string} url .
   * @returns {THREE.Texture} .
   */
  get_texture(url) {
    if (this.cache.textures[url]) {
      logger.log(`Loader::get_texture texture ${url} fetched from cache..`);
      // should be cloned probably
      return this.cache.textures[url];
    }

    logger.log(`Loader::get_texture texture ${url} loading..`);
    const texture = new THREE.TextureLoader().load(url, () => {
      logger.log(`Loader::get_texture texture ${url} loaded.`);
    });
    texture.colorSpace = THREE.SRGBColorSpace;
    this.cache.textures[url] = texture;

    return texture;
  }
}

export { Loader, LoaderCache };
export default Loader;
