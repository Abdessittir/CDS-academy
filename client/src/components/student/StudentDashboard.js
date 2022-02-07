import MetaData from "../../MetaData";
import Logo from "../home/Logo";
import Humberger from "../home/Humberger";
import "../../styles/student/StudentDashboard.css";
import { useEffect, useState } from "react";
import {useTranslation} from "react-i18next";
import LangSelector from "../home/LangSelector";
import {useAuth} from "../../contexts/userContext";
import ClassCard from "./ClassCard";
import Aos from 'aos';
import 'aos/dist/aos.css';


function StudentDashboard(){
    
    const [sideBarOpen, setSideBarOpen] = useState(false);
    const { t } = useTranslation();
    const { user } = useAuth();

    useEffect(() =>{
        Aos.init({duration: 1000});
    }, []);

    if(user.loading){
        return <h1>Loading...</h1>;
    }

    return (
        <div className="student_dashboard">
            <MetaData title="dashboard" />
            <Logo />
            <Humberger
                callback={() =>setSideBarOpen(prev => !prev)}
                open={sideBarOpen}
            />
            <LangSelector />
            <h1>{t("CLESSES")}</h1>
            
            <div className="studentClasses">
                {user.info.classes.map((classInfo, i) => 
                    <ClassCard
                       key={classInfo._id}
                       classInfo={classInfo}
                       fade={i%2 === 0? "fade-left":"fade-right"}
                    />
                )}
            </div>
        </div>
    );
}

export default StudentDashboard;