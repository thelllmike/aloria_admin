import React, { useRef, useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import placeholderImage from "../images/cloud.png";
import Sidebar from "../components/Sidebar";
import "../style//Editproduct.css";

const categoryOptions = [
    { value: 'category1', label: 'Category 1' },
    { value: 'category2', label: 'Category 2' },
    { value: 'category3', label: 'Category 3' },
];

const brandOptions = [
    { value: 'brand1', label: 'Brand 1' },
    { value: 'brand2', label: 'Brand 2' },
    { value: 'brand3', label: 'Brand 3' },
];

const EditProductForm = () => {
    const [image, setImage] = useState(placeholderImage);
    const fileInput = useRef(null);

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setImage(reader.result);
            };

            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to edit this item?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, edit it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Proceed with form submission logic here
                console.log("Form submitted");
                Swal.fire(
                    'edited!',
                    'Your item has been edited.',
                    'success'
                );
                // edit your form submission logic here
            } else if (result.isDismissed) {
                console.log("Form submission cancelled");
            }
        });
    };

    return (
        <div className="editproduct container-fluid d-flex p-0 m-0">
            <div className="col-2 col-md-1 col-sm-1 col-lg-2">
                <Sidebar />
            </div>
            <div className="form-wrapper col-10 col-md-11 col-sm-11 col-lg-10">
                <h2 className="page-title">Edit Product</h2>
                <div className="row justify-content-center">
                    <div className="col-12">
                        <form className="edit-product-form mt-4" onSubmit={handleSubmit}>
                            <div className="form-content d-flex flex-column">
                                <div className="form-fields col-12 col-md-9">
                                    <div className="form-group order-1 my-2">
                                        <input type="text" className="form-control" placeholder="Product Name" />
                                    </div>
                                    <div className="form-group order-1 my-2">
                                        <input type="number" className="form-control" placeholder="Quantity" />
                                    </div>
                                    <div className="form-group order-1 my-2">
                                        <input type="number" className="form-control" placeholder="Cost" />
                                    </div>
                                    <div className="form-group order-1 my-2">
                                        <textarea className="form-control" placeholder="Description"></textarea>
                                    </div>
                                    <div className="form-group order-1 my-2">
                                        <Select options={categoryOptions} placeholder="Select Category" />
                                    </div>
                                    <div className="form-group order-1 my-2">
                                        <Select options={brandOptions} placeholder="Select Brand" />
                                    </div>
                                    <div className="form-group order-1">
                                        <input
                                            type="file"
                                            ref={fileInput}
                                            style={{ display: "none" }}
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
                                    <button type="submit" className="btn edit-btn order-3 w-100">
                                        Edit Item
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
