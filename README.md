# cambridge-ta App
Prepare by Alain Lim
me@alainmlim.com

## Installation notes
cd api
npm i
npm start

cd client
npm i
npm start

## Requirements / Specifications

1.A service layer that will fetch a list of articles using REST API
**All API calls goes through ExpressJS server (api directory -> needs to start)**

2.Basic authentication using available usernames and email as passwords.
**Basic login authentication checks if user exists in the provided users JSON usinng username and email as the password -> https://jsonplaceholder.typicode.com/users**

3.Routing for features of the application.
****

4.Other than the login page the other routes should be protected depending on if the user has logged in.
5.Reusable components to display and filter the response data.
6.Form to search and return a given article.
7.Form to create a new article and post to the server, then log the response
8.Form to update an existing article on submission then log the response.