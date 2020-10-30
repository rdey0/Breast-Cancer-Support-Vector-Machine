import React from 'react'
import drawing from '../graph_img/ai_drawing.svg'
export default function Introduction() {
    return (
        <div className='onboarding-content'>
            
            <h2>What is This?</h2>
            
            <p>
                Create your own machine learning model and have it 
                classify cancer positive and cancer negative patients
                by drawing boundaries between the two
            </p>
        </div>
    );
}

/*
<p>
                This cancer classifier uses two sets of data to determine whether
                an individual has cancer or not. In order to make such 
                predictions, this classifier uses a support vector machine, a 
                machine learning model which attempts to draw boundaries bewteen 
                each classification of data. In our case, boundaries are drawn
                between cancer positive and cancer negative patients.
            </p>
*/