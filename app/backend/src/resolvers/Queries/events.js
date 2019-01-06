const { getUserId } = require('../../utils')
const { forwardTo } = require('prisma-binding');

const EventsQuery = {
    eventAction: forwardTo('db'),
    eventActions: forwardTo('db'),
    eventActionsConnection: forwardTo('db'),
    communityEvent: forwardTo('db'),
    communityEvents: forwardTo('db'),
    communityEventsConnection: forwardTo('db')
}








module.exports = { EventsQuery }


