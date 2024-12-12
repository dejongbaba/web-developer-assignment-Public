import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import UserPage from '@/pages/user/page';
import {createBrowserRouter, Navigate, RouterProvider} from "react-router";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import PostPage from "@/pages/user/post/page";
import {Toaster} from "@/components/ui/toaster";

const router = createBrowserRouter([
    {path: '/', element: <Navigate to='/users' replace/>},
    {path: '/users', element: <UserPage/>},
    {path: '/users/:id/posts', element: <PostPage/>}
])
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
        },
    },
})

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
            <Toaster/>
        </QueryClientProvider>
    </StrictMode>,
)
