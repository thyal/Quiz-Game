import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../actions/userActions";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            error: null
        };

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    //This is needed so that we remove all error / success messages if the component is reloaded.
    componentWillMount() {
        const { dispatch } = this.props;
        dispatch({type: "CLEAR_ALERTS"});
    }

    onUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    onPasswordChange(event) {
        this.setState({password: event.target.value});
    }

    async onSubmit(event) {
        event.preventDefault();
        const {username, password} = this.state;
        const { dispatch } = this.props;
        if(username && password) {
            dispatch(userActions.login(username, password, this.props.history));
        }
    }

    render() {

        let html = 
        <div>
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
                    <button className="btn btn-login" type="submit">Log in</button>
                </div>
            </form>
        </div>

        let error = <div></div>;
        if(this.props.error !== null) {
            error = <div className="errorTxt"><p>{this.props.error}</p></div>;
        }

        return(
            <div>
                <h2>Log in</h2>
                {html}
                {error}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.userReducer.loggedIn,
        user: state.userReducer.user,
        error: state.userReducer.error
    }
}

export default withRouter(connect(mapStateToProps)(Login));