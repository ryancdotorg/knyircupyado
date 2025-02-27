const express = require('express')
const router = express.Router()
const Wizard = require('hmpo-form-wizard')

const steps = require('./steps')
const fields = require('./fields')

require('./formatters')
require('./validators')

router.use(Wizard(
    steps.registrar,
    fields,
    {
        name: 'registrar',
        journeyName: 'registrar',
        editable: true,
        editBackStep: '/registrar/confirm',
        controller: require('./controllers/registrar')
    }
))

router.use(Wizard(
    steps.informant,
    fields,
    {
        name: 'informant',
        journeyName: 'informant',
        editable: true,
        editBackStep: '/informant/confirm',
        controller: require('./controllers/informant')
    }
))

router.use((err, req, res, next) => {
    if (err.code === 'SESSION_EXPIRED') err.redirect = '/'
    if (err.code === 'MISSING_PREREQ' && !err.redirect) err.redirect = '/'
    if (err.redirect) return res.redirect(err.redirect)
    next()
})

module.exports = router
