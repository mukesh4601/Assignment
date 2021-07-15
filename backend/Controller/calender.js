const Login = require("../Models/LoginTableSchema")
const response = require("../Helpers/response")
var moment = require('moment');

exports._getcalanderDetails = async (req, res) => {
    try {
        const _date = req.body.date;
        let date = moment(_date).format("dddd");
        let item = {
            day: date
        }
        let _response = response.response(200, "Searched ", item)
        res.json(_response)

    } catch (error) {

    }
}