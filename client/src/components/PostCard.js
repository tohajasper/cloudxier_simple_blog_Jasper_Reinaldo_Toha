import React from 'react'
import { useNavigate } from 'react-router'
export default function PostCard({ postData }) {
    let navigate = useNavigate()

    function toDetails(){
        navigate('/'+ postData.id)
    }

    return (
        <div type='button' onClick={() => toDetails()} className="card mb-3 rounded-3" style={{ width: '30rem' }}>
            <img src={postData.image_url} className="card-img-top mx-auto" style={{ maxHeight: '300px'}} alt="..." />
            <div className="card-body">
                <h5 className="card-title">{postData.title}</h5>
                <p className="card-text fw-light text-end">by {postData.author}</p>
            </div>
        </div>
    )
}
