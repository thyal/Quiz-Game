import React from "react";

export class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            error: null
        };

        this.onUsernameChange.bind(this);
    }

    onUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    onPasswordChange(event) {
        this.setState({password: event.target.value});
    }

    render() {

        let html = 
        <div>
            <form onSubmit={(e) => this.onSubmit(e)}>
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
                    onChange={(e) => this.onUsernameChange(e)}
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
                    onChange={(e) => this.onPasswordChange(e)}
                    />
                </div>
            </form>
        </div>

        let error = <div></div>;
        if(this.state.error !== null) {
            error = <div className="errorTxt"><p>{this.state.error}</p></div>;
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