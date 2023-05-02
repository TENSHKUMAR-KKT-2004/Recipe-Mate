import { useState } from "react"
import { firebaseAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"
import firebase from 'firebase/app'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isPending, setPending] = useState(false)
    const { dispatch } = useAuthContext()
    const provider = new firebase.auth.GoogleAuthProvider()

    const signup = async (email, password, displayName) => {
        setError(null)
        setPending(true)
        const abortController = new AbortController()

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
    const signUpWithGoogle = () => {
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

    return { error, isPending, signup, signUpWithGoogle }
}