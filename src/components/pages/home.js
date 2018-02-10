"use strict"
import React from 'react';
import { Link } from "react-router-dom";

const Menu = (props) => {
        return (
            <nav className="navbar navbar-inverse">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span> 
                    </button>
                    <Link className="navbar-brand" to="/"><i className="fa fa-shopping-cart"></i>Cart.ly</Link>
                </div>
                <div className="collapse navbar-collapse" id="myNavbar">
                    <ul className="nav navbar-nav">
                        <li className="shop"><Link to="/">Shop</Link></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li className="cart"><Link to="/cart">Your Cart</Link></li>
                        <li><a><div className="cartBox">{props.totalQty ? props.totalQty : 0}</div></a></li>
                    </ul>
                </div>
            </nav>
        )
}

export default Menu;