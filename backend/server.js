// polling(pull protocol)--> baar baar get req bhej kr data access krna ..so isliye sockets aaye taaki data apne aap server pr push ho jaye and pull na krna pde
// sockets(push protocol)
const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const path=require('path');

const app = express();
const board=Array(9).fill(null);

// hme sirf index file nhi baaki saari bhi access krni h script and css vali so isliye bhejre h 
// static middleware jis foler ka path denge to uski saari files send kr dega  and first argumentme lega ki kis route pr send kr krna h 
app.use('/',express.static(path.join(__dirname,'..')));

const server = createServer(app);
const io = new Server(server);

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname, '..' , 'index.html'));
})

// io server pr socket bna then socket pr agr playermoved name ka event aaya to uska data le lenge and board me daal denge
io.on('connection', (socket) => {
  socket.on("playerMoved", data =>{
    board[data.sqIdx]=data.move;
    io.emit("serverRecievedMove",data);
  })
  
  console.log('a user connected');
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});