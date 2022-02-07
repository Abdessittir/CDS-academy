import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MetaData from '../../MetaData';
import LangSelector from '../home/LangSelector';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState} from "react";
import Input from "./Input";
import { useAuth } from "../../contexts/userContext";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../contexts/alertContext";
import Button from '@mui/material/Button';
import RegisterAs from "./RegisterAs";
import educationLevel from "../../services/educationLevel";
import SchoolIcon from '@mui/icons-material/School';
import { registerStudent, registerTeacher } from "../../services/userService";
import DescriptionIcon from '@mui/icons-material/Description';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

function Register(){

    const [data, setData] = useState({
        name:"",
        email:"",
        password:"",
        educationLevel:"",
        description:"",
    });
    const [phoneNo, setPhoneNo] = useState();
    const [avatar, setAvatar] = useState("./Profile.png");
    const [registerAs, setRegisterAs] = useState(null);
    const { t , i18n} = useTranslation();
    const navigate = useNavigate();
    const { user, setUser } = useAuth();
    const { alert, setAlert } = useAlert();

    function handleChange(event){
        if(event.target.name === "avatar"){
            setAvatar(event.target.files[0]);
        }else{
            setData(prev => ({
                ...prev,
                [event.target.name]:event.target.value
            }));
        }

        if(alert.from === "register"){
            setAlert({
                from:"",
                type:"",
                message:""
            });
        }
    }
    
    function handleInvalid(e){
        setAlert(prev =>({
            from:"register",
            type:"warning",
            message:`${prev.from==="register"?prev.message+" and":""} Invalid ${e.target.name}`
        }));
    }
    async function handleSubmit(e){
        e.preventDefault();

        setUser(prev =>({
            ...prev,
            loading:true
        }));
        const myForm = new FormData();

        myForm.set("fullName", data.name);
        myForm.set("email", data.email);
        myForm.set("password", data.password);
        myForm.set("educationLevel", data.educationLevel);
        myForm.set("description", data.description);
        myForm.set("phoneNo",phoneNo);
        myForm.set("avatar", avatar);

        let response;
        if(registerAs === "st"){
            response = await registerStudent(myForm);
        }else{
            response = await registerTeacher(myForm);
        }

        if(response.success){
            setAlert({
                from:"register",
                type:"success",
                message:"You'r registered successfully"
            });
            setUser({
                isLoggedIn:true,
                loading:false,
                info:response.student ?? response.teacher,
            })
            console.log(response);
        }else{
            setUser(prev => ({
                ...prev,
                loading:false,
                error:response,
            }))
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
                from:"register",
                type:"error",
                message:user.error
            });
        }
    }, [user, navigate, setAlert]);
    
    const nameOptions = {
        type:"text",
        name:"name",
        placeholder:t("FULL_NAME"),
        value:data.name,
        required:true,
    };
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
        minLength:8,
        maxLength:40,
    }
    const avatarOptions = {
        type:"file",
        name:"avatar",
        accept:"image/*",
    };

    if(!registerAs){
        return <RegisterAs handleRegisterAs={setRegisterAs} />
    }

    return (
        <div className="login">
            <MetaData title={t("REGISTER")} />
            <LangSelector />
            <div className="backToHome">
              <IconButton onClick={() =>setRegisterAs(null)} >
               <ArrowBackIcon className="icon" fontSize="large" />
              </IconButton>
            </div>

            <form onSubmit={handleSubmit}>
                <h1 dir="auto">{t("REGISTER")}</h1>
                <Input
                   onChange={handleChange}
                   onInvalid={handleInvalid}
                   options={nameOptions}
                   icon={<AccountBoxIcon />}
               />
                <Input
                   onChange={handleChange}
                   onInvalid={handleInvalid}
                   options={emailOptions}
                   icon={<EmailIcon />}
               />
               <div className="input_container">
               <PhoneInput
                   className="phone_input"
                   placeholder={t("PHONE")}
                   value={phoneNo}
                   onChange={setPhoneNo}
                   defaultCountry="MA"
               />
               </div>
               <Input
                  onChange={handleChange}
                  onInvalid={handleInvalid}
                  options={passwordOptions}
                  icon={<PasswordIcon />}
               />
               {registerAs === "st" && (
                   <div className='input_container'>
                       <p><SchoolIcon /></p>
                       <select
                          required
                          name="educationLevel"
                          value={data.educationLevel}
                          onChange={handleChange}
                          onInvalid={handleInvalid}
                       >
                           <option>{t("EDUCATION")}</option>
                           {
                               educationLevel.map(level =>(
                                   <option
                                     key={level.fr}
                                     value={level.fr}
                                    >{level[i18n.language]}</option>
                               ))
                           }
                       </select>
                   </div>
               )}
               {registerAs === "te" && (
                   <Input
                     icon={<AccountBoxIcon />}
                     options={avatarOptions}
                     onChange={handleChange}
                     onInvalid={handleInvalid}
                   />
               )}
               {registerAs === "te" && (
                   <div className="input_container">
                       <p><DescriptionIcon /></p>
                       <textarea
                      className="textArea"
                      value={data.description}
                      onChange={handleChange}
                      name="description"
                      onInvalid={handleInvalid}
                      placeholder={t("DESCRIPTION")}
                   ></textarea>
                   </div>
               )}

               <Button
                 className="login_submit"
                 dir="auto"
                 type="submit"
                 variant="outlined"
                >{
                    user.loading?
                    "loading..."
                    :t("REGISTER")
                }</Button>
                
            </form>
        </div>
    );
}

export default Register;