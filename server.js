//create express server
const express =require('express')
const app = express()

var http = require('http').Server(app); //create http server so we can use 
var io = require('socket.io')(http);   // use io to liseten the server 


//  io.on('connection', function(socket){  console.log('user connected')})
 // socket.on('chat message', function(msg){    io.emit('chat message', msg);  });
//  socket.on('disconnect', function(){    console.log('user disconnected');  });});

let users=[]
io.on("connect",(socket)=>{
    const user =socket.handshake.query.user
    if (user!=="undefined"){
        if (users.find(usr=>usr.name==user)){ //user already exist
            users.map(usr=>usr.name===user?({...usr,id:socket.id,ed:'prev'}):user )//replace socketid with updated 
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

app.get('/',(req,res)=>{
    res.send("index")
})
http.listen(3001,()=>{
    console.log("server listening at port 3001")
})