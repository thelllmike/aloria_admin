import React, { useEffect, useState } from 'react';
import '../style/Order.css';
import Sidebar from '../components/Sidebar';
import Select from 'react-select';
import chroma from 'chroma-js';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import OrderCard from './OrderCard';
import axios from 'axios';

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState(null);
    const [statusFilter, setStatusFilter] = useState(null);
    const [dateRange, setDateRange] = useState([{ startDate: null, endDate: null, key: 'selection' }]);
    const [showCalendar, setShowCalendar] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8001/orders/order-details/?skip=0&limit=100');
                const fetchedOrders = response.data.map(order => ({
                    orderItemId: order.order_item_id,  // Ensure this is correctly fetched and set
                    productName: order.product_name,
                    customer: order.customer,
                    category: order.category,
                    address: order.address,
                    quantity: order.quantity,
                    price: `$${order.price.toFixed(2)}`,
                    status: order.status.charAt(0).toUpperCase() + order.status.slice(1),
                    orderDate: new Date(order.order_date).toLocaleDateString(),
                    img: 'https://via.placeholder.com/50' // Default placeholder image, you can replace it with actual image URL if available
                }));
                setOrders(fetchedOrders);
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };

        fetchOrders();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1100); // Adjust the threshold as needed
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check on mount

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const getStatusColors = (status) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return { bg: 'bg-success', text: 'text-success', color: '#198754' };
            case 'pending':
                return { bg: 'bg-warning', text: 'text-warning', color: '#ffc107' };
            case 'cancelled':
                return { bg: 'bg-danger', text: 'text-danger', color: '#dc3545' };
            case 'shipped':
                return { bg: 'bg-primary', text: 'text-primary', color: '#0d6efd' };
            case 'delivered':
                return { bg: 'bg-info', text: 'text-info', color: '#0dcaf0' };
            default:
                return { bg: '', text: '', color: 'black' };
        }
    };

    const statusOptions = [
        { value: 'pending', label: 'Pending', ...getStatusColors('pending') },
        { value: 'shipped', label: 'Shipped', ...getStatusColors('shipped') },
        { value: 'delivered', label: 'Delivered', ...getStatusColors('delivered') },
        { value: 'cancelled', label: 'Cancelled', ...getStatusColors('cancelled') }
    ];

    const categoryOptions = [
        { value: 'Category A', label: 'Category A' },
        { value: 'Category B', label: 'Category B' },
        { value: 'Category C', label: 'Category C' }
    ];

    const changeStatus = async (index, newStatus) => {
        const confirmation = window.confirm(`Are you sure you want to change the status to ${newStatus}?`);
        if (confirmation) {
            const newOrders = [...orders];
            newOrders[index].status = newStatus;
            setOrders(newOrders);
            
            try {
                await axios.put(`http://127.0.0.1:8001/order_items/item/${newOrders[index].orderItemId}`, {
                    status: newStatus.toLowerCase()
                });
                console.log('Status updated successfully');
            } catch (error) {
                console.error('Error updating status:', error);
            }
        }
    };

    const colourStyles = {
        control: (styles) => ({ ...styles, border: 'none', boxShadow: 'none', backgroundColor: 'transparent' }),
        singleValue: (provided, state) => {
            const color = state.data.color ? chroma(state.data.color) : chroma('black');
            return { ...provided, color: color.css() };
        },
        option: (provided, state) => {
            const color = state.data.color ? chroma(state.data.color) : chroma('black');
            return {
                ...provided,
                color: state.isSelected ? (chroma.contrast(color, 'black') > 2 ? 'white' : 'black') : color.css(),
                backgroundColor: state.isSelected ? color.alpha(0.1).css() : provided.backgroundColor,
            };
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleCategoryChange = (selectedOption) => {
        setCategoryFilter(selectedOption);
    };

    const handleStatusChange = (selectedOption) => {
        setStatusFilter(selectedOption);
    };

    const handleDateRangeChange = (ranges) => {
        setDateRange([ranges.selection]);
    };

    const resetFilters = () => {
        setCategoryFilter(null);
        setStatusFilter(null);
        setSearchQuery('');
        setDateRange([{ startDate: null, endDate: null, key: 'selection' }]);
    };

    const filteredOrders = orders.filter((order) => {
        let matchesSearch = true;
        if (searchQuery) {
            matchesSearch = order.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.address.toLowerCase().includes(searchQuery.toLowerCase());
        }
        let matchesCategory = true;
        if (categoryFilter) {
            matchesCategory = order.category === categoryFilter.value;
        }
        let matchesStatus = true;
        if (statusFilter) {
            matchesStatus = order.status.toLowerCase() === statusFilter.value.toLowerCase();
        }
        let matchesDateRange = true;
        if (dateRange[0].startDate && dateRange[0].endDate) {
            const orderDate = new Date(order.orderDate);
            matchesDateRange = orderDate >= dateRange[0].startDate && orderDate <= dateRange[0].endDate;
        }
        return matchesSearch && matchesCategory && matchesStatus && matchesDateRange;
    });

    return (
        <div className='order container-fluid d-flex p-0 m-0'>
            <div className='col-2 col-md-1 col-sm-1 col-lg-2'>
                <Sidebar />
            </div>
            <div className='col-10 col-md-11 col-sm-11 col-lg-10'>
                <div className='row mb-3'>
                    <div className="col-8 col-md-10 col-sm-10 col-lg-10 d-flex align-items-center">
                        <input
                            type="text"
                            className="form-control me-2"
                            placeholder="Search by Product Name or Customer or address"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            style={{ height: '45px' }}
                        />
                    </div>
                    <div className="col-2 col-md-1 col-sm-1 col-lg-1">
                        <button className="btn calendar-btn text-primary border" onClick={() => setShowCalendar(!showCalendar)}>
                            <i className="fa-solid fa-calendar-days"></i>
                        </button>
                    </div>
                    <div className="col-2 col-md-1 col-sm-1 col-lg-1">
                        <button className="btn reset-btn" onClick={resetFilters}>
                            <i className="fa-solid fa-rotate"></i>
                        </button>
                    </div>
                </div>
                <div className='row mb-3'>
                    <div className="col-12 d-flex">
                        <Select
                            placeholder="Select Category"
                            value={categoryFilter}
                            onChange={handleCategoryChange}
                            options={categoryOptions}
                            isClearable
                            styles={{
                                ...colourStyles,
                                control: (provided, state) => ({
                                    ...provided,
                                    borderColor: state.isFocused ? '#888888' : '#888888',
                                    borderWidth: '1px',
                                    borderRadius: '4px',
                                    boxShadow: state.isFocused ? '0 0 0 1px #888888' : 'none',
                                    '&:hover': {
                                        borderColor: '#888888'
                                    }
                                })
                            }}
                            className="me-2 select-container"
                        />
                        <Select
                            placeholder="Select Status"
                            value={statusFilter}
                            onChange={handleStatusChange}
                            options={statusOptions}
                            isClearable
                            styles={{
                                ...colourStyles,
                                control: (provided, state) => ({
                                    ...provided,
                                    borderColor: state.isFocused ? '#888888' : '#888888',
                                    borderWidth: '1px',
                                    borderRadius: '4px',
                                    boxShadow: state.isFocused ? '0 0 0 1px #888888' : 'none',
                                    '&:hover': {
                                        borderColor: '#888888'
                                    }
                                })
                            }}
                            className="me-2 select-container"
                        />
                    </div>
                    {showCalendar && (
                        <div className="calendar-container position-absolute" style={{ zIndex: 999 }}>
                            <DateRange
                                editableDateInputs={true}
                                onChange={handleDateRangeChange}
                                moveRangeOnFirstSelection={false}
                                ranges={dateRange}
                            />
                        </div>
                    )}
                </div>

                {isMobile ? (
                    <div className="card-container col-12">
                        {filteredOrders.map((order, index) => (
                            <OrderCard
                                key={index}
                                order={order}
                                index={index}
                                getStatusColors={getStatusColors}
                                statusOptions={statusOptions}
                                changeStatus={changeStatus}
                                colourStyles={colourStyles}
                            />
                        ))}
                    </div>
                ) : (
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Customer</th>
                                <th>Category</th>
                                <th>Address</th>
                                <th>Quantity</th>
                                <th>Order Date</th>
                                <th>Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order, index) => (
                                <tr key={index}>
                                    <td>{order.productName}</td>
                                    <td className=''>
                                        <div className='d-flex' style={{ height: '100%' }}>
                                            <img
                                                src={order.img}
                                                alt="Customer"
                                                className="rounded-circle"
                                            />
                                            <p className='px-2 pt-1 m-0'>{order.customer}</p>
                                        </div>
                                    </td>
                                    <td>{order.category}</td>
                                    <td>{order.address}</td>
                                    <td>{order.quantity}</td>
                                    <td>{order.orderDate}</td>
                                    <td>{order.price}</td>
                                    <td className="position-relative d-flex align-items-center">
                                        <span className={`dot ${getStatusColors(order.status).bg}`}></span>
                                        <Select
                                            options={statusOptions}
                                            isSearchable={true}
                                            value={statusOptions.find(option => option.value.toLowerCase() === order.status.toLowerCase())}
                                            onChange={(option) => changeStatus(index, option.value)}
                                            styles={colourStyles}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Order;
