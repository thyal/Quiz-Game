import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import openSocket from 'socket.io-client';
import { gameActions } from "../actions/gameActions";
import { userActions } from "../actions/userActions";

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
            roundOver: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleAnswer = this.handleAnswer.bind(this);
    }

    async componentDidMount() {

        //First we get users already in the game-room, and open a socket connection
        await this.getUsers();

        this.socket = openSocket(window.location.origin);

        const payload = {
            user_id: this.props.user.id,
            token: this.props.token,
            username: this.props.user.username, 
            gameId: this.props.gameId
        };

        this.socket.emit('game', payload);
        
        this.socket.on('newUser', (user) => {

            this.setState(
                prev => {
                    if(prev.users === null || prev.users === undefined){
                        return {users: [user]};
                    } else {
                        return {users: [...prev.users, user]};
                    }
                }
            )
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
            this.setState({totalScore: totalScore});
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
        
    }

    async getUsers() {
        const { dispatch } = this.props;
        await dispatch(gameActions.getUsersInGame(this.props.gameId));

        this.setState({users: this.props.users});
    }

    handleClick() {

        this.socket.emit('startGame', this.props.gameId);
    }

    handleAnswer(id) {
   
        this.setState({clickable: false, selectedAnswerId: id});
        const payload = {user_id: this.props.user.id, answer_id: id, time: this.state.timer};
        this.socket.emit('answered', payload);
    }

    render() {

        let html = <div></div>;

        if(this.state.users !== null && this.state.users !== undefined){
            html = <div>
                <h4>Players who joined the game</h4>
                {this.state.users.map(user =>
                    <p key={user.user_id}> {user.username}</p>
                )}
            </div>;
        }

        let startGameBtn = <div></div>;

        if(this.props.userCreatedGame && !this.state.hasStarted) {
            startGameBtn = <button onClick={this.handleClick} className="btn btn-submit">START GAME</button>
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
        if(this.state.roundOver && this.state.correctAnswer !== null) {
            html = 
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

        let timer = <div><p>Time elapsed: {this.state.timer}s</p></div>

        return(
            <div>
                <h3>GAME</h3>
                {html}

                {startGameBtn}
                <h2>total score: {this.state.totalScore}</h2>
                {round}

                {question}

                {answers}

                {timer}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
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