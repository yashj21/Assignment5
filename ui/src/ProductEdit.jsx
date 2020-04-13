import React from 'react';
import { render } from 'react-dom/cjs/react-dom.development';
import graphQLFetch from './graphQLFetch.js';

export default class ProductEdit extends React.Component {
    constructor() {
        super();
        this.state = {    product: []   };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    componentDidMount() {
        this.loadData();
    }
    async loadData() {
        const query = `query product($id:Int!) {
          product(id:$id) {
            id productcat productname productprice producturl
          }
        }`;
        const { match: { params: { id } } } = this.props;
        console.log({ id });
        const variables = { id };
        const response = await fetch(window.ENV.UI_API_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query, variables }),
        });
        const result = await response.json();
        //const data = await graphQLFetch(query, { id });
        console.log(result);
        console.log(result.data); 
        this.setState({ product : result.data.product});
      }
      handleChange(e){
        const { name, value: textValue } = event.target;
        console.log({ name, value: textValue });
        this.setState(prevState => ({
            product: { ...prevState.product, [name]: value },
          }));
      }
      async handleSubmit(e) {
        e.preventDefault();
        const { product } = this.state;
        const { id, ...changes } = product;
        const variables = { id, changes };
        const query = `mutation productUpdate($id: Int!, $changes: productUpdateInputs!) {  
          productUpdate(id: $id, changes: $changes) {    
            id productcat productname productprice producturl 
          } 
        }`;
        await fetch(window.ENV.UI_API_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query, variables }),
        });
        alert('Romil\'s Product updated Successfully');
        this.loadData();
      }
    
    render(){
        console.log(this.state);
        const { product: { id } } = this.state;
        console.log({id})
        const { match: { params: { id: propsId } } } = this.props;
        if (id == null) {
          if (propsId != null) {
            return <h3>{`Product with ID ${propsId} not found.`}</h3>;
      }
      return null;
    }
        const { product: { productname, productprice } } = this.state;
        const { product: { producturl, productcat } } = this.state;
        const paddingStyle = { margin: 10 };
        const paddingStyle2 = { margin: 80 };
    return (
        <form id="test" name="productAdd" onSubmit={this.handleSubmit}>
        <label htmlFor="productname" style={paddingStyle}>Product Name</label>
        &nbsp;
        <label htmlFor="productcat" style={paddingStyle2}>Product Category</label>
        <br />
        <input type="text" name="productname" style={paddingStyle} value={productname} onChange={this.handleChange} />
        &nbsp;
        <select id="productcat" value={productcat} style={paddingStyle} onChange={this.handleChange}>
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
        <input type="text" name="price" onChange={this.handleChange} value={productprice} style={paddingStyle} />
        &nbsp;
        <input type="text" name="url" style={paddingStyle} value={producturl} onChange={this.handleChange} />
        <br />
        <br />
        <button type="submit">AddProduct </button>
      </form>
    );
    }
}