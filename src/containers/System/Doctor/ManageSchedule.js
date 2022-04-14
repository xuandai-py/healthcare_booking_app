import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl'
import Select from 'react-select';
import * as actions from "../../../store/actions";
import { languages } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import FormattedDate from '../../../components/Formating/FormattedDate';

class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listDoctor: [],
            selectedDoctor: {},
            currentDate: ''
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctor();
        console.log('fetchAllDoctor: ', this.props.fetchAllDoctor());
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.extractDataInputSelect(this.props.allDoctors)
            console.log(dataSelect);
            console.log('fetchAllDoctorFromprops: ',this.props.allDoctors);
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
            currentDate: date[0]
        })
    }


    render() {
        console.log('check state: ', this.state);
        return (

            <div className="manage-schedule-container">
                <div className="manage-schedule-title">
                    <FormattedMessage id="manage-schedule.title" />
                </div>

                <div className="container">
                    <div className="row">
                        <div class="form-group mb-3 col-6">
                            <label for="basic-url" class="form-label">Your vanity URL</label>

                            <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" />
                        </div>
                        <div class="form-group mb-3 col-6">
                            <label for="basic-url" class="form-label">Chon ngày</label>
                            <DatePicker
                                onChange={this.handleChangeDatePicker}
                                className="form-control"
                                value={this.state.currentDate}
                                minDate={new Date()}
                                    />
                            {/* <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" /> */}
                        </div>
                        <div className="pick-hour-container">
                            <div className="content-left flex-nowrap">
                                <label>Select doctor</label>
                                <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.listDoctor}
                                />
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-primary btn-lg mt-4 ">
                        Lưu
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
