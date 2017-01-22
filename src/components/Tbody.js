import React, { Component } from 'react';

class Tbody extends Component {
  render() {
    const {bodyRow} = this.props;
    let index = 0;
    return (
      <tr>
        {
          bodyRow.map((td) => {
            return (
              <td key={index++}>
                {
                  td
                }
              </td>
            )
          })
        }
      </tr>
    )
  }
}

export default Tbody;
