import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { Link, useNavigate } from 'react-router-dom';

export default function FormBlog() {
    let { blogId } = useParams()
    let navigate = useNavigate()
    let [isEdit, setEdit] = useState(false)
    let [input, setInput] = useState({
        title: '',
        author: '',
        image_url: '',
        content: '',
    })

    useEffect(() => {
        if (blogId) {
            setEdit(true)
            fetch('http://localhost:3000/posts/' + blogId)
                .then(res => res.json())
                .then((result) => {
                    setInput(result)
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }, [blogId])

    function inputHandle(e) {
        switch (e.target.name) {
            case 'title':
                setInput({ ...input, title: e.target.value })
                break;
            case 'author':
                setInput({ ...input, author: e.target.value })
                break;
            case 'content':
                setInput({ ...input, content: e.target.value })
                break;
            case 'image_url':
                setInput({ ...input, image_url: e.target.value })
                break;
            default:
                break;
        }
    }

    function onSubmit() {
        if(isEdit){
            fetch('http://localhost:3000/posts/' + blogId, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(input)
            })
                .then(res => res.json())
                .then((res) => {
                    console.log(res)
                    navigate('/' + blogId)
                })
                .catch(error => console.log(error))

        }else{

            fetch('http://localhost:3000/posts', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(input)
            })
                .then(res => res.json())
                .then((res) => {
                    console.log(res)
                    navigate('/')
                })
                .catch(error => console.log(error))
        }
    }

    return (
        <div>
            <h2 className='mb-5'> {isEdit ? 'Edit Blog' : 'New Blog'}</h2>
            <div id="form" className="mb-5" style={{ width: '400px' }}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="string" value={input.title} name="title" onChange={(e) => inputHandle(e)} className="form-control" placeholder="How to cook" />
                </div>

                <div className="mb-3">
                    <label className="form-label">Author</label>
                    <input type="string" value={input.author} name="author" onChange={(e) => inputHandle(e)} className="form-control" placeholder="John Doe" />
                </div>

                <div className="mb-3">
                    <label className="form-label">Image</label>
                    <input type="string" value={input.image_url} name="image_url" onChange={(e) => inputHandle(e)} className="form-control" placeholder="www.google.com" />
                </div>

                <div className="mb-3">
                    <label className="form-label">Content</label>
                    <textarea className="form-control" value={input.content} name="content" onChange={(e) => inputHandle(e)} rows="3"></textarea>
                </div>

                <div>
                    <Link to='/' type="button" className="btn btn-danger" style={{ width: "100px" }}>Cancel</Link>
                    <button type="button" className="ms-5 btn btn-primary" onClick={() => onSubmit()} style={{ width: "100px" }}>Save</button>
                </div>
            </div>
        </div>
    )
}
