import React, {Component} from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { NavLink } from 'react-router-dom';
class Pagination extends Component{
    constructor(){
        super();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.page !== this.props.page) {
            const url = `/api/products?limit=5&offset=${(newProps.page - 1) * 5}`;
            fetch(url)
                .then(response => response.json())
                .then((data) => {
                    // this.setState({
                    //     products : data,
                    //     totalAllProducts: 36
                    // });
                    this.props.handler(data);
                });
        }
    }
    
    getPaginatorlinks() {
        const {total} = this.props;
        if (total !== null) {
            const items = [];
            for (let i = 1; i <= Math.floor((total - 1) / 5) + 1; i++) {
                items.push(
                <li key={i}>
                    <NavLink to={`/products/${i}`} activeStyle={{color: 'red'}}>{i}</NavLink>
                </li>)
            }
            return <div className="pagination">
                {items}
            </div>
        }
    }
    render(){
        return(
            <div>
                {this.getPaginatorlinks()}
            </div>
        )
    }
}

export default Pagination;