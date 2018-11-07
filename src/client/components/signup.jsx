import React from "react";

export class Signup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            error: null
        }

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    onPasswordChange(event) {
        this.setState({password: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();
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
                    <button type="submit">Log in</button>
                </div>
            </form>
        </div>

        let error = <div></div>;
        if(this.state.error !== null) {
            error = <div className="errorTxt"><p>{this.state.error}</p></div>
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