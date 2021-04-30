import * as THREE from "three";
import { GridProps } from "../constants";
import { Renderer } from "./Renderer";


type DebugUIProps = {} & GridProps;
class DebugUI implements DebugUIProps {
  containerWidth: number;
  containerHeight: number;
  stepsWidth: number;
  stepsHeight: number;
  geometery: THREE.Object3D[];

  constructor(props: DebugUIProps) {
    this.containerWidth = props.containerWidth;
    this.containerHeight = props.containerHeight;
    this.stepsWidth = props.stepsWidth;
    this.stepsHeight = props.stepsHeight;
    this.geometery = [];
  }


  createGeometry(renderer: Renderer, grid: GridProps) {
    const { containerHeight: height, containerWidth: width, stepsWidth: steps } = grid

    this.containerWidth = width;
    this.containerHeight = height;
    this.stepsWidth = steps;
    this.stepsHeight = steps;

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
      this.geometery.push(circle)
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
    this.geometery && scene.remove(...this.geometery)
    this.geometery = []
  }
}

export default DebugUI;