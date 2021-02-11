import React, { useContext } from 'react';
import io from 'socket.io-client';

const SocketContext = React.createContext();

const socket = io('http://localhost:5000', {transports: ['websocket']});

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
	);
}