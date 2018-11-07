import React from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Navigation extends React.Component {
    constructor(props) {
        super(props);
    }
    
    loggedIn(username) {
        return(
            <div className="navRight">
                <ul>
                    <li><NavLink exact to={"/login"}>Log out</NavLink></li>
                    <li><NavLink exact to={"/signup"}>{username}</NavLink></li>
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
        const username = this.props.username;
        let navrightContent;

        if(username === null || username === undefined) {
            navrightContent = this.notLoggedIn();
        } else {
            navrightContent = this.loggedIn(username);
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

export default withRouter(connect()(Navigation));