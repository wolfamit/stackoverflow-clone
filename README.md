# StackOverflow Clone

## Introduction
Welcome to our StackOverflow Clone project! This project aims to recreate the core features and functionality of the popular Q&A platform Stack Overflow. Whether you're a developer looking for answers or someone eager to share knowledge, our platform provides a space for you to ask questions, provide answers, and engage with a community of fellow developers.

## Features
- **User Authentication**: Securely register, log in, and manage your account.
- **website Theme**: The theme of the website chnages according to the timeline of the user's location.
- **Asking Questions**: Post questions on various topics and categories.
- **Answering Questions**: Provide answers to questions posted by other users.
- **Voting System**: Upvote or downvote questions and answers based on their quality and relevance.
- **Comments**: Add comments to questions and answers to provide feedback or seek clarification.
- **Tagging**: Tag questions with relevant keywords to make them easier to find and categorize.
- **social media Functionality**: post images and videos for community and commenting , liking in the community
- **User Profile**: View and manage your profile, including your questions, answers, and activity history.
- **subscribe**: Subscribe to plans for additional benefits of posting questions and answers
- **absisive word Filter**: A filter to filter words which are appropriate for community.
- **Chatbot**: User can ask programming related questions to the chatbot powered by openAI. 
- **otp verification** : User have to authenticate through phone number before asking questions for the chatbot.


## Technologies Used
- **Frontend**: React.js, HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js 
- **Database**: MongoDB
- **Authentication**: jwt authentication , Firebase Authentication for phone number authentication
- **Other Tools**: Git, GitHub, VS Code, Heroku (for deployment)

## Installation
1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/stackoverflow-clone.git

2. Navigate to the project directory:
   ```bash
   cd stackoverflow-clone

3. Navigate to the client directory:
   ```bash
    npm install

4. Navigate to the server directory:
   ```bash
    npm install

5. Create a .env file in the client directory and add your Firebase configuration and stripe configuration:

6. Create a .env file in the server directory and add your Port , stripe secret and cloudinary configuration:

7. Start the development server for on both client and server directories:
   ```npm start

# Contributing
We welcome contributions from the community! If you'd like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: git checkout -b feature-name.
3. Make your changes and commit them: git commit -m "Your message here".
4. Push to the branch: git push origin feature-name.
5. Submit a pull request detailing your changes.

# License

# Contact

If you have any questions, feedback, or suggestions, please feel free to contact us at amitabhambastha52@gmail.com

# Change the website color or theme according to time or weather: Use the system time or any API to fetch the weather of the user's current location and change the website's theme/color accordingly. For example, if it's daytime, you can keep the website color light, and if it's nighttime or bad weather, you can change the website color to dark colors.

tasks done:-
1. navbar done
2. display questions page done
3. tags page 12/2
4. Users page 12/2
5. ask questions page 12/2
6. users/:id page 13/2
7. users page 13/2
8. public interface 14/2
9. I want to save the theme in the local storage for user to see the theme same again later and make a button in navbar for changing the theme

task pending:
1. none

# Create a public space: Add one more page and allow users to share images, videos, text, and other things. Add a filter that detects abusive or hateful words and remove the content.

tasks done:-

1. serve post request
2. Users default image setting and path setting for image and video posting.
3. getallposts in the frontend 14/2
4. client side pubic page 14/2
5. like and comment functionality 15/2/
6. show the comment on the post 15/2/
7. users profile page setup 16/2
8. maybe a {location,impression,viewed profile} the frontend of current users details 16/2
5. filter abusive work 17/2
6. follow Users and add them to your friends List
7. make UI for video posting

pending:

1. none

# Integrate a chatbot feature where users can ask their questions directly to the chatbot. It should answer all programing related questions

Authenticate with OTP before asking questions

tasks done:-

1. Work on implementing a chatbot feature.
2. Utilize the OpenAI API to fetch responses to user questions.
3. Design an impressive UI for the chatbot feature.
4. Configure Firebase for OTP SMS services.
5. Store the number in database.

task pending:-
1. none

# Create subscriptions using a payment gateway (like stripe, razorpay) to post questions in stackoverflow.

Testcase: Free Plan can post only 1 question a day, silver plan will be ₹100/month which can post 5 questions a day and gold plan can post unlimited questions and priced at ₹1000/month.

tasks done:-

1. Modify Database Schema to store your subscription details such that plan they are subscribed to and the no of questions they have posted
2. Add fiels to your User model to store subscription related information
3. Middleware that checks the user's subscription status and limits the no of questions they can post based on their subscription.
4. Design a section in home page for cards show
5. API integration for the subscription related actions, such as subscribing to a plan or fetching subscription details
6. form validation: Implement form validation to enforce the daily question limit based on the user's subscription plan.

task pending:-
1. API endpoint to handle subscription management, such as subscribing to the plan , Upgrading/downgrading plans and fetching the subscripion details 
2. NOTIFICATION: Display notifations or messages to user when they reach their daily question limit or when they need to upgrade their plan.
3. test the webhook endpoint for subscription status management




