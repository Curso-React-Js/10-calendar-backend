const { request, response } = require('express');

const createUser = (req = request, res = response) => {

  res.status(201).json({
    ok: true,
    msg: 'registro'
  });

}

const login = (req = request, res = response) => {

  res.status(200).json({
    ok: true,
    msg: 'login'
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