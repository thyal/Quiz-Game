INSERT INTO categories(name) VALUES('General Knowledge');
INSERT INTO categories(name) VALUES('Animals');
INSERT INTO categories(name) VALUES('Geography');
INSERT INTO categories(name) VALUES('Movies / TV');
INSERT INTO categories(name) VALUES('Sports');

INSERT INTO questions(category_id, question) VALUES(1, '16 of what pieces are on a chess board at the start of a game?');
INSERT INTO answers(question_id, answer, isCorrect) VALUES(1, 'Bishops', 0);
INSERT INTO answers(question_id, answer, isCorrect) VALUES(1, 'Rooks', 0);
INSERT INTO answers(question_id, answer, isCorrect) VALUES(1, 'Knights', 0);
INSERT INTO answers(question_id, answer, isCorrect) VALUES(1, 'Pawns', 1);

INSERT INTO questions(category_id, question) VALUES(2, 'What type of animal is a gelada?');
INSERT INTO answers(question_id, answer, isCorrect) VALUES(2, 'Baboon, or monkey', 1);
INSERT INTO answers(question_id, answer, isCorrect) VALUES(2, 'Antelope', 0);
INSERT INTO answers(question_id, answer, isCorrect) VALUES(2, 'Beetle', 0);
INSERT INTO answers(question_id, answer, isCorrect) VALUES(2, 'Reptile', 0);

INSERT INTO questions(category_id, question) VALUES(3, 'The Beaufort Sea constitutes part of which ocean?');
INSERT INTO answers(question_id, answer, isCorrect) VALUES(3, 'Atlantic', 0);
INSERT INTO answers(question_id, answer, isCorrect) VALUES(3, 'Pacific', 0);
INSERT INTO answers(question_id, answer, isCorrect) VALUES(3, 'Arctic', 1);
INSERT INTO answers(question_id, answer, isCorrect) VALUES(3, 'Indian', 0);

INSERT INTO questions(category_id, question) VALUES(1, 'Who or what lives in a vespiary?');
INSERT INTO answers(question_id, answer, isCorrect) VALUES(4, 'Sheep', 0);
INSERT INTO answers(question_id, answer, isCorrect) VALUES(4, 'Motor scooters', 0);
INSERT INTO answers(question_id, answer, isCorrect) VALUES(4, 'Monks', 0);
INSERT INTO answers(question_id, answer, isCorrect) VALUES(4, 'Wasps', 1);

INSERT INTO questions(category_id, question) VALUES(4, 'In the film "Batman Forever", released in 1995, who played the villain called "The Riddler"?');
INSERT INTO answers(question_id, answer, isCorrect) VALUES(5, 'Jim Carrey', 1);
INSERT INTO answers(question_id, answer, isCorrect) VALUES(5, 'Jack Nicholson', 0);
INSERT INTO answers(question_id, answer, isCorrect) VALUES(5, 'Tommy Lee Jones', 0);
INSERT INTO answers(question_id, answer, isCorrect) VALUES(5, 'Arnold Schwarzenegger', 0);

INSERT INTO questions(category_id, question) VALUES(3, 'Where was the first permanent European settlement established in North America?');
INSERT INTO answers(question_id, answer, isCorrect) VALUES(6, 'Masschusetts', 0);
INSERT INTO answers(question_id, answer, isCorrect) VALUES(6, 'Virginia', 0);
INSERT INTO answers(question_id, answer, isCorrect) VALUES(6, 'Florida', 1);
INSERT INTO answers(question_id, answer, isCorrect) VALUES(6, 'Maine', 0);

INSERT INTO questions(category_id, question) VALUES(5, 'Which of these is a warning shout during a game of golf?');
INSERT INTO answers(question_id, answer, isCorrect) VALUES(7, 'Fore', 1);
INSERT INTO answers(question_id, answer, isCorrect) VALUES(7, 'Oyez', 0);
INSERT INTO answers(question_id, answer, isCorrect) VALUES(7, 'Howzat', 0);
INSERT INTO answers(question_id, answer, isCorrect) VALUES(7, 'Time', 0);

INSERT INTO questions(category_id, question) VALUES(4, 'What has been the longest-running comedy in US TV history?');
INSERT INTO answers(question_id, answer, isCorrect) VALUES(8, 'Americas Funniest Home Videos', 0);
INSERT INTO answers(question_id, answer, isCorrect) VALUES(8, 'The Love Boat', 0);
INSERT INTO answers(question_id, answer, isCorrect) VALUES(8, 'The Red Skelton Show', 0);
INSERT INTO answers(question_id, answer, isCorrect) VALUES(8, 'AThe Simpsons', 1);

INSERT INTO questions(category_id, question) VALUES(3, 'What is the most populous city in Africa?');
INSERT INTO answers(question_id, answer, isCorrect) VALUES(9, 'Cairo', 1);
INSERT INTO answers(question_id, answer, isCorrect) VALUES(9, 'Khartoum', 0);
INSERT INTO answers(question_id, answer, isCorrect) VALUES(9, 'Durban', 0);
INSERT INTO answers(question_id, answer, isCorrect) VALUES(9, 'Nairobi', 0);

INSERT INTO questions(category_id, question) VALUES(3, 'Staten Island, New York, is at the mouth of which river?');
INSERT INTO answers(question_id, answer, isCorrect) VALUES(10, 'Missouri', 0);
INSERT INTO answers(question_id, answer, isCorrect) VALUES(10, 'Mississippi', 0);
INSERT INTO answers(question_id, answer, isCorrect) VALUES(10, 'Hudson', 1);
INSERT INTO answers(question_id, answer, isCorrect) VALUES(10, 'Potomac', 0);