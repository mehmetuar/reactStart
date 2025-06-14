import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
} from "reactstrap";
import CartSummary from "./CartSummary";
import { Link } from "react-router-dom";

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
            <Nav className="ms-auto d-flex align-items-center gap-3" navbar>
              {/* Sepet Özeti */}
              <CartSummary
                removeFromCart={this.props.removeFromCart}
                cart={this.props.cart}
              />
           <Link to="/profile" className="btn btn-outline-primary btn-sm">Profil</Link>
              {/* Çıkış Butonu */}
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => {
                  this.props.onLogout();
                  window.location.href = "/login";
                }}
              >
                Çıkış Yap
              </button>

            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
