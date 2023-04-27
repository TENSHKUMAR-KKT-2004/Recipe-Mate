import { useReducer } from "react";
import { createContext } from "react";

export const ThemeContext = createContext()

const ThemeReducer = (state,action)=>{  //remember state must be comes first at the argument list
    switch(action.type){
        case 'CHANGE_COLOR':
            return {...state,color:action.payload}
        case 'CHANGE_MODE':
            return {...state,mode:action.payload}
        default:
            return state
    }
}

export function ThemeContextProvider ({children}){
    const [state,dispatch] = useReducer(ThemeReducer,{color:"#58249c",mode:'light'})

    const changeColor = (color)=>{
        dispatch({type:'CHANGE_COLOR',payload:color})
    }

    const changeMode = (mode)=>{
        dispatch({type:'CHANGE_MODE',payload:mode})
    }

    return (
        <ThemeContext.Provider value={{...state,changeColor,changeMode}}>
        {children}
        </ThemeContext.Provider>
    )
}