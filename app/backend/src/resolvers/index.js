const { Query } = require('./Query')
const { Subscription } = require('./Subscription')
const { auth } = require('./Mutation/auth')
const { post } = require('./Mutation/post')
const { AuthPayload } = require('./AuthPayload')
const { ActionsQuery } = require('./Queries/actions');
const { UsersQuery } = require('./Queries/users');
const { RolesQuery } = require('./Queries/roles');
const { EventsQuery } = require('./Queries/events');
const { PetitionsQuery } = require('./Queries/petitions');
const { forwardTo } = require('prisma-binding');


module.exports = {
  Query : {
    ...ActionsQuery,
    ...UsersQuery,
    ...RolesQuery,
    ...EventsQuery,
    ...PetitionsQuery
  },
  Mutation: {
    ...auth,
    createAction: forwardTo('db'),
    updateAction: forwardTo('db'),
    updateManyActions: forwardTo('db'),
    upsertAction: forwardTo('db'),
    deleteAction: forwardTo('db'),
    deleteManyActions: forwardTo('db'),
    createActionCategory: forwardTo('db'),
    updateActionCategory: forwardTo('db'),
    updateManyActionCategories: forwardTo('db'),
    upsertActionCategory: forwardTo('db'),
    deleteActionCategory: forwardTo('db'),
    deleteManyActionCategories: forwardTo('db'),
    createEventAction: forwardTo('db'),
    updateEventAction: forwardTo('db'),
    updateManyEventActions: forwardTo('db'),
    upsertEventAction: forwardTo('db'),
    deleteEventAction: forwardTo('db'),
    deleteManyEventActions: forwardTo('db'),
    createPetition: forwardTo('db'),
    updatePetition: forwardTo('db'),
    updateManyPetitions: forwardTo('db'),
    upsertPetition: forwardTo('db'),
    deletePetition: forwardTo('db'),
    deleteManyPetitions: forwardTo('db'),
    createRole: forwardTo('db'),
    updateRole: forwardTo('db'),
    upsertRole: forwardTo('db'),
    deleteRole: forwardTo('db'),
    deleteManyRoles: forwardTo('db'),
    createUser: forwardTo('db'),
    updateUser: forwardTo('db'),
    updateManyUsers: forwardTo('db'),
    upsertUser: forwardTo('db'),
    deleteUser: forwardTo('db'),
    deleteManyUsers: forwardTo('db')
  },
  // Subscription,
  AuthPayload,
}
