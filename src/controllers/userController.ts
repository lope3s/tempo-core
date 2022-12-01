import {
  createUser,
  getUser,
  deleteUser,
  updateUser,
  validateObjAgainstSchema,
} from '../helpers';
import { User } from '../entities';
import { client } from '../database/db';
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { sign } from 'jsonwebtoken';

class UserController {
  async storeUser(req: Request, res: Response) {
    const validateBody = validateObjAgainstSchema(User, req.body);

    if (!validateBody.valid)
      return res.status(400).json({
        message: 'The following fields are missing',
        fields: validateBody.missingFields,
      });

    try {
      const userColl = client.collection('users');

      const user = await userColl.findOne({ email: validateBody.obj.email });

      if (user)
        return res.status(409).json({ error: 'E-mail already registered.' });

      const createdUser = await createUser(validateBody.obj);

      const token = sign(
        { id: createdUser.insertedId },
        process.env.TOKEN_SECRET || '',
        { expiresIn: '7d' }
      );

      return res
        .status(201)
        .json({ message: 'User created.', id: createdUser.insertedId, token });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error.' });
    }
  }

  async showUser(req: Request, res: Response) {
    if (!req.params.id) res.status(400).json({ error: 'Missing id.' });

    try {
      const user = await getUser({ _id: new ObjectId(req.params.id) });

      if (!user) return res.status(404).json({ error: 'User not found.' });

      const { password, createdAt, deletedAt, ...rest } = user;

      return res.status(200).json(rest);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error.' });
    }
  }

  async updateUser(req: Request, res: Response) {
    if (!req.params.id) res.status(400).json({ error: 'Missing id.' });

    try {
      const updatedUser = await updateUser(req.params.id, req.body);

      if (!updatedUser)
        return res.status(404).json({ error: 'User not found.' });

      return res.status(200).json({ message: 'User updated.' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error.' });
    }
  }

  async deleteUser(req: Request, res: Response) {
    if (!req.params.id) res.status(400).json({ error: 'Missing id.' });

    try {
      await deleteUser(req.params.id);
      return res.status(204).send();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error.' });
    }
  }
}

export default new UserController();
