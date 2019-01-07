const moment = require('moment');

const { getUserId } = require('../../utils')
const { forwardTo } = require('prisma-binding');

const ActionsQuery = {
    action: forwardTo('db'),
    actions: forwardTo('db'),
    actionsConnection: forwardTo('db'),
    actionCategory : forwardTo('db'),
    actionCategories: forwardTo('db'),
    actionCategoriesConnection : forwardTo('db'),
    async myAvailableActions(parent, args, ctx, info){
        const id = getUserId(ctx)

        let queryData=`{
            recent_actions(where:{action:{active:true, isGame:false}}, orderBy:createdAt_DESC){
                id
                action{
                    id
                    primary_image
                    active
                    short_description
                    action_taken_description
                    schedule
                    video_url
                    carbon_dioxide
                    order
                    water
                    waste
                    points
                    external_url
                    isGame
                    createdAt
                    updatedAt
                }
                createdAt
            }
        }`

        let myActions = await ctx.db.query.user({ where: { id } }, queryData);
        
        
        let recent_actions = myActions.recent_actions;
        
        let uniqueactions = await returnUniqueActions(recent_actions);
        // console.log('unique actions', uniqueactions);
        return uniqueactions.filter(event =>filterUnreadyActions(event.action, event.createdAt));
    },
    async sectorActionsByName(parent, args, ctx, info){
        const id = getUserId(ctx)
        if(!args.name){
            return [];
        }

        let queryData=`{
            recent_actions(where:{action:{active:true, isGame:false, category:{name:"${args.name}"}}}, orderBy:createdAt_DESC){
                id
                action{
                    id
                    primary_image
                    active
                    short_description
                    action_taken_description
                    schedule
                    video_url
                    carbon_dioxide
                    order
                    water
                    waste
                    points
                    external_url
                    isGame
                    createdAt
                    updatedAt
                }
                createdAt
            }
        }`

        let myActions = await ctx.db.query.user({ where: { id } }, queryData);
        
        
        let recent_actions = myActions.recent_actions;
        
        let uniqueactions = await returnUniqueActions(recent_actions);
        // console.log('unique actions', uniqueactions);
        let ids = uniqueactions.filter(event =>filterUnreadyActions(event.action, event.createdAt)).map(item => `"${item.action.id}"`);

        let actionCategoryInfo=
        `
            {
                id
                name
                primary_image
                video_id
                game_title
                actions(
                    where:{
                        id_not_in:[${ids}],
                        active: true,
                        isGame:false
                    }){
                        id
                        primary_image
                        short_description
                        carbon_dioxide
                        water
                        waste
                        video_url
                        game_title
                        related_actions {
                            id
                            primary_image
                            short_description
                        }
                }
            }
        `

        return await ctx.db.query.actionCategories({where:{name:args.name}}, actionCategoryInfo);
    },
}


function filterUnreadyActions(action, createdAt){
    let momentDate = moment(createdAt);
    let today = moment(new Date());
    let canGoThrough = false;
    switch(action.schedule){
        case 'ANNUALLY' :
            if(momentDate.diff(today,'years') > 0) canGoThrough = true;
            break;
        case 'ANYTIME' :
            canGoThrough = true;
            break;
        case 'ONCE' :
            canGoThrough = false;
            break;
        case 'DAILY' :
            if(momentDate.diff(today,'days') > 0) canGoThrough = true;
            break;
        case 'BIWEEKLY' :
            if(momentDate.diff(today,'days') > 3) canGoThrough = true;
            break;
        case 'WEEKLY' :
            if(momentDate.diff(today,'days') > 6) canGoThrough = true;
            break;
        case 'TWOWEEKS' :
            if(momentDate.diff(today,'days') > 13) canGoThrough = true;
            break;
        case 'MONTHLY' :
            if(momentDate.diff(today,'months') > 0) canGoThrough = true;
            break;
        case 'QUARTERLY' :
            if(momentDate.diff(today,'months') > 3) canGoThrough = true;
            break;
        case 'SEMIANNUALLY' :
            if(momentDate.diff(today,'months') > 5) canGoThrough = true;
            break;
    }

    return canGoThrough;
}

async function returnUniqueActions(recent_actions){
    let indexMap = {};
    let ids = [];
    for(let i = 0; i < recent_actions.length; i++){
        if(!indexMap.hasOwnProperty(recent_actions[i].action.id)){
            ids.push(recent_actions[i].action.id);
            indexMap[recent_actions[i].action.id] = {
                id: recent_actions[i].id,
                action : recent_actions[i].action,
                createdAt:recent_actions[i].createdAt
            }
        } else{
            indexMap[recent_actions[i].action.id].action.points += recent_actions[i].action.points;
            indexMap[recent_actions[i].action.id].action.waste += recent_actions[i].action.waste;
            indexMap[recent_actions[i].action.id].action.water += recent_actions[i].action.water;
            indexMap[recent_actions[i].action.id].action.carbon_dioxide += recent_actions[i].action.carbon_dioxide;
        }
    }

    let mostRecentActions = ids.map( async (id) => {
        return {id:indexMap[id].id , action : indexMap[id].action, createdAt:indexMap[id].createdAt };
    })
    return Promise.all(mostRecentActions)
}







module.exports = { ActionsQuery }