import io from 'socket.io-client'
const connect=(user)=>  {
    const socket = io(`/?user=${user}`)
return socket
}

export default connect