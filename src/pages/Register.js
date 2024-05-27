import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import login from '../images/login-image.png';
import google from '../images/google-logo.png';
import '../style/Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8001/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                    role: 'admin' // Automatically set the role to 'admin'
                })
            });

            if (response.ok) {
                alert("Registration successful!");
                navigate('/');
            } else {
                const errorData = await response.json();
                alert(`Registration failed: ${errorData.detail}`);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("Registration failed!");
        }
    };

    return (
        <div className="container register">
            <div className="row justify-content-center">
                <div className="col-10">
                    <div className="row">
                        <div className="col-12 col-sm-5 col-md-5 col-lg-5 m-0 p-0">
                            <img src={login} alt="" className='' />
                        </div>
                        <form onSubmit={handleSubmit} className="col-12 col-sm-7 col-md-7 col-lg-7 d-flex flex-column mt-5 form-outline">
                            <h2 className='text-center'>Register</h2>
                            <input
                                type="text"
                                placeholder='Username'
                                className='mt-3 m-2 w-75 mx-auto form-control'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
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
                            <input
                                type="password"
                                placeholder='Confirm Password'
                                className='my-2 w-75 mx-auto form-control'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <input
                                type="hidden"
                                name="role"
                                value="admin" // Hidden input to automatically set role to 'admin'
                            />
                            <button type="submit" className='btn w-75 mx-auto mt-4 register-btn text-white'>
                                Register
                            </button>
                            <button className='btn w-75 mx-auto mt-4 google-btn'>
                                <img src={google} alt="" /> Sign up with Google
                            </button>
                            <div className="text mx-auto fs-5 mt-2 mb-2">
                                <NavLink to={'/'}>Already Have an Account?</NavLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
