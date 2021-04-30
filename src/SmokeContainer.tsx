import React, { RefObject, useRef } from 'react';
import { Button } from './ui/Button';
import { TextInput } from './ui/Input';
import Loop from './Loop'
import useWindowSize from './useWindowSize';

function SmokeContainer({
  loop,
  containerWidth,
  containerHeight,
  setContainerHeight,
  setContainerWidth,
  stepsWidth,
  stepsHeight,
  setStepsWidth,
  setStepsHeight,
  setElement,
  debugState }: {
    loop: Loop,
    containerWidth: number,
    containerHeight: number,
    stepsWidth: number,
    stepsHeight: number,
    setStepsWidth: (input: number) => void,
    setStepsHeight: (input: number) => void,
    setContainerHeight: (input: number) => void,
    setContainerWidth: (input: number) => void,
    setElement: (element: HTMLDivElement) => void,
    debugState: number,
  }) {
  const canvasContainer: RefObject<HTMLDivElement> = useRef(null)
  const size = useWindowSize();

  React.useEffect(() => {
    loop.handleResize(size)
  }, [loop, size])

  React.useEffect(() => {
    loop.setGridVisibility(true)
  }, [loop, containerWidth, containerHeight, stepsWidth]);

  React.useEffect(() => {
    loop.updateGrid({ containerWidth, containerHeight, stepsWidth, stepsHeight })
  }, [loop, containerWidth, containerHeight, stepsWidth, stepsHeight]);

  React.useEffect(() => {
    if (canvasContainer.current) {
      setElement(canvasContainer.current)
    }
  }, [canvasContainer, setElement]); // Make sure the effect runs only once

  const handleContainerHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.currentTarget.value)
    if (value > 0) {
      setContainerHeight(value)
    }
  }

  const handleContainerWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.currentTarget.value)
    if (value > 0) {
      setContainerWidth(value)
    }
  }

  return (
    <div className="grid" >
      <div style={{ "gridArea": "main" }} ref={canvasContainer} ></div>
      <div className="sidebar" style={{ "gridArea": "sidebar" }}>
        <div>
          <TextInput label="Height" type="number"
            onChange={handleContainerHeight} value={containerHeight} />
        </div>
        <div>
          <TextInput label="Width" type="number"
            onChange={handleContainerWidth} value={containerWidth} />
        </div>
        <div>
          <TextInput label="Steps"
            onChange={(e) => setStepsWidth(parseInt(e.currentTarget.value))} value={stepsWidth} />
        </div>

        {/* <Button onClick={() => setIsGridVisible(!isGridVisible)}>
          <span>{isGridVisible ? "Hide Grid" : "Show Grid"}</span>
        </Button> */}
        <Button>Add Smoke</Button>
      </div>
    </div>
  )
}

export default SmokeContainer