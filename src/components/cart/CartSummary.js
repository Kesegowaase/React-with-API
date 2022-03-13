import alertify from 'alertifyjs'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, NavItem, NavLink, UncontrolledDropdown } from 'reactstrap'
import { bindActionCreators } from 'redux'
import { removeFromCart } from '../../redux/actions/cartActions'

class CartSummary extends Component {

    removeFromCart(product){
        this.props.actions.removeFromCart(product);
        alertify.error(product.productName + " removed from cart",1)
    }

    renderEmpty() {
        return (
            <NavItem>
                <NavLink>
                    Your cart is empty
                </NavLink>
            </NavItem>
        )
    }

    renderSummary() {
        return (
            <UncontrolledDropdown inNavbar nav>
                <DropdownToggle caret nav >
                    Your cart
                </DropdownToggle>
                <DropdownMenu className='dropdown-menu end-0'>
                    {this.props.cart.map((cartItem) => {
                        return (
                            <DropdownItem key={cartItem.product.id}>
                                <Badge color='danger' onClick={() => this.removeFromCart(cartItem.product)}>
                                    X
                                </Badge>
                                {cartItem.product.productName}
                                <Badge color='success'>
                                    {cartItem.quantity}
                                </Badge>
                            </DropdownItem>
                        )
                    })}
                    <DropdownItem divider />
                    <DropdownItem>
                        <Link to={"/cart"} >Go to cart</Link>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        )
    }

    render() {
        return (
            <div>
                {this.props.cart.length > 0 ? this.renderSummary() : this.renderEmpty()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cartReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            removeFromCart: bindActionCreators(removeFromCart,dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartSummary);