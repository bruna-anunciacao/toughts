const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const User = require('./User')

const Toughts = db.define('Toughts', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true,
    },
})

Toughts.belongsTo(User)
User.hasMany(Toughts)

module.exports = Toughts