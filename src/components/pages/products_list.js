"use strict"
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getProducts} from '../../actions/products_actions';

import Products from './products';
import Cart from './cart';

class ProductsList extends Component {
    componentDidMount() {
        this.props.getProducts();
    }

    render() {
        let rowContents = [];
		const contents = this.props.products.reduce((total, currentValue, i) => {
            rowContents.push(
                <div className="col-md-3 row product-wrap" key={i}>
                    <div className="col-xs-12 col-md-12 text-center product-container">
                        <Products
                            _id  = {currentValue._id}
                            filename = {currentValue.filename}
                            name = {currentValue.name}
                            price = {currentValue.price}
                        />
                    </div>
                </div>
            );
        
			if (i % 4 === 3) {
				total.push(<div className="row product-row" key={i}>{rowContents}</div>);
				rowContents = [];
			}
			return total;
        },[])
        
        let i = 0;
        contents.push(<div className="row product-row" key={i++}>{rowContents}</div>);

		return (
            <section id="main" className="container">
                <div className="row header-row">
                    <h3 className="header">Shop our featured collection</h3>
                </div>
                {contents}
            </section>
		)
    }
}

function mapStateToProps(state) {
    return {
        products: state.products.products,
        totalQty: state.cart.totalQty
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getProducts
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);