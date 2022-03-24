import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DoctorDetail.scss';
import { getDoctorDetailInfo } from '../../../services/userService';
import { languages } from '../../../utils';

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: []
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getDoctorDetailInfo(id);
            console.log(`Checking response: id: ${id}, res: ${res.data}`, res);

            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) { }


    render() {
        console.log(this.state);
        let { detailDoctor } = this.state;
        let nameVi = '', nameEn = ''
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName} `;
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }
        return (
            <>
                <HomeHeader />
                <div className="doctor-detail-container">
                    <div className="intro-doctor">
                        <div className="content-left bg-image"
                            style={{ backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})` }}>
                        </div>
                        <div className="content-right">
                            <div className="name">
                                {this.props.language === languages.EN ? nameEn : nameVi}
                            </div>
                            <div className="description">
                                {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.description
                                    && <span>
                                        {detailDoctor.Markdown.description}
                                    </span>}
                            </div>
                        </div>
                    </div>
                    <div className="time-table-doctor"></div>
                    <div className="doctor-detail-info">
                        {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML
                            && <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}>

                            </div>}
                    </div>
                    <div className="comment"></div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
