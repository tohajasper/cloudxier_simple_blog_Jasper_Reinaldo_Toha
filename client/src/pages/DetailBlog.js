import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

export default function DetailBlog() {
    let navigate = useNavigate()
    let { blogId } = useParams()
    let [blog, setBlog] = useState({})

    useEffect(() => {
        fetch('http://localhost:3000/posts/' + blogId)
            .then(res => res.json())
            .then((result) => {
                setBlog(result)
            })
            .catch(error => {
                console.log(error);
            })
    }, [blogId])

    function deleteHandle(){
        fetch('http://localhost:3000/posts/'+ blogId, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then((res) => {
                console.log(res)
                navigate('/')
            })
            .catch(error => console.log(error))
    }

    function editHandle(){
        navigate('/editBlog/'+ blogId)
    }

    return (
        <div>
            <div className="d-flex justify-content-between">
                <h1>{blog.title}</h1>
                <span>
                    <button className='btn btn-warning me-2' onClick={() => editHandle()}><i className="bi bi-pencil-square"></i></button>
                    <button className='btn btn-danger' onClick={() => deleteHandle()}><i className="bi bi-trash"></i></button>
                </span>
            </div>
            <p className='fst-italic fw-light'>by {blog.author}, {new Date(blog.updatedAt).toString()}</p>
            {
                blog.image_url ?
                    <img className='my-5 mx-auto d-block' style={{ maxHeight: '500px'}} src={blog.image_url} alt="" />
                    :
                    ''
            }
            <p>{blog.content}</p>
        </div>
    )
}
