import { Vector2, Vector3 } from "three";
import { Dimensions } from "../constants";

interface PointDataProps {
  width: number;
  height: number;
  data: Array<number | Vector2 | Vector3>
  swap: Array<number | Vector2 | Vector3>
}

type i = number
type j = number
type Position = [i, j]

/**
 * 
 */
class PointData implements PointDataProps {
  /* Stores a single array */
  data: Array<any>;
  /** So we never need to recreate this array, we use a swap to have a place to write the new data when we are referencing the odl */
  swap: Array<any>;
  width: number;
  height: number;

  constructor(gridDimensions: Dimensions) {
    this.data = new Array(gridDimensions.width * gridDimensions.height)
    this.swap = new Array(gridDimensions.width * gridDimensions.height)
    this.width = gridDimensions.width;
    this.height = gridDimensions.height;
  }

  getPositionFrom2D(position: Position): number {
    return position[0] + position[1] * (this.width)
  }

  getAbove(position: Position) {
    const a = this.getPositionFrom2D([position[0], position[1] - 1]);
    return this.data[a]
  }

  getBelow(position: Position) {
    const a = this.getPositionFrom2D([position[0], position[1] + 1]);
    return this.data[a]
  }

  getLeft(position: Position) {
    const a = this.getPositionFrom2D([position[0] - 1, position[1]]);
    return this.data[a]
  }

  getRight(position: Position) {
    const a = this.getPositionFrom2D([position[0] + 1, position[1]]);
    return this.data[a]
  }
}

export default PointData