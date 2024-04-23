import React, {useEffect, useState} from 'react';
import Wrapper from "../../components/Wrapper";
import axios from 'axios';
import {Link} from "react-router-dom";
import Paginator from "../../components/Paginator";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    let [page, setPage] = useState(1);
    const [nextPage, setNextPage] = useState(0);

    useEffect(() => {
        (async () => {
            await getProducts();
        })();
    }, [page]);

    const getProducts = async () => {
        await axios.get('orders?page=' + page).then(response => {
            setOrders(response.data.data);
            setNextPage(response.data.meta.last_page);
        }).catch(error => {
            console.log('Error', error);
        });
    }

    const delet = (id: number) => {
        if (window.confirm('Are you sure to delete?')){
            axios.delete(`orders/${id}`)
                .then(res => {
                    getProducts();
                });
        }
    }

    const exportOrders = async () => {
        const {data} = await axios.get('export', { responseType: "blob"});
        const blob = new Blob([data], {type: 'text/csv'});
        const url = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = url;
        link.download = "orders.csv";
        link.click();

    }
    return (
        <Wrapper>
            <div className="btn-group  m-2">
                <a onClick={exportOrders} className="btn btn-sm btn-outline-primary">Export</a>
            </div>
            <div className="table-responsive small">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Email</th>
                        <th scope="col">Name</th>
                        <th scope="col">Total</th>
                        <th scope="col">Created</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>

                    {orders.map((or: Order) => {
                        return (
                            <>
                                <tr key={or.id}>
                                    <td>{or.id}</td>
                                    <td>{or.email}</td>
                                    <td>{or.name}</td>
                                    <td>{or.total}</td>
                                    <td>{or.created_at}</td>
                                    <td>
                                        <div className="btn-group mr-2">
                                            <a href="#" className="btn btn-sm btn-outline-secondary">View</a>
                                        </div>
                                        <div className="btn-group mr-2">
                                            <a className="btn btn-sm btn-outline-secondary" onClick={() => delet(or.id)}
                                               href="#">Delete</a>
                                        </div>
                                    </td>
                                </tr>
                                <tr key={or.email}>
                                    <td colSpan={6}>
                                        <table className="table table-sm">
                                            <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Product Title</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Quantity</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {or.order_items.map((i: OrderItems) => {
                                                return (
                                                    <tr key={i.id}>
                                                        <td>{i.id}</td>
                                                        <td>{i.product_title}</td>
                                                        <td>{i.price}</td>
                                                        <td>{i.quantity}</td>
                                                    </tr>
                                                )
                                            })}
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </>
                        )
                    })
                    }

                    </tbody>
                </table>
            </div>

            <Paginator lastPage={nextPage} page={page} pageChanged={setPage}/>
        </Wrapper>
    );
}

export default Orders;
class OrderItems {
    constructor(
        public id: number,
        public product_title: string,
        public price: number,
        public quantity: number,
    ) {
    }
}
class Order {
    constructor(
        public id: number,
        public email: string,
        public name: number,
        public total: string,
        public created_at: string,
        public order_items: OrderItems[]
    ) {
    }
}