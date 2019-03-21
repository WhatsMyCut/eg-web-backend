const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const resolvers = require('./resolvers')
const { Expo } = require('expo-server-sdk');
const CronJob = require('cron').CronJob;
const PushNotification = require('./services/pushNotification');

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
let pn = new PushNotification(db);



const dailyJobs = new CronJob('30 * * * * *', function() {
	const d = new Date();
  console.log('Every Day', d);
  pn.sendActionReminder();
});

dailyJobs.start();

// const dailyJobs = new CronJob('00 00 00 1 * *', function() {
// 	const d = new Date();
//   pn.sendActionReminder();
// });

// dailyJobs.start();



server.start(() => console.log('Server is running on http://localhost:4000'))


