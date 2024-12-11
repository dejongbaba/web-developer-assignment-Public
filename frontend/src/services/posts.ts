import {del, get, post} from "@/services/index";
import {Post} from "@/lib/definitions";

export const getUsersPost = (id: string) => {
    return get('posts?userId=' + id)
}

export const deletePost = (id: number) => {
    return del(`posts/${id}`)
}
export const addPost = (body: Post) => {
    return post('posts', body)
}
