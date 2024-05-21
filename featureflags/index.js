const featureflags = require('./featureflags.js')
const debugFlags = require('./debug.js')

module.exports = {
  ...featureflags,
  ...debugFlags,
}
