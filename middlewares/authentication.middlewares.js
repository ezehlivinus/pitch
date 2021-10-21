/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

class Authenticate {
  async authenticate(req, res, next) {
    const token = req.header('token');

    if (!token) return res.status(401).send({ success: false, message: 'Access Denied: Token not provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id);
    if (!user) return res.status(404).send({ success: false, message: 'user not found or might have been deleted' });

    req.auth = user;

    return next();
  }

 

// I will do within code in controller but in the 
  async isPermittedTo(action, resource) {

  }
}

export default new Authenticate();
