import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';

import Post from './Posts';
import CreatePost from '../../components/CreatePost/CreatePost';
import Model from '../../components/CreatePost/Model';
import Spinner from '../../components/Spinner/Spinner';
import { postAction } from '../../actions/posts'
import './public.css';

const Publichome = () => {
    const [visibleComments, setVisibleComments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [loading , setLoading] = useState(false);

    /* Reducers*/
    const posts = useSelector(state => state.PostReducer);
    const User = useSelector((state) => state.CurrentUserReducer);
    
    const newpostref = useRef(null);
    const dispatch = useDispatch();


    useEffect(()=>{
        scrollToBottom()
    },[loading])
    
  const scrollToBottom = () => {
    newpostref.current?.scrollIntoView({ behavior: "smooth" });
  };

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
            const data = await dispatch(postAction(formData, User?.data?.result?._id));
            if(data.success){
                toast.success("Posted successfully")
            }
            setFile('');
            setDescription('');
            handleCloseModal();
        } catch (error) {
            console.error('Error uploading post:', error);
            toast.error('error in posting')
            // Handle error
        } finally {
           setIsUploading(false);
           setLoading(!loading);
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
            {
                isModalOpen && !isUploading &&
                (<Model User={User} setDescription={setDescription} setFile={setFile} onCloseModal={handleCloseModal} onSubmit={submitPost} user={User} />)
            }
            <div className='below-topnav-public'>
                <CreatePost User={User} onOpenModal={handleOpenModal} />
                {isUploading && <Spinner />}
                {
                    posts?.data?.length === 0 || posts?.data === null ? (<h1 style={{ textAlign: 'center' }}>Loading...</h1>) :
                        posts?.data.map(posts =>
                            <Post key={posts._id} postdetails={posts} toggleComments={toggleComments} visibleComments={visibleComments || []} />)
                }
                 <div ref={newpostref}></div> {/* Empty div for scrolling */}
            </div>
        </>
    )
}

export default Publichome;
