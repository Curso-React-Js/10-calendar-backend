/**
 * Rutas de Usuarios / Auth
 * host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { createUser, login, renewToken } = require('../controllers/auth');

const router = Router();

router.post('/new', [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('email', 'El correo es obligatorio').isEmail(),
  check('password', 'La contraseña debe de ser más de 7 caracteres').isLength({ min: 8 }),
  validarCampos
], createUser);

router.post('/', [
  check('email', 'El correo es obligatorio').isEmail(),
  check('password', 'La contraseña debe de ser más de 7 caracteres').isLength({ min: 8 }),
  validarCampos
], login);

router.get('/renew', renewToken);

module.exports = router;