
import { GRID_DEFAULT_STEPS, GRID_DEFAULT_WIDTH_PIXEL, GRID_DEFAULT_HEIGHT_PIXEL, GridProps } from "./constants";
import DataManager from "./data/DataManager";
import DebugUI from "./renderer/DebugUI";
import Grid from "./renderer/Grid";
import { Renderer } from "./renderer/Renderer";

const defaultDimensions = {
  containerWidth: GRID_DEFAULT_WIDTH_PIXEL,
  containerHeight: GRID_DEFAULT_HEIGHT_PIXEL,
  stepsHeight: GRID_DEFAULT_STEPS,
  stepsWidth: GRID_DEFAULT_STEPS,
}

class Loop {
  renderer: Renderer
  dataManager: DataManager
  grid: Grid;
  debugUI: DebugUI

  constructor() {
    this.renderer = new Renderer();
    this.dataManager = new DataManager(defaultDimensions.stepsHeight, defaultDimensions.stepsWidth);
    this.grid = new Grid(defaultDimensions);
    this.debugUI = new DebugUI(defaultDimensions)
  }

  handleResize = (size: { width?: number, height?: number }) => {
    this.renderer.handleResize(size)
  }

  setGridVisibility(gridVisible: Boolean) {
    this.grid?.setVisibility(gridVisible)
  }

  updateGrid(grid: GridProps) {
    this.grid.remove(this.renderer.scene);
    this.debugUI.remove(this.renderer.scene);

    this.grid.createGeometry(this.renderer, grid)
    this.debugUI.createGeometry(this.renderer, grid)
  }

}
export default Loop