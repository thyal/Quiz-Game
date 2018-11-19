import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { gameActions } from "../actions/gameActions";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    async handleClick() {
        const { dispatch } = this.props;

        let game = await dispatch(gameActions.getRandomPlayersGame(this.props.history));
        console.log(game);
    }

    render() {
        let html = <div></div>;

        if(this.props.user === undefined) {
            html = <div>
                <p>You have to log in to play</p>
                <Link to="/login"><button className="btn btn-submit">Login</button></Link>
            </div>
        } else {
            html = 
            <div>
                <h3>Home</h3>
                <p>You could start a game directly from here, if a game is already started by another player,
                    you will join that game.</p>

                <p>Alterativly, you could go to the gamelobby, and see a list of active games ready to be
                    joined, or create a new game.</p>
                    
                <Link to="/" onClick={this.handleClick}><button className="btn btn-submit">Start a game</button></Link>
                <Link to="/gameLobby"><button className="btn btn-submit">Go to the gamelobby</button></Link>
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

