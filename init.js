const mongoose= require('mongoose');
const chat = require ("./models/chat.js");

async function main(){
   await mongoose.connect('mongodb://127.0.0.1:27017/msg');
} 

main().then((res)=>{
    console.log('Connected sucessfully to database..');
}).catch((err)=>{
    console.log('There was an error while connecting to database');
})

let allChats = [
    {
        from: 'alden',
        // to : 'lance',
        message:'Every small step you take today brings you closer to the life you dream of.',
        created_at:new Date()
    },
    {
        from: 'Jude',
        // to : 'placid',
        message:'Don’t wait for the right time — create it',
        created_at:new Date()
    },
    {
        from: 'Myron',
        // to : 'alden',
        message:'Success is built one disciplined day at a time.',
        created_at:new Date()
    },
    {
        from: 'Stallone',
        // to : 'aura',
        message:'Challenges are proof that you are growing stronger.',
        created_at:new Date()
    },
    {
        from: 'aura',
        // to : 'alden',
        message:'Your future self is watching — make them proud.',
        created_at:new Date()
    }
]

chat.insertMany(allChats);
// chat1.save().then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// });