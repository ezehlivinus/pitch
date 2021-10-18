/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import _ from 'lodash';
import bcrypt from 'bcrypt';
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

    res.header('token', token).status(201).send({
      success: true,
      message: 'user created',
      data: { ...newUser.toJSON(), token }
    });
  }

  async list(req, res) {
    const users = await User.find({ role: { $ne: 'admin' } });
    if (_.isEmpty(users)) {
      return res.status(404).send({
        success: false,
        message: 'users not found'
      });
    }

    res.status(200).send({
      success: true,
      message: 'users list',
      data: users
    });
  }

  async detail(req, res) {
    const result = await UserService.findIfExists(req.params.id);

    if (!result.isTrue) {
      return res.status(404).send({
        success: false,
        message: 'user not found'
      });
    }

    res.status(200).send({
      success: true,
      message: 'user details fetched',
      data: result.user
    });
  }

  async update(req, res) {
    const user = await User.findByIdAndUpdate(req.params.id, req.body,
      { new: true, runValidators: true });
    res.status(200).send({
      success: true,
      message: 'user updated',
      data: user
    });
  }

  async delete(req, res) {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'this user might have been deleted or the user does not exist'
      });
    }

    res.status(200).send({
      success: true,
      message: 'user deleted',
      data: user
    });
  }

  async login(req, res) {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({ success: false, message: 'Invalid email  or password' });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send({ success: false, message: 'Invalid password or email' });

    const token = user.generateAuthToken();

    res.header('token', token).status(200).send({
      success: true,
      message: 'login success',
      data: { ...user.toJSON(), token }
    });
  }
}

export default new UserController();
