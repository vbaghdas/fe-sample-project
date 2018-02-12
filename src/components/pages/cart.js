"use strict"
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteCartProduct, updateCart, getCart} from '../../actions/cart_actions';

class Cart extends Component {
    compondentDidMount() {
        this.props.getCart();
    }

    onDelete(_id) {
        const currentProductToDelete = this.props.cart;
        const indexToDelete = currentProductToDelete.findIndex(
            (cart) => {
                return cart._id === _id;
            }
        )
        let cartAfterDelete = [...currentProductToDelete.slice(0, indexToDelete), ...currentProductToDelete.slice(indexToDelete + 1)];
        this.props.deleteCartProduct(cartAfterDelete);
    }

    onIncrement(_id) {
        this.props.updateCart(_id, 1, this.props.cart)
    }

    onDecrement(_id, quantity) {
        if(quantity > 1) {
            this.props.updateCart(_id, -1, this.props.cart)
        }
    }

    render() {
        if(this.props.cart[0]) {
            return this.renderCart();
        } else {
            return this.renderEmpty();
        }
    }

    renderEmpty() {
        return (
            <React.Fragment>
                <div className="row cart-body">
                    <div className="col-xs-12 col-md-12 cart-empty">
                        <h3>Nothing in your cart, start shopping.</h3>
                    </div>
                </div>
                <div className="col-xs-12 col-md-12 cart-footer">
                    <hr className="cart-divider"/>
                    <div className="col-xs-6 col-md-6 text-left cart-total">
                        <h3>Total</h3>
                    </div>
                    <div className="col-xs-6 col-md-6 text-right cart-amount">
                        <h3>$0</h3>
                    </div>
                </div>
            </React.Fragment>

        )
    }

    renderCart() {
        const cartProductsList = this.props.cart.map( (cartArr) => {
            return (
                <div className="row cart-body-row" key={cartArr._id}>
                    <div className="col-xs-4 col-md-4 product-image">
                        <div className="product-image-wrap" style={{ backgroundImage: `url( ${cartArr.filename})` }}></div>
                    </div>
                    <div className="col-xs-7 col-md-7 text-right product-title">
                        <p>{cartArr.name}</p>
                        <p>$ {cartArr.price}</p>
                        <span onClick={this.onIncrement.bind(this, cartArr._id, cartArr.quantity)}><i className="fas fa-plus-square"></i></span>
                        <span onClick={this.onDecrement.bind(this, cartArr._id, cartArr.quantity)}><i className="fas fa-minus-square"></i></span>
                        <span>qty: {cartArr.quantity}</span>
                    </div>
                    <div className="col-xs-1 col-md-1 product-delete">
                        <span onClick={this.onDelete.bind(this, cartArr._id)}><i className="fa fa-times-circle"></i></span>
                    </div>
                </div>
            )
        }, this)

        return (
            <React.Fragment>
                <div className="col-xs-12 col-md-12 cart-body">
                    {cartProductsList}
                </div>
                <div className="col-xs-12 col-md-12 cart-footer">
                    <hr className="cart-divider"/>
                    <div className="col-xs-6 col-md-6 text-left cart-total">
                        <h3>Total</h3>
                    </div>
                    <div className="col-xs-6 col-md-6 text-right cart-amount">
                        <h3>$ {this.props.totalAmount}</h3>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart.cart,
        totalAmount: state.cart.totalAmount
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        deleteCartProduct,
        updateCart,
        getCart
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);