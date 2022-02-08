import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAlert } from "../../contexts/alertContext";
import { useClass } from "../../contexts/classContext";
import { getClassDetail } from "../../services/studentService";
import { ClassProvider } from "../../contexts/classContext";
import "../../styles/student/ClassDetail.css";
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

function ClassDetail(){
    
    const [classDetail, setClassDetail] = useState(null);
    const params = useParams();
    const {myClass, setMyClass} = useClass();
    const [loading, setLoading] = useState(true);
    const {setAlert} = useAlert();

    useEffect(() =>{
        async function fetchData(){
            const response = await getClassDetail(params.id);

            if(response.success){
                setClassDetail(response.myClass);
                setMyClass(prev => [...prev, response.myClass]);
            }else{
                setAlert({
                    from:"classDetail",
                    type:"error",
                    message:response
                });
            }
        }
        
        let findClass = myClass.find(element => element._id === params.id);

        if(findClass){
            setClassDetail(findClass);
        }else{
            fetchData();
        }
        setLoading(false);

    }, []);
    
    if(loading){
        return <h1>Loading</h1>
    }

    return (
        <div className="class_details">
            <div className="close_btn">
            <IconButton className="btn_icon">
                <CloseIcon fontSize="large" />
            </IconButton>
            </div>
            <div className="class_teacher"></div>
            <div className="class_info"></div>
        </div>
    );
}

export default () => (
    <ClassProvider>
        <ClassDetail />
    </ClassProvider>
);