import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSpecialty.scss';

import { FormattedMessage } from 'react-intl'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import { createNewSpecialty } from '../../../services/userService'
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            image: '',
            previewImgURL: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
        }
    }

    async componentDidMount() {
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.language !== prevProps.language) {

        }
    }

    handleOnChangeInput = (event, name) => {
        let stateCopy = { ...this.state };
        stateCopy[name] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text
        })
    }


    handleOnChangeFile = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            // let objectUrl = URL.createObjectURL(file);
            this.setState({
                //  previewImgURL: objectUrl,
                image: base64
            })
        }
        console.log("Check file url: ", this.state.previewImgURL);
        console.log("Check file 64: ", this.state.image);
    }

    handleSaveNewSpecialty = async () => {
        let res = await createNewSpecialty(this.state)
        if (res && res.errCode === 0) {
            toast.success('Add new specialty success!!!')
            this.setState({
                name: '',
                image: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            })
        } else {
            toast.error('Failed to save new specialty')
            console.error(res);
        }
    }
    render() {

        return (
            <div className='manage-specialty-container'>
                <div className="ms-title">
                    <FormattedMessage id="specialty.manage-specialty.title" />
                </div>
                <div className="add-new-specialty row">
                    <div className="col-6 form-group">
                        <label htmlFor=""><FormattedMessage id="specialty.manage-specialty.name" /></label>
                        <input type="text" className="form-control"
                            value={this.state.name}
                            onChange={(e) => this.handleOnChangeInput(e, 'name')}
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label htmlFor=""><FormattedMessage id="specialty.manage-specialty.image" /></label>
                        <input type="file" className="form-control"
                            onChange={(e) => this.handleOnChangeFile(e)}
                        />
                    </div>

                    <div className="col-12 mt-2">
                        <MdEditor style={{ height: '400px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>

                    <div className="col-12">
                        <button className="btn btn-primary btn-lg mt-4 save-specialty"
                            onClick={() => this.handleSaveNewSpecialty()}
                        >
                            <FormattedMessage id="specialty.manage-specialty.add-new" />
                        </button>
                    </div>

                </div>
                <div className="all-specialty">

                </div>

            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
