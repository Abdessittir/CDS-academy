import "../../styles/home/Sidebar.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/userContext";

function Sidebar({open}){
    
    const navigate = useNavigate();
    const { user } = useAuth();
    return (
        <div className={`sidebar ${open ? 'open' : ''}`}>

            <nav>
                <p onClick={() =>navigate("/")}>Home</p>
                <p onClick={() =>navigate("/about")}>About</p>
                <p onClick={() =>navigate("/paymentmethods")}>How to pay</p>
                {!user.isLoggedIn && (
                    <>
                       <p onClick={() =>navigate("/login")}>Login</p>
                       <p onClick={() =>navigate("/register")}>register</p>
                    </>
                )}
                {user.info?.userInfo.role === "teacher" && (
                    <>
                       <p onClick={() =>navigate("/class/create")}>Create Class</p>
                    </>
                )}
            </nav>
        </div>
    );
}

export default Sidebar;