import PointData from "../renderer/PointData"

interface DataManagerProps {
  velocity: PointData | null;
  pressure: PointData | null;
}

class DataManager implements DataManagerProps {
  velocity: PointData | null;
  pressure: PointData | null;

  constructor(stepHeight: number, stepWidth: number) {
    this.velocity = new PointData({ width: stepWidth, height: stepHeight })
    this.pressure = new PointData({ width: stepWidth, height: stepHeight })
  }

  destroy() {
    this.velocity = null
    this.pressure = null
  }
}

export default DataManager