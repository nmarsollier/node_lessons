const dao = require("./users.dao")

function getUserSettings() {
    return dao.getCurrentUserSettings()
}

exports.getUserSettings = getUserSettings
