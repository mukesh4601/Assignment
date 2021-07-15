var NewRegister = require("../Models/RegisterTableSchema")
var bcrypt = require('bcryptjs');
var response = require("../Helpers/response")
var jwt = require('jsonwebtoken');
const keys = require("../config/keys")
var Login = require("../Models/LoginTableSchema")

exports._register = async (req, res) => {
    try {
        const _name = req.body.name;
        const _emailId = req.body.emailID;
        const _password = await bcrypt.hash(req.body.password, 12);
        const newuser = await NewRegister.findOne({
            emailID: _emailId
        });
        if (!newuser) {
            const _newuser = await new NewRegister({
                emailID: _emailId,
                name: _name,
                password: _password
            })
            _newuser.save().then(async (data) => {
                const token = jwt.sign({
                    username: data.emailID,
                    userid: data._id,
                }, keys.token.key, {
                    expiresIn: 30 * 24 * 60 * 60 * 1000,
                })
                const item = {
                    username: data.emailID,
                    token: token
                }
                let _login = await new Login({
                    emailID: data.emailID,
                    userid: data.userid,
                    token: token
                })
                _login.update()
                let _response = response.response(201, "Successfully Created", item)
                res.json(_response)
            })
        }
        else {
            let _response = response.response(404, "Email Already Exits")
            res.status(404).send(_response)
        }
    } catch (error) {
        console.log(error);
    }
}