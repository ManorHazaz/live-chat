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
                : <div className='welcome-msg'>
                    <h1> Welcome </h1>
                    <h2> This is my kind of chat. </h2>
                    <h2> Invite someone to talk and enjoy. </h2>
                </div>
            }
        </div>
    )
}
export default Dashboard