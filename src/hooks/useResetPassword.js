import { useState } from "react"
import { firebaseAuth } from "../firebase/config"

export const useResetPassword = () => {
    const [error, setError] = useState(null)
    const [isPending, setPending] = useState(false)
    const [isPasswordChanged,setIsPasswordChanged] = useState(false)

    const resetPasswordAndConfirm = async (oobCode,newPassword) => {
        setError(null)
        setPending(true)
        setIsPasswordChanged(false)
        const abortController = new AbortController()

        await firebaseAuth.confirmPasswordReset(oobCode,newPassword)
            .then(() => {
                if (!abortController.signal.aborted) {
                    setPending(false)
                    setError(null)
                    setIsPasswordChanged(true)
                }
                
            })
            .catch((err) => {
                if (!abortController.signal.aborted) {
                    setError(err.message)
                    setPending(false)
                    setIsPasswordChanged(false)
                }
            })
            return () => {
                abortController.abort()
            }
    }
    return { error, isPending, resetPasswordAndConfirm,isPasswordChanged }
}