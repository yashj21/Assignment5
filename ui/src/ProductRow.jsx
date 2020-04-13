//import React from 'react';
import React from '../node_modules/react';
import ReactDOM from '../node_modules/react-dom';

export default class ProductRow extends React.Component {
    // constructor() {
    // super();
    // this.handleClick = this.handleClick.bind(this);
    // }
    // handleClick(e){
    //     return window.open($this.props.producturl,'_blank');
    // }
    render() {
      const prop = this.props;
      const borderedStyle = { border: '1px solid silver', padding: 4 };
      return (
        <tr>
          <td style={borderedStyle}>{prop.productname}</td>
          <td style={borderedStyle}>{prop.productcat}</td>
          <td style={borderedStyle}>{prop.productprice}</td>
          <td style={borderedStyle}><a href={prop.producturl} target="_blank" rel="noopener noreferrer">View</a></td>
          <td><a href={`/#/edit/${prop.productid}`}>Edit</a></td>
        </tr>
      );
    }
  }
  