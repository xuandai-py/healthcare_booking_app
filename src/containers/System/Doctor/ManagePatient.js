import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { FormattedMessage } from 'react-intl'
import moment from 'moment';
import { getAllPatientForDoctor, postSendBill } from '../../../services/userService';
import { languages } from '../../../utils';
import BillModal from './Modal/BillModal';
import { toast } from 'react-toastify';
import PacmanLoader from 'react-spinners/PacmanLoader'
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
  /* z-index: 2000; */
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

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            dataModal: {},
            isOpenRemodyModal: false,
            isLoading: false
        }
    }

    async componentDidMount() {

        await this.getPatientData()
    }

    getPatientData = async () => {
        let { user } = this.props
        let { currentDate } = this.state
        let formatedDate = new Date(currentDate).getTime()

        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formatedDate
        })

        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data ? res.data : []
            })
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.language !== prevProps.language) {

        }

        if (this.state.isOpenRemodyModal !== prevState.isOpenRemodyModal) {

            await this.getPatientData()
        }
    }

    handleChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0] // pick
        }, () => {
            this.getPatientData()
        })
    }

    toggleModal = () => {
        this.setState({
            isOpenRemodyModal: !this.state.isOpenRemodyModal
        })
    }

    handleBtnConfirm = (patient) => {

        let data = {
            doctorId: patient.doctorId,
            patientId: patient.patientId,
            email: patient.patientData.email,
            timeType: patient.timeType,
            patientName: patient.patientData.firstName,
            time: this.props.language === languages.VI ? patient.timeTypePatientData.valueVi : patient.timeTypePatientData.valueEn,
            doctorName: this.props.user.firstName
        }

        this.setState({
            isOpenRemodyModal: true,
            dataModal: data
        })
    }

    sendBill = async (dataChild) => {
        this.setState({
            isLoading: true
        })
        let { dataModal } = this.state
        let res = await postSendBill({
            email: dataChild.email,
            imageBase64: dataChild.imageBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName,
            time: dataModal.time,
            doctoName: dataModal.doctorName,

        })

        if (res && res.errCode === 0) {
            toast.success('Send bill success')
            this.setState({
                isLoading: false
            })
            this.toggleModal()
        } else {
            console.error(res);
            this.setState({
                isLoading: false
            })
            toast.error('Send bill failed')
        }
    }


    render() {

        let { currentDate, dataPatient, dataModal, isOpenRemodyModal } = this.state;
        let { language } = this.props;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
        return (
            <>
                <div className="manage-schedule-container">
                    <div className="manage-schedule-title">
                        <FormattedMessage id="manage-schedule.title" />
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="form-group mb-3 col-4">
                                <label className="form-label">
                                    <FormattedMessage id="manage-schedule.choose-date" />
                                </label>
                                <DatePicker
                                    onChange={this.handleChangeDatePicker}
                                    className="form-control"
                                    value={this.state.currentDate}
                                    minDate={yesterday}
                                />
                                {/* <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" /> */}
                            </div>
                        </div>

                        <div className="users-table mt-3 mx-2">
                            <table id="TableManageUser">
                                <tbody>
                                    <tr>
                                        <th>STT</th>
                                        <th>Timetable</th>
                                        <th>Fullname</th>
                                        <th>Address</th>
                                        <th>Gender</th>
                                        <th>Actions</th>
                                    </tr>

                                    {dataPatient && dataPatient.length > 0 ?
                                        dataPatient.map((patient, index) => {
                                            let time = language === languages.VI ? patient.timeTypePatientData.valueVi : patient.timeTypePatientData.valueEn
                                            let gender = language === languages.VI ? patient.patientData.genderData.valueVi : patient.patientData.genderData.valueEn
                                            return (

                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{time}</td>
                                                    <td>{patient.patientData.firstName}</td>
                                                    <td>{patient.patientData.address}</td>
                                                    <td>{gender}</td>

                                                    <td>
                                                        <button className="btn btn-edit confirm" onClick={() => this.handleBtnConfirm(patient)}><i styles={'font-size: large'} class="fas fa-check-circle"></i><span className="tooltiptext">Confirm action</span></button>


                                                    </td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <>
                                            NO DATA
                                        </>
                                    }
                                </tbody>

                            </table>

                        </div>


                    </div>
                </div>

               
                    <BillModal
                        isOpen={isOpenRemodyModal}
                        toggle={this.toggleModal}
                        dataModal={dataModal}
                    sendBill={this.sendBill}
                    isLoading={this.state.isLoading}
                    />


                


            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
