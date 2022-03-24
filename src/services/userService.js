import axios from '../axios';


const handleLogin = (email, password) => {
    return axios.post('/api/login', { email, password })

};

const getAllUsersService = (id) => {
    return axios.get(`/api/get-all-users?id=${id}`)
}

const createNewUserService = (data) => {
    console.log('check data from service ', data);
    return axios.post('/api/create-new-user', data)
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    })
}

const editUserService = (inputData) => {
    return axios.post('/api/edit-user', inputData)
}

const getAllCodeService = (inputData) => {
    return axios.get(`/api/allcode?type=${inputData}`)
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const getAllDoctorService = () => {
    return axios.get(`/api/get-all-doctors`)
}

const saveDoctorDetailService = (data) => {
    return axios.post('/api/save-doctors-info', data)
}

const getDoctorDetailInfo = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}

export {
    handleLogin, getAllUsersService,
    createNewUserService, deleteUserService,
    editUserService, getAllCodeService,
    getTopDoctorHomeService, getAllDoctorService,
    saveDoctorDetailService, getDoctorDetailInfo
};