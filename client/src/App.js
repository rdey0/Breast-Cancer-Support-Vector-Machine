import React from 'react';
import './App.css';
import graph_img from './graph_img/graph.png'
import Select from './components/select_box.js'
import Slider from './components/slider.js'

class App extends React.Component {
  state = {
    plot_src: graph_img, 
    x_var: 'mean concavity', 
    y_var: 'worst concavity', 
    degree: '1', 
    cost: '5',
    model_accuracy: null
  }

  handle_field_change=(id, value)=>{
    this.setState({[id]: value}, ()=>{
      console.log('app state:',this.state);
    });
  }

  update_accuracy=()=>{
    var request_params = {
      headers: {
        'Content-Type': "application/json;charset=utf-8"
      },
      method: 'GET'
    }
    fetch('/accuracy', request_params)
      .then(res => res.json())
      .then(res => {
        this.setState({model_accuracy: res.accuracy})
      })
  }

  update_image=()=>{
    var request_params = {
      headers: {
        'Content-Type': "application/json;charset=utf-8"
      },
      method: 'POST',
      body: JSON.stringify(this.state),
      redirect: 'follow'
    };

    fetch('/graph', request_params)
      .then(res => {
        return res.blob();
      })
      .then(res =>{
        this.setState({plot_src: URL.createObjectURL(res)});
      })
      .catch(error => console.log('Error:', error));
  }
  
  refresh_graph=()=>{
    this.update_image();
    this.update_accuracy(); 
  }


  render(){
    
    return (
      <div className="App">

        <div className="App-header">
          <h1>Breast Cancer SVM</h1>
        </div>
        
        <div className='gui-container'>
          <div className='svm-display'>
            <img src={this.state.plot_src} alt='graph'/>
          </div>
          <div className='controls'>
            <div className='parameter-selectors'>
              <Select id='x_var' variable_name='mean concavity' onChange={this.handle_field_change}/>
              <Select id='y_var' variable_name='worst concavity' onChange={this.handle_field_change}/>
            </div>
            <div className='parameter-sliders'>
              <Slider id='degree' min='1' max='5' onChange={this.handle_field_change}/>
              <Slider id='cost' min='1' max='10' onChange={this.handle_field_change}/>
            </div>
            <div>
              <button type='button' onClick={this.refresh_graph}>Generate Graph</button>
            </div>
          </div>
        </div>
      
      </div>
    );
  }
}

export default App;
