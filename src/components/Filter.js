import React, { Component } from 'react';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
    this.update = this.update.bind(this);
  }

  update(event) {
    const val = event.target.value;
    // debugger;
    this.setState({ text: val });
    this.props.update(val);
  }


  render() {
    return (
      <div className='row'>
        <div className='col-md-1'></div>
        <div className='col-md-10'>
          <input
            onChange={this.update}
            type='text'
            placeholder='start typing'
            className='form-control' />
          </div>
          <div className='col-md-1'></div>
      </div>
    )
  }
}
export default Filter;
