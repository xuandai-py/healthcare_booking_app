const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',
    
    //admin
    ADMIN_LOGIN_SUCCESS: 'ADMIN_LOGIN_SUCCESS',
    ADMIN_LOGIN_FAIL: 'ADMIN_LOGIN_FAIL',
    
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',

    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',

    // test
    TESTING_FETCH_GENDER_START: 'TESTING_FETCH_GENDER_START',
    TESTING_FETCH_GENDER_SUCCESS: 'TESTING_FETCH_GENDER_SUCCESS',
    TESTING_FETCH_GENDER_FAIL: 'TESTING_FETCH_GENDER_FAIL',

    // position
    FETCH_POSITION_START: 'FETCH_POSITION_START',
    FETCH_POSITION_SUCCESS: 'FETCH_POSITION_SUCCESS',
    FETCH_POSITION_FAIL: 'FETCH_POSITION_FAIL',

    //role
    FETCH_ROLE_START: 'FETCH_ROLE_START',
    FETCH_ROLE_SUCCESS: 'FETCH_ROLE_SUCCESS',
    FETCH_ROLE_FAIL: 'FETCH_ROLE_FAIL',

    // validate/ CRUD UserRedux
    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    CREATE_USER_FAIL: 'CREATE_USER_FAIL',
    
    
    EDIT_USER_SUCCESS: 'EDIT_USER_SUCCESS',
    EDIT_USER_FAIL: 'EDIT_USER_FAIL',

    // 
    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
    DELETE_USER_FAIL: 'DELETE_USER_FAIL',

    // tableManageUser
    FETCH_ALL_USERS_SUCCESS: 'FETCH_ALL_USERS_SUCCESS',
    FETCH_ALL_USERS_FAIL: 'FETCH_ALL_USERS_FAIL',
    
    // desktop
    // tableManageUser
    FETCH_TOP_DOCTORS_SUCCESS: 'FETCH_TOP_DOCTORS_SUCCESS',
    FETCH_TOP_DOCTORS_FAIL: 'FETCH_TOP_DOCTORS_FAIL',
    
    FETCH_All_DOCTORS_SUCCESS: 'FETCH_All_DOCTORS_SUCCESS',
    FETCH_All_DOCTORS_FAIL: 'FETCH_All_DOCTORS_FAIL',
    
    SAVE_DOCTOR_DETAIL_SUCCESS: 'SAVE_DOCTOR_DETAIL_SUCCESS',
    SAVE_DOCTOR_DETAIL_FAIL: 'SAVE_DOCTOR_DETAIL_FAIL',

    FETCH_AllCODE_SCHEDULE_TIME_SUCCESS: 'FETCH_AllCODE_SCHEDULE_TIME_SUCCESS',
    FETCH_AllCODE_SCHEDULE_TIME_FAIL: 'FETCH_AllCODE_SCHEDULE_TIME_FAIL',

    FETCH_REQUIRED_DOCTOR_INFOR_START: 'FETCH_REQUIRED_DOCTOR_INFOR_START',
    FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS: 'FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS',
    FETCH_REQUIRED_DOCTOR_INFOR_FAIL: 'FETCH_REQUIRED_DOCTOR_INFOR_FAIL'
    // 

})

export default actionTypes;