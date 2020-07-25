import React from 'react';
import { useDispatch } from 'react-redux';
import { ControlledEditor } from '@monaco-editor/react';
import { updateLayout, createLayout } from '~/store/actions/layouts';

export default props => {
  const { layout } = props
  const dispatch = useDispatch()
  const [editingLayout, setEditingLayout] = React.useState({
    name: layout.name,
    content: layout.content,
    params: layout.params,
    height: layout.height || 408,
    width: layout.width || 842
  })
  const [loading, setLoading] = React.useState(false)

  const saveLayout = async () => {
    try {
      setLoading(true)
      if (layout._id) {
        await dispatch(updateLayout(layout._id, editingLayout))
      } else {
        const res = await dispatch(createLayout(editingLayout))
        props.onAfterCreate && props.onAfterCreate(res)
      }
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
          <div className='d-flex pl-0 col-12 col-md-5 input-group align-items-center'>
            <label>Template Name: </label>
            <input
              className='input-text col-lg-4'
              value={editingLayout.name}
              onChange={e => setEditingLayout({ ...editingLayout, name: e.target.value})} 
            />
            <label className='ml-2'>Width:&nbsp;</label>
            <input
                className='input-text col-lg-2'
                type='number'
                value={editingLayout.width}
                onChange={e => setEditingLayout({ ...editingLayout, width: e.target.value})}
            />
            <label className='ml-2'>Height:&nbsp;</label>
            <input
                className='input-text col-lg-2'
                type='number'
                value={editingLayout.height}
                onChange={e => setEditingLayout({ ...editingLayout, height: e.target.value})}
            />
          </div>
          <div className='d-flex col-12 col-md-4 col-lg-1 justify-content-center'>
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
          <iframe srcDoc={editingLayout.content} className='w-100' style={{height: `${50*editingLayout.height/editingLayout.width}vw`}}>
          </iframe>
        </div>
      </div>
    </div>
  )
}
