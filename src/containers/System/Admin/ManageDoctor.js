import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import {crud_actions} from "../../../utils/constant";
import './ManageDoctor.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { languages } from '../../../utils';
import { getDoctorDetailInfo } from '../../../services/userService';

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
            hasData: false
        }
    }

    async componentDidMount() {
        this.props.fetchAllDoctor();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.extractDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctor: dataSelect
            })
        }

        if (prevProps.language !== this.props.language) {
            let dataSelect = this.extractDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctor: dataSelect
            })
        }
    }

    extractDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language === languages.EN ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            })
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
        let {hasData} = this.state;
        this.props.saveDoctorDetail({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasData === true ? crud_actions.EDIT : crud_actions.CREATE
        });
        console.log("state: ", this.state);
    }

    handleChange = async (selectedDoctor) => {
        this.setState({
            selectedDoctor
        })
        let res = await getDoctorDetailInfo(selectedDoctor.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            this.setState({
                contentMarkdown: markdown.contentMarkdown,
                contentHTML: markdown.contentHTML,
                description: markdown.description,
                hasData: true
            })
        } else {
            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                description: '',
                hasData: false
            })
        }
        console.log(`Option selected: `, res);
    }

    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    render() {
        let {hasData} = this.state;
        console.log("getAllDoctorFromRedux: ", this.state);
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title mt-1 mb-1">
                    Manage Doctor
                </div>
                <div className="more-info">
                    <div className="content-left  flex-nowrap">
                        <label>Select doctor</label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChange}
                            options={this.state.listDoctor}
                        />
                    </div>
                    <div className="content-right">
                        <label>Description</label>
                        <div className="form-floating">
                            <textarea className="form-control" rows="4" placeholder="Leave a comment here" id="floatingTextarea"
                                onChange={(event) => this.handleOnChangeDesc(event)}
                                value={this.state.description}
                            ></textarea>
                            <label htmlFor="floatingTextarea">Comments</label>
                        </div>
                    </div>
                </div>
                <div className="manage-doctor-editor">
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button type="button" className={hasData === true ? "btn btn-warning btn-lg mt-4 create-content-doctor": "btn btn-primary btn-lg mt-4 save-content-doctor"}
                    onClick={this.handleSaveContentMarkdown}
                >
                    SAVE

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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        saveDoctorDetail: (data) => dispatch(actions.saveDoctorDetail(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
