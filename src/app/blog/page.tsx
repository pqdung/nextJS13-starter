'use client'

import AppTable from '@/component/app.table';
import { useRouter } from 'next/navigation';
import Button from 'react-bootstrap/Button';
import useSWR from 'swr';

const Blog = () => {
    const router = useRouter();

    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data, error, isLoading } = useSWR(
        "http://localhost:8000/blogs",
        fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    }
    );

    if (!data) return <div>... loading</div>


    const backToHome = () => {
        router.push('/');
    }
    return (
        <div>
            <AppTable blogs={data?.sort((a: any, b: any) => b.id - a.id)} />
            <div>
                <Button variant='secondary' onClick={() => backToHome()}>Back To Home</Button>
            </div>
        </div>
    )
}

export default Blog;