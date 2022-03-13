import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Badge, Button, Table } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { getProducts } from '../../redux/actions/productActions'
import { addToCart } from '../../redux/actions/cartActions'
import alertify from 'alertifyjs';

class ProductList extends Component {

  componentDidMount() {
    this.props.actions.getProducts();
  }

  addToCart = (product) => {
    this.props.actions.addToCart({
      quantity: 1,
      product: product
    })
    alertify.success(product.productName + " added to cart", 1)
  }

  render() {
    return (
      <div>
        <h3>ProductList <Badge color='info'>{this.props.currentCategory.categoryName}</Badge> </h3>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Unit Price</th>
              <th>Quantity Per Unit</th>
              <th>Units In Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.products.map((product) => {
                return (
                  <tr key={product.id}>
                    <th scope="row">{product.id}</th>
                    <td>{product.productName}</td>
                    <td>{product.unitPrice}</td>
                    <td>{product.quantityPerUnit}</td>
                    <td>{product.unitsInStock}</td>
                    <td>
                      <Button
                        onClick={() => this.addToCart(product)}
                        color='primary'>Add to Cart</Button>
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
    currentCategory: state.changeCategoryReducer,
    products: state.productListReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getProducts: bindActionCreators(getProducts, dispatch),
      addToCart: bindActionCreators(addToCart, dispatch)
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductList);