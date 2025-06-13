import React, { Component } from 'react';

export default class CartList extends Component {
  render() {
    const { cart, removeFromCart } = this.props;

    return (
      <div style={{ padding: "20px" }}>
        <h2>Sepet Detayları</h2>
        {cart.length === 0 ? (
          <p>Sepetiniz boş.</p>
        ) : (
          <table className="table">
  <thead>
    <tr>
      <th>Ürün</th>
      <th>Adet</th>
      <th>İşlem</th>
    </tr>
  </thead>
  <tbody>
    {cart.map((item) => (
      <tr key={item.product.id}>
        <td>{item.product.productName}</td>
        <td>
          <button
            onClick={() => this.props.decreaseQuantity(item.product)}
            className="btn btn-outline-danger btn-sm mx-1"
          >
            -
          </button>
          {item.quantity}
          <button
            onClick={() => this.props.increaseQuantity(item.product)}
            className="btn btn-outline-success btn-sm mx-1"
          >
            +
          </button>
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => this.props.removeFromCart(item.product)}
          >
            Sepetten Sil
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

        )}
      </div>
    );
  }
}
