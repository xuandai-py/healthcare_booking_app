import actionTypes from '../actions/actionTypes';
import { getAllCodeService, createNewUserService, getAllUsersService, deleteUserService, editUserService, getTopDoctorHomeService, getAllDoctorService, saveDoctorDetailService, getAllSpecialty } from '../../services/userService';
import { toast } from 'react-toastify';

export const testingFetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.TESTING_FETCH_GENDER_START })
            let res = await getAllCodeService('gender');
            if (res && res.errCode === 0) {
                dispatch(testingFetchGenderSuccess(res.data));

            } else {
                dispatch(testingFetchGenderFail());
            }
        } catch (error) {
            dispatch(testingFetchGenderFail());
            console.log("testingFetchGenderStart", error);
        }
    }
}


export const testingFetchGenderSuccess = (genderData) => ({
    type: actionTypes.TESTING_FETCH_GENDER_SUCCESS,
    data: genderData
})

export const testingFetchGenderFail = () => ({
    type: actionTypes.TESTING_FETCH_GENDER_FAIL
})


export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_POSITION_START })
            let res = await getAllCodeService('position');
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFail());
            }
        } catch (error) {
            dispatch(fetchPositionFail());
            console.log("fetchPositionFail", error);
        }
    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAIL
})



export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ROLE_START })
            let res = await getAllCodeService('role');
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFail());
            }
        } catch (error) {
            dispatch(fetchRoleFail());
            console.log("fetchRoleFail", error);
        }
    }
}
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL
})


export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            console.log('createNewUserRAW: ', data);
            console.log('Check create new redux user: ', res);
            if (res && res.errCode === 0) {
                toast.success("New user created!!! ")
                dispatch(createUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(createUserFail());
            }
        } catch (error) {
            dispatch(createUserFail());
            console.log("createUserFail", error);
        }
    }
}

export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})


export const createUserFail = () => ({
    type: actionTypes.CREATE_USER_FAIL
})

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsersService('All');

            if (res && res.errCode === 0) {

                toast.success("Fetched all users!!! ")
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            } else {
                toast.error("Failed to fetch all user!!! ")
                dispatch(fetchAllUsersFail());
            }
        } catch (error) {
            toast.error("Failed to fetch all user!!! ")
            dispatch(fetchAllUsersFail());
            console.log("fetchAllUsersFail", error);
        }
    }
}


export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})


export const fetchAllUsersFail = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAIL
})

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);

            if (res && res.errCode === 0) {
                toast.success("User deleted!!! ")
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("Failed to delete user!!! ")
                dispatch(deleteUserFail());
            }
        } catch (error) {
            toast.error("Failed to delete user!!! ")
            dispatch(deleteUserFail());
            console.log("deleteUserFail", error);
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})


export const deleteUserFail = () => ({
    type: actionTypes.DELETE_USER_FAIL

})

export const editUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(userId);

            if (res && res.errCode === 0) {
                toast.success("User edited!!! ")
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            } else {
                toast.error("Failed to edit user!!! ")
                dispatch(editUserFail());
            }
        } catch (error) {
            toast.error("Failed to edit user!!! ")
            dispatch(editUserFail());
            console.log("editUserFail", error);
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})


export const editUserFail = () => ({
    type: actionTypes.EDIT_USER_FAIL

})

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('5');
            console.log("fetch 3 top doctor: ", res.data);
            // dispatch(fetchTopDoctorsSuccess(res.data))
            if (res && res.errCode === 0) {
                dispatch(fetchTopDoctorsSuccess(res.data))
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAIL
                })
            }
        } catch (error) {
            console.error('FetchTopDoctor: ', error);
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAIL
            })
        }
    }
}


// #
export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorService();
            console.log("getAllDoctorService: ", res.data);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_All_DOCTORS_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_All_DOCTORS_FAIL
                })
            }
        } catch (error) {
            console.error('FetchALLDoctor: ', error);
            dispatch({
                type: actionTypes.FETCH_All_DOCTORS_FAIL
            })
        }
    }
}


export const fetchTopDoctorsSuccess = (dataDoctors) => ({
    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
    data: dataDoctors
})

export const fetchTopDoctorsFail = () => ({
    type: actionTypes.FETCH_TOP_DOCTORS_FAIL
})

export const saveDoctorDetail = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDoctorDetailService(data);
            console.log('save doctor detail service response: ', res);
            if (res && res.errCode === 0) {
                toast.success("Save doctor info succeed ")
                dispatch({
                    type: actionTypes.SAVE_DOCTOR_DETAIL_SUCCESS,
                })
            } else {
                toast.error("Save doctor info failed w ")
                dispatch({
                    type: actionTypes.SAVE_DOCTOR_DETAIL_FAIL
                })
            }
        } catch (error) {
            console.error('SaveDoctorDetailFail: ', error);
            toast.error("Save doctor info failed ")
            dispatch({
                type: actionTypes.SAVE_DOCTOR_DETAIL_FAIL
            })
        }
    }
}

// ##
export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME');
            console.log("getAllDoctorService: ", res.data);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_AllCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_AllCODE_SCHEDULE_TIME_FAIL
                })
            }
        } catch (error) {
            console.error('FetchALLScheduleTime: ', error);
            dispatch({
                type: actionTypes.FETCH_AllCODE_SCHEDULE_TIME_FAIL
            })
        }
    }
}


export const getRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START })
            let resPrice = await getAllCodeService('PRICE');
            let resProvince = await getAllCodeService('PROVINCE');
            let resPayment = await getAllCodeService('PAYMENT');
            let resSpecialty = await getAllSpecialty();
            
            if (resPrice && resPrice.errCode === 0
                && resProvince && resProvince.errCode === 0
                && resPayment && resPayment.errCode === 0
                && resSpecialty && resSpecialty.errCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data,
                    resProvince: resProvince.data,
                    resPayment: resPayment.data,
                    resSpecialty: resSpecialty.data
                }
                dispatch(fetchRequiredDoctorInforSuccess(data));

            } else {
                dispatch(fetchRequiredDoctorInforFail());
            }
        } catch (error) {
            dispatch(fetchRequiredDoctorInforFail());
            console.log("fetchRequiredDoctorInfor", error);
        }
    }
}


export const fetchRequiredDoctorInforSuccess = (allRequiredDoctorInfor) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredDoctorInfor
})

export const fetchRequiredDoctorInforFail = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAIL
})

