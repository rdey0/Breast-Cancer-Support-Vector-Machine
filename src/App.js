import React from 'react';
import './App.css';
import graph_img from './graph_img/graph.jpg'
import Select from './components/select_box.js'
import Slider from './components/slider.js'


class App extends React.Component {
  state = {x_var: 'mean_concavity', y_var: 'worst_concavity', degree: '1', cost: '1'}

  

  render(){
    const handle_field_change = (id, value) =>{
      this.setState({[id]: value}, ()=>{
        console.log('app state:',this.state);
      });
    }
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
              <Select id='x_var' variable_name='mean concavity' onChange={handle_field_change}/>
              <Select id='y_var' variable_name='worst concavity' onChange={handle_field_change}/>
            </div>
            <div className='parameter-sliders'>
              <Slider id='degree' min='1' max='5' onChange={handle_field_change}/>
              <Slider id='cost' min='1' max='10' onChange={handle_field_change}/>
            </div>
          </div>
        </div>
      
      </div>
    );
  }
}

export default App;
