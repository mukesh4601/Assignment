var NewRegister = require("../Models/RegisterTableSchema")
var bcrypt = require('bcryptjs');
var response = require("../Helpers/response")
var jwt = require('jsonwebtoken');
const keys = require("../config/keys")
var Login = require("../Models/LoginTableSchema")

exports._login = async (req, res) => {
    try {
        const _emailId = req.body.emailID;
        NewRegister.findOne({ emailID: _emailId }).then((data) => {
            if (data !== null) {
                let password = req.body.password;
                bcrypt.compare(password, data.password).then(async (domatch) => {
                    if (domatch == true) {
                        const token = jwt.sign({
                            username: data.emailID,
                            userid: data._id,
                        }, keys.token.key, {
                            expiresIn: 30 * 24 * 60 * 60 * 1000,
                        })
                        const item = {
                            username: data.emailID,
                            token: token,
                            name: data.name
                        }
                        let loginuser = await Login.findOne({ emailID: data.emailID })

                        if (!loginuser) {
                            let _login = await new Login({
                                emailID: data.emailID,
                                userid: data._id,
                                token: token
                            })
                            _login.save()
                            let _response = response.response(200, "Successfully Login", item)
                            res.json(_response)
                        }
                        else {
                            await Login.findOneAndUpdate({ emailID: data.emailID }, {
                                $set: {
                                    emailID: data.emailID,
                                    userid: data._id,
                                    token: token
                                }
                            })
                            let _response = response.response(200, "Successfully Login", item)
                            res.json(_response)
                        }
                    }
                    else {
                        let _response = response.response(404, "Password Miss Match")
                        res.status(404).send(_response)
                    }
                })
            }
            else {
                let _response = response.response(404, "User not Found")
                res.status(404).send(_response)
            }
        })
    } catch (error) {
        console.log(error)
    }
}