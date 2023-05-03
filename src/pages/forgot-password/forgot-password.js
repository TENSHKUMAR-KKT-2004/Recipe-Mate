import { useState } from 'react'
import './forgot-password.css'
import { useForgotPassword } from '../../hooks/useForgotPassword'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const { error, isPending, isMailSended, forgotPassword } = useForgotPassword()

  const handleSubmit = (e) => {
    e.preventDefault()
    forgotPassword(email)
    setEmail('')
  }

  return (
    <form onSubmit={handleSubmit} className='forgot-pass-form'>
      <h2>Forgot Password</h2>
      <label>
        <span>email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      {isPending ? <button className="btn" disabled>Loding...</button> : <button className="btn">Submit</button>}
      {error && <div className="error">{error}</div>}
      {isMailSended && <div className="success">Email send, check your mail</div> }
    </form>
  )
}

export default ForgotPassword;