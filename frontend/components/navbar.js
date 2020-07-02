import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '~/store/getters/session';
import { logout } from '~/store/actions/session';

export default () => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(state => state.session.isAuthenticated)
  const user = useSelector(getUser())

  return (
    <header>
      <nav className='main-nav'>
        <span className='logo-parent'>
          <Link to='/'>
            <img src='https://codingblocks.com/assets/images/cb/cblogo.png' alt='online-logo' className='nav-logo pointer' />
          </Link>
        </span>
        <ul className='nav-list'>
          <li className='nav-items pointer'>
            Layouts
          </li>
          {isAuthenticated && <li className='nav-items pointer'>
            Hi,<mark>{ user.firstname }</mark>
          </li>}
          {isAuthenticated && <li className='nav-items pointer'>
            <button className='button-solid white' onClick={() => dispatch(logout())}>
              Logout
            </button>
          </li>}
          {!isAuthenticated && <li className='nav-items pointer'>
            <Link className='button-solid white' to='/login'>
              Login
            </Link>
          </li>}
        </ul>
      </nav>
    </header>
  )
}
