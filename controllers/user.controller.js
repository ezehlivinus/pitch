/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import User from '../models/user.model.js';
import UserService from '../services/user.service.js';
import validateUser from '../validators/user.validator.js';

class UserController {
  async create(req, res) {
    const validData = await validateUser(req.body);
    if (await UserService.userExists(validData.email)) {
      return res.status(409).send({ success: true, message: 'user already exist' });
    }

    const newUser = new User(validData);

    await newUser.save();

    const token = newUser.generateAuthToken();

    res.header('token', token).send({
      success: true,
      message: 'user created',
      data: { ...newUser.toJSON(), token }
    });
  }

  async list(req, res) {
    res.send('list all users');
  }

  async detail(req, res) {
    res.send('show a user details');
  }

  async update(req, res) {
    res.send('update a user');
  }

  async delete(req, res) {
    res.send('delete a user');
  }
}

export default new UserController();
