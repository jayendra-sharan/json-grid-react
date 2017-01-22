import React, { Component } from 'react';

class Thead extends Component {
  constructor(props) {
    super();
    this.onClick = this.onClick.bind(this);
    this.state = {
      currHead: null,
      prevHead: null
    }
  }
  onClick(event) {
    event.preventDefault();
    if (this.state.currHead === null) {
      // debugger;
      this.setState({
        currHead: event.target,
        prevHead: event.target
      });
      this._addClass(event.target, 'asc');
    } else if (this.state.currHead !== null && this.state.currHead === event.target) {
      this._toggleClass(this.state.currHead);
    } else {
      this._addClass(event.target, 'asc');
      this._removeClass(this.state.currHead);
      this.setState({
        prevHead: this.state.currHead,
        currHead: event.target,
      })
    }
    this.props.onClick(event, event.target.className);
  }

  _addClass(target, clazz) {
    // debugger;
    target.className = clazz;
  }
  _toggleClass(target) {
    // debugger;
    target.className = target.className === 'asc' ? 'dsc' : 'asc';
  }
  _removeClass(target) {
    target.className = '';
  }

  render() {
    const {header} = this.props;
    return(
      <thead>
        <tr>
        {
          header.map((colHead) => {
            return (
                <th
                  onClick={this.onClick}
                  key={colHead}
                >
                  {colHead}
                </th>
              )
          })
        }
        </tr>
      </thead>
    )
  }
}

export default Thead;
