

export const initialState = {
    user: null,
};

export const actionTypes = {
    SET_USER: "SET_USER",
    SAVE_CONTACT: "SAVE_CONTACT"
};

const reducer = (state, action) => {
    switch(action.type){
        case actionTypes.SET_USER:
            const loginUser = {
                photoURL:action.user.photoURL,
                displayName: action.user.displayName,
                email: action.user.email
            }
            localStorage.setItem('user', JSON.stringify(loginUser))
            return{
                ...state,
                user: action.user,
            }
        case actionTypes.SAVE_CONTACT:
            return {
                ...state,
                contacts: action.contacts,
                friendRequests: action.friendRequests,
                friendSuggest:action.friendSuggest
            }   
        default:
            return state;
    }
}

export default reducer;