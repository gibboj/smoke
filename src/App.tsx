
import './App.css';
import Loop from './Loop';
import SmokeContainer from "./SmokeContainer";

function App() {
    const loop = new Loop();
    return (
        <div className="App">
            <SmokeContainer loop={loop} />
        </div>
    );
}

export default App;
