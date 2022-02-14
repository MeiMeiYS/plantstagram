# Plantstagram

[Plantstagram](https://plantstagram.herokuapp.com/ "Live site hosted on Heroku") is website intended to clone the core functionality of [Instagram](https://instagram.com/, "Instagram"). It is a social networking platform that allows users to create secure accounts to then post pictures, view a feed of posts from users they're following, as well as comment & like picutres across the site.

This project is hosted on Heroku and the live site with a demo is viewable at [Plantstagram](https://plantstagram.herokuapp.com/ "Live site hosted on Heroku").

# Technologies Used
- Node.js
- React
- Redux
- Flask
- PostgreSQL
- SQLAlchemy
- Alembic 

# Screenshots
TODO

# Setup Instructions To Run

1. Clone this repo
2. In the root directory run the command `pipenv install`
3. In the `/react-app` directory of the cloned repo, run `npm install` to install node dependencies
4. Create a PostgreSQL database and user for the app
5. Rename `/.env.EXAMPLE` to ".env", and fill out the values using the PostgreSQL information you just created
7. Run database migrations with the command `pipenv run flask db migrate`
8. Run the Flask backend server with the command `pipenv run flask run` in the root directory
9. In a new terminal, run `npm start` in the /react-app directory
10. The site should now be up on localhost:3000!
