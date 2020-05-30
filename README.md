# Project Auth

This was a project supposed to be a pair-programing. I did it by myself. 
The project needed to have two parts; a backend API, and a React frontend. I needed to create a `User` model using mongoose, with properties for registered user, and to store a user's access token.

Then, on the frontend side of things, it was needed to build up a registration form which POSTs to the API. And needed to store the access token that gets back in the browser using local storage, and then use that token when making other requests to the API.

Once a user is logged in, it needed to have at least one endpoint which returns some content which only logged-in users should be able to access.

## The problem

I came accross many problems with this. And Im proud that I've manage to solve most of them. But i still have one problem and that is with the "submit-login" button. It's not pushing to the secrets site. And if I place the history.push  under the "handleLogin" function, then it will redirect nomatter if the password is correct or not. I would really need some help with that. 


## View it live

https://auth-api-by-tuliany.netlify.app/