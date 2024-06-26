# Social Website API
This is a backend API for a social media website. It provides endpoints for managing users, thoughts, and reactions.

## Table of Contents
- [Demonstration](#demonstration)
- [Functionality](#functionality)
- [Usage](#usage)
    - [Running the App](#running-the-app)
- [License](#license)

## Demonstration


https://github.com/AlexanderJGael/Social-Website-API/assets/130517352/e69850f7-59a3-4398-bdcb-98fd484f0887



## Functionality
- __Users__: The API allows for creating, reading, updating, and deleting users. Each user has a username, email, and a list of friends.

- __Thoughts__: Users can post thoughts. Each thought has a text content, a timestamp, and a list of reactions.

- __Reactions__: Reactions are responses to thoughts. Each reaction has a reaction body and a username of the user who created it.

## Usage
To use the API, start the server by running the following command:

`npm start`

The API provides the following endpoints:

- `GET /api/users` Get all users
- `POST /api/users` Create a new user
- `GET /api/users/:id` Get a user by ID
- `PUT /api/users/:id` Update a user by ID
- `DELETE /api/users/:id` Delete a user by ID
- `POST /api/users/:userId/friends/:friendId` Add a friend to a user
- `DELETE /api/users/:userId/friends/:friendId` Remove a friend from a user
- `GET /api/thoughts` Get all thoughts
- `POST /api/thoughts` Create a new thought
- `GET /api/thoughts/:id` Get a thought by ID
- `PUT /api/thoughts/:id` Update a thought by ID
- `DELETE /api/thoughts/:id` Delete a thought by ID
- `POST /api/thoughts/:thoughtId/reactions` Add a reaction to a thought
- `DELETE /api/thoughts/:thoughtId/reactions/:reactionId` Remove a reaction from a thought

## Technologies Used
- __Node.js__: The API is built with Node.js, a JavaScript runtime that allows for building fast and scalable network applications.

- __Express.js__: Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

- __MongoDB__: MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas.

- __Mongoose__: Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.

### Running the App

1. First, make sure you have MongoDB installed and running on your machine. You can download it from <https://www.mongodb.com/download-center>. On most systems, you will need to run `mongod` in the command line to start the server.

2. Once MongoDB is running, navigate to the root directory of this project in the command line. Run `npm install` to install all the dependencies for the project.

3. Once all the dependencies are installed, you can start the app with `npm start`. This command will start the server and make it available at <http://localhost:3001>.

## License
This project is licensed under MIT.
