import React, {SyntheticEvent, useEffect, useState} from 'react';
import Wrapper from "../../components/Wrapper";
import axios from 'axios';
import {Navigate} from "react-router-dom";
import ImageUpload from "../../components/ImageUpload";

const ProductsCreate = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    const [validationError, setValidationError] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const createProduct = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.post('products', {
            title, description, image, price
        }).then(res => {
            setRedirect(true);
        }).catch(error => {
            setValidationError(true);
            setValidationErrors(error.response?.data.message);
        });

    }
    if (redirect) {
        return <Navigate to={'/products'}/>
    }
    return (
        <>
            <Wrapper>
                {validationError ?
                    <ul>
                        {validationErrors.map((value, index) => {
                            return <li key={index}>{value}</li>
                        })}
                    </ul> : ''
                }
            <form className="row g-3 mt-4" onSubmit={createProduct}>
                <div className="col-md-6">
                    <label htmlFor="inputEmail4" className="form-label">Title</label>
                    <input type="text" onChange={e => setTitle(e.target.value)} className="form-control" id="inputEmail4" />
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputPassword4" className="form-label">Description</label>
                    <input type="text" onChange={e => setDescription(e.target.value)} className="form-control" id="inputPassword4" />
                </div>
                <div className="col-6">
                    <label htmlFor="inputAddress" className="form-label">Image</label>
                    <div className="input-group">
                        <input type="text"
                               className="form-control"
                               id="inputAddress"
                               value={image}
                               onChange={event => setImage(event.target.value)}/>
                        <ImageUpload uploaded={setImage}/>
                    </div>
                </div>
                <div className="col-6">
                    <label htmlFor="inputAddress" className="form-label">Price</label>
                    <input type="text" className="form-control" id="inputAddress" onChange={event => setPrice(event.target.value)}/>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Create Product</button>
                </div>
            </form>
            </Wrapper>
        </>
    );
};

export default ProductsCreate;


interface Role {
    id: number;
    name: string;
}