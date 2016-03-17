cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-wkwebview-engine/src/www/ios/ios-wkwebview-exec.js",
        "id": "cordova-plugin-wkwebview-engine.ios-wkwebview-exec",
        "pluginId": "cordova-plugin-wkwebview-engine",
        "clobbers": [
            "cordova.exec"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.0.0",
    "cordova-plugin-wkwebview-engine": "1.0.2-dev",
    "com.ludei.webviewplus.ios": "1.0.1",
    "com.ludei.webviewplus.android": "1.5.0",
    "com.ludei.defaultres.ios": "1.1.1",
    "com.ludei.defaultres.android": "1.0.0"
}
// BOTTOM OF METADATA
});