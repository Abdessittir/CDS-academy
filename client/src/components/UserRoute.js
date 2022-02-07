import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "../contexts/userContext";

function UserRoute() {

    const { user } = useAuth();
    const [loading, setLoading] = useState();

    useEffect(() =>{
        if(user.isLoggedIn){
            setLoading(true);
        }
    }, [user.isLoggedIn, user])

    return (
        loading || user.isLoggedIn? <Outlet />: <Navigate to="/login" />
    );
}

export default UserRoute;