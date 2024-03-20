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

task pending:-

1. I want to save the theme in the local storage for user to see the theme same again later

5. overflow blog componets {hidden: true}

6. Make the website responsive: Add extra CSS and media queries to make the website responsive (you can change some components on different devices except desktop).

tasks done:-

1. navbar done
2. display questions page done
3. Auth page
4. display answers page 12/2
5. users page 13/2
6. users/:id page 13/2
7. public 14/2

task pending:-

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

pending:-
1. manage deleting a comment
2. make UI for who commented 
3. Edit a comment 
4. filter work 

# Integrate a chatbot feature where users can ask their questions directly to the chatbot. It should answer all programing related questions

Authenticate with OTP before asking questions

tasks done:-

1.
2.

task pending:-
1. Work on implementing a chatbot feature.
2. Configure Firebase for OTP SMS services.
3. Create a middleware to handle user phone number verification with OTP.
4. Utilize the OpenAI API to fetch responses to user questions.
5. Design an impressive UI for the chatbot feature.

`User Authentication with OTP:`

1. Implement a user authentication system that requires users to sign up or log in using their email and password.
   Integrate OTP authentication as an additional step. When users sign up or log in, they should receive an OTP via email or SMS.
   Allow users to enter the OTP they received to complete the authentication process.
   Chatbot Integration:

2. `Choose a chatbot platform` or library that supports natural language processing (NLP) and programming-related queries. For example, Dialogflow, IBM Watson Assistant, or Rasa.
   Set up and configure the chatbot according to your requirements, including defining intents, entities, and responses for programming-related questions.
   Integrate the chatbot into your StackOverflow clone's user interface, such as a chat window or sidebar.
   Implement functionality to send user queries to the chatbot and display the responses within the application.
   Programming Question Recognition:

3. Define specific intents or entities in the chatbot for recognizing programming-related questions. For example, you can define intents like "JavaScript syntax", "Python libraries", etc.
   Train the chatbot to accurately recognize and respond to these types of queries by providing sample questions and responses for each intent.

`User Interaction:` 4. Allow users to interact with the chatbot by typing their questions or selecting predefined options.
Display the chatbot's responses in a conversational format within the user interface.
Implement features such as typing indicators and message timestamps to enhance the user experience.
Error Handling and Feedback:

5. `Implement error handling` mechanisms to handle cases where the chatbot cannot understand the user's query or encounters errors.
   Provide feedback to users when their queries are successfully processed or when there are issues with the chatbot's responses.
   Testing and Iteration:

6. `Test the chatbot` feature thoroughly to ensure it functions as expected, including authentication flows, chatbot interactions, and response accuracy.
   Gather feedback from users and iterate on the chatbot's functionality based on their input and usage patterns.

# Create subscriptions using a payment gateway (like stripe, razorpay) to post questions in stackoverflow.

Testcase: Free Plan can post only 1 question a day, silver plan will be ₹100/month which can post 5 questions a day and gold plan can post unlimited questions and priced at ₹1000/month.
tasks done:-

1. Modify Database Schema to store your subscription details such that plan they are subscribed to and the no of questions they have posted
2. Add fiels to your User model to store subscription related information
3. Middleware that checks the user's subscription status and limits the no of questions they can post based on their subscription.
1. Design a section in home page for cards show
2. API integration for the subscription related actions, such as subscribing to a plan or fetching subscription details
3. form validation: Implement form validation to enforce the daily question limit based on the user's subscription plan.

task pending:-
4. API endpoint to handle subscription management, such as sbscribing to the plan , Upgrading/downgrading plans and fetching the subscription details 
4. NOTIFICATION: Display notifations or messages to user when they reach their daily question limit or when they need to upgrade their plan.




