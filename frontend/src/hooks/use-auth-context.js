import { AuthContext } from "src/contexts/AuthContext";
import { useContext, useState } from "react";

const UseAuthContext = () => {
    const context = useContext(AuthContext);

    if(!context){
        throw Error("Context must be accessed from within the AuthContext provider");
    }

    return context;
}
 
export default UseAuthContext;