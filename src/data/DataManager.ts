import PointData from "../renderer/PointData"
import { Dimensions } from "../constants";

interface DataManagerProps {
  velocity: PointData | null;
  pressure: PointData | null;
}

class DataManager implements DataManagerProps {
  velocity: PointData | null;
  pressure: PointData | null;
  constructor() {
    this.velocity = null;
    this.pressure = null;
  }

  init(gridSteps: Dimensions) {
    this.velocity = new PointData(gridSteps)
    this.pressure = new PointData(gridSteps)
  }

  destroy() {
    this.velocity = null
    this.pressure = null
  }
}
export default DataManager