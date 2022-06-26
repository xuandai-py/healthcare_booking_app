import React, { Component } from 'react';
import { connect } from 'react-redux';
import { languages,user_roles } from '../../utils/constant';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }
    }

    componentDidMount() {
        let { userInfo } = this.props;
        
        let menu = [];
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId;
            if (role === user_roles.ADMIN) {
                menu = adminMenu;
            }

            if (role === user_roles.DOCTOR) {
                menu = doctorMenu;
            }
        }

        this.setState({
            menuApp: menu
        })
    }
    handleChangeLanguage = (language) => {
        this.props.changeLanguageDispatch (language)
    }
    render() {
        const language = this.props.languages
        const { processLogout, userInfo } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>
 
                <div className="languages">
                    <span className="welcome"><FormattedMessage id="home-header.welcome" />, {userInfo && userInfo.firstName ? userInfo.firstName : ''}</span>
                    <span className={language === languages.VI ? "language-vi active" : "language-vi"} onClick={() => this.handleChangeLanguage(languages.VI)}>VI</span>
                    <span className={language === languages.EN ? "language-en active" : "language-en"} onClick={() => this.handleChangeLanguage(languages.EN)}>EN</span>
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title="Log out">
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        languages: state.app.language

    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageDispatch: (language) => dispatch(actions.changeLanguage(language))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
