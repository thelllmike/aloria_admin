import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import img from "../images/profile-image.jpg";
import "../style/Sidebar.css";

const Sidebar = () => {
    const [isProductsOpen, setProductsOpen] = useState(false);
    const [isOrdersOpen, setOrdersOpen] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 991);

    const location = useLocation();

    // Update isSmallScreen state when window size changes
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 991);
        };

        window.addEventListener('resize', handleResize);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        // Check if the current path is within the products or orders dropdown
        if (location.pathname.startsWith('/addproduct') || location.pathname.startsWith('/viewproduct') || location.pathname.startsWith('/categories') || location.pathname.startsWith('/brands')) {
            setProductsOpen(!isSmallScreen); // Open only if not a small screen
        } else if (location.pathname.startsWith('/order') || location.pathname.startsWith('/orders')) {
            setOrdersOpen(!isSmallScreen); // Open only if not a small screen
        }

        // Close dropdowns when screen size is small
        if (isSmallScreen) {
            setProductsOpen(false);
            setOrdersOpen(false);
        }
    }, [location, isSmallScreen]);

    const toggleDropdown = (dropdown) => {
        if (dropdown === 'products') {
            setProductsOpen(!isProductsOpen);
            if (isSmallScreen) setOrdersOpen(false); // Close other dropdown if open on small screens
        } else if (dropdown === 'orders') {
            setOrdersOpen(!isOrdersOpen);
            if (isSmallScreen) setProductsOpen(false); // Close other dropdown if open on small screens
        }
    };

    return (
        <div className={`sidebar ${isSmallScreen ? 'small-screen' : ''}`}>
            <div className='profile d-flex mt-1'>
                <h5 className={`m-3 ${isSmallScreen ? 'd-none' : ''}`}>Hello, Ayesh</h5>
                <img src={img} alt='' />
            </div>
            <nav>
                <ul className='list-unstyled ps-1'>
                    <li className='py-2'>
                        <NavLink to='/dashboard' className='btn btn-toggle' activeClassName='active'>
                            <i className='fa-solid fa-chart-line'></i> <span className={`${isSmallScreen ? 'd-none' : 'ml-2'}`}>Dashboard</span>
                        </NavLink>
                    </li>
                    <li className="py-2">
                        <button
                            className="btn btn-toggle"
                            onClick={() => toggleDropdown('products')}
                            data-open={isProductsOpen}
                        >
                            <i className="fa-solid fa-box-archive"></i>
                            <span className={`${isSmallScreen ? 'd-none' : 'ml-2'}`}>Products</span>
                            <i className={`fa ${isProductsOpen ? 'fa-caret-down' : 'fa-caret-right'}`}></i>
                        </button>
                        <div className={`dropdown-container ${isProductsOpen ? 'd-block' : ''}`}>
                            <NavLink
                                to="/addproduct"
                                className="dropdown-item py-2"
                                onClick={() => { if (isSmallScreen) setProductsOpen(false); }}
                            >
                                Add Product
                            </NavLink>
                            <NavLink
                                to="/viewproduct"
                                className="dropdown-item py-2"
                                onClick={() => { if (isSmallScreen) setProductsOpen(false); }}
                            >
                                View Product
                            </NavLink>
                            <NavLink
                                to="/categories"
                                className="dropdown-item py-2"
                                onClick={() => { if (isSmallScreen) setProductsOpen(false); }}
                            >
                                Categories
                            </NavLink>
                            <NavLink
                                to="/brands"
                                className="dropdown-item py-2"
                                onClick={() => { if (isSmallScreen) setProductsOpen(false); }}
                            >
                                Brands
                            </NavLink>
                        </div>
                    </li>
                    <li className='py-2'>
                        <NavLink to='/order' className='btn btn-toggle' activeClassName='active'>
                            <i class="fa-solid fa-truck"></i> <span className={`${isSmallScreen ? 'd-none' : 'ml-2'}`}>Order</span>
                        </NavLink>
                    </li>

                    <li className='py-2'>
                        <NavLink to='/delivery-management' className='btn btn-toggle ' activeClassName='active'>
                            <i className='fa-solid fa-users'></i> <span className={`${isSmallScreen ? 'd-none' : 'ml-2'}`}>Customers</span>
                        </NavLink>
                    </li>
                    <li className='py-2'>
                        <NavLink to='/delivery-management' className='btn btn-toggle ' activeClassName='active'>
                            <i className='fa-solid fa-money-check'></i> <span className={`${isSmallScreen ? 'd-none' : 'ml-2'}`}>Transactions</span>
                        </NavLink>
                    </li>
                    <li className='py-2'>
                        <NavLink to='/chat' className='btn btn-toggle ' activeClassName='active'>
                            <i className="fa-regular fa-comment-dots"></i> <span className={`${isSmallScreen ? 'd-none' : 'ml-2'}`}>Chat</span>
                        </NavLink>
                    </li>
                </ul>
                <NavLink to='/' className='btn btn-toggle mt-auto border-0' activeClassName='activ'>
                    <i className='fa-solid fa-right-from-bracket fs-5'></i>
                </NavLink>
            </nav>

        </div >
    );
};

export default Sidebar;
