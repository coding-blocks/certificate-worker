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

  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const isLastPage = currentPage*pageSize > layouts.length

  function loadMoreLayouts(){
    if (!hasMore || isLoading) {
      return;
    }
    setIsLoading(true);
    dispatch(loadLayouts({offset: (currentPage-1) * pageSize, limit: pageSize}))
        .then(() => setIsLoading(false))
    if (isLastPage) {
      setHasMore(false);
    }
    setCurrentPage(isLastPage ? currentPage : currentPage + 1);
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
        hasMore={hasMore}
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

export const action = ({ dispatch }) => dispatch(loadLayouts({}))
