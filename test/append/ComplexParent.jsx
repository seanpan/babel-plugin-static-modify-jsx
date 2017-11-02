import React, {Component} from "react";

export default class extends Component {
    constructor(props) {
        super(props);
        console.log('init');
    }

    componentDidMount() {
        console.log('did mount');
    }

    handleClick() {
        console.log('clicked');
    }

    render() {
        return (
            <div className="wrapper">
                <div className="parent" onClick={this.handleClick.bind(this)}>
                    <span>parent</span>
                </div>
            </div>
        )
    }
}