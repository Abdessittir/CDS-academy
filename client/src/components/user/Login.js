import { useEffect, useState} from "react";
import Input from "./Input";
import { useAuth } from "../../contexts/userContext";
import Button from '@mui/material/Button';
import { loginUser } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../contexts/alertContext";
import "../../styles/user/Login.css";
import MetaData from "../../MetaData";
import LangSelector from "../home/LangSelector";
import { useTranslation } from "react-i18next";
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';

function Login(){
    const [data, setData] = useState({
        email:"",
        password:""
    });
    const { user, setUser } = useAuth();
    const { alert, setAlert } = useAlert();
    const navigate = useNavigate();
    const { t } = useTranslation();


    const handleChange = (event) =>{
        setData(prev => ({
            ...prev,
            [event.target.name]:event.target.value
        }));
        
        if(alert.from === "login"){
            setAlert({
                from:"",
                type:"",
                message:""
            });
        }
    };
    const handleInvalid = (event) =>{
        setAlert(prev =>({
            from:"login",
            type:"warning",
            message:`${prev.from==="login"?prev.message+" and":""} Invalid ${event.target.name}`
        }));
    };

    async function handleSubmit(e){
        e.preventDefault();
        setUser(prev =>({
            ...prev,
            loading:true
        }));
        
        const response = await loginUser(data);

        if(response.success){
            setUser({
                isLoggedIn:true,
                loading:false,
                error:null,
                info:response.userData
            });
            localStorage.setItem("user",true);
        }else{
            setUser({
                isLoggedIn:false,
                loading:false,
                error:response,
                info:null
            });
        }
    
    }

    useEffect(() =>{
        if(user.info){
            if(user.info.userInfo.role === "student"){
                navigate("/student_dashboard");
            }else{
                navigate("/teacher_dashboard");
            }
        }

        if(user.error){
            setAlert({
                from:"login",
                type:"error",
                message:user.error
            });
        }
    }, [user, navigate, setAlert]);


    const emailOptions = {
        type:"email",
        name:"email",
        placeholder:t("EMAIL"),
        value:data.email,
        required:true,
    };
    const passwordOptions = {
        type:"password",
        name:"password",
        placeholder:t("PASSWORD"),
        value:data.password,
        required:true,
    }
    return (
        <div className="login">
            <MetaData title={t("LOGIN")} />
            <LangSelector />
            <div className="backToHome">
            <IconButton onClick={() =>navigate("/")} >
               <ArrowBackIcon className="icon" fontSize="large" />
            </IconButton>
            </div>
            <form onSubmit={handleSubmit} autoComplete="off">
                <h1 dir="auto">{t("LOGIN")}</h1>
               <Input
                onChange={handleChange}
                onInvalid={handleInvalid}
                options={emailOptions}
                icon={<EmailIcon />}
               />
               <Input
                onChange={handleChange}
                onInvalid={handleInvalid}
                options={passwordOptions}
                icon={<PasswordIcon />}
               />
               <p dir="auto" className="forgot_password">{t("FORGOT_PASSWORD")}</p>
                
               <Button
                    className="login_submit"
                    variant="contained"
                    type="submit">{
                        user.loading?
                        "loading..."
                        :t("LOGIN")
                    }</Button>
            </form>
        </div>
    );
}

export default Login;