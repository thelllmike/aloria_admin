import React from "react";
import "../style/Card.css";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../apiService";

const Card = ({ product, index, onProductDeleted }) => {
    const handleDelete = async () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to delete this item?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await api.delete(`/products/products/${product.product_id}`);
                    if (response.status === 200) {
                        Swal.fire(
                            'Deleted!',
                            'Your item has been deleted.',
                            'success'
                        ).then(() => {
                            // Refresh the page
                            window.location.reload();
                        });
                    }
                } catch (error) {
                    Swal.fire(
                        'Error!',
                        'There was a problem deleting the item.',
                        'error'
                    );
                }
            }
        });
    };

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
                    <button onClick={handleDelete} className="btn delete-btn">
                        <i className="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;
