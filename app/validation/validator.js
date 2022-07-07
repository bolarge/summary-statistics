const Joi = require('joi');

const email = Joi.string().lowercase().trim().email().required();
const password = Joi.string().trim().min(8).custom((value, helper) => {
  const allowedStringType = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])')
  return allowedStringType.test(value) ? value : helper.error('any.invalid')
}).message({
  'any.invalid': "Password must have at least 8 characters, a lowercase letter, an uppercase letter, a number, and a special character"
}).required();

const name = Joi.string().max(20).required();
const phoneNumber = Joi.string().min(9).max(11).regex(/^[0-9]{11}$/).required();
const country = Joi.string().length(2).required();
const url = Joi.string().regex(/:\/\/[0-9a-z-.]+\.[a-z]+\//i).uri({scheme: [/https?/,],})

module.exports.UserValidation = Joi.object().keys({
  name: name,
  email,
  password
})

module.exports.DatasetValidation = Joi.object().keys({
  name: name,
  salary:Joi.string().required(),
  currency: Joi.string().max(3).required(),
  department: Joi.string().max(20).required(),
  sub_department: Joi.string().max(20).required()
})

module.exports.validatePayload = (data, schema) => {
  const {error, value} = schema.validate(data)

  if(error) {
    const errorFields = error.details.map(err => err.message);
    const message = `${errorFields.join("/n")}`;
    let err = new Error(message);
    err.isBadRequest = true;
    throw err;
  }

  return value;
}


