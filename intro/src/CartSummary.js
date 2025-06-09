import React, { Component } from 'react'

import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Badge,
    NavItem,
    NavLink,
} from 'reactstrap';

export default class CartSummary extends Component {
    renderSummary() {
        return (<UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
            <img
    src="/groceries.png"
    alt="Logo"
    width="70"
    height="70"
  /> - {this.props.cart.length}
            </DropdownToggle>
            <DropdownMenu right>
                {
                    this.props.cart.map(cartItem => (
                        <DropdownItem key={cartItem.product.id} >
                            <Badge color="danger" onClick={()=>this.props.removeFromCart(cartItem.product)}><i class="fa-solid fa-trash"></i></Badge>
                            {cartItem.product.productName}
                            <Badge color="success" >{cartItem.quantity}</Badge>
                        </DropdownItem>
                    ))
                }


                <DropdownItem divider />
              
            </DropdownMenu>
        </UncontrolledDropdown>
        );
    }

    renderEmptyCart() {
        return (
            <NavItem>
            <NavLink> <img
    src="/wicker-basket.png"
    alt="Logo"
    width="70"
    height="70"
  /> </NavLink>
            </NavItem>
        );
    }
    render() {
        return (
            <div>
                {this.props.cart.length > 0 ? this.renderSummary() : this.renderEmptyCart()}
            </div>
        )
    }
}


