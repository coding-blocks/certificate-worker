import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getLayout } from '~/store/getters/layouts';
import { loadLayout } from '~/store/actions/layouts';
import LayoutEditor from '~/components/layouts/LayoutEditor';

export default () => {
  const params = useParams()
  const layout = useSelector(getLayout(params.id))

  return (
    <div>
      <div className='container'>
        <h2>{layout.name}</h2>
      </div>
      <div className='mt-4'>
        <LayoutEditor 
          layout={layout}
        />
      </div>
    </div>
  )
}

export const action = ({ dispatch, params }) => dispatch(loadLayout(params.id))
