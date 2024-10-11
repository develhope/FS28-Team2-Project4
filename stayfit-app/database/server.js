import express from 'express';
import morgan from 'morgan';
import Joi from 'joi';
import 'express-async-errors';
import dotenv from 'dotenv';
import { database } from './database.js';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

// const fileSchema = (allowedMimeTypes) => {
//   return Joi.object({
//     mimetype: Joi.string()
//       .valid(...allowedMimeTypes)
//       .required(),
//     data: Joi.any().required(),
//   });
// };

const schemaClient = Joi.object({
  first_name: Joi.string().required().min(1).max(50).label('Nome'),
  last_name: Joi.string().required().min(1).max(50).label('Cognome'),
  birth_date: Joi.date().required().less('now').label('Data di Nascita'),
  gender: Joi.string()
    .valid('male', 'female', 'other')
    .required()
    .label('Sesso'),
  email: Joi.string().email().required().label('Email'),
  phone: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required()
    .label('Numero di Telefono'), // Adjust the pattern according to your requirements
  weight: Joi.number().required().label('Peso (kg)'),
  height: Joi.number().required().label('Altezza (cm)'),
  allergies: Joi.array().items(Joi.string()).label('Allergie'),
  food_intolerances: Joi.array().items(Joi.string()).label('Intolleranze Alimentari'),
  activity_level: Joi.string()
    .valid('sedentario', 'modAttivo', 'attivo', 'moltoAttivo')
    .required()
    .label('Livello di Attività'),
  fitness_goals: Joi.string()
    .valid(
      'perdita',
      'aumentoMassa',
      'flessibilita',
      'salute',
      'incrementoForza',
      'vitaAttiva',
      'miglioramPrestazione',
      'riabilitazione'
    )
    .required()
    .label('Obiettivi Fitness'),
  workout_preferences: Joi.string()
    .valid(
      'attivitaAllAperta',
      'palestra'
    )
    .required()
    .label('Preferenze di Allenamento'),
  available_time: Joi.string()
    .valid('menoDi1h', '1h', '2h', '3h', 'piuDi3h')
    .required()
    .label('Tempo Disponibile'),
  photo: Joi.any().optional().label('Foto'),
  username: Joi.string().required().min(3).max(30).label('Nome Utente'),
  password: Joi.string().required().min(6).label('Password'),
  confirm_password: Joi.string().valid(Joi.ref('password')).required().label('Conferma Password'),
  professional_id: Joi.string().required().label('ID del professionista'),
});


const schemaProf = Joi.object({
  profession_type: Joi.string()
    .valid('personalTrainer', 'nutrizionista', 'entrambi')
    .required(),
  birth_date: Joi.date().iso().required(),
  // certifications: Joi.array()
  //   .items(fileSchema(['pdf']))
  //   .required(),
  // confirmPassword: Joi.string().min(6).required().valid(Joi.ref('password')),
  description: Joi.string().min(5).allow(''),
  email: Joi.string().email().required(),
  experience: Joi.number().integer().min(0).required(),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().pattern(/^\d+$/).min(10).max(15).required(),
  privacy_policy_accepted: Joi.boolean().valid(true).required(),
  // profilePhoto: fileSchema(['image/jpeg', 'image/png']).required(),
  receive_updates: Joi.boolean().required(),
  referral: Joi.string().allow(''),
  social_account_name: Joi.string().allow(''),
  social_network: Joi.string()
    .valid('facebook', 'instagram', 'twitter', 'linkedin')
    .allow(''),
  subscription_type: Joi.string()
    .valid('Free', 'Starter', 'Premium')
    .required(),
  tax_code: Joi.string()
    .pattern(/^\d{11}$/)
    .allow(''),
  terms_accepted: Joi.boolean().valid(true).required(),
  username: Joi.string().required(),
  work_area: Joi.string().required(),
});

app.get('/professionals', async (req, res) => {
  try {
    const professionals = await database.any('SELECT * FROM professionals');
    res.status(200).json(professionals);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recuperare gli utenti' });
  }
});

app.get('/professionals/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await database.oneOrNone(
      'SELECT * FROM professionals WHERE id = $1',
      [id]
    );
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Errore nel recuperare l'utente" });
  }
});

app.post('/professionals', async (req, res) => {
  const { error, value } = schemaProf.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const newUser = await database.one(
      'INSERT INTO professionals (profession_type, birth_date, description, email, experience, first_name, last_name, password, phone, privacy_policy_accepted, receive_updates, referral, social_account_name, social_network, subscription_type, tax_code, terms_accepted, username, work_area) VALUES (${profession_type}, ${birth_date}, ${description}, ${email}, ${experience}, ${first_name}, ${last_name}, ${password}, ${phone}, ${privacy_policy_accepted}, ${receive_updates}, ${referral}, ${social_account_name}, ${social_network}, ${subscription_type}, ${tax_code}, ${terms_accepted}, ${username}, ${work_area}) RETURNING id',
      value
    );
    res.status(201).json({ msg: 'User created successfully', id: newUser.id });
  } catch (error) {
    console.error("Errore nella creazione dell'utente:", error);
    res.status(500).json({ error: "Errore nella creazione dell'utente" });
  }
});

app.put('/professionals/:id', async (req, res) => {
  const { error, value } = schemaProf.validate(req.body);
  const { id } = req.params;
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const user = await database.oneOrNone(
      'SELECT * FROM professionals WHERE id = $1',
      [id]
    );
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    await database.none(
      'UPDATE professionals SET profession_type = ${profession_type}, birth_date = ${birth_date}, description = ${description}, email = ${email}, experience = ${experience}, first_name = ${first_name}, last_name = ${last_name}, password = ${password}, phone = ${phone}, privacy_policy_accepted = ${privacy_policy_accepted}, receive_updates = ${receive_updates}, referral = ${referral}, social_account_name = ${social_account_name}, social_network = ${social_network}, subscription_type = ${subscription_type}, tax_code = ${tax_code}, terms_accepted = ${terms_accepted}, username = ${username}, work_area = ${work_area} WHERE id = ${id}',
      value
    );
    res.status(200).json({ msg: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: "Errore nell'aggiornare l'utente" });
  }
});

app.delete('/professionals/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await database.oneOrNone(
      'SELECT * FROM professionals WHERE id = $1',
      [id]
    );
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    await database.none('DELETE FROM professionals WHERE id = $1', [id]);
    res.status(200).json({ msg: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: "Errore nell'eliminare l'utente" });
  }
});

app.post('/clients', async (req, res) => {
  const professionalId = req.body.professional_id;

  console.log('Allergies:', req.body.allergies);
  console.log('Food Intolerances:', req.body.foodIntolerances);

  // Trasforma le stringhe in array
  const allergiesArray = Array.isArray(req.body.allergies)
    ? req.body.allergies
    : req.body.allergies ? req.body.allergies.split(',').map(item => item.trim()).filter(item => item) : [];

  const foodIntolerancesArray = Array.isArray(req.body.foodIntolerances)
    ? req.body.foodIntolerances
    : req.body.foodIntolerances ? req.body.foodIntolerances.split(',').map(item => item.trim()).filter(item => item) : [];

  const { error, value } = schemaClient.validate({
    ...req.body,
    professional_id: professionalId,
    allergies: allergiesArray,
    food_intolerances: foodIntolerancesArray
  });

  if (error) {
    console.error('Errore di validazione:', error);
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const newUser = await database.one(
      'INSERT INTO clients (first_name, last_name, birth_date, gender, email, phone, weight, height, allergies, food_intolerances, activity_level, fitness_goals, workout_preferences, available_time, photo, username, password, professional_id) VALUES (${first_name}, ${last_name}, ${birth_date}, ${gender}, ${email}, ${phone}, ${weight}, ${height}, ${allergies}, ${food_intolerances}, ${activity_level}, ${fitness_goals}, ${workout_preferences}, ${available_time}, ${photo}, ${username}, ${password}, ${professional_id}) RETURNING id',
      value
    );
    res.status(201).json({ msg: 'Client created successfully', id: newUser.id });
  } catch (error) {
    console.error('Errore nella creazione del cliente:', error);
    res.status(500).json({ error: "Errore nella creazione del cliente" });
  }
});

app.get('/clients', async (req, res) => {
  const professionalId = req.query.professional_id;

  if (!professionalId) {
    return res.status(400).json({ error: 'Professional ID is required' });
  }

  try {
    const clienti = await database.any('SELECT * FROM clients WHERE professional_id = $1', [professionalId]);
    res.status(200).json(clienti);
  } catch (error) {
    console.error('Errore nel recupero dei clienti:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/foods', async (req, res) => {
  try {
    const foods = await database.any('SELECT * FROM foods');
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recuperare gli alimenti' });
  }
});

app.get('/foods/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const alimento = await database.oneOrNone(
      'SELECT * FROM foods WHERE id = $1',
      [id]
    );
    if (!alimento) {
      return res.status(404).json({ error: 'Alimento non trovato' });
    }
    res.status(200).json(alimento);
  } catch (error) {
    console.error("Errore nel recuperare l'alimento:", error);
    res.status(500).json({ error: "Errore nel recuperare l'alimento" });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await database.oneOrNone(
      'SELECT * FROM professionals WHERE email = $1 AND password = $2',
      [email, password]
    );

    if (user) {
      res
        .status(200)
        .json({ msg: 'Login effettuato con successo', userId: user.id });
    } else {
      res.status(401).json({ error: 'Email o password non corretti' });
    }
  } catch (error) {
    console.error('Errore durante il login:', error);
    res
      .status(500)
      .json({ error: 'Si è verificato un errore durante il login' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
