const dao = require("./users.dao")

function getUserSettings() {
    dao.getCurrentUserSettings()
}

exports.getUserSettings = getUserSettings
