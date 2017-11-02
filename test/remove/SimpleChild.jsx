import React, {Component} from "react";

export default class extends Component {
    render() {
        return (
            <div className="parent">
                <span>I'm parent</span>
                <div className="child">I'm child</div>
            </div>
        )
    }
}