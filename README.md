# cambridge-ta App
Prepare by Alain Lim
me@alainmlim.com

## Installation notes

**ExpressJS API Server**
- cd api
- npm i
- npm start

**React UI Server**
- cd client
- npm i
- npm start

## Requirements / Specifications

1. A service layer that will fetch a list of articles using REST API
> All API calls goes through ExpressJS server (api directory -> needs to start)

2. Basic authentication using available usernames and email as passwords.
> Basic login authentication checks if user exists in the provided users JSON usinng username and email as the password -> https://jsonplaceholder.typicode.com/users

3. Routing for features of the application.
> Using react-router, all routes were defined in App.js

4. Other than the login page the other routes should be protected depending on if the user has logged in.
> All routes except /login will be re-routed back to /login if isLoggedIn context state is false

5. Reusable components to display and filter the response data.
> All articles can be viewed and edited by only using only 1 reusable component, fetching data by id

6. Form to search and return a given article.
> Using the same useQuery to fetch articles on load, it will trigger refetch on search input by any of the selected fields (userId, id, title)

7. Form to create a new article and post to the server, then log the response
> Using MongoDB as database, new article can be added. Each successful addition will redirect page to main page (articles page).

8. Form to update an existing article on submission then log the response.
> Each article can be edited by clicking Edit button on each article page. This redirects to page to Edit form which initially loads the current article data and clicking the Update button will update the article.

## Added feature
1. Created article database using MongoDB