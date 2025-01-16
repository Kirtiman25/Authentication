import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

const App = () => {
    return (
        <Router>
            <div className="flex flex-col items-center p-6">
                <h1 className="text-4xl font-bold mb-4">Auth System</h1>
                <nav className="mb-6">
                    <Link className="text-blue-500 hover:underline mx-2" to="/signup">
                        Signup
                    </Link>
                    <Link className="text-blue-500 hover:underline mx-2" to="/login">
                        Login
                    </Link>
                </nav>
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
};

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/signup', { username, password });
            setMessage(response.data.message);
        } catch (err) {
            setMessage(err.response.data.error || 'Error signing up');
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Signup</h2>
            <form onSubmit={handleSignup} className="space-y-4">
                <input
                    type="text"
                    placeholder="Username"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                >
                    Signup
                </button>
            </form>
            <p className="mt-4 text-center text-red-500">{message}</p>
        </div>
    );
};

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });
            setMessage(response.data.message);
            if (response.status === 200) navigate('/dashboard'); // Navigate to Dashboard on success
        } catch (err) {
            setMessage(err.response.data.error || 'Error logging in');
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
                <input
                    type="text"
                    placeholder="Username"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                >
                    Login
                </button>
            </form>
            <p className="mt-4 text-center text-red-500">{message}</p>
        </div>
    );
};

export default App;
