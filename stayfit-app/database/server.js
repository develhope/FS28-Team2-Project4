import express from 'express';
import morgan from 'morgan';
import Joi from 'joi';
import 'express-async-errors';
import dotenv from 'dotenv';
import { database } from './database.js';

dotenv.config();

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.json());

const fileSchema = (allowedMimeTypes) => {
  return Joi.object({
    mimetype: Joi.string()
      .valid(...allowedMimeTypes)
      .required(),
    data: Joi.any().required(),
  });
};

const schema = Joi.object({
  professionType: Joi.string()
    .valid('personalTrainer', 'nutrizionista', 'entrambi')
    .required(),
  birthDate: Joi.date().iso().required(),
  certifications: Joi.array()
    .items(fileSchema(['pdf']))
    .required(),
  confirmPassword: Joi.string().min(6).required().valid(Joi.ref('password')),
  description: Joi.string().min(5).allow(''),
  email: Joi.string().email().required(),
  experience: Joi.number().integer().min(0).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().pattern(/^\d+$/).min(10).max(15).required(),
  privacyPolicyAccepted: Joi.boolean().valid(true).required(),
  profilePhoto: fileSchema(['image/jpeg', 'image/png']).required(),
  receiveUpdates: Joi.boolean().required(),
  referral: Joi.string().allow(''),
  socialAccountName: Joi.string().allow(''),
  socialNetwork: Joi.string()
    .valid('facebook', 'instagram', 'twitter', 'linkedin')
    .allow(''),
  subscriptionType: Joi.string().valid('Free', 'Starter', 'Premium').required(),
  taxCode: Joi.string()
    .pattern(/^\d{11}$/)
    .allow(''),
  termsAccepted: Joi.boolean().valid(true).required(),
  username: Joi.string().required(),
  workArea: Joi.string().required(),
});

app.get('/users', async (req, res) => {
  try {
    const users = await database.any('SELECT * FROM users');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recuperare gli utenti' });
  }
});

app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await database.oneOrNone('SELECT * FROM users WHERE id = $1', [
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

app.post('/users', async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const newUser = await database.one(
      'INSERT INTO users (professionType, birthDate, certifications, confirmPassword, description, email, experience, firstName, lastName, password, phone, privacyPolicyAccepted, profilePhoto, receiveUpdates, referral, socialAccountName, socialNetwork, subscriptionType, taxCode, termsAccepted, username, workArea) VALUES (${professionType}, ${birthDate}, ${certifications}, ${confirmPassword}, ${description}, ${email}, ${experience}, ${firstName}, ${lastName}, ${password}, ${phone}, ${privacyPolicyAccepted}, ${profilePhoto}, ${receiveUpdates}, ${referral}, ${socialAccountName}, ${socialNetwork}, ${subscriptionType}, ${taxCode}, ${termsAccepted}, ${username}, ${workArea}) RETURNING id',
      value
    );
    res.status(201).json({ msg: 'User created successfully', id: newUser.id });
  } catch (error) {
    res.status(500).json({ error: "Errore nella creazione dell'utente" });
  }
});

app.put('/users/:id', async (req, res) => {
  const { error, value } = schema.validate(req.body);
  const { id } = req.params;
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const user = await database.oneOrNone('SELECT * FROM users WHERE id = $1', [
      id,
    ]);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    await database.none(
      'UPDATE users SET professionType = ${professionType}, birthDate = ${birthDate}, certifications = ${certifications}, confirmPassword = ${confirmPassword}, description = ${description}, email = ${email}, experience = ${experience}, firstName = ${firstName}, lastName = ${lastName}, password = ${password}, phone = ${phone}, privacyPolicyAccepted = ${privacyPolicyAccepted}, profilePhoto = ${profilePhoto}, receiveUpdates = ${receiveUpdates}, referral = ${referral}, socialAccountName = ${socialAccountName}, socialNetwork = ${socialNetwork}, subscriptionType = ${subscriptionType}, taxCode = ${taxCode}, termsAccepted = ${termsAccepted}, username = ${username}, workArea = ${workArea} WHERE id = ${id}',
      value
    );
    res.status(200).json({ msg: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: "Errore nell'aggiornare l'utente" });
  }
});

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await database.oneOrNone('SELECT * FROM users WHERE id = $1', [
      id,
    ]);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    await database.none('DELETE FROM users WHERE id = $1', [id]);
    res.status(200).json({ msg: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: "Errore nell'eliminare l'utente" });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
