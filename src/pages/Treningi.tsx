import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import SeznamTreningov from '../components/SeznamTreningov';
import DodajTrening from '../components/DodajTrening';
import TreningPodrobnosti from '../components/TreningPodrobnosti';

const Treningi: React.FC = () => {
    return (
        <div className="container mt-4">
            <div className="btn-group mb-3" role="group">
                <Link to="/treningi/dodaj" className="btn btn-primary">
                    Dodaj trening
                </Link>
            </div>


            <Routes>
                <Route index element={<SeznamTreningov />} />
                <Route path="dodaj" element={<DodajTrening />} />
                <Route path=":id" element={<TreningPodrobnosti />} />
            </Routes>
        </div>
    );
};

export default Treningi;