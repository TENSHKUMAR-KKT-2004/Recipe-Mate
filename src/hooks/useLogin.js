import { useState } from "react"
import { firebaseAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"
import firebase from "firebase/app"

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isPending, setPending] = useState(false)
    const { dispatch } = useAuthContext()
    const provider = new firebase.auth.GoogleAuthProvider()

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

    const loginWithGoogle = () => {
        setError(null)
        setPending(true)
        const abortController = new AbortController()

        firebaseAuth.signInWithPopup(provider)
            .then((res) => {
                dispatch({ type: 'LOGIN', payload: res.user })

                if (!abortController.signal.aborted) {
                    setPending(false)
                    setError(null)
                }

            }).catch((err) => {
                if (!abortController.signal.aborted) {
                    setError(err.message)
                    setPending(false)
                }
            })
            return () => {
                abortController.abort()
            }
    }

    return { error, isPending, login, loginWithGoogle }
}