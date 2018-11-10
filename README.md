# QUIZ GAME

## List of contents

* [Live URL](#live-url)
* [How to run](#how-to-run)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Technologies used](#technologies-used)
* [Structure](#structure)
  * [Back-end](#back-end)
    * [Models](#models)
    * [Routes](#routes)
    * [Sockets](#sockets)
    * [Root Folder](#root-folder)
  * [Front-end](#front-end)
    * [Actions](#actions)
    * [Components](#components)
    * [Constants](#constants)
    * [Reducers](#reducers)
    * [Services](#services)
    * [Root Folder](#root-folder)
  * [Database](#database)

## Live URL
This project is uploaded to a cloud provider (composed with Docker), and can be seen here;

## How to run

### Prerequisites
As stated in the desciption of the exam, it is expected that whoever is sensoring this project
has installed nodejs, npm and docker. This is all that is needed to run this project.

### Installation
The first thing you need to do is run the NPM command `npm install`.
This will install all dependencies.
The next thing is to run the NPM command `npm run setup`.
This will initialize the database and create tables etc. **It is very important that you wait for it to finish.**

Now that all dependencies are installed, and the database is up and running, you can run the NPM command `npm run dev` to actually run the project. The homepage should now be avaliable at http://localhost:8080


## Technologies used
The technologies used in this project consist of nodejs with express running the back-end,
and react with redux running the front-end.
There is also a websocket (socket-io) running for two-way, real-time communication.
The database used is mysql, which I am using docker to setup and connect to.
The front-end is bundled with webpack, and I am using babel to translate react spesific code(jsx).

There are a few other npm packages installed, and I will list them here, just stating shortly what they are used for. I will not go into detail on the usage of each one, because I feel that would be overkill.

* bcrypt - used for encryption and decryption of passwords.
* express-session - used for creating a session cookie for authentication.
* mysql - used for connecting and talking to the mysql database.
* passport and passport-local - used for authentication.

We have seen most of these technologies in the course, the main difference here is that I am using redux to handle state on the front-end, and using a mysql database. 

## Structure

### Back-end

#### Models
Contains the models in the app. A model is a representation of a table in the database (here a model will in a few cases include more than one table). All SQL logic is here, and the routes and sockets that are using these models have no direct impact on the SQL queries. This means we could easily change the database used for another one, by just changing the logic in this folder.

#### Routes
Here is the endpoints of the API. 

#### Sockets
Contains the websocket.

#### Root Folder
Contains the server.

### Front-end
I will go through each folder, and explain the contents. The structure is based on redux spesific workflow, so which means I have a folder for each redux-event. The normal react components are under the components folder.

#### Actions
Here are the so-called "actions". These are events that are triggered throught the code, so that they can be reused, and it's easy to see what an action is actually doing. Most of the take use of services (which is the API calls), and constants, which are a spesific event-name so used by the reducers.

#### Components
Here is the React components(jsx). These are normal React components, aside from many of them are using the Higher-Order-Component(HOC) "connect", so that they can read state from the redux store.
Many of them are also wrappen in the HOC withRouter, and this is done so that I can pass the router-history to the actions, and in that way navigate around outside of the components.

#### Constants
These are just js-objects containing a key-value pair, of the name of events happening around the code. They are used mainly by the reducers, so they know which event should be doing what, and actions are passing them to the reducers to indicate which action (or event) has been triggered.
These could have been written as plain strings both places, but by having them in their own files like this, we make sure we don't have any typos and it's much easier to use.

#### Reducers
Reducers are the things that are actually changing state in the redux-store. It's no actuall logic here, they just accepts a state and an action, and updates the state based on what comes in.

#### Services
These are API calls.

#### Root Folder
Contains the entrypoint of the front-end (index.jsx) which sets up the redux store and renders app.jsx which contains the routing logic.

### Database
I used a mysql database for this project, and it is running with docker. The docker setup will create a instance of a mysql database, create a user, create all tables and views, and seed some data. All questions and answers are seeded in at startup.
There are 6 tables in this project, users, games, userScores, categories, questions and answers. 

