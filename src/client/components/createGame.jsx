import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { gameActions } from "../actions/gameActions";

class CreateGame extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            numberOfQuestions: 10,
            error: null
        };
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
        const {name, numberOfQuestions} = this.state;
        const randomplayers = this.props.randomplayers;
        
        const { dispatch } = this.props;
        if(name && numberOfQuestions) {
            await dispatch(gameActions.createGame(name, numberOfQuestions, randomplayers, this.props.history));
            if(this.props.error !== undefined) {
                this.setState({error: this.props.error});
            }          
        } else {
            this.setState({error: "All fields must be filled out"});
        }
    }

    render() {
        let html = 
        <div className="input-form">
            <form onSubmit={this.onSubmit}>
                <div>
                    <label
                    htmlFor="name"
                    >
                    Name of the game
                    </label>
                    <input
                    type="text"
                    id="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    />
                </div>

                <div>
                    <label
                    htmlFor="numberOfQuestions"
                    >
                    Number of questions in the game. {this.state.numberOfQuestions}
                    </label>
                    <input
                    type="range"
                    min="5"
                    max="20"
                    id="numberOfQuestions"
                    value={this.state.numberOfQuestions}
                    onChange={this.handleChange}
                    />
                </div>
                <div>
                    <button className="btn btn-submit" type="submit">Create game</button>
                </div>
            </form>
        </div>

        let error = <div></div>;
        if(this.state.error !== null && this.state.error !== undefined) {
            error = <div className="msg msg-error"><p>{this.state.error}</p></div>;
        }
        return(
            <div>
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
        error: state.gameReducer.error,
        randomplayers: state.gameReducer.randomplayers
    }
}

export default withRouter(connect(mapStateToProps)(CreateGame));