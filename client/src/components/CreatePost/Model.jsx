import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import Avatar from '../Avatar/Avatar';
import './createPost.css'


const Model = ({User, setFile, onCloseModal, onSubmit, setDescription}) => {
    const [imagePreview, setImagePreview] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result); 
        }
        reader.onerror = (error) => {
            console.error('Error reading the file:', error);
        };
        if (selectedFile) {
            reader.readAsDataURL(selectedFile); 
        } else {
            setImagePreview(null);
        }
    };
    
    return (
        <div className="model">
            <div className="model-content">
                <div>
                    <NavLink to={`/Users/${User?.data?.result._id}`}>
                        <Avatar py='30px' px='30px' borderRadius='50%' imageSrc={User?.data.result.picturePath <= 30 ? User.data.result.picturePath : ''}/>
                    </NavLink>
                    <span className="close" onClick={onCloseModal}>&times;</span>
                </div>

                <h2>Share Your Thoughts</h2>

                <form onSubmit={onSubmit}>
                    <textarea
                        type='text'
                        // value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="What's on your mind?"
                    />
                    {imagePreview && (
                        <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                    )}
                    {!imagePreview && ( // Render the file input only if there is no image preview
                        <input
                        type="file"
                        name="file"
                        accept="image/*, video/*"
                        onChange={handleFileChange}
                    />
                    )}
                    
                    <button type="submit">Share</button>
                </form>
            </div>
        </div>
    );
};

export default Model