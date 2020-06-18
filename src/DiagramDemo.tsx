import React, { useState } from 'react';
import './App.css';
import Diagram from './Diagram';

export default function DiagramDemo() {
    const [visible, SetVisible] = useState(true);
    return (
        <div className="App">
            <div className="Button-group">
                <button onClick={() => SetVisible(true)}>Show react-diagram</button>
                <button onClick={() => SetVisible(false)}>Hide react-diagram</button>
            </div>
            {visible && <div>
                <Diagram />
            </div>}
        </div>
    );
}

