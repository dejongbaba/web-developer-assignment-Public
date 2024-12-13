import {connection} from "../connection";
import {deletePostTemplate, insertPostTemplate, selectPostsTemplate} from "./query-tamplates";
import {Post} from "./types";
import {v4 as uuidv4} from 'uuid';
import {validatePost} from "../../validators/posts";

export const getPosts = (userId: string): Promise<{ count: number, posts: Post[] }> =>
    new Promise((resolve, reject) => {
        connection.all(selectPostsTemplate, [userId], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve({count: results.length, posts: results as Post[]});
        });
    });

export const addPost = (userId: string, title: string, body: string): Promise<void> => {
    validatePost({userId, title, body});
    return new Promise((resolve, reject) => {
        const createdAt = new Date().toISOString();
        const id = uuidv4().replace(/-/g, '')
        connection.run(
            insertPostTemplate,
            [id, userId, title, body, createdAt],
            function (error) {
                if (error) {
                    reject(error);
                }
                resolve();
            }
        );
    });
}


export const deletePost = (postId: string): Promise<void> =>
    new Promise((resolve, reject) => {
        connection.run(deletePostTemplate, [postId], function (error) {
            if (error) {
                reject(error);
            } else if (this.changes === 0) {
                reject(new Error("Post not found"));
            } else {
                resolve();
            }
        });
    });
