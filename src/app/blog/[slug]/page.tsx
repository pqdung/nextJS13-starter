'use client'

import Image from 'next/image';
import Link from 'next/link';
import Card from 'react-bootstrap/Card';
import useSWR, { Fetcher } from 'swr';

const BlogPage = ({ params }: { params: { slug: string } }) => {

    const tempId1 = params?.slug?.split('.html') ?? [];
    const tempId2 = tempId1[0]?.split('-') ?? [];
    const id = tempId2[tempId2.length - 1];

    const fetcher: Fetcher<IBlog, string> = (url: string) => fetch(url).then((res) => res.json());

    const { data, error, isLoading } = useSWR(
        `http://localhost:8000/blogs/${id}`,
        fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    }
    );

    if (!data) return <div>... loading</div>

    return (
        <div className='m-2'>
            <Link href={'/blog'}>Go back</Link>
            <Card className='text-center'>
                <Card.Body>
                    <Card.Title>Title: {data?.title}</Card.Title>
                    <Card.Text style={{
                        position: 'relative', width: '100%', height: '400px'
                    }}>
                        {/* <img src={data.img} alt="" width="500" height="350" /> */}
                        <Image src={data.img} alt=''
                            fill style={{ objectFit: 'cover' }}
                        />
                    </Card.Text>
                    <Card.Text>
                        <a href={data.link} target='_blank'>
                            <span>{data.link}</span>
                        </a>
                    </Card.Text>
                    <Card.Text>
                        {data?.content}
                    </Card.Text>
                </Card.Body>
                <Card.Footer className='text-muted'>Author: {data?.author}</Card.Footer>
            </Card>
        </div>
    )
}

export default BlogPage;