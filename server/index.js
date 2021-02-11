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

// handle users data
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
        conversations.map(({ id, messages, ...rest }) => 
        ({
            ...rest, id,
            messages: id == data.conversationID ? ([ ...messages , data.newMessage ]) : messages
        }));
        console.log(data.newMessage);
        const conversation = conversations.find( conversation => conversation.id === data.conversationID );
        console.log(conversations);
        if( conversation )
        {
            conversation.participents.forEach(participent => {
                socket.broadcast.to(participent).emit('receive-message', ( conversation.id, data.newMessage ) )
            })
        }
    })
})
