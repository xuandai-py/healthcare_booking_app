import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import './OutstandingDoctor.scss';
import * as actions from '../../../store/actions';
import { languages } from '../../../utils/constant';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

class OutstandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: []
        }
    }



    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctors !== this.props.topDoctors) {
            this.setState({
                arrDoctors: this.props.topDoctors
            })
        }
    }

    componentDidMount() {
        this.props.loadTopDoctors();
    }

    handleViewDoctorDetail = (doctor) => {
        console.log("DoctorDetail: ", doctor);
        this.props.history.push(`/doctor-detail/${doctor.id}`);
    }
    render() {

        console.log('top props language: ', this.props.languages);
        let arrDoctors = this.props.topDoctors;
        arrDoctors = arrDoctors.concat(arrDoctors)
        console.log('props: ', this.props);
        return (
            <div className='section section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>
                            <FormattedMessage id="homepage.out-standing-doctor" />
                        </span>
                        <button className='btn-section'><FormattedMessage id="homepage.more-info" /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.setting}>
                            {arrDoctors && arrDoctors.length > 0 &&
                                arrDoctors.map((doctor, index) => {
                                    let imgBase64 = '';
                                    if (doctor.image) {
                                        imgBase64 = new Buffer(doctor.image, 'base64').toString('binary');
                                    }
                                    let nameVi = `${doctor.positionData.valueVi}, ${doctor.lastName} ${doctor.firstName} `;
                                    let nameEn = `${doctor.positionData.valueEn}, ${doctor.firstName} ${doctor.lastName}`;

                                    return (
                                        <div className='section-customize' key={index} onClick={() => this.handleViewDoctorDetail(doctor)}>
                                            <div className='section-customize-border'>
                                                <div className='outer-bg'>
                                                    <div className='bg-image section-outstanding-doctor'
                                                        style={{ backgroundImage: `url(${imgBase64})` }}
                                                    ></div>
                                                </div>
                                                <div className='position text-center'>
                                                    <div>{this.props.languages === languages.EN ? nameEn : nameVi}</div>
                                                    <div>Cơ xương khớp</div>
                                                </div>
                                            </div>
                                        </div>

                                    )
                                })
                            }


                        </Slider>
                    </div>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        languages: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctors: state.testingReducer.topDoctors,
        testCase: state.testingReducer.test,
        testUsers: state.app.testUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor));
