import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
} from "reactstrap";
import CartSummary from "./CartSummary";


export default class Navi extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md" className="navi">
          <NavbarBrand href="/">
            <img src="/reset.png" alt="Logo" width="60" height="60" />
          </NavbarBrand>
  
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {/* Sepet özeti */}
              <CartSummary
                removeFromCart={this.props.removeFromCart}
                cart={this.props.cart}
              />
  
              {/* Sağ üst köşe: Çıkış butonu */}
              <div className="d-flex align-items-center ms-3">
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => {
                    this.props.onLogout();
                    window.location.href = "/login"; // yönlendirme
                  }}
                >
                  Çıkış Yap
                </button>
              </div>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }  
}
