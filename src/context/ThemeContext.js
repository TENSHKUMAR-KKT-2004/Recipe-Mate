import { useReducer } from "react";
import { createContext } from "react";

export const ThemeContext = createContext()

const ThemeReducer = (state,action)=>{  //remember state must be comes first at the argument list
    switch(action.type){
        case 'CHANGE_COLOR':
            return {...state,color:action.payload}
        default:
            return state
    }
}

export function ThemeContextProvider ({children}){
    const [state,dispatch] = useReducer(ThemeReducer,{color:"#58249c"})

    const changeColor = (color)=>{
        dispatch({type:'CHANGE_COLOR',payload:color})
    }

    return (
        <ThemeContext.Provider value={{...state,changeColor}}>
        {children}
        </ThemeContext.Provider>
    )
}