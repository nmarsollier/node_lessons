const dao = require("./users.dao")

function getUserSettings(req, res) {
    res.json(dao.getCurrentUserSettings())
}

exports.getUserSettings = getUserSettings
