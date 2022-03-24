import React, { Component } from 'react';
import { connect } from 'react-redux';
import './About.scss';

class About extends Component {

    render() {

        return (
            <div className='section section-about'>
                <div className='section-about-header'>
                    Truyền thông nói về Booking care
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height="400px" src="https://www.youtube.com/embed/FyDQljKtWnI" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                    <div className='content-right'>
                        
                        <p>Exercitation pariatur proident reprehenderit quis officia. Voluptate quis irure irure laborum do in. Et aute culpa quis ea officia dolore cillum enim anim adipisicing. Nisi ullamco cillum elit ad Lorem eiusmod dolore id do irure magna commodo. Quis commodo cillum deserunt ut. Aute incididunt qui cillum laboris ad do.

Anim nulla sint non cillum dolore pariatur adipisicing irure aliquip incididunt. Magna deserunt dolor irure do consectetur consectetur nulla veniam eu cupidatat. Et quis do dolor elit ex aute culpa adipisicing. Cupidatat consequat qui esse est ipsum.

Dolor commodo non in nostrud dolor fugiat labore dolor mollit adipisicing commodo ullamco. Laboris pariatur quis esse cupidatat labore sunt elit labore do mollit. Incididunt adipisicing velit magna tempor culpa. Lorem magna ad occaecat consectetur sit nostrud eu. Pariatur ad nisi laborum magna excepteur minim in est labore. Id proident ut esse commodo nulla aliqua sint. Deserunt est cillum cupidatat magna nulla ex tempor pariatur fugiat.</p>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
