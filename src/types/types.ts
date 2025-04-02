export interface Vaja {
    id: number;
    naziv: string;
    opis: string;
}

export interface Trening {
    id: number;
    trajanje: number; // v minutah
    opomba: string;
    datum: string; // ISO format datuma
    vajaIDs: number[];
}

export interface Uporabnik {
    id: number;
    ime: string;
    email: string;
}