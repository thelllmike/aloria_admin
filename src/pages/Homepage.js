import React, { useEffect, useState } from "react";
import "../style/Homepage.css";
import Card from "../components/Card";
import Sidebar from "../components/Sidebar";
import api from "../apiService";

const Homepage = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await api.get('/products/products-mage/');
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className='homepage container-fluid d-flex p-0 m-0'>
            <div className='col-2 col-md-1 col-sm-1 col-lg-2'>
                <Sidebar />
            </div>
            <div className='row'>
                {products.map((product, index) => (
                    <div className='col-12 col-sm-6 col-md-4 col-lg-3 mb-4' key={index}>
                        <Card product={product} index={index} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Homepage;
