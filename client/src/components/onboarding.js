import React from 'react';
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


function OnboardingContent (props) {
    return props.pages
        .filter((Page, index) => index === props.pageNum - 1)
        .map((Page, index) => {
            return <div className='onboarding-content' key={index}><Page/></div>
        });
}

export default class Onboarding extends React.Component {

    constructor(props) {
        super();
        this.state = {
            modal_open: props.showModal, 
            step_num: 1,
            pages: props.pages, 
            total_steps: props.pages.length
        };
        this.close_modal = this.close_modal.bind(this);
        this.next_page = this.next_page.bind(this);
        this.previous_page = this.previous_page.bind(this);
    }
    
    close_modal(){
        this.setState({modal_open: false})
    }

    next_page() {
        const page_num = this.state.step_num;
        const num_pages = this.state.total_steps;
        if (page_num < num_pages)
            this.setState({step_num: page_num + 1})
        else{
            //change next button to done button
        }     
    }

    previous_page() {
        const page_num = this.state.step_num;
        if (page_num > 1)
            this.setState({step_num: page_num - 1})
        else{
            //hide back button
        }        
    }

    render() {
        return(
            <Modal isOpen={this.props.showModal} style={modal_styles} ariaHideApp={false}>
                <div className='onboarding-controls'>
                    <div className='step-container'>
                        <div>Step {this.state.step_num} / {this.state.total_steps}</div>
                    </div>
                    <div className='change-page-container'>

                        {this.state.step_num > 1 &&
                            <div className='change-page-back' onClick={this.previous_page}>Back</div>
                        }

                        {this.state.step_num < this.state.total_steps
                            ?<div className='change-page-next' onClick={this.next_page}>Next</div>
                            :<div className='change-page-next' onClick={this.props.closeModal}>Done</div>
                        }
                        
                    </div>
                </div>
                <OnboardingContent pages={this.state.pages} pageNum={this.state.step_num}/>
            </Modal>
        );
    }
} 