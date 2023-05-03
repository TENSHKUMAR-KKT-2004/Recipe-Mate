import { useState } from 'react'
import './login.css'
import { useLogin } from '../../hooks/useLogin'
import GoogleButton from 'react-google-button'
import { Link } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, loginWithGoogle, error, isPending } = useLogin()


  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
    setEmail('')
    setPassword('')

  }

  return (
    <form onSubmit={handleSubmit} className='login-form'>
      <h2>Login</h2>
      <label>
        <span>email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <span className="forgot-password">
          <Link to='/forgot-password'>Forgot password?</Link>
      </span>
      {isPending ? <button className="btn" disabled>Loding...</button> : <button className="btn">Login</button>}
      {error && <div className="error">{error}</div>}
      <div className="google-auth-button">
        <div className='google-btn'>
          <GoogleButton onClick={() => loginWithGoogle()} />
        </div>
      </div>
    </form>
  )
}

export default Login;