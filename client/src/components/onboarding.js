import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';


const modal_styles = {
    overlay: {
        backgroundColor: 'rgba(136, 136, 136, 0.7)'
    },
    content:{
        height: '60%',
        width: '50%',
        top: '15%',
        left: '20%',
        border: 'none',
        borderRadius: '10px',
        boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px'
    }
};
export default class Onboarding extends React.Component {

    constructor(props) {
        super();
        this.state = {
            modal_open: props.showModal, 
            step_num: 1, 
            total_steps: 1
        };
        this.close_modal = this.close_modal.bind(this);
    }
    
    close_modal(){
        this.setState({modal_open: false})
    }

    render() {
        return(
            <Modal isOpen={this.state.modal_open} style={modal_styles}>
                <div className='onboarding-controls'>
                    <div className='step-container'>
                        <div>Step {this.state.step_num} / {this.state.total_steps}</div>
                    </div>
                    <div className='change-page-container'>
                        <div class='change-page-back'>Back</div>
                        <div class='change-page-next'>Next</div>
                    </div>
                </div>
                <div class-Name='onboarding-content'>

                </div>
            </Modal>
        );
    }
} 