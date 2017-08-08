import React, {Component} from "react";

export default class Child extends Component {
    constructor(props) {
        super(props);
        console.log('child init');
    }

    componentDidMount() {
        console.log('child did mount');
    }

    handleClick() {
        console.log('child clicked');
    }

    render() {
        return (
            <div onClick={this.handleClick.bind(this)}>
                <span>I'm child</span>
            </div>
        )
    }
}