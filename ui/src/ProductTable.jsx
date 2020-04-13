import ProductRow from './ProductRow.jsx';
//import React from 'react';
import React from '../node_modules/react';
import ReactDOM from '../node_modules/react-dom';

export default class ProductTable extends React.Component {
      constructor(props){
            super(props)
        }
      render() {
        const rows = [];
        //  let productArray = this.props.productArray;
        const prop = this.props;
        const dollar = '$';
        if (prop.productArray && Array.isArray(prop.productArray)) {
          prop.productArray.forEach((product) => {
            rows.push(<ProductRow
              key={product.id}
              product={product}
              deleteProduct={prop.deleteProduct}
              index={product.id}
            />);
          });
        }
        const borderedStyle = { border: '1px solid silver', padding: 4 };
        return (
          <table style={{ borderCollapse: 'collapse' }}>
            <thead className="thead-dark">
              <tr>
                <th style={borderedStyle}>Name</th>
                <th style={borderedStyle}>Category</th>
                <th style={borderedStyle}>Price</th>
                <th style={borderedStyle}>Image</th>
                <th style={borderedStyle}>Action</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        );
      }
    }
    