const express = require( 'express' );
const io = require( 'socket.io' )();
const PORT = process.env.PORT || 5000;

// initial express server
const app = express();

// static assets
app.use( express.static( './public' ) );

// listen
const server = app.listen( PORT, () => 
{
    console.log( `Express server is running on port ${ PORT }...` );
});


// attach the socket server to the express server
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
        socket.broadcast.emit('created-contact', ( contact ));  
    });

    socket.on( 'login-contact', ( contactId ) => {
        socket.broadcast.emit('loggedin-contact', contactId );
        contacts = contacts.map(({ id, isOnline, ...rest }) => 
        ({
            ...rest, id,
            isOnline: id == contactId ? true : isOnline
        }));
    });

    socket.on( 'logout-contact', ( contactId ) => {
        socket.broadcast.emit('loggedout-contact', contactId );
        contacts = contacts.map(({ id, isOnline, ...rest }) => 
        ({
            ...rest, id,
            isOnline: id == contactId ? false : isOnline
        }));
    });

    socket.on( 'create-conversation', ( conversation ) => {
        conversations.push( conversation );
        socket.broadcast.emit('created-conversation', ( conversation ));
    });

    socket.on( 'add-message', ( data ) => {
        socket.broadcast.emit('receive-message', { conversationID: data.conversationID ,newMessage: data.newMessage });
        conversations.map(({ id, messages, ...rest }) => 
        ({
            ...rest, id,
            messages: id == data.conversationID ? messages.push(data.newMessage) : messages
        }));
    });
});
