import React from 'react';
import {HeadingProp} from "@/lib/definitions";

function Heading({title}: HeadingProp) {
    return (
        <h1 className='text-5xl font-semibold tracking-tight'>{title}</h1>
    );
}

export default Heading;
