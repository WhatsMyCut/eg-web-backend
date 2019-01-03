const { getUserId } = require('../../utils')
const { forwardTo } = require('prisma-binding');

const EventsQuery = {
    eventAction: forwardTo('db'),
    eventActions: forwardTo('db'),
    eventActionsConnection: forwardTo('db')
}








module.exports = { EventsQuery }


