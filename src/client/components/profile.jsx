import React from "react";
import { connect } from "react-redux";

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        console.log(this.props);
        return(
            <div><h3>Profile</h3></div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Profile)