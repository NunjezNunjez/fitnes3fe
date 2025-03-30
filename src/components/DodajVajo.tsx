import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dodajVajo } from '../services/api';

const DodajVajo: React.FC = () => {
    const [naziv, setNaziv] = useState('');
    const [opis, setOpis] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dodajVajo({ naziv, opis });
            navigate('/vaje');
        } catch (error) {
            console.error('Napaka pri dodajanju vaje:', error);
        }
    };

    return (
        <div className="container">
            <h2>Dodaj novo vajo</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Naziv:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={naziv}
                        onChange={(e) => setNaziv(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Opis:</label>
                    <textarea
                        className="form-control"
                        rows={5}
                        value={opis}
                        onChange={(e) => setOpis(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Dodaj vajo</button>
            </form>
        </div>
    );
};

export default DodajVajo;