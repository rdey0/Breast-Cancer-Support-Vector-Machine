import React from 'react'

export default function GraphButtons() {
    return (
        <div className='onboarding-content'>
            <h1>Update the Graph</h1> 
            <p>
                <b>Graph: </b>
                Draws a decision boundary for your selected data using the
                selected parameters.
            </p> 
            <p>
                <b>Optimize: </b>
                Finds the cost and degree parameters which result in the 
                highest accuracy for your selected data. The graph is also 
                updated.
            </p>
        
        </div>
    );
}