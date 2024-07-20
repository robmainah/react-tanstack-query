import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import WithoutQuery from './pages/WithoutQuery.jsx'
import WithQuery from './pages/WithQuery.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Post from './pages/Post.jsx'
import WithInfiniteQuery from './pages/WithInfiniteQuery.jsx'

const router = createBrowserRouter([
  {
    path: '',
    element: <App />
  },
  {
    path: '/withoutquery',
    element: <WithoutQuery />
  },
  {
    path: '/withquery',
    element: <WithQuery />
  },
  {
    path: '/withquery/:id',
    element: <Post />
  },
  {
    path: '/withinfinitequery',
    element: <WithInfiniteQuery />
  },
])

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <RouterProvider router={router}></RouterProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>,
)
