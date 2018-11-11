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
                <Link to="/login"><button className="btn btn-submit">Login</button></Link>
            </div>
        } else {
            html = <Link to="/gameLobby"><button className="btn btn-submit">Start a game</button></Link>
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

