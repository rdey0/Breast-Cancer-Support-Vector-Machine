import React from 'react';
import './App.css';
import graph_img from './graph_img/graph.png'
import Select from './components/select_box.js'
import Slider from './components/slider.js'
import Header from './components/header.js'
class App extends React.Component {
  state = {
    plot_src: graph_img, 
    x_var: 'mean concavity', 
    y_var: 'worst concavity', 
    degree: '1', 
    cost: '1',
    model_accuracy: 0
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
        var num_figures = 4;
        var accuracy = (parseFloat(res.accuracy) * 100).toPrecision(num_figures);
        this.setState({model_accuracy: accuracy});
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
        <Header/>

        <div className='gui-container'>
          <div className='svm-display'>
            <img src={this.state.plot_src} alt='graph'/>
            <div className='graph-info-container'>
              <div className='info-item'>
                <div className='control-label'> Model Accuracy</div>
                <div className='metric'>{this.state.model_accuracy}%</div>
              </div>
              <div className='info-item'>
                <div className='control-label'> Degree</div>
                <div className='metric'>{this.state.degree}</div>
              </div>
              <div className='info-item'>
                <div className='control-label'> Cost</div>
                <div className='metric'>{this.state.cost}</div>
              </div>
            </div>
          </div>
          <div className='controls'>
            <Select label='X Variable' id='x_var' variable_name='mean concavity' onChange={this.handle_field_change}/>
            <Select label='Y Variable' id='y_var' variable_name='worst concavity' onChange={this.handle_field_change}/>
            <Slider label='Degree' id='degree' min='1' max='5' onChange={this.handle_field_change}/>
            <Slider label='Cost' id='cost' min='1' max='10' onChange={this.handle_field_change}/>
            <div className='button-container'>
              <div className='update-graph' onClick={this.refresh_graph}>Graph</div>
              <div className='update-graph' onClick={this.refresh_graph}>Optimize</div>
            </div>
          </div>
        </div>
      
      </div>

    );
  }
}

export default App;
