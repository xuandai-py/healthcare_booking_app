import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLogin } from '../../services/userService'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errorMessage: ''
        }
    }



    onChangeInputUsername = (event) => {
        this.setState({
            username: event.target.value,
        })
    }

    onChangeInputPassword = (event) => {
        this.setState({

            password: event.target.value
        })

    }

    handleLogin = async () => {
        this.setState({
            errorMessage: ''
        })

        try {
            let data = await handleLogin(this.state.username, this.state.password)
            if (data && data.errCode !== 0) {
                this.setState({
                    errorMessage: data.errMessage
                })
            } else {
                this.props.userLoginSuccess(data.user)
                console.log("Login successful");
            }

        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errorMessage: error.response.data.errMessage
                    })
                }
            }

        }
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            this.handleLogin();
        }
    }

    render() {
        return (
            <div className="login-background">
                <div className="login-container md-4 lg-1 sm-3">

                    <div className="login-content row">
                        <div className="col-12 text-login">Login</div>
                        <div className="col-12 form-group login-input">
                            <label>UserName:</label>
                            <input className="form-control" type="text" required placeholder="Enter your username" value={this.state.username} onChange={e => this.onChangeInputUsername(e)} />
                        </div>
                        <div className="col-12 form-group login-input" >
                            <label>Password:</label>
                            <div className="custom-input-password">
                                <input className="form-control" required
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    placeholder="Enter your password" value={this.state.password}
                                    onChange={e => this.onChangeInputPassword(e)}
                                    onKeyDown={(event) => this.handleKeyDown(event)}
                                />
                                <span onClick={() => this.handleShowHidePassword()}>
                                    <i className={this.state.isShowPassword ? "far fa-eye" : "far fa-eye-slash"}></i>

                                </span>
                            </div>

                        </div>
                        <div className="col-12" style={{ color: 'red' }}>
                            {this.state.errorMessage}
                        </div>
                        <div className="col-12 ">
                            <button className="btn-login" type="submit" onClick={() => this.handleLogin()}>Login</button>
                        </div>
                        <div className="col-12">
                            <span className="forgot-password">Forgot your password</span>
                        </div>
                        <div className="col-12 text-center mt-2">
                            <span className="text-other-login">Or using:</span>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fab fa-facebook facebook"></i>
                            <i className="fab fa-google google"></i>

                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        //adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        //adminLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
