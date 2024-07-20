import { keepPreviousData, useInfiniteQuery, useQueries, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const getPosts = async (page) => {
    // console.log(page);
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page.pageParam}`);
  return response.json();
}

const WithInfiniteQuery = () => {
    const { isPending, error, data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
        staleTime: 10000,
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            console.log(allPages);
            return lastPage.length == 0 ? null : allPages.length + 1
        }
    })

    const posts = data ? data.pages.flatMap((page => page)) : []
    // const posts = data ? data.pages.flatMap((page => page)) : []

    if (isPending) {
        return <h1 className='text-3xl text-center my-8 font-bold text-gray-400'>Loading...</h1>;
    }

    if (error) {
        return <h1 className='text-3xl text-center my-8 font-bold text-gray-400'>Error: {error.message}</h1>;
    }

    return (
        <div className='m-4 max-w-[600px] w-4/5 mx-auto'>
            <Link to="/withoutquery"className='bg-gray-300 block w-fit my-8 mx-auto text-center py-2 px-4 hover:bg-gray-20'>Without Query</Link>
            <h1 className='text-3xl text-center my-8 font-bold text-gray-400'>Posts Data</h1>
            <div className={`${isFetching ? 'bg-gray-300 opacity-50' : ''}`}>
                {posts.map(post => {
                    return (
                        <Link to={`${post.id}`} key={post.id} className='p-4 rounded-lg block border border-gray-200 my-6 cursor-pointer hover:bg-gray-900'>
                            <h2 className='font-bold text-lg mb-2 text-gray-400'>{post.title}</h2>
                            <p className='text-gray-400'>{post.body}</p>
                        </Link>
                    )
                })}
            </div>
            {hasNextPage && (<button disabled={isFetchingNextPage} className='px-3 py-1 bg-blue-500 rounded-md text-white font-bold' onClick={() => fetchNextPage()}>load more</button>)}
            {/* <div className='flex items-center justify-center gap-2'>
                <button className='px-3 py-1 bg-blue-500 rounded-md text-white font-bold' onClick={() => setPage(prev => prev > 1 ? prev - 1 : 1)}>Prev</button>
                <p className='text-gray-100'>Current page: {page}</p>
                <button className='px-3 py-1 bg-blue-500 rounded-md text-white font-bold' onClick={() => setPage(prev => prev + 1)}>Next</button>
            </div> */}
        </div>
    );
};

export default WithInfiniteQuery;