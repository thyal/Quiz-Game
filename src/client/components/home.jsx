import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let html = <div></div>;

        if(this.props.user === undefined) {
            html = <div>
                <p>You have to log in to play</p>
                <button className="btn"><Link to="/login">Login</Link></button>
            </div>
        } else {
            html = <button className="btn btn-submit"><Link to="/gameLobby">Start a game</Link></button>
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

export default connect(mapStateToProps)(Home);

