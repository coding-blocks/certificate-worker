import React from 'react';
import { useHistory } from 'react-router-dom';
import LayoutEditor from '~/components/layouts/LayoutEditor';

export default () => {
  const history = useHistory()
  const layout = {
    name: 'Untitled',
    content: '<html></html>',
    params: []
  }

  const onAfterCreate = res => {
    history.push(`/layouts/${res.payload.data.value._id}`)
  }

  return (
    <div>
      <div className='container'>
        <h2>{layout.name}</h2>
      </div>
      <div className='mt-4'>
        <LayoutEditor 
          layout={layout}
          onAfterCreate={onAfterCreate}
        />
      </div>
    </div>
  )
}
