import api from "./api";


export async function loginUser(userData){
    let url = "/auth/login";

    try {
        const { data } = await api.post(url, userData);
        return data;
    }catch(err){
        return err.response.data.message || err.message;
    }
}

export async function registerStudent(studentData){
    let url = "/auth/register/student";

    try {
        const { data } = await api.post(url, studentData);
        return data;
    }catch(err){
        return err.response.data.message || err.message;
    }
}

export async function registerTeacher(teacherdata){
    let url = "/auth/register/teacher";

    try {
        const { data } = await api.post(url, teacherdata);
        return data;
    }catch(err){
        return  err.response.data.message ?? err.message;
    }
}

export async function getUserDetails(){
    let url = "/auth/user";

    try{
        const { data } = await api.get(url);
        return data;
    }catch(err){
        return  err.response.data.message ?? err.message;
    }
}