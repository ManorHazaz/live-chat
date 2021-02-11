import './Dashboard.css';

import { Conversation } from '../Conversation';
import { Sidebar } from '../Sidebar';

import { useActiveConversationId } from '../../Contexts/ActiveConversationIdProvider';

function Dashboard() {

    const { activeConversationId } = useActiveConversationId();

    return (
        <div className='dashboard'>
            <Sidebar />
            
            { activeConversationId
                ? <Conversation />
                : <div>
                    <h1> Invite some friends to talk.. </h1>
                </div>
            }
        </div>
    )
}
export default Dashboard