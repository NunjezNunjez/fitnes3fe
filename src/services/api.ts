import axios from 'axios';
import { Vaja, Trening, Uporabnik } from '../types/types';

const API_URL = 'http://localhost:3001/api'; // Prilagodi glede na tvoj backend URL

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Vaje
export const pridobiVseVaje = async (): Promise<Vaja[]> => {
    const response = await api.get('/vaje');
    return response.data;
};

export const pridobiVajo = async (id: number): Promise<Vaja> => {
    const response = await api.get(`/vaje/${id}`);
    return response.data;
};

export const dodajVajo = async (vaja: Omit<Vaja, 'id'>): Promise<Vaja> => {
    const response = await api.post('/vaje', vaja);
    return response.data;
};

export const posodobiVajo = async (id: number, vaja: Partial<Vaja>): Promise<Vaja> => {
    const response = await api.put(`/vaje/${id}`, vaja);
    return response.data;
};

export const izbrisiVajo = async (id: number): Promise<void> => {
    await api.delete(`/vaje/${id}`);
};

// Treningi
export const pridobiVseTreninge = async (): Promise<Trening[]> => {
    const response = await api.get('/treningi');
    return response.data;
};

export const pridobiTrening = async (id: number): Promise<Trening> => {
    const response = await api.get(`/treningi/${id}`);
    return response.data;
};

export const dodajTrening = async (trening: Omit<Trening, 'id'>): Promise<Trening> => {
    const response = await api.post('/treningi', trening);
    return response.data;
};

export const posodobiTrening = async (id: number, trening: Partial<Trening>): Promise<Trening> => {
    const response = await api.put(`/treningi/${id}`, trening);
    return response.data;
};

export const izbrisiTrening = async (id: number): Promise<void> => {
    await api.delete(`/treningi/${id}`);
};

// Uporabniki
export const pridobiUporabnike = async (): Promise<Uporabnik[]> => {
    const response = await api.get('/uporabniki');
    return response.data;
};