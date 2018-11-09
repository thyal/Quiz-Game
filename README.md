# QUIZ GAME

## List of contents

* [Live URL](#live-url)
* [How to run](#how-to-run)
* [Technologies used](#technologies-used)
* [Structure](#structure)

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

### Front-end