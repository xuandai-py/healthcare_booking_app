import React, { Component } from 'react';
import { connect } from "react-redux";
import './BillModal.scss';
import '../../../System/UserManage.scss'
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { FormattedMessage } from 'react-intl'
import _ from 'lodash'
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from "../../../../store/actions";
import { CommonUtils, languages } from '../../../../utils';
import Select from 'react-select'
import { postPatientAppointment } from '../../../../services/userService'
import { toast } from 'react-toastify'
import moment from 'moment';
import Loading from '../../../../utils/Loading';

class BillModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imageBase64: ''
        }
    }

    async componentDidMount() {
        if (this.props.dataModal) {

        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handleOnChangeFile = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({

                imageBase64: base64
            })
        }


    }
    handleSendBill = () => {
        this.props.sendBill(this.state)
    }
    render() {
        let { isOpen, toggle, dataModal, sendBill } = this.props;

        return (
            <>

                <Modal
                    size="lg" centered
                    isOpen={isOpen} toggle={toggle} className="modal-user-container booking-modal-container">
                    <ModalHeader toggle={toggle}>
                        <FormattedMessage id="patient.booking-modal.title" />
                    </ModalHeader>
                    <ModalBody>
                        <div className="modal-user-body">

                            <div className="input-container">
                                <label><FormattedMessage id="patient.booking-modal.email" />:</label>
                                <input placeholder="Type in" type="text"
                                    onChange={(e) => this.handleOnChangeEmail(e)}
                                    value={this.state.email}
                                />
                            </div>
                            <div className="input-container">
                                <label htmlFor=""><FormattedMessage id="clinic.manage-clinic.image" /></label>
                                <input type="file" className="form-control"
                                    onChange={(e) => this.handleOnChangeFile(e)}
                                />
                            </div>

                        </div>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.handleSendBill()}>
                            <FormattedMessage id="patient.booking-modal.btnConfirm" />
                        </Button>
                        <Button color="danger" onClick={toggle}>
                            <FormattedMessage id="patient.booking-modal.btnCancel" />
                        </Button>
                    </ModalFooter>
                </Modal>
                {this.props.isLoading && <Loading />}
                {/* <Loading /> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(BillModal);
