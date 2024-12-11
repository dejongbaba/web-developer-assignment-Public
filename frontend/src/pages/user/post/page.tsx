import React from 'react';
import Heading from "@/components/ui/Heading";
import Back from "@/components/ui/Back";
import PostGrid from "@/components/ui/post-grid";
import {useMutation, useQuery} from "@tanstack/react-query";
import {deletePost, getUsersPost} from "@/services/posts";
import {useParams} from "react-router";
import {useToast} from "@/hooks/use-toast";
import SubHeading from "@/components/ui/sub-heading";

const PostPage = (props) => {
    //fetch posts with id

    const {id} = useParams();
    console.log('id', id)
    const {toast} = useToast();
    const {data: posts, refetch, error, loading} = useQuery({queryKey: ['user-post'], queryFn: () => getUsersPost(id)});
    const {mutate} = useMutation<Response, Error, number>({
        mutationKey: ['delete-post'],
        mutationFn: (id) => deletePost(id),
        onSuccess: (res) => {
            refetch()
            toast({title: 'Success', description: 'Deleted post successfully!', className: "bg-green-500 text-white"})
        },
        onError: (e) => {
            console.log('e', e)
            toast({
                title: 'Error',
                description: 'Error occurred deleting post!',
                className: "bg-red-500 text-white"
            })
        }
    });
    console.log('posts', posts)
    if (error) {
        return 'Something went wrong'
    }
    if (loading) {
        return 'Loading...'
    }
    return (
        <div className='max-w-3xl m-auto lg:my-16 p-4'>
            <div className='space-y-4'>
                <Back title='Back to Users'/>
                <Heading title="Posts"/>
                <SubHeading postCount={4} email={'demo@email.com'}/>
                <PostGrid onComplete={() => refetch()} onDeletePost={(postId) => mutate(postId)} posts={posts}/>
            </div>
        </div>
    );
}

export default PostPage;
