import {Component} from 'react'

import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginRoute extends Component {
  state = {username: '', password: '', error: '', showErrorMsg: false}

  changeInput = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccessData = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  errorMsg = error => {
    this.setState({showErrorMsg: true, error})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, option)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.onSuccessData(data.jwt_token)
    } else {
      this.errorMsg(data.error_msg)
    }
  }

  renderUsername = () => {
    const {username} = this.state
    return (
      <div>
        <label htmlFor="user">Username</label>
        <br />
        <input
          type="text"
          placeholder="username"
          value={username}
          id="user"
          className="userinput"
          onChange={this.changeInput}
        />
      </div>
    )
  }

  renderPassword = () => {
    const {password, showErrorMsg, error} = this.state
    return (
      <div className="">
        <label htmlFor="pass">Password</label>
        <br />
        <input
          type="password"
          placeholder="password"
          value={password}
          id="pass"
          className="userinput"
          onChange={this.changePassword}
        />
        {showErrorMsg && <p>*{error}</p>}
      </div>
    )
  }

  renderlogobookhub = () => (
    <div className="logo-container">
      <img
        src="https://res.cloudinary.com/dwsbjx12w/image/upload/v1694596689/Group_7730_uuioli.png"
        alt="login website logo"
        className="logoimg"
      />
      <h1 className="bookhublogo">BookHub</h1>
    </div>
  )

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <img
          src="https://s3-alpha-sig.figma.com/img/3056/c7bb/e7efb0d3d71dcb5062f1e077527d7f5d?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bhxCCrTlWriYgZ3~lfR0ds8UWcfi1hq52sFlB7jwnIJMYUgLNz2l27S72blI07h51p2zf4u19s09fDWY8gSTfjYo0Z02xWQJo-oi5797FYgOyO3NVSRQEgIaT5XVxrtt1AByGT1oW6eATc62KbQrRu1iL4qkapqdbfrb-bizcBCLcmVw2lG5YLDzxtXvvxFRMTOzQ9D6c9duiHyaxgEuT-3mXtdvdd~cf4H8QbiUlnLI1zovfHXy3ZXNSVje2QOvDFg~IW0HD1pWv6zD-qQpYKaBrUi-g7ofcO6RsFQfJUpVw-Tpj51ovgHDAWnz3i6uXdnUPh4~CM3waQu8BA2uhw__"
          className="loginImage"
          alt="website login"
        />
        <form onSubmit={this.onSubmitForm} className="form-container">
          {this.renderlogobookhub()}
          {this.renderUsername()}
          {this.renderPassword()}

          <button type="submit" className="loginbutton">
            Login
          </button>
        </form>
      </div>
    )
  }
}
export default LoginRoute
