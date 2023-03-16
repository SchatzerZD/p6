const messages = document.getElementById("messages");
const message = document.getElementById("input");
const socket = new WebSocket('ws://localhost:3000');
let global_id = -1;
socket.onopen = (event) => {
    console.log('WebSocket is connected!')
    const id = Math.round(Math.random() * 100)
    global_id = id;
    console.log('sending...', id)
    const data = JSON.stringify(
        [
            {
                id,
                name: `[${id}]`,
                connected: true
            }
        ]
    )
    socket.send(data)
}

function sendMessage(){
    const data = JSON.stringify(
        [
            {
                name: `[${global_id}]`,
                message: `${message.value}`
            }
        ]
    )
    socket.send(data);
}

socket.onmessage = (msg) => {
    const messageFromSocket = JSON.parse(msg.data);
    console.log('I got a message!', messageFromSocket)
    if(messageFromSocket.message[0].connected){
        messages.innerHTML += `<br/> ${messageFromSocket.message[0].name} has connected`
    }else{
        messages.innerHTML += `<br/> ${messageFromSocket.message[0].name} : ${messageFromSocket.message[0].message}`
    }
}
socket.onerror = (error) => console.error(`Web Socket error`, error)
socket.onclose = (event) => console.log('Disconnected from WebSocket server')