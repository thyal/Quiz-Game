import React from "react";
import { Link, withRouter } from "react-router-dom";
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
            timer: 20,
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
                timer: 20,
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
            clearInterval(this.timer);
            if(this.state.timer >= 0) {
                this.timer = setInterval(() => this.setState({
                    timer: this.state.timer - 1
                }), 1000);
            }
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
            this.setState({timer: 15});
            this.timer = setInterval(() => this.setState({
                timer: this.state.timer -1
            }), 1000);
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

        if(this.state.users !== null && this.state.users !== undefined && !this.state.gameOver){
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
            console.log(this.state.users.length);
            if(this.state.users.length <= 1) {
                startGame = <button className="btn quiz-unclickable">You have to wait for atleast one other player</button>
            } else {
                startGame = <button onClick={this.handleClick} className="btn btn-submit">START GAME</button>
            }    
        } else if(!this.props.userCreatedGame &&!this.state.hasStarted) {
            startGame = <p>Waiting for the game to start.</p>
        }

        //The round counter.
        let round = <div></div>;

        if(this.state.round !== null && !this.state.gameOver) {
            round = <h3>Question {this.state.round.round} of {this.state.round.totalRounds}</h3>
        }

        //The placement and total score
        let placement = <div></div>;
        if(this.state.placement !== null) {
            placement = <p>You are in {this.state.placement}. place!</p>
        }

        let totalScore = 
        <div>
            <h2>Your total score: {this.state.totalScore}</h2>
            {placement}
        </div>

        //The count down timer
        let timer = <div></div>;
        
        if(this.state.roundOver && !this.state.gameOver) {
            timer =
            <div>
                <h3>Time left to new round: <b>{this.state.timer}</b>s</h3>
            </div>
        } else if(!this.state.roundOver && !this.state.gameOver) {
            timer =
            <div>
                <h3>Time left of the round: <b>{this.state.timer}</b>s</h3>
            </div>
        }

        //The question and answers
        let question = <div></div>;

        if(this.state.question !== null && !this.state.gameOver) {
            question = 
            <div>
                <h2>Category: {this.state.question.category_name}</h2>
                <h3>{this.state.question.question}</h3>
            </div>
        }

        let answers = <div></div>;
        if(this.state.answers.length > 0 && !this.state.roundOver && !this.state.gameOver) {
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

        if(!this.state.clickable && !this.state.gameOver) {
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
        if(this.state.correctAnswer !== null && !this.state.gameOver) {
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
        if(this.state.roundOver && this.state.correctAnswer !== null && !this.state.gameOver) {
            roundOver = 
            <div>
            {result}
                <p>The correct answer is: {this.state.correctAnswer.answer}</p>
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

        //When the game is over.
        let gameOver = <div></div>;
        let gameOverLinks;
        if(this.state.gameOver) {
            if(this.state.winner) {
                gameOver = 
                <div className="text-center">
                    <h2 className="msg msg-success">Congratulations! You won the game!</h2>
                </div>
            } else {
                gameOver = 
                <div>
                    <h2>You ended in {this.state.placement}. place</h2>
                </div>
            }
            gameOverLinks = 
            <div>
            <Link to="/leaderboard"><button className="btn btn-normal">Go to the leaderboard</button></Link>  
            <Link to="/"><button className="btn btn-normal">Go to the homepage</button></Link>
            </div>
        }

        return(
            <div>
                <div className="grid">
                    <div>
                    <h3>Game Id: {this.props.gameId}</h3>
                
                    {totalScore}
                    {timer}
                    </div>
                    <div className="grid-right">
                        {users}
                    </div>
                </div>

                <div>
                    {startGame}
                    {roundOver}

                    {round}

                    {leaderboard}

                    {question}

                    {answers}

                    {gameOver}
                    {gameOverLinks}
                </div>

                

                
                <Prompt
                when={!this.state.gameOver}
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