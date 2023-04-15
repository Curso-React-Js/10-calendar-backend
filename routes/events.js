/**
 * Rutas de Eventos / events
 * host + /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

const { getEvents, updateEvent, createEvent, deleteEvent } = require('../controllers/events');

const router = Router();

// Cualquier peticion que se encuentre abajo, tienen que pasar por el JWT
router.use( validarJWT );

// Obtener eventos
router.get('/', getEvents);

// Crear un evento
router.post('/', [
  check('title', 'El titulo es obligatorio').not().isEmpty(),
  check('start', 'La fecha de inicio es obligatoria').custom(isDate),
  check('end', 'La fecha de finalización es obligatoria').custom(isDate),
  validarCampos
], createEvent);

// Actualizar evento
router.put('/:id', [
  check('title', 'El titulo es obligatorio').not().isEmpty(),
  check('start', 'La fecha de inicio es obligatoria').custom(isDate),
  check('end', 'La fecha de finalización es obligatoria').custom(isDate),
  validarCampos
], updateEvent);

// Eliminar evento
router.delete('/:id', deleteEvent);

module.exports = router;