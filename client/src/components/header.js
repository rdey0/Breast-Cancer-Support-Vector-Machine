import React from 'react';


export default function Header (props){
    return (
        <div className="App-header">
            <div className='title-container'>
                <div className='header-title'>Breast Cancer SVM</div>
            </div>
            <div className='header-item'>
                <div>Tutorial</div>
            </div>
            <div className='header-item'>
                <a href={props.src} download>
                    <div>Download Graph</div>
                </a>
            </div>
        </div>
    )
    
}