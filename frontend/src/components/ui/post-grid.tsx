import React from 'react';
import {PostGridProp} from "@/lib/definitions";
import PostCard from "@/components/ui/post-card";
import PostModal from "@/components/ui/post-modal";

const EmptyPost = () => {
    return <>
        <h1>No Post at the moment </h1>
        <div className='text-muted-foreground'>Click <span>here</span> to create post</div>
    </>
}

function PostGrid({posts, onComplete, onDeletePost}: PostGridProp) {
    return (
        <>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
                <PostModal onComplete={onComplete}>
                    <div>
                        <PostCard type='create'/>
                    </div>
                </PostModal>
                {!!posts?.length ? posts.map((p) => <PostCard id={p.id} title={p.title} body={p.body}
                                                              onDelete={onDeletePost}/>) : <EmptyPost/>}
            </div>
        </>
    );
}

export default PostGrid;