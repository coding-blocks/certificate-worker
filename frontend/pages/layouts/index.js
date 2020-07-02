import React from 'react';
import { useSelector } from 'react-redux';
import { loadLayouts } from '~/store/actions/layouts';
import { getLayouts } from '~/store/getters/layouts';
import LayoutCard from '~/components/layouts/LayoutCard';

export default () => {
  const layouts = useSelector(getLayouts())

  return (
    <div className='pt-5'>
      <h2>Layouts !</h2>
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
