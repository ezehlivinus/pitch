import Joi from 'joi';

// validation
const validateUser = async (user = {}) => {
  const schema = Joi.object({
    fullName: Joi.string().min(3).max(100).required(),
    nationality: Joi.string().min(3).max(100).required(),
    password: Joi.string().min(6).max(60).required(),
    email: Joi.string().email().trim().lowercase()
      .required(),
    age: Joi.number().greater(15).less(150),
    role: Joi.string().lowercase()
  });

  const value = await schema.validateAsync(user);

  return value;
};

export default validateUser;
