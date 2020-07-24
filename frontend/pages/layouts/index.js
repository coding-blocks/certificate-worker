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
  const isLastPage = currentPage*pageSize > layouts.length

  const loadMoreLayouts = async () => {
    if (isLastPage || isLoading) {
      return;
    }
    
    try {
      setIsLoading(true);
      await dispatch(loadLayouts({
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
