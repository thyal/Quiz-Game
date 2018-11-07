import React from "react";
import { connect } from "react-redux";

class Leaderboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        console.log(this.props);
        return(
            <div><h3>Leaderboard</h3></div>
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