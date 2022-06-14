import actionTypes from '../actions/actionTypes';


const initialState = {
    genders: [],
    roles: [],
    positions: [],
    isLoadingGender: false,
    users: [],
    topDoctors: [],
    test: [1, 2, 3],
    allDoctors: [],
    allScheduleTime: [],

    allRequiredDoctorInfor: []
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TESTING_FETCH_GENDER_START:
            state.isLoadingGender = true;
            let copyState = { ...state }
            console.log("testingFetchGenderStart", action);
            return {
                ...copyState,
            }

        case actionTypes.TESTING_FETCH_GENDER_SUCCESS:
            state.isLoadingGender = false;
            state.genders = action.data;
            console.log("testingFetchGenderSuccess", state);

            return {
                ...state,
            }

        case actionTypes.TESTING_FETCH_GENDER_FAIL:
            console.log("testingFetchGenderFail", action);
            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state,
            }

        case actionTypes.FETCH_POSITION_FAIL:
            state.positions = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state,
            }

        case actionTypes.FETCH_ROLE_FAIL:
            state.roles = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_USERS_FAIL:
            state.users = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctors = action.data;
            return {
                ...state,
            }

        case actionTypes.FETCH_TOP_DOCTORS_FAIL:
            state.topDoctors = [];
            return {
                ...state,
            }
        
        case actionTypes.FETCH_All_DOCTORS_SUCCESS:
            state.allDoctors = action.data;
            return {
                ...state,
            }
        
        case actionTypes.FETCH_All_DOCTORS_FAIL:
            state.allDoctors = [];
            return {
                ...state,
            }
         // 
            case actionTypes.FETCH_AllCODE_SCHEDULE_TIME_SUCCESS:
                state.allScheduleTime = action.dataTime;
                return {
                    ...state,
                }
            
            case actionTypes.FETCH_AllCODE_SCHEDULE_TIME_FAIL:
                state.allScheduleTime = [];
                return {
                    ...state,
                }
        
            case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
            state.allRequiredDoctorInfor = action.data;
            
            console.log('fetchRequiredDoctorInfor: ', action);
                return {
                    ...state,
                }
            
            case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAIL:
                state.allRequiredDoctorInfor = [];
                return {
                    ...state,
                }
        default:
            return state;
    }
}

export default appReducer; 