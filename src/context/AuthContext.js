import { createContext,useReducer } from "react";

export const AuthContext = createContext()

export const authReducer = (state,action)=>{
    switch(action.type){
        case 'LOGIN':
            return {...state,user:action.payload}
        default:
            return state
    }
}

const AuthContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(authReducer,{user:null})
    console.log(state)
    return ( 
        <AuthContext.Provider value={{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
     );
}
 
export default AuthContextProvider;