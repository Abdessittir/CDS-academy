import "../../styles/home/Buttons.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/userContext";

function Buttons(){
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    const handleLogin = () =>{
        if(isLoggedIn){
            navigate("/dashboard");
        }else{
            navigate("/login")
        }
    }

    return (
        <div className={`buttons ${i18n.language==="ar"?"ar":""}`} >
            <p
                onClick={handleLogin}
                className="home_btn"
                variant="contained"
            >{t("LOGIN")}</p>
            {!isLoggedIn && (
                <p
                onClick={() =>{navigate("/register")}}
                className="home_btn"
                variant="contained"
             >{t("REGISTER")}</p>
            )}
        </div>
    );
}

export default Buttons;