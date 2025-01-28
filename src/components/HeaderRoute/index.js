// import {Component} from 'react'

// import {Link, withRouter} from 'react-router-dom'
// import Cookies from 'js-cookie'

// import './index.css'

// class HeaderRoute extends Component {
//   logout = () => {
//     Cookies.remove('jwt_token')
//     const {history} = this.props
//     history.replace('/login')
//   }
//   render() {
//     return (
//       <>
//         <div className="header-container">
//           <Link to="/">
//             <img
//               src="https://res.cloudinary.com/dwsbjx12w/image/upload/v1694596689/Group_7730_uuioli.png"
//               alt="website logo"
//               className="header-logo"
//             />
//           </Link>
//           <ul className="unorder-container">
//             <li className="list">Favioute</li>
//             <li className="list">
//               <Link to="/">Home</Link>
//             </li>
//             <Link to="/shelf">
//               <li className="list"> Bookshelves</li>
//             </Link>
//             <li>
//               <button
//                 type="button"
//                 onClick={this.logout}
//                 className="logoutButton"
//               >
//                 Logout
//               </button>
//             </li>
//           </ul>
//         </div>
//       </>
//     )
//   }
// }
// export default withRouter(HeaderRoute)

import {Link, withRouter} from 'react-router-dom'
import React, {useState} from 'react'
import Cookies from 'js-cookie'

import './index.css'

const HeaderRoute = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-mobile-logo-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://res.cloudinary.com/dwsbjx12w/image/upload/v1694596689/Group_7730_uuioli.png"
              alt="website logo"
            />
          </Link>
          <button
            type="button"
            className="nav-mobile-btn"
            onClick={onClickLogout}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
              alt="nav logout"
              className="nav-bar-img"
            />
          </button>
        </div>

        <div className="nav-bar-large-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://res.cloudinary.com/dwsbjx12w/image/upload/v1694596689/Group_7730_uuioli.png"
              alt="website logo"
            />
          </Link>
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className="nav-link">
                Favioute
              </Link>
            </li>
            <li className="nav-menu-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            <li className="nav-menu-item">
              <Link to="/shelf" className="nav-link">
                Bookshelves
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="nav-menu-mobile">
        <ul className="nav-menu-list-mobile">
          <li className="nav-menu-item-mobile">
            <Link to="/" className="nav-link">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
                alt="nav home"
                className="nav-bar-img"
              />
            </Link>
          </li>

          <li className="nav-menu-item-mobile">
            <Link to="/shelf" className="nav-link">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
                alt="nav products"
                className="nav-bar-img"
              />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(HeaderRoute)
