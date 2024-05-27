import React from "react";
import "../style/Card.css";
import img from "../images/item1.png";
import { NavLink } from "react-router-dom";

const Card = ({ products, index }) => {
    return (
        <div className="card mt-4">
            <img src={img} alt="Product" className="card-img-top" />
            <div className="card-body">
                <h5 className="card-title">Lorem, ipsum dolor.</h5>
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="category">Oily</div>
                    <p className="card-text price">$20.00</p>
                </div>
                <p className="description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ullamcorper dolor atque maxime? Deserunt, at quis.
                </p>
                <div className={`quantity ${index === 1 ? "second-card" : ""}`}>
                    Quantity: <span>10</span>
                </div>
                <div className="buttons d-flex justify-content-between mt-3">
                    <NavLink to="/editproduct" className="btn edit-btn">
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
