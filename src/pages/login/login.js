import { useState } from 'react'
import './login.css'
import { useLogin } from '../../hooks/useLogin'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isPending } = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
    setEmail('')
    setPassword('')

  }

  return (
    <form onSubmit={handleSubmit} className='login-form'>
      <h2>login</h2>
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
      {isPending ? <button className="btn" disabled>Loding...</button> : <button className="btn">Login</button>}
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Login;