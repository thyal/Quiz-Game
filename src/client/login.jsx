import React from "react";

export class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user_id: "",
            password: "",
            error: null
        };
    }

    render() {

        let error = <div></div>;
        if(this.state.error !== null) {
            error = <div className="error_msg"><p>{this.state.error}</p></div>;
        }

        return(
            <div>
                {error}
            </div>
        );
    }
}