import React, { useState } from 'react'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Avatar from '../../components/Avatar/Avatar'
import EditProfileForm from './EditProfileFrom'
import ProfileBio from './ProfileBio'
import './UserProfile.css'

const UserProfile = () => {

    const { id } = useParams();
    const Users = useSelector(state => state.usersReducer);
    const user = useSelector((state) => state.CurrentUserReducer);
    const currentProfile = Users.find(user => user._id === id);
    const [Switch, setSwitch] = useState(false);

    return (
        <>
            <div className='below-topnav-user'>
                <div className="user-details-container">
                    <div className="user-details">
                        <Avatar
                            py='60px'
                            px='80px'
                            imageSrc={
                                currentProfile?.picturePath &&
                                (currentProfile.picturePath.length <= 10
                                    ? `${process.env.REACT_APP_BASE_URL}/assets/${currentProfile.picturePath}`
                                    : currentProfile.picturePath)
                            }
                        />
                        <div className="user-name">
                            <h1 >{currentProfile?.name}</h1>
                            <p >Joined {moment(currentProfile?.joinedOn).fromNow()}</p>
                        </div>
                    </div>
                    {
                        user?.data?.result?._id === id && !Switch && (
                            <button style={{ background: 'var(--bg-color-1)', color: 'var(--text-color-1' }}
                                type='button'
                                onClick={() => setSwitch(true)}
                                className='edit-profile-btn'
                            >
                                Edit Profile
                            </button>
                        )
                    }
                    {
                        Switch ? (
                            <EditProfileForm setSwitch={setSwitch} currentUser={currentProfile} />
                        ) : (
                            <ProfileBio currentProfile={currentProfile} Users={Users} />
                        )
                    }

                </div>
            </div>
        </>
    )
}

export default UserProfile