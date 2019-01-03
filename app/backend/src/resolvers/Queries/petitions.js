const { getUserId } = require('../../utils')
const { forwardTo } = require('prisma-binding');

const PetitionsQuery = {
    petition: forwardTo('db'),
    petitions: forwardTo('db'),
    petitionsConnection: forwardTo('db')

}








module.exports = { PetitionsQuery }



