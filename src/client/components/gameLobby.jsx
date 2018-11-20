import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { gameActions } from "../actions/gameActions";

class GameLobby extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        
        const { dispatch } = this.props;
        dispatch(gameActions.getActiveGames());
    }

    handleClick(id) {
        const { dispatch } = this.props;
        dispatch(gameActions.joinGame(id, this.props.history));
    }

    render() {

        let inputGameId = 
        <div>
            <form className="input-form">
                <label htmlFor="inputGameId">Enter the game id for a game you want to join</label>
                <input type="number" id="inputGameId"/>
                <button className="btn btn-submit">JOIN</button>
            </form>
        </div>

        let games = <div></div>;

        if(this.props.games !== undefined) {
            games = 
            <div>
                <table className="tbl-active-games">
                    <thead>
                        <tr>
                            <th>Game id</th>
                            <th>Name</th>
                            <th>Number of questions</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.games.map(e => 
                            <tr key={e.id}>
                                <td>{e.id}</td>
                                <td>{e.name}</td>
                                <td>{e.numberOfQuestions}</td>
                                <td><button onClick={() => this.handleClick(e.id)}>JOIN</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        }

        return(
            <div className="grid">
                <div>
                    <h3>Game Lobby</h3>
                    <Link to="/createGame"><button className="btn btn-submit">Create a new game</button></Link>  
                    {inputGameId}
                </div>
       
                <div>
                    <h3>List of active games</h3>
                    {games}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.userReducer.loggedIn,
        user: state.userReducer.user,
        games: state.gameReducer.games
    }
}

export default withRouter(connect(mapStateToProps)(GameLobby));