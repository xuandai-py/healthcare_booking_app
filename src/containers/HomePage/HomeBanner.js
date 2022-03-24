import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeBanner.scss'
import { FormattedMessage } from 'react-intl';

class HomeBanner extends Component {

    render() {

        
        return (
            <div className='home-header-banner'>
                <div className='content-up'>
                    <div className='title1'>< FormattedMessage id="banner.title1" /></div>
                    <div className='title2'>< FormattedMessage id="banner.title2" /></div>
                    <div className='search'>
                        <i className='fas fa-search'></i>
                        <input type='text' placeholder='Tìm chuyên khoa khám bệnh' />
                    </div>
                </div>
                <div className='content-down'>
                    <ul className='options'>

                        <li className='option-child'>
                            <div className='icon-child'>
                                <i className='fas fa-hospital' />
                            </div>
                            <div className='text-child'>< FormattedMessage id="banner.speciality" /></div>
                        </li>
                        <li className='option-child'>
                            <div className='icon-child'>
                                <i className='fas fa-mobile-alt' />
                            </div>
                            <div className='text-child'>< FormattedMessage id="banner.remote" /></div>
                        </li>
                        <li className='option-child'>
                            <div className='icon-child'>
                                <i className='fas fa-procedures' />
                            </div>
                            <div className='text-child'>< FormattedMessage id="banner.health-check" /></div>
                        </li>
                        <li className='option-child'>
                            <div className='icon-child'>
                                <i className='fas fa-flask' />
                            </div>
                            <div className='text-child'>< FormattedMessage id="banner.test" /></div>
                        </li>
                        <li className='option-child'>
                            <div className='icon-child'>
                                <i className='fas fa-user-md' />
                            </div>
                            <div className='text-child'>< FormattedMessage id="banner.psychiatric" /></div>
                        </li>
                        <li className='option-child'>
                            <div className='icon-child'>
                                <i className='fas fa-tooth' />
                            </div>
                            <div className='text-child'>< FormattedMessage id="banner.dental" /></div>
                        </li>

                    </ul>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeBanner);
