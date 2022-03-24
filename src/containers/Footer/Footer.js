import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Footer.scss';
import fb from '../../assets/icons/facebook-square.svg';
import yt from '../../assets/icons/youtube-square.svg';


class Footer extends Component {

    render() {
        let currentYear = new Date().getFullYear();
        let workingYear = currentYear + 2;

        return (
            <div className='footer-container'>
                <p>&copy; {currentYear}-{workingYear} Booking care - All rights reserved.</p>
                <div className='social-networks'>
                    <a target='_blank' href="">
                        <img className='icon' src={fb} alt='facebook-icon'/>
                    </a>
                    <a target='_blank' href="">
                        <img className='icon' src={yt} alt='youtube-icon'/>
                    </a>
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
