import { useSignup } from '../../hooks/useSignup'
import './signup.css'
import { useState } from 'react'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const {signup,error,isPending} = useSignup()

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, displayName)
    setEmail('')
    setPassword('')
    setDisplayName('')
  }

  return (
    <form onSubmit={handleSubmit} className='signup-form'>
      <h2>sign up</h2>
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
      <label>
        <span>display name:</span>
        <input
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      {isPending ? <button className="btn" disabled>Loading..</button> : <button className="btn">Signup</button> }
      {error && <div className="error">{error}</div> }
    </form>
  )
}

export default Signup;