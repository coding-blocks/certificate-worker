import React from 'react';
import { useDispatch } from 'react-redux';
import { ControlledEditor } from '@monaco-editor/react';
import { updateLayout, createLayout } from '~/store/actions/layouts';
import GenerateNowModal from './GenerateNowModal'

export default props => {
  const { layout } = props
  const dispatch = useDispatch()
  const [editingLayout, setEditingLayout] = React.useState({
    name: layout.name,
    content: layout.content,
    params: layout.params,
    height: layout.height || 408,
    width: layout.width || 842,
    useHtmlPdf: !!layout.useHtmlPdf
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

  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div>
      <GenerateNowModal isOpen={isModalOpen} closeModal={closeModal} layout={layout} />
      <div className='container'>
        <div className='row'>
          <div className='d-flex pl-0 input-group align-items-center'>

            <label>Template Name: </label>
            <input
              className='input-text'
              value={editingLayout.name}
              onChange={e => setEditingLayout({ ...editingLayout, name: e.target.value })}
            />
            <label className='ml-2'>Width:&nbsp;</label>
            <input
              className='input-text'
              type='number'
              value={editingLayout.width}
              onChange={e => setEditingLayout({ ...editingLayout, width: e.target.value })}
            />
            <label className='ml-2'>Height:&nbsp;</label>
            <input
              className='input-text'
              type='number'
              value={editingLayout.height}
              onChange={e => setEditingLayout({ ...editingLayout, height: e.target.value })}
            />
            <label className='ml-2'>Use HTML-PDF:&nbsp;</label>
            <input
              className=''
              type='checkbox'
              checked={editingLayout.useHtmlPdf}
              onChange={e => setEditingLayout({ ...editingLayout, useHtmlPdf: !editingLayout.useHtmlPdf })}
            />
          </div>
          <div className='d-flex justify-content-center mx-3'>
            <button className='button-solid' disabled={loading} onClick={saveLayout}>
              {loading ? 'Saving' : 'Save'}
            </button>
          </div>
          <div className='d-flex justify-content-center'>
            <button className='button-solid' disabled={loading} onClick={openModal}>
              Generate Certificate
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
            onChange={(ev, value) => setEditingLayout({ ...editingLayout, content: value })}
            theme='dark'
          />
        </div>
        <div className='col-6'>
          <iframe srcDoc={editingLayout.content} className='w-100' style={{ height: `${50 * editingLayout.height / editingLayout.width}vw` }}>
          </iframe>
        </div>
      </div>
    </div >
  )
}
