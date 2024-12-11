import React from 'react';
import {BackProp} from "@/lib/definitions";
import {ArrowLeft} from "lucide-react";
import {useNavigate} from "react-router";

function Back({title}: BackProp) {
    const router = useNavigate();
    return (
        <div className='flex text-sm font-semibold cursor-pointer items-center gap-3 text-muted-foreground'>
            <ArrowLeft className='w-5 h-5'/> <span onClick={() => router(-1)}>{title}</span>
        </div>
    );
}

export default Back;
