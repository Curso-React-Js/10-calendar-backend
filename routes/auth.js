/**
 * Rutas de Usuarios / Auth
 * host + /api/auth
*/

const { Router } = require('express');
const { createUser, login, renewToken } = require('../controllers/auth');

const router = Router();

router.post('/new', createUser);

router.post('/', login);

router.get('/renew', renewToken);

module.exports = router;