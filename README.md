# Finlunch

A webapp for my food reviews.

Live version is available [here](https://superlative-cheesecake-27dd1d.netlify.app/)

Frontend is built with react and Backend is built with Node and expressJS with MySQL as database.

Admin users (me) are able to create new food reviews for other users to read,like and comment, other users that want to like or comment have to signup.

**quick summary about Frontend**

*-ReactJS*

*-form validation using yup and react-hook-form*

*-Axios for sending requests*

*-media queries and react-responsive for mobile friendly UI*

*-Routing*

*-Error messages if Backend doesn't respond*


**quick summary about Backend**

*-**Tried** using MVC pattern*

*-Sequelize ORM*

*-image upload using **multer** & **cloudinary** - doesn't work in production yet 😪* 

*-jwt for user authentication*

*-middleware for authorization*

*-password hashing using bcrypt*

*-verification email using nodemailer*

*-reset password if the user forgot their password*

*-only admin users are able to create new posts, new foodtypes and delete ANY comment*



**Future updates:**

*-Profile for each user where people can see their activity*

*-Profile pictures*

*-fix the bug which feels impossible to fix (closing the dropdown menu when user clicks their name, it should close when clicking outside or when clicking the name again) i know the reasoning for it but not how to fix it without rebuilding whole dropdownmenu* 🤷‍♂️

*-icon instead of text for Header(maybe create a icon using AI)*

*-Show distance to the fastfood place using a google api(semi-scared to use because i dont want to get a 10000€ bill because i used a google api)*

*-fix image upload*




