const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const resolvers = require('./resolvers')
const { Expo } = require('expo-server-sdk');


const db = new Prisma({
  typeDefs: 'src/generated/prisma.graphql', // the auto-generated GraphQL schema of the Prisma API
  endpoint: process.env.PRISMA_ENDPOINT, // the endpoint of the Prisma API (value set in `.env`)
  // debug: true, // log all GraphQL queries & mutations sent to the Prisma API
  secret: process.env.PRISMA_SECRET, // only needed if specified in `database/prisma.yml` (value set in `.env`)
})

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({ ...req, db }),
})

//setup some cron job here


async function triggerNotification(){
  let expo = new Expo();
  let whereCondition = {
    where:{
      token_not:null, 
      // push_notifications_enabled:true, 
      // action_reminders:true 
    }
  }

  let usersWithTokens = await db.query.users(whereCondition, `{ name token}`);
  console.log('this is firing');
  let messages = usersWithTokens.map(user => {
    console.log('this is firing');
    if (!Expo.isExpoPushToken(user.token)) {
      console.error(`Push token ${user.token} is not a valid Expo push token`);
      return null;
    }
    console.log('push notification message');
    return {
      to: user.token,
      sound: 'default',
      body: 'This is a test notification',
      data: { message: 'Test Message' },
    }
  })
  console.log('this is firing');
  console.log(messages);

  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];

  for (let chunk of chunks) {
    try {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      console.log(ticketChunk);
      tickets.push(...ticketChunk);
      // NOTE: If a ticket contains an error code in ticket.details.error, you
      // must handle it appropriately. The error codes are listed in the Expo
      // documentation:
      // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
    } catch (error) {
      console.error(error);
    }
  }

}

triggerNotification();


server.start(() => console.log('Server is running on http://localhost:4000'))


