import React from 'react';
import { useDispatch } from 'react-redux';
import Loading from '~/components/common/loading';

export default props => {
  const dispatch = useDispatch()
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    props.action && (async () => {
      setLoading(true)
      await dispatch(props.action())
      setLoading(false)
    })()
  }, [])

  return (loading ? <Loading /> : <>{props.children}</>)
}
