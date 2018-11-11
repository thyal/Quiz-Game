import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import openSocket from 'socket.io-client';
import { gameActions } from "../actions/gameActions";

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            hasStarted: false,
            timer: 0,
            question: null,
            answers: [],
            selectedAnswerId: 0,
            clickable: true,
            roundOver: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleAnswer = this.handleAnswer.bind(this);
    }

    async componentDidMount() {
        await this.getUsers();
        this.socket = openSocket(window.location.origin);
        
        const payload = {
            user_id: this.props.user.id, 
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

        this.socket.on('starting', (msg) => {
            this.setState({hasStarted: true});
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

        this.socket.on('roundOver', (status) => {
            this.setState({roundOver: true});
            clearInterval(this.timer);
        })
        
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
        console.log(id);
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

        if(this.state.hasStarted) {
            html = <h2>PLAYING</h2>
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
                className="btn btn-submit" 
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
                        className="btn btn-selected"
                        key={a.id}>
                        {a.answer}
                        </button>
                    } else {
                        return <button
                        className="btn btn-unclickable"
                        key={a.id}>
                        {a.answer}
                        </button>
                    }
                    }
                )}
            </div>
        }

        if(this.state.roundOver) {
            html = 
            <div>
                <h3>ROUND OVER</h3>
            </div>
        }

        let timer = <div><p>{this.state.timer}</p></div>

        return(
            <div>
                <h3>GAME</h3>
                {html}

                {startGameBtn}

                {question}

                {answers}

                {timer}
            </div>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        loggedIn: state.userReducer.loggedIn,
        user: state.userReducer.user,
        inGame: state.gameReducer.inGame,
        userCreatedGame: state.gameReducer.userCreatedGame,
        gameId: state.gameReducer.gameId,
        waitingForPlayers: state.gameReducer.waitingForPlayers,
        users: state.gameReducer.users
    }
}

export default withRouter(connect(mapStateToProps)(Game));