import Joi from 'joi';

const postSchema = Joi.object({
    userId: Joi.string().min(3).max(255).required(),
    title: Joi.string().min(3).max(255).required(),
    body: Joi.string().min(5).required(),
});

export const validatePost = (data: { userId: string; title: string; body: string }) => {
    const {error} = postSchema.validate(data);
    if (error) {
        throw new Error(error.message);
    }
};
