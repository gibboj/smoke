import * as THREE from "three";
import { Dimensions } from "../constants";


class Grid {
  width: number;
  height: number;
  steps: number;
  geometery: THREE.Group | null;

  constructor({ width, height }: Dimensions = { width: 50, height: 50 }, steps: number = 10) {
    this.width = width;
    this.height = height;
    this.steps = steps;
    this.geometery = null;
  }

  setVisibility(gridVisible: Boolean) {
    this.geometery && (this.geometery!.visible = !!gridVisible);
  }

  update(gridDimensions: Dimensions, gridSteps: number) {
    this.createGeometry(gridDimensions, gridSteps)
  }

  createGeometry({ width, height }: Dimensions, steps: number = 1) {
    const topLeftX = width / 2 * -1;
    const topLeftY = height / 2 * -1;
    const stepSizeWidth = width / steps;
    const stepSizeHeight = height / steps;
    const material = new THREE.LineBasicMaterial({ color: 0x348955 });
    const axisMaterial = new THREE.LineBasicMaterial({ color: 0xFFFFFF });
    const group = new THREE.Group();

    for (let step = 0; step <= steps; step++) {
      // Horizontal
      const horizontal = topLeftX + step * stepSizeWidth;
      const geometry1 = this.createLine(horizontal, topLeftY, horizontal, topLeftY + height)
      group.add(new THREE.Line(geometry1, (step === 0 ? axisMaterial : material)));
      // Vertical 
      const vertical = topLeftY + step * stepSizeHeight;
      const geometry2 = this.createLine(topLeftX, vertical, topLeftX + width, vertical)
      group.add(new THREE.Line(geometry2, (step === 0 ? axisMaterial : material)));
    }

    return group;
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
export default Grid;