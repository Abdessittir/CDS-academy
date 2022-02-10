import { IconButton } from "@mui/material";
import MetaData from "../../MetaData";
import LangSelector from "../home/LangSelector";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Input from "../user/Input";
import "../../styles/teacher/CreateClass.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import Logo from "../home/Logo";
import Humberger from "../home/Humberger";
import Sidebar from "../home/Sidebar";
import SchoolIcon from '@mui/icons-material/School';
import DescriptionIcon from '@mui/icons-material/Description';
import { useAlert } from "../../contexts/alertContext";
import CloseIcon from '@mui/icons-material/Close';


function CreateClass(){

    const { t } = useTranslation();
    const navigate = useNavigate();
    const [ sidebarOpen, setSidebarOpen ] = useState(false);
    const [data, setData] = useState({
        name:"",
        description:"",
        price:0,
    });
    const [show, setShow] = useState(false);
    const [days, setDays] = useState([]);
    const dayRef = useRef();
    const timeRef = useRef();
    const {setAlert} = useAlert();

    function handleInvalid(){};
    function handleChange(){};
    function handleTime(){
        if(!dayRef.current.value){
            return setAlert({
                from:"create class",
                type:"warning",
                message:"Please enter a day"
            })
        }
        if(!timeRef.current.value){
            return setAlert({
                from:"create class",
                type:"warning",
                message:"Please enter a time"
            })
        }

        setDays(prev => [...prev, {
            name:dayRef.current.value,
            startTime:timeRef.current.value
        }])
        setShow(false);
    }

    function handleShow(e){
        e.preventDefault();
        setShow(prev => !prev);
    }

    return (
        <div className="create_class">
            <MetaData title={t("CREATE")} />
            <Logo />
            <Humberger
                callback={() =>  setSidebarOpen(prev => !prev)}
                open={sidebarOpen}
            />
            <Sidebar open={sidebarOpen} />
            <LangSelector />
            <div className="backToHome">
            <IconButton onClick={() =>navigate("/teacher_dashboard")} >
               <ArrowBackIcon className="icon" fontSize="large" />
            </IconButton>
            </div>

            <form>
                <h1>Create Class</h1>
                <Input
                   onInvalid={handleInvalid}
                   onChange={handleChange}
                   icon={<SchoolIcon />}
                   options={{
                       type: 'text',
                       name: 'name',
                       placeholder: 'name',
                       value: data.name
                    }}
                />
                <div className="input_container">
                       <p><DescriptionIcon /></p>
                       <textarea
                      className="textArea"
                      value={data.description}
                      onChange={handleChange}
                      name="description"
                      onInvalid={handleInvalid}
                      placeholder="Add description to the class"
                   ></textarea>
                </div>
                <button onClick={handleShow} className="add_day">
                    {!show? "Add Day and Time":"close"}
                </button>
                
                {days.map((day, j) => (
                    <p
                      key={day.name}
                     style={{color:"white"}}>
                        <strong>{day.name}</strong>, <strong>{day.startTime}</strong>
                        <IconButton 
                           onClick={() =>setDays(prev => prev.filter((day, i) => i !==j))}
                           style={{marginLeft:"15px"}}>
                            <CloseIcon />
                        </IconButton>
                    </p>
                ))}
                {show && (
                    <div className="day_container">
                    <label>
                        Day:<input type="text" ref={dayRef}  required/>
                    </label>
                    <label>
                        Time:<input type="Time" ref={timeRef} required/>
                    </label>
                    <span onClick={handleTime}>add time</span>
                    </div>
                )}

                <Input
                   onInvalid={handleInvalid}
                   onChange={handleChange}
                   icon={<SchoolIcon />}
                   options={{
                       type: 'number',
                       name: 'price',
                       placeholder: 'price',
                       value: data.price
                    }}
                />  
            </form>
        </div>
    );
}

export default CreateClass;