var filter = require('lodash/filter')
var shuffle = require('lodash/shuffle')
var sortBy = require('lodash/sortBy')
var differenceBy = require('lodash/differenceBy')

function split (bindings, options) {
  if (options.filter) {
    bindings = filter(bindings, options.filter)
  }

  if (options.sort) {
    bindings = sortBy(bindings, 'scaledKiValue')
  }

  if (options.shuffle) {
    bindings = shuffle(bindings)
  }

  if (options.exclude) {
    bindings = differenceBy(bindings, options.exclude, 'smiles')
  }

  if (options.offset) {
    if (options.offset > 0 && options.offset < 1) {
      options.offset = bindings.length * options.offset
    }

    bindings = bindings.slice(Math.floor(options.offset))
  }

  if (options.limit) {
    bindings = bindings.slice(0, options.limit)
  }

  return Promise.resolve(bindings)
}

module.exports = split
