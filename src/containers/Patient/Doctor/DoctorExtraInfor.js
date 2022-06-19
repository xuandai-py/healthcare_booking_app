import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfor.scss';
import { getExtraInforDoctorById } from '../../../services/userService';
import NumberFormat from 'react-number-format';

import { languages } from '../../../utils';
import Select from 'react-select'
import moment from 'moment'
import localization from 'moment/locale/vi'
import { FormattedMessage } from 'react-intl'

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetail: false,
            extraInfor: {}
        }
    }

    async componentDidMount() {
        if (this.props.doctorIdFromParent) {
            this.fetchExtraDoctorInfor(this.props.doctorIdFromParent)
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            this.fetchExtraDoctorInfor(this.props.doctorIdFromParent)
        }
    }

    showDetail = () => {
        this.setState({
            isShowDetail: !this.state.isShowDetail
        })
    }

    fetchExtraDoctorInfor = async (doctorIdFromParent) => {
        let res = await getExtraInforDoctorById(doctorIdFromParent)
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
    }

    render() {
        let { isShowDetail, extraInfor } = this.state
        let evValue = extraInfor.priceTypeData
        let { language } = this.props;
        console.log('000000000000000000000000000000', this.props.doctorIdFromParent);
        console.log('000000000000000000000000000000', this.state);
        return (
            <>
                <div className="doctor-extra-infor-container">
                    <div className="content-up">
                        <div className="text-address">
                            <FormattedMessage id="patient.extra-doctor-infor.text-address" />
                        </div>
                        <div className="name-clinic">{extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}</div>
                        <div className="detail-clinic">{extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}</div>
                    </div>
                    <div className="content-down">
                        {isShowDetail === false ?
                            <div className="short-price">
                                <FormattedMessage id="patient.extra-doctor-infor.price" />:
                                {extraInfor && extraInfor.priceTypeData && language === languages.VI ? (
                                    <NumberFormat
                                        className="currency"
                                        value={extraInfor.priceTypeData.valueVi}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'VND'}
                                    />
                                ) : (
                                    <NumberFormat
                                        className="currency"
                                        value={extraInfor.priceTypeData?.valueEn}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'$'}
                                    />
                                )}

                                <span onClick={this.showDetail}>
                                    <a><FormattedMessage id="patient.extra-doctor-infor.detail" /></a>
                                </span>
                            </div>
                            :
                            <div className="price-detail">
                                <div className="title-price">
                                    <FormattedMessage id="patient.extra-doctor-infor.price" />
                                </div>
                                <div className="detail-infor">
                                    <div className="price">
                                        <span className="left">
                                            <       FormattedMessage id="patient.extra-doctor-infor.price" />
                                        </span>
                                        <span className="right">
                                            {extraInfor && extraInfor.priceTypeData && language === languages.VI ? (
                                                <NumberFormat
                                                    className="currency"
                                                    value={extraInfor.priceTypeData.valueVi}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'VND'}
                                                />
                                            ) : (
                                                <NumberFormat
                                                    className="currency"
                                                    value={extraInfor.priceTypeData?.valueEn}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    prefix={'$'}
                                                />
                                            )}
                                        </span>
                                    </div>
                                    <div className="note">
                                        {extraInfor && extraInfor.note ? extraInfor.note : ''}
                                    </div>
                                </div>
                                <div className="payment">
                                    <FormattedMessage id="patient.extra-doctor-infor.payment" />
                                    {extraInfor && extraInfor.paymentTypeData && language === languages.VI ? extraInfor.paymentTypeData.valueVi : extraInfor.paymentTypeData.valueEn}
                                </div>

                                <div className="hide-price">
                                    <span onClick={this.showDetail}>
                                        <FormattedMessage id="patient.extra-doctor-infor.hide-price"  />
                                    </span>
                                </div>
                            </div>
                        }

                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
