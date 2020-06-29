import React from 'react';
import { Link } from 'react-router-dom';''

export default props => (
  <div>
    <header>
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
