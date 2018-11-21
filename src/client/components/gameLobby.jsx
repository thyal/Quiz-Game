import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { gameActions } from "../actions/gameActions";

class GameLobby extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            joinId: 0
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleJoin = this.handleJoin.bind(this);
    }

    componentDidMount() {
        
        const { dispatch } = this.props;
        dispatch(gameActions.getActiveGames());
    }

    handleChange(event) {
        this.setState({joinId: event.target.value})
    }

    async handleClick(id) {
        const { dispatch } = this.props;
        await dispatch(gameActions.joinGame(id, this.props.history));
    }

    async handleJoin(event) {
        event.preventDefault();
        const { dispatch } = this.props;
        await dispatch(gameActions.joinGame(this.state.joinId, this.props.history));

        if(this.props.joinError) {
            alert("Cannot join that game id. This could be because the game has started, or that it was the wrong id. Try again.");
        }
    }

    render() {

        let inputGameId = 
        <div>
            <form className="input-form" onSubmit={this.handleJoin}>
                <label htmlFor="inputGameId">Enter the game id for a game you want to join</label>
                <input value={this.state.joinId} onChange={this.handleChange} type="number" id="inputGameId"/>
                <button type="submit" className="btn btn-submit">JOIN</button>
            </form>
        </div>

        let games = <div></div>;
        if(this.props.games === undefined || this.props.games.length === 0) {
            games = <p>There are currently no active games. You should create one!</p>
        } else {
            games = 
            <div>
                <table className="table">
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
                    <p>Create a new game.</p>
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
        games: state.gameReducer.games,
        joinError: state.gameReducer.error
    }
}

export default withRouter(connect(mapStateToProps)(GameLobby));