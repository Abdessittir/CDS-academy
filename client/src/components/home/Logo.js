import "../../styles/home/Logo.css";
import { useNavigate } from "react-router-dom";

function Logo(){
    const navigate = useNavigate();
    return (
        <h1 onClick={() =>navigate("/")} className="logo">
            <span>CDS</span>Academy
        </h1>
    );
}

export default Logo;