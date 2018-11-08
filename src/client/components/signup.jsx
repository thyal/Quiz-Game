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

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onPassword2Change = this.onPassword2Change.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    onPasswordChange(event) {
        this.setState({password: event.target.value});
    }

    onPassword2Change(event) {
        this.setState({password2: event.target.value});
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
                this.setState({error: this.props.error});
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
                    onChange={this.onUsernameChange}
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
                    onChange={this.onPasswordChange}
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
                    onChange={this.onPassword2Change}
                    />
                </div>
                <div>
                    <button className="btn btn-submit" type="submit">Sign up</button>
                </div>
            </form>
        </div>

        let error = <div></div>;
        if(this.state.error !== null && this.state.error !== undefined) {
            error = <div className="error-msg"><p>{this.state.error}</p></div>;
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