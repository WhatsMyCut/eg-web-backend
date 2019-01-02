const { getUserId } = require('../../utils')
const { forwardTo } = require('prisma-binding');

const RolesQuery = {
    role: forwardTo('db'),
    roles: forwardTo('db'),
    rolesConnection: forwardTo('db')
}




module.exports = { RolesQuery }





