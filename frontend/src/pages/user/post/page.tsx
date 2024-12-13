import Back from "@/components/ui/back";
import PostGrid from "@/components/ui/post-grid";
import {useMutation, useQuery} from "@tanstack/react-query";
import {deletePost, getUsersPost} from "@/services/posts";
import {useLocation, useParams} from "react-router";
import {useToast} from "@/hooks/use-toast";
import SubHeading from "@/components/ui/sub-heading";
import Loader from "@/components/ui/loader";

const PostPage = () => {
    //fetch posts with id

    const {id} = useParams();
    const {state} = useLocation();
    const {name, email} = state;
    console.log('id', id)
    const {toast} = useToast();
    const {data, refetch, error, isLoading} = useQuery({
        queryKey: ['user-post'],
        queryFn: () => getUsersPost(id as string)
    });

    const {mutate} = useMutation<Response, Error, number>({
        mutationKey: ['delete-post'],
        mutationFn: (id) => deletePost(id),
        onSuccess: (res) => {
            console.log('res', res)
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
    console.log('name', state)
    if (error) {
        return 'Something went wrong'
    }
    if (isLoading) {
        return <Loader/>
    }
    return (
        <div className='max-w-4xl m-auto lg:my-16 p-4'>
            <div className=''>
                <Back title='Back to Users'/>
                <h1 className='text-5xl mb-4'>{name}</h1>
                <SubHeading postCount={data.count} email={email}/>
                <PostGrid onComplete={() => refetch()} onDeletePost={(postId) => mutate(postId)} posts={data.posts}/>
            </div>
        </div>
    );
}

export default PostPage;
