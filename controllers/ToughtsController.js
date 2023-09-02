const { raw } = require("mysql2");
const Toughts = require("../models/Toughts");
const User = require("../models/User");

module.exports = class ToughtsController {
  static async showToughts(req, res) {
    const toughtsData = await Toughts.findAll({
      include: User,
    });
    const toughts = toughtsData.map((result) => result.get({ plain: true }));
    res.render("toughts/home", { toughts });
  }
  static async profile(req, res) {
    const userId = req.session.userid;
    const user = await User.findOne({
      where: {
        id: userId,
      },
      include: Toughts,
      plain: true,
    });
    if (!user) {
      res.redirect("/login");
    }
    const toughts = user.Toughts.map((result) => result.dataValues);

    let emptyToughts = false;
    if (toughts.length === 0) {
      emptyToughts = true;
    }

    res.render("toughts/profile", { toughts, emptyToughts });
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
  static async removeToughts(req, res) {
    const id = req.body.id;
    const UserId = req.session.userid;
    try {
      await Toughts.destroy({ where: { id: id, UserId: UserId } });
      req.flash("message", "Pensamento removido!");
      req.session.save(() => {
        res.redirect("/toughts/profile");
      });
    } catch (err) {
      console.log(err);
    }
  }
  static async updateToughts(req, res) {
    const id = req.params.id;
    const tought = await Toughts.findOne({ where: { id: id }, raw: true });
    res.render("toughts/edit", { tought });
  }
  static async updateToughtsSave(req, res) {
    const id = req.body.id;
    const tought = {
      title: req.body.title,
    };
    try {
      await Toughts.update(tought, { where: { id: id } });
      req.flash("message", "Pensamento alterado!");
      req.session.save(() => {
        res.redirect("/toughts/profile");
      });
    } catch (err) {
      console.log(err);
    }
  }
};
