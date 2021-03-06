import React from 'react';
import ReactDOM from 'react-dom';
import JSONgrid from './components/JSONgrid';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import * as data from './data.js';

// let data = [
//     {
//       'firstname': 'Jennifer',
//       'lastname': 'Lawrence',
//       'email': 'jlaw@mail.me'
//     },
//     {
//       'firstname': 'Katnis',
//       'lastname': 'Everdeen',
//       'email': 'katnis@mail.me'
//     },
//     {
//       'firstname': 'Aurora',
//       'lastname': 'Lane',
//       'email': 'aurlane@mail.me'
//     }
//   ];
console.log(data.data);
let root = document.querySelector('#root');

ReactDOM.render(
  <JSONgrid filter={true} responsive={false} className='table' data={data.data}  />,
  root
);
