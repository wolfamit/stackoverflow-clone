import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import Post from './Post';
import Leftsidebar from '../../components/LeftsideBar/Leftsidebar';
import CreatePost from '../../components/CreatePost/CreatePost';
import Model from '../../components/CreatePost/Model';
import Spinner from '../../components/Spinner/Spinner';
import { postAction } from '../../actions/posts'
import './public.css';

const Publichome = ({ User }) => {
    const [visibleComments, setVisibleComments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    /* Reducers*/
    const posts = useSelector(state => state.PostReducer)

    const dispatch = useDispatch();

    /* To open post model*/
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    /* To close post model*/
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    /* To Submit post */
    const submitPost = async (e) => {
        e.preventDefault();
        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('description', description);
        try {
            await dispatch(postAction(formData , User?.data?.result?._id));
            setFile('');
            setDescription('');
            handleCloseModal();
        } catch (error) {
            console.error('Error uploading post:', error);
            // Handle error
        } finally {
            setIsUploading(false); // Set upload status to false
        }
    }

    /* To toggle comment section*/
    const toggleComments = (postId) => {
        setVisibleComments(prevState => {
            // Check if the postId is already in the visibleComments array
            if (prevState.includes(postId)) {
                // If the postId is already in the array, remove it using filter
                return prevState.filter(id => id !== postId);
            } else {
                // If the postId is not in the array, add it to the end using spread syntax
                return [...prevState, postId];
            }
        });
    };

    return (
        <>
            <Leftsidebar />

            {
                isModalOpen && !isUploading && (
                    <Model User={User} setDescription={setDescription} setFile={setFile} onCloseModal={handleCloseModal} onSubmit={submitPost} user={User} />

                )
            }
            <div className='below-topnav-public'>
                <CreatePost User={User} onOpenModal={handleOpenModal} />
                {isUploading && <Spinner /> }
                {
                    posts?.data?.length === 0 || posts?.data === null ? (<h1 style={{ textAlign: 'center' }}>Loading...</h1>) :
                    posts?.data.map(posts =>
                            <Post key={posts._id} postdetails={posts} toggleComments={toggleComments} visibleComments={visibleComments || []} />
                        )
                }
            </div>
        </>
    )
}

export default Publichome;
