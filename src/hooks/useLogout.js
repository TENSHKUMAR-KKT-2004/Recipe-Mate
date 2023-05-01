import { useState } from "react"
import { firebaseAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    const [error,setError] = useState(null)
    const [isPending,setPending] = useState(false)
    const {dispatch} = useAuthContext()

    const logout = async()=>{
        setError(null)
        setPending(true)

        // sign the user out
        try{
            await firebaseAuth.signOut()

            // dispatch logout action
            dispatch({type:'LOGOUT'})

            setPending(false)
            setError(null)
        }catch(err){
            setError(err.message)
            setPending(false)
        }
    }

    return {error,isPending,logout}
}