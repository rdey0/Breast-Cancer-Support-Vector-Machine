import React from 'react';
import './App.css';
import graph_img from './graph_img/graph.jpg'

function App() {
  

  
  return (
    <div className="App">

      <div className="App-header">
        <h1>Breast Cancer SVM</h1>
      </div>
      
      <div className='gui-container'>
        <div className='svm-display'>
          <img  src={graph_img} alt='graph'/>
        </div>
        <div className='controls'>
            <div className='slide-container'>
              <input id="degree_slider" className="slider" type="range" min="1" max="10" defaultValue='1'/>
            </div>
            <div className='slide-container'>
              <input id="cost_slider" className="slider" type="range" min="1" max="20" defaultValue='1'/>
            </div>
        </div>
      </div>
     
    </div>
  );
}

export default App;
