import React from 'react'
import drawing from '../graph_img/metric_drawing.svg'
export default function ParameterSelection() {
    return (
        <div>
            <h1>Choose Parameters</h1>
        
                
            <p>
                <b>Cost: </b>
                Determines how heavily to punish the model for incorrectly
                classifying data points. The higher the cost, the greater
                the punishment.
            </p>

            <p>
                <b>Degree: </b>
                Determines how flexible the decision boundary can be. The 
                higher the degree, the 'curvier' the decision boundary may
                appear.
            </p>
            <img src={drawing}/>
        
        </div>
    );
}