"use strict"
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from "react-router-dom";

import Modal from 'react-responsive-modal';
import Cart from './cart';

class Navbar extends Component {
    componentDidUpdate() {
        if(this.state.open == true){
            var bgBlur = document.getElementById('main');
            bgBlur.style.filter = "blur(10px)";
        }
    }

    componentWillUpdate() {
        if(this.state.open == true){
            var bgBlur = document.getElementById('main');
            bgBlur.style.filter = "blur(0)";
        }
    }

    state = {
        open: false,
    };

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    render() {
        const { open } = this.state;
        return (
            <React.Fragment>
                <nav className="navbar navbar-inverse container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-list">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span> 
                        </button>
                        <Link className="navbar-brand" to="/">
                            <i className="fa fa-shopping-cart"></i>Cart.ly
                        </Link>
                    </div>
                    <div className="collapse navbar-collapse" id="navbar-list">
                        <ul className="nav navbar-nav">
                            <li className="shop">
                                <Link to="/" onClick={this.onCloseModal}>Shop</Link>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <Link to="/" onClick={this.onOpenModal}>
                                    <span>Your Cart</span> 
                                    <span className="cart-box">{this.props.totalQty ? this.props.totalQty : 0}</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <Modal open={open} onClose={this.onCloseModal} little>
                    <div className="col-xs-12 col-md-12 cart-header">
                        <h3>Your Cart</h3>
                    </div>
                    <Cart />
                    <button onClick={this.onCloseModal} className="btn btn-outline-primary">Back</button>
                </Modal>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        totalQty: state.cart.totalQty,
    }
}

export default connect(mapStateToProps)(Navbar);