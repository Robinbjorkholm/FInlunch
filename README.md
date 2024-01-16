# Finlunch.com

A webapp for my food reviews.

Frontend is built with react and backend is built with Node and expressJS with MySQL as database.

Admin users (me) are able to create new food reviews for other users to read,like and comment, other users that want to like or comment have to signup.

The backend features all the necessary features for creating users etc

-passwords are hashed
-verification email before the user can actually login or log in 🤷‍♂️
-Reset password if the user forgot their password
-only admin users are able to create new posts, new foodtypes and delete their own comment, admin accounts can delete any comment.

Future updates:
-Profile for each user where people can see their activity
-Profile pictures
-fix the bug which feels impossible to fix (closing the dropdown menu when user clicks their name, it should close when clicking outside or when clicking the name again) i know the reasoning for it but not how to fix it without rebuilding whole dropdownmenu 🤷‍♂️
-icon instead of text for Header(maybe create a icon using AI)
-Show distance to the fastfood place using a google api(semi-scared to use because i dont want to get a 10000€ bill because i used a google api)


Live version is available here: 65a30694389b9c0a1f9b5555--regal-cuchufli-0486a5.netlify.app


