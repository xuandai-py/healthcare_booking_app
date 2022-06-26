import React, { Component } from 'react';
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { connect } from 'react-redux';
import { emitter } from '../../utils/emitter'
import _ from 'lodash'

class ModalEditUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }


    }


    componentDidMount() {
        let user = this.props.currentEditUser
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'pass',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }
    }

    toggle = () => {
        this.props.toggleUserEditModal()
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }

    checkValideInput = () => {
        let isValid = true
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert('Missing parameter: ' + arrInput[i])
                break;
            }
        }

        return isValid
    }

    handleSaveUser = () => {
        let isValid = this.checkValideInput()
        if (isValid === true) {
            this.props.editUser(this.state)

        }
    }

    handleEditUser = () => {

    }


    render() {

        return (
            <Modal
                size="lg" centered
                isOpen={this.props.isOpen} toggle={() => { this.toggle() }} className="modal-user-container">
                <ModalHeader toggle={() => { this.toggle() }}>
                    Modal title
                </ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">

                        <div className="input-container">
                            <label>Email:</label>
                            <input placeholder="Type in" type="text" onChange={(event) => this.handleOnChangeInput(event, "email")} value={this.state.email} disabled />
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input placeholder="Type in" type="text" onChange={(event) => this.handleOnChangeInput(event, "password")} value={this.state.password} disabled />
                        </div>

                        <div className="input-container">
                            <label>FirstName:</label>
                            <input placeholder="Type in" type="text" onChange={(event) => this.handleOnChangeInput(event, "firstName")} value={this.state.firstName} />
                        </div>
                        <div className="input-container">
                            <label>LastName</label>
                            <input placeholder="Type in" type="text" onChange={(event) => this.handleOnChangeInput(event, "lastName")} value={this.state.lastName} />
                        </div>
                        <div className="input-container max-width-input">
                            <label>Address</label>
                            <input placeholder="Type in" type="text" onChange={(event) => this.handleOnChangeInput(event, "address")} value={this.state.address} />
                        </div>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className="px-3" onClick={() => this.handleSaveUser()}>Save changes</Button>
                    <Button color="danger" className="px-3" onClick={() => this.toggle()}>Close</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);



