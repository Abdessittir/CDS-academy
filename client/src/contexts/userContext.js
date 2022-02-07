import React, {useState, useContext, useEffect} from "react";

const UserContext = React.createContext();

export function useAuth(){
    return useContext(UserContext);
}

export function UserProvider({children}){
    const [user, setUser] = useState({
        isLoggedIn: localStorage.getItem("user") ?? false,
        info:null,
        loading:false,
        error:null,
    });

    useEffect(() =>{
        console.log(user);
    }, [user])

    const value = {user, setUser};

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}