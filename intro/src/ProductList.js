import React, { Component } from 'react'
import { Table, Button } from 'reactstrap'

export default class ProductList extends Component {

  render() {
    return (
      <div className="product-list">
        <h3>{this.props.info.title} - {this.props.currentCategory}</h3>
        <Table>
          <thead>
            <tr>
              <th> # </th>
              <th> Product Name    <img
                src="/id.png"
                alt="Logo"
                width="25"
                height="30"
              />  </th>
              <th> Unit Price    <img
                src="/price.png"
                alt="Logo"
                width="25"
                height="30"
              /> </th>
              <th> Quantity Per Unit    <img
                src="/cost-per.png"
                alt="Logo"
                width="25"
                height="30"
              /> </th>
              <th> Unit In Stock    <img
                src="/packages.png"
                alt="Logo"
                width="25"
                height="30"
              /> </th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {this.props.products.map(product => (
              <tr key={product.id} >
                <th scope="row"> {product.id}</th>
                <td> {product.productName} </td>
                <td> {product.unitPrice} </td>
                <td> {product.quantityPerUnit} </td>
                <td> {product.unitsInStock} </td>
                <td><Button onClick={() => this.props.addToCart(product)} color="primary">
                  Sepete Ekle
                  <img
                    src="/plus.png"
                    alt="Logo"
                    width="17"
                    height="18"
                    style={{ marginLeft: "5px" }}
                  />
                </Button>

                </td>
              </tr>
            ))}


          </tbody>
        </Table>
      </div>
    )
  }
}
