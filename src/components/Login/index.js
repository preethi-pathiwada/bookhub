import {useState} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

const Login = props => {
  const {history} = props
  const [username, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const changeName = event => {
    setName(event.target.value)
  }

  const changePassword = event => {
    setPassword(event.target.value)
  }

  const loginUser = async () => {
    const userDetails = {username, password}
    console.log(userDetails)
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 1})
      history.replace('/')
    } else {
      setError(data.error_msg)
    }
  }

  const clickLogin = event => {
    event.preventDefault()
    loginUser()
  }

  if (Cookies.get('jwt_token') !== undefined) {
    return <Redirect to="/" />
  }
  return (
    <>
      <div className="login-sm-bg">
        <img
          src="https://res.cloudinary.com/dh4tso4fh/image/upload/v1723447532/book-sm_mcf2ga.png"
          className="book-img"
          alt="website login"
        />
        <img
          src="https://res.cloudinary.com/dh4tso4fh/image/upload/v1723450903/Rectangle_1467_ofmpwi.png"
          className="book-img-lg"
          alt="website login"
        />

        <div className="right-container">
          <div className="form-container">
            <img
              src="https://res.cloudinary.com/dh4tso4fh/image/upload/v1723455942/Capture_mbzwk5.png"
              alt="website-logo"
              className="logo"
            />
            <form onSubmit={clickLogin}>
              <div className="input-container">
                <label className="label" htmlFor="name">
                  Username*
                </label>
                <input
                  type="text"
                  className="input"
                  id="name"
                  onChange={changeName}
                  value={username}
                />
              </div>
              <div className="input-container">
                <label className="label" htmlFor="password">
                  Password*
                </label>
                <input
                  type="password"
                  className="input"
                  id="password"
                  onChange={changePassword}
                  value={password}
                />
              </div>
              <p className="error-msg">{error}</p>
              <button type="submit" className="login-btn">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
