import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailClinic.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import { FormattedMessage } from 'react-intl'
import DoctorSchedule from '../Doctor/DoctorSchedule'
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor'
import ProfileDoctor from '../Doctor/ProfileDoctor'
import { getDetailClinicById, getAllCodeService } from '../../../services/userService'
import _ from 'lodash'
import { languages } from '../../../utils';

class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getDetailClinicById({
                id: id,
            })

            if (res && res.errCode === 0) {
                let arrDoctorId = []
                if (res.data && !_.isEmpty(res.data)) {
                    let arr = res.data.doctorClinic
                    if (arr && arr.length > 0) {
                        arr.map(item => arrDoctorId.push(item.doctorId))
                    }
                }

                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.language !== prevProps.language) {

        }
    }


    render() {
        let { arrDoctorId, dataDetailClinic } = this.state
        let { language } = this.props
        return (
            <div className="detail-clinic-container">
                <HomeHeader />

                <div className="detail-clinic-body">
                    <div className="description-clinic">

                        {dataDetailClinic && !_.isEmpty(dataDetailClinic) &&
                            <>
                                <h1>{dataDetailClinic.name} </h1>
                                <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}></div>
                            </>
                        }
                    </div>

                    {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            return (

                                <div className="each-doctor" key={index}>
                                    <div className="dt-content-left">
                                        <ProfileDoctor
                                            doctorId={item}
                                            isShowDescriptionDoctor={true}
                                            isShowPrice={false}
                                            isShowLink={true}
                                        />
                                    </div>
                                    <div className="dt-content-right">
                                        <div className="doctor-schedule">

                                            <DoctorSchedule key={index} doctorIdFromParent={item} />
                                        </div>
                                        <div className="doctor-extra-infor">

                                            <DoctorExtraInfor doctorIdFromParent={item} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
