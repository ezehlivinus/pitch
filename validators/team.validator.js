import Joi from 'joi';

// validation
const validateTeam = async (team = {}) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    captionId: Joi.string().trim(),
    viceCaptionId: Joi.string().trim(),
    stadium: Joi.object({
      name: Joi.string().required(),
      capacity: Joi.number().min(1).required(),
      address: Joi.string().min(2).required()
    }),
    foundedOn: Joi.date()
  });

  const value = await schema.validateAsync(team);

  return value;
};

export default validateTeam;
