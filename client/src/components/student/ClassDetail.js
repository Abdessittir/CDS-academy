import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAlert } from "../../contexts/alertContext";
import { useClass } from "../../contexts/classContext";
import { getClassDetail } from "../../services/studentService";
import { ClassProvider } from "../../contexts/classContext";

function ClassDetail(){
    
    const [classdetail, setClassDetail] = useState(null);
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
        console.log(findClass);

    }, [params, myClass, setAlert, setMyClass]);
    
    if(loading){
        return <h1>Loading</h1>
    }
    console.log(classdetail)
    return (
        <div></div>
    );
}

export default () => (
    <ClassProvider>
        <ClassDetail />
    </ClassProvider>
);