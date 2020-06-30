import React from 'react';
import { Link } from 'react-router-dom';
import Api from '~/services/api';

export default () => {
  const [layouts, setLayouts] = React.useState([])

  React.useEffect(() => {
    (async () => {
      const resp = await Api.get('layouts')
      setLayouts(resp.data)
    })()
  }, []);

  return (
    <div>
      <h1>Layouts !</h1>
      <ul>
        {layouts.map((layout, i) => 
          <li key={i}>
            <Link to={`/layouts/${layout._id}`}>{layout._id} - {layout.name}</Link>
          </li>
        )}
      </ul>
    </div>
  )
}
