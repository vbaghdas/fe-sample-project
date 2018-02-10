"use strict"
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getItems} from '../../actions/itemsActions';

import Home from './home';
import ItemProduct from './itemProduct';
import Cart from './cart';

class ItemsList extends Component {
    componentDidMount() {
        this.props.getItems();
    }

    render() {
        let rowContents = [];
		const contents = this.props.items.reduce((acc, p, i) => {
            rowContents.push(
                <div key={p._id} className="col-md-3">
                <div className="col-md-12 text-center">
                    <ItemProduct
                        _id  = {p._id}
                        filename = {p.filename}
                        name = {p.name}
                        price = {p.price}
                    />
                </div></div>);
        
			if (i % 4 === 3) {
				acc.push(<div className="row productRow">{rowContents}</div>);
				rowContents = [];
			}
			return acc;
		},[])
        contents.push(<div className="row productRow">{rowContents}</div>);

		return (
            <div className="container">
                <Home totalQty={this.props.totalQty}/>
                <div className="row">
                    <h3 className="header">Shop our featured collection</h3>
                </div>
                <div className="row">
                    <Cart />
                </div>
                {contents}
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);