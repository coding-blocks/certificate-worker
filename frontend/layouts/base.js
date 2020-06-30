import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from '~/store/getters/session';

export default props => {
  const user = useSelector(getUser())

  return (
    <div>
      <header>
        <h1>Hello - {user.firstname}</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/layouts">Layouts</Link>
          </li>
        </ul>
      </header>
      {props.children}
    </div>
  )
}
