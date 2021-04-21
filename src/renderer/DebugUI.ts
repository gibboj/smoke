import * as THREE from "three";
import { Dimensions, GRID_DEFAULT_DIMENSIONS, GRID_DEFAULT_STEPS } from "../constants";
import { Renderer } from "./Renderer";



class DebugUI {
  width: number;
  height: number;
  steps: number;
  geometery: THREE.Group | null;

  constructor({ width, height }: Dimensions = GRID_DEFAULT_DIMENSIONS, steps: number = GRID_DEFAULT_STEPS) {
    this.width = width;
    this.height = height;
    this.steps = steps;
    this.geometery = null;
  }

  setVisibility(gridVisible: Boolean) {
    this.geometery && (this.geometery!.visible = !!gridVisible);
  }

  createGeometry(renderer: Renderer, { width, height }: Dimensions, steps: number = 1) {
    const stepSizeWidth = width / steps;
    const stepSizeHeight = height / steps;
    const topLeftX = width / 2 * -1 + stepSizeWidth * 0.5;
    const topLeftY = height / 2 * -1 + stepSizeHeight * 0.5;
    const material = new THREE.MeshBasicMaterial({ color: 0xcc2244 });

    for (let step = 0; step < steps * (steps - 0); step++) {
      const horizontal = topLeftX + Math.floor(step / steps) * stepSizeWidth;
      const vertical = topLeftY + Math.round(step % steps) * stepSizeHeight;
      const geometry = new THREE.CircleGeometry(stepSizeWidth / 2 * 0.9, 16);
      const circle = new THREE.Mesh(geometry, material);
      circle.position.set(horizontal, vertical, 0)
      renderer.add(circle);
    }
  }
  /**
   * 
   * @param x1 
   * @param y1 
   * @param x2 
   * @param y2 
   * @returns 
   */
  createLine(x1: number, y1: number, x2: number, y2: number) {
    const points = [
      new THREE.Vector3(x1, y1, 0),
      new THREE.Vector3(x2, y2, 0)
    ]
    return new THREE.BufferGeometry().setFromPoints(points)
  }

  /**
   * Remove the geometry from the scene
   * @param scene 
   */
  remove(scene: THREE.Scene) {
    this.geometery && scene.remove(this.geometery)
  }
}
export default DebugUI;