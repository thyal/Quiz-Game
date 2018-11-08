import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../actions/userActions";

class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        const { dispatch } = this.props;
        dispatch(userActions.logout());
    }
    
    loggedIn(username) {
        return(
            <div className="navRight">
                <ul>
                    <li><button onClick={this.handleLogout}>Log out</button></li>
                    <li><NavLink exact to={"/profile"}>{username}</NavLink></li>
                </ul>
            </div>
        );
    }

    notLoggedIn() {
        return(
            <div className="navRight">
                <ul>
                    <li><NavLink exact to={"/signup"}>Sign up</NavLink></li>
                    <li><NavLink exact to={"/login"}>Log in</NavLink></li>
                </ul>
            </div>
        );
    }

    render() {
        const user = this.props.user;

        let navrightContent;

        if(user === null || user === undefined) {
            navrightContent = this.notLoggedIn();
        } else {
            navrightContent = this.loggedIn(user.username);
        }

        return(
            <div className="navigationBar">
                <div className="navLeft">
                    <ul>
                        <li><NavLink exact to={"/"}>Home</NavLink></li>
                        <li><NavLink exact to={"/leaderboard"}>Leaderboard</NavLink></li>
                    </ul>
                </div>
                {navrightContent}
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

export default withRouter(connect(mapStateToProps)(Navigation));