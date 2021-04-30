import { Vector2, Vector3 } from "three";

export interface PointDataProps {
  width: number;
  height: number;
  data?: Array<number | Vector2 | Vector3>
  swap?: Array<number | Vector2 | Vector3>
}

type i = number
type j = number
type Position = [i, j]

/**
 * 
 */
class PointData implements PointDataProps {
  /* Stores a single array */
  data: Array<number>;
  /** So we never need to recreate this array, we use a swap to have a place to write the new data when we are referencing the odl */
  swap: Array<number>;
  width: number;
  height: number;

  constructor(props: PointDataProps) {
    this.data = props.data || new Array(props.width * props.height)
    this.swap = props.swap || new Array(props.width * props.height)
    this.width = props.width;
    this.height = props.height;
  }

  getDataAt(position: Position): number | null {
    const index = position[0] + position[1] * (this.width)
    if (index >= this.data.length || index < 0) return null;
    return this.data[index];
  }

  getAbove(position: Position): number | null {
    return this.getDataAt([position[0], position[1] - 1]);
  }

  getBelow(position: Position): number | null {
    return this.getDataAt([position[0], position[1] + 1]);
  }

  getLeft(position: Position): number | null {
    return this.getDataAt([position[0] - 1, position[1]]);
  }

  getRight(position: Position): number | null {
    return this.getDataAt([position[0] + 1, position[1]]);
  }
}

export default PointData