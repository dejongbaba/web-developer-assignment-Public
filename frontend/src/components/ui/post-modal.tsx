import React, {ReactNode, useState} from 'react';
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger} from "@/components/ui/dialog";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {useMutation} from "@tanstack/react-query";
import {addPost} from "@/services/posts";
import {useParams} from "react-router";
import {Button} from "@/components/ui/button";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {useToast} from "@/hooks/use-toast";
import Heading from "@/components/ui/heading";


const FormSchema = z.object({
    title: z.string({message: 'Title is required'}),
    body: z.string({message: 'Body is required'}),
    userId: z.string({message: 'User ID is required'})
})
type FormType = z.infer<typeof FormSchema>

function PostModal({children, onComplete}: { children: ReactNode, onComplete: (res: Response) => void }) {

    const {id} = useParams();
    const form = useForm({
        defaultValues: {title: '', body: '', userId: id}, resolver: zodResolver(FormSchema),
    });
    const [open, setOpen] = useState(false);
    const {toast} = useToast();
    const {mutate, isPending} = useMutation<Response, Error, FormType>({
        mutationKey: ['create-post'],
        mutationFn: (val) => addPost({title: val.title, userId: val.userId, body: val.body}),
        onSuccess: (res) => {
            toast({
                title: "Success",
                description: res?.message || "Post created successfully",
                className: "bg-green-500 text-white"
            })
            setOpen(false);
            onComplete && onComplete(res)
        }
    })
    const onSubmit = (value: FormType) => {
        console.log('submitted', value)
        mutate(value);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children ? children : <span>Open</span>}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <Heading title='New Post'/>
                </DialogHeader>
                <Form {...form}>
                    <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className='text-lg'>Post Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Give your post a title" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="body"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className='text-lg'>Post Content</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Write something mind-blowing" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <DialogClose>
                                <Button variant='outline'>Cancel</Button>
                            </DialogClose>
                            <Button loading={isPending} disabled={isPending} type='submit'>Publish</Button>
                        </DialogFooter>
                    </form>
                </Form>


            </DialogContent>
        </Dialog>
    );
}

export default PostModal;