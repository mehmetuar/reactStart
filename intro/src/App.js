import React, { Component } from 'react'
import Navi from './Navi';
import CategoryList from './CategoryList';
import ProductList from './ProductList';
import CartList from './CartList';
import { Container, Row, Col } from 'reactstrap'
import alertify from "alertifyjs"
import App7 from './App7.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



export default class App extends Component {

  state = { currentCategory: "", products: [], cart: [] };
  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName })
    this.getProducts(category.id);
  };

  componentDidMount() {
    this.getProducts();
  }

  getProducts = (categoryId) => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;

    }
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ products: data }));
  };

  addToCart = (product) => {
    let newCart = this.state.cart;
    var addedItem = newCart.find(c => c.product.id === product.id);
    if (addedItem) {
      addedItem.quantity += 1;
    }
    else {
      newCart.push({ product: product, quantity: 1 });
    }

    this.setState({ cart: newCart })
    alertify.success(product.productName + " sepete eklendi.", 2);
  }


  removeFromCart = (product) => {
    let newCart = this.state.cart.filter(c => c.product.id !== product.id)
    this.setState({ cart: newCart })
  }


  render() {
    let ProductInfo = { title: "Product List" }
    let CategoryInfo = { title: "Category List" }
    return (
      <div >
       
  <Router>
    <Container>
      <Navi removeFromCart={this.removeFromCart} cart={this.state.cart} />

      <Routes>
     
        <Route
          path="/"
          element={
            <Row>
              <Col xs="3">
                <CategoryList
                  currentCategory={this.state.currentCategory}
                  changeCategory={this.changeCategory}
                  info={CategoryInfo}
                />
              </Col>
              <Col xs="9">
                <ProductList
                  products={this.state.products}
                  addToCart={this.addToCart}
                  currentCategory={this.state.currentCategory}
                  info={ProductInfo}
                />
              </Col>
            </Row>
          }
        />

        {/* Sepet Sayfası */}
        <Route
          path="/cart"
          element={
            <CartList
              cart={this.state.cart}
              removeFromCart={this.removeFromCart}
            />
          }
        />
      </Routes>
    </Container>
  </Router>



      </div>
    );
  }
}
