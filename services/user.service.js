/* eslint-disable import/extensions */
/* eslint-disable no-else-return */
/* eslint-disable class-methods-use-this */
import _ from 'lodash';
import mongoose from 'mongoose';

import User from '../models/user.model.js';

const { isValidObjectId } = mongoose;

class UserService {
  async findByEmail(email) {
    const user = await User.findOne({ email });

    return user;
  }

  async findById(id) {
    const user = await User.findById(id);

    return user;
  }

  async findByIdOrEmail(emailOrId) {
    let user;

    if (isValidObjectId(emailOrId)) {
      user = await this.findById(emailOrId);
    } else {
      user = await this.findByEmail(emailOrId);
    }

    return user;
  }

  /**
   * @description checks if user exist or not
   * @param {*} emailOrId user's email or id --- not really both
   * @returns boolean : true or false --- not both
   */
  async userExists(emailOrId) {
    const user = await this.findByIdOrEmail(emailOrId);
    return !(_.isEmpty(user));
  }

  /**
   * @description checks if user exist or not. This is to be used if you want to use the user object
   * @param {*} emailOrId user's email or id --- not really both
   * @returns {*} an object containing {true, userObject} or {false, null}
   */
  async findIfExists(emailOrId) {
    const user = await this.findByIdOrEmail(emailOrId);
    return { isTrue: !(_.isEmpty(user)), user };
  }
}

export default new UserService();
