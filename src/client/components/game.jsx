import React from "react";
import { withRouter } from "react-router-dom";
import { Prompt } from 'react-router';
import { connect } from "react-redux";
import openSocket from 'socket.io-client';
import { userActions } from "../actions/userActions";

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            users: [],
            hasStarted: false,
            roundScore: 0,
            totalScore: 0,
            timer: 0,
            round: null,
            question: null,
            answers: [],
            selectedAnswerId: 0,
            correctAnswer: null,
            selectedCorrect: false,
            clickable: true,
            placement: null,
            roundOver: false,
            leaderboard: null,
            gameOver: false,
            winner: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleAnswer = this.handleAnswer.bind(this);
    }

    async componentDidMount() {

        //The first thing we do is to get a token from the server.
        const { dispatch } = this.props;
        try {
            await dispatch(userActions.getToken());
        } catch(error) {
            this.setState({error: 'Invalid token'});
        }

        //Then open a socket connection.
        this.socket = openSocket(window.location.origin);

        const payload = {
            user_id: this.props.user.id,
            token: this.props.token,
            username: this.props.user.username, 
            gameId: this.props.gameId
        };

        this.socket.emit('game', payload);
        
        this.socket.on('users', (users) => {
            this.setState({users: users});
        });

        this.socket.on('starting', () => {
            this.setState({hasStarted: true});
        });

        this.socket.on('newRound', (round) => {
            this.setState({
                round: round,
                question: null,
                timer: 0,
                answers: [],
                selectedAnswerId: 0,
                correctAnswer: null,
                selectedCorrect: false,
                clickable: true,
                roundOver: false
            });
        });

        this.socket.on('question', (question) => {
            this.setState({question: question});
        });

        this.socket.on('answers', (answers) => {
            this.setState({answers: answers});
            this.timer = setInterval(() => this.setState({
                timer: this.state.timer + 1
            }), 1000);
        });

        this.socket.on('score', (score) => {
            this.setState({roundScore: score});
        });

        this.socket.on('totalScore', (totalScore) => {
            this.setState({totalScore: totalScore.score, placement: totalScore.placement});
        });

        this.socket.on('leaderboard', (leaderboard) => {
            this.setState({leaderboard: leaderboard});
        })


        this.socket.on('roundOver', (correctAnswer) => {

            if(correctAnswer.id === this.state.selectedAnswerId) {
                this.setState({selectedCorrect: true});
            } else {
                this.setState({selectedCorrect: false});
            }
            this.setState({roundOver: true, correctAnswer: correctAnswer});
            clearInterval(this.timer);
        });

        this.socket.on('gameOver', (leaderboard) => {
            this.setState({gameOver: true});
        });

        this.socket.on('winner', () => {
            this.setState({winner: true});
        });
        
    }

    componentWillUnmount() {
        this.socket.emit('leave', this.props.gameId);
        this.socket.disconnect();
    }

    handleClick() {
        this.socket.emit('startGame', this.props.gameId);
    }

    handleAnswer(id) {
   
        this.setState({clickable: false, selectedAnswerId: id});
        
        const payload = {
            gameId: this.props.gameId,
            user_id: this.props.user.id, 
            question: this.state.question.id,
            answer_id: id, 
            time: this.state.timer
        };
        this.socket.emit('answered', payload);
    }

    render() {

        //The users connected to the game
        let users = <div></div>;

        if(this.state.users !== null && this.state.users !== undefined){
            users = <div style={{textAlign: "right"}}>
                <h4>Players in the game</h4>
                {this.state.users.map(user =>
                    <p key={user.user_id}> {user.username}</p>
                )}
            </div>;
        }

        //The start game button. If the player created the game, it will show a button, else
        //just a text.
        let startGame = <div></div>;

        if(this.props.userCreatedGame && !this.state.hasStarted) {
            startGame = <button onClick={this.handleClick} className="btn btn-submit">START GAME</button>
        } else if(!this.props.userCreatedGame &&!this.state.hasStarted) {
            startGame = <p>Waiting for the game to start.</p>
        }

        let round = <div></div>;

        if(this.state.round !== null) {
            round = <h3>Question {this.state.round.round} of {this.state.round.totalRounds}</h3>
        }

        let question = <div></div>;

        if(this.state.question !== null && !this.state.roundOver) {
            question = 
            <div>
                <h2>Category: {this.state.question.category_name}</h2>
                <h3>{this.state.question.question}</h3>
            </div>
        }

        let answers = <div></div>;
        if(this.state.answers.length > 0 && !this.state.roundOver) {
            answers = 
            <div>
                {this.state.answers.map((a) => 
                <button 
                className="quiz-btn quiz-answers" 
                onClick={_ => this.handleAnswer(a.id)} 
                key={a.id}>
                {a.answer}
                </button>
                )}
            </div>
        }

        if(!this.state.clickable) {
            answers = 
            <div>
                {this.state.answers.map((a) => {
                    if(a.id === this.state.selectedAnswerId) {
                        return <button 
                        className="quiz-btn quiz-selected"
                        key={a.id}>
                        {a.answer}
                        </button>
                    } else {
                        return <button
                        className="quiz-btn quiz-unclickable"
                        key={a.id}>
                        {a.answer}
                        </button>
                    }
                    }
                )}
            </div>
        }

        /* RESULT */
        let result = <div></div>;
        if(this.state.correctAnswer !== null) {
            if(this.state.correctAnswer.id === this.state.selectedAnswerId) {
                result = 
                <div className="msg msg-success">
                    <p>Congrats! You had the right answer!</p>
                    <p>+ {this.state.roundScore}</p>
                </div>
            } else {
                result = 
                <div className="msg msg-error">
                    <p>Sorry! Wrong answer</p>
                </div>
            }
        }

        let roundOver = <div></div>;
        if(this.state.roundOver && this.state.correctAnswer !== null) {
            roundOver = 
            <div>
                <h3>ROUND OVER</h3>
                <p>The correct answer is: {this.state.correctAnswer.answer}</p>
                {result}
            </div>

            answers = 
            <div>
                {this.state.answers.map((a) => {
                    if(a.id === this.state.selectedAnswerId && this.state.selectedCorrect) {
                        return <button 
                        className="quiz-btn quiz-correct"
                        key={a.id}>
                        {a.answer}
                        </button>
                    } else if(a.id === this.state.selectedAnswerId && !this.state.selectedCorrect) {
                        return <button
                        className="quiz-btn quiz-wrong"
                        key={a.id}>
                        {a.answer}
                        </button>
                    } else if(a.id === this.state.correctAnswer.id) {
                        return <button
                        className="quiz-btn quiz-correct"
                        key={a.id}>
                        {a.answer}
                        </button>
                    } else {
                        return <button
                        className="quiz-btn quiz-unclickable"
                        key={a.id}>
                        {a.answer}
                        </button>
                    }
                    }
                )}
            </div>
        }

        let leaderboard = <div></div>;
        if(this.state.leaderboard !== null) {
            leaderboard = 
            <div>
            {this.state.leaderboard.map((u) => {
                <p key={u.user_id}>{u.username} : {u.userScore}</p>
            })
            }
            </div>

        }

        let timer = <div><p>Time elapsed: {this.state.timer}s</p></div>

        let gameOver = <div></div>;
        if(this.state.gameOver) {
            if(this.state.winner) {
                gameOver = <div><h2>YOU WON</h2></div>
            } else {
                gameOver = <div><p>Sorry, you didnt win</p></div>
            }
        }

        return(
            <div>
                <h3>Game Id: {this.props.gameId}</h3>

                <div className="grid">
                    <div>
                        {startGame}
                        {roundOver}

                        <h2>total score: {this.state.totalScore} you are in {this.state.placement}. place!</h2>
                        {round}

                        {leaderboard}

                        {question}

                        {answers}

                        {timer}

                        {gameOver}
                    </div>
                    <div>
                        {users}
                    </div>
                </div>

                

                
                <Prompt
                message="If you leave now the game will be forfeited. Are you sure you want to
                leave?"
                />
            </div>

            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.userReducer.loggedIn,
        user: state.userReducer.user,
        token: state.userReducer.token,
        inGame: state.gameReducer.inGame,
        userCreatedGame: state.gameReducer.userCreatedGame,
        gameId: state.gameReducer.gameId,
        waitingForPlayers: state.gameReducer.waitingForPlayers,
        users: state.gameReducer.users
    }
}

export default withRouter(connect(mapStateToProps)(Game));