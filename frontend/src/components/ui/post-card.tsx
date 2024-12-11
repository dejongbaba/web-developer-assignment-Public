import React from 'react';
import {PostCardProp} from "@/lib/definitions";
import {Card, CardDescription} from "@/components/ui/card";
import {CirclePlus, Trash2} from "lucide-react";

function PostCard({title, body, id, onDelete, type}: PostCardProp) {

    if (type == 'create') {
        return (
            <div
                className='relative border-dashed border border-2 rounded-lg  text-muted-foreground flex justify-center items-center h-full min-h-[250px]'>
                <div className='text-center'>
                    <CirclePlus className='w-5 mx-auto h-5'/>
                    <h4>New Post</h4>
                </div>
            </div>
        )
    }
    return (
        <Card className='relative h-[250px] p-4  space-y-5 lg:space-y-3'>
            <div onClick={() => id && onDelete(id)} className='absolute right-3 top-3'>
                <Trash2 className='w-4 h-4 text-red-500'/>
            </div>
            <h2 className='font-normal text-lg text-gray-600'>
                {title}
            </h2>
            <CardDescription
                className='overflow-hidden h-[100px] truncate text-wrap '>{body}</CardDescription>
        </Card>
    );
}

export default PostCard;
