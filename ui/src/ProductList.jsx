import ProductTable from './ProductTable.jsx';
import ProductAdd from './ProductAdd.jsx';
import graphQLFetch from './graphQLFetch.js';
import React from '../node_modules/react';
import ReactDOM from '../node_modules/react-dom';

export default class ProductList extends React.Component {
    constructor() {
      super();
      this.state = {
        productArray: [],
      };
      this.createProducts = this.createProducts.bind(this);
    }
  
    componentDidMount() {
      this.loadData();
    }
  
    async loadData() {
      const query = `query {
        productList {
          id productcat productname productprice producturl
        }
      }`;
      const data = await graphQLFetch(query);
      this.setState({ productArray: data.productList });
    }
  
    async createProducts(product) {
      const newProduct = product;
      // product.id = this.state.productArray.length +1;
      // const existingLists = this.state.productArray.slice();
      // existingLists.push(product);
      // this.setState({
      //     productArray:existingLists
      // });
      const query = `mutation {
                  productAdd(product: {
                  productcat: ${newProduct.productcat}
                  productname: "${newProduct.productname}"
                  productprice: ${newProduct.productprice}
                  producturl: "${newProduct.producturl}"
                }) {
                  id
                }
          }`;
      const data = await graphQLFetch(query);
      if (data) {
        this.loadData();
      }
    }
    // componentDidMount() {
    //     this.setState({
    //         productArray:[{}]
    //     }) }
  
    // createProducts(product){
    //     product.id = new Date().getTime();
    //     const existingLists = this.state.productArray.slice();
    //     existingLists.push(product);
    //     this.setState({
    //         productArray:existingLists
    //     });
    // }
    render() {
      const curstate = this.state;
      return (
        <React.Fragment>
          <h1>My Company inventory</h1>
          <h4>Showing all Available products</h4>
          <hr />
          <ProductTable productArray={curstate.productArray} />
          <hr />
          <h4>Add a new product to inventory</h4>
          <ProductAdd createProducts={this.createProducts} />
        </React.Fragment>
      );
    }
  }