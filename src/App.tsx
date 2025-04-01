import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import Domov from './pages/Domov';
import Treningi from './pages/Treningi';
import Vaje from './pages/Vaje';
import Login from './pages/Login';
import Registracija from './pages/Register';
import './App.css';
import axios from 'axios';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [authChecked, setAuthChecked] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    await axios.get('http://localhost:3000/auth', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setIsAuthenticated(true);
                }
            } catch (error) {
                localStorage.removeItem('token');
            } finally {
                setAuthChecked(true);
            }
        };

        checkAuth();
    }, [navigate]);

    if (!authChecked) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    return (
        <Router>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">Fitness App</Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Domov</Link>
                            </li>

                            {isLoggedIn && (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/treningi">Treningi</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/vaje">Vaje</Link>
                                    </li>
                                </>
                            )}
                        </ul>

                        <ul className="navbar-nav ms-auto">
                            {isLoggedIn ? (
                                <li className="nav-item">
                                    <button
                                        className="nav-link btn btn-link"
                                        onClick={handleLogout}
                                    >
                                        Odjava
                                    </button>
                                </li>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/registracija">Registracija</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<Domov />} />
                    <Route path="/login" element={<Login onLogin={setIsLoggedIn} />} />
                    <Route path="/registracija" element={<Registracija />} />

                    <Route path="/treningi/*" element={
                        <ProtectedRoute>
                            <Treningi />
                        </ProtectedRoute>
                    } />

                    <Route path="/vaje/*" element={
                        <ProtectedRoute>
                            <Vaje />
                        </ProtectedRoute>
                    } />
                </Routes>
            </div>
        </Router>
    );
};

export default App;