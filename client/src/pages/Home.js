import React, { useEffect, useState } from 'react'
import PostCard from '../components/PostCard'
import {
    Link
} from "react-router-dom";

export default function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/posts')
            .then(res => res.json())
            .then((res) => {
                setPosts(res)
            })
            .catch(error => console.log(error))

    }, [])

    return (
        <div>
            <div id='head' className='mb-5 d-flex'>
                <Link to='/newBlog' className='btn btn-primary'><i className="bi bi-plus-lg me-2"></i>Create Blog</Link>
            </div>

            {
                posts.length ?
                    <>
                        <h2 className='mb-4'>Recent Blogs</h2>
                        <div className='d-flex flex-column align-items-center'>
                            {
                                 posts.map(post => {
                                    return <PostCard key={post.id} postData={post} />
                                })
                            }
                        </div>
                    </>
                    :
                    <p className="fs-3 fst-italic fw-light">There are no blogs yet, feel free to create one</p>
            }
            {/* <p>{JSON.stringify(posts)}</p> */}
        </div>
    );
}
