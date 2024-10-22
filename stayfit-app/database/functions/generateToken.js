import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  return token;
};
