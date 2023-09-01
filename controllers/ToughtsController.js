const Toughts = require('../models/Toughts')
const User = require('../models/User')

module.exports = class ToughtsController {
    static async showToughts(req, res) {
        res.render('toughts/home')
    }
}