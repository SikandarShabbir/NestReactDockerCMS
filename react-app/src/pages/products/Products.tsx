import React, {useEffect, useState} from 'react';
import Wrapper from "../../components/Wrapper";
import axios from 'axios';
import {Link} from "react-router-dom";
import Paginator from "../../components/Paginator";

const Products = () => {
    const [products, setProducts] = useState([]);
    let [page, setPage] = useState(1);
    const [nextPage, setNextPage] = useState(0);

    useEffect(() => {
        (async () => {
            await getProducts();
        })();
    }, [page]);

    const getProducts = async () => {
        await axios.get('products?page=' + page).then(response => {
            setProducts(response.data.data);
            setNextPage(response.data.meta.last_page);
        }).catch(error => {
            console.log('Error', error);
        });
    }

    const delet = (id: number) => {
        if (window.confirm('Are you sure to delete?')){
            axios.delete(`products/${id}`)
                .then(res => {
                    getProducts();
                });
        }
    }
    return (
        <Wrapper>
            <div className="btn-group  m-2">
                <Link to={'/products/create'} className="btn btn-sm btn-outline-primary">Create</Link>
            </div>
            <div className="table-responsive small">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Created</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>

                    {products.map((pro: ProductModel) => {
                        return (
                            <tr key={pro.id}>
                                <td>{pro.id}</td>
                                <td><img src={pro.image} alt="" width="50" /></td>
                                <td>{pro.title}</td>
                                <td>{pro.description}</td>
                                <td>{pro.price}</td>
                                <td>{pro.created_at}</td>
                                <td>
                                    <div className="btn-group mr-2">
                                        <Link to={`/product/${pro.id}/update`} className="btn btn-sm btn-outline-secondary">Update</Link>
                                    </div>
                                    <div className="btn-group mr-2">
                                        <a className="btn btn-sm btn-outline-secondary" onClick={() => delet(pro.id)} href="#">Delete</a>
                                    </div>
                                </td>
                            </tr>
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

export default Products;

class ProductModel {
    constructor(
        public id: number,
        public image: string,
        public price: number,
        public title: string,
        public description: string,
        public created_at: string
    ) {
    }
}