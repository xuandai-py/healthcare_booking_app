import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import { languages, crud_actions, CommonUtils } from '../../../utils';
import * as actions from "../../../store/actions";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import './UserRedux.scss';
import TableManageUser from './TableManageUser';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,

            email: '',
            password: '',
            address: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            gender: '',
            position: '',
            role: '',
            image: '',

            action: crud_actions.CREATE,
            userEditId: ''
        }
    }


    async componentDidMount() {
        this.props.testingFetchGenderStart()
        this.props.fetchPositionStart()
        this.props.fetchRoleStart()
        // this.props.dispatch(action.testingFetchGenderStart())
        // try {
        //     let res = await getAllCodeService('role')
        //     console.log('res: ', res);
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }

        //     console.log(this.props.genderArr);
        // } catch (error) {
        //     console.error(error);
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            console.log('keymap: ', arrGenders);
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }

        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux;
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux;
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
            })
        }

        if (prevProps.listUsers !== this.props.listUsers) {

            let arrGenders = this.props.genderRedux;
            let arrPositions = this.props.positionRedux;
            let arrRoles = this.props.roleRedux;

            this.setState({
                email: '',
                password: '',
                address: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                image: '',
                action: crud_actions.CREATE,

            })
        }
    }

    handleOnChangeFile = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                image: base64
            })
        }
        console.log("Check file url: ", this.state.previewImgURL);
        console.log("Check file 64: ", this.state.image);
    }

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state };
        console.log('OnChangeInput CopyState: ', copyState[id]);
        copyState[id] = event.target.value;
        console.log('OnChangeInput: ', copyState[id]);
        this.setState({
            ...copyState
        })

    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;

        let { action } = this.state;

        if (action === crud_actions.CREATE) {

            // call redux create action
            this.props.createNewUser({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                password: this.state.password,
                email: this.state.email,
                address: this.state.address,

                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                phoneNumber: this.state.phoneNumber,
                image: this.state.image,
            })
        }


        if (action === crud_actions.EDIT) {

            // call redux create action
            this.props.editUser({
                id: this.state.userEditId,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                password: this.state.password,
                email: this.state.email,
                address: this.state.address,

                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                phoneNumber: this.state.phoneNumber,
                image: this.state.image,
            })
        }



    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                console.log('state: ,', this.state[arrInput[i]]);
                isValid = false;
                alert('Missing: ', arrInput[i]);
                break;
            }
        }

        return isValid;
    }

    handleEditUserFromParent = (user) => {

        let imageBase64 = '';
        if (user.image) {

            imageBase64 = new Buffer(user.image, 'base64').toString('binary');

        }
        console.log('sysout user from parent: ', user);
        this.setState({
            email: user.email,
            password: 'NO',
            address: user.address,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            imaga: '',
            previewImgURL: imageBase64,
            userEditId: user.id,
            action: crud_actions.EDIT
        })
    }
    render() {

        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;

        let language = this.props.language;
        // let isLoading = this.props.isLoadingGender
        console.log('Checking : ', this.state.previewImgURL);

        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role, image } = this.state;
        return (
            <div className="user-redux-container" >
                <div className="title">
                    <FormattedMessage id="manage-user.add-user" />
                </div>
                <div className="user-redux-body mt-4">
                    <div className="container">
                        <div className="row">
                            <form>
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputEmail4"> <FormattedMessage id="manage-user.email" /></label>
                                        <input type="email" className="form-control" id="inputEmail4" placeholder="Email"
                                            value={email}
                                            onChange={(event) => this.onChangeInput(event, 'email')}
                                            disabled={this.state.action === crud_actions.EDIT ? true : false}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputPassword4"> <FormattedMessage id="manage-user.password" /></label>
                                        <input type="password" className="form-control" id="inputPassword4" placeholder="Password"
                                            value={password}
                                            onChange={(event) => this.onChangeInput(event, 'password')}
                                            disabled={this.state.action === crud_actions.EDIT ? true : false}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputFirstName"> <FormattedMessage id="manage-user.first-name" /></label>
                                        <input type="text" className="form-control" id="inputFirstName" placeholder="First name"
                                            value={firstName}
                                            onChange={(event) => this.onChangeInput(event, 'firstName')}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputLastName"> <FormattedMessage id="manage-user.last-name" /></label>
                                        <input type="text" className="form-control" id="inputLastName" placeholder="Last name"
                                            value={lastName}
                                            onChange={(event) => this.onChangeInput(event, 'lastName')}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputPhoneNumber"> <FormattedMessage id="manage-user.phone-number" /></label>
                                        <input type="text" className="form-control" id="inputPhoneNumber"
                                            value={phoneNumber}
                                            onChange={(event) => this.onChangeInput(event, 'phoneNumber')}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputAddress"> <FormattedMessage id="manage-user.address" /></label>
                                        <input type="text" className="form-control" id="inputAddress" placeholder="Address"
                                            value={address}
                                            onChange={(event) => this.onChangeInput(event, 'address')}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="form-group col-md-3">
                                        <label htmlFor="inputGender"><FormattedMessage id="manage-user.gender" /></label>
                                        <select id="inputGender" className="form-control"
                                            onChange={(event) => this.onChangeInput(event, 'gender')}
                                            value={gender}
                                        >
                                            {genders && genders.length > 0 &&
                                                genders.map((gender, index) => {
                                                    return (
                                                        <option key={index} value={gender.keyMap}>{language === languages.VI ? gender.valueVi : gender.valueEn}</option>
                                                    )

                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label htmlFor="inputState"><FormattedMessage id="manage-user.position" /></label>
                                        <select id="inputState" className="form-control"

                                            onChange={(event) => this.onChangeInput(event, 'position')}
                                            value={position}
                                        >
                                            {positions && positions.length > 0 &&
                                                positions.map((position, index) => {
                                                    return (
                                                        <option key={index} value={position.keyMap}>{language === languages.VI ? position.valueVi : position.valueEn}</option>
                                                    )

                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label htmlFor="inputRole"><FormattedMessage id="manage-user.role" /></label>
                                        <select id="inputState" className="form-control"

                                            onChange={(event) => this.onChangeInput(event, 'role')}
                                            value={role}
                                        >
                                            {roles && roles.length > 0 &&
                                                roles.map((role, index) => {
                                                    return (
                                                        <option key={index} value={role.keyMap}>{language === languages.VI ? role.valueVi : role.valueEn}</option>
                                                    )

                                                })
                                            }
                                        </select>
                                    </div>

                                    <div className="form-group col-md-3">
                                        <label htmlFor=""> <FormattedMessage id="manage-user.image" /></label>
                                        <div className="preview-img-container">
                                            <input type="file" className="form-control" id="previewImg" hidden
                                                onChange={(event) => this.handleOnChangeFile(event)}
                                            />
                                            <label htmlFor="previewImg" className="label-upload"> <FormattedMessage id="manage-user.previewImg" /> <i className="fas fa-cloud-upload-alt" /></label>
                                            <div className="preview-image" style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                                onClick={() => this.openPreviewImage()}
                                            >

                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <button type="button" className={this.state.action === crud_actions.EDIT ? "btn btn-warning btn-lg mt-4" : "btn btn-primary btn-lg mt-4"} onClick={() => this.handleSaveUser()}>
                                    {this.state.action === crud_actions.EDIT ? <FormattedMessage id="manage-user.edit" /> : <FormattedMessage id="manage-user.save" />}

                                </button>
                            </form>


                        </div>
                    </div>
                </div>
                <TableManageUser handleEditKey={this.handleEditUserFromParent} action={this.state.action} />

                {
                    this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.testingReducer.genders,
        roleRedux: state.testingReducer.roles,
        positionRedux: state.testingReducer.positions,
        isLoadingGender: state.testingReducer.isLoadingGender,
        listUsers: state.testingReducer.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        //processLogout: () => dispatch(actions.processLogout()),
        //changeLanguageDispatch: (language) => dispatch(actions.changeLanguage(language))
        testingFetchGenderStart: () => dispatch(actions.testingFetchGenderStart()),
        fetchPositionStart: () => dispatch(actions.fetchPositionStart()),
        fetchRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        editUser: (data) => dispatch(actions.editUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
