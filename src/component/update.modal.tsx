'use client'
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

interface IProps {
    showModalCreate: boolean;
    setShowModalCreate: (value: boolean) => void;
    blog: IBlog | null;
    setBlog: (value: IBlog | null) => void;
}

function UpdateModal(props: IProps) {
    const { showModalCreate, setShowModalCreate, blog, setBlog } = props;
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [link, setLink] = useState<string>('');
    const [img, setImg] = useState<string>('');
    const [id, setId] = useState<number>(0);

    useEffect(() => {
        if (blog && blog.id) {
            setId(blog.id);
            setTitle(blog.title);
            setAuthor(blog.author);
            setContent(blog.content);
            setLink(blog.link);
            setImg(blog.img);
        }
    }, [blog]);

    const handleCloseModal = () => {
        setTitle('');
        setAuthor('');
        setContent('');
        setLink('');
        setImg('');
        setBlog(null);
        setShowModalCreate(false);
    }

    const handleSave = () => {
        if (!title) {
            toast.warning("Not Empty title!");
            return;
        }
        if (!author) {
            toast.warning("Not Empty author!");
            return;
        }
        if (!content) {
            toast.warning("Not Empty content!");
            return;
        }
        fetch(`http://localhost:8000/blogs/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, author, content, link, img })
        }).then(res => res.json())
            .then(res => {
                if (res) {
                    toast.success("Update sucess!");
                    handleCloseModal();
                    mutate("http://localhost:8000/blogs");
                } else {
                    toast.error("Update error!");
                }
            });

    }

    return (
        <>
            <Modal
                show={showModalCreate}
                onHide={() => handleCloseModal()}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={title} placeholder="..." onChange={(e) => { setTitle(e.target.value) }} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Author</Form.Label>
                            <Form.Control type="text" value={author} placeholder="..." onChange={(e) => { setAuthor(e.target.value) }} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Content</Form.Label>
                            <Form.Control as="textarea" rows={3} value={content} onChange={(e) => { setContent(e.target.value) }} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Link</Form.Label>
                            <Form.Control type="text" value={link} placeholder="..." onChange={(e) => { setLink(e.target.value) }} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="text" value={img} placeholder="..." onChange={(e) => { setImg(e.target.value) }} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModal()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSave()}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateModal;