const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/User');

const createUser = async(req = request, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        pk: false,
        msg: 'Ya existe un usuario con ese correo'
      });
    }

    user = new User(req.body);

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();
  
    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      email: user.email
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });
  }

}

const login = async(req = request, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        pk: false,
        msg: 'Credenciales incorrectas - email'
      });
    }

    // Confirmas los passwords
    const validPassword = bcryptjs.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Credenciales incorrectas - password'
      });
    }

    // Generar JWT

    res.status(200).json({
      ok: true,
      uid: user.id,
      name: user.name,
      email: user.email
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });
  }

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