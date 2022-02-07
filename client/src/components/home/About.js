import "../../styles/home/About.css";
import AboutInfo from "./AboutInfo";
//import SchoolIcon from '@mui/icons-material/School';
import CastForEducationOutlinedIcon from '@mui/icons-material/CastForEducationOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import { useTranslation } from "react-i18next";

function About(){
    const { t } = useTranslation();
    return (
        <div className="about">
            <AboutInfo
               Icon={CastForEducationOutlinedIcon}
               title={t("ABOUT_TITLE_1")}
               description={t("ABOUT_DESCRIPTION_1")}
            />
            <AboutInfo
               Icon={ClassOutlinedIcon}
               title={t("ABOUT_TITLE_2")}
               description={t("ABOUT_DESCRIPTION_2")}
            />
            <AboutInfo
               Icon={PersonSearchOutlinedIcon}
               title={t("ABOUT_TITLE_3")}
               description={t("ABOUT_DESCRIPTION_3")}
            />
        </div>
    );
}

export default About;