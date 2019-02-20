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

    async getCountryStats(parent, args, ctx, info){
        // country: String
        // country_name: String
        // points: Int

        let countries = await ctx.db.query.users({},`{country}`);
        let list = countries.map(item => item.country);
        let countries_list = [... new Set(list)];
        console.log(countries_list);
        // stats.forEach((item) => {
        //     if(response.indexOf(item.user.country) == )   
        // })



        return countries_list.map(async (country) => {
            let obj ={
                country: country,
                points: 0
            }
           await ctx.db.query.eventActions({where:{ user:{country:country},action:{active:true, isGame:false, points_gt: 0}}}, `{
            action{
                points
            }
            }`).then(res =>{
                return res.map(item => {
                    obj.points+= item.action.points;
                })
                
            })

            return obj;
        });
    },

    async myAvailableActions(parent, args, ctx, info){
        const id = getUserId(ctx)

        let queryData=`{
            zipcode
            recent_actions(where:{action:{active:true}}, orderBy:createdAt_DESC){
                id
                action{
                    id
                    primary_image
                    active
                    short_description
                    action_taken_description
                    schedule
                    video_url
                    order
                    water
                    waste
                    points
                    external_url
                    isGame
                    createdAt
                    updatedAt
                    related_actions{
                        id
                    }
                }
                createdAt
            }
        }`

        let myActions = await ctx.db.query.user({ where: { id } }, queryData);
        
        let recent_actions = myActions ? myActions.recent_actions : null;
        let uniqueactions = recent_actions ? await returnUniqueActions(recent_actions) : null;
        if(!uniqueactions){
            return [];
        }
        // if(zipcode){
        //     return uniqueactions ? uniqueactions : [];
        // }

        return await returnLocalMetrics('80305', uniqueactions.filter(action => {
            console.log('action stuffs');
            if(!action.recent_actions){
                return action;
            }
        }) , ctx);

        
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
        
        
        let recent_actions = myActions ? myActions.recent_actions : null;
        
        
        let uniqueactions = recent_actions ? await returnUniqueActions(recent_actions) : null;
        // console.log('unique actions', uniqueactions);
        let ids = uniqueactions ? uniqueactions.map(item => `"${item.action.id}"`) : null;

        let actionCategoryInfo=
        `
            {
                id
                name
                primary_image
                video_id
                actions(
                    where:{
                        ${ids ? `id_not_in:[${ids}]`: ''}
                        active: true,
                        isGame:false
                    }, orderBy:order_ASC){
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
        return await ctx.db.query.actionCategories({where:{name:args.name}}, actionCategoryInfo)
    },
}

async function returnLocalMetrics(zipcode, uniqueactions, ctx){
    let ids = uniqueactions.map(item => `${item.action.id}`)
    // id_in:[${ids}], 
    let queryData=`{
            action{
                id
                carbon_dioxide
                water
                waste
                points
            }
    }`

    let allActions = await ctx.db.query.eventActions({
        where: { 
            user: { 
                zipcode : zipcode
            },
            action : {
                id_in: ids,
                active:true,
                isGame:false
            }
        }
    }, queryData);

    let communityActions = allActions.map(item => {
        return item.action
    })

    uniqueactions.forEach((recent_action) =>{
        // zero out added fields
        recent_action.action.points_community = 0;
        recent_action.action.waste_community =0;
        recent_action.action.water_community = 0;
        recent_action.action.carbon_community = 0;

        //loop over and filter community stats to add in matching stats
        communityActions.filter(action=>{
            return action.id == recent_action.action.id;
        }).map(action => {
            // aggregate those stats onto the newly added fields
            recent_action.action.points_community += action.points;
            recent_action.action.waste_community += action.waste;
            recent_action.action.water_community += action.water;
            recent_action.action.carbon_community += action.carbon_dioxide;
        })
    })
    return uniqueactions;
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