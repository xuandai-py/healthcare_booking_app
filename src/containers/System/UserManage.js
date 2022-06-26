import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsersService, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter'
import ModalEditUser from './ModalEditUser';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUser: [],
            userEdit: {},
            isOpenModalUser: false,
            isOpenModalEditUser: false
        }
    }

    async componentDidMount() {
        this.getAllUsers()

    }

    getAllUsers = async () => {
        let response = await getAllUsersService('All')
        if (response && response.errCode === 0) {
            this.setState({
                arrUser: response.users
            })
        }
    }


    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }

    toggleUserEditModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }

    handleDeleteUser = async (user) => {
        try {
            let response = await deleteUserService(user.id)
            if (response && response.errCode === 0) {
                await this.getAllUsers()
            } else {
                alert(response.errMessage)
            }


        } catch (error) {
            console.error(error);
        }

    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data)
            if (response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUsers()
                this.setState({
                    isOpenModalUser: false
                })

                emitter.emit('EVENT_CLEAR_MODAL_DATA', { 'id': 'your id' })
            }
        } catch (error) {
            console.error('createNewUser: ', error);
        }
    }

    handleEditUser = (user) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }

    doEditUser = async (user) => {
        try {
            let response = await editUserService(user)
            if (response && response.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false
                })
                await this.getAllUsers()
            } else {
                alert(response.errMessage)
            }
        } catch (error) {
            console.error(error);
        }

    }


    render() {
        let arrUsers = this.state.arrUser
        return (
            <div className="users-container">

                <ModalUser isOpen={this.state.isOpenModalUser} toggleUserModal={this.toggleUserModal} createNewUser={this.createNewUser} />
                {this.state.isOpenModalEditUser &&
                    <ModalEditUser isOpen={this.state.isOpenModalEditUser}
                        toggleUserEditModal={this.toggleUserEditModal}
                        currentEditUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }
                {/* {this.state.isOpenModalUser &&
                    <div>
                   <ModalUser isOpen={true} 
                    toggleUserModal={this.toggleUserModal}    
                    
                /> 
                        <h1>asdasd</h1>
                        </div>
                }*/}
                <div className="title text-center">Manage USERS</div>
                <div className="mx-1">
                    <button className="btn btn-primary px-3"
                        onClick={() => this.handleAddNewUser()}><i className="fas fa-plus" />Add new user</button>
                </div>
                <div className="users-table mt-3 mx-2">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                            {arrUsers && arrUsers.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{user.email}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.address}</td>
                                        <td>
                                            <button className="btn btn-edit" onClick={() => this.handleEditUser(user)}><i className="fas fa-pencil-alt" /><span className="tooltiptext">Edit action</span></button>
                                            <button className="btn btn-delete" onClick={() => this.handleDeleteUser(user)}><i className="fas fa-trash-alt" /><span className="tooltiptext">Delete action</span></button>

                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>

                    </table>

                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
