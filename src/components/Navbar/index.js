import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {useState} from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoMdClose} from 'react-icons/io'
import './index.css'

const Navbar = props => {
  const [isHamburgerClicked, setHamburgerClick] = useState(false)
  const [navItemId, setNavItemId] = useState('home')

  const logoutUser = () => {
    Cookies.remove('jwt_token')
    props.history.replace('/login')
  }

  const onClickHamburger = () => {
    setHamburgerClick(true)
  }

  const closeMenu = () => {
    setHamburgerClick(false)
  }

  const clickNavItem = event => {
    setNavItemId(event.target.id)
    setHamburgerClick(true)
  }

  return (
    <div className="header-bg">
      <div className="navbar-bg">
        <Link to="/" className="link">
          <img
            src="https://res.cloudinary.com/dh4tso4fh/image/upload/v1723455942/Capture_mbzwk5.png"
            alt="website logo"
            className="navbar-logo"
          />
        </Link>

        <button type="button" className="button" onClick={onClickHamburger}>
          <GiHamburgerMenu className="hamburger" />
        </button>

        <ul className="nav-items-container">
          <Link to="/" className="link">
            <li
              className={
                navItemId === 'home' ? 'nav-item-active' : 'nav-item-inactive'
              }
              id="home"
              onClick={clickNavItem}
            >
              Home
            </li>
          </Link>
          <Link to="/shelf" className="link">
            <li
              className={
                navItemId === 'shelves'
                  ? 'nav-item-active'
                  : 'nav-item-inactive'
              }
              id="shelves"
              onClick={clickNavItem}
            >
              BookShelves
            </li>
          </Link>
          <li>
            <button type="button" className="logout-btn" onClick={logoutUser}>
              Logout
            </button>
          </li>
        </ul>
      </div>

      {isHamburgerClicked && (
        <ul className="nav-items-con-sm">
          <Link to="/" className="link">
            <li
              className={
                navItemId === 'home' ? 'nav-item-active' : 'nav-item-inactive'
              }
              id="home"
              onClick={clickNavItem}
            >
              Home
            </li>
          </Link>
          <Link to="/shelf" className="link">
            <li
              className={
                navItemId === 'shelves'
                  ? 'nav-item-active'
                  : 'nav-item-inactive'
              }
              id="shelves"
              onClick={clickNavItem}
            >
              BookShelves
            </li>
          </Link>
          <li>
            <button type="button" className="logout-btn" onClick={logoutUser}>
              Logout
            </button>
          </li>
          <li className="close-container">
            <button className="button" onClick={closeMenu}>
              <IoMdClose className="close-icon" />
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}
export default withRouter(Navbar)
