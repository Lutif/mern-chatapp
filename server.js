//create express server
const express =require('express')
const app = express()
const http = require('http').Server(app); //create http server so we can use 
const io = require('socket.io')(http);   // use io to liseten the server 
const router =require("./routes/router")

const connectDB=require("./config/connectdb")
app.use(express.json({ useUrlExtended: false }))
app.use(router);



/// io operations 
let users=[]
io.on("connect",(socket)=>{
    const user =socket.handshake.query.user
    if (user!=="undefined"){
        if (users.find(usr=>usr.name==user)){ //user already exist
            users=users.map(usr=>
                usr.name===user?({...usr,id:socket.id}):usr )//replace socketid with updated 
            
        }
        else{
            users.push({name:user,id:socket.id})
        }
    }
    console.log("user connected ", users)
    socket.broadcast.emit("usersUpate",users) //infrom all users that a new user came online
    socket.emit("usersUpate",users)
    socket.on("sendMssage",(messageObj)=>{
        // const messageObj =socket.handshake.messageObj
        const reciever= users.find(usr=> usr.name===messageObj.to )
        if (reciever){

            socket.to(reciever.id).emit("recieveMessage",messageObj)
        }
    })
})

connectDB()



http.listen(3001,()=>{
    console.log("server listening at port 3001")
})