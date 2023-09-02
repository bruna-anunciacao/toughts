const Toughts = require('../models/Toughts')
const User = require('../models/User')

module.exports = class ToughtsController {
    static async showToughts(req, res) {
        res.render('toughts/home')
    }
    static async profile(req, res) {
        res.render('toughts/profile')
    }
    static createToughts(req, res) {
        res.render('toughts/create')
    }
}