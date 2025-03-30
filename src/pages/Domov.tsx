import React from 'react';
import { Link } from 'react-router-dom';

const Domov: React.FC = () => {
    return (
        <div className="container">
            <h1 className="my-4">Dobrodošli v Fitness aplikaciji</h1>
            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Treningi</h5>
                            <p className="card-text">
                                Upravljajte s svojimi treningi. Dodajajte nove, urejajte ali brišite obstoječe.
                            </p>
                            <Link to="/treningi" className="btn btn-primary">
                                Pojdi na treninge
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Vaje</h5>
                            <p className="card-text">
                                Upravljajte s svojimi vajami. Dodajajte nove, urejajte ali brišite obstoječe.
                            </p>
                            <Link to="/vaje" className="btn btn-primary">
                                Pojdi na vaje
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Domov;