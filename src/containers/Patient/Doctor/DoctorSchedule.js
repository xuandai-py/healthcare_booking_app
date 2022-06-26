import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DoctorSchedule.scss';
import { getScheduleDoctorByDate } from '../../../services/userService';
import { languages } from '../../../utils';
import Select from 'react-select'
import moment from 'moment'
import localization from 'moment/locale/vi'
import { FormattedMessage } from 'react-intl'
import BookingModal from './Modal/BookingModal';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            selectedOption: null,
            allAvailableTime: [],
            isOpenModal: false,
            scheduleData: {}
        }
    }

    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrDays(language)

        if(this.props.doctorIdFromParent){
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value)
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }
        this.setState({
            allDays: allDays,
        })


    }

    capitalFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    getArrDays = (language) => {
        let arrDate = [];
        for (let i = 0; i < 7; i++) {
            let object = {}

            if (language === languages.EN) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`
                    object.label = today
                } else {

                    object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM');
                }
            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`
                    object.label = today
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = this.capitalFirstLetter(labelVi)
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            arrDate.push(object);

        }
        return arrDate;

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.getArrDays(this.props.language)
            this.setState({
                allDays: allDays
            })
        }

        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let allDays = this.getArrDays(this.props.language)
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value)
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }
    }

    handleOnChangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent
            let scheduleDate = event.value
            let res = await getScheduleDoctorByDate(doctorId, scheduleDate);

            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data
                })
            }
        }
    }

    handleCLickSCheduleTime = (item) => {
        this.setState({
            isOpenModal: !this.state.isOpenModal,
            scheduleData: item
        })
    }

    toggleModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }

    render() {

        let { allDays, selectedOption, allAvailableTime, isOpenModal, scheduleData } = this.state;
        let { language, doctorIdFromParent } = this.props;
        let options = []

        if (allDays && allDays.length > 0) {
            allDays.map((item, index) => {
                options.push(item)
            })
        }

        return (
            <>
                <div className="doctor-schedule-container">
                    <div className="all-schedule">
                        <Select onChange={event => this.handleOnChangeSelect(event)}
                            options={options}
                            defaultInputValue={options[0]}
                            defaultValue={options[0]}
                            styles={{
                                control: () => ({

                                    display: 'flex !important',
                                    backgroundColor: '#EBECF0',
                                    width: 300,
                                    borderRadius: '2em',
                                    color: '#172B4D',
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    lineHeight: '1',
                                    minWidth: 1,
                                    padding: '0.16666666666667em 0.5em',
                                    textAlign: 'center',
                                })
                            }}
                            placeholder="Appointment..."
                        />
                    </div>

                    <div className="all-available-time">
                        <div className="text-calendar">
                            <i className="fas fa-calendar-plus"><span>
                                <FormattedMessage id="patient.detail-doctor.schedule" />
                            </span></i>
                        </div>
                        <div className="time-content">
                            {allAvailableTime && allAvailableTime.length > 0 ?
                                <>
                                    <div className="select-appointment">
                                        {allAvailableTime.map((item, index) => {
                                            let timeDisplay = language === languages.EN ? item.timeTypeData.valueEn : item.timeTypeData.valueVi;
                                            return (
                                                <button key={index}
                                                    className={language === languages.VI ? 'btn-vie' : 'btn-en'}
                                                    onClick={() => this.handleCLickSCheduleTime(item)}
                                                >
                                                    {timeDisplay}</button>
                                            )
                                        })}
                                    </div>
                                    <div className="book-free"><span className=""><FormattedMessage id="patient.detail-doctor.select" /> <i className="far fa-hand-point-up" /><FormattedMessage id="patient.detail-doctor.book-free" /></span></div>
                                </>
                                : <div className="no-appointment">
                                    <FormattedMessage id="patient.detail-doctor.no-appointment" /></div>
                            }

                        </div>
                    </div>
                </div>

                <BookingModal isOpen={isOpenModal} toggle={this.toggleModal} scheduleData={scheduleData} doctorId={doctorIdFromParent} />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
