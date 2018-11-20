import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../actions/userActions";

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    async componentDidMount() {
        const {dispatch} = this.props;
        await dispatch(userActions.getUser());
    }

    render() {
        let html = <div></div>;

        if(this.props.user === undefined) {
            html = 
            <div>
                <p>You have to log in to play</p>
                <Link to="/login"><button className="btn btn-submit">Login</button></Link>
            </div>
        } else {
            html = 
            <div>
                <h3>{this.props.user.username}</h3>
                <h4>Number of wins: {this.props.user.wins}</h4>
            </div>
        }
        return(
            <div>
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

export default connect(mapStateToProps)(Profile)