import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import CreateModal from './create.modal';
import { Button } from 'react-bootstrap';
import UpdateModal from './update.modal';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import { convertSlugUrl } from '@/utils/api';

interface IProps {
    blogs: IBlog[]
}

function AppTable(props: IProps) {
    const { blogs } = props;

    const [blog, setBlog] = useState<IBlog | null>(null);
    const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
    const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);

    const handleDelete = (id: number) => {
        if (confirm(`Do you want to delete blog no ${id}`)) {
            fetch(`http://localhost:8000/blogs/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(res => {
                    if (res) {
                        toast.success("Delete sucess!");
                        mutate("http://localhost:8000/blogs");
                    } else {
                        toast.error("Delete error!");
                    }
                });
        }

    }

    return (
        <>
            <div className='m-2' style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3>Blog Table</h3>
                <Button variant='secondary' onClick={() => setShowModalCreate(true)}>Add New</Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th style={{ width: '250px' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        blogs.map((item: IBlog) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.author}</td>
                                    <td style={{ width: '250px', display: 'flex', justifyContent: 'space-between' }}>
                                        <Link href={`/blog/${convertSlugUrl(item.title)}-${item.id}.html`} className='btn btn-primary'>View</Link>
                                        <Button variant='warning' type='button'
                                            onClick={() => {
                                                setBlog(item);
                                                setShowModalUpdate(true);
                                            }}
                                        >Edit</Button>
                                        <Button variant='secondary' type='button'
                                            onClick={() => handleDelete(item.id)}
                                        >Delete</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </Table>
            <CreateModal
                showModalCreate={showModalCreate}
                setShowModalCreate={setShowModalCreate}
            />
            <UpdateModal
                showModalCreate={showModalUpdate}
                setShowModalCreate={setShowModalUpdate}
                blog={blog}
                setBlog={setBlog}
            />
        </>
    );
}

export default AppTable;