export interface Rit{
    ritnummer: number,
    naam: string,
    vertrek: string,
    finish: "Ronny" | "Schuur" | "Grubbe" | "Tomme" | "BosBerg" | "Bertembos" | "Ziptstraat" | "Botanica" | "Citadel" | "Sigarenberg" | "Niet standaard"
    afstand: number,
    hoogtemeters: number,
    gpx?: string,
    thumbnail?: string
}