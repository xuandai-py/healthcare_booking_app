import React, { Component } from 'react';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { connect } from 'react-redux';
import { emitter } from '../../utils/emitter'

class ModalUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }

        this.listenToEmitter()

    }

    listenToEmitter = () => {
        emitter.on('EVENT_CLEAR_MODAL_DATA', data => {
            this.setState = {
                email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
            }
        })
    }
    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleUserModal()
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
        console.log(event.target.value, id)
    }

    checkValideInput = () => {
        let isValid = true
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address']
        for (let i = 0; i < arrInput.length; i++) {
            console.log('Check loop ', this.state[arrInput[i], arrInput[i]]);
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert('Missing parameter: ' + arrInput[i])
                break;
            }
        }

        return isValid
    }

    handleAddNewUser = () => {
        let isValid = this.checkValideInput()
        console.log('data modal', this.state);
        
        if (isValid ===true) {
            console.log('Check props child', this.props);
            this.props.createNewUser(this.state)
            
        }
    }

    
    render() {
        console.log('Check props', this.props);
        console.log('Check props isOpen', this.props.isOpen);
        return (
            <Modal
                size="lg" centered
                isOpen={this.props.isOpen} toggle={() => { this.toggle() }} className="modal-user-container">
                <ModalHeader toggle={() => {this.toggle()}}>
                    Modal title
                </ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        
                            <div className="input-container">
                                <label>Email:</label>
                            <input placeholder="Type in" type="text" onChange={(event) => this.handleOnChangeInput(event, "email")}/>
                            </div>
                            <div className="input-container">
                                <label>Password</label>
                                <input placeholder="Type in" type="text" onChange={(event) => this.handleOnChangeInput(event, "password")}/>
                            </div>
                        
                            <div className="input-container">
                                <label>FirstName:</label>
                                <input placeholder="Type in" type="text" onChange={(event) => this.handleOnChangeInput(event, "firstName")}/>
                            </div>
                            <div className="input-container">
                                <label>LastName</label>
                                <input placeholder="Type in" type="text" onChange={(event) => this.handleOnChangeInput(event, "lastName")}/>
                            </div>
                            <div className="input-container max-width-input">
                                <label>Address</label>
                                <input placeholder="Type in" type="text" onChange={(event) => this.handleOnChangeInput(event, "address")}/>
                            </div>
                        
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.handleAddNewUser()}>Cloning</Button>
                    <Button color="danger">Close</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
