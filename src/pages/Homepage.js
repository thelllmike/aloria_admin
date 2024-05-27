import React, { useEffect, useState } from "react";

import "../style/Homepage.css";

import img from "../images/item1.png";
import Card from "../components/Card";
import Sidebar from "../components/Sidebar";

const Homepage = () => {
	// const [products, setProducts] = useState([]);

	// useEffect(() => {
	// 	fetch("https://my-api.com/products") // replace with your API endpoint
	// 		.then((response) => response.json())
	// 		.then((data) => setProducts(data))
	// 		.catch((error) => console.error("Error:", error));
	// }, []);

	const products = [
		{ name: "Product 1", price: "99.99", image: "your-image-url-1.jpg" },
		{ name: "Product 2", price: "89.99", image: "your-image-url-2.jpg" },
		{ name: "Product 3", price: "79.99", image: "your-image-url-3.jpg" },
		{ name: "Product 4", price: "69.99", image: "your-image-url-4.jpg" },
		{ name: "Product 4", price: "69.99", image: "your-image-url-4.jpg" }, // Add more products as needed
		{ name: "Product 1", price: "99.99", image: "your-image-url-1.jpg" },
		{ name: "Product 2", price: "89.99", image: "your-image-url-2.jpg" },
		{ name: "Product 3", price: "79.99", image: "your-image-url-3.jpg" },
		{ name: "Product 4", price: "69.99", image: "your-image-url-4.jpg" },
		{ name: "Product 4", price: "69.99", image: "your-image-url-4.jpg" },
	];

	return (
		<div className='homepage container-fluid d-flex p-0 m-0'>
			<div className='col-2 col-md-1 col-sm-1 col-lg-2'>
				<Sidebar />
			</div>
		
				<div className='row'>
					{products.map((product, index) => (
						<div
							className='col-12 col-sm-6 col-md-4 col-lg-3 mb-4'
							key={index}
						>
							<Card product={product} index={index} />
						</div>
					))}
				</div>
			</div>

	);
};
export default Homepage;
