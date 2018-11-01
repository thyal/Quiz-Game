import React from "react";
import { Link, NavLink, withRouter } from "react-router-dom";

export class Navigation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="navigationBar">
                <ul>
                    <li><NavLink exact to={"/"}>Home</NavLink></li>
                    <li><NavLink exact to={"/leaderboard"}>Leaderboard</NavLink></li>
                </ul>          
            </div>
        );
    }
}