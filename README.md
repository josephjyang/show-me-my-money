# Show Me My Money
![Splash Page](/visuals/splash.png)
![App Page](/visuals/app.png)

## Summary
[Show Me My Money](https://show-me-my-money.herokuapp.com/) is a web application inspired by Venmo built using the following technologies:
- Javascript
- React
- Redux
- Python
- Flask
- CSS
- Heroku
- SQLAlchemy
- PostgreSQL

Show Me My Money allows users to:
- Create an account
- Log in / Log out
- Read, create, update, and delete transactions between users
- Read, create, update, and delete comments
- Read, create, delete likes
- Read, create, delete friends

## Installation
- Clone this repository
- In the frontend-react directory, run `npm install`
- In the backend-flask directory, run `pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt`

## Development
- Create a **.env** file based on the .env.example with proper settings for your development environment
- Ensure PostgreSQL is installed and running
- Setup your PostgreSQL user, password and database and make sure it matches your **.env** file
- Get into your pipenv, migrate your database, seed your database, and run your flask app
  - `pipenv shell`
  - `flask db upgrade`
  - `flask seed all`
  - `flask run`
- Start the front-end server:
  - From the frontend-react directory, run `npm start`
  
## Wiki Links
- [MVP Feature List](./MVP-Feature-List)
- [User Stories](./User-Stories)
- [Database Schema](./Database-Schema)
- [Wireframes](./Wireframes)
- [API Routes](./API-Routes)
- [Frontend Routes](./Frontend-Routes)
