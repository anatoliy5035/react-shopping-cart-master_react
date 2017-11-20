import React, {Component} from 'react';
import Product from './Product';
import LoadingProducts from '../loaders/Products';
import Pagination from '../components/Pagination';
import NoResults from "../empty-states/NoResults";
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {Redirect, Route} from 'react-router-dom'


class Products extends Component {
	constructor(props) {
		super(props);
		this.state = {
            totalAllProducts: null,
            products: []
		},
        this.handler = this.handler.bind(this)
	}

    handler(data) {
        this.setState({
            products: data
        })
    }

    // getProductsAmount() {
    //     if (this.props.productsList.length) {
		// 	console.log(this.props.productsList)
    //     }
    // };

    componentDidMount() {
        this.getProducts();
	};

    getProducts() {
        let page = this.props.routerProps.match.params.page;
    	const url = `/api/products?limit=5&offset=${(page - 1) * 5}`;

        fetch(url)
            .then(response => response.json())
            .then((data) => {
				this.setState({
					products : data,
					totalAllProducts: 36
				});
        });
	};

  	render() {
        let productsData;
        let term = this.props.searchTerm;
        let page = this.props.routerProps.match.params.page;
        let x;

		function searchingFor(term) {
			return function(x){
				return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
			}
		}

		productsData = this.state.products.filter(searchingFor(term)).map(product =>{
                return (
					<Product key={product.id}
							 price={product.price}
							 name={product.name}
							 image={product.image}
							 id={product.id}
							 addToCart={this.props.addToCart}
							 productQuantity={this.props.productQuantity}
							 updateQuantity={this.props.updateQuantity}
							 openModal={this.props.openModal}/>
                )
            }
        );

		// Empty and Loading States
		let view;
		if(productsData.length <= 0 && !term){
			view = <LoadingProducts />
		} else if (productsData.length <= 0 && term) {
			view = <NoResults />
		} else{
			view = <CSSTransitionGroup
				transitionName="fadeIn"
				transitionEnterTimeout={500}
				transitionLeaveTimeout={300}
				component="div"
				className="products">
					{productsData}
			</CSSTransitionGroup>
		}
		return(
			<div className="products-wrapper">
				{view}
				<Pagination total = {this.state.totalAllProducts} handler = {this.handler} page={page}/>
			</div>
		)
	}
}

export default Products;