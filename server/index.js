const express = require( 'express' );
const io = require( 'socket.io' )();
const PORT = 5000;

// init the express server
const app = express();

// serve static assets
app.use( express.static( './public' ) );

// listen to incoming HTTP connections
const server = app.listen( PORT, () => {

    console.log( `Express server is running on port ${ PORT }...` );

});


// attach the socket.io server to the express server
io.listen( server );

// handle contacts data
let contacts = [];

// handle rooms data
let conversations = [];


io.on('connection', socket => 
{

    socket.emit( 'get-contacts', contacts );

    socket.emit( 'get-conversations',  conversations );

    socket.on( 'create-contact', ( contact ) => {
        contacts.push( contact );
        socket.broadcast.emit('created-contact', ( contact ) )  
    })

    socket.on( 'create-conversation', ( conversation ) => {
        conversations.push( conversation );
        socket.broadcast.emit('created-conversation', ( conversation ) )
    })

    socket.on( 'add-message', ( data ) => {
        socket.broadcast.emit('receive-message', { conversationID: data.conversationID ,newMessage: data.newMessage } );
        conversations.map(({ id, messages, ...rest }) => 
        ({
            ...rest, id,
            messages: id == data.conversationID ? messages.push(data.newMessage) : messages
        }));
    })
})
