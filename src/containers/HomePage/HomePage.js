import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import HomeBanner from './HomeBanner';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './HomePage.scss';
import OutstandingDotor from './Section/OutstandingDoctor';
import HandBook from './Section/HandBook';
import About from './Section/About';
import Footer from '../Footer/Footer';

class HomePage extends Component {

    render() {
        
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
        }
        let settingHandbook = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1
        }

        return (
            <div styles='display: flex; flex-direction: column'>
                <HomeHeader />
                <HomeBanner />
                <Specialty setting={settings}/>
                <MedicalFacility setting={settings} />
                <OutstandingDotor setting={settings} />
                <HandBook setting={settingHandbook} />
                <About />
                <Footer styles='flex-grow: 1;'/>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
 