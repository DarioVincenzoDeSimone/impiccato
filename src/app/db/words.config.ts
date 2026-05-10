export interface WordCategory {
    name: string;
    words: string[];
}

export const WORD_CATEGORIES: WordCategory[] = [
    { name: 'Animali', words: ['LEONE', 'ELEFANTE', 'GIRAFFA', 'CANE', 'GATTO', 'TIGRE', 'SCIMMIA', 'PANDA', 'CONIGLIO', 'LUCERTOLA', 'RANOCCHIA', 'ORSO', 'LUPO', 'VOLPE', 'SERPENTE', 'UCCELLINO', 'COCCODRILLO', 'PULCINO', 'GALLINA', 'MUCCA'] },
    { name: 'Lavori', words: ['DOTTORE', 'MAESTRA', 'POMPIERE', 'POLIZIOTTO', 'PITTORE', 'CUOCO', 'DENTISTA', 'ASTRONAUTA', 'PILOTA', 'VIGILE', 'PANETTIERE', 'FALEGNAME', 'VETERINARIO', 'GIARDINIERE', 'BALLERINA'] },
    { name: 'Cose del Mare', words: ['PESCE', 'CONCHIGLIA', 'BARCA', 'SABBIA', 'BALENA', 'POLPO', 'DELFINO', 'STELLA', 'GRANCHIO', 'ONDA', 'SCOGLIO', 'SPIAGGIA', 'ISOLA', 'FARO', 'SALVAGENTE'] },
    { name: 'Frutta', words: ['MELA', 'BANANA', 'PERA', 'FRAGOLA', 'CILIEGIA', 'LIMONE', 'ARANCIA', 'PESCA', 'ALBICOCCA', 'UVA', 'KIWI', 'MELONE', 'COCOMERO', 'LAMPONE', 'MIRTILLO'] },
    { name: 'Scuola', words: ['ZAINO', 'MATITA', 'ASTUCCIO', 'QUADERNO', 'LIBRO', 'BANCO', 'PAGINA', 'GOMMA', 'RIGHELLO', 'PENNA', 'CANCELLO', 'CLASSE', 'MAESTRO', 'COMPITI', 'DISEGNO'] },
    { name: 'Colori', words: ['ROSSO', 'BLU', 'GIALLO', 'VERDE', 'ARANCIONE', 'VIOLA', 'ROSA', 'MARRONE', 'NERO', 'BIANCO', 'AZZURRO', 'GRIGIO'] },
    { name: 'Trasporti', words: ['AUTO', 'TRENO', 'AEREO', 'BICI', 'NAVE', 'BUS', 'MOTO', 'CAMION', 'RUSPA', 'TRATTORE', 'ELICOTTERO', 'AMBULANZA', 'RAZZO', 'BARCA', 'TRAM'] },
    { name: 'Corpo', words: ['TESTA', 'MANO', 'PIEDE', 'OCCHIO', 'BOCCA', 'NASO', 'ORECCHIO', 'BRACCIO', 'GAMBA', 'DITO', 'LINGUA', 'DENTE', 'COLLO', 'SPALLA', 'GINOCCHIO'] },
    { name: 'Casa', words: ['LETTO', 'SEDIA', 'TAVOLO', 'PORTA', 'FINESTRA', 'CUCINA', 'BAGNO', 'DIVANO', 'LAMPADA', 'TETTO', 'CAMINO', 'GIARDINO', 'STANZA', 'CHIAVE', 'SCALE'] },
    { name: 'Natura', words: ['FIORE', 'ALBERO', 'PRATO', 'SOLE', 'LUNA', 'STELLA', 'NUVOLA', 'PIOGGIA', 'MONTAGNA', 'FIUME', 'BOSCO', 'FOGLIA', 'VENTO', 'NEVE', 'TERRA'] }
];