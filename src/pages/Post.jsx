import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const getPosts = async (id) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return response.json();
}

const getComments = async (id) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
  return response.json();
}

const Post = () => {
    const {id} = useParams()

    const { isPending, error, data } = useQuery({
        queryKey: ['posts', id],
        queryFn: () => getPosts(id),
        staleTime: 10000,
    })

    const { isPending: commentsPending, error: commentsError, data: commentsData } = useQuery({
        queryKey: ['comments'],
        queryFn: () => getComments(id),
        enabled: !isPending,
        // staleTime: 10000,
    })

    if (isPending) {
        return <h1 className='text-3xl text-center my-8 font-bold text-gray-400'>Loading...</h1>;
    }

    if (error) {
        return <h1 className='text-3xl text-center my-8 font-bold text-gray-400'>Error: {error.message}</h1>;
    }

    return (
        <div className='m-4 max-w-[600px] w-4/5 mx-auto'>
            <Link to="/withquery"className='bg-gray-300 block w-fit my-8 mx-auto text-center py-2 px-4 hover:bg-gray-20'>With Query</Link>
            <h1 className='text-3xl text-center my-8 font-bold text-gray-400'>Posts Data</h1>
            <div key={data.id} className='p-4 rounded-lg border border-gray-200 my-6 cursor-pointer hover:bg-gray-900'>
                <h2 className='font-bold text-lg mb-2 text-gray-400'>{data.title}</h2>
                <p className='text-gray-400'>{data.body}</p>
            </div>
        </div>
    );
};

export default Post;