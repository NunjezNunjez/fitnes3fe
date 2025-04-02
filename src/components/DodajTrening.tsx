import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dodajTrening, pridobiVseVaje } from '../services/api';
import { Vaja } from '../types/types';

const DodajTrening: React.FC = () => {
    const [trajanje, setTrajanje] = useState<number>(30);
    const [opomba, setOpomba] = useState<string>('');
    const [datum, setDatum] = useState<string>(new Date().toISOString().split('T')[0]);
    const [izbraneVaje, setIzbraneVaje] = useState<number[]>([]);
    const [vseVaje, setVseVaje] = useState<Vaja[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const naloziVaje = async () => {
            try {
                const vaje = await pridobiVseVaje();
                setVseVaje(vaje);
            } catch (error) {
                console.error('Napaka pri nalaganju vaj:', error);
            }
        };
        naloziVaje();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dodajTrening({
                trajanje,
                opomba,
                datum,
                vajaIDs: izbraneVaje,
            });
            navigate('/treningi');
        } catch (error) {
            console.error('Napaka pri dodajanju treninga:', error);
        }
    };

    const handleVajaChange = (vajaId: number) => {
        setIzbraneVaje(prev =>
            prev.includes(vajaId)
                ? prev.filter(id => id !== vajaId)
                : [...prev, vajaId]
        );
    };

    return (
        <div className="container">
            <h2>Dodaj nov trening</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Trajanje (minute):</label>
                    <input
                        type="number"
                        className="form-control"
                        value={trajanje}
                        onChange={(e) => setTrajanje(Number(e.target.value))}
                        required
                        min="1"
                    />
                </div>
                <div className="form-group">
                    <label>Datum:</label>
                    <input
                        type="date"
                        className="form-control"
                        value={datum}
                        onChange={(e) => setDatum(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Opomba:</label>
                    <textarea
                        className="form-control"
                        value={opomba}
                        onChange={(e) => setOpomba(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Vaje:</label>
                    {vseVaje.map(vaja => (
                        <div key={vaja.id} className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id={`vaja-${vaja.id}`}
                                checked={izbraneVaje.includes(vaja.id)}
                                onChange={() => handleVajaChange(vaja.id)}
                            />
                            <label className="form-check-label" htmlFor={`vaja-${vaja.id}`}>
                                {vaja.naziv}
                            </label>
                        </div>
                    ))}
                </div>
                <button type="submit" className="btn btn-primary">Dodaj trening</button>
            </form>
        </div>
    );
};

export default DodajTrening;