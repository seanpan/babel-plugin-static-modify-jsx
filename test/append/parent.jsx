import React, {Component} from "react";

export default class extends Component {
    constructor(props) {
        super(props);
        console.log('parent init');
    }

    componentDidMount() {
        console.log('parent did mount');
    }

    handleClick() {
        console.log('parent clicked');
    }

    render() {
        return (
            <div ref="parent-div" onClick={this.handleClick.bind(this)}>
                <span>I'm parent</span>
            </div>
        )
    }
}