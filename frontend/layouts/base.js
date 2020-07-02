import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from '~/store/getters/session';
import Navbar from '~/components/navbar';

export default props => {
  const user = useSelector(getUser())

  return (
    <div>
      <Navbar />
      {props.children}
    </div>
  )
}
