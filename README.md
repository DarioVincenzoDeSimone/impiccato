# 🎮 Gioco dell'Impiccato per Bambini

Un divertente e colorato gioco dell'Impiccato progettato specificamente per bambini dai 5 ai 10 anni. Impara nuove parole giocando con una grafica accattivante e animazioni simpatiche!

![Screenshot del gioco](https://raw.githubusercontent.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6)

## ✨ Caratteristiche

- **Vocabolario Curato**: Centinaia di parole comuni divise in categorie (Animali, Frutta, Scuola, Colori, ecc.) adatte alla fascia d'età.
- **Design Full-Screen**: Ottimizzato per occupare l'intera viewport senza fastidiosi scroll, ideale per tablet e mobile.
- **Layout Adattivo**: Le parole lunghe si rimpiccioliscono automaticamente per entrare sempre nello schermo.
- **Grafica Premium**: Colori vivaci, icone Material Design e un'interfaccia "morbida" e giocosa.
- **Zoneless Angular**: Utilizza le ultime tecnologie Angular per prestazioni al top.

## 🚀 Come avviare il progetto in locale

1. **Clona il repository**:
   ```bash
   git clone https://github.com/tuo-utente/impiccato.git
   cd impiccato
   ```

2. **Installa le dipendenze**:
   ```bash
   npm install
   ```

3. **Avvia il server di sviluppo**:
   ```bash
   npm run dev
   ```
   L'app sarà disponibile all'indirizzo `http://localhost:4200`.

## 📦 Build e Deployment

### Compilazione per la produzione
Per generare i file pronti per il deployment:
```bash
npm run build
```
I file verranno creati nella cartella `dist/app/browser`.

### Hosting su GitHub Pages
Sì, il progetto può funzionare perfettamente su **GitHub Pages**! 

Poiché GitHub Pages è un servizio di hosting statico, non supporta l'SSR (Server-Side Rendering) dinamico. Tuttavia, essendo questo un gioco basato su logica client-side, puoi fare il deploy della versione "browser" statica:

1. Esegui la build specificando la `base-href` (necessaria se l'URL non è un dominio personalizzato):
   ```bash
   npx ng build --base-href /nome-tuo-repo/
   ```
2. Carica il contenuto di `dist/app/browser` sul branch `gh-pages` o nella cartella `docs`.

> [!TIP]
> Se desideri automatizzare il processo, ti consiglio di usare l'azione GitHub `angular-cli-ghpages`.

## 🛠️ Tecnologie utilizzate

- **Angular 19+** (Standalone Components, Signals)
- **Tailwind CSS 4** (per lo stile e il layout)
- **Google Fonts** (Outfit/Inter per la leggibilità)
- **Material Icons** (per il feedback visivo)
