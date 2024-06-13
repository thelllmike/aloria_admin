import React, { useState, useContext } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import login from '../images/login-image.png';
import google from '../images/google-logo.png';
import '../style/Login.css';
import { UserContext } from '../contexts/UserContext';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(UserContext);  // Use the user context
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8001/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    username: email,
                    password: password
                })
            });

            if (response.ok) {
                const data = await response.json();
                const { role, user_id } = data;

                if (role === 'admin') {
                    setUser({ id: user_id, email, role });  // Store user ID and other details in context
                    alert(`Logged in with user ID: ${user_id}`);  // Show alert with user ID
                    navigate('/dashboard');
                } else {
                    alert("You do not have access. Please register as an admin to access this resource.");
                }
            } else {
                const errorData = await response.json();
                alert(`Login failed: ${errorData.detail}`);
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("Login failed!");
        }
    };

    return (
        <div className="container login">
            <div className="row justify-content-center">
                <div className="col-10">
                    <div className="row">
                        <div className="col-12 col-sm-5 col-md-5 col-lg-5 m-0 p-0">
                            <img src={login} alt="" className='' />
                        </div>
                        <form onSubmit={handleSubmit} className="col-12 col-sm-7 col-md-7 col-lg-7 d-flex flex-column mt-5 form-outline">
                            <h2 className='text-center'>Admin Login</h2>
                            <input
                                type="text"
                                placeholder='Email'
                                className='mt-3 m-2 w-75 mx-auto form-control'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder='Password'
                                className='my-2 w-75 mx-auto form-control'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button type="submit" className='btn w-75 mx-auto mt-4 login-btn'>Login</button>
                            <button className='btn w-75 mx-auto mt-4 google-btn'>
                                <img src={google} alt="" /> Sign in with Google
                            </button>
                            <div className="text mx-auto fs-5 mt-2 mb-2">
                                <NavLink to={'/register'}>Don't have an Account?</NavLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
