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
app.use(cors({origin: 'http://localhost:5173'}))

// const fileSchema = (allowedMimeTypes) => {
//   return Joi.object({
//     mimetype: Joi.string()
//       .valid(...allowedMimeTypes)
//       .required(),
//     data: Joi.any().required(),
//   });
// };

const schema = Joi.object({
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
  subscription_type: Joi.string().valid('Free', 'Starter', 'Premium').required(),
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
    const user = await database.oneOrNone('SELECT * FROM professionals WHERE id = $1', [
      id,
    ]);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Errore nel recuperare l'utente" });
  }
});

app.post('/professionals', async (req, res) => {
  const { error, value } = schema.validate(req.body);
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
    console.error('Errore nella creazione dell\'utente:', error);
    res.status(500).json({ error: "Errore nella creazione dell'utente" });
  }
});

app.put('/professionals/:id', async (req, res) => {
  const { error, value } = schema.validate(req.body);
  const { id } = req.params;
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const user = await database.oneOrNone('SELECT * FROM professionals WHERE id = $1', [
      id,
    ]);
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
    const user = await database.oneOrNone('SELECT * FROM professionals WHERE id = $1', [
      id,
    ]);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    await database.none('DELETE FROM professionals WHERE id = $1', [id]);
    res.status(200).json({ msg: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: "Errore nell'eliminare l'utente" });
  }
});

app.get('/foods/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const alimento = await database.oneOrNone('SELECT * FROM foods WHERE id = $1', [id]);
    if (!alimento) {
      return res.status(404).json({ error: 'Alimento non trovato' });
    }
    res.status(200).json(alimento);
  } catch (error) {
    console.error('Errore nel recuperare l\'alimento:', error);
    res.status(500).json({ error: 'Errore nel recuperare l\'alimento' });
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
      res.status(200).json({ msg: 'Login effettuato con successo', userId: user.id });
    } else {
      res.status(401).json({ error: 'Email o password non corretti' });
    }
  } catch (error) {
    console.error('Errore durante il login:', error);
    res.status(500).json({ error: 'Si è verificato un errore durante il login' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
