const axios = require('axios');

const {GraphQLObjectType, GraphQLInt,
    GraphQLString, GraphQLBoolean,
    GraphQLList, GraphQLSchema} = require('graphql');

// Launch Type 

/* 전반적인 가장 큰 데이터의 타입을 정의 */
const LaunchType = new GraphQLObjectType({
    name: 'Launch',
    fields : ()=>({
        flight_number : {type :GraphQLInt},
        mission_name : {type :GraphQLString},
        launch_year :{type:GraphQLString},
        launch_date_local : {type :GraphQLString},
        launch_success : {type :GraphQLBoolean},
        rocket : {type :RocketType}, //여기서 로켓이라는 작은 데이터 타입을 정의 한다.
    })
})

//RocketType

/* 로켓의 타입을 정의 마찬가지로 세부타입이있으면 내부에 내부에 내부까지 갈 수 있다 */
const RocketType = new GraphQLObjectType({
    name: 'Rocket',
    fields : ()=>({
        rocket_id : {type :GraphQLString},
        rocket_name : {type :GraphQLString},
        rocket_type : {type :GraphQLString},
    })
})
// 위 두개로 데이터 타입을 조회 하면

/* 
    {
        data :{
            Launchs :[{
                flight_number : 4,
                mission_name : '김서버호',
                launch_year : '2019',
                launch_date_local : '08-19',
                launch_success : true,
                rocket : {
                    rocket_id : '로켓아이다',
                    rocket_name : '로켓이름',
                    rocket_type : '로켓 타입',
                },
            },{
                다음 런치 데이터
            },{
                다음 런치 데이터
            }]    
        }
    }
    형식으로 조회가 된다
*/

//Root Query
const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields :{
        launches :{
            type : new GraphQLList(LaunchType),
            resolve(parent, args){
                return axios.get('https://api.spacexdata.com/v3/launches')
                    .then(res=> res.data);
            }
        },
        launche :{
            type: LaunchType,
            args :{
                flight_number : { type : GraphQLInt}
            },
            resolve(parent, args){
                return axios.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
                .then(res => res.data)
            }
        },
        rockets :{
            type : new GraphQLList(RocketType),
            resolve(parent, args){
                return axios.get('https://api.spacexdata.com/v3/rockets')
                    .then(res=> res.data);
            }
        },
        rocket :{
            type: LaunchType,
            args :{
                id : { type : GraphQLString}
            },
            resolve(parent, args){
                return axios.get(`https://api.spacexdata.com/v3/rockets/${args.id}`)
                .then(res => res.data)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query : RootQuery
})