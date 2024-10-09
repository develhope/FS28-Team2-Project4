import express from 'express';
import morgan from 'morgan';
import Joi from 'joi';
import 'express-async-errors';

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.json());

let users = [];
let idCounter = 1;

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

app.get('/users', (req, res) => {
  res.status(200).json(users);
});

app.get('/users/:id', (req, res) => {
  const { id } = req.params;

  const user = users.find((user) => user.id === id);

  if (!user) {
    res.status(404).json({ error: 'User not found' });
  }

  res.status(200).json(user);
});

app.post('/users', (req, res) => {
  const { error, value } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const newUser = { id: idCounter++, ...value };
  users = [...users, newUser];

  res.status(201).json({ msg: 'User created successfully' });
});

app.put('/users/:id', (req, res) => {
  const { error, value } = schema.validate(req.body);
  const { id } = req.params;

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({ msg: 'User not found' });
  }

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  users = users.map((user) => (user.id === id ? { ...user, ...value } : user));

  res.status(200).json({ msg: 'User updated successfully' });
});

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({ msg: 'User not found' });
  }

  users = users.filter((user) => user.id !== id);

  res.status(200).json({ msg: 'User deleted successfully' });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
