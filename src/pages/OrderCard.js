import React from 'react';
import Select from 'react-select';
import chroma from 'chroma-js';
import '../style/OrderCard.css'

const OrderCard = ({ order, index, getStatusColors, statusOptions, changeStatus, colourStyles }) => {
    return (
        <div className="order-card mb-3 justify-content-center m-auto">
            <div className="row g-0">
                <div className="card">
                    <div className="card-above">
                        <img src={order.img} className="img-fluid rounded-top" alt="Product" />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{order.productName}</h5>
                        <p className="card-text"><strong>Customer:</strong> {order.customer}</p>
                        <p className="card-text"><strong>Category:</strong> {order.category}</p>
                        <p className="card-text"><strong>Address:</strong> {order.address}</p>
                        <p className="card-text"><strong>Quantity:</strong> {order.quantity}</p>
                        <p className="card-text"><strong>Order Date:</strong> {order.orderDate}</p>
                        <p className="card-text"><strong>Price:</strong> {order.price}</p>
                        <div className="d-flex align-items-center">
                            <span className={`dot ${getStatusColors(order.status).bg}`}></span>
                            <Select
                                options={statusOptions}
                                isSearchable={true}
                                value={statusOptions.find(option => option.value === order.status)}
                                onChange={(option) => changeStatus(index, option.value)}
                                styles={colourStyles}
                                menuPlacement="top"
                                className="select-container"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default OrderCard;
