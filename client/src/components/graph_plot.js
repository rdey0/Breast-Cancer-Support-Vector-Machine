import React from 'react';
import loading_indicator from '../graph_img/loading_indicator.svg'

export default function Plot(props) {
    return (
        
        <div className='plot'>
            {props.isLoading &&
                <div> 
                    <div className='loading-indicator'>
                        <img src={loading_indicator} alt='loading'/>
                    </div>
                    <div className='graph-overlay'></div>
                </div>
            }
            <img className='graph' src={props.src} alt='graph'/>
        </div>
    );
}
/*
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
*/