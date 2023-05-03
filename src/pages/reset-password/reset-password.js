import { useState } from 'react'
import './reset-password.css'
import { useResetPassword } from '../../hooks/useResetPassword'
import { useNavigate, useSearchParams } from 'react-router-dom'

const ResetPassword = () => {
    const [newPassword, setPassword] = useState('')
    const { error, isPending, isPasswordChanged, resetPasswordAndConfirm } = useResetPassword()
    const [queryString] = useSearchParams()
    const oobCode = queryString.get('oobCode')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        resetPasswordAndConfirm(oobCode, newPassword)
        setPassword('')
    }
    if (isPasswordChanged) {
        setTimeout(() => {
            navigate({ pathname: '/login' })
        }, 1000)
    }

    return (
        <form onSubmit={handleSubmit} className='reset-pass-form'>
            <h2>Reset Password</h2>
            <label>
                <span>New password:</span>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={newPassword}
                />
            </label>
            {isPending ? <button className="btn" disabled>Loding...</button> : <button className="btn">Submit</button>}
            {error && <div className="error">{error}</div>}
            {isPasswordChanged && <div className="success">Password has been changed, you can login now</div>}
        </form>
    )
}

export default ResetPassword;