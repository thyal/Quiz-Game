import React from "react";
import { connect } from "react-redux";

class Leaderboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            leaderboard: null
        };
    }
    componentDidMount() {
        this.getLeaderboard();
    }

    async getLeaderboard() {
        const url = "api/game/leaderboard";
        let response;
        let leaderboard;

        try {
            response = await fetch(url);
        } catch(error) {
            this.setState({error: "Something went wrong", leaderboard: null});
        }
        if(response.status === 200) {
            leaderboard = await response.json();
            this.setState({leaderboard: leaderboard, error: null});
        }

    }

    render() {
        let html;

        if(this.state.error !== null) {
            html = <p>{this.state.error}</p>
        } else if(this.state.leaderboard === null || this.state.leaderboard.length === 0) {
            html = <h3>There are currently no users in the leaderboard</h3>
        } else {
            html = 
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Number of wins</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.leaderboard.map(u => 
                            <tr key={u.username}>
                                <td>{u.username}</td>
                                <td>{u.wins}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        }

        return(
            <div>
                <h2>Leaderboard</h2>
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

export default connect(mapStateToProps)(Leaderboard);