import React, { createContext, useContext, useReducer } from 'react';

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateValue = () => {
    let [{user, contacts}, dispatch] = useContext(StateContext);
    const isSignIn = localStorage.getItem('isSignIn') === 'signIn';
    if(user === null && isSignIn){
        const loginUser = JSON.parse(localStorage.getItem('user'));
        user = loginUser;
        return [{user, contacts}, dispatch]
    }else{
        return [{user, contacts}, dispatch]
    }
}


// export const useStateValue = () => useContext(StateContext);


