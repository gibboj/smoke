
import { GRID_DEFAULT_STEPS, GRID_DEFAULT_DIMENSIONS, Dimensions } from "./constants";
import DataManager from "./data/DataManager";
import DebugUI from "./renderer/DebugUI";
import Grid from "./renderer/Grid";
import { Renderer } from "./renderer/Renderer";


class Loop {
  renderer: Renderer
  dataManager: DataManager
  grid: Grid;
  debugUI: DebugUI


  constructor() {
    this.renderer = new Renderer();
    this.dataManager = new DataManager();
    this.grid = new Grid();
    this.debugUI = new DebugUI()

  }

  init(element: HTMLDivElement, gridSteps: number = GRID_DEFAULT_STEPS) {
    this.renderer.init({ element })
    this.dataManager.init({ width: gridSteps, height: gridSteps })
    this.grid = new Grid(GRID_DEFAULT_DIMENSIONS, GRID_DEFAULT_STEPS);
    this.debugUI = new DebugUI(GRID_DEFAULT_DIMENSIONS, GRID_DEFAULT_STEPS)
  }

  handleResize = (size: { width?: number, height?: number }) => {
    this.renderer.handleResize(size)
  }

  setGridVisibility(gridVisible: Boolean) {
    this.grid?.setVisibility(gridVisible)
  }

  updateGrid(gridDimensions: Dimensions, gridSteps: number) {
    this.grid && this.grid.geometery && this.renderer.remove(this.grid.geometery)
    const a = this.grid?.createGeometry(gridDimensions, gridSteps)
    this.renderer.add(a)

    this.debugUI.createGeometry(this.renderer, gridDimensions, gridSteps)

  }

}
export default Loop