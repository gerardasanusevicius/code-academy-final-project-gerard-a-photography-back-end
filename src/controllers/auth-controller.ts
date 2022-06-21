import { Error } from 'mongoose';
import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';
import AdminModel from '../models/admin-model';
import createAdminViewModel, { AdminViewModel } from '../view-model-creators/create-admin-view-model';

type AuthResponseBody = {
  admin: AdminViewModel,
  token: string,
} | ErrorResponseBody;

export const login: RequestHandler<
  unknown,
  AuthResponseBody
> = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username) throw new Error('Username required');
    if (!password) throw new Error('Password required');

    const adminDoc = await AdminModel.findOne({ username });

    if (adminDoc === null) throw new Error(`Admin by '${username}' username was not found`);

    const passwordIsCorrect = bcrypt.compareSync(password, adminDoc.password);
    if (!passwordIsCorrect) throw new Error('Wrong password');
    const token = jwt.sign({ username }, config.token.secret);

    res.status(200).json({
      admin: createAdminViewModel(adminDoc),
      token: `Bearer ${token}`,
    });
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : 'Server error while logging in',
    });
  }
};

// FORM NEW USER CREATION
/*
 const { username, password } = req.body;

  if (!username) throw new Error('Username required');
  if (!password) throw new Error('Password required');

  await AdminModel.create({
    username,
    password: bcrypt.hashSync(password, 5),
  });

  res.status(200).send('ok.');
*/

export const authenticate: RequestHandler<
  unknown,
  AuthResponseBody
> = async (req, res) => {
  try {
    if (req.tokenData === undefined) {
      throw new Error('Ciphered data does not contain admin data');
    }
    const { username, token } = req.tokenData;
    const adminDoc = await AdminModel.findOne({ username });

    if (adminDoc === null) {
      throw new Error(`Admin by '${username}' username was not found`);
    }
    const admin = createAdminViewModel(adminDoc);

    // Čia galėtų būti aprašyti veiksmai, kurie pratęsia token'o gyvavimo laiką
    // Kitaip tariant, galite iš naujo sukurti naują token'ą su adminDoc duomenimis

    res.status(200).json({
      admin,
      token,
    });
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : 'Server error while recognising admin',
    });
  }
};
