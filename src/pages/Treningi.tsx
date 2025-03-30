import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SeznamTreningov from '../components/SeznamTreningov';
import DodajTrening from '../components/DodajTrening';
import TreningPodrobnosti from '../components/TreningPodrobnosti';

const Treningi: React.FC = () => {
    return (
        <div className="container mt-4">
            <Routes>
                <Route index element={<SeznamTreningov />} />
                <Route path="dodaj" element={<DodajTrening />} />
                <Route path=":id" element={<TreningPodrobnosti />} />
            </Routes>
        </div>
    );
};

export default Treningi;