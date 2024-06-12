import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import placeholderImage from "../images/cloud.png";
import Sidebar from "../components/Sidebar";
import "../style/Addproduct.css";
import { storage } from '../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import api from "../apiService";
import { useParams, useNavigate } from "react-router-dom";

const categoryOptions = [
    { value: 'Oily', label: 'Oily' },
    { value: 'Dry', label: 'Dry' },
    { value: 'Normal', label: 'Normal' },
    { value: 'Sensitive', label: 'Sensitive' },
];

const EditProductForm = () => {
    const { product_id } = useParams();
    const navigate = useNavigate();
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [cost, setCost] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(null);
    const [brand, setBrand] = useState('');
    const [image, setImage] = useState(placeholderImage);
    const [file, setFile] = useState(null);
    const fileInput = useRef(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/products/${product_id}`);
                const product = response.data;
                setProductName(product.product_name);
                setQuantity(product.stock);
                setPrice(product.price);
                setCost(product.cost);
                setDescription(product.description);
                setCategory(categoryOptions.find(option => option.value === product.category));
                setBrand(product.brand);
                if (product.images && product.images.length > 0) {
                    setImage(product.images[0].image_url);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
                Swal.fire('Error!', 'There was a problem fetching the product details.', 'error');
            }
        };

        fetchProduct();
    }, [product_id]);

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            setFile(event.target.files[0]);

            reader.onloadend = () => {
                setImage(reader.result);
            };

            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to update this item?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Create the product data
                    const productData = {
                        product_name: productName,
                        description,
                        price: parseFloat(price),
                        stock: parseInt(quantity, 10),
                        category: category.value,
                        cost: parseFloat(cost),
                        brand
                    };
    
                    let imageUrl = image;
    
                    if (file) {
                        // Upload the image to Firebase Storage and get the download URL
                        const storageRef = ref(storage, `images/${product_id}_${file.name}`);
                        await uploadBytes(storageRef, file);
                        imageUrl = await getDownloadURL(storageRef);
                    }
    
                    // Combine product data and image URL in the expected format
                    const updateData = {
                        product: productData,
                        image_url: imageUrl
                    };
    
                    const productResponse = await api.put(`/products/products/${product_id}`, updateData, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
    
                    if (productResponse.status === 200) {
                        const product = productResponse.data;
    
                        // Show alert with product ID
                        Swal.fire(
                            'Product Updated!',
                            `Product ID: ${product.product_id}`,
                            'success'
                        ).then(() => {
                            navigate("/viewproduct");
                        });
                    } else {
                        throw new Error('Product update failed');
                    }
                } catch (error) {
                    console.error("Error during form submission:", error);
                    Swal.fire(
                        'Error!',
                        'There was a problem updating the item.',
                        'error'
                    );
                }
            } else if (result.isDismissed) {
                console.log("Form submission cancelled");
            }
        });
    };
    

    return (
        <div className="addproduct container-fluid d-flex p-0 m-0">
            <div className="col-2 col-md-1 col-sm-1 col-lg-2">
                <Sidebar />
            </div>
            <div className="form-wrapper col-10 col-md-11 col-sm-11 col-lg-10">
                <h2 className="page-title">Edit Product</h2>
                <div className="row justify-content-center">
                    <div className="col-12">
                        <form className="add-product-form mt-4" onSubmit={handleSubmit}>
                            <div className="form-content d-flex flex-column">
                                <div className="form-fields col-12 col-md-9">
                                    <div className="form-group order-1 my-2">
                                        <input type="text" className="form-control" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} required />
                                    </div>
                                    <div className="form-group order-1 my-2">
                                        <input type="number" className="form-control" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                                    </div>
                                    <div className="form-group order-1 my-2">
                                        <input type="number" className="form-control" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                                    </div>
                                    <div className="form-group order-1 my-2">
                                        <input type="number" className="form-control" placeholder="Cost" value={cost} onChange={(e) => setCost(e.target.value)} required />
                                    </div>
                                    <div className="form-group order-1 my-2">
                                        <textarea className="form-control" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                                    </div>
                                    <div className="form-group order-1 my-2">
                                        <Select options={categoryOptions} placeholder="Select Category" onChange={setCategory} value={category} required />
                                    </div>
                                    <div className="form-group order-1 my-2">
                                        <input type="text" className="form-control" placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} required />
                                    </div>
                                    <div className="form-group order-1">
                                        <input
                                            type="file"
                                            ref={fileInput}
                                            style={{ display: "none" }}
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                    <div className="image-preview col-12 col-md-3 text-center order-2 mb-3 mb-md-0">
                                        <img
                                            src={image}
                                            alt="Preview"
                                            className="preview-image img-fluid"
                                            onClick={() => fileInput.current.click()}
                                            style={{ cursor: "pointer" }}
                                        />
                                    </div>
                                    <button type="submit" className="btn add-btn order-3 w-100">
                                        Update Item
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProductForm;
