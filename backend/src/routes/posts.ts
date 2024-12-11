import {Request, Response, Router} from "express";
import {addPost, deletePost, getPosts} from "../db/posts/posts";
import {validatePost} from "../validators/posts";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    const userId = req.query.userId?.toString();
    if (!userId) {
        res.status(400).send({error: "userId is required"});
        return;
    }
    const posts = await getPosts(userId);
    res.send(posts);
});
// Add a new post
router.post("/", async (req: Request, res: Response) => {
    const {title, body, userId} = req.body;

    try {
        validatePost({title, body, userId});
        const postId = await addPost(userId, title, body);
        res.status(201).send({message: "Post created successfully", postId});
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send({error: error.message});
        }
    }
});

// Delete a post by ID
router.delete("/:id", async (req: Request, res: Response) => {

    const postId = req.params.id;

    try {
        await deletePost(postId);
        res.status(200).send({message: "Post deleted successfully"});
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === "Post not found") {
                res.status(404).send({error: "Post not found"});
            } else {
                res.status(500).send({error: "Failed to delete post"});
            }
        } else {
            res.status(500).send({error: "Unknown error occurred"});
        }
    }
});
export default router;
