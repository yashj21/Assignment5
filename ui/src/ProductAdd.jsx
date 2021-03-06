//import React from 'react';
import React from '../node_modules/react';

import PropTypes from 'prop-types';
const RESET_VALUES = {
  id: '', category: '', price: '$', name: '',
};
export default class ProductAdd extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        product: RESET_VALUES,
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleSubmit(e) {
      e.preventDefault();
      const form = document.forms.productAdd;
      form.price.value = parseFloat(form.price.value.substring(1));
      const productnew = {
        productname: form.productname.value,
        productcat: form.productcat.value,
        productprice: form.price.value,
        producturl: form.url.value,
      };
      const prop = this.props;
      prop.createProducts(productnew);
      form.productname.value = '';
      this.setState((prevState) => {
        const prevproduct = prevState.product;
        prevproduct.price = '$';
        return { product: prevState.product };
      });
  
      form.productcat.value = '';
      form.url.value = '';
  
      // form.owner.value = ""; form.title.value = "";
    }
  
    handleChange(e) {
      const target = e.target;
      // const name = target.name
      const value = target.value;
      this.setState((prevState) => {
        const prevproduct = prevState.product;
        prevproduct.price = value;
        return { product: prevState.product };
      });
    }
  
    render() {
      const paddingStyle = { margin: 10 };
      const paddingStyle2 = { margin: 80 };
      return (
        <form id="test" name="productAdd" onSubmit={this.handleSubmit}>
          <label htmlFor="productname" style={paddingStyle}>Product Name</label>
          &nbsp;
          <label htmlFor="productcat" style={paddingStyle2}>Product Category</label>
          <br />
          <input type="text" name="productname" style={paddingStyle} />
          &nbsp;
          <select id="productcat" style={paddingStyle}>
          &nbsp;
            <option value="Shirts">Shirts</option>
            <option value="Jeans">Jeans</option>
            <option value="Jackets">Jackets</option>
            <option value="Sweaters">Sweaters</option>
            <option value="Accessories">Accessories</option>
          </select>
          <br />
          <label htmlFor="price" style={paddingStyle}>Price Per Unit</label>
          &nbsp;
          <label htmlFor="url" style={paddingStyle2}>Image URL</label>
          &nbsp;
          <br />
          <input type="text" name="price" onChange={this.handleChange} value={RESET_VALUES.price} style={paddingStyle} />
          &nbsp;
          <input type="text" name="url" style={paddingStyle} />
          <br />
          <br />
          <button type="submit">AddProduct </button>
        </form>
      );
    }
  }