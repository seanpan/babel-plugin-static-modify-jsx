# babel-plugin-static-modify-jsx

A babel plugin to modify JSX while transforming. Very useful when you have a **core view layer** with common and stable functionality, some specified/customized requirements need to be implemented or added to your application though. It is a very common scenario when a platform-like project need to support several different customers.
To keep the core view layer pure, separated config as decorative DSL is quite necessary.

### Example

#### App.jsx
```
import React, {Component} from "react";
import ReactDOM from "react-dom";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }

    handleChange(ev) {
        this.setState({
            value: ev.target.value
        })
    }

    render() {
        return (
            <div className="wrapper">
                <div className="parent-main">
                    <span className="child">child</span>
                    <input className="input" name="input-name" type="text"
                           onChange={this.handleChange.bind(this)}
                           value={this.state.value}/>
                </div>
                <div className="parent-sub"/>
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('viewport')
);
```

#### Comp.jsx
```
class Comp extends Component {
    render() {
        const {value} = this.props;
        return (
            <div>
                <input value={value}/>
            </div>
        )
    }
}
```

#### webpack.config.js
```
{
  test: /\.(js|jsx)$/,
  exclude: /(node_modules|bower_components)/,
  use: [{
      loader: 'babel-loader',
      options: {
          presets: [['env', {modules: false}], 'react', 'stage-2'],
          plugins: [
              [require('babel-plugin-static-modify-jsx').default, {
                  config: path.resolve(__dirname, "config.js")
              }]
          ]
      }
  }]
}
```

#### config.js
```
const path = require('path');

module.exports = {
    '/Users/sean/workbench/bpsmj-poc/src/App.jsx': function (cast) {
        const wrapper = cast.find('.wrapper');
        wrapper.appendModule(path.resolve(__dirname, 'src/Comp.jsx'), [
            {
                key: 'value',
                value: 'this.state.value',
                asExpression: true
            }
        ]);
    }
};
```

#### build
Depends on your own project building config. For example:
```
webpack
```
or
```
tnpm run build
```

#### output
//Manually beautified output example:
```
import React, {Component} from "react";
import ReactDOM from "react-dom";

class Comp extends Component {
    render() {
        const {value} = this.props;
        return (
            <div>
                <input value={value}/>
            </div>
        )
    }
}

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }

    handleChange(ev) {
        this.setState({
            value: ev.target.value
        })
    }

    render() {
        return (
            <div className="wrapper">
                <div className="parent-main">
                    <span className="child">child</span>
                    <input className="input" name="input-name" type="text"
                           onChange={this.handleChange.bind(this)}
                           value={this.state.value}/>
                </div>
                <div className="parent-sub"/>
                <Comp value={this.state.value}/>
            </div>
        )
    }
}
```
### Current supported APIs

- find
- append
- appendModule
- prepend
- remove
- removeAttr
- attr

For more information and usage, kindly refer to test cases.
[config.js](https://github.com/seanpan/babel-plugin-static-modify-jsx/blob/master/config.js)
[tests](https://github.com/seanpan/babel-plugin-static-modify-jsx/tree/master/test)

### Progress

Very begnning, more features/APIs will be added soon.




