const User = require("../models/User");

const bcrypt = require("bcryptjs");

module.exports = class AuthController {
    static login(req, res) {
        res.render('auth/login')
    }
    static register(req, res) {
        res.render('auth/register')
    }
    static async registerPost(req, res) {
        const { name, email, password, confirmpassword } = req.body;
        if (password != confirmpassword){
            req.flash('message', 'As senhas não são iguais');
            res.render('auth/register');
            return;
        }
        const checkIfUserExists = await User.findOne({ where: { email } });
        if (checkIfUserExists){
            req.flash('message', 'Email já cadastrado');
            res.render('auth/register');
            return;
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const user = {
            name,
            email,
            password: hash
        }
        try {
            const createdUser = await User.create(user);
            req.session.userid = createdUser.id;

            req.flash('message', 'Usuário cadastrado com sucesso');
            req.session.save(() => {
                res.redirect('/');
            })
        } catch (error) {
            req.flash('message', 'Erro ao cadastrar usuário');
            res.render('auth/register');
        }
    }
    static async logout(req, res) {
        req.session.destroy(() => {
            res.redirect('/login');
        })
    }
}
