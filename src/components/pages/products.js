"use strict"
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart, updateCart} from '../../actions/cart_actions';

class Products extends Component {
    handleCart() {
        const {_id, filename, name, price, cart} = this.props;
        const product = [...cart, {
            _id,
            filename,
            name,
            price,
            quantity: 1
        }]
        if(this.props.cart.length > 0) {
            let _id = this.props._id;
            let cartIndex = this.props.cart.findIndex( (cart) => {
                return cart._id === _id;
            })
            if(cartIndex === -1) {
                this.props.addToCart(product);
            } else {
                this.props.updateCart(_id, 1, this.props.cart)
            }
        } else {
            this.props.addToCart(product);
        }
    }

    render() {
        return (
            <React.Fragment>
                <img className="img-responsive" src={this.props.filename}/>
                <h4>{this.props.name}</h4>
                <h3>$ {this.props.price}</h3>
                <button onClick={this.handleCart.bind(this)} className="btn btn-outline-primary">Add to cart</button>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        cart: state.cart.cart
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addToCart: addToCart,
        updateCart: updateCart
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);