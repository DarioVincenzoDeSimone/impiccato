export interface Word {
    word: string;
    hint: string;
}

export interface WordCategory {
    name: string;
    words: Word[];
}

export const WORD_CATEGORIES: WordCategory[] = [
    {
        name: 'Animali',
        words: [
            { word: 'LEONE', hint: 'Il re della foresta con una grande criniera.' },
            { word: 'ELEFANTE', hint: 'Un animale enorme con una lunga proboscide.' },
            { word: 'GIRAFFA', hint: 'Ha il collo lunghissimo per mangiare le foglie più alte.' },
            { word: 'CANE', hint: 'Il migliore amico dell\'uomo, abbaia.' },
            { word: 'GATTO', hint: 'Un piccolo felino che fa le fusa e miagola.' },
            { word: 'TIGRE', hint: 'Un grosso felino a strisce arancioni e nere.' },
            { word: 'SCIMMIA', hint: 'Un animale dispettoso che salta da un albero all\'altro.' },
            { word: 'PANDA', hint: 'Un orso bianco e nero che mangia il bambù.' },
            { word: 'CONIGLIO', hint: 'Ha orecchie lunghe e mangia le carote.' },
            { word: 'LUCERTOLA', hint: 'Un piccolo rettile verde che corre sui muri e perde la coda.' },
            { word: 'RANOCCHIA', hint: 'Salta negli stagni e fa cra cra.' },
            { word: 'ORSO', hint: 'Un animale grande e peloso che va in letargo d\'inverno.' },
            { word: 'LUPO', hint: 'Assomiglia a un cane e ulula alla luna.' },
            { word: 'VOLPE', hint: 'Un animale rosso e molto furbo.' },
            { word: 'SERPENTE', hint: 'Un rettile senza zampe che striscia per terra.' },
            { word: 'UCCELLINO', hint: 'Un piccolo animale con le piume che vola e cinguetta.' },
            { word: 'COCCODRILLO', hint: 'Un grosso rettile verde con una grande bocca piena di denti, vive nell\'acqua.' },
            { word: 'PULCINO', hint: 'Il piccolo della gallina, è giallo e fa pio pio.' },
            { word: 'GALLINA', hint: 'Un uccello della fattoria che fa le uova.' },
            { word: 'MUCCA', hint: 'Animale da fattoria che ci dà il latte e fa muuu.' },
            { word: 'CAVALLO', hint: 'Animale da sella che trotta e galoppa.' },
            { word: 'MAIALE', hint: 'Animale rosa della fattoria che ha il naso rotondo e grugnisce.' },
            { word: 'TARTARUGA', hint: 'Un animale molto lento che porta la sua casa sulla schiena.' },
            { word: 'PIPISTRELLO', hint: 'Un mammifero che vola di notte e dorme a testa in giù.' },
            { word: 'AQUILA', hint: 'Un grande uccello rapace che vola molto in alto.' }
        ]
    },
    {
        name: 'Lavori',
        words: [
            { word: 'DOTTORE', hint: 'Cura le persone quando sono malate.' },
            { word: 'MAESTRA', hint: 'Insegna ai bambini a scuola.' },
            { word: 'POMPIERE', hint: 'Spegne gli incendi e salva le persone in pericolo con il camion rosso.' },
            { word: 'POLIZIOTTO', hint: 'Arresta i cattivi e dirige il traffico.' },
            { word: 'PITTORE', hint: 'Usa i colori e i pennelli per fare dei quadri o dipingere i muri.' },
            { word: 'CUOCO', hint: 'Prepara cibi deliziosi in cucina.' },
            { word: 'DENTISTA', hint: 'Cura i nostri denti per mantenerli sani.' },
            { word: 'ASTRONAUTA', hint: 'Viaggia nello spazio con un razzo per esplorare le stelle.' },
            { word: 'PILOTA', hint: 'Guida l\'aereo nel cielo per far viaggiare le persone.' },
            { word: 'VIGILE', hint: 'Controlla il traffico e fa le multe a chi parcheggia male.' },
            { word: 'PANETTIERE', hint: 'Prepara il pane fresco ogni mattina.' },
            { word: 'FALEGNAME', hint: 'Lavora il legno per fare mobili come tavoli e sedie.' },
            { word: 'VETERINARIO', hint: 'Il dottore che cura gli animali.' },
            { word: 'GIARDINIERE', hint: 'Cura le piante, i fiori e taglia l\'erba del prato.' },
            { word: 'BALLERINA', hint: 'Balla con grazia sulle punte o a ritmo di musica.' },
            { word: 'CANTANTE', hint: 'Usa la sua voce e il microfono per fare musica.' },
            { word: 'CONTADINO', hint: 'Lavora la terra e coltiva frutta e verdura.' },
            { word: 'MURATORE', hint: 'Costruisce le case mettendo i mattoni uno sopra l\'altro.' },
            { word: 'BARBIERE', hint: 'Taglia i capelli e fa la barba agli uomini.' },
            { word: 'MECCANICO', hint: 'Aggiusta le automobili quando si rompono.' }
        ]
    },
    {
        name: 'Cose del Mare',
        words: [
            { word: 'PESCE', hint: 'Nuota nell\'acqua e respira con le branchie.' },
            { word: 'CONCHIGLIA', hint: 'Un guscio colorato che puoi trovare sulla sabbia, se ci metti l\'orecchio senti il mare.' },
            { word: 'BARCA', hint: 'Serve per navigare sull\'acqua.' },
            { word: 'SABBIA', hint: 'Quella fine e gialla dove puoi costruire i castelli in spiaggia.' },
            { word: 'BALENA', hint: 'Il mammifero marino più grande del mondo che spruzza acqua dalla testa.' },
            { word: 'POLPO', hint: 'Un animale marino molto intelligente che ha otto tentacoli.' },
            { word: 'DELFINO', hint: 'Un animale marino simpatico e giocherellone che salta fuori dall\'acqua.' },
            { word: 'STELLA', hint: 'In cielo brilla, ma nel mare ha cinque punte e si chiama marina.' },
            { word: 'GRANCHIO', hint: 'Ha due chele per pizzicare e cammina di lato.' },
            { word: 'ONDA', hint: 'Il movimento dell\'acqua del mare che si infrange sulla riva e dove puoi fare surf.' },
            { word: 'SCOGLIO', hint: 'Un grande sasso vicino alla riva o in mezzo al mare dove si aggrappano i granchi.' },
            { word: 'SPIAGGIA', hint: 'Il posto con la sabbia o i sassi dove andiamo a prendere il sole al mare.' },
            { word: 'ISOLA', hint: 'Un pezzo di terra circondato dall\'acqua da tutte le parti.' },
            { word: 'FARO', hint: 'Una torre alta con una luce in cima che aiuta le navi a non sbattere di notte.' },
            { word: 'SALVAGENTE', hint: 'È a forma di ciambella e ti aiuta a non affondare quando nuoti.' },
            { word: 'SOTTOMARINO', hint: 'Una nave speciale che viaggia sotto l\'acqua.' },
            { word: 'CORALLO', hint: 'Piante marine colorate e dure che formano la barriera.' },
            { word: 'GABBIANO', hint: 'Un uccello bianco e grigio che vola vicino al mare e mangia i pesci.' },
            { word: 'OMBRELLONE', hint: 'Lo apriamo in spiaggia per farci ombra quando fa molto caldo.' },
            { word: 'MEDUSA', hint: 'Un animale marino trasparente che se ti tocca brucia.' }
        ]
    },
    {
        name: 'Frutta',
        words: [
            { word: 'MELA', hint: 'Un frutto rotondo, può essere rossa, gialla o verde e tiene lontano il medico.' },
            { word: 'BANANA', hint: 'Un frutto giallo e lungo che piace molto alle scimmie.' },
            { word: 'PERA', hint: 'Un frutto verde o giallo con la forma a campana, molto dolce.' },
            { word: 'FRAGOLA', hint: 'Un piccolo frutto rosso a forma di cuore con tanti piccoli puntini neri fuori.' },
            { word: 'CILIEGIA', hint: 'Piccoli frutti rossi e rotondi che si mangiano a coppie, una tira l\'altra.' },
            { word: 'LIMONE', hint: 'Un agrume giallo dal sapore molto aspro.' },
            { word: 'ARANCIA', hint: 'Un agrume rotondo e succoso, dello stesso colore del suo nome.' },
            { word: 'PESCA', hint: 'Un frutto dolce e succoso con la buccia un po\' pelosa.' },
            { word: 'ALBICOCCA', hint: 'Simile alla pesca ma più piccola e dal colore arancione chiaro, ha un grosso nocciolo.' },
            { word: 'UVA', hint: 'Tanti piccoli chicchi attaccati a un grappolo, da cui si fa anche il vino.' },
            { word: 'KIWI', hint: 'Fuori è marrone e peloso, ma dentro è verde con semini neri.' },
            { word: 'MELONE', hint: 'Un frutto estivo molto grande, fuori rugoso e dentro arancione o bianco, dolcissimo.' },
            { word: 'COCOMERO', hint: 'Il frutto più grande dell\'estate, verde fuori e rosso e dissetante dentro con semi neri.' },
            { word: 'LAMPONE', hint: 'Un piccolo frutto di bosco rosso e morbido, un po\' aspro.' },
            { word: 'MIRTILLO', hint: 'Un piccolissimo frutto di bosco rotondo e blu scuro, fa bene alla vista.' },
            { word: 'MANDARINO', hint: 'Un agrume arancione, più piccolo e dolce dell\'arancia, si sbuccia facilmente.' },
            { word: 'PRUGNA', hint: 'Un frutto estivo che può essere viola o giallo, con un nocciolo al centro.' },
            { word: 'FICO', hint: 'Un frutto molto dolce, a forma di goccia, verde o viola, con tanti semini dentro.' },
            { word: 'ANANAS', hint: 'Un frutto tropicale grande, con un ciuffo di foglie dure in testa e la buccia a squame.' },
            { word: 'CILIEGIA', hint: 'Un frutto rosso, piccolo, spesso attaccato a due a due.' }
        ]
    },
    {
        name: 'Scuola',
        words: [
            { word: 'ZAINO', hint: 'La borsa che metti sulle spalle per portare i libri e i quaderni.' },
            { word: 'MATITA', hint: 'Serve per scrivere e disegnare, si può cancellare e quando si consuma devi temperarla.' },
            { word: 'ASTUCCIO', hint: 'Il contenitore dove metti penne, matite e colori per portarli a scuola.' },
            { word: 'QUADERNO', hint: 'Un libretto con pagine a righe o quadretti dove scrivi gli appunti e fai i compiti.' },
            { word: 'LIBRO', hint: 'Ha tante pagine con storie da leggere o cose nuove da imparare.' },
            { word: 'BANCO', hint: 'Il tavolo dove ti siedi in classe per studiare.' },
            { word: 'PAGINA', hint: 'Il foglio di un libro o di un quaderno.' },
            { word: 'GOMMA', hint: 'Ti serve per cancellare gli errori fatti con la matita.' },
            { word: 'RIGHELLO', hint: 'Un oggetto di plastica o legno che serve per tirare le linee dritte e misurare.' },
            { word: 'PENNA', hint: 'Scrive con l\'inchiostro blu, nero o rosso e di solito non si può cancellare.' },
            { word: 'CANCELLO', hint: 'L\'entrata principale del cortile della scuola.' },
            { word: 'CLASSE', hint: 'L\'aula dove tu e i tuoi compagni fate lezione con la maestra.' },
            { word: 'MAESTRO', hint: 'L\'insegnante uomo che ti aiuta a imparare a scuola.' },
            { word: 'COMPITI', hint: 'Gli esercizi e le letture che la maestra ti dà da fare a casa per allenarti.' },
            { word: 'DISEGNO', hint: 'Un quadro o un\'immagine fatta da te con matite o pennarelli su un foglio.' },
            { word: 'LAVAGNA', hint: 'Il pannello grande nero o bianco dove la maestra scrive le spiegazioni per tutta la classe.' },
            { word: 'GESSO', hint: 'Un bastoncino bianco o colorato che serve per scrivere sulla lavagna nera.' },
            { word: 'TEMPERINO', hint: 'Lo usi quando la punta della matita o dei pastelli si rompe.' },
            { word: 'COLLA', hint: 'Un liquido o uno stick che serve per attaccare pezzi di carta insieme.' },
            { word: 'FORBICI', hint: 'Hanno due lame e servono per tagliare la carta in modo preciso.' }
        ]
    },
    {
        name: 'Colori',
        words: [
            { word: 'ROSSO', hint: 'Il colore del sangue, delle fragole, dei camion dei pompieri e dei cuori.' },
            { word: 'BLU', hint: 'Il colore del mare profondo e del cielo scuro di sera, come i puffi.' },
            { word: 'GIALLO', hint: 'Il colore del sole, dei limoni e dei pulcini appena nati.' },
            { word: 'VERDE', hint: 'Il colore dell\'erba, delle foglie degli alberi in primavera e delle rane.' },
            { word: 'ARANCIONE', hint: 'Il colore dell\'arancia, delle carote e delle zucche di Halloween.' },
            { word: 'VIOLA', hint: 'Il colore delle melanzane, dei fiori che si chiamano violette e dell\'uva.' },
            { word: 'ROSA', hint: 'Il colore dei maialini, dei fenicotteri e dei fiori di pesco.' },
            { word: 'MARRONE', hint: 'Il colore della cioccolata, del tronco degli alberi e degli orsi.' },
            { word: 'NERO', hint: 'Il colore della notte buia, del carbone e del pelo delle pantere.' },
            { word: 'BIANCO', hint: 'Il colore della neve, del latte e delle nuvole quando fa bel tempo.' },
            { word: 'AZZURRO', hint: 'Il colore del cielo limpido di giorno, come gli occhi chiari.' },
            { word: 'GRIGIO', hint: 'Il colore dei topi, degli elefanti e delle nuvole quando sta per piovere.' },
            { word: 'ARGENTO', hint: 'Il colore grigio lucente di alcune medaglie e delle stelle.' },
            { word: 'ORO', hint: 'Il colore giallo scintillante della medaglia del primo classificato o delle corone.' },
            { word: 'BEIGE', hint: 'Un colore molto chiaro, come la sabbia asciutta.' }
        ]
    },
    {
        name: 'Trasporti',
        words: [
            { word: 'AUTO', hint: 'Un mezzo a quattro ruote che ha un motore e serve per viaggiare sulla strada.' },
            { word: 'TRENO', hint: 'È formato da tanti vagoni, viaggia sui binari e fa ciuf ciuf.' },
            { word: 'AEREO', hint: 'Vola in alto nel cielo tra le nuvole e ha le ali come un grande uccello di metallo.' },
            { word: 'BICI', hint: 'Ha due ruote, dei pedali e per farla andare devi pedalare, non ha il motore.' },
            { word: 'NAVE', hint: 'Un mezzo di trasporto molto grande che viaggia sull\'acqua del mare.' },
            { word: 'BUS', hint: 'Un mezzo grande che può portare tante persone a scuola o in giro per la città.' },
            { word: 'MOTO', hint: 'Ha due ruote come la bicicletta, ma ha il motore ed è più veloce.' },
            { word: 'CAMION', hint: 'Un veicolo grande usato per trasportare merci pesanti o terra.' },
            { word: 'RUSPA', hint: 'Un mezzo grande giallo con una grossa pala per scavare la terra nei cantieri.' },
            { word: 'TRATTORE', hint: 'Lo guida il contadino nei campi per lavorare la terra, ha le ruote dietro grandissime.' },
            { word: 'ELICOTTERO', hint: 'Vola in cielo non con le ali, ma grazie a una grande elica che gira sopra di esso.' },
            { word: 'AMBULANZA', hint: 'Un furgone bianco con una sirena che corre per portare i malati all\'ospedale.' },
            { word: 'RAZZO', hint: 'Una navicella super veloce che lancia gli astronauti nello spazio.' },
            { word: 'TRAM', hint: 'Simile a un autobus, ma viaggia sui binari in mezzo alle strade della città.' },
            { word: 'MONOPATTINO', hint: 'Una pedana con due ruote piccole e un manubrio per spingersi con un piede.' },
            { word: 'TRAGHETTO', hint: 'Una grande barca che trasporta le persone e le automobili da una riva all\'altra.' },
            { word: 'FUNIVIA', hint: 'Una cabina appesa a un cavo che ti porta in cima alle montagne.' },
            { word: 'MONGOLFIERA', hint: 'Un enorme pallone pieno di aria calda che vola nel cielo con un cesto sotto.' },
            { word: 'SLITTA', hint: 'Quella di Babbo Natale è trainata dalle renne sulla neve.' },
            { word: 'METROPOLITANA', hint: 'Un treno veloce che viaggia sotto le strade della città.' }
        ]
    },
    {
        name: 'Corpo',
        words: [
            { word: 'TESTA', hint: 'La parte più in alto del corpo dove si trovano il cervello, la faccia e i capelli.' },
            { word: 'MANO', hint: 'La usiamo per afferrare le cose, scrivere e salutare, alla fine ha cinque dita.' },
            { word: 'PIEDE', hint: 'Ci serve per camminare, correre e calciare il pallone, ne abbiamo due.' },
            { word: 'OCCHIO', hint: 'L\'organo che ci permette di vedere i colori, ne abbiamo due sulla faccia.' },
            { word: 'BOCCA', hint: 'La usiamo per parlare, sorridere, mangiare e dare i baci.' },
            { word: 'NASO', hint: 'Serve per respirare e per sentire il profumo dei fiori o della torta.' },
            { word: 'ORECCHIO', hint: 'Ne abbiamo uno per lato della testa e ci servono per sentire i suoni e la musica.' },
            { word: 'BRACCIO', hint: 'Collega la spalla alla mano e ci permette di abbracciare.' },
            { word: 'GAMBA', hint: 'Ci permette di stare in piedi, camminare e correre, ne abbiamo due.' },
            { word: 'DITO', hint: 'Ne abbiamo cinque su ogni mano e cinque su ogni piede.' },
            { word: 'LINGUA', hint: 'È dentro la bocca, è rosa e ci serve per assaggiare i sapori e per parlare bene.' },
            { word: 'DENTE', hint: 'Li abbiamo bianchi dentro la bocca per masticare il cibo.' },
            { word: 'COLLO', hint: 'Sostiene la testa e la collega al resto del corpo.' },
            { word: 'SPALLA', hint: 'La parte del corpo dove appoggi le cinghie dello zaino.' },
            { word: 'GINOCCHIO', hint: 'Lo snodo a metà della gamba che ci permette di piegarla.' },
            { word: 'SCHIENA', hint: 'La parte dietro del corpo, dalla nuca fino in fondo.' },
            { word: 'PANCIA', hint: 'La parte davanti del corpo dove va a finire il cibo che mangiamo e dove si trova l\'ombelico.' },
            { word: 'CAPELLI', hint: 'Crescono sulla testa, possono essere biondi, castani, neri o rossi, corti o lunghi.' },
            { word: 'CUORE', hint: 'L\'organo che batte dentro il petto, simbolo dell\'amore.' },
            { word: 'GOMITO', hint: 'Lo snodo a metà del braccio che ci permette di piegarlo.' }
        ]
    },
    {
        name: 'Casa',
        words: [
            { word: 'LETTO', hint: 'Il mobile morbido dove andiamo a dormire di notte.' },
            { word: 'SEDIA', hint: 'Un mobile con quattro gambe e uno schienale che serve per sedersi a tavola.' },
            { word: 'TAVOLO', hint: 'Un piano grande con quattro gambe su cui mangiamo o facciamo i compiti.' },
            { word: 'PORTA', hint: 'Si apre per entrare in una stanza o uscire di casa e si chiude per non far entrare gli altri.' },
            { word: 'FINESTRA', hint: 'L\'apertura nel muro con il vetro per far entrare la luce e guardare fuori.' },
            { word: 'CUCINA', hint: 'La stanza della casa dove la mamma o il papà preparano da mangiare.' },
            { word: 'BAGNO', hint: 'La stanza dove ti lavi le mani, fai la doccia o usi il water.' },
            { word: 'DIVANO', hint: 'Un mobile molto comodo del salotto dove ci si siede o sdraia per guardare la TV.' },
            { word: 'LAMPADA', hint: 'Un oggetto che si accende con l\'interruttore per fare luce nella stanza quando è buio.' },
            { word: 'TETTO', hint: 'La parte più alta della casa che la copre e ripara dalla pioggia.' },
            { word: 'CAMINO', hint: 'Il posto in salotto dove in inverno si accende il fuoco per riscaldarsi.' },
            { word: 'GIARDINO', hint: 'Lo spazio fuori casa con l\'erba, i fiori, gli alberi e magari un\'altalena.' },
            { word: 'STANZA', hint: 'Una delle parti chiuse in cui è divisa la casa, ad esempio la camera da letto.' },
            { word: 'CHIAVE', hint: 'Il pezzo di metallo che si infila nella serratura per aprire e chiudere la porta a chiave.' },
            { word: 'SCALE', hint: 'I gradini che si salgono e si scendono per andare da un piano all\'altro della casa.' },
            { word: 'ARMADIO', hint: 'Il grande mobile chiuso dove si ripongono i vestiti appendendoli o piegandoli.' },
            { word: 'TAPPETO', hint: 'Un tessuto spesso e decorato che si mette sul pavimento del salotto o della camera.' },
            { word: 'SPECCHIO', hint: 'Un vetro speciale appeso al muro dove puoi guardare la tua immagine riflessa.' },
            { word: 'TELEVISORE', hint: 'Lo schermo nel salotto per guardare i cartoni animati o i film.' },
            { word: 'FRIGORIFERO', hint: 'L\'elettrodomestico in cucina che fa molto freddo e serve a conservare il cibo.' }
        ]
    },
    {
        name: 'Natura',
        words: [
            { word: 'FIORE', hint: 'Cresce nel prato o nei vasi, ha petali colorati e profuma tanto.' },
            { word: 'ALBERO', hint: 'Ha un tronco di legno e tante foglie verdi sui rami.' },
            { word: 'PRATO', hint: 'Un grande spazio di terra coperto di erba verde.' },
            { word: 'SOLE', hint: 'La grande stella luminosa e gialla che ci scalda e fa luce di giorno.' },
            { word: 'LUNA', hint: 'Brilla nel cielo di notte, a volte è tutta tonda e a volte sembra una falce.' },
            { word: 'STELLA', hint: 'I tanti piccoli puntini luminosi che brillano in cielo la notte vicino alla luna.' },
            { word: 'NUVOLA', hint: 'Sono bianche, morbide come panna e stanno in cielo. Quando sono grigie portano pioggia.' },
            { word: 'PIOGGIA', hint: 'L\'acqua che cade a gocce dal cielo dalle nuvole grigie.' },
            { word: 'MONTAGNA', hint: 'Una parte di terra altissima che spesso ha la cima coperta di neve e i boschi in basso.' },
            { word: 'FIUME', hint: 'Un corso d\'acqua lungo che scorre verso il mare.' },
            { word: 'BOSCO', hint: 'Un posto pieno di alberi dove vivono orsi, lupi e uccellini.' },
            { word: 'FOGLIA', hint: 'Cresce sui rami dell\'albero: d\'estate è verde, in autunno diventa gialla o rossa e poi cade.' },
            { word: 'VENTO', hint: 'L\'aria che si muove veloce e fa volare le foglie, soffiare gli alberi o volare gli aquiloni.' },
            { word: 'NEVE', hint: 'Cade d\'inverno al posto della pioggia, è fredda, bianca e soffice e ci fai i pupazzi.' },
            { word: 'TERRA', hint: 'La polvere marrone del suolo dove si piantano i semi e crescono le piante, oppure il nome del nostro pianeta.' },
            { word: 'SASSI', hint: 'Piccoli pezzi di roccia duri che si trovano per terra, nel fiume o in spiaggia.' },
            { word: 'LAGO', hint: 'Un grande bacino d\'acqua dolce circondato dalla terra.' },
            { word: 'CASCATA', hint: 'Quando l\'acqua di un fiume fa un salto e cade giù per molti metri scrosciando.' },
            { word: 'VULCANO', hint: 'Una montagna speciale da cui può uscire fuoco, lava e fumo.' },
            { word: 'ARCOBALENO', hint: 'Il ponte di sette colori che compare in cielo quando smette di piovere e torna il sole.' }
        ]
    }
];