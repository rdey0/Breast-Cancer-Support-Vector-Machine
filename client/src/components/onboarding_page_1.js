import React from 'react'
import drawing from '../graph_img/data_drawing.svg'
export default function DataSelection() {
    return (
        <div className='onboarding-content'>
            
            <h2>First Choose Your Data</h2>
            <p>
                You can choose your <b>X Variable</b> and <b>Y Variable</b> data sets on the control
                panel to the right of the graph  
            </p>
            <p>
                This is the data your machine learning model will learn from
            </p>
            <p>
                Don't worry about which data 
                set is the x variable and which is the y, the only thing 
                that matters is the combination!
            </p>
            
            
        </div>
    );
}

/*
<p>
                <b>Note: </b>
                The data sets you select have the greatest impact on the
                accuracy of the classifier. Remember, this is the information 
                your classifier will learn from. For best results, you should 
                try to find a combination of data which creates the most 
                separation (puts the most distance) between cancer positive and 
                cancer negative points.
            </p>
*/