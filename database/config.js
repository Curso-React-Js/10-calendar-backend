const mongoose = require('mongoose');

const dbConnection = async() => {

  try {
    const urlConnectionDB = process.env.DB_CNN;

    await mongoose.connect(urlConnectionDB);

    console.log('DB Online');

  } catch (error) {
    console.log(error);
    throw new Error('Error a la hora de inicializar DB');
  }

}

module.exports = {
  dbConnection,
}