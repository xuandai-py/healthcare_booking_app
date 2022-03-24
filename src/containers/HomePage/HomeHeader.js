import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/bookingcare.svg'
import { languages } from '../../utils/constant';
import { changeLanguage } from '../../store/actions';
import { withRouter } from 'react-router';
class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageDispatch (language)
    }
    
    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/homePage`)
        }
    }
    render() {
        console.log(this.props);
        let language = this.props.languages

        return (
            <div className='home-header-container'>
                <div className='home-header-content'>
                    <div className='left-content'>
                        <i className='fas fa-bars' />
                        <img className='header-logo' src={logo} onClick={() => this.returnToHome()}/>
                    </div>
                    <div className='center-content'>
                        <div className='child-content'>
                            <div><b><FormattedMessage id="home-header.speciality"/></b></div>
                            <div className='subs-title'><FormattedMessage id="home-header.search-doctor"/></div>
                        </div>
                        <div className='child-content'>
                            <div><b><FormattedMessage id="home-header.health-medical-center"/></b></div>
                            <div className='subs-title'><FormattedMessage id="home-header.choose-medical-center"/></div>
                        </div>
                        <div className='child-content'>
                            <div><b><FormattedMessage id="home-header.doctor"/></b></div>
                            <div className='subs-title'><FormattedMessage id="home-header.choose-doctor"/></div>
                        </div>
                        <div className='child-content'>
                            <div><b><FormattedMessage id="home-header.surgical-category"/></b></div>
                            <div className='subs-title'><FormattedMessage id="home-header.health-check"/></div>
                        </div>
                    </div>
                    <div className='right-content'>
                        <div className='support'>
                            <i className='fas fa-question-circle' style={{ color: "#45c3d2" }}></i>
                            <span className='support-span'><FormattedMessage id="home-header.support" /></span>
                        </div>
                        <div className='language' ><span className={language === languages.VI ? 'language-vi active' : 'language-vi'} onClick={() => this.changeLanguage(languages.VI)}>VN</span></div>
                        <div className='language'><span className={language === languages.EN ? 'language-en active' : 'language-en'}onClick={() => this.changeLanguage(languages.EN)}>EN</span></div>
                        
                    </div>
                </div>
           </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        languages: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageDispatch: (language) => dispatch(changeLanguage(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
