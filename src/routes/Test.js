import React, { Component } from 'react';
import { connect } from 'react-redux';

class Test extends Component {

    render() {


        return (
            <>
                This is test page
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Test);
