const path = require('path');

function hmr(source) {
  const context = this;
  this.cacheable();
  let entryFile = [];
  const entry = this.options.entry;
  const customEntrypoint = this.options.entryPoint;

  if (customEntrypoint) {
    const isValid = Object.prototype.toString.call(customEntrypoint) === ['object String']
    if (!isValid) {
      throw new Error("The entryPoint should be a valid string")
    }
    entryFile = customEntrypoint;
  } else {
    const entryType = Object.prototype.toString.call(entry);
    if (entryType === '[object Array]') {
      // Falling back to the last item in the entry array      
      entryFile = entry[entry.length - 1];
    } else if (entryType === '[object Object]') {
      // Named entries.
      // There could be multiple named entries. So iterating that.
      Object.keys(entry).forEach((namedEntry) => {
        const namedEntryType = Object.prototype.toString.call(entry[namedEntry]);
        // Now this named entry either can be a single string or a string array
        if (namedEntryType === '[object String]') {
          entryFile.push(entry[namedEntry]);
        } else if (namedEntryType === '[object Array]') {
          // We take the last item from the named array entry
          entryFile.push(entry[namedEntry][entry[namedEntry].length - 1]);
        }
      });
    }
  }

  let isQualified;

  if (Object.prototype.toString.call(entryFile) === '[object String]') {
    isQualified = (path.resolve(context.context, path.basename(entryFile)) === context.resourcePath);
  } else if (Object.prototype.toString.call(entryFile) === '[object Array]') {
    isQualified = entryFile.some(item => {
      return context.resourcePath === path.resolve(context.context, path.basename(item))
    });
  }

  if (isQualified) {
    return `${source}\r\n\r\nif(module.hot){module.hot.accept()}`;
  }
  return source;
}

module.exports = hmr;
