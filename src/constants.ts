
export const GRID_DEFAULT_DIMENSIONS = { width: 50, height: 50 }
export const GRID_DEFAULT_WIDTH_PIXEL = 50;
export const GRID_DEFAULT_HEIGHT_PIXEL = 50;
export const GRID_DEFAULT_VISIBILITY = false;
export const GRID_DEFAULT_STEPS = 50

export type Dimensions = { width: number, height: number }


export interface GridProps {
  containerWidth: number;
  containerHeight: number;
  stepsWidth: number;
  stepsHeight: number;
}