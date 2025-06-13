import React, { Component } from 'react'
import Navi from './Navi';
import CategoryList from './CategoryList';
import ProductList from './ProductList';
import CartList from './CartList';
import { Container, Row, Col } from 'reactstrap'
import alertify from "alertifyjs"
import App7 from './App7.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";

export default class App extends Component {

  state = {
    isAuthenticated: false,
    currentCategory: "",
    products: [],
    cart: [],
  };

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
    } else {
      newCart.push({ product: product, quantity: 1 });
    }
    this.setState({ cart: newCart })
    alertify.success(product.productName + " sepete eklendi.", 2);
  }

  removeFromCart = (product) => {
    let newCart = this.state.cart.filter(c => c.product.id !== product.id)
    this.setState({ cart: newCart })
  }

  increaseQuantity = (product) => {
    const newCart = this.state.cart.map((item) =>
      item.product.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    this.setState({ cart: newCart });
  };

  decreaseQuantity = (product) => {
    const newCart = this.state.cart
      .map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);
    this.setState({ cart: newCart });
  };

  handleLogin = () => {
    this.setState({ isAuthenticated: true });
  };

  render() {
    let ProductInfo = { title: "Product List" }
    let CategoryInfo = { title: "Category List" }

    return (
      <Router>
        <Container>
          {this.state.isAuthenticated && (
            <Navi removeFromCart={this.removeFromCart} cart={this.state.cart} />
          )}


          <Routes>
            <Route path="/login" element={<Login onLogin={this.handleLogin} />} />

            <Route
              path="/"
              element={
                <ProtectedRoute isAuthenticated={this.state.isAuthenticated}>
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
                </ProtectedRoute>
              }
            />

            <Route
              path="/cart"
              element={
                <ProtectedRoute isAuthenticated={this.state.isAuthenticated}>
                  <CartList
                    cart={this.state.cart}
                    removeFromCart={this.removeFromCart}
                    increaseQuantity={this.increaseQuantity}
                    decreaseQuantity={this.decreaseQuantity}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Container>
      </Router>
    );
  }
}
