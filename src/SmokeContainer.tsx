import React, { RefObject, useState } from 'react';
import { Renderer } from './renderer/Renderer';
import { Button } from './ui/Button';
import useWindowSize from './useWindowSize';

const threeRenderer = new Renderer()
function SmokeContainer() {
    const canvasContainer: RefObject<HTMLDivElement> = React.createRef()
    const size = useWindowSize();
    const [isGridVisible, setIsGridVisible] = useState<Boolean>(true);
    const [gridWidth, setGridWidth] = useState<number>(50);
    const [gridHeight, setGridHeight] = useState<number>(40);
    const [gridSteps, setGridSteps] = useState<number>(10);
    React.useEffect(() => {
        threeRenderer.handleResize(size)
    }, [size])


    React.useEffect(() => {
        threeRenderer.setGridVisibility(isGridVisible)
    }, [isGridVisible, gridHeight, gridWidth, gridSteps]);

    React.useEffect(() => {
        threeRenderer.updateGrid({ width: gridWidth, height: gridHeight }, gridSteps)
    }, [gridHeight, gridWidth, gridSteps]);

    React.useEffect(() => {
        if (canvasContainer.current) {
            threeRenderer.init({ element: canvasContainer.current, gridVisible: isGridVisible })
        }
    }, [canvasContainer, isGridVisible]); // Make sure the effect runs only once

    return (
        <div className="grid" >
            <div style={{ "gridArea": "main" }} ref={canvasContainer} ></div>
            <div className="sidebar" style={{ "gridArea": "sidebar" }}>
                <label>Height</label><input type="number" onChange={(e) => setGridHeight(parseInt(e.currentTarget.value))} value={gridHeight} />
                <label>Width</label><input type="number" onChange={(e) => setGridWidth(parseInt(e.currentTarget.value))} value={gridWidth} />
                <label>Steps</label><input type="number" onChange={(e) => setGridSteps(parseInt(e.currentTarget.value))} value={gridSteps} />
                <Button onClick={() => setIsGridVisible(!isGridVisible)}><span>{isGridVisible ? "Hide Grid" : "Show Grid"}</span></Button>
                <Button>Show Cube</Button>
                <Button>Add Smoke</Button>
            </div>
        </div>
    )
}

export default SmokeContainer