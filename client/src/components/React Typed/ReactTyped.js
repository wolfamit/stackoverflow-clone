import React from 'react';
import {ReactTyped} from 'react-typed';
import './ReactTyped.css'

const TypingComponent = () => {
    return (
        <div className='typing-container'>
            <ReactTyped
                strings={[
                    "Stay updated with the latest questions!",
                    "Unlock premium features with a subscription for an endless experience!",
                    "Engage with the community in our public space!",
                    "Need instant help? Chat with our friendly bot!"
                ]}
                typeSpeed={20}
                backSpeed={10}
                loop
            >
                <h2 className='typed'></h2>
            </ReactTyped>
        </div>
    );
}

export default TypingComponent;
