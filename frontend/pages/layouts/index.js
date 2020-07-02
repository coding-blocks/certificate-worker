import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadLayouts } from '~/store/actions/layouts';
import { getLayouts } from '~/store/getters/layouts';

export default () => {
  const layouts = useSelector(getLayouts())

  return (
    <div>
      <h1>Layouts !</h1>
      <ul>
        {layouts.map((layout, i) => 
          <li key={i}>
            <Link to={`/layouts/${layout._id}`}>{layout._id} - {layout.name}</Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export const action = ({ dispatch }) => dispatch(loadLayouts())
