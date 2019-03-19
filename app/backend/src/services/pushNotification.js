const { Expo } = require('expo-server-sdk');

class PushNotification {
    constructor(db){
        this.db = db;
        this.expo = new Expo();
    }

    async sendActionReminder(){
        return new Promise(async (res,rej) =>{
            console.log('notification was trying to be sent');
            let whereCondition = {
                where:{
                    token_not:null, 
                    push_notifications_enabled:true, 
                    action_reminders:true 
                }
            }
            let usersWithTokens = await db.query.users(whereCondition, `{ name token}`);
            let messages = usersWithTokens.map(user => {
                if (!Expo.isExpoPushToken(user.token)) {
                    return null;
                }
                return {
                    to: user.token,
                    sound: 'default',
                    body: `Don't forget to check your actions today!`,
                    data: { 
                        alert_type:"action_reminder", 
                        message: `Don't forget to check your actions today!` 
                    },
                }
            })

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
                    console.error('Chunk push error',error);
                }
            }
            res(true);
        })
    }
    
}

module.exports = PushNotification;