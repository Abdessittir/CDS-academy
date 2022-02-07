import { useTranslation } from 'react-i18next';
import '../../styles/home/Title.css';

function Title(){
    const { t, i18n } = useTranslation();

    return (
        <div className={`home_title ${i18n.language==="ar"?"ar":""}`}>
            <h1 className='first_title' dir="auto">{t("TITLE_1")}</h1>
            <h1 dir="auto">{t("TITLE_2")}</h1>
        </div>
    );
}

export default Title;