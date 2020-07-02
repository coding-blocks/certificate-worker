import React from 'react';
import { useDispatch } from 'react-redux';
import { ControlledEditor } from '@monaco-editor/react';
import { updateLayout, loadLayout } from '~/store/actions/layouts';

export default props => {
  const { layout } = props
  const dispatch = useDispatch()
  const [editingLayout, setEditingLayout] = React.useState({ name: layout.name, content: layout.content })
  const [loading, setLoading] = React.useState(false)

  const saveLayout = async () => {
    try {
      setLoading(true)
      await dispatch(updateLayout(layout._id, editingLayout))
      await dispatch(loadLayout(layout._id))
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='d-flex pl-0 col-12 col-md-6 col-lg-4 input-group align-items-center'>
            <label>Template Name: </label>
            <input 
              className='input-text'
              value={editingLayout.name} 
              onChange={e => setEditingLayout({ ...editingLayout, name: e.target.value})} 
            />
          </div>
          <div className='d-flex col-12 col-md-6 col-lg-4 justify-content-center'>
            <button className='button-solid' disabled={loading} onClick={saveLayout}>
              {loading ? 'Saving' : 'Save'}
            </button>
          </div>
        </div>
      </div>
      <div className='row no-gutters mt-4'>
        <div className='col-6'>
          <ControlledEditor 
            height='75vh'
            language='handlebars'
            value={editingLayout.content}
            onChange={(ev, value) => setEditingLayout({ ...editingLayout, content: value})}
            theme='dark'
          />
        </div>
        <div className='col-6'>
          <iframe srcDoc={editingLayout.content} className='w-100' style={{ height: '75vh' }}>
          </iframe>
        </div>
      </div>
    </div>
  )
}
