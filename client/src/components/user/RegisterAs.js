import { useTranslation } from "react-i18next";
import MetaData from "../../MetaData";
import "../../styles/user/RegisterAs.css";

function RegisterAs({handleRegisterAs}){
    const { t} = useTranslation();

    return (
        <div className="register_as">
            <MetaData title={t("REGISTER")} />
            <div>
            <h2>{t("REGISTER")}</h2>
            <div className="choose">
                <p onClick={() =>handleRegisterAs("st")}>{t("STUDENT")}</p>
                <p onClick={() =>handleRegisterAs("te")}>{t("TEACHER")}</p>
            </div>
            </div>
        </div>
    );
}

export default RegisterAs;