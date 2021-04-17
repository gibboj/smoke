import React, { RefObject, useState } from 'react';

import { GRID_DEFAULT_DIMENSIONS, GRID_DEFAULT_STEPS, GRID_DEFAULT_VISIBILITY } from './constants';
import { Button } from './ui/Button';
import { TextInput } from './ui/Input';
import Loop from './Loop'
import useWindowSize from './useWindowSize';

function SmokeContainer({ loop }: { loop: Loop }) {
  const canvasContainer: RefObject<HTMLDivElement> = React.createRef()
  const size = useWindowSize();

  const [isGridVisible, setIsGridVisible] = useState<Boolean>(GRID_DEFAULT_VISIBILITY);
  const [gridWidth, setGridWidth] = useState<number>(GRID_DEFAULT_DIMENSIONS.width);
  const [gridHeight, setGridHeight] = useState<number>(GRID_DEFAULT_DIMENSIONS.height);
  const [gridSteps, setGridSteps] = useState<number>(GRID_DEFAULT_STEPS);

  React.useEffect(() => {
    loop.handleResize(size)
  }, [loop, size])

  React.useEffect(() => {
    loop.setGridVisibility(isGridVisible)
  }, [loop, isGridVisible, gridHeight, gridWidth, gridSteps]);

  React.useEffect(() => {
    loop.updateGrid({ width: gridWidth, height: gridHeight }, gridSteps)
  }, [loop, gridHeight, gridWidth, gridSteps]);

  React.useEffect(() => {
    if (canvasContainer.current) {
      loop.init(canvasContainer.current)
    }
  }, [loop, canvasContainer]); // Make sure the effect runs only once

  return (
    <div className="grid" >
      <div style={{ "gridArea": "main" }} ref={canvasContainer} ></div>
      <div className="sidebar" style={{ "gridArea": "sidebar" }}>
        <div>
          <TextInput label="Height" type="number" onChange={(e) => setGridHeight(parseInt(e.currentTarget.value))} value={gridHeight} />
        </div>
        <div>
          <TextInput label="Width" type="number" onChange={(e) =>
            setGridWidth(parseInt(e.currentTarget.value))} value={gridWidth} />
        </div>
        <div>
          <TextInput label="Steps" onChange={(e) => setGridSteps(parseInt(e.currentTarget.value))} value={gridSteps} />
        </div>

        <Button onClick={() => setIsGridVisible(!isGridVisible)}>
          <span>{isGridVisible ? "Hide Grid" : "Show Grid"}</span>
        </Button>
        <Button>Add Smoke</Button>
      </div>
    </div>
  )
}

export default SmokeContainer