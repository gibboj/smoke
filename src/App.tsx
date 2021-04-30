
import { useState } from 'react';
import './App.css';
import { GRID_DEFAULT_HEIGHT_PIXEL, GRID_DEFAULT_STEPS, GRID_DEFAULT_WIDTH_PIXEL } from './constants';
import Loop from './Loop';
import SmokeContainer from "./SmokeContainer";

export type AppState = {
  containerWidth: number;
  containerHeight: number;
  stepsWidth: number;
  stepsHeight: number;
  debugState: number
}

const loop = new Loop();

function App() {

  const [containerWidth, setContainerWidth] = useState<number>(GRID_DEFAULT_WIDTH_PIXEL);
  const [containerHeight, setContainerHeight] = useState<number>(GRID_DEFAULT_HEIGHT_PIXEL);
  const [stepsHeight, setStepsHeight] = useState<number>(GRID_DEFAULT_STEPS);
  const [stepsWidth, setStepsWidth] = useState<number>(GRID_DEFAULT_STEPS);
  const [debugState] = useState<number>(1);

  if (!window.WebGLRenderingContext) {
    return <div> No Web GL</div>
  }

  const handleElement = (element: HTMLDivElement) => {
    loop.renderer.init({ element })
  }

  return (
    <div className="App">
      <SmokeContainer loop={loop}
        containerWidth={containerWidth}
        containerHeight={containerHeight}
        stepsWidth={stepsWidth}
        stepsHeight={stepsHeight}
        setContainerHeight={setContainerHeight}
        setContainerWidth={setContainerWidth}
        setStepsWidth={setStepsWidth}
        setStepsHeight={setStepsHeight}
        setElement={handleElement}
        debugState={debugState} />
    </div>
  );
}

export default App;
