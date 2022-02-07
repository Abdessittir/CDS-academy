import React, {useState, useContext} from "react";

const AlertContext = React.createContext();

export function useAlert(){
    return useContext(AlertContext);
}

export function AlertProvider({children}){
    const [alert, setAlert] = useState({
        from:"",
        type:"",
        message:""
    });
    
    /*
    useEffect(() =>{
        if(alert.type){
            setTimeout(() =>{
                setAlert({type:"", message:"",from:""})
            }, 10000);
        }
    },[alert]);
    */

    const value = {alert, setAlert};

    return (
        <AlertContext.Provider value={value}>
            {children}
        </AlertContext.Provider>
    );
}