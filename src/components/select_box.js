import React from 'react';

export default class select_box extends React.Component {
    constructor(props){
        super();
        this.state = {value: props.variable_name};
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        this.setState({value: event.target.value});
    }
    render() {
        return(
            <div className='selector-container'>
                <select value={this.state.value} onChange={this.handleChange}>
                    <option value='mean concavity'>Mean Concavity</option>
                    <option value='mean texture'>Mean Texture</option>
                    <option value='mean area'>Mean Area</option>
                    <option value='worst concavity'>Worst Concavity</option>
                    <option value='worst texture'>Worst Texture</option>
                    <option value='worst area'>Worst Area</option>
                </select>
            </div>
        )
    }
}