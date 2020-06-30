import React from 'react';
import { useParams } from 'react-router-dom';
import Api from '~/services/api';

export default () => {
  const params = useParams()
  const [layout, setLayout] = React.useState(null)

  React.useEffect(() => {
    (async () => {
      const resp = await Api.get(`layouts/${params.id}`)
      setLayout(resp.data)
    })()
  }, []);

  return (
    <div>
      <h1>{layout && layout._id}</h1>
    </div>
  )
}
