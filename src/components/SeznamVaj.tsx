import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { pridobiVseVaje, izbrisiVajo } from '../services/api';
import { Vaja } from '../types/types';

const SeznamVaj: React.FC = () => {
    const [vaje, setVaje] = useState<Vaja[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const naloziVaje = async () => {
            try {
                const podatki = await pridobiVseVaje();
                setVaje(podatki);
            } catch (error) {
                setError('Napaka pri pridobivanju vaj');
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        naloziVaje();
    }, []);

    const handleIzbrisi = async (id: number) => {
        if (window.confirm('Ali ste prepričani, da želite izbrisati to vajo?')) {
            try {
                await izbrisiVajo(id);
                setVaje(vaje.filter(v => v.id !== id));
            } catch (error) {
                console.error('Napaka pri brisanju vaje:', error);
            }
        }
    };

    if (isLoading) {
        return <div className="alert alert-info">Nalagam vaje...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="container">
            <h2>Seznam vaj</h2>

            {vaje.length === 0 ? (
                <div className="alert alert-warning">Ni vaj</div>
            ) : (
                <div className="row">
                    {vaje.map((vaja) => (
                        <div key={vaja.id} className="col-md-4 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <Link to={`/vaje/${vaja.id}`}>{vaja.naziv}</Link>
                                    </h5>
                                    <p className="card-text">{vaja.opis.substring(0, 100)}...</p>
                                    <div className="d-flex justify-content-between">
                                        <Link
                                            to={`/vaje/${vaja.id}`}
                                            className="btn btn-primary btn-sm"
                                        >
                                            Podrobnosti
                                        </Link>
                                        <button
                                            onClick={() => handleIzbrisi(vaja.id)}
                                            className="btn btn-danger btn-sm"
                                        >
                                            Izbriši
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SeznamVaj;