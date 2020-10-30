import React from 'react'
import drawing from '../graph_img/metric_drawing.svg'
export default function ParameterSelection() {
    return (
        <div className='onboarding-content'>
            <h1>Choose Parameters</h1>
        
                
            <p>
                <b>Cost: </b>
                Determines how heavily to punish your model for incorrectly
                classifying data points. The higher the cost, the greater
                the punishment.
            </p>

            <p>
                <b>Degree: </b>
                Determines how flexible the decision boundary can be. The 
                higher the degree, the 'curvier' the separating line may
                appear.
            </p>
            
        
        </div>
    );
}