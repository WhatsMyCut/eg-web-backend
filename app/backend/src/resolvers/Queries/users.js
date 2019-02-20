const { getUserId } = require('../../utils')
const { forwardTo } = require('prisma-binding');


const UsersQuery = {
 /* feed(parent, args, ctx, info) {
    return ctx.db.query.posts({ where: { isPublished: true } }, info)
  },

  drafts(parent, args, ctx, info) {
    const id = getUserId(ctx)

    const where = {
      isPublished: false,
      author: {
        id
      }
    }

    return ctx.db.query.posts({ where }, info)
  },

  post(parent, { id }, ctx, info) {
    return ctx.db.query.post({ where: { id } }, info)
  }, */ 
  users: forwardTo('db'),
  user: forwardTo('db'),
  usersConnection: forwardTo('db'),
  
  node: forwardTo('db'),
  me(parent, args, ctx, info) {
    const id = getUserId(ctx)
    return ctx.db.query.user({ where: { id } }, info)
  }
}

module.exports = { UsersQuery }
