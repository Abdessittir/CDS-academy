import "../../styles/home/Sidebar.css";

function Sidebar({open}){

    return (
        <div className={`sidebar ${open ? 'open' : ''}`}>

            <nav>
                <p>Home</p>
                <p>About</p>
                <p>How to pay</p>
                <p>Login</p>
                <p>register</p>
            </nav>
        </div>
    );
}

export default Sidebar;