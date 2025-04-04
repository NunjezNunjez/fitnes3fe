import axios from 'axios';
import { Vaja, Trening, Uporabnik } from '../types/types';

const API_URL = 'http://localhost:3000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

//interceptor za dodajanje JWT tokena
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Vaje
export const pridobiVseVaje = async (): Promise<Vaja[]> => {
    const response = await api.get('/vaja');
    return response.data;
};

export const pridobiVajo = async (id: number): Promise<Vaja> => {
    const response = await api.get(`/vaja/${id}`);
    return response.data;
};

export const dodajVajo = async (vaja: Omit<Vaja, 'id'>): Promise<Vaja> => {
    const response = await api.post('/vaja', vaja);
    return response.data;
};

export const posodobiVajo = async (id: number, vaja: Partial<Vaja>): Promise<Vaja> => {
    const response = await api.put(`/vaja/${id}`, vaja);
    return response.data;
};

export const izbrisiVajo = async (id: number): Promise<void> => {
    await api.delete(`/vaja/${id}`);
};

// Treningi
export const pridobiVseTreninge = async (): Promise<Trening[]> => {
    const response = await api.get('/trening');
    return response.data;
};

export const pridobiTrening = async (id: number): Promise<Trening> => {
    const response = await api.get(`/trening/${id}`);
    return response.data;
};

export const dodajTrening = async (trening: Omit<Trening, 'id'>): Promise<Trening> => {
    const response = await api.post('/trening', trening);
    return response.data;
};

export const posodobiTrening = async (id: number, trening: Partial<Trening>): Promise<Trening> => {
    const response = await api.put(`/trening/${id}`, trening);
    return response.data;
};

export const izbrisiTrening = async (id: number): Promise<void> => {
    await api.delete(`/trening/${id}`);
};

// Uporabniki
export const pridobiUporabnike = async (): Promise<Uporabnik[]> => {
    const response = await api.get('/uporabniki');
    return response.data;
};