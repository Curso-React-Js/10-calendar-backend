const { request, response } = require('express');

const Event = require('../models/Event');

const getEvents = async(req = request, res = response) => {

  try {
    const eventos = await Event.find().populate(
      'user', 'name'
    );

    res.status(200).json({
      ok: true,
      eventos
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });
  }

}

const createEvent = async(req = request, res = response) => {
  
  const event = new Event(req.body);

  try {
    event.user = req.uid; // uid de usuario

    const saveEvent = await event.save();

    res.status(201).json({
      ok: true,
      evento: saveEvent,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });
  }

}

const updateEvent = async(req = request, res = response) => {

  const { id } = req.params;
  const uid = req.uid;

  try {

    const event = await Event.findById( id );

    if ( !event ) {
      return res.status(404).json({
        ok: false,
        msg: 'El evento no existe por ese id'
      });
    }

    if ( event.user.toString() !== uid ) {
      // 401 no es autorizado
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegios de editar este evento'
      });
    }

    const newEvent = {
      ...req.body,
      user: uid
    }

    const eventUpdated = await Event.findByIdAndUpdate(id, newEvent, {
      new: true // regrese los datos actualizados
    });

    res.status(200).json({
      ok: true,
      evento: eventUpdated
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });
  }

}

const deleteEvent = async(req = request, res = response) => {

  const { id } = req.params;
  const uid = req.uid;

  try {

    const event = await Event.findById( id );

    if ( !event ) {
      return res.status(404).json({
        ok: false,
        msg: 'El evento no existe por ese id'
      });
    }

    if ( event.user.toString() !== uid ) {
      // 401 no es autorizado
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegios para eliminar este evento'
      });
    }

    await Event.findByIdAndDelete(id);

    res.status(200).json({ ok: true });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });
  }

}

module.exports = {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
}