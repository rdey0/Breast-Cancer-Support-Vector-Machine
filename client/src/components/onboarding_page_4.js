import React from 'react'
import drawing from '../graph_img/success_drawing.svg'
export default function GraphButtons() {
    return (
        <div className='onboarding-content'>
            <h1>That's it!</h1>
            <p>
                Check out the updated graph and see how well you did
            </p>
            <p>
                The higher the model accuracy, the better your model
                was able to predict the presence of cancer!
            </p>
        
        </div>
    );
}