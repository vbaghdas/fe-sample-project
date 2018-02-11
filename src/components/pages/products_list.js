"use strict"
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getItems} from '../../actions/itemsActions';

import Products from './products';
import Cart from './cart';

class ProductsList extends Component {
    componentDidMount() {
        this.props.getItems();
    }

    render() {
        let rowContents = [];
		const contents = this.props.items.reduce((acc, p, i) => {
            rowContents.push(
                <div key={p._id} className="col-md-3 row product-wrap">
                    <div className="col-xs-12 col-md-12 text-center product-container">
                        <Products
                            _id  = {p._id}
                            filename = {p.filename}
                            name = {p.name}
                            price = {p.price}
                        />
                    </div>
                </div>
            );
        
			if (i % 4 === 3) {
				acc.push(<div className="row product-row">{rowContents}</div>);
				rowContents = [];
			}
			return acc;
		},[])
        contents.push(<div className="row product-row">{rowContents}</div>);

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
        items: state.items.items,
        totalQty: state.cart.totalQty
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getItems
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);