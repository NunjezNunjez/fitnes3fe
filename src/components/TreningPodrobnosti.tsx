import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { pridobiTrening, posodobiTrening, izbrisiTrening } from '../services/api';
import { Trening } from '../types/types';

const TreningPodrobnosti: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [trening, setTrening] = useState<Trening | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Partial<Trening>>({});
    const navigate = useNavigate();

    useEffect(() => {
        const naloziTrening = async () => {
            try {
                if (!id) return;
                const podatki = await pridobiTrening(parseInt(id));
                setTrening(podatki);
                setFormData({
                    trajanje: podatki.trajanje,
                    opomba: podatki.opomba,
                    datum: podatki.datum,
                });
            } catch (error) {
                setError('Napaka pri pridobivanju treninga');
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        naloziTrening();
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'trajanje' ? parseInt(value) : value,
        }));
    };

    const handlePosodobi = async () => {
        if (!id) return;
        try {
            const posodobljenTrening = await posodobiTrening(parseInt(id), formData);
            setTrening(posodobljenTrening);
            setIsEditing(false);
        } catch (error) {
            console.error('Napaka pri posodabljanju treninga:', error);
        }
    };

    const handleIzbrisi = async () => {
        if (!id) return;
        if (window.confirm('Ali ste prepričani, da želite izbrisati ta trening?')) {
            try {
                await izbrisiTrening(parseInt(id));
                navigate('/treningi');
            } catch (error) {
                console.error('Napaka pri brisanju treninga:', error);
            }
        }
    };

    if (isLoading) {
        return <div className="alert alert-info">Nalagam trening...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!trening) {
        return <div className="alert alert-warning">Trening ne obstaja</div>;
    }

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Podrobnosti treninga</h2>
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
                            <label>Trajanje (minute):</label>
                            <input
                                type="number"
                                className="form-control"
                                name="trajanje"
                                value={formData.trajanje || ''}
                                onChange={handleInputChange}
                                min="1"
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Datum:</label>
                            <input
                                type="date"
                                className="form-control"
                                name="datum"
                                value={formData.datum || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Opomba:</label>
                            <textarea
                                className="form-control"
                                name="opomba"
                                value={formData.opomba || ''}
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
                        <h5 className="card-title">
                            Trening {new Date(trening.datum).toLocaleDateString('sl-SI')}
                        </h5>
                        <p className="card-text">
                            <strong>Trajanje:</strong> {trening.trajanje} minut<br />
                            <strong>Vaje:</strong> {trening.vaje.map(v => v.naziv).join(', ')}
                        </p>
                        {trening.opomba && (
                            <p className="card-text">
                                <strong>Opomba:</strong> {trening.opomba}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TreningPodrobnosti;