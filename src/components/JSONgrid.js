import React, { Component, PropTypes } from 'react';
import Thead from './Thead';
import Tbody from './Tbody';
import Filter from './Filter';

class JSONgrid extends Component {
  componentDidMount() {
    this._init();
  }
  constructor(props) {
    super(props);
    this.state = {
      header: [],
      bodyArr: []
    }
  }

  _init() {
    const { data } = this.props;
    const header = this._createHeaderArry(data[0]);
    const bodyArr = this._createBodyArr(data);
    const originalData = bodyArr;
    this.setState({
      header,
      bodyArr,
      originalData
    });
    this._bindMethods();
  }

  _bindMethods() {
    this.onClick = this.onClick.bind(this);
    this.update = this.update.bind(this);
  }

  _createBodyArr(data) {
    const bodyArr = [];
    for (var index = 0; index < data.length; index ++) {
      const bodyRow = [];
      for (var prop in data[index]) {
        if (prop) {
          bodyRow.push(data[index][prop]);
        }
      }
      bodyArr.push(bodyRow)
    }
    return bodyArr;
  }

  _createHeaderArry(data) {
    const arr = [];
    for (var prop in data) {
      if(prop) {
        arr.push(prop);
      }
    }
    return arr;
  }

  _sortBy(index, dir) {
    const header = this.state.header;
    const bodyArr = this.state.bodyArr;
    let i;
    for (var count = 0; count < header.length; count++) {
      if (header[count] && header[count] === index) {
        i = count;
        break;
      }
    }
    this.setState({
      bodyArr: this._sortJSON(bodyArr, i, dir)
    });
  }

  _sortJSON(data, i, dir) {
    data.sort(this._propComparator(i, dir));
    return data;
  }

  _propComparator(prop, dir) {
    return (a, b) => {
      if (dir === 'asc') {
        if (a[prop] > b[prop]) { return 1; };
        if (a[prop] < b[prop]) { return -1; };
        return 0;
      } else if (dir === 'dsc') {
        if (a[prop] > b[prop]) { return -1; };
        if (a[prop] < b[prop]) { return 1; };
        return 0;
      }
    }
  }

  _filterBy(query) {
    const {originalData} = this.state;
    const data = originalData.reduce((acc, items) => {
      const match = items.filter((item) => {
        return (item.toLowerCase().indexOf(query) >= 0 ) ? true:false;
      });
      if (match.length > 0) { acc.push(items)};
      return acc;
    }, []);
    this.setState({
      bodyArr: data
    });
  }

  onClick(event, dir) {
    const index = event.target.textContent;
    this._sortBy(index, dir);
  }

  update(query) {
    this._filterBy(query);
  }
  render() {
    let index = 0;
    return (
      <div>
        {this.props.filter ?
          <Filter update={this.update}/> : null
        }
        <div className={this.props.responsive === true ? 'table-responsive' : ''}>
          <table className={this.props.className}>
            <Thead onClick={this.onClick} header={this.state.header} />
            <tbody>
            {

              this.state.bodyArr.map((bodyRow) => {
                return (
                  <Tbody
                    key={index++}
                    bodyRow={bodyRow}
                    highlight={this.state.query}
                  />
                )
              })
            }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

JSONgrid.propTypes = {
  filter: PropTypes.bool,
  responsive: PropTypes.bool,
  className: PropTypes.string,
  data: PropTypes.arrayOf(Object).isRequired
}

export default JSONgrid;
