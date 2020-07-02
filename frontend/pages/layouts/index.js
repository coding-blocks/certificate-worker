import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadLayouts } from '~/store/actions/layouts';
import { getLayouts } from '~/store/getters/layouts';
import LayoutCard from '~/components/layouts/LayoutCard';

export default () => {
  const layouts = useSelector(getLayouts())

  return (
    <div className='container'>
      <div className='d-flex justify-content-between'>
        <h2>Layouts !</h2>
        <Link to='layouts/new' className='button-solid'>
          Add +
        </Link>
      </div>
      {layouts.map((layout, i) => 
        <div key={i} className='mt-4'>
          <LayoutCard
            layout={layout}
          />
        </div>
      )}
    </div>
  )
}

export const action = ({ dispatch }) => dispatch(loadLayouts())
