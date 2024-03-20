import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../actions/user";


const EditProfileForm = ({ currentUser, setSwitch }) => {

  const [name, setName] = useState(currentUser?.name);
  const [about, setAbout] = useState(currentUser?.about);
  const [tags, setTags] = useState([]);
  const [occupation, setOccupation] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [country, setCountry] = useState('');

  const dispatch = useDispatch();

  // Function to check if two arrays are equal
  const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct the profile update data object
    // Construct the profile update data object
    const profileUpdateData = {};

    // Add the fields to the object if they have changed
    if (name !== currentUser?.name) {
      profileUpdateData.name = name;
    }
    if (about !== currentUser?.about) {
      profileUpdateData.about = about;
    }
    if (!arraysEqual(tags, currentUser?.tags)) {
      profileUpdateData.tags = tags;
    }
    if (occupation !== currentUser?.occupation) {
      profileUpdateData.occupation = occupation;
    }
    if (country !== currentUser?.location) {
      profileUpdateData.country = country;
    }
    if (profilePicture) {
      profileUpdateData.picturePath = profilePicture.name;
    }

    // Dispatch the action with the profile update data
    dispatch(updateProfile(currentUser?._id, profileUpdateData));

    // Reset the profile picture state
    setProfilePicture(null);

    // Close the form
    setSwitch(false);
  };


  return (
    <div>
      <h1 className="edit-profile-title">Edit Your Profile</h1>
      <h2 className="edit-profile-title-2">Public information</h2>
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <label htmlFor="name">
          <h3>Display name</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="about">
          <h3>About me</h3>
          <textarea
            id="about"
            cols="30"
            rows="10"
            // value={currentUser.about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
        </label>
        <label htmlFor="tags">
          <h3>Watched tags</h3>
          <p>Add tags separated by 1 space</p>
          <input
            type="text"
            id="tags"
            // value={currentUser.tags}
            onChange={(e) => setTags(e.target.value.split(" "))}
          />
        </label>
        <br />
        <label htmlFor="Country">
          <h3>Country</h3>
          <input
            type="text"
            id="Country"
            value={currentUser.location}
            onChange={(e) => setCountry(e.target.value)}
          >
          </input>
        </label>


        <br />
        <label htmlFor="Occupation">
          <h3>Occupation</h3>
          <select
            id="Occupation"
            // value={currentUser.occupation}
            onChange={(e) => setOccupation(e.target.value)}
          >
            <option value="">Select Occupation</option>
            <option value="Engineer">Student</option>
            <option value="Doctor">Software Enginner</option>
            <option value="Teacher">Teacher</option>
            <option value="Teacher">Goverment employee</option>
            <option value="Teacher">Buisnessman</option>
            <option value="Teacher">Service</option>

          </select>
        </label>
        <label htmlFor="profilePicture">
          <h3>Profile Picture</h3>
          <input
            type="file" // Input type file for selecting files
            id="profilePicture"
            accept="image/*" // Accept all image types
            onChange={(e) => setProfilePicture(e.target.files[0])} // Update profile picture state
          />
        </label>
        <br />
        <br />
        <br />
        <input type="submit" value="Save profile" className="user-submit-btn" />
        <button
          type="button"
          className="user-cancel-btn"
          onClick={() => setSwitch(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditProfileForm;
