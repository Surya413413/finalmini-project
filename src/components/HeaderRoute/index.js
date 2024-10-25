import {Component} from 'react'

import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class HeaderRoute extends Component {
  logout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }
  render() {
    return (
      <>
        <div className="header-container">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dwsbjx12w/image/upload/v1694596689/Group_7730_uuioli.png"
              alt="website logo"
              className="header-logo"
            />
          </Link>
          <ul className="unorder-container">
            <li className="list">Favioute</li>

            <Link to="/">
              <li className="list">Home </li>
            </Link>
            <Link to="/shelf">
              <li className="list"> Bookshelves</li>
            </Link>
            <li>
              <button
                type="button"
                onClick={this.logout}
                className="logoutButton"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </>
    )
  }
}
export default withRouter(HeaderRoute)
