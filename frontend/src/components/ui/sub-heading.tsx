import {HeadingProp} from "@/lib/definitions";

function SubHeading({email, postCount}: HeadingProp) {

    const postsToText = (posts: number) => {
        if (posts > 1) {
            return `${posts} posts`
        }
        return `${posts} post`
    }
    return (
        <div className='mb-6 text-sm font-normal'>
            <span className='text-muted-foreground'>{email}</span> <span
            className='font-normal'>&#x2022; {postsToText(postCount)}</span></div>
    );
}

export default SubHeading;
