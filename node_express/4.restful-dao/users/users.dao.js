const model = require("./users.model")

let currentUserSettings = new model.UserSettings()

function getCurrentUserSettings() {
    return currentUserSettings
}

exports.getCurrentUserSettings = getCurrentUserSettings
