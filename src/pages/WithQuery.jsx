import { useQueries, useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const getPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  return response.json();
}

const getUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  return response.json();
}

const WithQuery = () => {
    const [{ isPending, error, data }, { isPending: userPending, error: userError, data: userData }] = useQueries({
        queries: [
            { queryKey: ['posts'], queryFn: getPosts, staleTime: 10000 },
            { queryKey: ['users'], queryFn: getUsers, staleTime: 10000 },
        ]
    })

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
            {data && data.map(post => {
                return (
                    <Link to={`${post.id}`} key={post.id} className='p-4 block rounded-lg border border-gray-200 my-6 cursor-pointer hover:bg-gray-900'>
                        <h2 className='font-bold text-lg mb-2 text-gray-400'>{post.title}</h2>
                        <p className='text-gray-400'>{post.body}</p>
                    </Link>
                )
            })}
        </div>
    );
};

export default WithQuery;