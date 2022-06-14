import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import { crud_actions } from "../../../utils/constant";
import './ManageDoctor.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { languages } from '../../../utils';
import { getDoctorDetailInfo } from '../../../services/userService';
import { FormattedMessage } from 'react-intl'

import Select from 'react-select';

const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            listDoctor: [],
            hasData: false,

            listPrice: [],
            listProvince: [],
            listPaymentMethod: [],

            selectedPrice: '',
            selectedProvince: '',
            selectedPaymentMethod: '',

            nameClinic: '',
            addressClinic: '',
            note: ''
        }
    }

    async componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.getRequiredDoctorInfor();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.extractDataInputSelect(this.props.allDoctors, 'USERS')
            this.setState({
                listDoctor: dataSelect
            })
        }


        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {

            let { resProvince, resPrice, resPayment } = this.props.allRequiredDoctorInfor;

            let dataSelectPrice = this.extractDataInputSelect(resPrice, 'PRICE');
            let dataSelectProvince = this.extractDataInputSelect(resProvince, 'PROVINCE');
            let dataSelectPayment = this.extractDataInputSelect(resPayment, 'PAYMENT');

            console.log('dataSelect: ', dataSelectPayment, dataSelectPrice, dataSelectPayment);

            this.setState({
                listPrice: dataSelectPrice,
                listProvince: dataSelectProvince,
                listPaymentMethod: dataSelectPayment,
            })
            console.log('did Update: ', this.props.allRequiredDoctorInfor);
        }
        if (prevProps.language !== this.props.language) {
            let { resProvince, resPrice, resPayment } = this.props.allRequiredDoctorInfor;
            let dataSelect = this.extractDataInputSelect(this.props.allDoctors, 'USERS');
            let dataSelectPrice = this.extractDataInputSelect(resPrice, 'PRICE');
            let dataSelectProvince = this.extractDataInputSelect(resProvince, 'PROVINCE');
            let dataSelectPayment = this.extractDataInputSelect(resPayment, 'PAYMENT');

            this.setState({
                listDoctor: dataSelect,
                listPrice: dataSelectPrice,
                listProvince: dataSelectProvince,
                listPaymentMethod: dataSelectPayment,
            })
        }
    }

    extractDataInputSelect = (inputData, type) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`
                    let labelEn = `${item.firstName} ${item.lastName}`
                    object.label = language === languages.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                })
            }

            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`
                    let labelEn = `${item.valueEn} USD`
                    object.label = language === languages.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }

            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`
                    let labelEn = `${item.valueEn}`
                    object.label = language === languages.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push(object);
                })
            }

        }

        return result;
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,

        })
    }

    handleSaveContentMarkdown = () => {
        let { hasData } = this.state;
        this.props.saveDoctorDetail({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasData === true ? crud_actions.EDIT : crud_actions.CREATE,

            selectedProvince: this.state.selectedProvince.value,
            selectedPrice: this.state.selectedPrice.value,
            selectedPaymentMethod: this.state.selectedPaymentMethod.value,

            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,

        });
        console.log("state: ", this.state);
    }

    handleChange = async (selectedDoctor) => {
        this.setState({ selectedDoctor })
        let { listPrice, listProvince, listPaymentMethod } = this.state;

        let res = await getDoctorDetailInfo(selectedDoctor.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            let doctorInfor = res.data.Doctor_Infor;

            console.log('--------------------------------');
            console.log(doctorInfor);
            console.log('--------------------------------');

            let addressClinic = '', nameClinic = '', note = '', paymentId = '', priceId = '', provinceId = '', selectedPrice = '',
                selectedProvince = '',
                selectedPaymentMethod = ''

            if (doctorInfor) {
                addressClinic = doctorInfor.addressClinic;
                nameClinic = doctorInfor.nameClinic;
                note = doctorInfor.note;

                priceId = doctorInfor.priceId;
                provinceId = doctorInfor.provinceId;
                paymentId = doctorInfor.paymentId;


                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })
                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })
                selectedPaymentMethod = listPaymentMethod.find(item => {
                    return item && item.value === paymentId
                })
            }

            this.setState({
                contentMarkdown: markdown.contentMarkdown,
                contentHTML: markdown.contentHTML,
                description: markdown.description,
                hasData: true,

                nameClinic: nameClinic,
                addressClinic: addressClinic,
                note: note,

                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
                selectedPaymentMethod: selectedPaymentMethod,



            })
        } else {
            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                description: '',
                hasData: false,
                nameClinic: '',
                addressClinic: '',
                note: ''
            })
        }
    }

    handleChangeSelectDoctorInfor = (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption
        this.setState({
            ...stateCopy
        })
        //console.log('check handle change select doctor infor: ', selectedDoctor, name);
    }
    handleOnChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;

        this.setState({
            ...stateCopy
        })
    }
    render() {
        let { hasData } = this.state;
        console.log("getAllDoctorFromRedux: ", this.state);
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title mt-1 mb-1">
                    <FormattedMessage id="doctor.manage-doctor.append-doctor-info" />
                </div>
                <div className="more-info">
                    <div className="content-left  flex-nowrap">
                        <label><FormattedMessage id="doctor.manage-doctor.select-doctor" /></label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChange}
                            options={this.state.listDoctor}
                            placeholder={<FormattedMessage id="doctor.manage-doctor.select-doctor" />}
                        />
                    </div>
                    <div className="content-right">
                        <label><FormattedMessage id="doctor.manage-doctor.info" /></label>
                        <div className="form-floating">
                            <textarea className="form-control" rows="4" placeholder="Leave a comment here" id="floatingTextarea"
                                onChange={(event) => this.handleOnChangeText(event, 'description')}
                                value={this.state.description}
                            ></textarea>
                            <label htmlFor="floatingTextarea"><FormattedMessage id="doctor.manage-doctor.comment" /></label>
                        </div>
                    </div>
                </div>
                <div className="more-info-extra row">
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="doctor.manage-doctor.appointment-charge" /></label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPrice}
                            placeholder={<FormattedMessage id="doctor.manage-doctor.appointment-charge" />}
                            name="selectedPrice"
                        /></div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="doctor.manage-doctor.payment-method" /></label>
                        <Select
                            value={this.state.selectedPaymentMethod}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPaymentMethod}
                            placeholder={<FormattedMessage id="doctor.manage-doctor.payment-method" />}
                            name="selectedPaymentMethod"
                        /></div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="doctor.manage-doctor.province-state" /></label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listProvince}
                            placeholder={<FormattedMessage id="doctor.manage-doctor.province-state" />}
                            name="selectedProvince"
                        />
                    </div>

                    <div className="col-4 form-group">
                        <label><FormattedMessage id="doctor.manage-doctor.clinic-name" /></label>
                        <input type="text" className="form-control"
                            onChange={event => this.handleOnChangeText(event, 'nameClinic')} value={this.state.nameClinic} />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="doctor.manage-doctor.clinic-location" /></label>
                        <input type="text" className="form-control"
                            onChange={event => this.handleOnChangeText(event, 'addressClinic')} value={this.state.addressClinic} />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id="doctor.manage-doctor.note" /></label>
                        <input type="text" className="form-control"
                            onChange={event => this.handleOnChangeText(event, 'note')} value={this.state.note} />
                    </div>

                </div>

                <div className="manage-doctor-editor">
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button type="button" className={hasData === true ? "btn btn-warning btn-lg mt-4 create-content-doctor" : "btn btn-primary btn-lg mt-4 save-content-doctor"}
                    onClick={this.handleSaveContentMarkdown}
                >
                    {hasData === true ?
                        <span><FormattedMessage id="common.saveInfo" /></span>
                        :
                        <span><FormattedMessage id="common.addInfo" /></span>
                    }


                </button>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.testingReducer.users,
        allDoctors: state.testingReducer.allDoctors,
        language: state.app.language,
        allRequiredDoctorInfor: state.testingReducer.allRequiredDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        getRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
        saveDoctorDetail: (data) => dispatch(actions.saveDoctorDetail(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
