import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SeznamVaj from '../components/SeznamVaj';
import DodajVajo from '../components/DodajVajo';
import VajaPodrobnosti from '../components/VajaPodrobnosti';

const Vaje: React.FC = () => {
    return (
        <div className="container mt-4">
            <Routes>
                <Route index element={<SeznamVaj />} />
                <Route path="dodaj" element={<DodajVajo />} />
                <Route path=":id" element={<VajaPodrobnosti />} />
            </Routes>
        </div>
    );
};

export default Vaje;