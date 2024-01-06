import PropTypes from 'prop-types';
import React,{useState, useReducer, createContext, useMemo, useEffect} from 'react';


export const AuthContext = createContext();

export const authReducer = (state,action) =>{
    switch(action.type){
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user:null }
        default:
            return state
    }
}

const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });

    // check the local storage for when the component first renders
    useEffect(()=>{
        const userobject = localStorage.getItem('user');
        if(userobject){
            const user = JSON.parse(userobject);
            dispatch({ type: 'LOGIN', payload:user });
        }
    },[])

    const contextValue = React.useMemo(() => ({ ...state, dispatch }), [state]);

    console.log('AuthContext state: ', state);

    return ( 
        <AuthContext.Provider value={contextValue}>
            { children }
        </AuthContext.Provider>
     );
}

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

 
export default AuthContextProvider;