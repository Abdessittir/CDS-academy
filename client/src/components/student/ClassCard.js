import { Rating } from "@mui/material";
import "../../styles/student/ClassCard.css";
import { useTranslation } from "react-i18next";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { IconButton } from "@mui/material";
import { useNavigate } from 'react-router-dom';

function ClassCard({classInfo, fade}){
    
    const { t } = useTranslation();
    const options = {
        value: classInfo.rating,
        readOnly: true,
        precision: 0.5,
    };
    const navigate = useNavigate();

    return (
        <div data-aos={fade} className="classInfo">
            <div className="classInfo_left">
                <h2>{classInfo.name}</h2>
                <h3 dir="auto">{t("SUBJECTS")}</h3>
                {classInfo.subjects.map(subject =>(
                    <p className="classSubject" key={subject}>{subject}</p>
                ))}
                <p className="classRating">Rating <Rating {...options} /></p>
                <p dir="auto">{t("PRICE")} <strong>{classInfo.price.$numberDecimal} DH/Mo</strong>
                </p>
            </div>
            <div className="classInfo_right">
                <h2 dir="auto">{t("TIME")}</h2>
                {classInfo.days.map(time => (
                    <div className="classTime" key={time.name}>
                        <p dir="auto">{t("DAY")}: {time.name}</p>
                        <p dir="auto">{t("TIME")}: {time.startTime.slice(11, 16)}</p>
                    </div>
                ))}
                <IconButton
                    className="more_btn"
                    onClick={() =>navigate(`/student/class/${classInfo._id}`)}
                >
                    <QuestionMarkIcon />
                </IconButton>
            </div>
        </div>
    );
}

export default ClassCard;