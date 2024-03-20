import React from 'react'
import './createPost.css'
import { LiaPlusCircleSolid } from "react-icons/lia";

const CreatePost = ({ User , onOpenModal }) => {

    return (
        User &&
        <div onClick={onOpenModal} className='createPost-container' >
            <div className='createPost'>
                <div className='plus-mid'><LiaPlusCircleSolid /></div>
                <p>Create Post</p>
            </div>
        </div>

    )
}

export default CreatePost