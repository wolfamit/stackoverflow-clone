import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BiSolidUpArrow } from "react-icons/bi";
import { IoIosSend } from "react-icons/io";
import { BiSolidDownArrow } from "react-icons/bi";
import { FaCommentAlt } from "react-icons/fa";
import { FiShare } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import moment from 'moment';

import Avatar from '../../components/Avatar/Avatar.jsx';
import { Likepost, disLikepost, postComments, deletePost, addFriend, removeFriend } from '../../actions/posts.js'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import VideoPlayer from '../../components/CreatePost/VedioPlayer.jsx';
import './public.css'

const Post = ({ postdetails, toggleComments, visibleComments }) => {
    const [comment, setComment] = useState('')
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isMyPost, setIsMyPost] = useState(false)
    const [isMyFriend, setisMyFriend] = useState(true)
    const user = useSelector(state => state.CurrentUserReducer);
    const showComments = visibleComments.includes(postdetails._id);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.data.result.friends.includes(postdetails.userId)) {
            setisMyFriend(true); // Update isMyFriend if the post author is in the user's friend list
        }
    }, [user, postdetails]);

    const handleToast = (message) => {
        return toast(message);
    }

    const handleLike = async () => {
        if (!user) return;
        await dispatch(Likepost(postdetails._id, user.data.result._id, 'LIKE'))
        handleToast('liked successfully')
    }

    const handleDislike = async () => {
        await dispatch(disLikepost(postdetails._id, user.data.result._id, 'DISLIKE'))
        handleToast("Thank you for your feedback")
    }

    const handleUserToast = () => {
        navigate('/Auth')
        toast.error("You need to be logged in to comment");
    }

    const handleComment = async (e) => {
        e.preventDefault();
        if (comment.length === 0) {
            toast.error("Please enter a comment");
            return;
        }
        try {
            await dispatch(postComments(postdetails._id, user.data.result._id, comment))
            handleToast('Comment accepted')
            setComment('');
        } catch (error) {
            handleToast(error.message);
        }
    }

    const menuOpen = () => {
        setIsMenuOpen(!isMenuOpen)
        console.log(user.data.result._id, postdetails.userId)
        if (user.data.result._id === postdetails.userId) {
            setIsMyPost(!isMyPost)
        }
        if (user.data.result.friends.includes(postdetails.userId)) {
            setisMyFriend(!isMyFriend)
        }
    }

    const handleDeletePost = (e) => {
        e.preventDefault();
        const postId = postdetails._id;
        dispatch(deletePost(postId));
    }

    const follow = (e) => {
        e.preventDefault();
        const friendId = postdetails.userId;
        const userId = user.data.result._id;
        dispatch(addFriend(friendId, userId))
        toast.success('Added in your friend list')
    }

    const unfollow = (e) => {
        e.preventDefault();
        const friendId = postdetails.userId;
        const userId = user.data.result._id;
        dispatch(removeFriend(friendId, userId))
        toast.success('Added in your friend list')
    }
    return (
        <section className='public-middle-section'>
            <div className="post">
                {/**Post HEADER WITH IMAGE LOCATION ETC */}
                <div className="post-header">
                    <div>
                        <Link to={`/Users/${postdetails.userId}`}>
                            <Avatar
                                py='30px'
                                px='30px'
                                borderRadius='50%'
                                imageSrc={postdetails?.userPicturePath && postdetails.userPicturePath.length <= 30 ? `${process.env.REACT_APP_BASE_URL}/assets/${postdetails.picturePath}` : postdetails?.userPicturePath}
                            />
                        </Link>
                    </div>
                    <div className="post-header-details">
                        <h3 className="post-author">{postdetails?.name}</h3>
                        <p><small>{postdetails?.location}</small></p>
                        <p className="post-time">{moment(postdetails?.createdAt).fromNow()}</p>
                    </div>
                    <div onClick={menuOpen} className='threedot-menu'><BsThreeDots />
                        {
                            isMenuOpen && <div className='follow-menu'>

                                {isMyPost && <div onClick={handleDeletePost}><p>Delete Post</p></div>}
                                {isMyFriend ? (<div onClick={follow}><p>Follow</p></div>) : (<div onClick={unfollow}><p>unfollow</p></div>)}
                                <div><p>Copy Link</p></div>
                                <div><p>Report</p></div>

                            </div>
                        }</div>
                </div>

                {/*CONTENT WITH IMAGE AND DESCRIPTION */}
                <div className="post-content">
                    <p>{postdetails?.description}</p>
                    {/* Condition 1: If picturePath length is greater than 10 and not a video link */}
                    {postdetails.picturePath && postdetails.picturePath.length > 10 && !postdetails.picturePath.endsWith('.mp4') && (
                        <img src={postdetails.picturePath} alt="post-img" />
                    )}

                    {/* Condition 2: If picturePath length is less than 10 */}
                    {postdetails.picturePath && postdetails.picturePath.length <= 10 && (
                        <img src={`${process.env.REACT_APP_BASE_URL}/assets/${postdetails.picturePath}`} alt="post-img" />
                    )}

                    {/* Condition 3: If picturePath is a video link */}
                    {postdetails.picturePath && postdetails.picturePath.endsWith('.mp4') && (
                        <VideoPlayer src={postdetails.picturePath} width={440} height={300} />
                    )}

                </div>

                {/** ACTIONS LIKE DISLIKE SHARE COMMENT */}
                <div className="post-actions">
                    <div className="like">
                        <div className='up' onClick={user ? handleLike : handleUserToast} ><BiSolidUpArrow /></div>
                        <span>{Object.values(postdetails?.likes || {}).filter(value => value === true).length}</span>

                        <div className='down' onClick={user ? handleDislike : handleUserToast} ><BiSolidDownArrow /></div>
                    </div>
                    <div onClick={user ? () => toggleComments(postdetails._id) : handleUserToast} className="comment">
                        <FaCommentAlt />
                        <span>{postdetails?.comments?.length}</span>
                    </div>

                    <div className="share"><FiShare /></div>
                </div>

                {showComments &&
                    <div className='comments-section'>
                        <form onSubmit={handleComment}>
                            <input
                                type="text"
                                name="comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Write a comment..."
                            />
                            <button type="submit"><IoIosSend /></button>
                        </form>

                        {postdetails?.comments?.map((comment, index) =>

                            <div key={index}><p>{comment}</p></div>
                        )}
                    </div>
                }

            </div>
        </section>

    )
}

export default Post;
