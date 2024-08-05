const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Importa tu instancia de Sequelize

const Genre = sequelize.define('genre', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Genre;
