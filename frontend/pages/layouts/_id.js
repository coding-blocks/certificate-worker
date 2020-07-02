import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getLayout } from '~/store/getters/layouts';
import { loadLayout } from '~/store/actions/layouts';


export default () => {
  const params = useParams()
  const layout = useSelector(getLayout(params.id))

  return (
    <div>
      <h1>{layout && layout._id}</h1>
    </div>
  )
}

export const action = ({ dispatch, params }) => dispatch(loadLayout(params.id))
