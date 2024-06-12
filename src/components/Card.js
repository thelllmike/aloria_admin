import React from "react";
import "../style/Card.css";
import { NavLink } from "react-router-dom";

const Card = ({ product, index }) => {
    return (
        <div className="card mt-4">
            <img src={product.images.length > 0 ? product.images[0].image_url : "default_image_url"} alt="Product" className="card-img-top" />
            <div className="card-body">
                <h5 className="card-title">{product.product_name}</h5>
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="category">{product.category}</div>
                    <p className="card-text price">${product.price}</p>
                </div>
                <p className="description">
                    {product.description}
                </p>
                <div className={`quantity ${index === 1 ? "second-card" : ""}`}>
                    Quantity: <span>{product.stock}</span>
                </div>
                <div className="buttons d-flex justify-content-between mt-3">
                    <NavLink to={`/editproduct/${product.product_id}`} className="btn edit-btn">
                        <i className="fas fa-edit"></i> Edit
                    </NavLink>
                    <NavLink to="#" className="btn delete-btn">
                        <i className="fas fa-trash"></i> Delete
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Card;
