/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import User from '../models/user.model.mjs';

class UserController {
  async create(req, res) {
    res.send('create new user');
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
