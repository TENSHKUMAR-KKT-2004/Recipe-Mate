import { useEffect, useState } from "react"
import { firebaseAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
    const [isCancelled, setCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, displayName) => {
        setError(null)
        setPending(true)
        try {
            const res = await firebaseAuth.createUserWithEmailAndPassword(email, password)
            if (!res) {
                throw new Error('could not complete signup')
            }
            // adding displayName property to the user
            await res.user.updateProfile({ displayName })
            // dispatch login action to store user
            dispatch({ type: 'LOGIN', payload: res.user })
            // update states
            if (!isCancelled) {
                setPending(false)
                setError(null)
            }
        } catch (err) {
            if (!isCancelled) {
                setError(err.message)
                setPending(false)
            }
        }
    }
    useEffect(() => {
        return () => setCancelled(true)
    }, [])
    
    return { error, isPending, signup }
}