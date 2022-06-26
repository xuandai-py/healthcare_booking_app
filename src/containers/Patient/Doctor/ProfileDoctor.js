import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProfileDoctor.scss';
import { languages } from '../../../utils';
import { getProfileDoctorById } from '../../../services/userService';
import moment from 'moment';
import { FormattedMessage } from 'react-intl'
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import localization from 'moment/locale/vi'
import { Link } from 'react-router-dom'
class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}

        }
    }

    async componentDidMount() {
        let data = await this.getInforDoctorById(this.props.doctorId);
        this.setState({
            dataProfile: data
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {


        if (this.props.doctorId !== prevProps.doctorId) {
            //            this.getInforDoctorById(this.props.doctorId)
        }

    }

    getInforDoctorById = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) result = res.data
        }
        return result
    }

    loadingTimeBooking = (scheduleData) => {
        let { language } = this.props
        if (scheduleData && !_.isEmpty(scheduleData)) {

            let date = language === languages.VI ?
                moment.unix(+scheduleData.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+scheduleData.date / 1000).locale('en').format('ddd - MM/DD/YYYY')

            let time = language === languages.VI ? scheduleData.timeTypeData.valueVi : scheduleData.timeTypeData.valueEn
            return (
                <>
                    <div className="">{time} - {this.capitalFirstLetter(date)}</div>
                    <div className=""><FormattedMessage id="patient.booking-modal.priceBooking" /></div>
                </>
            )
        }
        return <></>
    }

    capitalFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    render() {

        let { dataProfile } = this.state;
        let { language, isShowDescriptionDoctor, scheduleData, isShowPrice, isShowLink, doctorId } = this.props;
        let nameVi = '', nameEn = ''
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName} `;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
        }

        return (
            <>
                <div className="profile-doctor-container">

                    <div className="common intro-doctor">
                        <div className="content-left bg-image"
                            style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}>
                        </div>
                        <div className="content-right">
                            <div className="name">
                                {language === languages.EN ? nameEn : nameVi}
                            </div>
                            <div className="description">
                                {isShowDescriptionDoctor == true ?
                                    <>
                                        {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description
                                            && <span>
                                                {dataProfile.Markdown.description}
                                            </span>}
                                    </>
                                    :
                                    <>
                                        {this.loadingTimeBooking(scheduleData)}
                                    </>
                                }
                            </div>
                        </div>
                    </div>

                    {isShowLink === true &&
                        <Link to={`/doctor-detail/${doctorId}`}>
                            <FormattedMessage id="doctor.manage-doctor.more"/>
                        </Link>
                    }
                    {isShowPrice &&
                        <div className="price">
                            <FormattedMessage id="patient.booking-modal.price" />:
                            {dataProfile && dataProfile.Doctor_Infor && language === languages.VI ?
                                <NumberFormat
                                    className="currency"
                                    value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix='VND'
                                />
                                :
                                <NumberFormat
                                    className="currency"
                                    value={dataProfile.Doctor_Infor?.priceTypeData.valueEn}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix='$'
                                />

                            }
                        </div>
                    }
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
