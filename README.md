# StayFit - Custom Fitness, Simplified.

<img src="./stayfit-app/src/assets/misc/STAYFit(transparent).png" alt="StayFit png transparent" width="300rem">

## Indice
- [Introduzione](#introduzione)
- [Linguaggi consentiti](#linguaggi-consentiti)
- [Struttura del Progetto](#struttura-del-progetto)
- [Membri del Team](#membri-del-team)
- [Assegnazione dei compiti](#assegnazione-dei-compiti)
- [Collaborazione](#collaborazione)
- [Comunicazione](#comunicazione)
- [Scadenza](#scadenza)
- [Installazione e Avvio](#installazione-e-avvio)
- [Uso della Web App](#uso-della-web-app)
  - [Registrazione e Abbonamento](#registrazione-e-abbonamento)
  - [Inserimento Dati del Cliente](#inserimento-dati-del-cliente)
  - [Questionario](#questionario)
  - [Piani Personalizzati](#piani-personalizzati)
  - [Gestione dell'Abbonamento](#gestione-dellabbonamento)
- [Disclaimer](#disclaimer)

## Introduzione
StayFit è una web app rivolta a professionisti nutrizionisti e personal trainer, pensata per il mondo del remote work. La piattaforma mira a combattere la crescente tendenza di utilizzare schede alimentari e di allenamento predefinite, offrendo invece un supporto personalizzato per ogni cliente. Gli utenti, una volta registrati e indicata la propria area di lavoro, possono fornire un questionario ai loro clienti per raccogliere informazioni dettagliate (allergie, problemi motori, ecc.), creando così piani di allenamento e alimentazione personalizzati. StayFit aiuta i professionisti a dimezzare il tempo di lavoro, offrendo un servizio vantaggioso e basato su abbonamento.

## Linguaggi consentiti
- **HTML:** Per la struttura delle pagine web.
- **CSS:** Per lo stile e il layout delle pagine.
- **JavaScript:** Per la funzionalità dinamica delle pagine.
- **React:** Per la costruzione dell'interfaccia utente.
- **Tailwind CSS:** Per uno sviluppo CSS rapido e personalizzato.
- **Vite:** Per il build setup.

## Struttura del Progetto
Il progetto è organizzato come segue:

```plaintext
/
├── public/                   # File pubblici
│   └── index.html            # Template HTML principale
├── src/
│   ├── assets/               # Immagini, icone ed elementi locali
│   ├── components/           # Componenti React riutilizzabili
│   ├── pages/                # Pagine React
│   ├── App.jsx               # Componente principale React
│   ├── main.jsx              # Punto di ingresso dell'applicazione
│   └── styles/               # File CSS/Tailwind
│       └── index.css         # File CSS principale
├── .gitignore                # File per ignorare file e directory specifici in Git
├── package.json              # File di configurazione npm
├── postcss.config.js         # Configurazione per PostCSS
├── tailwind.config.js        # Configurazione per Tailwind CSS
├── vite.config.js            # Configurazione per Vite
└── README.md                 # Documentazione del progetto
```

## Membri del Team
- [Mario Sica](https://github.com/mario-sica)
- [Giovanni Vitolo](url)
- [Luigi Cavalli](https://github.com/luigicavalli)
- [Maurilio Valenti](url)
- [Nunzia Biele](https://github.com/Akame96)
- [Lorenzo de Vita](https://github.com/DEVita42)
- [Samuele Berti](url)

### Assegnazione dei compiti
Ogni membro del team sarà assegnato a specifiche parti del progetto, incluse l'implementazione del frontend, la gestione del backend, il design dell'interfaccia utente, la configurazione del database e la scrittura di test unitari e funzionali.

### Collaborazione
Utilizziamo GitHub per gestire le versioni del codice e assicurarci che tutti i membri del team siano aggiornati sui progressi del progetto. Per gestire gli sprint e coordinare le attività, utilizziamo Trello, dove possiamo creare schede per ogni attività, assegnare compiti e monitorare lo stato di avanzamento.

### Comunicazione
Mantenere una comunicazione costante è fondamentale. Effettuiamo riunioni regolari e aggiornamenti di stato per garantire che tutti i membri del team siano allineati e per risolvere eventuali problemi rapidamente.

### Scadenza
Il progetto è iniziato il 19 luglio e deve essere completato entro il 20 settembre. Sarà possibile effettuare bug fix fino e non oltre il 27 settembre. Pianificate attentamente il lavoro e rispettate le scadenze per ciascuna fase del progetto.

## Installazione e Avvio
Per configurare e avviare il progetto localmente, seguire i passaggi:

1. **Clonare il repository:**
    ```bash
    git clone https://github.com/username/stayfit.git
    cd stayfit
    ```

2. **Installare le dipendenze:**
    ```bash
    npm install
    ```

3. **Avviare l'applicazione:**
    ```bash
    npm run dev
    ```

## Uso della Web App
1. **Registrazione e Abbonamento:**
    - **Registrazione:** I professionisti devono fornire dettagli come nome, email, password, specializzazione (nutrizionista o personal trainer), e area geografica di lavoro.
    - **Abbonamento:** Scegliere il tipo di abbonamento in base al numero di clienti o alla durata (mensile, trimestrale, annuale).
    - **Verifica:** Caricamento di un attestato professionale per la verifica delle credenziali. La verifica viene effettuata manualmente dall'amministrazione della piattaforma.

2. **Inserimento Dati del Cliente:**
    - **Aggiunta Cliente:** Dopo la verifica, il professionista può iniziare ad aggiungere clienti inserendo nome, email, età, peso, altezza e obiettivi personali.
    - **Storico Clienti:** Possibilità di visualizzare e gestire i dati dei clienti già esistenti.

3. **Questionario:**
    - **Compilazione:** Il cliente riceve un link per compilare un questionario che copre vari aspetti come:
      - Informazioni generali: Età, peso, altezza, sesso, ecc.
      - Allergie e intolleranze alimentari
      - Problemi motori o di salute
      - Obiettivi di fitness (perdita di peso, aumento della massa muscolare, miglioramento della resistenza, ecc.)
      - Preferenze alimentari e di allenamento
    - **Analisi:** Il sistema può fornire un'analisi preliminare delle risposte per aiutare il professionista nella creazione del piano.

4. **Piani Personalizzati:**
    - **Creazione:** Basandosi sulle informazioni raccolte, il professionista può creare piani di allenamento e alimentazione personalizzati.
    - **Modifiche e Aggiornamenti:** Possibilità di aggiornare i piani in base ai progressi del cliente o a nuove informazioni.
    - **Condivisione:** I piani possono essere condivisi con i clienti attraverso la piattaforma, con notifiche via email.

5. **Gestione dell'Abbonamento:**
    - **Rinnovo:** Notifiche per il rinnovo dell'abbonamento prima della scadenza.
    - **Upgrade/Downgrade:** Possibilità di cambiare il tipo di abbonamento in base alle necessità.
    - **Storico Pagamenti:** Visualizzazione dei pagamenti effettuati e delle fatture.

### Disclaimer
StayFit non si assume alcuna responsabilità legata a eventuali problemi ai quali professionisti o clienti possono incorrere.
