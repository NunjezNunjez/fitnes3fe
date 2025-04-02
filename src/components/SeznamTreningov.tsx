import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { pridobiVseTreninge, izbrisiTrening } from '../services/api';
import { Trening } from '../types/types';

const SeznamTreningov: React.FC = () => {
    const [treningi, setTreningi] = useState<Trening[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const naloziTreninge = async () => {
            try {
                const podatki = await pridobiVseTreninge();
                setTreningi(podatki);
            } catch (error) {
                setError('Napaka pri pridobivanju treningov');
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        naloziTreninge();
    }, []);

    const handleIzbrisi = async (id: number) => {
        if (window.confirm('Ali ste prepričani, da želite izbrisati ta trening?')) {
            try {
                await izbrisiTrening(id);
                setTreningi(treningi.filter(t => t.id !== id));
            } catch (error) {
                console.error('Napaka pri brisanju treninga:', error);
            }
        }
    };

    if (isLoading) {
        return <div className="alert alert-info">Nalagam treninge...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className="container">
            <h2>Seznam treningov</h2>

            {treningi.length === 0 ? (
                <div className="alert alert-warning">Ni treningov</div>
            ) : (
                <div className="list-group">
                    {treningi.map((trening) => (
                        <div key={trening.id} className="list-group-item">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5>
                                        <Link to={`/treningi/${trening.id}`}>
                                            Trening {new Date(trening.datum).toLocaleDateString('sl-SI')}
                                        </Link>
                                    </h5>
                                    <p className="mb-1">
                                        <strong>Trajanje:</strong> {trening.trajanje} minut<br />
                                        <strong>Vaje:</strong> {trening.vaja && trening.vaja.length > 0
                                        ? trening.vaja.map((v: { naziv: any; }) => v.naziv).join(', ')
                                        : 'Ni določene vaje'}
                                    </p>

                                    {trening.opomba && (
                                        <p className="mb-1"><strong>Opomba:</strong> {trening.opomba}</p>
                                    )}
                                </div>
                                <button
                                    onClick={() => handleIzbrisi(trening.id)}
                                    className="btn btn-danger btn-sm"
                                >
                                    Izbriši
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SeznamTreningov;