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
            hasStarted: false
        }
        this.handleClick = this.handleClick.bind(this);
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

        return(
            <div>
                <h3>GAME</h3>
                {html}

                {startGameBtn}
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