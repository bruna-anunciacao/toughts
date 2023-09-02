const Toughts = require("../models/Toughts");
const User = require("../models/User");

module.exports = class ToughtsController {
  static async showToughts(req, res) {
    res.render("toughts/home");
  }
  static async profile(req, res) {
    res.render("toughts/profile");
  }
  static createToughts(req, res) {
    res.render("toughts/create");
  }
  static async createToughtsSave(req, res) {
    const tought = {
      title: req.body.title,
      UserId: req.session.userid,
    };
    try {
      await Toughts.create(tought);
      req.flash("message", "Pensamento criado!");
      req.session.save(() => {
        res.redirect("/toughts/profile");
      });
    } catch (err) {
      console.log(err);
    }
  }
};
