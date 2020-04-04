//create express server
const express =require('express')
const app = express()

var http = require('http').Server(app); //create http server so we can use 
var io = require('socket.io')(http);   // use io to liseten the server 


//  io.on('connection', function(socket){  console.log('user connected')})
 // socket.on('chat message', function(msg){    io.emit('chat message', msg);  });
//  socket.on('disconnect', function(){    console.log('user disconnected');  });});

let users=[]
io.on("connection",(socket)=>{
    console.log("user connected ")
    socket.on("sendMssage",(msg)=>{
        console.log("message ",msg)

        //find if user already in users array
        // if yes then updata socket id
        //else add user with socket id
    if( users.find(user=>user.user==msg.from) )
    { users.map(user=> {
        if (user.user==msg.from)
        {
            return{...user, id:socket.id}
           }
    })}
    else{
        users.push({user: msg.from, id :socket.id})
    }
    console.log("users are ",users)

    const rec= users.find((user)=> user.user==msg.to)
    console.log("message sent to ",rec)
    if (rec){
        io.to(rec.id).emit("recieveMessag",msg)
        console.log("message sent to ",rec.user)
    }
})

})

app.get('/',(req,res)=>{
    res.send("index")
})

http.listen(3001,()=>{
    console.log("server listening at port 3001")
})