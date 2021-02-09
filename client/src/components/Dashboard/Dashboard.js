import { Conversation } from '../Conversation'
import { Sidebar } from '../Sidebar'
import './Dashboard.css'

import { useActiveConversation } from '../../Contexts/ActiveConversationProvider';

function Dashboard() {

    const { activeConversation } = useActiveConversation();

    return (
        <div className='dashboard'>
            <Sidebar />
            
            { activeConversation
                ? <Conversation />
                : <div>
                    <h1> Invite some friends to talk.. </h1>
                </div>
            }
        </div>
    )
}

export default Dashboard
