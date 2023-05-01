import { useState } from "react"
import { firebaseAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isPending, setPending] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async (email,password) => {
        setError(null)
        setPending(true)
        const abortController = new AbortController()

        // login the user
        try {
            const res = await firebaseAuth.signInWithEmailAndPassword(email,password)
            // dispatch login action
            dispatch({type:'LOGIN',payload:res.user})
            // update states
            if (!abortController.signal.aborted) {
                setPending(false)
                setError(null)
            }
        } catch (err) {
            if (!abortController.signal.aborted) {
                setError(err.message)
                setPending(false)
            }

        }
        return () => {
            abortController.abort()
        }
    }

    return { error, isPending, login }
}