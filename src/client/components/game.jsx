import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import openSocket from 'socket.io-client';
import { gameActions } from "../actions/gameActions";

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        }
    }

    async componentDidMount() {
        await this.getUsers();
        this.socket = openSocket(window.location.origin);
        const payload = {userId: this.props.user.id, gameId: this.props.gameId};
        this.socket.emit('game', payload);
        this.socket.on('newUser', (user) => {
            console.log(user);
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
    }

    async getUsers() {
        const { dispatch } = this.props;
        let users = await dispatch(gameActions.getUsersInGame(this.props.gameId));
        console.log(users);
        this.setState({users: users});
    }

    render() {

        let users = <div></div>;

        if(this.state.users !== null && this.state.users !== undefined){
            users = <div>
                {this.state.users.map(user =>
                    <p key={user.user_id}> {user.user_id}</p>
                )}
            </div>;
        }
        return(
            <div>
                <h3>GAME</h3>
                {users}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        loggedIn: state.userReducer.loggedIn,
        user: state.userReducer.user,
        inGame: state.gameReducer.inGame,
        gameId: state.gameReducer.gameId,
        waitingForPlayers: state.gameReducer.waitingForPlayers
    }
}

export default withRouter(connect(mapStateToProps)(Game));