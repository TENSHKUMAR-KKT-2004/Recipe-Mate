import { useState } from "react"
import { firebaseAuth } from "../firebase/config"

export const useForgotPassword = () => {
    const [error, setError] = useState(null)
    const [isPending, setPending] = useState(false)
    const [isMailSended,setIsMailSended] = useState(false)

    const forgotPassword = async (email) => {
        setError(null)
        setPending(true)
        setIsMailSended(false)
        const abortController = new AbortController()

        await firebaseAuth.sendPasswordResetEmail(email,{url:'https://recipe-mate-site.firebaseapp.com/login'})
            .then(() => {
                // Password reset email sent!
                setIsMailSended(true)
                if (!abortController.signal.aborted) {
                    setPending(false)
                    setError(null)
                }
            })
            .catch((err) => {
                if (!abortController.signal.aborted) {
                    setError(err.message)
                    setPending(false)
                    setIsMailSended(false)
                }
            })
            return () => {
                abortController.abort()
            }
    }
    return { error, isPending, isMailSended, forgotPassword }
}