import React, { useContext } from 'react';

import io from 'socket.io-client';

const SocketContext = React.createContext();

const socket = io( process.env.REACT_APP_SOCKET_SERVER || window.location.host );

export function useSocket() 
{
    return useContext( SocketContext );
}

export function SocketProvider({ children })
{
	return (
		<SocketContext.Provider value={{ socket }}>
			{ children }
		</SocketContext.Provider>
	)
}