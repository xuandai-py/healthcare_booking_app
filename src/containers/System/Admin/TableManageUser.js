import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManageUser.scss'
import * as actions from "../../../store/actions";

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}

class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersRedux: []
        }
    }

    async componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                usersRedux: this.props.listUsers
            })
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteUser(user.id);
    }

    handleEditUser = (user) => {
        this.props.handleEditKey(user)

        // lưu đúng nhưng cập nhật sai >
    }


    render() {
        let arrUsers = this.state.usersRedux


        return (
            <>
                <div className="users-table mt-3 mx-2">
                    <table id="TableManageUser">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>Address</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>

                            {arrUsers && arrUsers.length > 0 &&
                                arrUsers.map((user, index) => {
                                    return (

                                        <tr key={index}>
                                            <td>{user.email}</td>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.address}</td>
                                            <td>{user.roleId}</td>
                                            <td>
                                                <button className="btn btn-edit" onClick={() => this.handleEditUser(user)}><i className="fas fa-pencil-alt" /><span className="tooltiptext">Edit action</span></button>
                                                <button className="btn btn-delete" onClick={() => this.handleDeleteUser(user)}><i className="fas fa-trash-alt" /><span className="tooltiptext">Delete action</span></button>

                                            </td>
                                        </tr>
                                    )
                                })
                            }


                        </tbody>

                    </table>

                </div>
                {/* <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} /> */}
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.testingReducer.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUser: (userId) => dispatch(actions.deleteUser(userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
