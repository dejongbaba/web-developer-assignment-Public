// import React, {useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import {getUsers} from "@/services/users";
import Grid from "@/components/ui/grid";
import {userColumns} from "@/pages/user/columns";
import {useNavigate} from "react-router";
import Heading from "@/components/ui/heading";
import {User} from "@/lib/definitions";
import {Row} from "@tanstack/react-table";
import {useState} from "react";
import Loader from "@/components/ui/loader";

const UserPage = () => {
    const [page, setPage] = useState(0);
    const router = useNavigate();
    const pageSize = 4;
    const {data, error, isLoading} = useQuery<Response, Error, any>({
        queryKey: ['users', page],
        queryFn: () => getUsers({pageSize, pageIndex: page}),
    })
    const handleNext = () => {
        if (data?.currentPage < data?.totalPages) {
            setPage((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (data?.currentPage > 1) {
            setPage((prev) => prev - 1);
        }
    };

    const handlePageClick = (pageNumber: number) => {
        setPage(pageNumber);
    };
    if (error) {
        return <div>
            Something went wrong!
        </div>
    }
    if (isLoading) {
        return <Loader/>
    }
    const onRowClick = (row: Row<User>) => {
        router(`/users/${row?.original?.id}/posts`, {
            state: {
                name: row?.original?.name,
                email: row?.original?.email
            }
        })
    }
    console.log('data', data)
    return (
        <div className='max-w-3xl m-auto my-6 lg:my-16 p-4 '>
            <div className='space-y-6'>
                <Heading title='Users'/>
                <Grid currentPage={data?.currentPage < 1 ? 1 : data?.currentPage}
                      totalPages={data?.totalPages}
                      onNext={handleNext}
                      onPrev={handlePrev}
                      onPageClick={handlePageClick}
                      data={data?.users || []} onRowClick={onRowClick}
                      columns={userColumns}/>
            </div>
        </div>
    );
}

export default UserPage;
