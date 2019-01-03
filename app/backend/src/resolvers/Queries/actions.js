const { getUserId } = require('../../utils')
const { forwardTo } = require('prisma-binding');

const ActionsQuery = {
    action: forwardTo('db'),
    actions: forwardTo('db'),
    actionsConnection: forwardTo('db'),
    actionCategory : forwardTo('db'),
    actionCategories: forwardTo('db'),
    actionCategoriesConnection : forwardTo('db')
}








module.exports = { ActionsQuery }