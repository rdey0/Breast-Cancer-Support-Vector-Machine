import React from 'react'

export default function DataSelection() {
    return (
        <div>
            <h1>First Choose Your Data</h1>
            <p>
                You can choose your x and y variable data sets on the control
                panel. Don't worry about which data set is the x variable and
                which is the y, the only thing that matters is the combination! 
            </p>
            <p>
                <b>Note: </b>
                The data sets you select have the greatest impact on the
                accuracy of the classifier. Remember, this is the information 
                your classifier will learn from. For best results, you should 
                try to find a combination of data which creates the most 
                separation (puts the most distance) between cancer positive and 
                cancer negative points.
            </p>
        </div>
    );
}