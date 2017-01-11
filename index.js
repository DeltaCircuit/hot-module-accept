var path = require('path')

module.exports = function (source) {
    //Custom property in webpack config which tells us which file is the main entry point
    var entryScript = path.resolve(this.options.entryScript)
    if (entryScript == this.resourcePath) {        
        source += '\r\n\r\nif(module.hot){module.hot.accept()}'
    }
    return source

}