import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl'
import Select from 'react-select';
import * as actions from "../../../store/actions";
import { dateFormat, languages } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import FormattedDate from '../../../components/Formating/FormattedDate';
import { toast } from 'react-toastify'
import _ from 'lodash'
import { saveBulkCreateScheduleDoctor } from '../../../services/userService';

class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listDoctor: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: []
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.fetchAllScheduleTime();
        console.log('fetchAllDoctor: ', this.props.fetchAllDoctor());
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.extractDataInputSelect(this.props.allDoctors)
            console.log(dataSelect);
            console.log('fetchAllDoctorFromprops: ', this.props.allDoctors);
            this.setState({
                listDoctor: dataSelect
            })
        }

        // if (prevProps.language !== this.props.language) {
        //     let dataSelect = this.extractDataInputSelect(this.props.allDoctors)
        //     this.setState({
        //         listDoctor: dataSelect
        //     })
        // }

        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {

            let data = this.props.allScheduleTime
            if (data && data.length > 0) {
                data = data.map((item) => ({ ...item, isSelected: false }))
            }

            this.setState({
                rangeTime: data
            })
        }
    }

    extractDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language === languages.EN ? labelEn : labelVi;
                object.value = item.id;

                result.push(object);
            })

        } else {
            console.error('Input data null');
        }
        return result;
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({
            selectedDoctor: selectedOption
        })

    }

    handleChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0] // pick
        })
    }

    handleClickBtnTime = (time) => {
        console.log('check time click', time);
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map((item) => {
                if (time.id === item.id) item.isSelected = !item.isSelected;
                return item;
            })

            this.setState({
                rangeTime: rangeTime
            })

        }
    }

    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state;
        let result = [];

        console.log(rangeTime);
        if (!currentDate) {
            toast.error('Invalid Date selected');
            return;
        }

        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error('Invalid Date selected');
            return;
        }

        //let formatDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
        let formatedDate = new Date(currentDate).getTime();

        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(item => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formatedDate;
                    object.timeType = item.keyMap;
                    result.push(object);
                })
            } else {
                toast.error('Invalid Date selected');
                return;
            }
        }

        let res = await saveBulkCreateScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value, 
            formatedDate: formatedDate
            // contain value for query
        });

        if (res && res.errCode === 0) {
            toast.success('Saved')
        } else {
            toast.error("Error saveBulkCreateScheduleDoctor")
            console.error("Error saveBulkCreateScheduleDoctor", res)
        }
    }

    render() {
        console.log('check state: ', this.props);

        let { rangeTime } = this.state;
        let { language } = this.props;
        let yesterday = new Date(new Date().setDate(new Date().getDate()-1))
        return (

            <div className="manage-schedule-container">
                <div className="manage-schedule-title">
                    <FormattedMessage id="manage-schedule.title" />
                </div>

                <div className="container">
                    <div className="row">

                        <div className="form-group mb-3 col-6">
                            <label><FormattedMessage id="manage-schedule.choose-doctor" /></label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctor}
                            />
                        </div>
                        <div class="form-group mb-3 col-6">
                            <label for="basic-url" class="form-label"><FormattedMessage id="manage-schedule.choose-date" /></label>
                            <DatePicker
                                onChange={this.handleChangeDatePicker}
                                className="form-control"
                                value={this.state.currentDate}
                                minDate={yesterday}
                            />
                            {/* <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" /> */}
                        </div>
                        <div className=" col-12 pick-hour-container">
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button className={item.isSelected === true ? "btn btn-schedule active" : "btn btn-schedule"} key={index} onClick={() => this.handleClickBtnTime(item)}>
                                            {language === languages.EN ? item.valueEn : item.valueVi}
                                        </button>
                                    )
                                })
                            }
                        </div>

                    </div>
                    <button className="btn btn-primary btn-lg mt-4 btn-save-schedule "
                        onClick={() => { this.handleSaveSchedule() }}
                    >
                        <FormattedMessage id="manage-schedule.save" />
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.testingReducer.allDoctors,
        language: state.app.language,
        allScheduleTime: state.testingReducer.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
