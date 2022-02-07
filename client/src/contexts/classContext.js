import React, {useState, useContext, useEffect} from "react";

const ClassContext = React.createContext();

export function useClass(){
    return useContext(ClassContext);
}

export function ClassProvider({children}){
    const [myClass, setMyClass] = useState([]);

    useEffect(() =>{
        console.log(myClass);
    }, [myClass])

    const value = {myClass, setMyClass};

    return (
        <ClassContext.Provider value={value}>
            {children}
        </ClassContext.Provider>
    );
}