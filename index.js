var path = require('path')

module.exports = function (source) {
    var context = this
    this.cacheable()
    let entryFile = []
    const currentFile = context.resourcePath
    const entry = this.options.entry
    const customEntrypoint = this.options.entryPoint

    // A custom entry point specified in webpack config
    if (this.options.customEntrypoint) {
        if (typeof this.options.customEntrypoint !== 'string') {
            throw new Error('The entryPoint must be a string')
        }
        entryFile = customEntrypoint
    } else {
        // No custom entry point specified in webpack config
        let entryType = Object.prototype.toString.call(entry)

        // The entry can be an Array of strings
        if (entryType === '[object Array]') {

            // If that's the case, falling back to the last item in the entry array
            entryFile = entryType[entryType.length - 1]

        } else if (entryType === '[object Object]') {

            // Named entries.
            // There could be multiple named entries. So iterating that.
            Object.keys(entry).forEach(function (namedEntry) {

                let namedEntryType = Object.prototype.toString.call(entry[namedEntry])

                // Now this named entry either can be a single string or a string array
                if (namedEntryType === '[object String]') {
                    entryFile.push(entry[namedEntry])

                } else if (namedEntryType === '[object Array]') {
                    // We take the last item from the named array entry
                    entryFile.push(entry[namedEntry][entry[namedEntry].length - 1])
                }
            })

        } else if (entryType === '[object String]') {

            // It's just a string
            entryFile = entry
        }
    }

    let isQualified

    if (Object.prototype.toString.call(entryFile) === '[object String]') {
        isQualified = (path.resolve(entryFile) == context.resourcePath)

    } else if (Object.prototype.toString.call(entryFile) === '[object Array]') {

        isQualified = entryFile.some(function (item) {
            return context.resourcePath == path.resolve(item)
        })

    }

    if (isQualified) {
        source += '\r\n\r\nif(module.hot){module.hot.accept()}'
    }
    return source

}