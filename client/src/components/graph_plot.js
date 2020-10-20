import React from 'react';

export default class Plot extends React.Component {
    constructor(props){
        super()
        this.state = {path: props.path}
    }

    render(){
        return(
            <img  src={this.state.path} alt='graph'/>
        )
    }
}