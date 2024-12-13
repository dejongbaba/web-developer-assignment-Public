import {PostCardProp} from "@/lib/definitions";
import {Card, CardDescription} from "@/components/ui/card";
import {CirclePlus, Trash2} from "lucide-react";

function PostCard({title, body, id, onDelete, type}: PostCardProp) {

    if (type == 'create') {
        return (
            <div
                className='relative border-dashed border border-2 rounded-lg  text-muted-foreground flex justify-center items-center h-full min-h-[250px]'>
                <div className='text-center'>
                    <CirclePlus className='w-5 mb-1 mx-auto h-5'/>
                    <h4 className='font-semibold text-sm'>New Post</h4>
                </div>
            </div>
        )
    }
    return (
        <Card className='relative h-[250px] shadow-none transition hover:shadow-lg p-4  space-y-5 lg:space-y-3'>
            <div onClick={() => id && onDelete && onDelete(id)} className='absolute right-3 top-3'>
                <Trash2 className='w-3 cursor-pointer h-3 text-red-500'/>
            </div>
            <h2 className='font-normal line-clamp-2 text-lg text-gray-600'>
                {title}
            </h2>
            <CardDescription
                className='overflow-hidden line-clamp-5 truncate text-wrap '>{body}</CardDescription>
        </Card>
    );
}

export default PostCard;
