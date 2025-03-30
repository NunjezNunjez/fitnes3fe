import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Domov from './pages/Domov';
import Treningi from './pages/Treningi';
import Vaje from './pages/Vaje';
import './App.css';


const App: React.FC = () => {
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
                            <li className="nav-item">
                                <Link className="nav-link" to="/treningi">Treningi</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/vaje">Vaje</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="mt-4">
                <Routes>
                    <Route path="/" element={<Domov />} />
                    <Route path="/treningi/*" element={<Treningi />} />
                    <Route path="/vaje/*" element={<Vaje />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;