const { request, response } = require('express');
const { validationResult } = require('express-validator');

const createUser = (req = request, res = response) => {

  const { name, email, password } = req.body;

  res.status(201).json({
    ok: true,
    msg: 'registro',
    name,
    email,
    password
  });

}

const login = (req = request, res = response) => {

  const { email, password } = req.body;

  res.status(200).json({
    ok: true,
    msg: 'login',
    email, 
    password
  });

}

const renewToken = (req = request, res = response) => {

  res.status(200).json({
    ok: true,
    msg: 'renew'
  });

}

module.exports = {
  createUser,
  login,
  renewToken,
}