CREATE TABLE users(
id INT NOT NULL AUTO_INCREMENT,
username VARCHAR(255),
password VARCHAR(255),
wins INT DEFAULT 0,
PRIMARY KEY(id)
);

CREATE TABLE categories(
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(255) NOT NULL,
PRIMARY KEY(id)
);

CREATE TABLE questions(
id INT NOT NULL AUTO_INCREMENT,
category_id INT NOT NULL,
question VARCHAR(255),
PRIMARY KEY(id),
FOREIGN KEY(category_id) REFERENCES categories(id)
);

CREATE TABLE answers(
id INT NOT NULL AUTO_INCREMENT,
question_id INT NOT NULL,
answer VARCHAR(255),
isCorrect TINYINT(1) DEFAULT 0,
PRIMARY KEY(id),
FOREIGN KEY(question_id) REFERENCES questions(id)
);


CREATE TABLE games(
id INT NOT NULL AUTO_INCREMENT,
user_id INT NOT NULL,
name VARCHAR(255) NOT NULL,
numberOfQuestions INT NOT NULL,
isFinished TINYINT(1) DEFAULT 0,
winner_id INT,
hasStarted TINYINT(1) DEFAULT 0,
created_at DATETIME,
finished_at DATETIME,
randomplayers TINYINT(1) DEFAULT 0,
PRIMARY KEY(id),
FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE userScores(
user_id INT NOT NULL,
game_id INT NOT NULL,
userScore INT,
isCreator TINYINT(1) DEFAULT 0,
socket_id VARCHAR(255),
PRIMARY KEY(user_id, game_id),
FOREIGN KEY(user_id) REFERENCES users(id),
FOREIGN KEY(game_id) REFERENCES games(id)
);