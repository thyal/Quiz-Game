import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../actions/userActions";

class Signup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            password2: "",
            error: null
        }

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(event) {
        const statename = event.target.id;
        const value = event.target.value;
        this.setState({
            [statename]: value
        });
    }

    async onSubmit(event) {
        event.preventDefault();
        const {username, password, password2} = this.state;
        if(password !== password2) {
            this.setState({error: "The passwords does not match"});
        } else {
            const { dispatch } = this.props;
            if(username && password && password2) {
                await dispatch(userActions.signup(username, password, this.props.history));
                if(this.props.error !== undefined) {
                    this.setState({error: this.props.error});
                }
            } else {
                this.setState({error: "All fields must be filled out"});
            }
        }
    }

    render() {

        let html = 
        <div className="input-form">
            <form onSubmit={this.onSubmit}>
                <div>
                    <label
                    htmlFor="username"
                    >
                    Username
                    </label>
                    <input
                    type="text"
                    id="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    />
                </div>

                <div>
                    <label
                    htmlFor="password"
                    >
                    Password
                    </label>
                    <input
                    type="password"
                    id="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    />
                </div>

                <div>
                    <label
                    htmlFor="password2"
                    >
                    Enter password again
                    </label>
                    <input
                    type="password"
                    id="password2"
                    value={this.state.password2}
                    onChange={this.handleChange}
                    />
                </div>
                <div>
                    <button className="btn btn-submit" type="submit">Sign up</button>
                </div>
            </form>
        </div>

        let error = <div></div>;
        if(this.state.error !== null && this.state.error !== undefined) {
            error = <div className="msg msg-error"><p>{this.state.error}</p></div>;
        }

        return(
            <div>
                <h2>Sign up</h2>
                {html}
                {error}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.userReducer.loggedIn,
        user: state.userReducer.user,
        error: state.userReducer.error
    }
}

export default withRouter(connect(mapStateToProps)(Signup));