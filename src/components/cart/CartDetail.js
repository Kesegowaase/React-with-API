import alertify from 'alertifyjs';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button, Table } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { removeFromCart } from '../../redux/actions/cartActions';
class CartDetail extends Component {

    removeFromCart(product){
        this.props.actions.removeFromCart(product);
        alertify.error(product.productName + " removed from cart",1)
    }

    render() {
        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Quantity</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.cart.map((cartItem) => {
                                console.log(cartItem);
                                return (
                                    <tr key={cartItem.product.id}>
                                        <th scope="row">{cartItem.product.id}</th>
                                        <td>{cartItem.product.productName}</td>
                                        <td>{cartItem.product.unitPrice}</td>
                                        <td>{cartItem.quantity}</td>
                                        <td>
                                            <Button
                                                onClick={() => this.removeFromCart(cartItem.product)}
                                                color='danger'>Delete from cart</Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
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
            removeFromCart: bindActionCreators(removeFromCart, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartDetail);