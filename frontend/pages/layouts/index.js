import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadLayouts } from '~/store/actions/layouts';
import { getLayouts } from '~/store/getters/layouts';
import LayoutCard from '~/components/layouts/LayoutCard';
import InfiniteScroll from "react-infinite-scroller";


export default () => {
  const layouts = useSelector(getLayouts())
  const dispatch = useDispatch()
  const pageSize = 10

  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('')
  const isLastPage = currentPage*pageSize > layouts.length

  const searchLayouts = async (q) => {
    if (q === query || isLoading) {
      return
    }

    try {
      setIsLoading(true);
      await dispatch(loadLayouts({
        q,
        offset: 0,
        limit: pageSize,
        unloadAll: true
      }))
    } catch(err) {
      console.log(err)
    } finally {
      setIsLoading(false)
      setCurrentPage(0)
      setQuery(q)
    }
  }

  const loadMoreLayouts = async () => {
    if (isLastPage || isLoading) {
      return;
    }
    
    try {
      setIsLoading(true);
      await dispatch(loadLayouts({
        q: query,
        offset: (currentPage + 1) * pageSize, 
        limit: pageSize
      }))
      setCurrentPage(currentPage + 1)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='container'>
      <div className='d-flex justify-content-between'>
        <h2>Layouts !</h2>
        <Link to='layouts/new' className='button-solid'>
          Add +
        </Link>
      </div>
      <div className='pull-right'>
        <input
            className='input-text'
            value={query}
            placeholder="Search Layouts..."
            onChange={e => searchLayouts(e.target.value)}
            style={{fontSize: '20px', marginBottom: '10px', marginTop: '10px'}}
        />
      </div>
      <InfiniteScroll
        pageStart={1}
        hasMore={!isLastPage}
        loadMore={loadMoreLayouts}
      >
        {layouts.map((layout, i) =>
            <div key={i} className='mt-4'>
              <LayoutCard
                  layout={layout}
              />
            </div>
        )}
      </InfiniteScroll>
    </div>
  )
}

export const action = ({ dispatch }) => dispatch(loadLayouts())
