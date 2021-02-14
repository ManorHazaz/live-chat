import './Dashboard.css';

import { Conversation } from '../Conversation';
import { Sidebar } from '../Sidebar';

import { useActiveConversationId } from '../../Contexts/ActiveConversationIdProvider';
import { useEffect, useState } from 'react';

function Dashboard() {

    const { activeConversationId } = useActiveConversationId();
    const [ toggleSidebar, setToggleSidebar ] = useState( true );

    useEffect(() => 
    {
        if( window.innerWidth < 600 )
        {
            setToggleSidebar( !toggleSidebar );
        }
    }, [ activeConversationId ] );

    function handleToggle()
    {
        setToggleSidebar( !toggleSidebar );
    }

    return (
        <div className='dashboard'>
            { toggleSidebar && <Sidebar /> }
            
            {
                activeConversationId
                ? <Conversation toggleSidebar={ toggleSidebar } />
                : <div className='welcome-msg'>
                    <h1> Welcome </h1>
                    <h2> Invite someone to talk and enjoy. </h2>
                </div>
            }

            <div className='show-sidebar' onClick={ () => handleToggle() }>
                💬
            </div>
        </div>
    )
}
export default Dashboard