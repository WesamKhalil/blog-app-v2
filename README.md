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
Then provide a number for the PORT value for your servers port, then a a number for your CLIENTPORT for your front end development servers port.  
Then provide a string for your MONGOURL that directs to a Mongo database, you can create one and connect to it online with MongoDB Atlas.  
Finally provide a signing key string to your JWT_KEY which will be used to sign tokens.  
Don't use any spaces, here is an example.  
MONGOURL='mongodb+srv://...'  
PORT=3000  
CLIENTPORT=8080  
JWT_KEY='signingkeyexample'  

If you want to transpile the react code into a bundle to update the application that you'll use in production then type in the terminal "npm run client-build".  
 
To run the production build type in the terminal "npm run start" and navigate to "http://localhost:" + the PORT value you put in the ".env" file.  
  
To run this application for development type in your terminal "npm run dev" to run the back end and client server simultaneously, a window/tab should open up automatically in your browser to show you the app.   

todo list:  
~~Add markdown functionality.~~ No, no I don't think I will.  
Possible features:  
Email validaton.  
Password validation for one uppercase letter, lowercase letter, number and special character.
