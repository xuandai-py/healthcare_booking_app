import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailSpecialty.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import { FormattedMessage } from 'react-intl'
import DoctorSchedule from '../Doctor/DoctorSchedule'
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor'
import ProfileDoctor from '../Doctor/ProfileDoctor'
import { getDetailSpecialtyById, getAllCodeService } from '../../../services/userService'
import _ from 'lodash'
import { languages } from '../../../utils';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            listProvince: []
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getDetailSpecialtyById({
                id: id,
                location: 'ALL'
            })

            let resProvince = await getAllCodeService('PROVINCE')

            if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
                let arrDoctorId = []
                if (res.data && !_.isEmpty(res.data)) {
                    let arr = res.data.doctorSpecialty
                    if (arr && arr.length > 0) {
                        arr.map(item => arrDoctorId.push(item.doctorId))
                    }
                }

                let dataProvince = resProvince.data
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createdAt: null,
                        keyMap: "ALL",
                        type: "PROVINCE",
                        valueVi: "Toàn quốc",
                        valueEn: "ALL"
                    })
                }

                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: dataProvince ? dataProvince : []
                })
            }
        }

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.props.language !== prevProps.language) {

        }
    }

    handleOnChangeSelect = async (e) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let location = e.target.value

            let res = await getDetailSpecialtyById({
                id: id,
                location: location
            })

            if (res && res.errCode === 0) {
                let arrDoctorId = []
                if (res.data && !_.isEmpty(res.data)) {
                    let arr = res.data.doctorSpecialty
                    if (arr && arr.length > 0) {
                        arr.map(item => arrDoctorId.push(item.doctorId))
                    }
                }

                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }

    render() {
        let { arrDoctorId, dataDetailSpecialty, listProvince } = this.state
        let { language } = this.props
        return (
            <div className="detail-specialty-container">
                <HomeHeader />

                <div className="detail-specialty-body">

                    <div className="description-specialty">
                        {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
                            <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}></div>
                        }
                    </div>
                    <div className="search-sp-doctor">
                        <select onChange={(e) => this.handleOnChangeSelect(e)}>
                            {listProvince && listProvince.length > 0 &&
                                listProvince.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap}>
                                            {language === languages.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    )
                                })
                            }
                        </select>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
