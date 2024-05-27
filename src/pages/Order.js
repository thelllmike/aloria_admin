import React, { useEffect, useState } from 'react';
import '../style/Order.css';
import Sidebar from '../components/Sidebar';
import Select from 'react-select';
import chroma from 'chroma-js';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import OrderCard from './OrderCard';

const Order = () => {
    const [orders, setOrders] = useState([
        {
            productName: 'Product A',
            customer: 'John Doe Abraham',
            category: 'Category A',
            address: '124 Main St, City',
            quantity: 10,
            price: '$50.00',
            status: 'Pending',
            orderDate: '2024-02-15',
            img: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            productName: 'Product B',
            customer: 'Jane Smith',
            category: 'Category B',
            address: '456 Elm St, Town',
            quantity: 5,
            price: '$30.00',
            status: 'Pending',
            orderDate: '2024-03-16',
            img: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            productName: 'Product C',
            customer: 'Michael Johnson',
            category: 'Category A',
            address: '789 Oak St, Village',
            quantity: 20,
            price: '$100.00',
            status: 'Pending',
            orderDate: '2024-08-17',
            img: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            productName: 'Product D',
            customer: 'Emily Williams',
            category: 'Category C',
            address: '101 Pine St, Hamlet',
            quantity: 8,
            price: '$45.00',
            status: 'Rejected',
            orderDate: '2024-08-18',
            img: 'https://images.pexels.com/photos/678783/pexels-photo-678783.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            productName: 'Product E',
            customer: 'Daniel Brown',
            category: 'Category A',
            address: '222 Cedar St, Village',
            quantity: 15,
            price: '$75.00',
            status: 'Rejected',
            orderDate: '2024-05-19',
            img: 'https://images.pexels.com/photos/1547971/pexels-photo-1547971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            productName: 'Product F',
            customer: 'Olivia Davis',
            category: 'Category B',
            address: '333 Maple St, Town',
            quantity: 12,
            price: '$60.00',
            status: 'Completed',
            orderDate: '2024-01-20',
            img: 'https://images.pexels.com/photos/1484810/pexels-photo-1484810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            productName: 'Product G',
            customer: 'Ethan Wilson',
            category: 'Category C',
            address: '444 Walnut St, Hamlet',
            quantity: 6,
            price: '$35.00',
            status: 'Delivering',
            orderDate: '2024-02-21',
            img: 'https://images.pexels.com/photos/634021/pexels-photo-634021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            productName: 'Product H',
            customer: 'Ava Garcia',
            category: 'Category A',
            address: '555 Birch St, Village',
            quantity: 18,
            price: '$90.00',
            status: 'Completed',
            orderDate: '2024-05-22',
            img: 'https://images.pexels.com/photos/1370750/pexels-photo-1370750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            productName: 'Product I',
            customer: 'William Rodriguez',
            category: 'Category B',
            address: '666 Oak St, Town',
            quantity: 9,
            price: '$55.00',
            status: 'Delivering',
            orderDate: '2024-05-24',
            img: 'https://images.pexels.com/photos/1435612/pexels-photo-1435612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            productName: 'Product J',
            customer: 'Sophia Martinez',
            category: 'Category C',
            address: '777 Pine St, Hamlet',
            quantity: 11,
            price: '$65.00',
            status: 'Pending',
            orderDate: '2024-05-24',
            img: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState(null);
    const [statusFilter, setStatusFilter] = useState(null);
    const [dateRange, setDateRange] = useState([{ startDate: null, endDate: null, key: 'selection' }]);
    const [showCalendar, setShowCalendar] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

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
            case 'rejected':
                return { bg: 'bg-danger', text: 'text-danger', color: '#dc3545' };
            case 'delivering':
                return { bg: 'bg-primary', text: 'text-primary', color: '#0d6efd' };
            default:
                return { bg: '', text: '', color: 'black' };
        }
    };

    const statusOptions = [
        { value: 'Pending', label: 'Pending', ...getStatusColors('Pending') },
        { value: 'Delivering', label: 'Delivering', ...getStatusColors('Delivering') },
        { value: 'Completed', label: 'Completed', ...getStatusColors('Completed') },
        { value: 'Rejected', label: 'Rejected', ...getStatusColors('Rejected') }
    ];

    const categoryOptions = [
        { value: 'Category A', label: 'Category A' },
        { value: 'Category B', label: 'Category B' },
        { value: 'Category C', label: 'Category C' }
    ];

    const changeStatus = (index, newStatus) => {
        const confirmation = window.confirm(`Are you sure you want to change the status to ${newStatus}?`);
        if (confirmation) {
            const newOrders = [...orders];
            newOrders[index].status = newStatus;
            setOrders(newOrders);
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
            matchesStatus = order.status === statusFilter.value;
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
                            <i class="fa-solid fa-calendar-days"></i>
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
                                            value={statusOptions.find(option => option.value === order.status)}
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