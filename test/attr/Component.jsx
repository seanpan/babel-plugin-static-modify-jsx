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
                <div className="parent-main" onClick={this.handleClick}>
                    <span className="child">child</span>
                    <input className="input" name="input-name" type="text" value={123} onBlur={this.handleClick.bind(this)}/>
                </div>
                <div className="parent-sub"/>
            </div>
        )
    }
}