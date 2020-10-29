import React from 'react'
import drawing from '../graph_img/success_drawing.svg'
export default function GraphButtons() {
    return (
        <div>
            <h1>That's it!</h1>
            <p>
                Check out the updated graph and see how well you did
            </p>
            <img src={drawing}/>
            <p>
                Additionally, The results dashboard under your graph tells you how accurately 
                your model performed and shows you the degree and cost parameters 
                you or the optimize feature chose.
            </p>
        
        </div>
    );
}