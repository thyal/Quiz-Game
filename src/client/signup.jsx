import React from "react";

export class Signup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            error: null
        }
    }

    render() {

        let error = <div></div>;
        if(this.state.error !== null) {
            error = <div className="errorTxt"><p>{this.state.error}</p></div>
        }

        return(
            <div>
                {error}
            </div>
        )
    }
}