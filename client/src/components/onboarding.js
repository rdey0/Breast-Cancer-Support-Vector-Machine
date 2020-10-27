import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';


const customStyles = {
    overlay: {
        backgroundColor: 'rgba(65, 64, 64, 0.75)'
    },
    content:{
        height: '60%',
        width: '50%',
        top: '15%',
        left: '20%',
        border: 'none',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
    }
};
export default class Onboarding extends React.Component {
    state={};
    constructor(props) {
        super();
        this.state = {modal_open: props.showModal};
        this.close_modal = this.close_modal.bind(this);
    }
    
    close_modal(){
        this.setState({modal_open: false})
    }

    render() {
        return(
            <Modal isOpen={this.state.modal_open} style={customStyles}>
                <div className='onboarding-controls'>
                    <div onClick={this.close_modal}>Exit</div>
                </div>
                <div>

                </div>
            </Modal>
        );
    }
} 