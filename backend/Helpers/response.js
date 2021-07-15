module.exports = {
    response(data, _message, item) {
        if (data === 200) {
            return {
                status: 200,
                message: _message,
                item: item
            }
        }
        if (data === 201) {
            return {
                status: 201,
                message: "Created Successfully"
            }
        }
        if (data === 403) {
            return {
                status: 403,
                message: "Un-Authorised"
            }
        }
        if (data === 404) {
            return {
                status: 404,
                message: _message
            }
        }
    }
}