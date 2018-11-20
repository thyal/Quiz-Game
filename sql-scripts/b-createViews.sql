CREATE OR REPLACE VIEW vUserScores AS
SELECT users.username, userScores.user_id, userScores.game_id, userScores.userScore, userScores.isCreator, userScores.socket_id
FROM users JOIN userScores ON users.id = userScores.user_id;


CREATE OR REPLACE VIEW vQuestions AS
SELECT categories.id AS category_id, categories.name AS category_name, questions.id, questions.question
FROM categories JOIN questions ON categories.id = questions.category_id;