# QUIZ GAME

## List of contents

* [How to run](#how-to-run)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [The solution](#the-solution)
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
* [Final thoughts](#final-thoughts)

## How to run

### Prerequisites
As stated in the desciption of the exam, it is expected that whoever is sensoring this project
has installed nodejs, npm and docker. This is all that is needed to run this project.

### Installation
The first thing you need to do is run the NPM command `npm install`.
This will install all dependencies.
The project is running a database with docker. So it is needed to build and run the docker image before the solution is ran. This can be done with two npm commands.

The next thing is to run the NPM command `npm run docker-build`.
**It is very important that you wait for it to finish.**
This will build the docker image. When this is done, you can run `npm run docker-run`.
This will actually run the docker image. All the tables and views will be created and the database will be seeded with some questions and answers.

Now that all dependencies are installed, and the database is up and running, you can run the NPM command `npm run dev` to actually run the project. The homepage should now be avaliable at http://localhost:8080

## The solution
The solution is a quiz game, where players can play a game against other players online. You need a profile to play. This can be made from the signup page. 

There are two game modes in this game. The first one is as described in the exam description.
This is the button at the front-page that says "start a game". How this works is that the first player that starts a game will have to create a game. The player will get to choose how many questions the game will consist of, and choose a name for the game. The player will then wait for other players to join. The next players that start a game, will then automatically join that game. When a game has enough players (atleast two, but can be as many as you want) the creator can start the game. The quiz will start, and if a new player starts a game, a new instance of a game will be started.

The other mode is the gamelobby. Here you can start a game, you can see a list of active games waiting for players, and you can enter a game id for a specific game you want to join. This is good if you want to start a game and play against friends. You can share the game id, and they can join the same game. This mode is loosely inspired by Kahoot.

The actual game works like this; A question will appear on the screen, and the players will get a few answers to choose from. They get 20 seconds to answer, and the get scored on wheter they have the right one answer, and how long time they use to answer. There is a time-counter, so you always see how long each round has left, and how long it will be before the next round starts. You will also see the players that are connected to the game, you will see you score, both total score of the game, and after each round. You will also always see what place you are in. This makes the game very interactive, and alive. The game is over when the question-limit choosed are reached. A winner will then be announced and the leaderboard will be updated.

I have written more about my thoughts, and such in the final-thoughts section.


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
I used a mysql database for this project, and it is running with docker. The files in the folder sql-scripts will be run on startup (first time image is build). This will create all tables and views, and seed the database with some data. The data beeing seeded are all the questions and answers.
There are 6 tables in this project, users, games, userScores, categories, questions and answers. 

## Final thoughts
I am happy with how the prosject turned out, and I'm happy that I got to use many different technologies. I think the main functionality worked out good. I'm think the game logic is good, and the actual game is fun to play. I'm happy with how it how questions are shown, with timers and scores and all that. That is the functionality I'm most happy about. There's alot of things happening at once, but I feel they all contribute to making the game better.

That beeing said, it is not a perfect solution. If I had more time, I would first and foremost improve the socket logic regarding disconnecting and leaving a game etc. There could be improvements here, like doing so that a player can not join a new game for a set time or something like that. The other thing is I would make the question selection better. As it is now, it's just random, which means a question can come up more than once in a game.

There are other things I thought about during the process, like beeing able to create your own questions, and stuff like that, but I did not have time to implement this.
Also I would focus more on the design and the total impression of the application. The security could also be better, I think. 

I did not run into any major problems while creating this application, other than normal things when creating a project like this. There weren't any show-stoppers. I did make myself learn about topics that I didnt know about, like redux and docker, so I did use some time doing that, but I definitivly think it was worth it. These are things I'm going to use in the future. All in all I am happy with my solution, and I have learned alot in this process. 