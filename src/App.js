// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Register from './pages/Register';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import AddProductForm from './pages/Addproduct';
import EditProductForm from './pages/EditProductForm';
import MessagingApp from './pages/Messagingapp';
import Order from './pages/Order';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';

function App() {
    return (
        <UserProvider>
            <div className='App'>
                <Router>
                    <Routes>
                        <Route path='/register' element={<Register />} />
                        <Route path='/' element={<Login />} />
                        <Route path='/viewproduct' element={<Homepage />} />
                        <Route path='/addproduct' element={<AddProductForm />} />
                        <Route path='/editproduct' element={<EditProductForm />} />
                        <Route path='/chat' element={<MessagingApp />} />
                        <Route path="/order" element={<Order />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/sidebar" element={<Sidebar />} />
                    </Routes>
                </Router>
            </div>
        </UserProvider>
    );
}

export default App;
