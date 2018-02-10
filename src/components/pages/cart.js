"use strict"
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {deleteCartItem, updateCart} from '../../actions/cartActions';
import { Modal, Button } from 'react-bootstrap';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.setState({ showModal: false });
    }

    handleShow() {
        this.setState({ showModal: true });
    }

    onDelete(_id) {
        const currentItemToDelete = this.props.cart;
        const indexToDelete = currentItemToDelete.findIndex(
            (cart) => {
                return cart._id === _id;
            }
        )
        let cartAfterDelete = [...currentItemToDelete.slice(0, indexToDelete), ...currentItemToDelete.slice(indexToDelete + 1)];
        this.props.deleteCartItem(cartAfterDelete);
    }

    onIncrement(_id) {
        this.props.updateCart(_id, 1)
    }

    onDecrement(_id, quantity) {
        if(quantity > 1) {
            this.props.updateCart(_id, -1)
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
        return (<div></div>)
    }

    renderCart() {
        const cartItemsList = this.props.cart.map( (cartArr) => {
            return (
                <div key={cartArr._id}>
                    <img src={'images/' + cartArr.filename}/>
                    <div>{cartArr.name}</div>
                    <p>$ {cartArr.price}</p>
                    <p>qty {cartArr.quantity}</p>
                    <button type="button" className="btn btn-default" onClick={this.onIncrement.bind(this, cartArr._id, cartArr.quantity)}>+</button>
                    <button type="button" className="btn btn-default" onClick={this.onDecrement.bind(this, cartArr._id, cartArr.quantity)}>-</button>
                    <button type="button" className="btn btn-danger" onClick={this.onDelete.bind(this, cartArr._id)}>DELETE</button>
                </div>
            )
        }, this)

        return (
            <div>
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header>
                        <Modal.Title>Your Cart</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>{cartItemsList}</Modal.Body>

                    <Modal.Footer>
                        <p>total {this.props.totalAmount}</p>
                        <Button onClick={this.handleClose}>Back</Button>
                    </Modal.Footer>
                </Modal>
            </div>
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
        deleteCartItem,
        updateCart
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);