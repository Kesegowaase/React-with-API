import React, { Component } from 'react'
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler } from 'reactstrap'
import CartSummary from '../cart/CartSummary'

export default class Navi extends Component {
  render() {
    return (
      <div>
        <Navbar
          color="light"
          expand="md"
          light
        >
          <NavbarBrand href="/">
            Example
          </NavbarBrand>
          <NavbarToggler onClick={function noRefCheck() { }} />
          <Collapse navbar>
            <Nav
              className="ms-auto"
              navbar
            >
              <CartSummary />
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}
