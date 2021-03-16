This is a blog post app where you can see all the posts different people have made.  
You have the option to register as a user which allows you to create, edit and delete posts.  
I've implemented an authorisation system with JWT so you can only edit and delete your accounts posts.  
This is a SPA made with React, Redux and Redux Thunk for the front end.  
For the back end I'm using Node and Express to serve files and provide api's for the front end SPA.  
Posts and user credentials are stored in MongoDB with the Schemas, Models and document manipulation being handled by Mongoose.  
I'm using Json Web Tokens for authorisation and Bcrypt to encrypt user passwords on the back end.  

To get the app working do the following.  

Make sure you have Node JS installed, I'm using node version 15.5.0.
Go into a terminal and CD into this folder.  
Type into the terminal "npm install" to install all the front end packages.  
Type in your terminal "npm run client-install" to install all your clients development packages.  
Create a ".env" file in the root folder, here you will provide all the environment variables.  
In the ".env" file provide the PORT variable a number to tell the server which port to run on, don't put any spaces.  
For example "PORT=3000" without the quotes. If your value is a string then wrap the value around single/double quotes.  
Next provide a string for the MONGOURL variable, you can set up MongoDB and get a url from MongoDB Atlas online.  
For example "MONGOURL='mongodb+srv://...'" without the double quotes.  
Then provide a string for JWT_KEY which is the secret word you use to sign your tokens, which you send to the client for authorisation.  
Then provide a number for CLIENTPORT to tell your client server which port to run on, make sure it's not the same as number as the PORT number.  

If you want to transpile the react code into a bundle to update the application that you'll use in production then type in the terminal "npm run client-build".  
 
To run the production build type in the terminal "npm run start" and navigate to "http://localhost:" + the PORT value you put in the ".env" file.  
  
To run this application for development type in your terminal "npm run dev" to run the back end and client server simultaneously, a window/tab should open up automatically in your browser to show you the app.  

Note that to render the edit and delete buttons on the app I'm checking if the user has the same email as the one in the post, so anyone can see your email attached to your post in javascript. I could have made an id that indirectly connected the user and the posts they made but the point of this app is to showcase my skills with Redux and JWT.  

todo list:  
Add markdown functionality.  
Make id that ties posts to the user who created them that doesn't include their email or user id (we use the id to sign a token).  
Optimise Mongoose request from the MongoDB database.
