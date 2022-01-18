import React, { createContext, useContext, useReducer } from 'react';

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateValue = () => {
    let [{user}, dispatch] = useContext(StateContext);
    const isSignIn = localStorage.getItem('isSignIn') === 'signIn';
    if(user === null && isSignIn){
        const loginUser = JSON.parse(localStorage.getItem('user'));
        user = loginUser;
        return [{user}, dispatch]
    }else{
        return [{user}, dispatch]
    }
}

// export const useStateValue = () => useContext(StateContext);


