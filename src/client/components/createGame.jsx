import React from "react";

class CreateGame extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            creatorUsername: "",
            name: "",
            numberOfQuestions: 10,
            error: null
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const statename = event.target.id;
        const value = event.target.value;
        this.setState({
            [statename]: value
        });
    }

    render() {
        let html = 
        <div className="input-form">
            <form onSubmit={this.handleSubmit}>
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

        return(
            <div>
                {html}
            </div>
        );
    }
} 

export default CreateGame;