
if (process.env.NODE_ENV === 'development') {
    module.exports = require('./dev_server')
} else if (process.env.NODE_ENV === 'test') {
    module.exports = require('./test_server')
} else {
    // in normal apps you'll not do anything in this case
    // but for this workshop app, we're actually going to
    // deploy our mock service worker to production
    // so normally, this condition would just look like this:

    // module.exports = ""

    // but for us, since we're shipping the dev server to prod
    // we'll do the same thing we did for development:
    module.exports = require('./dev_server')
}
