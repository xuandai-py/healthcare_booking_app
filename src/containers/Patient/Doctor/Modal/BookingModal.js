import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss';
import '../../../System/UserManage.scss'
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import ProfileDoctor from '../ProfileDoctor';
import { FormattedMessage } from 'react-intl'
import _ from 'lodash'
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from "../../../../store/actions";
import { languages } from '../../../../utils';
import Select from 'react-select'
import { postPatientAppointment } from '../../../../services/userService'
import { toast } from 'react-toastify'
import moment from 'moment';

import PacmanLoader from 'react-spinners/PacmanLoader'
import { css } from "@emotion/react";
import Loading from '../../../../utils/Loading';

const override = css`
  display: block;
  margin: 0 auto;
  z-index: 2000;
  /* border: 1px red solid;
  width: 100vw;
  height: 100vh;
  position: absolute; */

 /* .loader-wrapper{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1999;
    display: none;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    outline: 0;
    background-color: #fff;
 } */

 /* .modal{
     z-index: 1000 !important;
 } */
`;
class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            doctorId: '',
            selectedGender: '',
            genders: [],
            timeType: '',
            isLoading: false,
            isLoadingSpinner: false
        }
    }

    async componentDidMount() {
        this.props.getGenders();
    }

    dataGenderBuilder = (data) => {
        let result = [];
        let { language } = this.props;

        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = language === languages.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap
                result.push(object)
            })
        }

        return result;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.dataGenderBuilder(this.props.genders)
            })
        }

        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.dataGenderBuilder(this.props.genders)
            })
        }

        if (this.props.scheduleData !== prevProps.scheduleData) {
            if (this.props.scheduleData && !_.isEmpty(this.props.scheduleData)) {
                let { doctorId, timeType } = this.props.scheduleData;
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }
    }

    handleOnChangeInput = (event, type) => {
        let value = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[type] = value
        this.setState({
            ...stateCopy
        })
    }

    handleChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleChangeSelect = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption
        })
    }

    confirm = async () => {
        this.setState({ isLoading: true })
        //let date = new Date(this.state.birthday).getTime();
        let date = this.props.scheduleData.date
        let timeString = this.timeBookingBuilder(this.props.scheduleData);
        let doctorName = this.getDoctorName(this.props.scheduleData)
        let res = await postPatientAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName,
        })

        if (res && res.errCode === 0) {
            toast.success('Booking an appointment had been approved')
            this.setState({
                isLoading: false
            })
            this.props.toggle()
        } else {
            this.setState({
                isLoading: false
            })
            toast.error('Error!!!')
        }

        this.resetForm();
    }

    resetForm = () => {
        this.setState = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            doctorId: '',
            selectedGender: '',
            genders: [],
            timeType: '',
            isLoading: false
        }
    }

    timeBookingBuilder = (scheduleData) => {
        let { language } = this.props
        if (scheduleData && !_.isEmpty(scheduleData)) {

            let date = language === languages.VI ?
                moment.unix(+scheduleData.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+scheduleData.date / 1000).locale('en').format('ddd - MM/DD/YYYY')

            let time = language === languages.VI ? scheduleData.timeTypeData.valueVi : scheduleData.timeTypeData.valueEn
            return `${time}  - ${date}`
        }
        return ''
    }

    getDoctorName = (scheduleData) => {
        let { language } = this.props
        if (scheduleData && !_.isEmpty(scheduleData)) {

            let name = language === languages.VI ?
                `${scheduleData.doctorData.lastName} ${scheduleData.doctorData.firstName}`
                :
                `${scheduleData.doctorData.firstName} ${scheduleData.doctorData.lastName}`
            return name;
        }
        return ''
    }
    render() {
        let { isLoading } = this.state
        let { isOpen, toggle, scheduleData, doctorId } = this.props;
        let id = scheduleData && !_.isEmpty(scheduleData) ? scheduleData.doctorId : '';


        return (
            <>
                <Modal
                    size="lg" centered
                    isOpen={isOpen} toggle={toggle} className="modal-user-container">
                    <ModalHeader toggle={toggle}>
                        <FormattedMessage id="patient.booking-modal.title" />
                    </ModalHeader>
                    <ModalBody>
                        <div className="modal-user-body">
                            {/* {JSON.stringify(scheduleData)} */}
                            <div className="col-12 doctor-infor">
                                <ProfileDoctor
                                    doctorId={doctorId}
                                    isShowDescriptionDoctor={false}
                                    scheduleData={scheduleData}
                                    isShowPrice={true}
                                />
                            </div>
                            {/* <div className="col-12 price">Gia kham</div> */}
                            <div className="input-container">
                                <label><FormattedMessage id="patient.booking-modal.email" />:</label>
                                <input placeholder="Type in" type="text"
                                    onChange={(event) => this.handleOnChangeInput(event, "email")}
                                    value={this.state.email}
                                />
                            </div>
                            <div className="input-container">
                                <label><FormattedMessage id="patient.booking-modal.phoneNumber" /></label>
                                <input placeholder="Type in" type="text"
                                    onChange={(event) => this.handleOnChangeInput(event, "phoneNumber")}
                                    value={this.state.phoneNumber}
                                />
                            </div>

                            <div className="input-container">
                                <label><FormattedMessage id="patient.booking-modal.fullName" />:</label>
                                <input placeholder="Type in" type="text"
                                    onChange={(event) => this.handleOnChangeInput(event, "fullName")}
                                    value={this.state.fullName}
                                />
                            </div>
                            <div className="input-container">
                                <label><FormattedMessage id="patient.booking-modal.reason" /></label>
                                <input placeholder="Type in" type="text"
                                    onChange={(event) => this.handleOnChangeInput(event, "reason")}
                                    value={this.state.reason}
                                />
                            </div>
                            <div className="input-container max-width-input">
                                <label><FormattedMessage id="patient.booking-modal.address" /></label>
                                <input placeholder="Type in" type="text"
                                    onChange={(event) => this.handleOnChangeInput(event, "address")}
                                    value={this.state.address}
                                />
                            </div>
                            <div className="input-container max-width-input">
                                <label><FormattedMessage id="patient.booking-modal.birthday" /></label>
                                <DatePicker
                                    onChange={this.handleChangeDatePicker}
                                    className="form-control"
                                    value={this.state.birthday}
                                />
                            </div>
                            <div className="input-container max-width-input">
                                <label><FormattedMessage id="patient.booking-modal.gender" /></label>
                                <Select
                                    value={this.state.selectedGender}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.genders}
                                />
                            </div>
                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.confirm()}>
                            <FormattedMessage id="patient.booking-modal.btnConfirm" />
                        </Button>
                        <Button color="danger" onClick={toggle}>
                            <FormattedMessage id="patient.booking-modal.btnCancel" />
                        </Button>
                    </ModalFooter>
                </Modal>
                {isLoading && <Loading />}


            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        genders: state.testingReducer.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.testingFetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
