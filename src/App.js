import React from 'react';
import './App.css';
import graph_img from './graph_img/graph.jpg'
import Select from './components/select_box.js'



class App extends React.Component {
  
  render(){
    const options = [
      { value: 'mean concavity', label: 'Mean Concavity' },
      { value: 'mean texture', label: 'Mean Texture' },
      { value: 'mean area', label: 'Mean Area' },
      { value: 'worst concavity', label: 'Worst Concavity' },
      { value: 'worst texture', label: 'Worst Texture' },
      { value: 'worst area', label: 'Worst Area' },
    ]
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
            <div className='parameter-selectors'>
              <Select variable_name='mean concavity'/>
              <Select variable_name='worst concavity'/>
            </div>
            <div className='parameter-sliders'>
              <div className='slide-container'>
                <input id="degree_slider" className="slider" type="range" min="1" max="10" defaultValue='1'/>
              </div>
              <div className='slide-container'>
                <input id="cost_slider" className="slider" type="range" min="1" max="20" defaultValue='1'/>
              </div>
            </div>
          </div>
        </div>
      
      </div>
    );
  }
}

export default App;
