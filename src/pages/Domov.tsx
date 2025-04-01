import React from 'react';
import { Link } from 'react-router-dom';

const Domov = () => {
    return (
        <div className="home-container animate-fade">
            <h1 className="home-title">Dobrodošli v Fitness aplikaciji</h1>
            <p className="home-subtitle">Spremljajte svoje treninge in dosežke</p>

            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="card feature-card">
                        <div className="feature-icon">💪</div>
                        <h3 className="feature-title">Treningi</h3>
                        <p>Upravljajte s svojimi treningi. Dodajajte nove, urejajte ali brišite obstoječe.</p>
                        <Link to="/treningi" className="btn btn-primary mt-3">Pojdi na treninge</Link>
                    </div>
                </div>

                <div className="col-md-6 mb-4">
                    <div className="card feature-card">
                        <div className="feature-icon">🏋️</div>
                        <h3 className="feature-title">Vaje</h3>
                        <p>Upravljajte s svojimi vajami. Dodajajte nove, urejajte ali brišite obstoječe.</p>
                        <Link to="/vaje" className="btn btn-primary mt-3">Pojdi na vaje</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Domov;