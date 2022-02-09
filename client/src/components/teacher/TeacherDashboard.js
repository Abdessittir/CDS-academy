import MetaData from "../../MetaData";
import Logo from "../home/Logo";
import Humberger from "../home/Humberger";
import { useEffect, useState } from "react";
import {useTranslation} from "react-i18next";
import LangSelector from "../home/LangSelector";
import {useAuth} from "../../contexts/userContext";
import ClassCard from "../student/ClassCard";
import Aos from 'aos';
import 'aos/dist/aos.css';

function TeacherDashboard(){
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
        <div className="teacher_dashboard">
            <MetaData title="dashboard" />
            <Logo />
            <Humberger
                callback={() =>setSideBarOpen(prev => !prev)}
                open={sideBarOpen}
            />
            <LangSelector />

            <div className="teacherClasses">
                <h1>{t("CLESSES")}</h1>
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

export default TeacherDashboard;