import React from 'react';
import { Link } from 'react-router-dom';

export default props => {
  const { layout } = props
  return (
    <div className='d-flex justify-content-between border-card p-4'>
      <div>
        <h2>{layout.name}</h2>
        <div>Params: {layout.params.join(',')}</div>
        <div className='grey'>ID: {layout._id}</div>
      </div>
      <div>
        <Link className='button-solid' to={`/layouts/${layout._id}`}>Edit</Link>
      </div>
    </div>
  )
}
