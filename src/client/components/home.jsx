import React from "react";
import { connect } from "react-redux";

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if(this.props.user === undefined) {
            this.props.history.push("/login");
        }
    }

    render() {
        return(
            <div>
                <p>Heeeei</p>
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

export default connect(mapStateToProps)(Home);

