import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { gameActions } from "../actions/gameActions";
import { userActions } from "../actions/userActions";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount() {
        //Check if user is already logged in.
        const {dispatch} = this.props;
        await dispatch(userActions.getUser());
    }

    async handleClick() {
        const { dispatch } = this.props;

        let game = await dispatch(gameActions.getRandomPlayersGame(this.props.history));
    }

    render() {
        let html = <div></div>;

        if(this.props.user === undefined) {
            html = 
            <div>
                <h4>Welcome.</h4>
                <p>This is a quiz game, here you can play against random players or your friends.</p>
                <p>However, you have to log in to play</p>
                <Link to="/login"><button className="btn btn-submit">Login</button></Link>
            </div>
        } else {
            html = 
            <div>
                <h4>This game has two game modes.</h4>
                <p>
                    You could start a game from here, and play against random players.
                    This works so that the first player who start a game will create a quiz,
                    and the players who come after will join that game. When the game is started,
                    a new game will be created if someone tries to start a game again.
                </p>
                <p>
                    The other mode is the game lobby. Here you can create a quiz, share the game id
                    with your friends and play together. You will also see a list with active games
                    that you could join. 
                </p>
                <h3>GAME RULES</h3>
                <p>
                    The number of questions are decided by the creator of each game. Each round
                    lasts 20 seconds, and you get scored on how fast you answer. 10 points for 
                    right answer, and additional 1 point for each second that is left of the round.
                    <b>It is smart to be fast! </b>
                    <p>You will always be able to see how you are doing, and how many points you
                        have. The leaderboard will be updated after each game.
                        <b>Try to get to the top!</b>
                    </p>
                </p>
                <Link to="/" onClick={this.handleClick}><button className="btn btn-submit">Start a game</button></Link>
                <Link to="/gameLobby"><button className="btn btn-normal">Go to the gamelobby</button></Link>
            </div>
                
        }

        return(
            <div>
                <h2>Quiz</h2>
                {html}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.userReducer.loggedIn,
        user: state.userReducer.user
    }
}

export default withRouter(connect(mapStateToProps)(Home));

