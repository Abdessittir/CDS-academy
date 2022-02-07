import api from "./api";

export async function getStudentClasses(){

    let url = "";
    try{
        const { data } = await api.get(url);
        return data;
    }catch(err){
        return err.response.data.message || err.message;
    }
}

export async function getClassDetail(id){
    let url = "/student/class/" + id;
    try{
        const { data } = await api.get(url);
        return data;
    }catch(err){
        return err.response.data.message || err.message;
    }
}
 