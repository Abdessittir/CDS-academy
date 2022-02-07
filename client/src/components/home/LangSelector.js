import { useTranslation } from 'react-i18next';
import "../../styles/home/LangSelector.css";
 
const LangSelector = () => {
  const { i18n } = useTranslation();
 
  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  }
 
  return (
    <select className='langSelector' value={i18n.language} onChange={changeLanguage}>
      <option value="fr">Français</option>
      <option dir='rtl' value="ar">العربية</option>{/*I have to change it*/}
      <option value="en">English</option>
    </select>
  )
}
 
export default LangSelector;