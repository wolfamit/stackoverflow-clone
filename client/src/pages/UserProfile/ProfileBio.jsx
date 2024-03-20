import React from "react";
import "./UserProfile.css";
import Avatar from "../../components/Avatar/Avatar";

const ProfileBio = ({ currentProfile, Users }) => {
  return (
    <div className="profile-bio-container">
      <div className="tags-section">
        <h1>Tags Watched:</h1>
        {currentProfile?.tags?.length !== 0 ? (
          <div className="tags-grid">
            {currentProfile?.tags?.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        ) : (
          <h2>No tags watched</h2>
        )}
      </div>
      <div className="friend-list-grid">
        <h1>Friends List:-</h1>
        <div className="friends-container">
          {currentProfile?.friends?.map((friendId) => {
            
            const friend = Users.find((user) => user._id === friendId);
            return (
              friend && (
                <Avatar
                  key={friend._id}
                  py="20px"
                  px="20px"
                  borderRadius="50%"
                  imageSrc={`http://localhost:5500/assets/${friend?.picturePath}`}
                  alt="Avatar"
                />
              )
            );
          })}
        </div>
      </div>

      <div className="location-section">
        <h1>Country:</h1>
        <h3>{currentProfile?.location}</h3>
      </div>
      <div className="impressions-section">
        <h1>Impressions:</h1>
        <h3>{currentProfile?.impressions}</h3>
      </div>
      <div className="viewedProfile-section">
        <h1>Viewed Profile:</h1>
        <h3>{currentProfile?.viewedProfile}</h3>
      </div>
      <div className="occupation-section">
        <h1>Occupation:</h1>
        <h3>{currentProfile?.occupation}</h3>
      </div>
      <div className="about-section">
        <h1>About:</h1>
        <h3>{currentProfile?.about}</h3>
      </div>
    </div>
  );
};

export default ProfileBio;
