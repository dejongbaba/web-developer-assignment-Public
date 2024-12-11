import React, {useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import {getUsers} from "@/services/users";
import Grid from "@/components/ui/grid";
import {userColumns} from "@/pages/user/columns";
import {useNavigate} from "react-router";
import Heading from "@/components/ui/heading";

const UserPage = () => {

    const [params, setParams] = useState({})
    const {data, error, isLoading} = useQuery<Response, Error, any>({
        queryKey: ['users'],
        queryFn: () => getUsers(params)
    })

    const router = useNavigate();
    if (error) {
        return <div>
            Something went wrong!
        </div>
    }
    if (isLoading) {
        return <div>
            Loading...
        </div>
    }
    console.log('user page', data);
    const onRowClick = (row) => {
        router(`/users/${row?.original?.id}/posts`)
    }
    return (
        <div className='max-w-3xl m-auto my-6 lg:my-16 p-4 '>
            <div className='space-y-6'>
                <Heading title='Users'/>
                <Grid data={data?.users || []} onRowClick={onRowClick} columns={userColumns}/>
            </div>
        </div>
    );
}

export default UserPage;
