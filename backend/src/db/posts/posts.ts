import {connection} from "../connection";
import {deletePostTemplate, insertPostTemplate, selectPostsTemplate} from "./query-tamplates";
import {Post} from "./types";
import {validatePost} from "../../validators/posts";

export const getPosts = (userId: string): Promise<Post[]> =>
    new Promise((resolve, reject) => {
        connection.all(selectPostsTemplate, [userId], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results as Post[]);
        });
    });

export const addPost = (userId: string, title: string, body: string): Promise<void> => {
    validatePost({userId, title, body});
    return new Promise((resolve, reject) => {
        const createdAt = new Date().toISOString(); // Set the current timestamp
        connection.run(
            insertPostTemplate,
            [userId, title, body, createdAt],
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
