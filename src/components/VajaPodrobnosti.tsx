import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { pridobiVajo, posodobiVajo, izbrisiVajo } from '../services/api';
import { Vaja } from '../types/types';

const VajaPodrobnosti: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [vaja, setVaja] = useState<Vaja | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Partial<Vaja>>({});
    const navigate = useNavigate();

    useEffect(() => {
        const naloziVajo = async () => {
            try {
                if (!id) return;
                const podatki = await pridobiVajo(parseInt(id));
                setVaja(podatki);
                setFormData({
                    naziv: podatki.naziv,
                    opis: podatki.opis,
                });
            } catch (error) {
                setError('Napaka pri pridobivanju vaje');
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        naloziVajo();
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePosodobi = async () => {
        if (!id) return;
        try {
            const posodobljenaVaja = await posodobiVajo(parseInt(id), formData);
            setVaja(posodobljenaVaja);
            setIsEditing(false);
        } catch (error) {
            console.error('Napaka pri posodabljanju vaje:', error);
        }
    };

    const handleIzbrisi = async () => {
        if (!id) return;
        if (window.confirm('Ali ste prepričani, da želite izbrisati to vajo?')) {
            try {
                await izbrisiVajo(parseInt(id));
                navigate('/vaje');
            } catch (error) {
                console.error('Napaka pri brisanju vaje:', error);
            }
        }
    };

    if (isLoading) {
        return <div className="alert alert-info">Nalagam vajo...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!vaja) {
        return <div className="alert alert-warning">Vaja ne obstaja</div>;
    }

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Podrobnosti vaje</h2>
                <div>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="btn btn-secondary me-2"
                    >
                        {isEditing ? 'Prekliči' : 'Uredi'}
                    </button>
                    <button
                        onClick={handleIzbrisi}
                        className="btn btn-danger"
                    >
                        Izbriši
                    </button>
                </div>
            </div>

            {isEditing ? (
                <div className="card">
                    <div className="card-body">
                        <div className="form-group mb-3">
                            <label>Naziv:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="naziv"
                                value={formData.naziv || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Opis:</label>
                            <textarea
                                className="form-control"
                                name="opis"
                                rows={5}
                                value={formData.opis || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button
                            onClick={handlePosodobi}
                            className="btn btn-primary"
                        >
                            Shrani spremembe
                        </button>
                    </div>
                </div>
            ) : (
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{vaja.naziv}</h5>
                        <p className="card-text">{vaja.opis}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VajaPodrobnosti;