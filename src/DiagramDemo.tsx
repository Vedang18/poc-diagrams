import React, { useState } from 'react';
import './App.css';
import DiagramUI from './components/diagrams/Diagram';
import RT from './components/diagrams/RT';
import { FlowChartUI } from './components/flowchart/FlowChart';

enum ShowType {
    Diagram, FlowChart
}
export default function DiagramDemo() {
    const [visible, SetVisible] = useState<ShowType>(ShowType.Diagram);
    return (
        <div className="App">
            <div className="Button-group">
                <button onClick={() => SetVisible(ShowType.Diagram)}>Show react-diagram</button>
                <button onClick={() => SetVisible(ShowType.FlowChart)}>Show react-flowchart</button>
            </div>
            <div>
                {visible === ShowType.Diagram ? <DiagramUI /> : <FlowChartUI />}
                {/* <RT/> */}
            </div>
        </div>
    );
}

